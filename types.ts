import React from 'react';

export type Language = 'zh' | 'en';
export type FontSize = 'small' | 'medium' | 'large';

export enum GeneratorMode {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export type AIProvider = 'google' | 'openai';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  baseUrl?: string; // For OpenAI compatible (e.g. https://api.deepseek.com/v1)
  model?: string;   // e.g. deepseek-chat or gemini-1.5-pro
}

export interface ThemeStyle {
  container: React.CSSProperties;
  h1: React.CSSProperties;
  h2: React.CSSProperties;
  h3: React.CSSProperties;
  p: React.CSSProperties;
  li: React.CSSProperties;
  blockquote: React.CSSProperties;
  img: React.CSSProperties;
  hr: React.CSSProperties;
}

export interface MarkdownElement {
  type: 'h1' | 'h2' | 'h3' | 'p' | 'li' | 'img' | 'blockquote' | 'hr';
  content: string;
  url?: string; // For images
  alt?: string; // For images
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  type: 'text' | 'image';
}

export interface ArticleVersion {
  id: string;
  timestamp: number;
  content: string;
  label?: string;
}

export interface UserData {
  markdown: string;
  chatHistory: ChatMessage[];
  versions: ArticleVersion[];
}

export interface AppSettings {
  customThemes: Record<string, ThemeStyle>;
  language: Language;
  fontSize?: FontSize;
  // Separate configs
  textAI?: AIConfig;
  imageAI?: AIConfig;
  // Deprecated single config (kept for migration)
  aiConfig?: AIConfig;
  hasSeenOnboarding?: boolean;
}

// Deprecated but kept for compatibility during migration if needed
export interface AppConfig {
  markdown: string;
  customThemes: Record<string, ThemeStyle>;
  chatHistory: ChatMessage[];
  language: Language;
}