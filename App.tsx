import React, { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from './utils/supabaseClient';
import { PixelAuth } from './components/PixelAuth';
import { PixelButton, PixelCard, PixelTextArea } from './components/PixelComponents';
import { PixelLogo } from './components/PixelLogo';
import ArticlePreview from './components/ArticlePreview';
import AIAssistantPanel from './components/AIAssistantPanel';
import HomePage from './components/HomePage';
import { ThemeSelectionModal } from './components/ThemeSelectionModal';
import { SettingsModal } from './components/SettingsModal';
import { VersionHistoryModal } from './components/VersionHistoryModal';
import { OnboardingTour } from './components/OnboardingTour';
import { ThemeStyle, AppSettings, UserData, Language, ChatMessage, ArticleVersion, AIConfig, FontSize } from './types';
import { defaultThemes, applyFontSize } from './utils/wechatStyles';
import { translations } from './utils/translations';
import { generateThemeConfig } from './services/geminiService';

enum MobileView {
  AI = 'AI',
  EDITOR = 'EDITOR',
  PREVIEW = 'PREVIEW'
}

type ViewMode = 'HOME' | 'EDITOR';

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
  // --- AUTH STATE ---
  const [session, setSession] = useState<any>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
          setShowLoginModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- STATE INITIALIZATION ---
  const [view, setView] = useState<ViewMode>('HOME');
  const [lang, setLang] = useState<Language>('zh');
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN_ZH);
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [imageHistory, setImageHistory] = useState<ChatMessage[]>([]);
  const [versions, setVersions] = useState<ArticleVersion[]>([]);
  const [themes, setThemes] = useState<Record<string, ThemeStyle>>(defaultThemes);
  const [currentThemeKey, setCurrentThemeKey] = useState<string>('MINIMAL_LIT');
  const [textAI, setTextAI] = useState<AIConfig | undefined>(undefined);
  const [imageAI, setImageAI] = useState<AIConfig | undefined>(undefined);
  const [mobileView, setMobileView] = useState<MobileView>(MobileView.EDITOR);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Modals
  const [showThemeLibrary, setShowThemeLibrary] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [themePrompt, setThemePrompt] = useState('');
  const [isGeneratingTheme, setIsGeneratingTheme] = useState(false);

  // Editor Ref
  const [editorKey, setEditorKey] = useState(0); 
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<any>(null);

  const t = translations[lang];

  // --- DATA LOADING ---
  
  useEffect(() => {
    if (isAuthChecking) return;

    if (session) {
      loadUserData(); // Cloud
    } else {
      loadLocalData(); // Local Storage
    }
  }, [session, isAuthChecking]);

  const loadLocalData = () => {
    try {
        const savedMarkdown = localStorage.getItem(KEYS.MARKDOWN);
        if (savedMarkdown) setMarkdown(savedMarkdown);

        const savedChat = localStorage.getItem(KEYS.CHAT);
        if (savedChat) setChatHistory(JSON.parse(savedChat));

        const savedImages = localStorage.getItem(KEYS.IMAGES);
        if (savedImages) setImageHistory(JSON.parse(savedImages));

        const savedVersions = localStorage.getItem(KEYS.VERSIONS);
        if (savedVersions) setVersions(JSON.parse(savedVersions));

        const savedConfig = localStorage.getItem(KEYS.CONFIG);
        if (savedConfig) {
            const parsed = JSON.parse(savedConfig) as AppSettings;
            if (parsed.customThemes) setThemes(prev => ({ ...prev, ...parsed.customThemes }));
            if (parsed.language) setLang(parsed.language);
            if (parsed.fontSize) setFontSize(parsed.fontSize);
            if (parsed.textAI) setTextAI(parsed.textAI);
            if (parsed.imageAI) setImageAI(parsed.imageAI);
            if (parsed.hasSeenOnboarding !== undefined) setShowOnboarding(!parsed.hasSeenOnboarding);
            // Fallback for old single config
            if (parsed.aiConfig && !parsed.textAI) setTextAI(parsed.aiConfig);
        } else {
            // First time user?
            setShowOnboarding(true);
        }
    } catch (e) {
        console.error("Local load error", e);
    }
  };

  const loadUserData = async () => {
    if (!session?.user) return;
    setIsCloudSyncing(true);
    
    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching data:', error);
      }

      if (data) {
        if (data.markdown) setMarkdown(data.markdown);
        if (data.chat_history) setChatHistory(data.chat_history);
        if (data.image_history) setImageHistory(data.image_history);
        if (data.versions) setVersions(data.versions);
        
        // Settings mapping
        if (data.settings) {
           const s = data.settings;
           if (s.language) setLang(s.language);
           if (s.fontSize) setFontSize(s.fontSize);
           if (s.customThemes) setThemes(s.customThemes);
           if (s.textAI) setTextAI(s.textAI);
           if (s.imageAI) setImageAI(s.imageAI);
           if (s.hasSeenOnboarding !== undefined) setShowOnboarding(!s.hasSeenOnboarding);
        }
      } else {
        // No data in cloud yet.
        // Option: Merge local data? For now, we just load what is there (empty defaults or handled by Postgres trigger)
      }
    } finally {
      setIsCloudSyncing(false);
    }
  };

  // --- DATA SAVING (DEBOUNCED) ---

  const saveData = useCallback(async () => {
    // 1. Always save to LocalStorage as a backup/offline cache
    localStorage.setItem(KEYS.MARKDOWN, markdown);
    localStorage.setItem(KEYS.CHAT, JSON.stringify(chatHistory));
    localStorage.setItem(KEYS.IMAGES, JSON.stringify(imageHistory));
    localStorage.setItem(KEYS.VERSIONS, JSON.stringify(versions));
    
    const settingsData = {
      language: lang,
      fontSize: fontSize,
      customThemes: themes,
      textAI: textAI,
      imageAI: imageAI,
      hasSeenOnboarding: !showOnboarding
    };
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(settingsData));

    // 2. If logged in, sync to Supabase
    if (session?.user) {
        setIsCloudSyncing(true);
        const payload = {
          markdown,
          chat_history: chatHistory,
          image_history: imageHistory,
          versions,
          settings: settingsData,
          updated_at: new Date().toISOString()
        };

        try {
          const { error } = await supabase
            .from('user_data')
            .upsert({ user_id: session.user.id, ...payload });

          if (error) throw error;
        } catch (err) {
          console.error("Cloud Save Failed:", err);
        } finally {
          setIsCloudSyncing(false);
        }
    }
  }, [session, markdown, chatHistory, imageHistory, versions, lang, fontSize, themes, textAI, imageAI, showOnboarding]);

  // Debounce Effect
  useEffect(() => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    saveTimeoutRef.current = setTimeout(() => {
      saveData();
    }, 2000); // Auto-save after 2 seconds

    return () => clearTimeout(saveTimeoutRef.current);
  }, [markdown, chatHistory, imageHistory, versions, lang, fontSize, themes, textAI, imageAI, showOnboarding, saveData]);

  // --- HANDLERS ---

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    // After logout, reload local data or reset to defaults?
    // Let's reload local data to prevent showing someone else's data if shared device (though LS is shared per domain)
    // For safety, we might want to clear state, but let's just trigger a reload
    loadLocalData();
    setView('HOME');
  };

  const handleFinishOnboarding = () => {
    setShowOnboarding(false);
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
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + content.length, start + content.length);
    }, 10);
  };

  const copyToClipboard = async () => {
    const previewElement = document.getElementById('wechat-preview-content');
    if (!previewElement) {
       alert(t.ui.copy_fail);
       return;
    }
    try {
        const htmlContent = previewElement.outerHTML;
        const blobHtml = new Blob([htmlContent], { type: 'text/html' });
        const blobText = new Blob([previewElement.innerText], { type: 'text/plain' });
        if (typeof ClipboardItem !== 'undefined') {
            const data = [new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })];
            await navigator.clipboard.write(data);
            alert(t.ui.copy_success);
            return;
        }
    } catch (err) { console.warn("Clipboard API failed", err); }
    
    // Fallback
    const range = document.createRange();
    range.selectNode(previewElement);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        const successful = document.execCommand('copy');
        alert(successful ? t.ui.copy_success : t.ui.copy_fail);
      } catch (err) { alert(t.ui.copy_fail); }
      selection.removeAllRanges();
    }
  };

  const handleExportHTML = () => {
    const previewElement = document.getElementById('wechat-preview-content');
    if (previewElement) {
        const htmlContent = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>ChaoFlux Export</title></head><body style="margin:0; padding:0; background-color: #f0f0f0;">${previewElement.outerHTML}</body></html>`;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chaoflux-article-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        alert(t.ui.copy_fail);
    }
  };

  // Data Export/Import Handlers
  const handleExportConfig = () => {
    const config = { customThemes: themes, language: lang, textAI, imageAI, fontSize };
    downloadJSON(config, `chaoflux-config-${Date.now()}`);
  };

  const handleExportUserData = () => {
    const data = { markdown, chatHistory, versions };
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
        const config = JSON.parse(e.target?.result as string);
        if (config.customThemes) setThemes(config.customThemes);
        if (config.language) setLang(config.language);
        if (config.textAI) setTextAI(config.textAI);
        if (config.imageAI) setImageAI(config.imageAI);
        if (config.fontSize) setFontSize(config.fontSize);
        alert('Configuration loaded!');
        setShowSettings(false);
      } catch (err) { alert('Invalid File'); }
    };
    reader.readAsText(file);
  };

  const handleImportUserData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (typeof data.markdown === 'string') { setMarkdown(data.markdown); setEditorKey(Date.now()); }
        if (Array.isArray(data.chatHistory)) setChatHistory(data.chatHistory);
        if (Array.isArray(data.versions)) setVersions(data.versions);
        alert('User Data loaded!');
        setShowSettings(false);
      } catch (err) { alert('Invalid File'); }
    };
    reader.readAsText(file);
  };

  const handleSaveVersion = () => {
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : (lang === 'zh' ? '无标题' : 'Untitled');
    const timestamp = Date.now();
    const dateStr = new Date(timestamp).toLocaleDateString();
    
    const newVersion: ArticleVersion = {
        id: timestamp.toString(),
        timestamp: timestamp,
        content: markdown,
        label: `${title} - ${dateStr} (v${versions.length + 1})`
    };

    try {
        const potentialNewState = [...versions, newVersion];
        setVersions(potentialNewState);
        alert(lang === 'zh' ? "版本已保存！" : "Version saved!");
    } catch (e: any) {
         alert("Save failed: " + e.message);
    }
  };

  const handleRestoreVersion = (v: ArticleVersion) => {
    if (!v.content && v.content !== '') return;
    setMarkdown(v.content);
    if (textAreaRef.current) textAreaRef.current.value = v.content;
    setEditorKey(prev => prev + 1); 
    setShowVersionHistory(false);
  };

  const handleDeleteVersion = (id: string) => {
      setVersions(prev => prev.filter(v => v.id !== id));
  };

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
      alert("Failed to generate theme.");
    } finally {
      setIsGeneratingTheme(false);
    }
  };

  // --- RENDER ---

  if (isAuthChecking) {
    return <div className="min-h-screen bg-gray-200 flex items-center justify-center font-pixel text-xl">LOADING...</div>;
  }

  // Not checking for session here anymore, allowing rendering of HomePage

  if (view === 'HOME') {
    return <HomePage onStart={() => setView('EDITOR')} lang={lang} />;
  }

  const baseTheme = themes[currentThemeKey] || themes['MINIMAL_LIT'] || Object.values(themes)[0] || defaultThemes['MINIMAL_LIT'];
  const activeTheme = applyFontSize(baseTheme, fontSize);

  return (
    <div className="fixed inset-0 flex flex-col p-2 md:p-4 font-sans bg-gray-200 text-lg">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-2 md:mb-4 px-2 shrink-0 h-16 md:h-20 bg-white border-b-4 border-black">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('HOME')}>
            <PixelLogo className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-2xl md:text-3xl font-pixel font-bold tracking-wider text-gray-800 uppercase hidden sm:block">ChaoFlux Editor</h1>
            {isCloudSyncing && <span className="text-xs font-pixel text-green-500 animate-pulse">SAVING (CLOUD)...</span>}
            {!session && !isCloudSyncing && <span className="text-xs font-pixel text-gray-400">LOCAL MODE</span>}
        </div>
        
        <div className="flex gap-2 items-center">
             <button onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')} className="font-pixel text-sm mr-2 hover:underline">{t.ui.switch_lang}</button>
            <PixelButton onClick={() => setShowSettings(true)} className="py-2 text-sm hidden md:block">{lang === 'zh' ? '设置' : 'SETTINGS'}</PixelButton>
            <PixelButton onClick={handleExportHTML} variant="secondary" className="py-2 text-sm hidden md:block">{t.ui.export_html}</PixelButton>
            <PixelButton onClick={copyToClipboard} variant="primary" className="py-2 text-sm md:text-base">{t.ui.copy}</PixelButton>
            
            {session ? (
              <PixelButton onClick={handleLogout} variant="danger" className="py-2 text-sm">LOGOUT</PixelButton>
            ) : (
              <PixelButton onClick={() => setShowLoginModal(true)} className="py-2 text-sm bg-blue-600 text-white hover:bg-blue-500">LOGIN</PixelButton>
            )}
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left: AI */}
          <section className={`h-full flex flex-col min-h-0 lg:col-span-3 lg:flex ${mobileView === MobileView.AI ? 'flex' : 'hidden'}`}>
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
          <section className={`h-full flex flex-col min-h-0 lg:col-span-5 lg:flex ${mobileView === MobileView.EDITOR ? 'flex' : 'hidden'}`}>
            <PixelCard title={t.ui.editor} className="h-full flex flex-col overflow-hidden" bodyClassName="flex flex-col p-0">
              <div className="flex items-center justify-between p-2 bg-gray-100 border-b-4 border-black shrink-0">
                  <div className="text-sm font-pixel text-gray-500 pl-2">{t.ui.chars}: {markdown.length}</div>
                  <div className="flex gap-2">
                     <button onClick={() => setShowVersionHistory(true)} className="flex items-center gap-1 bg-white border-2 border-black px-3 py-1 text-xs font-bold font-pixel hover:bg-gray-100 transition-all">🕒 {t.ui.history_title} <span className="bg-gray-200 px-1 rounded-full text-[10px]">{versions.length}</span></button>
                      <button onClick={handleSaveVersion} className="flex items-center gap-1 bg-pixel-secondary text-black border-2 border-black px-3 py-1 text-xs font-bold font-pixel hover:brightness-110 transition-all">💾 {t.ui.save_current}</button>
                  </div>
              </div>
              <div className="flex-1 relative">
                  <PixelTextArea 
                      key={editorKey}
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
          <section className={`h-full flex flex-col min-h-0 lg:col-span-4 lg:flex items-center justify-center lg:bg-gray-300 bg-gray-200 lg:border-4 lg:border-dashed lg:border-gray-400 lg:rounded-xl lg:p-4 p-0 ${mobileView === MobileView.PREVIEW ? 'flex' : 'hidden'}`}>
            <div className="flex flex-col w-full h-full lg:max-w-[400px]">
                <div className="bg-white p-3 border-4 border-black mb-4 flex justify-between items-center shrink-0">
                     <span className="font-pixel text-lg truncate flex-1 mr-2">{t.ui.theme_label}: <span className="text-pixel-primary">{currentThemeKey.replace(/_/g, ' ')}</span></span>
                     <PixelButton onClick={() => setShowThemeLibrary(true)} className="text-xs px-2 py-1 h-8" variant="secondary">📚 {t.ui.theme_library}</PixelButton>
                </div>
                <div className="flex-1 bg-white lg:border-x-[14px] lg:border-y-[28px] lg:border-gray-800 lg:rounded-[2.5rem] lg:shadow-2xl overflow-hidden relative w-full border-0 rounded-none shadow-none">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-10 hidden lg:block"></div>
                    <div className="h-full overflow-y-auto custom-scrollbar pt-0 lg:pt-8 bg-white">
                        <ArticlePreview markdown={markdown} themeStyle={activeTheme} />
                    </div>
                </div>
            </div>
          </section>

        </div>
      </main>

      <nav className="lg:hidden mt-2 shrink-0 grid grid-cols-3 gap-2 h-14">
        <PixelButton active={mobileView === MobileView.AI} onClick={() => setMobileView(MobileView.AI)} className="text-base p-0 flex items-center justify-center">🤖 {t.ui.ai_panel}</PixelButton>
        <PixelButton active={mobileView === MobileView.EDITOR} onClick={() => setMobileView(MobileView.EDITOR)} className="text-base p-0 flex items-center justify-center">📝 {t.ui.editor}</PixelButton>
        <PixelButton active={mobileView === MobileView.PREVIEW} onClick={() => setMobileView(MobileView.PREVIEW)} className="text-base p-0 flex items-center justify-center">👁️ {t.ui.preview}</PixelButton>
      </nav>

      {showOnboarding && <OnboardingTour onFinish={handleFinishOnboarding} lang={lang} />}

      {/* Login Modal (Optional) */}
      {showLoginModal && (
        <PixelAuth 
            onLoginSuccess={() => loadUserData()} 
            onClose={() => setShowLoginModal(false)}
        />
      )}

      {showThemeLibrary && (
        <ThemeSelectionModal 
          themes={themes}
          currentThemeKey={currentThemeKey}
          onSelect={setCurrentThemeKey}
          onClose={() => setShowThemeLibrary(false)}
          onCreateNew={() => { setShowThemeLibrary(false); setShowThemeModal(true); }}
          lang={lang}
          currentFontSize={fontSize}
          onFontSizeChange={setFontSize}
        />
      )}

      {showSettings && (
        <SettingsModal 
            onClose={() => setShowSettings(false)}
            onExportConfig={handleExportConfig}
            onImportConfig={handleImportConfig}
            onExportUserData={handleExportUserData}
            onImportUserData={handleImportUserData}
            currentConfig={{ customThemes: themes, language: lang, textAI, imageAI, fontSize }}
            onSaveConfig={(cfg) => {
              if (cfg.customThemes) setThemes(cfg.customThemes);
              if (cfg.language) setLang(cfg.language);
              if (cfg.textAI) setTextAI(cfg.textAI);
              if (cfg.imageAI) setImageAI(cfg.imageAI);
              if (cfg.fontSize) setFontSize(cfg.fontSize);
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

      {showThemeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="w-full max-w-md">
                  <PixelCard title={t.ui.create_theme}>
                      <div className="flex flex-col gap-4">
                          <PixelTextArea rows={4} value={themePrompt} onChange={(e) => setThemePrompt(e.target.value)} placeholder={t.prompts.theme_gen} />
                          <div className="flex justify-end gap-2">
                              <PixelButton onClick={() => setShowThemeModal(false)}>{t.ui.close}</PixelButton>
                              <PixelButton variant="primary" onClick={handleGenerateTheme} disabled={isGeneratingTheme}>{isGeneratingTheme ? t.ui.thinking : "Generate"}</PixelButton>
                          </div>
                      </div>
                  </PixelCard>
              </div>
          </div>
      )}

      <footer className="hidden lg:block shrink-0 text-center font-pixel text-gray-500 text-sm mt-2">
        CHAOFLUX EDITOR v4.0 (CLOUD/LOCAL HYBRID) • {Object.keys(themes).length} {lang === 'zh' ? '个主题可用' : 'THEMES AVAILABLE'}
      </footer>
    </div>
  );
};

export default App;