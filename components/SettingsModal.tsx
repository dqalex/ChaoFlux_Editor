import React, { useRef, useState, useEffect } from 'react';
import { PixelCard, PixelButton, PixelInput } from './PixelComponents';
import { Language, AIConfig, AppSettings, AIProvider } from '../types';
import { translations } from '../utils/translations';

interface SettingsModalProps {
  onClose: () => void;
  onExportConfig: () => void;
  onImportConfig: (file: File) => void;
  onExportUserData: () => void;
  onImportUserData: (file: File) => void;
  currentConfig: AppSettings;
  onSaveConfig: (newConfig: AppSettings) => void;
  lang: Language;
}

// Helper component for a single AI Config Form
const AIConfigForm: React.FC<{
  label: string;
  config: AIConfig;
  onChange: (c: AIConfig) => void;
  lang: Language;
  defaultModelGoogle: string;
  defaultModelOpenAI: string;
}> = ({ label, config, onChange, lang, defaultModelGoogle, defaultModelOpenAI }) => {
  
  const update = (field: keyof AIConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-gray-50 border-2 border-black p-4 mb-4">
      <h4 className="font-pixel font-bold text-lg mb-3 bg-white inline-block px-2 border border-black">{label}</h4>
      
      <div className="space-y-3">
        <div>
          <label className="block mb-1 font-bold text-sm font-pixel">Provider</label>
          <div className="flex gap-2">
            <button 
              onClick={() => update('provider', 'google')}
              className={`px-3 py-2 border-2 border-black flex-1 font-pixel text-sm ${config.provider === 'google' ? 'bg-blue-100' : 'bg-white hover:bg-gray-100'}`}
            >
              Google Gemini
            </button>
            <button 
              onClick={() => update('provider', 'openai')}
              className={`px-3 py-2 border-2 border-black flex-1 font-pixel text-sm ${config.provider === 'openai' ? 'bg-blue-100' : 'bg-white hover:bg-gray-100'}`}
            >
              OpenAI / Custom
            </button>
          </div>
        </div>

        <div>
            <label className="block mb-1 font-bold text-sm font-pixel">API Key</label>
            <PixelInput 
              type="password" 
              value={config.apiKey || ''} 
              onChange={e => update('apiKey', e.target.value)}
              placeholder={config.provider === 'google' ? "Default: System Env Key" : "sk-..."}
              className="text-sm py-1"
            />
        </div>

        {config.provider === 'openai' && (
          <div>
            <label className="block mb-1 font-bold text-sm font-pixel">Base URL</label>
            <PixelInput 
              value={config.baseUrl || ''} 
              onChange={e => update('baseUrl', e.target.value)}
              placeholder="https://api.openai.com/v1"
              className="text-sm py-1"
            />
          </div>
        )}

        <div>
            <label className="block mb-1 font-bold text-sm font-pixel">Model Name</label>
            <PixelInput 
              value={config.model || ''} 
              onChange={e => update('model', e.target.value)}
              placeholder={config.provider === 'google' ? defaultModelGoogle : defaultModelOpenAI}
              className="text-sm py-1"
            />
        </div>
      </div>
    </div>
  );
};

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  onExportConfig,
  onImportConfig,
  onExportUserData,
  onImportUserData,
  currentConfig,
  onSaveConfig,
  lang
}) => {
  const t = translations[lang];
  const configInputRef = useRef<HTMLInputElement>(null);
  const userDataInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'AI'>('GENERAL');
  const [aiSubTab, setAiSubTab] = useState<'TEXT' | 'IMAGE'>('TEXT');

  // State
  const [textConfig, setTextConfig] = useState<AIConfig>({ provider: 'google' });
  const [imageConfig, setImageConfig] = useState<AIConfig>({ provider: 'google' });

  // Load initial values
  useEffect(() => {
    // Migrate old aiConfig if exists, otherwise use split configs
    if (currentConfig.textAI) setTextConfig(currentConfig.textAI);
    else if (currentConfig.aiConfig) setTextConfig(currentConfig.aiConfig);

    if (currentConfig.imageAI) setImageConfig(currentConfig.imageAI);
    // If no image config, default to google (or inherit from old aiConfig if user wants, but safer to default google for images)
  }, [currentConfig]);

  const handleSaveAI = () => {
    onSaveConfig({
      ...currentConfig,
      textAI: textConfig,
      imageAI: imageConfig
    });
    alert(lang === 'zh' ? '配置已保存' : 'Configuration Saved');
  };

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        onImportConfig(file);
        if(configInputRef.current) configInputRef.current.value = '';
    }
  };

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        onImportUserData(file);
        if(userDataInputRef.current) userDataInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg flex flex-col max-h-[90vh]">
        <PixelCard title={lang === 'zh' ? '设置' : 'SETTINGS'} className="h-full flex flex-col" bodyClassName="flex flex-col p-0">
          
          {/* Main Tabs */}
          <div className="flex border-b-4 border-black bg-gray-100 shrink-0">
            <button 
              onClick={() => setActiveTab('GENERAL')}
              className={`flex-1 py-3 font-pixel text-lg ${activeTab === 'GENERAL' ? 'bg-pixel-primary text-white' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              {lang === 'zh' ? '数据管理' : 'DATA'}
            </button>
            <button 
              onClick={() => setActiveTab('AI')}
              className={`flex-1 py-3 font-pixel text-lg ${activeTab === 'AI' ? 'bg-pixel-secondary text-black' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              {lang === 'zh' ? 'AI 配置' : 'AI CONFIG'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white">
            
            {activeTab === 'GENERAL' && (
              <div className="space-y-8">
                {/* Configuration Section */}
                <div className="border-b-2 border-dashed border-gray-400 pb-6">
                  <h3 className="font-pixel text-xl mb-2 flex items-center">
                    ⚙️ {t.ui.config_section}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.ui.config_desc}
                  </p>
                  <div className="flex gap-4">
                    <input type="file" ref={configInputRef} onChange={handleConfigChange} className="hidden" accept=".json" />
                    <PixelButton onClick={() => configInputRef.current?.click()} className="flex-1 text-sm py-2">
                      {t.ui.import_config}
                    </PixelButton>
                    <PixelButton onClick={onExportConfig} className="flex-1 text-sm py-2">
                      {t.ui.export_config}
                    </PixelButton>
                  </div>
                </div>

                {/* User Data Section */}
                <div>
                  <h3 className="font-pixel text-xl mb-2 flex items-center">
                    💾 {t.ui.user_data_section}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {t.ui.user_data_desc}
                  </p>
                  <div className="flex gap-4">
                    <input type="file" ref={userDataInputRef} onChange={handleUserDataChange} className="hidden" accept=".json" />
                    <PixelButton onClick={() => userDataInputRef.current?.click()} variant="secondary" className="flex-1 text-sm py-2">
                      {t.ui.import_data}
                    </PixelButton>
                    <PixelButton onClick={onExportUserData} variant="secondary" className="flex-1 text-sm py-2">
                      {t.ui.export_data}
                    </PixelButton>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'AI' && (
               <div className="space-y-4">
                  {/* AI Sub Tabs */}
                  <div className="flex gap-2 mb-4">
                      <button 
                         onClick={() => setAiSubTab('TEXT')}
                         className={`px-4 py-1 font-pixel border-2 border-black rounded-t-lg ${aiSubTab === 'TEXT' ? 'bg-gray-800 text-white translate-y-1' : 'bg-gray-200 text-gray-600'}`}
                      >
                         {lang === 'zh' ? '对话模型' : 'CHAT / TEXT'}
                      </button>
                      <button 
                         onClick={() => setAiSubTab('IMAGE')}
                         className={`px-4 py-1 font-pixel border-2 border-black rounded-t-lg ${aiSubTab === 'IMAGE' ? 'bg-gray-800 text-white translate-y-1' : 'bg-gray-200 text-gray-600'}`}
                      >
                         {lang === 'zh' ? '绘图模型' : 'IMAGE GEN'}
                      </button>
                  </div>

                  {aiSubTab === 'TEXT' ? (
                      <AIConfigForm 
                        label={lang === 'zh' ? "文本生成配置 (对话/润色)" : "Text Generation Settings"}
                        config={textConfig}
                        onChange={setTextConfig}
                        lang={lang}
                        defaultModelGoogle="gemini-3-flash-preview"
                        defaultModelOpenAI="gpt-3.5-turbo"
                      />
                  ) : (
                      <AIConfigForm 
                        label={lang === 'zh' ? "图片生成配置 (AI 配图)" : "Image Generation Settings"}
                        config={imageConfig}
                        onChange={setImageConfig}
                        lang={lang}
                        defaultModelGoogle="gemini-2.5-flash-image"
                        defaultModelOpenAI="dall-e-3"
                      />
                  )}

                  <div className="pt-4 border-t-2 border-dashed border-gray-300">
                    <PixelButton onClick={handleSaveAI} variant="primary" className="w-full text-sm py-2">
                      {lang === 'zh' ? '保存所有 AI 配置' : 'SAVE ALL AI CONFIGS'}
                    </PixelButton>
                  </div>
               </div>
            )}

          </div>

          <div className="p-4 border-t-4 border-black bg-gray-100 flex justify-end">
            <PixelButton onClick={onClose} variant="neutral">{t.ui.close}</PixelButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};