import React, { useState, useRef, useEffect } from 'react';
import { PixelButton, PixelCard, PixelTextArea } from './components/PixelComponents';
import { PixelLogo } from './components/PixelLogo';
import ArticlePreview from './components/ArticlePreview';
import AIAssistantPanel from './components/AIAssistantPanel';
import HomePage from './components/HomePage';
import { ThemeSelectionModal } from './components/ThemeSelectionModal';
import { SettingsModal } from './components/SettingsModal'; // Renamed
import { VersionHistoryModal } from './components/VersionHistoryModal';
import { OnboardingTour } from './components/OnboardingTour'; // New
import { ThemeStyle, AppSettings, UserData, Language, ChatMessage, ArticleVersion, AIConfig } from './types';
import { defaultThemes } from './utils/wechatStyles';
import { translations } from './utils/translations';
import { generateThemeConfig } from './services/geminiService';

enum MobileView {
  AI = 'AI',
  EDITOR = 'EDITOR',
  PREVIEW = 'PREVIEW'
}

type ViewMode = 'HOME' | 'EDITOR';

// Fixed Markdown with explicit double newlines for paragraph separation
const DEFAULT_MARKDOWN_ZH = `# 欢迎使用 潮思编辑器 (ChaoFlux)

## 1. 标题语法 (Headings)
# 一级标题 H1
## 二级标题 H2
### 三级标题 H3

## 2. 文本样式 (Text Styles)
**这是加粗文本 (Bold)**

*这是斜体文本 (Italic)*

~~这是删除线 (Strikethrough)~~

## 3. 列表 (Lists)
无序列表：
- 苹果 (Apple)
- 香蕉 (Banana)
- 橘子 (Orange)

有序列表：
1. 第一步 (Step 1)
2. 第二步 (Step 2)
3. 第三步 (Step 3)

## 4. 引用 (Blockquotes)
> 这是一个引用块。通常用于强调某段话或引用名人名言。
> This is a blockquote.

## 5. 图片 (Images)
![示例图片](https://placehold.co/600x300/orange/white?text=ChaoFlux+Image)

## 6. 代码 (Code)
\`console.log("Hello ChaoFlux");\`

---
*Pro tip: 点击右下角 "THEME LIB" 切换更多主题！*`;

// Local Storage Keys
const KEYS = {
  MARKDOWN: 'pixel_wechat_markdown',
  CHAT: 'pixel_wechat_chat_history',
  IMAGES: 'pixel_wechat_image_history',
  VERSIONS: 'pixel_wechat_versions',
  CONFIG: 'pixel_wechat_config',
};

const App: React.FC = () => {
  // --- INITIALIZATION HELPERS ---
  const loadInitialMarkdown = () => {
    const saved = localStorage.getItem(KEYS.MARKDOWN);
    if (!saved) return DEFAULT_MARKDOWN_ZH;
    try {
      // safeSave uses JSON.stringify, so we must parse it to get the original string with formatting
      const parsed = JSON.parse(saved);
      // Ensure we have a string
      return typeof parsed === 'string' ? parsed : saved;
    } catch {
      // Fallback for legacy raw text data
      return saved;
    }
  };
  
  const loadInitialChat = (): ChatMessage[] => {
    try {
      const saved = localStorage.getItem(KEYS.CHAT);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  };

  const loadInitialImages = (): ChatMessage[] => {
    try {
      const saved = localStorage.getItem(KEYS.IMAGES);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  };

  const loadInitialVersions = (): ArticleVersion[] => {
     try {
       const saved = localStorage.getItem(KEYS.VERSIONS);
       return saved ? JSON.parse(saved) : [];
     } catch { return []; }
  };

  const loadInitialConfig = (): Partial<AppSettings> => {
    try {
        const saved = localStorage.getItem(KEYS.CONFIG);
        return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  };

  const initialConfig = loadInitialConfig();

  // --- STATE ---
  const [view, setView] = useState<ViewMode>('HOME');
  const [lang, setLang] = useState<Language>(initialConfig.language || 'zh');
  const [markdown, setMarkdown] = useState<string>(loadInitialMarkdown);
  
  // Separated States for Chat and Images
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(loadInitialChat);
  const [imageHistory, setImageHistory] = useState<ChatMessage[]>(loadInitialImages);
  
  const [versions, setVersions] = useState<ArticleVersion[]>(loadInitialVersions);
  
  const [themes, setThemes] = useState<Record<string, ThemeStyle>>(initialConfig.customThemes || defaultThemes);
  const [currentThemeKey, setCurrentThemeKey] = useState<string>('DEFAULT');
  const [mobileView, setMobileView] = useState<MobileView>(MobileView.EDITOR);
  
  // AI Configuration State
  // Logic: Use new textAI/imageAI if available, fall back to old aiConfig for text, default image to Google if missing.
  const [textAI, setTextAI] = useState<AIConfig | undefined>(initialConfig.textAI || initialConfig.aiConfig);
  const [imageAI, setImageAI] = useState<AIConfig | undefined>(initialConfig.imageAI);

  // Onboarding State
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Modals State
  const [showThemeModal, setShowThemeModal] = useState(false); // For AI Gen
  const [showThemeLibrary, setShowThemeLibrary] = useState(false); // For Selection
  const [showSettings, setShowSettings] = useState(false); // Renamed from DataManager
  const [showVersionHistory, setShowVersionHistory] = useState(false); // For Versions
  
  const [themePrompt, setThemePrompt] = useState('');
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);

  // Key to force re-render of textarea when content is restored programmatically
  const [editorKey, setEditorKey] = useState(0); 
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const t = translations[lang];

  // --- PERSISTENCE EFFECTS ---

  // Helper to safe save
  const safeSave = (key: string, data: any) => {
    try {
      const json = JSON.stringify(data);
      localStorage.setItem(key, json);
    } catch (e: any) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        console.error(`Local Storage Quota Exceeded for ${key}. Data not saved.`);
      } else {
        console.error(`Storage Error for ${key}:`, e);
      }
    }
  };

  // Auto-save Markdown
  useEffect(() => {
    safeSave(KEYS.MARKDOWN, markdown);
  }, [markdown]);

  // Auto-save Chat
  useEffect(() => {
    if (chatHistory.length === 0 && lang) {
        const welcome = { id: 'init', role: 'model', content: lang === 'zh' ? '你好！我是你的 AI 助手。' : 'Hello! I am your AI assistant.', type: 'text' } as ChatMessage;
        setChatHistory([welcome]);
    } else {
        safeSave(KEYS.CHAT, chatHistory);
    }
  }, [chatHistory, lang]);

  // Auto-save Images
  useEffect(() => {
    safeSave(KEYS.IMAGES, imageHistory);
  }, [imageHistory]);

  // Auto-save Versions
  useEffect(() => {
    safeSave(KEYS.VERSIONS, versions);
  }, [versions]);

  // Auto-save Config (Themes & Lang & AI Configs)
  useEffect(() => {
    const config: AppSettings = { 
      customThemes: themes, 
      language: lang,
      textAI: textAI,
      imageAI: imageAI,
      hasSeenOnboarding: !showOnboarding && initialConfig.hasSeenOnboarding // Persist seen state
    };
    safeSave(KEYS.CONFIG, config);
  }, [themes, lang, textAI, imageAI, showOnboarding]);

  // Check onboarding on editor view
  useEffect(() => {
    if (view === 'EDITOR' && !initialConfig.hasSeenOnboarding && !localStorage.getItem('has_seen_onboarding')) {
      setShowOnboarding(true);
    }
  }, [view]);

  // --- HANDLERS ---

  const handleFinishOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('has_seen_onboarding', 'true');
    const newConfig = { ...initialConfig, hasSeenOnboarding: true };
    safeSave(KEYS.CONFIG, newConfig);
  };

  const handleInsertContent = (content: string) => {
    if (!textAreaRef.current) {
        setMarkdown(prev => prev + '\n' + content);
        return;
    }
    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = markdown.substring(0, start) + content + markdown.substring(end);
    setMarkdown(newText);
    setMobileView(MobileView.EDITOR);
    // Slight delay to ensure DOM is ready and focus works
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + content.length, start + content.length);
    }, 10);
  };

  const copyToClipboard = () => {
    const previewElement = document.getElementById('wechat-preview-content');
    if (previewElement) {
      const range = document.createRange();
      range.selectNode(previewElement);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        try {
          const successful = document.execCommand('copy');
          alert(successful ? t.ui.copy_success : t.ui.copy_fail);
        } catch (err) {
          alert(t.ui.copy_fail);
        }
        selection.removeAllRanges();
      }
    }
  };

  // --- DATA MANAGEMENT ---

  const handleExportConfig = () => {
    const config: AppSettings = {
      customThemes: themes,
      language: lang,
      textAI: textAI,
      imageAI: imageAI
    };
    downloadJSON(config, `chaoflux-config-${Date.now()}`);
  };

  const handleExportUserData = () => {
    const data: UserData = {
      markdown,
      chatHistory,
      versions
    };
    downloadJSON(data, `chaoflux-userdata-${Date.now()}`);
  };

  const downloadJSON = (data: any, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportConfig = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string) as AppSettings;
        if (config.customThemes) setThemes(config.customThemes);
        if (config.language) setLang(config.language);
        if (config.textAI) setTextAI(config.textAI);
        if (config.imageAI) setImageAI(config.imageAI);
        // Fallback for old export format
        if (config.aiConfig && !config.textAI) setTextAI(config.aiConfig);
        
        alert('Configuration loaded!');
        setShowSettings(false);
      } catch (err) { alert('Invalid Configuration File'); }
    };
    reader.readAsText(file);
  };

  const handleImportUserData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as UserData;
        if (typeof data.markdown === 'string') {
            setMarkdown(data.markdown);
            setEditorKey(Date.now()); // Force update editor
        }
        if (Array.isArray(data.chatHistory)) setChatHistory(data.chatHistory);
        if (Array.isArray(data.versions)) setVersions(data.versions);
        alert('User Data loaded!');
        setShowSettings(false);
      } catch (err) { alert('Invalid User Data File'); }
    };
    reader.readAsText(file);
  };

  // --- VERSION CONTROL ---

  const handleSaveVersion = () => {
    // Attempt to extract title from markdown
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : (lang === 'zh' ? '无标题' : 'Untitled');
    
    // Create timestamp-based ID
    const timestamp = Date.now();
    const dateStr = new Date(timestamp).toLocaleDateString();
    
    const newVersion: ArticleVersion = {
        id: timestamp.toString(),
        timestamp: timestamp,
        content: markdown,
        label: `${title} - ${dateStr} (v${versions.length + 1})`
    };

    // Quota Protection: Pre-check size to prevent crash
    try {
        const potentialNewState = [...versions, newVersion];
        const json = JSON.stringify(potentialNewState);
        // Approx 4.5MB limit safeguard (browser limits vary 5-10MB)
        if (json.length > 4500000) { 
             throw new Error("QuotaExceededError");
        }
        setVersions(potentialNewState);
        alert(lang === 'zh' ? "版本已保存！" : "Version saved!");
    } catch (e: any) {
         if (e.message.includes("Quota") || e.name === 'QuotaExceededError') {
             alert(lang === 'zh' 
                ? "保存失败：存储空间不足。请删除部分旧版本或减少文章中的大图片（建议使用外部图片链接）。" 
                : "Save failed: Storage full. Please delete old versions or use external image links instead of base64 images.");
         } else {
             alert("Save failed: " + e.message);
         }
    }
  };

  const handleRestoreVersion = (v: ArticleVersion) => {
    // 0. Safety check
    if (!v.content && v.content !== '') {
        alert("Error: Empty version content.");
        return;
    }

    // 1. Update State
    setMarkdown(v.content);
    
    // 2. Direct DOM Update (Backup safeguard against React controlled component race conditions)
    if (textAreaRef.current) {
        textAreaRef.current.value = v.content;
    }

    // 3. Force Re-render Component using a unique key
    // This ensures the Textarea is completely re-created with the new value
    setEditorKey(prev => prev + 1); 
    
    // 4. Close Modal
    setShowVersionHistory(false);
  };

  const handleDeleteVersion = (id: string) => {
      setVersions(prev => prev.filter(v => v.id !== id));
  };

  // --- THEME GEN ---

  const handleGenerateTheme = async () => {
    if (!themePrompt.trim()) return;
    setIsGeneratingTheme(true);
    try {
      const newTheme = await generateThemeConfig(themePrompt, textAI);
      const themeName = `CUSTOM ${Object.keys(themes).length + 1}`;
      setThemes(prev => ({ ...prev, [themeName]: newTheme }));
      setCurrentThemeKey(themeName);
      setShowThemeModal(false);
      setThemePrompt('');
      alert(t.prompts.theme_created);
    } catch (error) {
      alert("Failed to generate theme. Check API Settings.");
    } finally {
      setIsGeneratingTheme(false);
    }
  };

  // --- RENDER ---

  if (view === 'HOME') {
    return <HomePage onStart={() => setView('EDITOR')} lang={lang} />;
  }

  const activeTheme = themes[currentThemeKey] || defaultThemes['DEFAULT'];

  return (
    <div className="fixed inset-0 flex flex-col p-2 md:p-4 font-sans bg-gray-200 text-lg">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-2 md:mb-4 px-2 shrink-0 h-16 md:h-20 bg-white border-b-4 border-black">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('HOME')}>
            <PixelLogo className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-2xl md:text-3xl font-pixel font-bold tracking-wider text-gray-800 uppercase hidden sm:block">ChaoFlux Editor</h1>
        </div>
        
        <div className="flex gap-2 items-center">
             <button 
                onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
                className="font-pixel text-sm mr-2 hover:underline"
            >
                {t.ui.switch_lang}
            </button>
            
            <PixelButton onClick={() => setShowSettings(true)} className="py-2 text-sm hidden md:block">
                {lang === 'zh' ? '设置' : 'SETTINGS'}
            </PixelButton>
            
            <PixelButton onClick={copyToClipboard} variant="primary" className="py-2 text-sm md:text-base">
                {t.ui.copy}
            </PixelButton>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left: AI */}
          <section className={`
            h-full flex flex-col min-h-0
            lg:col-span-3 lg:flex
            ${mobileView === MobileView.AI ? 'flex' : 'hidden'}
          `}>
            <AIAssistantPanel 
                onInsert={handleInsertContent} 
                lang={lang} 
                chatMessages={chatHistory} 
                setChatMessages={setChatHistory}
                imageGallery={imageHistory}
                setImageGallery={setImageHistory}
                textAIConfig={textAI}
                imageAIConfig={imageAI}
            />
          </section>

          {/* Center: Editor */}
          <section className={`
            h-full flex flex-col min-h-0
            lg:col-span-5 lg:flex
            ${mobileView === MobileView.EDITOR ? 'flex' : 'hidden'}
          `}>
            <PixelCard 
                title={t.ui.editor} 
                className="h-full flex flex-col overflow-hidden" 
                bodyClassName="flex flex-col p-0"
            >
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between p-2 bg-gray-100 border-b-4 border-black shrink-0">
                  <div className="text-sm font-pixel text-gray-500 pl-2">
                    {t.ui.chars}: {markdown.length}
                  </div>
                  <div className="flex gap-2">
                     <button 
                         onClick={() => setShowVersionHistory(true)}
                         className="flex items-center gap-1 bg-white border-2 border-black px-3 py-1 text-xs font-bold font-pixel hover:bg-gray-100 active:translate-y-0.5 active:shadow-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all"
                         title="View Version History"
                      >
                         🕒 {t.ui.history_title} <span className="bg-gray-200 px-1 rounded-full text-[10px]">{versions.length}</span>
                      </button>
                      <button 
                         onClick={handleSaveVersion}
                         className="flex items-center gap-1 bg-pixel-secondary text-black border-2 border-black px-3 py-1 text-xs font-bold font-pixel hover:brightness-110 active:translate-y-0.5 active:shadow-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all"
                         title="Save Current Version"
                      >
                         💾 {t.ui.save_current}
                      </button>
                  </div>
              </div>

              <div className="flex-1 relative">
                  <PixelTextArea 
                      key={editorKey} // Forces re-mount when key changes (on Restore)
                      ref={textAreaRef}
                      className="absolute inset-0 w-full h-full resize-none border-0 focus:shadow-none p-4 font-mono text-base leading-relaxed bg-yellow-50/50 outline-none"
                      value={markdown}
                      onChange={(e) => setMarkdown(e.target.value)}
                      placeholder="Start typing..."
                  />
              </div>
            </PixelCard>
          </section>

          {/* Right: Mobile Preview */}
          <section className={`
            h-full flex flex-col min-h-0
            lg:col-span-4 lg:flex items-center justify-center bg-gray-300 border-4 border-dashed border-gray-400 rounded-xl p-4
            ${mobileView === MobileView.PREVIEW ? 'flex' : 'hidden'}
          `}>
            <div className="flex flex-col w-full h-full max-w-[400px]">
                {/* Theme Selector Button */}
                <div className="bg-white p-3 border-4 border-black mb-4 flex justify-between items-center shrink-0">
                     <span className="font-pixel text-lg truncate flex-1 mr-2">
                       {t.ui.theme_label}: <span className="text-pixel-primary">{currentThemeKey.replace(/_/g, ' ')}</span>
                     </span>
                     <PixelButton 
                        onClick={() => setShowThemeLibrary(true)} 
                        className="text-xs px-2 py-1 h-8" 
                        variant="secondary"
                     >
                        📚 {t.ui.theme_library}
                     </PixelButton>
                </div>

                {/* Phone Frame */}
                <div className="flex-1 bg-white border-x-[14px] border-y-[28px] border-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden relative w-full">
                     {/* Dynamic Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10"></div>
                    
                    <div className="h-full overflow-y-auto custom-scrollbar pt-8 bg-white">
                        <ArticlePreview markdown={markdown} themeStyle={activeTheme} />
                    </div>
                </div>
            </div>
          </section>

        </div>
      </main>

      {/* Mobile Nav */}
      <nav className="lg:hidden mt-2 shrink-0 grid grid-cols-3 gap-2 h-14">
        <PixelButton active={mobileView === MobileView.AI} onClick={() => setMobileView(MobileView.AI)} className="text-base p-0 flex items-center justify-center">🤖 {t.ui.ai_panel}</PixelButton>
        <PixelButton active={mobileView === MobileView.EDITOR} onClick={() => setMobileView(MobileView.EDITOR)} className="text-base p-0 flex items-center justify-center">📝 {t.ui.editor}</PixelButton>
        <PixelButton active={mobileView === MobileView.PREVIEW} onClick={() => setMobileView(MobileView.PREVIEW)} className="text-base p-0 flex items-center justify-center">👁️ {t.ui.preview}</PixelButton>
      </nav>

      {/* Modals */}
      {showOnboarding && <OnboardingTour onFinish={handleFinishOnboarding} lang={lang} />}

      {showThemeLibrary && (
        <ThemeSelectionModal 
          themes={themes}
          currentThemeKey={currentThemeKey}
          onSelect={setCurrentThemeKey}
          onClose={() => setShowThemeLibrary(false)}
          onCreateNew={() => {
            setShowThemeLibrary(false);
            setShowThemeModal(true);
          }}
          lang={lang}
        />
      )}

      {showSettings && (
        <SettingsModal 
            onClose={() => setShowSettings(false)}
            onExportConfig={handleExportConfig}
            onImportConfig={handleImportConfig}
            onExportUserData={handleExportUserData}
            onImportUserData={handleImportUserData}
            currentConfig={{
              customThemes: themes,
              language: lang,
              textAI: textAI,
              imageAI: imageAI
            }}
            onSaveConfig={(cfg) => {
              if (cfg.customThemes) setThemes(cfg.customThemes);
              if (cfg.language) setLang(cfg.language);
              if (cfg.textAI) setTextAI(cfg.textAI);
              if (cfg.imageAI) setImageAI(cfg.imageAI);
              setShowSettings(false);
            }}
            lang={lang}
        />
      )}

      {showVersionHistory && (
        <VersionHistoryModal 
            versions={versions}
            onRestore={handleRestoreVersion}
            onDelete={handleDeleteVersion}
            onClose={() => setShowVersionHistory(false)}
            onSaveNew={handleSaveVersion}
            lang={lang}
        />
      )}

      {/* Theme Generator Modal */}
      {showThemeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="w-full max-w-md">
                  <PixelCard title={t.ui.create_theme}>
                      <div className="flex flex-col gap-4">
                          <PixelTextArea 
                              rows={4} 
                              value={themePrompt} 
                              onChange={(e) => setThemePrompt(e.target.value)} 
                              placeholder={t.prompts.theme_gen}
                          />
                          <div className="flex justify-end gap-2">
                              <PixelButton onClick={() => setShowThemeModal(false)}>{t.ui.close}</PixelButton>
                              <PixelButton variant="primary" onClick={handleGenerateTheme} disabled={isGeneratingTheme}>
                                  {isGeneratingTheme ? t.ui.thinking : "Generate"}
                              </PixelButton>
                          </div>
                      </div>
                  </PixelCard>
              </div>
          </div>
      )}

      {/* Footer */}
      <footer className="hidden lg:block shrink-0 text-center font-pixel text-gray-500 text-sm mt-2">
        CHAOFLUX EDITOR v4.0 • {Object.keys(themes).length} {lang === 'zh' ? '个主题可用' : 'THEMES AVAILABLE'}
      </footer>
    </div>
  );
};

export default App;