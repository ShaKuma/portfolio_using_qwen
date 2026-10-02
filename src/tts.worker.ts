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
let currentChunk = 0;
let totalChunks = 0;

self.addEventListener('message', async (event) => {
  const { type, text, chunkIndex, totalChunks: total } = event.data;
  
  if (type === 'init') {
    await loadModel();
  } else if (type === 'synthesize-chunk') {
    // Streaming synthesis - process one chunk at a time
    if (isProcessing) {
      self.postMessage({ status: 'error', message: 'Already processing, please wait' });
      return;
    }
    
    if (!synthesizer) {
      self.postMessage({ status: 'error', message: 'Model not loaded' });
      return;
    }
    
    isProcessing = true;
    currentChunk = chunkIndex;
    totalChunks = total;
    lastUsedTime = Date.now();
    
    try {
      self.postMessage({ 
        status: 'synthesizing-chunk', 
        message: `Generating chunk ${chunkIndex + 1} of ${totalChunks}...`,
        chunkIndex: chunkIndex,
        totalChunks: totalChunks
      });
      
      console.log(`Generating audio for chunk ${chunkIndex + 1}/${totalChunks}:`, text.substring(0, 50) + '...');
      
      // Generate speech for this chunk
      const startTime = Date.now();
      const output = await synthesizer(text);
      const endTime = Date.now();
      
      console.log(`Chunk ${chunkIndex + 1} generated in ${endTime - startTime}ms`);
      
      // Verify output
      if (!output.audio || output.audio.length === 0) {
        throw new Error('No audio data generated for chunk');
      }
      
      // Transfer audio data to main thread
      self.postMessage({
        status: 'chunk-complete',
        audio: output.audio,
        sampling_rate: output.sampling_rate,
        chunkIndex: chunkIndex,
        totalChunks: totalChunks
      });
      
      // Clear output reference to free memory
      output.audio = null;
      
    } catch (error: any) {
      console.error('Chunk synthesis error:', error);
      self.postMessage({ 
        status: 'error', 
        message: error.message || 'Failed to generate speech chunk',
        chunkIndex: chunkIndex
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
