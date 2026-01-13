import React from 'react';
import { PixelCard, PixelButton } from './PixelComponents';
import { ThemeStyle, Language, FontSize } from '../types';
import { translations } from '../utils/translations';

interface ThemeSelectionModalProps {
  themes: Record<string, ThemeStyle>;
  currentThemeKey: string;
  onSelect: (key: string) => void;
  onClose: () => void;
  onCreateNew: () => void;
  lang: Language;
  currentFontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
}

// A component that renders a mini visual preview of the theme
const ThemePreviewButton: React.FC<{
  name: string;
  theme: ThemeStyle;
  isActive: boolean;
  onClick: () => void;
}> = ({ name, theme, isActive, onClick }) => {
  
  // Create safe mini styles derived from the actual theme
  const containerStyle: React.CSSProperties = {
    ...theme.container,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: '12px',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    // Ensure the card has a background if the theme is transparent (fallback to white)
    backgroundColor: theme.container.backgroundColor || '#fff',
    borderRadius: '0', // Let the button handle radius
    boxShadow: 'none',
    border: 'none', // Prevent double border with button
    fontSize: '10px', // Scale down base font
    lineHeight: '1.4',
    pointerEvents: 'none' // Ensure clicks go to the button
  };

  const titleStyle: React.CSSProperties = {
    ...theme.h1,
    fontSize: '14px', // Scale down header
    margin: '0 0 8px 0',
    padding: '0 0 4px 0',
    lineHeight: '1.2'
  };

  const header2Style: React.CSSProperties = {
     ...theme.h2,
     fontSize: '11px',
     margin: '8px 0 4px 0',
     lineHeight: '1.2'
  };

  const textStyle: React.CSSProperties = {
    ...theme.p,
    fontSize: '9px',
    margin: '0 0 6px 0',
    lineHeight: '1.3'
  };

  return (
    <button
      onClick={onClick}
      className={`relative h-56 w-full text-left transition-all overflow-hidden group shadow-md hover:shadow-xl
        ${isActive ? 'ring-4 ring-offset-2 ring-pixel-primary z-10 scale-[1.02]' : 'hover:scale-[1.02] border border-gray-300'}
      `}
      style={{ borderRadius: '8px' }}
      title={name}
    >
      {/* The Actual Rendered Theme Preview */}
      <div style={containerStyle}>
         <h1 style={titleStyle}>{name.replace(/_/g, ' ')}</h1>
         <p style={textStyle}>
           The quick brown fox jumps over the lazy dog.
         </p>
         <h2 style={header2Style}>Section Title</h2>
         <p style={textStyle}>
           Visual preview of the style.
         </p>
         {/* Mini Hr */}
         <div style={{ ...theme.hr, margin: '8px 0' }} />
         {/* Mini Blockquote */}
         <div style={{...theme.blockquote, fontSize: '9px', padding: '4px 8px', margin: '4px 0'}}>
            "Style is a way to say who you are without having to speak."
         </div>
      </div>

      {/* Active Indicator Badge */}
      {isActive && (
        <div className="absolute top-2 right-2 bg-pixel-primary text-white text-[10px] px-2 py-0.5 font-bold shadow-sm font-pixel border border-black z-20">
          ACTIVE
        </div>
      )}
      
      {/* Hover Overlay Name (For clearer readability if theme is chaotic) */}
      <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-[2px] p-2 translate-y-full group-hover:translate-y-0 transition-transform z-20">
         <span className="text-white font-pixel text-xs font-bold block text-center truncate">
            {name.replace(/_/g, ' ')}
         </span>
      </div>
    </button>
  );
};

export const ThemeSelectionModal: React.FC<ThemeSelectionModalProps> = ({ 
  themes, 
  currentThemeKey, 
  onSelect, 
  onClose,
  onCreateNew,
  lang,
  currentFontSize,
  onFontSizeChange
}) => {
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6">
      {/* 
         Fixed Height Constraints:
         h-[85vh] ensures the modal never exceeds 85% of viewport height.
         This forces the inner `overflow-y-auto` to activate when content is long.
      */}
      <div className="w-full max-w-7xl h-[85vh] flex flex-col animate-fade-in-up shadow-2xl">
        <PixelCard 
            title={t.ui.theme_library} 
            className="h-full flex flex-col" 
            bodyClassName="flex flex-col p-0 bg-gray-100 h-full overflow-hidden"
        >
          
          {/* Toolbar: Font Size Selector */}
          <div className="bg-gray-200 border-b-2 border-black p-3 flex flex-wrap items-center gap-4 shrink-0 justify-between">
              <div className="flex items-center gap-3">
                 <span className="font-pixel text-sm font-bold text-gray-700 uppercase">
                    {lang === 'zh' ? '字体大小' : 'Font Size'}:
                 </span>
                 <div className="flex gap-2">
                    {(['small', 'medium', 'large'] as FontSize[]).map(size => (
                        <button
                          key={size}
                          onClick={() => onFontSizeChange(size)}
                          className={`
                             font-pixel text-xs px-3 py-1 border-2 border-black transition-transform
                             ${currentFontSize === size 
                               ? 'bg-pixel-primary text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)]' 
                               : 'bg-white text-black hover:bg-gray-100'
                             }
                          `}
                        >
                           {size === 'small' ? (lang === 'zh' ? '小 (14px)' : 'Small') : 
                            size === 'medium' ? (lang === 'zh' ? '中 (16px)' : 'Medium') : 
                            (lang === 'zh' ? '大 (18px)' : 'Large')}
                        </button>
                    ))}
                 </div>
              </div>
              
              <div className="text-xs text-gray-500 font-pixel">
                 {lang === 'zh' ? '提示：字体设置将应用到所有主题' : 'Tip: Font size applies to all themes'}
              </div>
          </div>

          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {/* Grid adapted for large screens: up to 5 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              
              {/* Create New Card */}
              <button 
                onClick={onCreateNew}
                className="h-56 bg-white border-4 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group hover:border-pixel-primary"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-pixel-primary group-hover:text-white transition-colors">
                    <span className="text-3xl font-bold">+</span>
                </div>
                <span className="font-pixel text-lg font-bold text-gray-600 group-hover:text-pixel-primary">{t.ui.create_theme}</span>
                <span className="text-xs text-gray-400 mt-2">AI Generated Style</span>
              </button>

              {/* Render All Themes */}
              {Object.entries(themes).map(([key, style]) => (
                <ThemePreviewButton 
                    key={key}
                    name={key}
                    theme={style}
                    isActive={currentThemeKey === key}
                    onClick={() => { onSelect(key); onClose(); }}
                />
              ))}
            </div>
          </div>
          
          {/* Fixed Footer */}
          <div className="p-4 border-t-4 border-black bg-white flex justify-between items-center shrink-0 z-10 box-border">
             <div className="text-xs text-gray-500 font-pixel">
                {Object.keys(themes).length} THEMES AVAILABLE
             </div>
             <PixelButton onClick={onClose} className="px-6 py-2 text-sm">{t.ui.close}</PixelButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};