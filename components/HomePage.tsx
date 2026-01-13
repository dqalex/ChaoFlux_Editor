import React, { useState } from 'react';
import { PixelButton, PixelCard } from './PixelComponents';
import { PixelLogo } from './PixelLogo';
import { translations } from '../utils/translations';
import { Language } from '../types';

interface HomePageProps {
  onStart: () => void;
  lang: Language;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, lang }) => {
  const t = translations[lang];
  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  const renderGuideContent = () => {
    if (!activeGuide) return null;

    const guides: Record<string, { title: string, content: React.ReactNode }> = {
      'AI': {
        title: t.features.ai_writer,
        content: (
          <div className="space-y-2">
             <p>{t.features.ai_writer_desc}</p>
             <hr className="border-black border-dashed my-2"/>
             <p className="font-bold">How to use:</p>
             <ul className="list-disc pl-4 space-y-1">
               <li>Open the <b>AI Assistant</b> panel on the left.</li>
               <li>Type your prompt (e.g., "Write an article about coffee").</li>
               <li>Use <b>Ctrl + Enter</b> to send.</li>
               <li>Click "Insert ⬇" to add the result to the editor.</li>
               <li>Configure custom API keys (DeepSeek, etc.) in <b>Settings</b>.</li>
             </ul>
          </div>
        )
      },
      'THEME': {
        title: t.features.themes,
        content: (
           <div className="space-y-2">
             <p>{t.features.themes_desc}</p>
             <hr className="border-black border-dashed my-2"/>
             <p className="font-bold">How to use:</p>
             <ul className="list-disc pl-4 space-y-1">
               <li>Click "Theme Library" in the bottom right of the preview.</li>
               <li>Select a preset theme.</li>
               <li>Or click <b>AI Create</b> to generate a new style by description (e.g., "Cyberpunk Neon").</li>
             </ul>
          </div>
        )
      },
      'DATA': {
        title: t.features.data,
        content: (
          <div className="space-y-2">
             <p>{t.features.data_desc}</p>
             <hr className="border-black border-dashed my-2"/>
             <p className="font-bold">Settings & API:</p>
             <ul className="list-disc pl-4 space-y-1">
               <li>Click "Settings" (Data Manager) in the top header.</li>
               <li><b>General Tab:</b> Export your articles or entire app config.</li>
               <li><b>AI Config Tab:</b> Switch between Google Gemini (Default) or Custom OpenAI-compatible providers (like DeepSeek).</li>
             </ul>
          </div>
        )
      }
    };

    const guide = guides[activeGuide];
    if (!guide) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setActiveGuide(null)}>
        <div className="w-full max-w-md" onClick={e => e.stopPropagation()}>
           <PixelCard title={guide.title}>
              <div className="text-base font-sans">
                {guide.content}
              </div>
              <div className="mt-4 flex justify-end">
                <PixelButton onClick={() => setActiveGuide(null)}>{t.ui.close}</PixelButton>
              </div>
           </PixelCard>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-200">
      <div className="max-w-5xl w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in-down">
          <div className="mx-auto w-32 h-32 mb-6">
             <PixelLogo className="w-full h-full drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-pixel font-bold text-gray-800 uppercase tracking-widest text-shadow-pixel">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl font-pixel text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <div className="text-sm font-pixel text-gray-500 animate-pulse">
            {lang === 'zh' ? '点击下方卡片查看功能指南' : 'Click cards below for guides'}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div onClick={() => setActiveGuide('AI')} className="cursor-pointer group">
              <PixelCard className="h-full group-hover:-translate-y-1 transition-transform border-black group-hover:border-pixel-primary">
                  <div className="text-4xl mb-2">✍️</div>
                  <h3 className="font-pixel text-xl font-bold mb-2 group-hover:text-pixel-primary">{t.features.ai_writer}</h3>
                  <p className="text-sm text-gray-600">{t.features.ai_writer_desc}</p>
                  <p className="text-xs text-blue-500 mt-2 underline">View Guide &rarr;</p>
              </PixelCard>
            </div>
            
            <div onClick={() => setActiveGuide('THEME')} className="cursor-pointer group">
              <PixelCard className="h-full group-hover:-translate-y-1 transition-transform border-black group-hover:border-pixel-secondary">
                  <div className="text-4xl mb-2">🎭</div>
                  <h3 className="font-pixel text-xl font-bold mb-2 group-hover:text-pixel-secondary">{t.features.themes}</h3>
                  <p className="text-sm text-gray-600">{t.features.themes_desc}</p>
                   <p className="text-xs text-blue-500 mt-2 underline">View Guide &rarr;</p>
              </PixelCard>
            </div>

            <div onClick={() => setActiveGuide('DATA')} className="cursor-pointer group">
              <PixelCard className="h-full group-hover:-translate-y-1 transition-transform border-black">
                  <div className="text-4xl mb-2">⚙️</div>
                  <h3 className="font-pixel text-xl font-bold mb-2">{t.features.data}</h3>
                  <p className="text-sm text-gray-600">{t.features.data_desc}</p>
                   <p className="text-xs text-blue-500 mt-2 underline">View Guide &rarr;</p>
              </PixelCard>
            </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
            <PixelButton 
                variant="primary" 
                onClick={onStart}
                className="text-2xl px-12 py-4 animate-bounce"
            >
                {t.start} ▶
            </PixelButton>
        </div>
      </div>
      
      {renderGuideContent()}
    </div>
  );
};

export default HomePage;