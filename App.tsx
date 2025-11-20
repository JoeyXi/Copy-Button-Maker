import React, { useState } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { CodeOutput } from './components/CodeOutput';
import { ButtonConfig } from './types';
import { DEFAULT_CONFIG } from './constants';

function App() {
  const [config, setConfig] = useState<ButtonConfig>(DEFAULT_CONFIG);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      <Header />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel: Configuration */}
        <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 h-full z-20 shadow-xl">
          <ControlPanel config={config} onChange={setConfig} />
        </div>

        {/* Right Panel: Preview & Code */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          
          {/* Upper: Visual Preview (60% height) */}
          <div className="h-[50%] lg:h-[60%] relative">
            <PreviewPanel config={config} />
          </div>
          
          {/* Lower: Code Output (40% height) */}
          <div className="h-[50%] lg:h-[40%] relative z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
            <CodeOutput config={config} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
