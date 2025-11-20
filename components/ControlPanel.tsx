import React from 'react';
import { ButtonConfig, ButtonStyle, CopySource, IconStyle } from '../types';
import { PRESET_COLORS } from '../constants';
import { Palette, Type, Layout, BoxSelect, Settings2 } from 'lucide-react';

interface ControlPanelProps {
  config: ButtonConfig;
  onChange: (newConfig: ButtonConfig) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ config, onChange }) => {
  
  const handleChange = (key: keyof ButtonConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-900 text-slate-300 p-6 border-r border-slate-800">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Settings2 className="w-5 h-5 text-blue-500" />
        Configuration
      </h2>

      <div className="space-y-8">
        {/* Source Section */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Type className="w-4 h-4" /> Content Source
          </h3>
          <div className="bg-slate-800 p-1 rounded-lg flex text-sm">
            <button
              onClick={() => handleChange('sourceType', CopySource.STATIC)}
              className={`flex-1 py-2 px-3 rounded-md transition-all ${config.sourceType === CopySource.STATIC ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-700'}`}
            >
              Static Text
            </button>
            <button
              onClick={() => handleChange('sourceType', CopySource.ELEMENT)}
              className={`flex-1 py-2 px-3 rounded-md transition-all ${config.sourceType === CopySource.ELEMENT ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-700'}`}
            >
              From Element ID
            </button>
          </div>

          {config.sourceType === CopySource.STATIC ? (
            <div>
              <label className="block text-xs mb-1.5 text-slate-400">Text to Copy</label>
              <textarea
                value={config.staticText}
                onChange={(e) => handleChange('staticText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-sm text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none min-h-[80px]"
                placeholder="Enter text to be copied..."
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs mb-1.5 text-slate-400">Target Element ID</label>
              <input
                type="text"
                value={config.targetElementId}
                onChange={(e) => handleChange('targetElementId', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md p-2.5 text-sm text-slate-200 focus:border-blue-500 outline-none"
                placeholder="e.g., my-input-field"
              />
              <p className="text-[10px] text-slate-500 mt-1">The ID of the input or div you want to copy from.</p>
            </div>
          )}
        </section>

        {/* Appearance Section */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Layout className="w-4 h-4" /> Appearance
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1.5 text-slate-400">Button Text</label>
              <input
                type="text"
                value={config.label}
                onChange={(e) => handleChange('label', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md p-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1.5 text-slate-400">Success Text</label>
              <input
                type="text"
                value={config.successLabel}
                onChange={(e) => handleChange('successLabel', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md p-2.5 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs mb-1.5 text-slate-400">Style Variant</label>
            <div className="grid grid-cols-3 gap-2">
              {[ButtonStyle.SOLID, ButtonStyle.OUTLINE, ButtonStyle.GHOST].map((style) => (
                <button
                  key={style}
                  onClick={() => handleChange('styleType', style)}
                  className={`py-2 px-2 text-xs capitalize rounded border ${
                    config.styleType === style 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="block text-xs mb-1.5 text-slate-400">Icon</label>
             <div className="flex gap-3">
               {[IconStyle.NONE, IconStyle.CLIPBOARD, IconStyle.COPY].map(icon => (
                 <button
                  key={icon}
                  onClick={() => handleChange('showIcon', icon)}
                  className={`flex-1 py-2 border rounded text-xs capitalize ${
                    config.showIcon === icon
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                    : 'border-slate-700 bg-slate-800 text-slate-400'
                  }`}
                 >
                   {icon}
                 </button>
               ))}
             </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="space-y-4">
           <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Palette className="w-4 h-4" /> Colors & Sizing
          </h3>
          
          <div>
            <label className="block text-xs mb-2 text-slate-400">Accent Color</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => handleChange('baseColor', color)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${config.baseColor === color ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
               <input 
                type="color" 
                value={config.baseColor}
                onChange={(e) => handleChange('baseColor', e.target.value)}
                className="w-6 h-6 bg-transparent p-0 border-0 rounded-full overflow-hidden cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1.5 text-slate-400">Text Color (Solid)</label>
               <div className="flex items-center gap-2">
                 <input 
                  type="color" 
                  value={config.textColor}
                  onChange={(e) => handleChange('textColor', e.target.value)}
                  className="bg-transparent border-none w-8 h-8"
                />
                <span className="text-xs text-slate-500 font-mono">{config.textColor}</span>
               </div>
            </div>
            <div>
               <label className="block text-xs mb-1.5 text-slate-400">Radius: {config.borderRadius}px</label>
               <input 
                type="range" 
                min="0" 
                max="30" 
                value={config.borderRadius}
                onChange={(e) => handleChange('borderRadius', parseInt(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </section>
        
        {/* Technical Section */}
        <section className="space-y-4">
           <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <BoxSelect className="w-4 h-4" /> Attributes
          </h3>
           <div>
              <label className="block text-xs mb-1.5 text-slate-400">Class Name</label>
              <input
                type="text"
                value={config.className}
                onChange={(e) => handleChange('className', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-md p-2.5 text-sm font-mono text-slate-400 focus:text-slate-200"
              />
            </div>
             <div>
              <label className="block text-xs mb-1.5 text-slate-400">Feedback Duration (ms)</label>
              <input
                type="number"
                min="500"
                step="100"
                value={config.duration}
                onChange={(e) => handleChange('duration', parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-md p-2.5 text-sm"
              />
            </div>
        </section>

      </div>
    </div>
  );
};
