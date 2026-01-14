import React from 'react';
import { ThemeStyle, FontSize } from '../types';

const commonStyles: React.CSSProperties = {
  maxWidth: '100%',
  boxSizing: 'border-box',
  wordWrap: 'break-word',
  textAlign: 'justify',
  marginBottom: '1.5em',
  letterSpacing: '0.05em',
};

export const applyFontSize = (theme: ThemeStyle, size: FontSize): ThemeStyle => {
  if (!theme) return theme;
  
  const sizeMap: Record<FontSize, string> = {
    small: '15px',
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

/* 
 * 16 PREMIUM THEMES 
 * Categories: Minimalist, Fashion, Professional, Creative, Magazine
 */
export const defaultThemes: Record<string, ThemeStyle> = {
  
  // --- I. 极简文艺风 (MINIMALIST & LITERARY) ---

  'MINIMAL_LIT': {
    container: { ...commonStyles, fontFamily: '"Songti SC", "SimSun", serif', fontSize: '16px', lineHeight: '1.8', color: '#3f3f3f', backgroundColor: '#fff', padding: '20px' },
    h1: { fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px', color: '#2a2a2a', marginTop: '20px' },
    h2: { fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom: '20px', color: '#2a2a2a' },
    h3: { fontSize: '16px', fontWeight: 'bold', textAlign: 'left', marginTop: '24px', marginBottom: '12px', color: '#555' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '2px solid #ccc', padding: '0 15px', color: '#888', margin: '20px 0', fontSize: '15px' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto', borderRadius: '0' },
    hr: { border: 'none', textAlign: 'center', margin: '40px 0', height: '1px', backgroundColor: '#eee', width: '40%', marginLeft: 'auto', marginRight: 'auto' }
  },

  'SILENT_MORANDI': {
    container: { ...commonStyles, fontFamily: 'sans-serif', fontSize: '16px', lineHeight: '1.9', color: '#545c64', backgroundColor: '#fcfcfc', padding: '25px' },
    h1: { fontSize: '24px', fontWeight: 'normal', textAlign: 'left', marginBottom: '30px', color: '#68747d', letterSpacing: '1px' },
    h2: { fontSize: '18px', fontWeight: 'bold', textAlign: 'left', marginTop: '40px', marginBottom: '20px', color: '#7e8c95', paddingLeft: '10px', borderLeft: '3px solid #b5c0c9' },
    h3: { fontSize: '16px', fontWeight: 'bold', textAlign: 'left', marginTop: '24px', marginBottom: '12px', color: '#8ca1b3' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { border: 'none', backgroundColor: '#f2f4f6', padding: '20px', color: '#7a8690', margin: '25px 0', borderRadius: '4px' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', filter: 'sepia(10%) opacity(90%)' },
    hr: { border: 'none', borderTop: '1px solid #e1e4e8', margin: '40px 0' }
  },

  'PAPER_WRITING': {
    container: { ...commonStyles, fontFamily: '"Kaiti SC", "KaiTi", serif', fontSize: '17px', lineHeight: '2.0', color: '#2b2b2b', backgroundColor: '#fdfbf7', padding: '20px' },
    h1: { fontSize: '26px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px', color: '#4a4a4a', marginTop: '20px' },
    h2: { fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom: '20px', color: '#4a4a4a', borderBottom: '1px solid #ddd', display: 'inline-block', paddingBottom: '5px' },
    h3: { fontSize: '18px', fontWeight: 'bold', textAlign: 'left', marginTop: '24px', marginBottom: '12px', color: '#666' },
    p: { ...commonStyles, textIndent: '2em' },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '3px solid #8c8c8c', padding: '5px 15px', color: '#5e5e5e', margin: '25px 0', fontStyle: 'italic' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto', padding: '8px', border: '1px solid #e0e0e0', backgroundColor: '#fff' },
    hr: { border: 'none', borderTop: '1px dashed #ccc', margin: '50px 0' }
  },

  // --- II. 清新时尚风 (FRESH & FASHION) ---

  'FRESH_MINT': {
    container: { ...commonStyles, fontFamily: '-apple-system, sans-serif', fontSize: '16px', lineHeight: '1.75', color: '#333', backgroundColor: '#fafffa', padding: '20px' },
    h1: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', color: '#2e8b57' },
    h2: { fontSize: '20px', fontWeight: 'bold', textAlign: 'left', marginTop: '35px', marginBottom: '20px', color: '#fff', backgroundColor: '#66cdaa', padding: '8px 15px', borderRadius: '0 20px 20px 0', display: 'inline-block' },
    h3: { fontSize: '17px', fontWeight: 'bold', textAlign: 'left', marginTop: '25px', marginBottom: '10px', color: '#20b2aa' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '4px solid #66cdaa', padding: '15px', color: '#555', backgroundColor: '#e0ffff', margin: '20px 0', borderRadius: '0 8px 8px 0' },
    img: { maxWidth: '100%', borderRadius: '12px', display: 'block', margin: '25px auto', boxShadow: '0 4px 10px rgba(102, 205, 170, 0.2)' },
    hr: { border: 'none', borderTop: '2px dotted #66cdaa', margin: '35px 0' }
  },

  'SWEET_PINK': {
    container: { ...commonStyles, fontFamily: 'sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#444', backgroundColor: '#fff', padding: '20px' },
    h1: { fontSize: '24px', fontWeight: '800', textAlign: 'center', marginBottom: '25px', color: '#ff6b81' },
    h2: { fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginTop: '35px', marginBottom: '20px', color: '#ff6b81', border: '2px solid #ff6b81', padding: '8px 20px', borderRadius: '50px', display: 'inline-block' },
    h3: { fontSize: '16px', fontWeight: 'bold', textAlign: 'left', marginTop: '25px', marginBottom: '10px', color: '#ff8da1' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', color: '#666' },
    blockquote: { border: '2px dashed #ffb7b2', padding: '15px', color: '#d63031', backgroundColor: '#fff5f7', margin: '25px 0', borderRadius: '12px' },
    img: { maxWidth: '100%', borderRadius: '16px', display: 'block', margin: '25px auto', border: '4px solid #fff0f3' },
    hr: { border: 'none', height: '2px', backgroundColor: '#ffb7b2', margin: '40px 0', opacity: 0.5 }
  },

  'URBAN_FASHION': {
    container: { ...commonStyles, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#111', backgroundColor: '#fff', padding: '24px' },
    h1: { fontSize: '32px', fontWeight: '900', textAlign: 'left', marginBottom: '30px', color: '#000', letterSpacing: '-1px' },
    h2: { fontSize: '24px', fontWeight: 'bold', textAlign: 'left', marginTop: '40px', marginBottom: '20px', backgroundColor: '#f1c40f', color: '#000', padding: '5px 10px', display: 'inline' },
    h3: { fontSize: '18px', fontWeight: 'bold', textAlign: 'left', marginTop: '30px', marginBottom: '15px', textDecoration: 'underline', textDecorationThickness: '3px', textDecorationColor: '#f1c40f' },
    p: { ...commonStyles },
    li: { marginBottom: '8px', listStyleType: 'square' },
    blockquote: { borderLeft: '6px solid #000', padding: '15px 20px', color: '#000', fontWeight: '600', backgroundColor: '#fff', margin: '30px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto', boxShadow: '8px 8px 0px #eee' },
    hr: { border: 'none', borderTop: '4px solid #000', margin: '50px 0' }
  },

  // --- III. 专业严谨风 (PROFESSIONAL & RIGOROUS) ---

  'TECH_BLUE': {
    container: { ...commonStyles, fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '16px', lineHeight: '1.75', color: '#333', backgroundColor: '#f4f6f8', padding: '25px' },
    h1: { fontSize: '24px', fontWeight: 'bold', textAlign: 'left', marginBottom: '30px', color: '#0052cc', borderBottom: '2px solid #0052cc', paddingBottom: '10px' },
    h2: { fontSize: '20px', fontWeight: 'bold', textAlign: 'left', marginTop: '35px', marginBottom: '20px', color: '#172b4d', paddingLeft: '12px', borderLeft: '4px solid #0052cc' },
    h3: { fontSize: '17px', fontWeight: 'bold', textAlign: 'left', marginTop: '25px', marginBottom: '10px', color: '#42526e' },
    p: { ...commonStyles, color: '#172b4d' },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '4px solid #0052cc', padding: '15px 20px', color: '#091e42', backgroundColor: '#deebff', margin: '25px 0' },
    img: { maxWidth: '100%', borderRadius: '4px', display: 'block', margin: '25px auto', border: '1px solid #dfe1e6' },
    hr: { border: 'none', borderTop: '1px solid #c1c7d0', margin: '40px 0' }
  },

  'DEEP_BUSINESS': {
    container: { ...commonStyles, fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#2c3e50', backgroundColor: '#fff', padding: '24px' },
    h1: { fontSize: '26px', fontWeight: 'bold', textAlign: 'center', marginBottom: '35px', color: '#2c3e50' },
    h2: { fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom: '20px', color: '#fff', backgroundColor: '#34495e', padding: '8px 30px', borderRadius: '4px', display: 'inline-block' },
    h3: { fontSize: '17px', fontWeight: 'bold', textAlign: 'left', marginTop: '25px', marginBottom: '15px', color: '#7f8c8d', borderBottom: '1px solid #bdc3c7', paddingBottom: '5px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderTop: '1px solid #bdc3c7', borderBottom: '1px solid #bdc3c7', padding: '20px 0', color: '#34495e', margin: '30px 0', textAlign: 'center', fontWeight: 'bold' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto' },
    hr: { border: 'none', borderTop: '2px solid #2c3e50', margin: '50px 0', width: '50%', marginLeft: 'auto', marginRight: 'auto' }
  },

  'ACADEMIC_STUDY': {
    container: { ...commonStyles, fontFamily: '"Georgia", serif', fontSize: '16px', lineHeight: '1.8', color: '#222', backgroundColor: '#fff', padding: '25px' },
    h1: { fontSize: '24px', fontWeight: 'bold', textAlign: 'left', marginBottom: '30px', color: '#000' },
    h2: { fontSize: '19px', fontWeight: 'bold', textAlign: 'left', marginTop: '35px', marginBottom: '20px', color: '#000', borderBottom: '1px solid #000', paddingBottom: '8px', width: '100%' },
    h3: { fontSize: '17px', fontWeight: 'bold', textAlign: 'left', marginTop: '25px', marginBottom: '12px', color: '#444' },
    p: { ...commonStyles },
    li: { marginBottom: '6px' },
    blockquote: { borderLeft: '4px solid #eee', padding: '10px 15px', color: '#555', backgroundColor: '#fafafa', margin: '20px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', border: '1px solid #eee' },
    hr: { border: 'none', borderTop: '1px solid #eee', margin: '40px 0' }
  },

  // --- IV. 活泼创意风 (LIVELY & CREATIVE) ---

  'CREATIVE_CHAT': {
    container: { ...commonStyles, fontFamily: 'sans-serif', fontSize: '16px', lineHeight: '1.6', color: '#333', backgroundColor: '#f2f2f2', padding: '20px' },
    h1: { fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', color: '#fff', backgroundColor: '#07c160', padding: '10px 20px', borderRadius: '8px', display: 'inline-block' },
    h2: { fontSize: '18px', fontWeight: 'bold', textAlign: 'left', marginTop: '30px', marginBottom: '15px', color: '#07c160', display: 'block' },
    h3: { fontSize: '16px', fontWeight: 'bold', textAlign: 'left', marginTop: '20px', marginBottom: '10px', color: '#666' },
    p: { ...commonStyles, backgroundColor: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e5e5e5', position: 'relative' },
    li: { marginBottom: '8px' },
    blockquote: { backgroundColor: '#95ec69', padding: '12px', color: '#000', margin: '20px 0', borderRadius: '8px', position: 'relative', border: '1px solid #85d45c' },
    img: { maxWidth: '100%', borderRadius: '8px', display: 'block', margin: '20px auto', border: '1px solid #ccc' },
    hr: { border: 'none', borderTop: '1px dashed #ccc', margin: '30px 0' }
  },

  'POP_YOUNG': {
    container: { ...commonStyles, fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.7', color: '#000', backgroundColor: '#fff', padding: '20px' },
    h1: { fontSize: '28px', fontWeight: '900', textAlign: 'center', marginBottom: '30px', color: '#6c5ce7', textShadow: '2px 2px 0px #a29bfe' },
    h2: { fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginTop: '35px', marginBottom: '20px', color: '#fff', backgroundColor: '#00cec9', padding: '8px 20px', borderRadius: '30px 0 30px 0', display: 'inline-block', boxShadow: '4px 4px 0 #000' },
    h3: { fontSize: '18px', fontWeight: 'bold', textAlign: 'left', marginTop: '25px', marginBottom: '15px', color: '#e17055' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { border: '3px solid #000', padding: '15px', color: '#000', backgroundColor: '#ffeaa7', margin: '25px 0', boxShadow: '5px 5px 0 #000' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', border: '3px solid #000', boxShadow: '5px 5px 0 #000' },
    hr: { border: 'none', borderTop: '4px dotted #000', margin: '40px 0' }
  },

  'RETRO_GAME': {
    container: { ...commonStyles, fontFamily: '"Courier New", monospace', fontSize: '15px', lineHeight: '1.6', color: '#00ff00', backgroundColor: '#000', padding: '20px' },
    h1: { fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', color: '#00ff00', border: '2px dashed #00ff00', padding: '10px' },
    h2: { fontSize: '20px', fontWeight: 'bold', textAlign: 'left', marginTop: '35px', marginBottom: '20px', color: '#000', backgroundColor: '#00ff00', padding: '5px 10px', display: 'inline-block' },
    h3: { fontSize: '16px', fontWeight: 'bold', textAlign: 'left', marginTop: '25px', marginBottom: '10px', color: '#00ff00', textDecoration: 'underline' },
    p: { ...commonStyles, textShadow: '0 0 2px #003300' },
    li: { marginBottom: '5px' },
    blockquote: { border: '2px solid #00ff00', padding: '15px', color: '#00ff00', margin: '25px 0', borderStyle: 'dotted' },
    img: { maxWidth: '100%', display: 'block', margin: '25px auto', border: '2px solid #00ff00', filter: 'contrast(1.2)' },
    hr: { border: 'none', borderTop: '2px dashed #00ff00', margin: '40px 0' }
  },

  // --- V. 杂志质感风 (MAGAZINE & TEXTURE) ---

  'EDITORIAL_BOLD': {
    container: { ...commonStyles, fontFamily: '"Times New Roman", Times, serif', fontSize: '17px', lineHeight: '1.8', color: '#1a1a1a', backgroundColor: '#fff', padding: '30px' },
    h1: { fontSize: '42px', fontWeight: '900', textAlign: 'left', marginBottom: '40px', color: '#000', lineHeight: '1.1' },
    h2: { fontSize: '24px', fontWeight: 'bold', textAlign: 'left', marginTop: '50px', marginBottom: '20px', color: '#000', borderTop: '4px solid #000', paddingTop: '10px' },
    h3: { fontSize: '18px', fontWeight: 'bold', textAlign: 'left', marginTop: '30px', marginBottom: '15px', color: '#333', fontStyle: 'italic' },
    p: { ...commonStyles, fontSize: '17px' },
    li: { marginBottom: '10px' },
    blockquote: { borderLeft: '6px solid #000', padding: '10px 20px', color: '#000', margin: '40px 0', fontSize: '20px', fontWeight: 'bold', lineHeight: '1.4' },
    img: { maxWidth: '100%', display: 'block', margin: '40px auto', filter: 'grayscale(100%)' },
    hr: { border: 'none', borderTop: '1px solid #000', margin: '60px 0' }
  },

  'CINEMA_DARK': {
    container: { ...commonStyles, fontFamily: 'Arial, sans-serif', fontSize: '16px', lineHeight: '1.8', color: '#d1d1d1', backgroundColor: '#1c1c1c', padding: '25px' },
    h1: { fontSize: '26px', fontWeight: 'normal', textAlign: 'center', marginBottom: '40px', color: '#fff', letterSpacing: '4px', textTransform: 'uppercase' },
    h2: { fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom: '25px', color: '#e50914', display: 'block' },
    h3: { fontSize: '17px', fontWeight: 'bold', textAlign: 'left', marginTop: '25px', marginBottom: '15px', color: '#aaa' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { borderLeft: '2px solid #e50914', padding: '15px 20px', color: '#eee', backgroundColor: '#333', margin: '30px 0' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto', boxShadow: '0 0 20px rgba(0,0,0,0.5)' },
    hr: { border: 'none', borderTop: '1px solid #444', margin: '50px 0' }
  },

  'LUXURY_GOLD': {
    container: { ...commonStyles, fontFamily: '"Didot", "Times New Roman", serif', fontSize: '16px', lineHeight: '1.9', color: '#ccc', backgroundColor: '#0f0f0f', padding: '30px' },
    h1: { fontSize: '30px', fontWeight: 'normal', textAlign: 'center', marginBottom: '40px', color: '#d4af37', letterSpacing: '2px', borderBottom: '1px solid #d4af37', paddingBottom: '20px' },
    h2: { fontSize: '22px', fontWeight: 'normal', textAlign: 'center', marginTop: '40px', marginBottom: '25px', color: '#f3e5ab', textTransform: 'uppercase' },
    h3: { fontSize: '17px', fontWeight: 'normal', textAlign: 'center', marginTop: '30px', marginBottom: '15px', color: '#d4af37' },
    p: { ...commonStyles, textAlign: 'center' },
    li: { marginBottom: '10px', textAlign: 'center', listStyle: 'none' },
    blockquote: { borderTop: '1px solid #d4af37', borderBottom: '1px solid #d4af37', padding: '20px 0', color: '#f3e5ab', margin: '40px 0', fontStyle: 'italic', textAlign: 'center' },
    img: { maxWidth: '100%', display: 'block', margin: '40px auto', border: '1px solid #d4af37', padding: '5px' },
    hr: { border: 'none', borderTop: '1px solid #333', margin: '50px 0' }
  },

  'ORIENTAL_RED': {
    container: { ...commonStyles, fontFamily: '"Kaiti SC", "KaiTi", serif', fontSize: '17px', lineHeight: '1.9', color: '#2b2b2b', backgroundColor: '#f9f7f2', padding: '25px' },
    h1: { fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px', color: '#902c28', writingMode: 'horizontal-tb' },
    h2: { fontSize: '22px', fontWeight: 'bold', textAlign: 'center', marginTop: '40px', marginBottom: '25px', color: '#902c28', border: '1px solid #902c28', padding: '8px 25px', display: 'inline-block' },
    h3: { fontSize: '18px', fontWeight: 'bold', textAlign: 'left', marginTop: '30px', marginBottom: '15px', color: '#631f1c', borderLeft: '3px solid #902c28', paddingLeft: '10px' },
    p: { ...commonStyles },
    li: { marginBottom: '8px' },
    blockquote: { border: 'none', padding: '20px', color: '#555', backgroundColor: '#f2e6e6', margin: '30px 0', borderRadius: '4px' },
    img: { maxWidth: '100%', display: 'block', margin: '30px auto', border: '2px solid #902c28', padding: '4px' },
    hr: { border: 'none', borderTop: '1px solid #d9b3b3', margin: '50px 0', width: '30%', marginLeft: 'auto', marginRight: 'auto' }
  }
};