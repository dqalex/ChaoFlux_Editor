import React, { useState } from 'react';
import { PixelCard, PixelButton, PixelTextArea, PixelInput } from './PixelComponents';
import { GeneratorMode } from '../types';

interface AIGeneratorModalProps {
  mode: GeneratorMode;
  onClose: () => void;
  onConfirm: (result: string) => void;
  currentContext: string;
}

// Importing services strictly at top level is not possible if we want to pass them as props or keep this component pure, 
// but based on instructions, we should import services.
import { generateArticleText, generatePixelImage } from '../services/geminiService';

const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({ mode, onClose, onConfirm, currentContext }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      let result = '';
      if (mode === GeneratorMode.TEXT) {
        result = await generateArticleText(prompt, currentContext);
      } else if (mode === GeneratorMode.IMAGE) {
        const imageUrl = await generatePixelImage(prompt);
        // Format as markdown image
        result = `\n![${prompt}](${imageUrl})\n`;
      }
      onConfirm(result);
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong with the AI magic.");
    } finally {
      setIsLoading(false);
    }
  };

  const title = mode === GeneratorMode.TEXT ? "AI WRITER ASSISTANT" : "AI IMAGE PAINTER";
  const placeholder = mode === GeneratorMode.TEXT 
    ? "E.g., Write an intro paragraph about retro gaming consoles..." 
    : "E.g., A cyberpunk cat eating noodles, pixel art style...";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg">
        <PixelCard title={title}>
          <div className="flex flex-col gap-4">
            <p className="font-pixel text-sm text-gray-600 mb-2">
              POWERED BY GEMINI 
              {mode === GeneratorMode.IMAGE ? " 2.5 FLASH IMAGE" : " 3 FLASH"}
            </p>
            
            {mode === GeneratorMode.TEXT ? (
                <PixelTextArea 
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={placeholder}
                    autoFocus
                />
            ) : (
                <PixelInput 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={placeholder}
                    autoFocus
                />
            )}

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 font-pixel text-sm">
                ERROR: {error}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-2">
              <PixelButton onClick={onClose} disabled={isLoading}>
                CANCEL
              </PixelButton>
              <PixelButton variant="primary" onClick={handleGenerate} loading={isLoading}>
                {isLoading ? "GENERATING..." : "GENERATE"}
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};

export default AIGeneratorModal;
