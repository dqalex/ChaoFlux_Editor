import React from 'react';
import { ThemeStyle } from '../types';

const commonStyles: React.CSSProperties = {
  maxWidth: '100%',
  boxSizing: 'border-box',
  wordWrap: 'break-word',
  textAlign: 'justify',
  marginBottom: '16px',
};

export const defaultThemes: Record<string, ThemeStyle> = {
  'DEFAULT': {
    container: { ...commonStyles, fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '16px', lineHeight: '1.6', color: '#333', backgroundColor: '#ffffff' },
    h1: { fontSize: '24px', fontWeight: 'bold', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px', marginTop: '30px', textAlign: 'center' },
    h2: { fontSize: '20px', fontWeight: 'bold', borderLeft: '4px solid #333', paddingLeft: '10px', marginBottom: '16px', marginTop: '24px' },
    h3: { fontSize: '18px', fontWeight: 'bold', marginBottom: '14px', marginTop: '20px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', lineHeight: '1.6' },
    blockquote: { borderLeft: '4px solid #ccc', padding: '10px', color: '#666', backgroundColor: '#f9f9f9', margin: '20px 0' },
    img: { maxWidth: '100%', borderRadius: '4px', display: 'block', margin: '20px auto', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    hr: { border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }
  },
  'MINIMALIST': {
    container: { ...commonStyles, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: '17px', lineHeight: '1.8', color: '#222', backgroundColor: '#ffffff', padding: '10px' },
    h1: { fontSize: '26px', fontWeight: '800', marginBottom: '30px', marginTop: '10px', textAlign: 'left', letterSpacing: '-0.5px' },
    h2: { fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', marginTop: '30px', borderBottom: '1px solid #000', paddingBottom: '5px' },
    h3: { fontSize: '19px', fontWeight: 'bold', marginBottom: '15px', marginTop: '25px', color: '#444' },
    p: { ...commonStyles, marginBottom: '24px' },
    li: { marginBottom: '10px', paddingLeft: '5px' },
    blockquote: { padding: '5px 20px', borderLeft: '2px solid #000', fontStyle: 'italic', color: '#555', margin: '30px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto' },
    hr: { border: 'none', borderTop: '1px solid #000', margin: '40px 0' }
  },
  'BUSINESS': {
    container: { ...commonStyles, fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: '1.8', color: '#2c3e50', backgroundColor: '#ffffff', padding: '20px' },
    h1: { fontSize: '24px', fontWeight: 'normal', color: '#2c3e50', borderBottom: '1px solid #bdc3c7', paddingBottom: '15px', marginBottom: '25px', textAlign: 'center', letterSpacing: '1px' },
    h2: { fontSize: '18px', fontWeight: 'bold', color: '#34495e', borderLeft: '4px solid #2c3e50', paddingLeft: '15px', marginBottom: '20px', marginTop: '30px' },
    h3: { fontSize: '16px', fontWeight: 'bold', color: '#7f8c8d', marginBottom: '15px', marginTop: '20px' },
    p: { ...commonStyles, marginBottom: '20px' },
    li: { marginBottom: '10px', color: '#34495e' },
    blockquote: { borderLeft: '3px solid #34495e', padding: '10px 20px', color: '#7f8c8d', fontStyle: 'italic', margin: '20px 0', backgroundColor: '#f8f9fa' },
    img: { maxWidth: '100%', display: 'block', margin: '20px auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hr: { border: 'none', borderTop: '1px solid #ecf0f1', margin: '40px 0' }
  },
  'NATURE': {
    container: { ...commonStyles, fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif', fontSize: '16px', lineHeight: '1.75', color: '#3e4a3d', backgroundColor: '#ffffff', padding: '15px' },
    h1: { fontSize: '24px', fontWeight: 'bold', color: '#2d6a4f', textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #d8f3dc', paddingBottom: '10px' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#40916c', backgroundColor: '#eafbf0', padding: '8px 12px', borderRadius: '4px', marginBottom: '16px', marginTop: '24px', display: 'inline-block' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#52b788', marginBottom: '12px', marginTop: '16px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', color: '#3e4a3d' },
    blockquote: { borderLeft: '4px solid #95d5b2', padding: '10px 15px', color: '#52b788', backgroundColor: '#f0fff4', margin: '20px 0', borderRadius: '0 8px 8px 0' },
    img: { maxWidth: '100%', borderRadius: '8px', display: 'block', margin: '20px auto', border: '1px solid #d8f3dc' },
    hr: { border: 'none', borderTop: '2px dashed #b7e4c7', margin: '30px 0' }
  },
  'TECH_LIGHT': {
    container: { ...commonStyles, fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#334155', backgroundColor: '#ffffff', padding: '15px' },
    h1: { fontSize: '25px', fontWeight: '800', color: '#2563eb', marginBottom: '25px', textAlign: 'left', backgroundImage: 'linear-gradient(to right, #2563eb, #ffffff)', backgroundSize: '100% 2px', backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat', paddingBottom: '8px' },
    h2: { fontSize: '20px', fontWeight: '700', color: '#1e40af', borderLeft: '5px solid #3b82f6', paddingLeft: '12px', marginBottom: '20px', marginTop: '30px' },
    h3: { fontSize: '18px', fontWeight: '600', color: '#64748b', marginBottom: '15px', marginTop: '20px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', listStyleType: 'disc', color: '#475569' },
    blockquote: { borderLeft: '4px solid #60a5fa', padding: '15px', color: '#1e3a8a', backgroundColor: '#eff6ff', margin: '25px 0', borderRadius: '4px' },
    img: { maxWidth: '100%', borderRadius: '6px', display: 'block', margin: '20px auto', boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.1)' },
    hr: { border: 'none', height: '1px', background: 'linear-gradient(to right, #fff, #cbd5e1, #fff)', margin: '30px 0' }
  },
  'ACADEMIC': {
    container: { ...commonStyles, fontFamily: '"Times New Roman", Times, serif', fontSize: '17px', lineHeight: '1.8', color: '#111', backgroundColor: '#ffffff', padding: '20px' },
    h1: { fontSize: '28px', fontWeight: 'bold', color: '#000', marginBottom: '30px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid #000', paddingBottom: '5px', marginBottom: '20px', marginTop: '35px' },
    h3: { fontSize: '19px', fontWeight: 'bold', color: '#555', fontStyle: 'italic', marginBottom: '15px', marginTop: '25px' },
    p: { ...commonStyles, textIndent: '2em' },
    li: { marginBottom: '10px' },
    blockquote: { padding: '10px 40px', color: '#444', fontStyle: 'italic', margin: '20px 0', borderLeft: 'none' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', border: '1px solid #ddd', padding: '5px' },
    hr: { border: 'none', borderTop: '1px solid #000', width: '50%', margin: '40px auto' }
  },
  'WARM_PAPER': {
    container: { ...commonStyles, fontFamily: '"Merriweather", "Georgia", serif', fontSize: '16px', lineHeight: '1.9', color: '#4a4036', backgroundColor: '#fdfbf7', padding: '20px' },
    h1: { fontSize: '26px', fontWeight: 'normal', color: '#8c5e2e', marginBottom: '30px', textAlign: 'center', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'10\' viewBox=\'0 0 40 10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 5 Q 10 0 20 5 T 40 5\' stroke=\'%23d4c5b0\' fill=\'none\' stroke-width=\'2\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat-x', backgroundPosition: 'bottom', paddingBottom: '15px' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#a67c52', marginBottom: '20px', marginTop: '30px', display: 'flex', alignItems: 'center' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#c29d76', marginBottom: '15px', marginTop: '20px' },
    p: { ...commonStyles },
    li: { marginBottom: '10px' },
    blockquote: { borderLeft: '3px solid #e6dace', padding: '15px', color: '#8c7b6c', backgroundColor: '#fff', margin: '25px 0', boxShadow: '2px 2px 5px rgba(0,0,0,0.03)' },
    img: { maxWidth: '100%', borderRadius: '2px', display: 'block', margin: '25px auto', filter: 'sepia(20%)' },
    hr: { border: 'none', borderTop: '1px solid #e6dace', margin: '35px 0' }
  },
  'RETRO_GAME': {
    container: { ...commonStyles, fontFamily: '"Courier New", Courier, monospace', fontSize: '15px', lineHeight: '1.8', color: '#e0e0e0', backgroundColor: '#2b2b2b', padding: '15px', border: '2px solid #00ccaa' },
    h1: { fontSize: '26px', fontWeight: 'bold', color: '#ffff00', borderBottom: '4px solid #00ccaa', paddingBottom: '15px', marginBottom: '25px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '2px' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#ff0055', borderLeft: '8px solid #ffff00', paddingLeft: '12px', marginBottom: '18px', marginTop: '30px', backgroundColor: '#000', padding: '5px 10px' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#00ccaa', marginBottom: '15px', marginTop: '20px' },
    p: { ...commonStyles },
    li: { marginBottom: '10px', listStyleType: 'square', color: '#fff' },
    blockquote: { border: '2px dashed #ffff00', padding: '15px', color: '#00ccaa', backgroundColor: '#000', margin: '20px 0' },
    img: { maxWidth: '100%', border: '4px solid #fff', display: 'block', margin: '20px auto', boxShadow: '8px 8px 0px #000' },
    hr: { border: 'none', borderTop: '4px dashed #00ccaa', margin: '30px 0' }
  },
  'CYBERPUNK': {
    container: { ...commonStyles, fontFamily: 'sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#00ffff', backgroundColor: '#09001f', padding: '20px', border: '1px solid #ff00ff' },
    h1: { fontSize: '28px', fontWeight: '900', color: '#ff00ff', textShadow: '2px 2px #00ffff', marginBottom: '30px', textAlign: 'center', fontStyle: 'italic' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#fff', backgroundColor: '#ff00ff', display: 'inline-block', padding: '5px 15px', transform: 'skew(-10deg)', marginBottom: '20px', marginTop: '30px', boxShadow: '4px 4px 0 #00ffff' },
    h3: { fontSize: '19px', fontWeight: 'bold', color: '#ffff00', borderBottom: '1px solid #00ffff', paddingBottom: '5px', marginBottom: '15px', marginTop: '20px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', color: '#d0d0d0' },
    blockquote: { borderLeft: '6px solid #ff00ff', padding: '15px', color: '#fff', background: 'linear-gradient(90deg, rgba(255,0,255,0.2) 0%, rgba(0,0,0,0) 100%)', margin: '20px 0' },
    img: { maxWidth: '100%', border: '1px solid #00ffff', padding: '5px', backgroundColor: 'rgba(0, 255, 255, 0.2)', display: 'block', margin: '20px auto', boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' },
    hr: { border: 'none', borderTop: '2px solid #ff00ff', margin: '30px 0', boxShadow: '0 0 10px #ff00ff' }
  },
  'KAWAII': {
    container: { ...commonStyles, fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#555', backgroundColor: '#fff0f5', padding: '20px', borderRadius: '20px', border: '4px solid #ffb7b2' },
    h1: { fontSize: '26px', fontWeight: 'bold', color: '#ff6f91', textAlign: 'center', marginBottom: '25px', textShadow: '2px 2px #fff', border: '2px dashed #ff9aa2', borderRadius: '50px', padding: '10px' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#fff', backgroundColor: '#ff9aa2', borderRadius: '15px', padding: '8px 20px', marginBottom: '20px', marginTop: '30px', display: 'inline-block', boxShadow: '3px 3px 0 #ffdac1' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#ffb7b2', marginBottom: '15px', marginTop: '20px', borderBottom: '2px dotted #ff9aa2', paddingBottom: '5px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', color: '#777' },
    blockquote: { backgroundColor: '#fff', borderRadius: '15px', padding: '15px', color: '#ff6f91', border: '2px solid #ffdac1', margin: '20px 0' },
    img: { maxWidth: '100%', borderRadius: '15px', border: '5px solid #fff', boxShadow: '0 5px 15px rgba(255, 183, 178, 0.6)', display: 'block', margin: '20px auto' },
    hr: { border: 'none', borderTop: '4px dotted #ff9aa2', margin: '30px 0' }
  }
};