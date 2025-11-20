import React, { useState } from 'react';
import { ButtonConfig } from '../types';
import { generateCSS, generateHTML, generateJS } from '../utils/codeGenerator';
import { Check, Copy, Code2, FileCode, FileJson } from 'lucide-react';

interface CodeOutputProps {
  config: ButtonConfig;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ config }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'combined' | 'split'>('split');

  const css = generateCSS(config);
  const html = generateHTML(config);
  const js = generateJS(config);

  const fullCode = `
<!-- Styles -->
<style>
${css}
</style>

<!-- HTML -->
${html}

<!-- JavaScript -->
<script>
${js}
</script>
  `.trim();

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const CodeBlock = ({ code, lang, label }: { code: string; lang: string; label: string }) => (
    <div className="relative group mb-4 rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
          {lang === 'html' ? <FileCode className="w-3 h-3"/> : lang === 'css' ? <Code2 className="w-3 h-3"/> : <FileJson className="w-3 h-3"/>}
          {label}
        </span>
        <button
          onClick={() => handleCopy(code, label)}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
        >
          {copiedSection === label ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          {copiedSection === label ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-xs font-mono leading-relaxed text-slate-300 whitespace-pre-wrap break-all">
          {code}
        </pre>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-950 border-t border-slate-800">
      <div className="px-6 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900">
        <h3 className="text-sm font-bold text-slate-200">Generated Code</h3>
        <div className="flex bg-slate-950 rounded p-0.5">
          <button 
            onClick={() => setActiveTab('split')}
            className={`text-xs px-3 py-1 rounded ${activeTab === 'split' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Split
          </button>
           <button 
            onClick={() => setActiveTab('combined')}
            className={`text-xs px-3 py-1 rounded ${activeTab === 'combined' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Combined
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'split' ? (
          <>
            <CodeBlock code={html} lang="html" label="HTML" />
            <CodeBlock code={css} lang="css" label="CSS" />
            <CodeBlock code={js} lang="js" label="JavaScript" />
          </>
        ) : (
          <CodeBlock code={fullCode} lang="html" label="Full Snippet" />
        )}
      </div>
    </div>
  );
};
