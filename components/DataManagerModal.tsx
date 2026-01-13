import React, { useRef } from 'react';
import { PixelCard, PixelButton } from './PixelComponents';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface DataManagerModalProps {
  onClose: () => void;
  onExportConfig: () => void;
  onImportConfig: (file: File) => void;
  onExportUserData: () => void;
  onImportUserData: (file: File) => void;
  lang: Language;
}

export const DataManagerModal: React.FC<DataManagerModalProps> = ({
  onClose,
  onExportConfig,
  onImportConfig,
  onExportUserData,
  onImportUserData,
  lang
}) => {
  const t = translations[lang];
  const configInputRef = useRef<HTMLInputElement>(null);
  const userDataInputRef = useRef<HTMLInputElement>(null);

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
      <div className="w-full max-w-lg">
        <PixelCard title={t.ui.data_manager}>
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

            <div className="flex justify-end pt-4">
              <PixelButton onClick={onClose} variant="neutral">{t.ui.close}</PixelButton>
            </div>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};
