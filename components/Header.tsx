import React from 'react';
import { ClipboardCopy, Github } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 shadow-sm z-50 relative">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
          <ClipboardCopy className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">Button Maker</h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Copy-to-Clipboard Generator</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
};
