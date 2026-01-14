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
          <div className="space-y-4">
             <p className="italic text-gray-600">{t.features.ai_writer_desc}</p>
             <div className="bg-yellow-50 p-3 border-2 border-dashed border-gray-400">
               <strong className="block mb-1">{lang === 'zh' ? '核心优势 (Key Advantage)' : 'Key Advantage'}</strong>
               <p className="text-sm">
                 {lang === 'zh' 
                   ? '支持“写作”与“绘图”模型分离配置。例如：使用 DeepSeek (OpenAI 兼容) 进行低成本写作，同时使用 Gemini 2.5 或 DALL-E 进行高质量配图。' 
                   : 'Mix and match models! Use affordable models like DeepSeek for text generation while using high-end models like Gemini 2.5 or DALL-E for image creation.'}
               </p>
             </div>
             <hr className="border-black border-dashed my-2"/>
             <ul className="list-disc pl-4 space-y-1 text-sm">
               <li><b>Chat:</b> {lang === 'zh' ? '生成大纲、润色段落、扩写内容。' : 'Draft outlines, polish paragraphs, expand ideas.'}</li>
               <li><b>Image:</b> {lang === 'zh' ? '生成像素风插画、博文配图。' : 'Generate pixel art or blog illustrations.'}</li>
               <li><b>Workflow:</b> {lang === 'zh' ? '对话 -> 插入编辑器 -> 一站式完成。' : 'Chat -> Insert -> Done in one place.'}</li>
             </ul>
          </div>
        )
      },
      'THEME': {
        title: t.features.themes,
        content: (
           <div className="space-y-4">
             <p className="italic text-gray-600">{t.features.themes_desc}</p>
             <div className="bg-pink-50 p-3 border-2 border-dashed border-gray-400">
               <strong className="block mb-1">{lang === 'zh' ? '排版美学 (Typography Aesthetics)' : 'Typography Aesthetics'}</strong>
               <p className="text-sm">
                 {lang === 'zh'
                    ? '16+ 精选高级感主题，涵盖极简文艺、时尚潮流、商务严谨、活泼创意、杂志质感等风格。'
                    : '16+ Premium Themes covering Minimalist, Fashion, Business, Creative, and Magazine styles.'}
               </p>
             </div>
             <hr className="border-black border-dashed my-2"/>
             <ul className="list-disc pl-4 space-y-1 text-sm">
               <li><b>Font Size:</b> {lang === 'zh' ? '支持全局调整字号（小/中/大）。' : 'Adjust global font size (S/M/L).'}</li>
               <li><b>Mobile Ready:</b> {lang === 'zh' ? '手机端访问自动切换为沉浸式全屏预览，无外框干扰。' : 'Auto immersive full-screen preview on mobile devices.'}</li>
               <li><b>AI Themes:</b> {lang === 'zh' ? '描述风格，AI 自动生成专属 CSS。' : 'Describe a style, AI generates the CSS.'}</li>
             </ul>
          </div>
        )
      },
      'DATA': {
        title: t.features.data,
        content: (
          <div className="space-y-4">
             <p className="italic text-gray-600">{t.features.data_desc}</p>
             <div className="bg-blue-50 p-3 border-2 border-dashed border-gray-400">
               <strong className="block mb-1">{lang === 'zh' ? '去中心化 (Decentralized)' : 'Decentralized'}</strong>
               <p className="text-sm">
                 {lang === 'zh'
                   ? '无后端服务器，所有数据存储在浏览器本地 (Local Storage)。你的 API Key 和文章草稿完全私有。'
                   : 'No backend server. All data lives in your browser Local Storage. Your API Keys and drafts are 100% private.'}
               </p>
             </div>
             <hr className="border-black border-dashed my-2"/>
             <ul className="list-disc pl-4 space-y-1 text-sm">
               <li><b>Import/Export:</b> {lang === 'zh' ? '支持配置与数据的全量备份迁移。' : 'Full backup and migration support.'}</li>
               <li><b>BYOK:</b> {lang === 'zh' ? '接入你自己的高额度 API Key。' : 'Use your own high-limit API keys.'}</li>
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
            {lang === 'zh' ? '点击下方卡片查看功能优势' : 'Click cards below for feature details'}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div onClick={() => setActiveGuide('AI')} className="cursor-pointer group">
              <PixelCard className="h-full group-hover:-translate-y-1 transition-transform border-black group-hover:border-pixel-primary">
                  <div className="text-4xl mb-2">🤖</div>
                  <h3 className="font-pixel text-xl font-bold mb-2 group-hover:text-pixel-primary">{t.features.ai_writer}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.features.ai_writer_desc}</p>
                  <p className="text-xs text-blue-500 mt-3 underline decoration-dashed">Learn More &rarr;</p>
              </PixelCard>
            </div>
            
            <div onClick={() => setActiveGuide('THEME')} className="cursor-pointer group">
              <PixelCard className="h-full group-hover:-translate-y-1 transition-transform border-black group-hover:border-pixel-secondary">
                  <div className="text-4xl mb-2">🎨</div>
                  <h3 className="font-pixel text-xl font-bold mb-2 group-hover:text-pixel-secondary">{t.features.themes}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.features.themes_desc}</p>
                   <p className="text-xs text-blue-500 mt-3 underline decoration-dashed">Learn More &rarr;</p>
              </PixelCard>
            </div>

            <div onClick={() => setActiveGuide('DATA')} className="cursor-pointer group">
              <PixelCard className="h-full group-hover:-translate-y-1 transition-transform border-black">
                  <div className="text-4xl mb-2">🔒</div>
                  <h3 className="font-pixel text-xl font-bold mb-2">{t.features.data}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{t.features.data_desc}</p>
                   <p className="text-xs text-blue-500 mt-3 underline decoration-dashed">Learn More &rarr;</p>
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