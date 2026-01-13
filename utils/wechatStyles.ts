import React from 'react';
import { ThemeStyle, FontSize } from '../types';

const commonStyles: React.CSSProperties = {
  maxWidth: '100%',
  boxSizing: 'border-box',
  wordWrap: 'break-word',
  textAlign: 'justify',
  marginBottom: '16px',
};

export const applyFontSize = (theme: ThemeStyle, size: FontSize): ThemeStyle => {
  if (!theme) return theme;
  
  const sizeMap: Record<FontSize, string> = {
    small: '14px',
    medium: '16px',
    large: '18px'
  };
  const newSize = sizeMap[size];
  
  // Deep clone to avoid mutation
  const newTheme = JSON.parse(JSON.stringify(theme));
  
  if (newTheme.container) newTheme.container.fontSize = newSize;
  if (newTheme.p) newTheme.p.fontSize = newSize;
  
  return newTheme;
};

export const defaultThemes: Record<string, ThemeStyle> = {
  // --- EXISTING 10 THEMES ---
  'APPLE_CHIC': {
    container: { ...commonStyles, fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#1d1d1f', backgroundColor: '#ffffff', padding: '20px' },
    h1: { fontSize: '28px', fontWeight: '800', textAlign: 'left', lineHeight: '1.1', color: '#1d1d1f', marginBottom: '30px', letterSpacing: '-0.5px' },
    h2: { fontSize: '22px', fontWeight: '700', textAlign: 'left', marginTop: '40px', marginBottom: '20px', color: '#1d1d1f' },
    h3: { fontSize: '19px', fontWeight: '600', textAlign: 'left', marginTop: '24px', marginBottom: '12px', color: '#86868b' },
    p: { ...commonStyles, color: '#1d1d1f' },
    li: { marginBottom: '8px', lineHeight: '1.8' },
    blockquote: { borderLeft: '4px solid #1d1d1f', padding: '0 20px', color: '#86868b', fontStyle: 'normal', margin: '30px 0', fontSize: '18px', fontWeight: '500' },
    img: { maxWidth: '100%', borderRadius: '12px', display: 'block', margin: '30px auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
    hr: { border: 'none', borderTop: '1px solid #d2d2d7', margin: '40px 0' }
  },
  'FUTURE_TECH': {
    container: { ...commonStyles, fontFamily: '"JetBrains Mono", monospace', fontSize: '15px', lineHeight: '1.7', color: '#c9d1d9', backgroundColor: '#0d1117', padding: '24px', borderRadius: '8px' },
    h1: { fontSize: '24px', fontWeight: 'bold', color: '#58a6ff', marginBottom: '25px', textAlign: 'center', border: '1px solid #30363d', padding: '15px', borderRadius: '6px', background: 'rgba(56, 139, 253, 0.1)' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#7ee787', borderLeft: '3px solid #7ee787', paddingLeft: '12px', marginBottom: '20px', marginTop: '30px' },
    h3: { fontSize: '17px', fontWeight: 'bold', color: '#79c0ff', marginBottom: '15px', marginTop: '20px' },
    p: { ...commonStyles, color: '#c9d1d9' },
    li: { marginBottom: '8px', color: '#8b949e' },
    blockquote: { borderLeft: '2px solid #a371f7', padding: '10px 15px', color: '#d2a8ff', backgroundColor: 'rgba(163, 113, 247, 0.1)', margin: '20px 0' },
    img: { maxWidth: '100%', borderRadius: '6px', display: 'block', margin: '20px auto', border: '1px solid #30363d' },
    hr: { border: 'none', borderTop: '1px solid #30363d', margin: '30px 0' }
  },
  'NEO_BRUTALISM': {
    container: { ...commonStyles, fontFamily: 'sans-serif', fontSize: '16px', lineHeight: '1.6', color: '#000', backgroundColor: '#fff', padding: '20px', border: '3px solid #000', boxShadow: '8px 8px 0px #000' },
    h1: { fontSize: '30px', fontWeight: '900', color: '#000', backgroundColor: '#ff6b6b', padding: '15px', border: '3px solid #000', boxShadow: '4px 4px 0px #000', marginBottom: '30px', textAlign: 'center', transform: 'rotate(-1deg)' },
    h2: { fontSize: '24px', fontWeight: '800', color: '#000', backgroundColor: '#4ecdc4', display: 'inline-block', padding: '8px 15px', border: '3px solid #000', boxShadow: '4px 4px 0px #000', marginBottom: '20px', marginTop: '30px' },
    h3: { fontSize: '20px', fontWeight: '800', color: '#000', textDecoration: 'underline', textDecorationThickness: '3px', textDecorationColor: '#ffe66d', marginBottom: '15px' },
    p: { ...commonStyles, fontWeight: '500' },
    li: { marginBottom: '8px', listStyleType: 'square', fontWeight: '600' },
    blockquote: { border: '3px solid #000', padding: '15px', backgroundColor: '#ffe66d', color: '#000', fontWeight: 'bold', boxShadow: '4px 4px 0px #000', margin: '25px 0' },
    img: { maxWidth: '100%', border: '3px solid #000', display: 'block', margin: '25px auto', boxShadow: '6px 6px 0px #000' },
    hr: { border: 'none', borderTop: '4px solid #000', margin: '30px 0' }
  },
  'ACADEMIC_NOTE': {
    container: { ...commonStyles, fontFamily: '"Georgia", serif', fontSize: '16px', lineHeight: '1.8', color: '#37352f', backgroundColor: '#ffffff', padding: '20px' },
    h1: { fontSize: '28px', fontWeight: '600', color: '#37352f', marginBottom: '24px', marginTop: '10px' },
    h2: { fontSize: '22px', fontWeight: '600', color: '#37352f', paddingBottom: '6px', borderBottom: '1px solid #e0e0e0', marginBottom: '16px', marginTop: '32px' },
    h3: { fontSize: '18px', fontWeight: '600', color: '#37352f', marginBottom: '8px', marginTop: '20px' },
    p: { ...commonStyles },
    li: { marginBottom: '6px' },
    blockquote: { borderLeft: '3px solid #37352f', padding: '10px 14px', color: '#37352f', fontSize: '16px', margin: '20px 0', backgroundColor: '#f7f6f3' },
    img: { maxWidth: '100%', display: 'block', margin: '24px auto', borderRadius: '4px' },
    hr: { border: 'none', borderTop: '1px solid #e0e0e0', margin: '32px 0' }
  },
  'MACARON_POP': {
    container: { ...commonStyles, fontFamily: '"Varela Round", sans-serif', fontSize: '15px', lineHeight: '1.9', color: '#666', backgroundColor: '#fff', padding: '24px', border: '4px dashed #ffc8dd', borderRadius: '20px' },
    h1: { fontSize: '24px', fontWeight: 'bold', color: '#ff8fab', textAlign: 'center', marginBottom: '25px', textShadow: '2px 2px #fff', backgroundColor: '#fff0f5', padding: '15px', borderRadius: '50px' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#fff', backgroundColor: '#cdb4db', display: 'inline-block', padding: '8px 20px', borderRadius: '15px', marginBottom: '20px', marginTop: '30px', boxShadow: '3px 3px 0 #bde0fe' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#ffafcc', marginBottom: '15px', marginTop: '20px', borderBottom: '2px dotted #ffc8dd' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', color: '#777' },
    blockquote: { backgroundColor: '#f0f4ff', borderRadius: '15px', padding: '15px', color: '#a2d2ff', border: '2px solid #bde0fe', margin: '20px 0' },
    img: { maxWidth: '100%', borderRadius: '20px', border: '5px solid #fff', boxShadow: '0 5px 15px rgba(189, 224, 254, 0.5)', display: 'block', margin: '20px auto' },
    hr: { border: 'none', borderTop: '3px dotted #cdb4db', margin: '30px 0' }
  },
  'ZEN_TEA': {
    container: { ...commonStyles, fontFamily: '"PingFang SC", serif', fontSize: '16px', lineHeight: '2.0', color: '#5c5c5c', backgroundColor: '#f7f7f2', padding: '30px' },
    h1: { fontSize: '26px', fontWeight: 'normal', color: '#3d4c53', textAlign: 'center', marginBottom: '40px', marginTop: '10px', letterSpacing: '4px' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#4a5e6a', borderLeft: '4px solid #849974', paddingLeft: '15px', marginBottom: '25px', marginTop: '40px' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#849974', marginBottom: '20px', marginTop: '30px', textAlign: 'center' },
    p: { ...commonStyles, textIndent: '2em' },
    li: { marginBottom: '10px' },
    blockquote: { border: 'none', padding: '20px', color: '#5c5c5c', backgroundColor: '#e6e8e3', margin: '30px 0', textAlign: 'center', fontStyle: 'italic' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto', filter: 'sepia(10%) contrast(90%)' },
    hr: { border: 'none', borderTop: '1px solid #c9c9c9', width: '30%', margin: '50px auto' }
  },
  'DEEP_BUSINESS': {
    container: { ...commonStyles, fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.75', color: '#333', backgroundColor: '#fff', padding: '24px' },
    h1: { fontSize: '26px', fontWeight: 'bold', color: '#0f172a', textAlign: 'left', marginBottom: '30px', paddingBottom: '15px', borderBottom: '2px solid #0f172a' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '20px', marginTop: '35px', display: 'flex', alignItems: 'center' },
    h3: { fontSize: '17px', fontWeight: 'bold', color: '#64748b', marginBottom: '15px', marginTop: '20px', textTransform: 'uppercase', letterSpacing: '1px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', color: '#475569' },
    blockquote: { borderLeft: '4px solid #1e3a8a', padding: '15px 20px', color: '#0f172a', backgroundColor: '#f1f5f9', margin: '25px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    hr: { border: 'none', borderTop: '1px solid #cbd5e1', margin: '40px 0' }
  },
  'SUNSET_GRADIENT': {
    container: { ...commonStyles, fontFamily: 'sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#2d3436', backgroundColor: '#fff', padding: '20px' },
    h1: { fontSize: '26px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', background: '-webkit-linear-gradient(45deg, #FF512F, #DD2476)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', padding: '10px 0' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#fff', background: 'linear-gradient(to right, #FF512F, #DD2476)', padding: '10px 20px', borderRadius: '0 20px 20px 0', marginBottom: '20px', marginTop: '30px', display: 'inline-block' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#DD2476', marginBottom: '15px', marginTop: '20px', paddingLeft: '10px', borderLeft: '3px solid #FF512F' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: 'none', borderRight: '4px solid #DD2476', padding: '15px', color: '#555', backgroundColor: '#fff0f3', margin: '20px 0', borderRadius: '8px 0 0 8px' },
    img: { maxWidth: '100%', borderRadius: '12px', display: 'block', margin: '25px auto', boxShadow: '0 8px 20px rgba(221, 36, 118, 0.15)' },
    hr: { border: 'none', height: '2px', background: 'linear-gradient(to right, #FF512F, #DD2476)', margin: '35px 0', opacity: 0.5 }
  },
  'GLASS_MORPHISM': {
    container: { ...commonStyles, fontFamily: 'system-ui, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#4a4a4a', backgroundColor: '#f0f2f5', padding: '24px' },
    h1: { fontSize: '25px', fontWeight: '700', color: '#2c3e50', textAlign: 'center', marginBottom: '30px', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' },
    h2: { fontSize: '21px', fontWeight: '600', color: '#34495e', marginTop: '35px', marginBottom: '20px', paddingLeft: '15px', position: 'relative' },
    h3: { fontSize: '18px', fontWeight: '600', color: '#7f8c8d', marginTop: '20px', marginBottom: '15px' },
    p: { ...commonStyles, backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.3)' },
    li: { marginBottom: '8px' },
    blockquote: { border: '1px solid rgba(255, 255, 255, 0.3)', padding: '20px', color: '#555', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '16px', margin: '25px 0', fontStyle: 'italic' },
    img: { maxWidth: '100%', borderRadius: '16px', display: 'block', margin: '25px auto', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' },
    hr: { border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)', margin: '40px 0' }
  },
  'CHINA_CHIC': {
    container: { ...commonStyles, fontFamily: '"PingFang SC", sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#1a1a1a', backgroundColor: '#fff', padding: '20px' },
    h1: { fontSize: '28px', fontWeight: 'bold', color: '#c0392b', textAlign: 'center', marginBottom: '35px', border: '2px solid #c0392b', padding: '15px 30px', display: 'block', margin: '0 auto 35px', maxWidth: 'fit-content' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#fff', backgroundColor: '#c0392b', padding: '8px 20px', marginBottom: '25px', marginTop: '40px', clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)', width: 'fit-content' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#c0392b', marginBottom: '15px', marginTop: '25px', borderBottom: '2px solid #1a1a1a', display: 'inline-block', paddingBottom: '5px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', listStyleType: 'circle', color: '#333' },
    blockquote: { borderLeft: '6px solid #c0392b', padding: '15px 20px', color: '#555', backgroundColor: '#fff5f5', margin: '25px 0' },
    img: { maxWidth: '100%', border: '2px solid #1a1a1a', padding: '5px', display: 'block', margin: '30px auto' },
    hr: { border: 'none', height: '2px', backgroundColor: '#c0392b', margin: '40px 0', width: '80%', marginLeft: 'auto', marginRight: 'auto' }
  },

  // --- NEW 20 THEMES ---
  
  'RETRO_GAME': {
    container: { ...commonStyles, fontFamily: '"Courier New", monospace', fontSize: '14px', lineHeight: '1.6', color: '#00ff00', backgroundColor: '#000000', padding: '20px' },
    h1: { fontSize: '24px', fontWeight: 'bold', color: '#00ff00', textAlign: 'center', marginBottom: '20px', borderBottom: '4px double #00ff00', paddingBottom: '10px' },
    h2: { fontSize: '18px', fontWeight: 'bold', color: '#000000', backgroundColor: '#00ff00', padding: '5px 10px', marginTop: '30px', marginBottom: '20px', display: 'inline-block' },
    h3: { fontSize: '16px', fontWeight: 'bold', color: '#00ff00', textDecoration: 'underline', marginTop: '20px', marginBottom: '10px' },
    p: { ...commonStyles, textShadow: '0 0 2px #003300' },
    li: { marginBottom: '5px' },
    blockquote: { border: '2px solid #00ff00', padding: '15px', color: '#00ff00', margin: '20px 0', borderStyle: 'dashed' },
    img: { maxWidth: '100%', border: '2px solid #00ff00', display: 'block', margin: '20px auto', filter: 'grayscale(100%) contrast(150%) brightness(80%) sepia(100%) hue-rotate(50deg) saturate(500%)' },
    hr: { border: 'none', borderTop: '2px dashed #00ff00', margin: '30px 0' }
  },

  'COFFEE_HOUSE': {
    container: { ...commonStyles, fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: '1.8', color: '#4a3b2a', backgroundColor: '#f5e6d3', padding: '25px', backgroundImage: 'radial-gradient(#e6d2b5 1px, transparent 1px)', backgroundSize: '10px 10px' },
    h1: { fontSize: '32px', fontWeight: 'bold', color: '#3e2723', textAlign: 'center', marginBottom: '30px', fontFamily: 'fantasy' },
    h2: { fontSize: '24px', fontWeight: 'bold', color: '#5d4037', borderBottom: '2px solid #8d6e63', paddingBottom: '5px', marginTop: '35px', marginBottom: '20px' },
    h3: { fontSize: '20px', fontWeight: 'bold', color: '#795548', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '4px solid #795548', padding: '10px 20px', color: '#5d4037', backgroundColor: '#efebe9', margin: '25px 0', fontStyle: 'italic' },
    img: { maxWidth: '100%', borderRadius: '4px', display: 'block', margin: '25px auto', boxShadow: '5px 5px 0px #d7ccc8' },
    hr: { border: 'none', borderTop: '2px dotted #8d6e63', margin: '35px 0' }
  },

  'MIDNIGHT_NEON': {
    container: { ...commonStyles, fontFamily: 'Verdana, sans-serif', fontSize: '15px', lineHeight: '1.7', color: '#e0e0e0', backgroundColor: '#121212', padding: '20px' },
    h1: { fontSize: '28px', fontWeight: 'bold', color: '#ff00ff', textAlign: 'center', marginBottom: '30px', textShadow: '0 0 10px #ff00ff', border: '2px solid #00ffff', padding: '10px', boxShadow: '0 0 10px #00ffff, inset 0 0 10px #00ffff' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#00ffff', marginTop: '35px', marginBottom: '20px', textShadow: '0 0 5px #00ffff', paddingLeft: '10px', borderLeft: '4px solid #ff00ff' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#ffff00', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', color: '#ccc' },
    blockquote: { borderLeft: '2px solid #ff00ff', padding: '15px', color: '#e0e0e0', backgroundColor: '#2a0a2a', margin: '25px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', border: '1px solid #e0e0e0', boxShadow: '0 0 15px rgba(255, 0, 255, 0.5)' },
    hr: { border: 'none', height: '1px', background: 'linear-gradient(90deg, #ff00ff, #00ffff)', margin: '35px 0' }
  },

  'FOREST_HIKER': {
    container: { ...commonStyles, fontFamily: '"Trebuchet MS", sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#2f3e46', backgroundColor: '#e9f5db', padding: '24px' },
    h1: { fontSize: '30px', fontWeight: 'bold', color: '#354f52', textAlign: 'center', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '2px' },
    h2: { fontSize: '24px', fontWeight: 'bold', color: '#52796f', borderBottom: '3px dashed #84a98c', paddingBottom: '10px', marginTop: '40px', marginBottom: '20px' },
    h3: { fontSize: '20px', fontWeight: 'bold', color: '#84a98c', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '5px solid #52796f', padding: '15px 20px', color: '#354f52', backgroundColor: '#cad2c5', margin: '25px 0', borderRadius: '0 10px 10px 0' },
    img: { maxWidth: '100%', borderRadius: '8px', display: 'block', margin: '25px auto', border: '5px solid #fff' },
    hr: { border: 'none', borderTop: '2px solid #84a98c', margin: '35px 0' }
  },

  'TYPEWRITER': {
    container: { ...commonStyles, fontFamily: '"Courier New", Courier, monospace', fontSize: '16px', lineHeight: '1.6', color: '#333', backgroundColor: '#fffdf0', padding: '30px', boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)' },
    h1: { fontSize: '28px', fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: '35px', textDecoration: 'underline' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#222', marginTop: '35px', marginBottom: '20px', backgroundColor: '#eee', display: 'inline', padding: '2px 5px' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#444', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', listStyleType: 'decimal' },
    blockquote: { borderLeft: '2px solid #333', padding: '10px 20px', color: '#555', margin: '25px 0', fontStyle: 'italic' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', filter: 'grayscale(100%) contrast(120%)' },
    hr: { border: 'none', borderTop: '1px dashed #333', margin: '35px 0' }
  },

  'NEWSPAPER': {
    container: { ...commonStyles, fontFamily: '"Times New Roman", Times, serif', fontSize: '17px', lineHeight: '1.5', color: '#111', backgroundColor: '#fff', padding: '20px' },
    h1: { fontSize: '36px', fontWeight: '900', color: '#000', textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase', borderBottom: '3px double #000', paddingBottom: '10px' },
    h2: { fontSize: '24px', fontWeight: 'bold', color: '#000', marginTop: '30px', marginBottom: '15px', borderTop: '1px solid #000', paddingTop: '10px' },
    h3: { fontSize: '20px', fontWeight: 'bold', color: '#333', marginTop: '20px', marginBottom: '10px', fontStyle: 'italic' },
    p: { ...commonStyles, textAlign: 'justify' },
    li: { marginBottom: '5px' },
    blockquote: { borderLeft: '2px solid #000', padding: '10px 15px', color: '#000', margin: '20px 0', fontWeight: 'bold' },
    img: { maxWidth: '100%', display: 'block', margin: '20px auto', filter: 'grayscale(100%)' },
    hr: { border: 'none', borderTop: '1px solid #000', margin: '30px 0' }
  },

  'CANDY_LAND': {
    container: { ...commonStyles, fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif', fontSize: '16px', lineHeight: '1.6', color: '#555', backgroundColor: '#fff0f5', padding: '20px' },
    h1: { fontSize: '30px', fontWeight: 'bold', color: '#ff6b81', textAlign: 'center', marginBottom: '25px', textShadow: '2px 2px #ffff00' },
    h2: { fontSize: '24px', fontWeight: 'bold', color: '#fff', backgroundColor: '#ff69b4', padding: '10px 20px', borderRadius: '30px', marginTop: '35px', marginBottom: '20px', display: 'inline-block' },
    h3: { fontSize: '20px', fontWeight: 'bold', color: '#9370db', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', color: '#ff4500' },
    blockquote: { border: '3px dotted #ff69b4', padding: '15px', color: '#8a2be2', backgroundColor: '#e6e6fa', margin: '25px 0', borderRadius: '15px' },
    img: { maxWidth: '100%', borderRadius: '20px', display: 'block', margin: '25px auto', border: '5px solid #fff' },
    hr: { border: 'none', borderTop: '4px dotted #ff1493', margin: '35px 0' }
  },

  'LUXURY_GOLD': {
    container: { ...commonStyles, fontFamily: 'Didot, "Didot LT STD", "Hoefler Text", Garamond, serif', fontSize: '16px', lineHeight: '1.8', color: '#ccc', backgroundColor: '#111', padding: '30px' },
    h1: { fontSize: '32px', fontWeight: 'normal', color: '#d4af37', textAlign: 'center', marginBottom: '40px', letterSpacing: '2px', borderBottom: '1px solid #d4af37', paddingBottom: '20px' },
    h2: { fontSize: '24px', fontWeight: 'normal', color: '#f3e5ab', marginTop: '40px', marginBottom: '25px', textAlign: 'center', textTransform: 'uppercase' },
    h3: { fontSize: '18px', fontWeight: 'normal', color: '#d4af37', marginTop: '30px', marginBottom: '15px', textAlign: 'center' },
    p: { ...commonStyles, textAlign: 'center' },
    li: { marginBottom: '10px', textAlign: 'center', listStyle: 'none' },
    blockquote: { borderTop: '1px solid #d4af37', borderBottom: '1px solid #d4af37', padding: '20px 0', color: '#f3e5ab', margin: '30px 0', textAlign: 'center', fontStyle: 'italic' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto', border: '1px solid #d4af37', padding: '5px' },
    hr: { border: 'none', borderTop: '1px solid #333', margin: '40px 0' }
  },

  'MINIMAL_MONO': {
    container: { ...commonStyles, fontFamily: '"Fira Code", monospace', fontSize: '14px', lineHeight: '1.6', color: '#000', backgroundColor: '#fff', padding: '20px' },
    h1: { fontSize: '20px', fontWeight: 'bold', color: '#000', textAlign: 'left', marginBottom: '30px' },
    h2: { fontSize: '16px', fontWeight: 'bold', color: '#000', marginTop: '30px', marginBottom: '20px', textDecoration: 'underline' },
    h3: { fontSize: '14px', fontWeight: 'bold', color: '#000', marginTop: '20px', marginBottom: '10px' },
    p: { ...commonStyles, marginBottom: '20px' },
    li: { marginBottom: '10px' },
    blockquote: { borderLeft: '2px solid #000', paddingLeft: '15px', color: '#000', margin: '20px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '20px auto', filter: 'grayscale(100%)' },
    hr: { border: 'none', borderTop: '1px solid #000', margin: '40px 0' }
  },

  'OCEAN_BREEZE': {
    container: { ...commonStyles, fontFamily: 'Verdana, sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#006064', backgroundColor: '#e0f7fa', padding: '24px' },
    h1: { fontSize: '28px', fontWeight: 'bold', color: '#00838f', textAlign: 'center', marginBottom: '30px', textShadow: '1px 1px #fff' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#fff', backgroundColor: '#4dd0e1', padding: '10px 20px', borderRadius: '0 20px 20px 0', marginTop: '35px', marginBottom: '20px', display: 'inline-block' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#0097a7', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '5px solid #26c6da', padding: '15px', color: '#006064', backgroundColor: '#b2ebf2', margin: '25px 0', borderRadius: '8px' },
    img: { maxWidth: '100%', borderRadius: '12px', display: 'block', margin: '25px auto', boxShadow: '0 4px 10px rgba(0, 96, 100, 0.2)' },
    hr: { border: 'none', height: '2px', backgroundColor: '#80deea', margin: '35px 0' }
  },

  'VAPORWAVE': {
    container: { ...commonStyles, fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#fff', backgroundColor: '#ff71ce', backgroundImage: 'linear-gradient(to bottom, #ff71ce, #01cdfe)', padding: '20px' },
    h1: { fontSize: '30px', fontWeight: '900', color: '#fff01f', textAlign: 'center', marginBottom: '30px', textShadow: '3px 3px 0 #05ffa1', fontStyle: 'italic' },
    h2: { fontSize: '24px', fontWeight: 'bold', color: '#01cdfe', backgroundColor: '#fff', padding: '10px 15px', marginTop: '35px', marginBottom: '20px', transform: 'skew(-10deg)', display: 'inline-block' },
    h3: { fontSize: '20px', fontWeight: 'bold', color: '#b967ff', marginTop: '25px', marginBottom: '15px', textShadow: '1px 1px #000' },
    p: { ...commonStyles, textShadow: '1px 1px 2px rgba(0,0,0,0.2)' },
    li: { marginBottom: '8px' },
    blockquote: { border: '2px solid #fff', padding: '15px', color: '#fff', backgroundColor: 'rgba(0,0,0,0.2)', margin: '25px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', border: '2px solid #fff', boxShadow: '5px 5px 0 rgba(0,0,0,0.2)' },
    hr: { border: 'none', borderTop: '2px dashed #fff', margin: '35px 0' }
  },

  'GOTHIC_TALE': {
    container: { ...commonStyles, fontFamily: '"Times New Roman", serif', fontSize: '17px', lineHeight: '1.6', color: '#d3d3d3', backgroundColor: '#2b2b2b', padding: '25px', border: '5px double #555' },
    h1: { fontSize: '34px', fontWeight: 'bold', color: '#a00', textAlign: 'center', marginBottom: '35px', fontFamily: 'fantasy', letterSpacing: '1px' },
    h2: { fontSize: '24px', fontWeight: 'bold', color: '#d3d3d3', borderBottom: '1px solid #777', paddingBottom: '5px', marginTop: '40px', marginBottom: '20px', textAlign: 'center' },
    h3: { fontSize: '20px', fontWeight: 'bold', color: '#888', marginTop: '30px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '3px solid #a00', padding: '10px 20px', color: '#999', backgroundColor: '#1a1a1a', margin: '30px 0', fontStyle: 'italic' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto', border: '10px solid #1a1a1a', boxShadow: '0 0 10px #000' },
    hr: { border: 'none', borderTop: '1px solid #555', margin: '40px 0' }
  },

  'SPRING_BLOSSOM': {
    container: { ...commonStyles, fontFamily: '"Microsoft YaHei", sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#555', backgroundColor: '#fff5f7', padding: '24px' },
    h1: { fontSize: '26px', fontWeight: 'bold', color: '#ff6b81', textAlign: 'center', marginBottom: '30px' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#fff', backgroundColor: '#ff8da1', padding: '8px 20px', borderRadius: '50px', marginTop: '35px', marginBottom: '20px', display: 'inline-block' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#ff6b81', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '4px solid #ffb7b2', padding: '15px', color: '#777', backgroundColor: '#fff', margin: '25px 0' },
    img: { maxWidth: '100%', borderRadius: '8px', display: 'block', margin: '25px auto', border: '3px solid #ffccd5' },
    hr: { border: 'none', borderTop: '1px dashed #ff8da1', margin: '35px 0' }
  },

  'AUTUMN_LEAVES': {
    container: { ...commonStyles, fontFamily: 'Georgia, serif', fontSize: '16px', lineHeight: '1.8', color: '#5d4037', backgroundColor: '#fff3e0', padding: '24px' },
    h1: { fontSize: '28px', fontWeight: 'bold', color: '#bf360c', textAlign: 'center', marginBottom: '30px' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#e65100', borderBottom: '2px solid #e65100', display: 'inline-block', paddingBottom: '5px', marginTop: '35px', marginBottom: '20px' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#f57c00', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '4px solid #e65100', padding: '15px', color: '#6d4c41', backgroundColor: '#ffe0b2', margin: '25px 0' },
    img: { maxWidth: '100%', borderRadius: '4px', display: 'block', margin: '25px auto', border: '1px solid #ffb74d' },
    hr: { border: 'none', borderTop: '2px solid #ffcc80', margin: '35px 0' }
  },

  'WINTER_FROST': {
    container: { ...commonStyles, fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#455a64', backgroundColor: '#f0f8ff', padding: '24px' },
    h1: { fontSize: '28px', fontWeight: 'bold', color: '#0277bd', textAlign: 'center', marginBottom: '30px' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#0288d1', borderLeft: '5px solid #b3e5fc', paddingLeft: '15px', marginTop: '35px', marginBottom: '20px' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#039be5', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { border: '1px solid #b3e5fc', padding: '15px', color: '#546e7a', backgroundColor: '#e1f5fe', margin: '25px 0', borderRadius: '4px' },
    img: { maxWidth: '100%', borderRadius: '4px', display: 'block', margin: '25px auto', border: '3px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    hr: { border: 'none', borderTop: '1px solid #b3e5fc', margin: '35px 0' }
  },

  'SUMMER_VIBES': {
    container: { ...commonStyles, fontFamily: '"Verdana", sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#f57f17', backgroundColor: '#fffde7', padding: '24px' },
    h1: { fontSize: '30px', fontWeight: 'bold', color: '#fbc02d', textAlign: 'center', marginBottom: '30px', textShadow: '1px 1px #ff6f00' },
    h2: { fontSize: '24px', fontWeight: 'bold', color: '#fff', backgroundColor: '#fbc02d', padding: '10px 15px', transform: 'rotate(-2deg)', display: 'inline-block', marginTop: '35px', marginBottom: '20px', boxShadow: '3px 3px 0 #ff6f00' },
    h3: { fontSize: '20px', fontWeight: 'bold', color: '#ff6f00', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '5px solid #fbc02d', padding: '15px', color: '#f57f17', backgroundColor: '#fff9c4', margin: '25px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', border: '5px solid #fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
    hr: { border: 'none', borderTop: '2px dashed #fbc02d', margin: '35px 0' }
  },

  'BLUEPRINT': {
    container: { ...commonStyles, fontFamily: '"Courier New", monospace', fontSize: '15px', lineHeight: '1.6', color: '#fff', backgroundColor: '#003366', padding: '25px', backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' },
    h1: { fontSize: '26px', fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: '30px', border: '2px solid #fff', padding: '10px' },
    h2: { fontSize: '20px', fontWeight: 'bold', color: '#fff', borderBottom: '1px solid #fff', paddingBottom: '5px', marginTop: '35px', marginBottom: '20px', textTransform: 'uppercase' },
    h3: { fontSize: '17px', fontWeight: 'bold', color: '#ccc', marginTop: '25px', marginBottom: '15px', textDecoration: 'underline' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { border: '1px dashed #fff', padding: '15px', color: '#eee', margin: '25px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', border: '2px solid #fff' },
    hr: { border: 'none', borderTop: '1px solid #fff', margin: '35px 0' }
  },

  'HANDWRITTEN': {
    container: { ...commonStyles, fontFamily: '"Comic Sans MS", cursive', fontSize: '18px', lineHeight: '1.6', color: '#000', backgroundColor: '#ffffd0', padding: '30px', boxShadow: '5px 5px 10px rgba(0,0,0,0.1)' },
    h1: { fontSize: '32px', fontWeight: 'bold', color: '#d32f2f', textAlign: 'center', marginBottom: '30px', transform: 'rotate(-2deg)' },
    h2: { fontSize: '24px', fontWeight: 'bold', color: '#1976d2', marginTop: '35px', marginBottom: '20px', textDecoration: 'underline', textDecorationStyle: 'wavy' },
    h3: { fontSize: '20px', fontWeight: 'bold', color: '#388e3c', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '3px solid #000', padding: '10px 20px', color: '#555', margin: '25px 0', fontFamily: 'monospace' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', transform: 'rotate(1deg)', border: '10px solid #fff', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' },
    hr: { border: 'none', borderTop: '2px solid #000', margin: '35px 0', transform: 'rotate(1deg)' }
  },

  'MAGAZINE_EDITORIAL': {
    container: { ...commonStyles, fontFamily: 'Arial, sans-serif', fontSize: '18px', lineHeight: '1.6', color: '#000', backgroundColor: '#fff', padding: '40px' },
    h1: { fontSize: '48px', fontWeight: '900', color: '#000', textAlign: 'left', marginBottom: '40px', lineHeight: '1.0' },
    h2: { fontSize: '32px', fontWeight: 'bold', color: '#000', marginTop: '50px', marginBottom: '20px' },
    h3: { fontSize: '24px', fontWeight: 'bold', color: '#000', marginTop: '30px', marginBottom: '15px' },
    p: { ...commonStyles, fontSize: '18px' },
    li: { marginBottom: '10px', fontSize: '18px' },
    blockquote: { borderTop: '5px solid #000', borderBottom: '1px solid #000', padding: '30px 0', color: '#000', margin: '40px 0', fontSize: '24px', fontWeight: 'bold', lineHeight: '1.4' },
    img: { maxWidth: '100%', display: 'block', margin: '40px auto' },
    hr: { border: 'none', borderTop: '10px solid #000', margin: '50px 0' }
  },

  'ECO_FRIENDLY': {
    container: { ...commonStyles, fontFamily: 'Verdana, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#33691e', backgroundColor: '#f1f8e9', padding: '24px' },
    h1: { fontSize: '28px', fontWeight: 'normal', color: '#1b5e20', textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #81c784', paddingBottom: '10px' },
    h2: { fontSize: '22px', fontWeight: 'bold', color: '#2e7d32', marginTop: '35px', marginBottom: '20px', paddingLeft: '15px', borderLeft: '5px solid #a5d6a7' },
    h3: { fontSize: '18px', fontWeight: 'bold', color: '#558b2f', marginTop: '25px', marginBottom: '15px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { border: '1px solid #c5e1a5', padding: '20px', color: '#33691e', backgroundColor: '#fff', margin: '25px 0', borderRadius: '15px 0 15px 0' },
    img: { maxWidth: '100%', borderRadius: '8px', display: 'block', margin: '25px auto', border: '1px solid #c5e1a5' },
    hr: { border: 'none', borderTop: '1px dashed #558b2f', margin: '35px 0' }
  }
};
