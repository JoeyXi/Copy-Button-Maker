import React, { useEffect, useRef, useState } from 'react';
import { ButtonConfig, CopySource } from '../types';
import { generateCSS, generateHTML, generateJS } from '../utils/codeGenerator';
import { RefreshCcw, Eye } from 'lucide-react';

interface PreviewPanelProps {
  config: ButtonConfig;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeKey, setIframeKey] = useState(0); // Force re-render of preview

  // We use an iframe or Shadow DOM approach to strictly isolate styles
  // so the app's Tailwind doesn't bleed into the preview, and vice versa.
  // Here, a Shadow DOM or just scoped innerHTML is good. Let's use a simple container with dynamic style tag injection.

  useEffect(() => {
    if (!containerRef.current) return;
    
    const css = generateCSS(config);
    const html = generateHTML(config);
    
    // We need to attach the event listener logic manually for the preview to be interactive
    // without using the stringified JS (which is for the user).
    
    const container = containerRef.current;
    container.innerHTML = `<style>${css}</style><div class="preview-wrapper">${html}</div>`;
    
    // If source is ELEMENT, we need a dummy input in the preview
    if (config.sourceType === CopySource.ELEMENT) {
      const inputHtml = `
        <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
          <label style="font-size: 0.75rem; color: #94a3b8;">Target Input (ID: ${config.targetElementId})</label>
          <input type="text" id="${config.targetElementId}" value="Text inside the input field" 
            style="padding: 0.5rem; border-radius: 0.375rem; border: 1px solid #334155; background: #0f172a; color: #e2e8f0; width: 100%;" />
        </div>
      `;
      container.innerHTML += inputHtml;
    }

    // Attach Logic
    const btn = container.querySelector(`#${config.className}-id`) as HTMLButtonElement;
    if (btn) {
      const originalContent = btn.innerHTML;
      
      btn.onclick = () => {
        // Simulate copy
        let text = '';
        if (config.sourceType === CopySource.STATIC) {
          text = config.staticText;
        } else {
          const input = container.querySelector(`#${config.targetElementId}`) as HTMLInputElement;
          text = input ? input.value : '';
        }
        
        // Visual Feedback in Preview
        // Note: navigator.clipboard might be blocked in some iframe contexts or non-secure contexts,
        // but since this is a main DOM render, it should work.
        navigator.clipboard.writeText(text).then(() => {
             // Success State
            const successIconHtml = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M20 6 9 17l-5-5"/></svg>`;
            btn.innerHTML = `${successIconHtml}<span class="btn-text">${config.successLabel}</span>`;
            
            setTimeout(() => {
              btn.innerHTML = originalContent;
            }, config.duration);
        }).catch(err => {
            console.error("Preview Copy Error", err);
            alert("Could not write to clipboard in this preview environment. The generated code will work on your site.");
        });
      };
    }
  }, [config]);

  return (
    <div className="flex flex-col h-full bg-slate-950">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-400" /> Live Preview
        </h3>
        <button 
          onClick={() => setIframeKey(p => p + 1)}
          className="text-xs text-slate-500 hover:text-white flex items-center gap-1 transition-colors"
        >
          <RefreshCcw className="w-3 h-3" /> Reset
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
         {/* Grid Background Pattern */}
         <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
            backgroundSize: '20px 20px', 
            opacity: 0.2 
         }}></div>

         {/* Render Container */}
         <div 
            key={iframeKey}
            ref={containerRef} 
            className="relative z-10 bg-slate-800/50 p-12 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-2xl min-w-[300px] text-center flex flex-col items-center justify-center"
         >
            {/* Button Injected Here */}
         </div>
      </div>
    </div>
  );
};
