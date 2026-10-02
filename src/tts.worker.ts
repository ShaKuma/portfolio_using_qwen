// Web Worker for TTS using Transformers.js
import { pipeline, env } from '@huggingface/transformers';

// Disable local models to force using HF Hub
env.allowLocalModels = false;

let synthesizer: any = null;

// Load the model
async function loadModel() {
  self.postMessage({ status: 'loading', message: 'Initializing TTS model...' });
  
  try {
    synthesizer = await pipeline('text-to-speech', 'Xenova/mms-tts-eng', {
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
    
    self.postMessage({ status: 'ready', message: 'TTS model loaded successfully' });
  } catch (error: any) {
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
      
      const output = await synthesizer(text, {
        speaker_embeddings: new Float32Array(512).fill(0),
      });
      
      // Send audio data back to main thread
      self.postMessage({
        status: 'complete',
        audio: output.audio,
        sampling_rate: output.sampling_rate,
      });
    } catch (error: any) {
      self.postMessage({ status: 'error', message: error.message });
    }
  }
});
