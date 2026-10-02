import { useEffect, useState } from 'react';

const codeLines = [
  { text: 'import tensorflow as tf', delay: 0 },
  { text: 'from transformers import pipeline', delay: 800 },
  { text: '', delay: 1200 },
  { text: '# Load pre-trained model', delay: 1400 },
  { text: 'model = pipeline("text-generation")', delay: 1800 },
  { text: '', delay: 2200 },
  { text: '# Generate intelligent responses', delay: 2400 },
  { text: 'response = model("Hello, AI!")', delay: 2800 },
  { text: '', delay: 3200 },
  { text: 'print("✨ AI Model Ready")', delay: 3400 },
];

export default function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers: number[] = [];

    codeLines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[300px] bg-dark-bg/50 rounded-xl overflow-hidden border border-dark-border/50">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-dark-border/50 bg-dark-surface/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-xs text-text-muted ml-2 font-mono">ai_model.py</span>
      </div>

      {/* Code content */}
      <div className="p-4 font-mono text-sm leading-relaxed overflow-hidden">
        {codeLines.slice(0, visibleLines).map((line, index) => (
          <div
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            {line.text === '' ? (
              <div className="h-5"></div>
            ) : line.text.startsWith('#') ? (
              <div className="text-text-muted">{line.text}</div>
            ) : line.text.startsWith('import') || line.text.startsWith('from') ? (
              <div>
                <span className="text-primary-light">{line.text.split(' ')[0]}</span>
                <span className="text-text-secondary"> {line.text.split(' ').slice(1).join(' ')}</span>
              </div>
            ) : line.text.includes('=') ? (
              <div>
                <span className="text-accent">{line.text.split('=')[0].trim()}</span>
                <span className="text-text-secondary"> = </span>
                <span className="text-green-400">{line.text.split('=')[1].trim()}</span>
              </div>
            ) : line.text.startsWith('print') ? (
              <div>
                <span className="text-primary-light">print</span>
                <span className="text-text-secondary">(</span>
                <span className="text-green-400">"{line.text.match(/"(.*)"/)?.[1]}"</span>
                <span className="text-text-secondary">)</span>
              </div>
            ) : (
              <div className="text-text-secondary">{line.text}</div>
            )}
          </div>
        ))}
        
        {/* Blinking cursor */}
        {visibleLines < codeLines.length && (
          <div className="inline-block w-2 h-5 bg-primary-light animate-pulse mt-1"></div>
        )}
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
    </div>
  );
}
