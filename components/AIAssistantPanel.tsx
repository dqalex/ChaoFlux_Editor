import React, { useState, useRef, useEffect } from 'react';
import { PixelCard, PixelButton, PixelTextArea } from './PixelComponents';
import { getChatResponse, generatePixelImage } from '../services/geminiService';
import { ChatMessage, Language, AIConfig } from '../types';
import { translations } from '../utils/translations';

interface AIAssistantPanelProps {
  onInsert: (content: string) => void;
  lang: Language;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  imageGallery: ChatMessage[];
  setImageGallery: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  textAIConfig?: AIConfig;
  imageAIConfig?: AIConfig;
}

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ 
  onInsert, 
  lang, 
  chatMessages, 
  setChatMessages,
  imageGallery,
  setImageGallery,
  textAIConfig,
  imageAIConfig
}) => {
  const [activeTab, setActiveTab] = useState<'CHAT' | 'IMAGE'>('CHAT');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'CHAT') scrollToBottom();
  }, [chatMessages, activeTab]);

  useEffect(() => {
       if (activeTab === 'IMAGE') scrollToBottom();
  }, [imageGallery, activeTab]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setIsLoading(true);

    const prompt = input;
    setInput('');

    try {
      if (activeTab === 'CHAT') {
        // User Message
        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: prompt, type: 'text' };
        setChatMessages(prev => [...prev, userMsg]);
        
        // AI Response
        const responseText = await getChatResponse(prompt, textAIConfig);
        const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', content: responseText, type: 'text' };
        setChatMessages(prev => [...prev, modelMsg]);

      } else {
        // Image Generation
        const imageUrl = await generatePixelImage(prompt, imageAIConfig);
        const imageItem: ChatMessage = { 
            id: Date.now().toString(), 
            role: 'model', 
            content: imageUrl, 
            type: 'image' 
        };
        setImageGallery(prev => [...prev, imageItem]);
      }
    } catch (error) {
       const errorMsg = "Error: " + (error as Error).message;
       if (activeTab === 'CHAT') {
           setChatMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: errorMsg, type: 'text' }]);
       } else {
           alert(errorMsg); 
       }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Send only on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
    // Default Enter inserts new line (default behavior of textarea)
  };

  const clearHistory = () => {
    if (activeTab === 'CHAT') {
        if(confirm("Clear chat history?")) {
            setChatMessages([{ id: Date.now().toString(), role: 'model', content: 'History cleared.', type: 'text' }]);
        }
    } else {
        if(confirm("Clear image gallery?")) {
            setImageGallery([]);
        }
    }
  };

  const handleDeleteImage = (id: string) => {
      if(confirm("Delete this image?")) {
          setImageGallery(prev => prev.filter(img => img.id !== id));
      }
  };

  return (
    <PixelCard 
        title={t.ui.ai_panel}
        className="h-full flex flex-col overflow-hidden" 
        bodyClassName="p-0 flex flex-col h-full overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex border-b-4 border-black bg-gray-100 shrink-0">
        <button 
          onClick={() => setActiveTab('CHAT')}
          className={`flex-1 py-3 font-pixel text-xl ${activeTab === 'CHAT' ? 'bg-pixel-primary text-white' : 'text-gray-500 hover:bg-gray-200'}`}
        >
          {t.ui.chat}
        </button>
        <button 
          onClick={() => setActiveTab('IMAGE')}
          className={`flex-1 py-3 font-pixel text-xl ${activeTab === 'IMAGE' ? 'bg-pixel-secondary text-black' : 'text-gray-500 hover:bg-gray-200'}`}
        >
          {t.ui.image}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-pixel-bg/30 custom-scrollbar">
        
        {/* CHAT VIEW */}
        {activeTab === 'CHAT' && (
            <div className="space-y-4">
                {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div 
                        className={`max-w-[90%] p-4 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-base ${
                            msg.role === 'user' ? 'bg-white text-black' : 'bg-blue-100 text-black'
                        }`}
                        >
                            <div className="whitespace-pre-wrap font-sans leading-relaxed">{msg.content}</div>
                        </div>
                        {msg.role === 'model' && (
                            <button 
                                onClick={() => onInsert(msg.content)}
                                className="mt-1 text-sm font-pixel bg-black text-white px-3 py-1 hover:bg-gray-700 active:scale-95 transition-transform"
                            >
                                {t.ui.insert} ⬇
                            </button>
                        )}
                    </div>
                ))}
            </div>
        )}

        {/* IMAGE GALLERY VIEW */}
        {activeTab === 'IMAGE' && (
            <div className="grid grid-cols-1 gap-4">
                 {imageGallery.length === 0 && (
                     <div className="text-center text-gray-500 mt-10 font-pixel">
                         {lang === 'zh' ? '暂无图片，请输入描述生成。' : 'No images. Type description to generate.'}
                     </div>
                 )}
                 {imageGallery.map((img) => (
                     <div key={img.id} className="bg-white border-4 border-black p-2 shadow-pixel">
                         <img src={img.content} alt="Generated" className="w-full h-auto block mb-2" />
                         <div className="flex justify-between items-center bg-gray-100 p-2 border-t-2 border-black mt-1">
                             <button 
                                onClick={() => handleDeleteImage(img.id)}
                                className="font-pixel text-red-500 hover:underline text-sm uppercase"
                             >
                                 DELETE
                             </button>
                             <button 
                                onClick={() => onInsert(`\n![Generated Image](${img.content})\n`)}
                                className="font-pixel bg-pixel-secondary text-black px-3 py-1 text-sm border-2 border-black hover:bg-teal-300 active:translate-y-0.5 shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none"
                            >
                                {t.ui.insert} ⬇
                            </button>
                         </div>
                     </div>
                 ))}
            </div>
        )}

        {isLoading && (
          <div className="flex justify-start mt-4">
             <div className="bg-gray-200 border-2 border-black p-3 font-pixel animate-pulse text-sm">{t.ui.thinking}</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t-4 border-black bg-white shrink-0">
        <div className="flex flex-col gap-2">
          <PixelTextArea 
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={activeTab === 'CHAT' ? (lang === 'zh' ? "输入... (Ctrl + Enter 发送)" : "Ask me... (Ctrl + Enter to send)") : (lang === 'zh' ? "描述图片 (像素风)..." : "Describe image (Pixel art)...")}
            disabled={isLoading}
            className="text-base min-h-[60px] max-h-[120px]"
          />
          <div className="flex justify-between items-center">
             <button onClick={clearHistory} className="px-3 py-2 text-sm font-pixel text-gray-400 hover:text-red-500 border-2 border-transparent hover:border-red-200">
                {t.ui.clear}
             </button>
             
             <div className="flex items-center gap-2">
                 <span className="hidden md:inline text-xs text-gray-400 font-pixel">
                    {lang === 'zh' ? 'Ctrl + Enter 发送' : 'Ctrl + Enter to Send'}
                 </span>
                 <PixelButton 
                    onClick={handleSend} 
                    disabled={isLoading || !input.trim()}
                    variant={activeTab === 'CHAT' ? 'primary' : 'secondary'}
                    className="text-base py-2 px-6"
                >
                    {isLoading ? '...' : (activeTab === 'CHAT' ? t.ui.send : (lang === 'zh' ? '生成' : 'GENERATE'))}
                </PixelButton>
             </div>
          </div>
        </div>
      </div>
    </PixelCard>
  );
};

export default AIAssistantPanel;