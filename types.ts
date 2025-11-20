export enum CopySource {
  STATIC = 'static',
  ELEMENT = 'element',
}

export enum ButtonStyle {
  SOLID = 'solid',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  NEOMORPHIC = 'neomorphic',
}

export enum IconStyle {
  NONE = 'none',
  CLIPBOARD = 'clipboard',
  COPY = 'copy',
}

export interface ButtonConfig {
  sourceType: CopySource;
  staticText: string;
  targetElementId: string;
  
  label: string;
  successLabel: string;
  
  styleType: ButtonStyle;
  baseColor: string;
  textColor: string;
  borderRadius: number;
  
  showIcon: IconStyle;
  duration: number; // ms to show success state
  className: string; // Custom class name for output
}
