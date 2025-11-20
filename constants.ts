import { ButtonConfig, ButtonStyle, CopySource, IconStyle } from './types';

export const DEFAULT_CONFIG: ButtonConfig = {
  sourceType: CopySource.STATIC,
  staticText: "Hello World! I was copied.",
  targetElementId: "my-input-id",
  
  label: "Copy to Clipboard",
  successLabel: "Copied!",
  
  styleType: ButtonStyle.SOLID,
  baseColor: "#3b82f6", // Tailwind blue-500
  textColor: "#ffffff",
  borderRadius: 6,
  
  showIcon: IconStyle.CLIPBOARD,
  duration: 2000,
  className: "copy-btn",
};

export const PRESET_COLORS = [
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#10b981", // Emerald
  "#8b5cf6", // Violet
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#1e293b", // Slate
  "#ffffff", // White
];
