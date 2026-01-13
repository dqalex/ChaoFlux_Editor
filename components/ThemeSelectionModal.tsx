import React from 'react';
import { PixelCard, PixelButton } from './PixelComponents';
import { ThemeStyle, Language } from '../types';
import { translations } from '../utils/translations';

interface ThemeSelectionModalProps {
  themes: Record<string, ThemeStyle>;
  currentThemeKey: string;
  onSelect: (key: string) => void;
  onClose: () => void;
  onCreateNew: () => void;
  lang: Language;
}

export const ThemeSelectionModal: React.FC<ThemeSelectionModalProps> = ({ 
  themes, 
  currentThemeKey, 
  onSelect, 
  onClose,
  onCreateNew,
  lang
}) => {
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <PixelCard title={t.ui.theme_library} className="h-full flex flex-col" bodyClassName="flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              {/* Create New Card */}
              <button 
                onClick={onCreateNew}
                className="h-32 border-4 border-dashed border-gray-400 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">✨</span>
                <span className="font-pixel text-lg font-bold">{t.ui.create_theme}</span>
              </button>

              {/* Theme Cards */}
              {Object.entries(themes).map(([key, style]) => {
                const themeStyle = style as ThemeStyle;
                const isActive = currentThemeKey === key;
                // Safe extraction of colors for preview, fallback to simple values
                const bgColor = (themeStyle.container.backgroundColor as string) || '#fff';
                const textColor = (themeStyle.container.color as string) || '#000';
                const accentColor = (themeStyle.h2.color as string) || (themeStyle.h1.color as string) || '#000';

                return (
                  <button
                    key={key}
                    onClick={() => { onSelect(key); onClose(); }}
                    className={`relative h-32 border-4 text-left transition-all p-3 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md
                      ${isActive ? 'border-pixel-primary ring-2 ring-pixel-primary ring-offset-2' : 'border-black hover:scale-[1.02]'}`}
                    style={{ backgroundColor: bgColor }}
                  >
                    {isActive && (
                      <div className="absolute top-0 right-0 bg-pixel-primary text-white text-xs px-2 py-1 font-pixel">
                        {t.ui.theme_active}
                      </div>
                    )}
                    
                    <div style={{ color: accentColor }} className="font-bold text-lg border-b-2 border-current pb-1 mb-1 truncate">
                       {key.replace(/_/g, ' ')}
                    </div>
                    
                    <div className="flex-1">
                      <div style={{ color: textColor }} className="text-xs opacity-80 leading-tight">
                        {t.ui.theme_preview_text}
                      </div>
                      <div className="mt-2 flex gap-1">
                         <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: bgColor }}></div>
                         <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: accentColor }}></div>
                         <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: textColor }}></div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 border-t-4 border-black bg-gray-100 flex justify-end">
             <PixelButton onClick={onClose}>{t.ui.close}</PixelButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};