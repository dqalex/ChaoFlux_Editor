import React from 'react';
import { PixelCard, PixelButton } from './PixelComponents';
import { ArticleVersion, Language } from '../types';
import { translations } from '../utils/translations';

interface VersionHistoryModalProps {
  versions: ArticleVersion[];
  onRestore: (version: ArticleVersion) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  onSaveNew: () => void;
  lang: Language;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  versions,
  onRestore,
  onDelete,
  onClose,
  onSaveNew,
  lang
}) => {
  const t = translations[lang];
  
  const handleRestoreClick = (e: React.MouseEvent, v: ArticleVersion) => {
    e.stopPropagation(); // Prevent bubbling issues
    // Native confirm() can be blocked in some embedded browsers/webviews causing "no response".
    // Removing it to ensure the action executes. User can save current version before restoring if needed.
    onRestore(v);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl flex flex-col max-h-[85vh]">
        <PixelCard title={t.ui.history_title} className="h-full flex flex-col" bodyClassName="flex flex-col p-0">
          
          <div className="p-4 border-b-4 border-black bg-gray-50 flex justify-between items-center shrink-0">
             <p className="font-pixel text-gray-600">{t.ui.total_versions}: {versions.length}</p>
             <PixelButton onClick={onSaveNew} variant="primary" className="text-sm py-2">
                {t.ui.save_current}
             </PixelButton>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-3 bg-gray-100">
            {versions.length === 0 ? (
                <div className="text-center py-10 opacity-50 font-pixel text-xl">
                    {lang === 'zh' ? '暂无历史版本' : 'No history saved yet.'}
                </div>
            ) : (
                [...versions].reverse().map((v) => (
                    <div key={v.id} className="bg-white border-2 border-black p-3 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-pixel font-bold text-lg bg-yellow-200 px-2 py-0.5 border border-black break-all">
                                        {v.label}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 font-mono block mt-1">
                                    {new Date(v.timestamp).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={(e) => handleRestoreClick(e, v)}
                                    className="font-pixel bg-blue-100 hover:bg-blue-200 text-blue-800 border-2 border-transparent hover:border-blue-300 px-2 py-1 text-sm uppercase transition-colors rounded"
                                >
                                    ↺ {t.ui.restore}
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onDelete(v.id); }}
                                    className="font-pixel text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 text-sm uppercase transition-colors rounded"
                                >
                                    ✕ {t.ui.delete}
                                </button>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 font-mono border-t border-gray-100 pt-2 line-clamp-2">
                            {v.content.substring(0, 150).replace(/\n/g, ' ')}
                        </div>
                    </div>
                ))
            )}
          </div>
          
          <div className="p-4 border-t-4 border-black bg-white flex justify-end">
             <PixelButton onClick={onClose}>{t.ui.close}</PixelButton>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};
