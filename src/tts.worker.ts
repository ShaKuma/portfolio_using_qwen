// Web Worker for TTS using Transformers.js
import { pipeline, env } from '@huggingface/transformers';

// Disable local models to force using HF Hub
env.allowLocalModels = false;

// Memory management
let synthesizer: any = null;
let lastUsedTime = 0;
const MEMORY_CLEANUP_TIMEOUT = 5 * 60 * 1000; // 5 minutes

// Cleanup function to free memory
function cleanupModel() {
  if (synthesizer) {
    console.log('Cleaning up TTS model to free memory');
    synthesizer = null;
    // Force garbage collection if available
    if (typeof globalThis.gc === 'function') {
      globalThis.gc();
    }
  }
}

// Auto-cleanup after inactivity
setInterval(() => {
  if (synthesizer && Date.now() - lastUsedTime > MEMORY_CLEANUP_TIMEOUT) {
    cleanupModel();
    self.postMessage({ status: 'cleanup', message: 'Model unloaded to free memory' });
  }
}, 60 * 1000); // Check every minute

// Load the model
async function loadModel() {
  self.postMessage({ status: 'loading', message: 'Initializing TTS model...' });
  
  try {
    // Always use WASM to prevent GPU crashes
    // WebGPU can cause driver crashes on some systems
    const device = 'wasm';
    
    self.postMessage({ status: 'loading', message: `Loading model (CPU mode for stability)...` });
    
    synthesizer = await pipeline('text-to-speech', 'Xenova/mms-tts-eng', {
      device: device,
      // Limit model memory usage
      dtype: 'q8', // Use quantized model to reduce memory
      progress_callback: (progress: any) => {
        if (progress.status === 'downloading' || progress.status === 'progress') {
          const percent = progress.progress ? Math.round(progress.progress) : 0;
          self.postMessage({ 
            status: 'progress', 
            progress: percent,
            message: `Downloading model: ${percent}%`
          });
        } else if (progress.status === 'ready') {
          self.postMessage({ status: 'ready', message: 'Model ready!' });
        }
      },
    });
    
    lastUsedTime = Date.now();
    self.postMessage({ status: 'ready', message: 'TTS model loaded (CPU mode)' });
  } catch (error: any) {
    console.error('Model loading error:', error);
    self.postMessage({ status: 'error', message: error.message });
  }
}

// Handle messages from main thread
let isProcessing = false;

self.addEventListener('message', async (event) => {
  const { type, text } = event.data;
  
  if (type === 'init') {
    await loadModel();
  } else if (type === 'synthesize') {
    // Prevent multiple simultaneous synthesis requests
    if (isProcessing) {
      self.postMessage({ status: 'error', message: 'Already processing, please wait' });
      return;
    }
    
    if (!synthesizer) {
      self.postMessage({ status: 'error', message: 'Model not loaded' });
      return;
    }
    
    isProcessing = true;
    lastUsedTime = Date.now();
    
    try {
      self.postMessage({ status: 'synthesizing', message: 'Generating speech...' });
      console.log('Starting speech synthesis for text length:', text.length);
      
      // Limit text length to prevent memory issues (max ~1000 characters)
      const limitedText = text.substring(0, 1000);
      if (text.length > 1000) {
        console.warn(`Text truncated from ${text.length} to 1000 characters`);
      }
      
      // Generate speech
      const startTime = Date.now();
      const output = await synthesizer(limitedText);
      const endTime = Date.now();
      
      console.log(`Speech generation complete in ${endTime - startTime}ms`);
      
      // Verify output
      if (!output.audio || output.audio.length === 0) {
        throw new Error('No audio data generated');
      }
      
      // Check audio size (limit to 10MB to prevent memory issues)
      const audioSizeMB = (output.audio.length * 4) / (1024 * 1024); // Float32 = 4 bytes
      console.log(`Audio size: ${audioSizeMB.toFixed(2)} MB`);
      
      if (audioSizeMB > 10) {
        throw new Error('Audio too large, please use shorter text');
      }
      
      // Transfer audio data to main thread
      self.postMessage({
        status: 'complete',
        audio: output.audio,
        sampling_rate: output.sampling_rate,
      });
      
      // Clear output reference to free memory
      output.audio = null;
      
    } catch (error: any) {
      console.error('Synthesis error:', error);
      self.postMessage({ 
        status: 'error', 
        message: error.message || 'Failed to generate speech' 
      });
    } finally {
      isProcessing = false;
      lastUsedTime = Date.now();
    }
  } else if (type === 'cleanup') {
    // Manual cleanup request
    cleanupModel();
  }
});
