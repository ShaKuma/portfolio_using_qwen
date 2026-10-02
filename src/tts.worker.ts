// Web Worker for TTS using Transformers.js
import { pipeline, env } from '@huggingface/transformers';

// Disable local models to force using HF Hub
env.allowLocalModels = false;

let synthesizer: any = null;

// Load the model
async function loadModel() {
  self.postMessage({ status: 'loading', message: 'Initializing TTS model...' });
  
  try {
    // Check if WebGPU is available
    let device: 'webgpu' | 'wasm' = 'wasm';
    if ('gpu' in navigator) {
      try {
        const adapter = await (navigator as any).gpu.requestAdapter();
        if (adapter) {
          device = 'webgpu';
          console.log('WebGPU available, using GPU acceleration');
        }
      } catch (e) {
        console.log('WebGPU not available, falling back to WASM');
      }
    }
    
    self.postMessage({ status: 'loading', message: `Loading model with ${device.toUpperCase()}...` });
    
    synthesizer = await pipeline('text-to-speech', 'Xenova/mms-tts-eng', {
      device: device,
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
    
    self.postMessage({ status: 'ready', message: `TTS model loaded (${device.toUpperCase()})` });
  } catch (error: any) {
    console.error('Model loading error:', error);
    self.postMessage({ status: 'error', message: error.message });
  }
}

// Handle messages from main thread
self.addEventListener('message', async (event) => {
  const { type, text } = event.data;
  
  if (type === 'init') {
    await loadModel();
  } else if (type === 'synthesize') {
    if (!synthesizer) {
      self.postMessage({ status: 'error', message: 'Model not loaded' });
      return;
    }
    
    try {
      self.postMessage({ status: 'synthesizing', message: 'Generating speech...' });
      console.log('Starting speech synthesis for text length:', text.length);
      
      // MMS-TTS doesn't need speaker_embeddings
      const startTime = Date.now();
      const output = await synthesizer(text);
      const endTime = Date.now();
      
      console.log(`Speech generation complete in ${endTime - startTime}ms`);
      console.log('Audio data:', {
        length: output.audio.length,
        sampling_rate: output.sampling_rate,
        type: typeof output.audio
      });
      
      // Verify output
      if (!output.audio || output.audio.length === 0) {
        throw new Error('No audio data generated');
      }
      
      // Transfer audio data to main thread
      self.postMessage({
        status: 'complete',
        audio: output.audio,
        sampling_rate: output.sampling_rate,
      });
    } catch (error: any) {
      console.error('Synthesis error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      self.postMessage({ 
        status: 'error', 
        message: error.message || 'Failed to generate speech' 
      });
    }
  }
});
