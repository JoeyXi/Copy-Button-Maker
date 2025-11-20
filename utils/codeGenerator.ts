import { ButtonConfig, ButtonStyle, CopySource, IconStyle } from '../types';

// Helper to get SVG path based on selection
const getIconSVG = (icon: IconStyle, color: string = 'currentColor'): string => {
  if (icon === IconStyle.CLIPBOARD) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;
  }
  if (icon === IconStyle.COPY) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
  }
  return '';
};

const getSuccessIconSVG = (): string => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon"><path d="M20 6 9 17l-5-5"/></svg>`;
};

export const generateCSS = (config: ButtonConfig): string => {
  const { className, baseColor, textColor, borderRadius, styleType } = config;
  
  let baseStyles = `
.${className} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 14px;
  font-weight: 500;
  border-radius: ${borderRadius}px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  outline: none;
  position: relative;
  overflow: hidden;
}
.${className} .btn-icon {
  width: 16px;
  height: 16px;
}
.${className}:active {
  transform: scale(0.98);
}
`;

  let specificStyles = '';

  switch (styleType) {
    case ButtonStyle.SOLID:
      specificStyles = `
.${className} {
  background-color: ${baseColor};
  color: ${textColor};
  border-color: ${baseColor};
}
.${className}:hover {
  filter: brightness(110%);
  box-shadow: 0 4px 12px ${baseColor}40;
}
`;
      break;
    case ButtonStyle.OUTLINE:
      specificStyles = `
.${className} {
  background-color: transparent;
  color: ${baseColor};
  border-color: ${baseColor};
}
.${className}:hover {
  background-color: ${baseColor}10;
}
`;
      break;
    case ButtonStyle.GHOST:
      specificStyles = `
.${className} {
  background-color: transparent;
  color: ${baseColor};
}
.${className}:hover {
  background-color: ${baseColor}15;
}
`;
      break;
    case ButtonStyle.NEOMORPHIC:
      specificStyles = `
.${className} {
  background-color: #e0e5ec; /* Neomorphic usually needs specific bg */
  color: ${baseColor};
  box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5);
}
.${className}:active {
  box-shadow: inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8);
}
/* Override for dark mode generated preview if needed, but keeping generic here */
`;
      break;
  }

  return (baseStyles + specificStyles).trim();
};

export const generateHTML = (config: ButtonConfig): string => {
  const iconHtml = config.showIcon !== IconStyle.NONE ? getIconSVG(config.showIcon, config.styleType === ButtonStyle.SOLID ? config.textColor : config.baseColor) : '';
  
  // We include a data attribute for the original text to make swapping easy in JS
  return `<button class="${config.className}" id="${config.className}-id" type="button">
  ${iconHtml}
  <span class="btn-text">${config.label}</span>
</button>`;
};

export const generateJS = (config: ButtonConfig): string => {
  const { sourceType, staticText, targetElementId, successLabel, label, duration, className, showIcon, styleType, textColor, baseColor } = config;
  
  const iconSvg = config.showIcon !== IconStyle.NONE 
    ? getIconSVG(showIcon, styleType === ButtonStyle.SOLID ? textColor : baseColor).replace(/"/g, "'")
    : '';
    
  const successIconSvg = getSuccessIconSVG().replace(/"/g, "'");
  
  let textRetrievalLogic = '';
  
  if (sourceType === CopySource.STATIC) {
    textRetrievalLogic = `const textToCopy = "${staticText}";`;
  } else {
    textRetrievalLogic = `
    const targetElement = document.getElementById('${targetElementId}');
    const textToCopy = targetElement ? (targetElement.value || targetElement.innerText) : '';
    if (!textToCopy) { console.warn('No text found to copy'); return; }
    `;
  }

  return `
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('${className}-id');
  const originalText = "${label}";
  const successText = "${successLabel}";
  const originalIcon = "${iconSvg}"; 
  const successIcon = "${successIconSvg}";
  
  if (!button) return;

  button.addEventListener('click', async () => {
    ${textRetrievalLogic.trim()}

    try {
      await navigator.clipboard.writeText(textToCopy);
      
      // Update UI to success state
      const textSpan = button.querySelector('.btn-text');
      if(textSpan) textSpan.textContent = successText;
      
      // If there was an icon, swap it (optional simple approach: re-render innerHTML)
      // For smoother perf, we just update innerHTML here
      button.innerHTML = successIcon + '<span class="btn-text">' + successText + '</span>';
      
      setTimeout(() => {
        // Revert to original state
        button.innerHTML = originalIcon + '<span class="btn-text">' + originalText + '</span>';
      }, ${duration});
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  });
});
`.trim();
};
