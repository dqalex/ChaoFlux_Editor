import React, { useState } from 'react';
import { PixelCard, PixelButton } from './PixelComponents';

interface OnboardingTourProps {
  onFinish: () => void;
  lang: 'zh' | 'en';
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onFinish, lang }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: lang === 'zh' ? "欢迎使用 潮思编辑器!" : "Welcome to ChaoFlux!",
      text: lang === 'zh' ? "这是一款 AI 驱动的复古风公众号编辑器。让我带你快速了解核心功能。" : "An AI-powered retro editor. Let me show you around quickly.",
      target: null
    },
    {
      title: lang === 'zh' ? "AI 助手 (AI Assistant)" : "AI Assistant",
      text: lang === 'zh' ? "左侧面板是你的 AI 助手。你可以让它写文章、润色文案，甚至生成像素风配图！记得按 Ctrl+Enter 发送。" : "The left panel is your AI. Ask it to write, polish, or generate pixel art images! Remember: Ctrl+Enter to send.",
      highlightClass: "lg:col-span-3" 
    },
    {
      title: lang === 'zh' ? "Markdown 编辑器" : "Markdown Editor",
      text: lang === 'zh' ? "中间是编辑器。支持标准 Markdown 语法。我们会自动保存你的每一次输入。" : "The center is the editor. Supports standard Markdown. We auto-save your work.",
      highlightClass: "lg:col-span-5"
    },
    {
      title: lang === 'zh' ? "主题与预览" : "Themes & Preview",
      text: lang === 'zh' ? "右侧是手机预览。点击 '主题库' 切换不同风格，或者让 AI 为你设计一个独一无二的主题。" : "Right side is mobile preview. Click 'Theme Library' to switch styles or ask AI to generate a unique theme.",
      highlightClass: "lg:col-span-4"
    },
    {
      title: lang === 'zh' ? "设置与 API" : "Settings & API",
      text: lang === 'zh' ? "点击顶部的 '设置' 按钮，你可以配置自己的 DeepSeek、OpenAI Key，或者导出你的数据。" : "Click 'Settings' in the header to configure your own DeepSeek/OpenAI keys or export your data.",
      target: "header" 
    }
  ];

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-fade-in-up">
        <PixelCard title={`${lang === 'zh' ? '新手引导' : 'TOUR'} (${step + 1}/${steps.length})`}>
           <h3 className="font-bold text-xl mb-2">{current.title}</h3>
           <p className="text-gray-700 mb-6">{current.text}</p>
           
           <div className="flex justify-between">
             <button onClick={onFinish} className="text-gray-500 hover:text-black font-pixel underline">
                {lang === 'zh' ? '跳过' : 'Skip'}
             </button>
             <PixelButton onClick={() => {
                if (step < steps.length - 1) setStep(step + 1);
                else onFinish();
             }} variant="primary">
                {step < steps.length - 1 ? (lang === 'zh' ? '下一步 ->' : 'Next ->') : (lang === 'zh' ? '开始使用!' : "Let's Go!")}
             </PixelButton>
           </div>
        </PixelCard>
      </div>
    </div>
  );
};