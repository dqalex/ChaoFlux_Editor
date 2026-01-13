import { GoogleGenAI } from "@google/genai";
import { ThemeStyle, AIConfig } from "../types";

// Default Environment Key
const DEFAULT_API_KEY = process.env.API_KEY || '';

// --- GOOGLE CLIENT ---
const createGoogleClient = (apiKey: string) => {
  return new GoogleGenAI({ apiKey });
};

// --- GENERIC HANDLERS ---

export const getChatResponse = async (message: string, config?: AIConfig): Promise<string> => {
  const provider = config?.provider || 'google';
  const apiKey = config?.apiKey || DEFAULT_API_KEY;

  if (!apiKey && provider !== 'google') throw new Error("API Key is missing for custom provider.");
  if (!apiKey && provider === 'google' && !DEFAULT_API_KEY) throw new Error("API Key is missing.");

  // 1. Google Gemini Logic
  if (provider === 'google') {
    try {
      const ai = createGoogleClient(apiKey);
      // Using gemini-3-flash-preview for basic text tasks per guidelines
      const modelName = config?.model || 'gemini-3-flash-preview'; 
      
      const chatSession = ai.chats.create({
        model: modelName,
        config: {
          systemInstruction: "You are a creative and helpful assistant for writing WeChat Official Account articles. Help the user write, edit, and polish their content. Provide output in Markdown format when appropriate. Keep the tone professional yet engaging.",
        }
      });
      
      const response = await chatSession.sendMessage({ message });
      return response.text || "";
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      throw error;
    }
  } 
  
  // 2. OpenAI Compatible Logic (DeepSeek, etc.)
  else if (provider === 'openai') {
    try {
      const baseUrl = config?.baseUrl || 'https://api.openai.com/v1';
      // Remove trailing slash if present
      const cleanBaseUrl = baseUrl.replace(/\/$/, '');
      const model = config?.model || 'gpt-3.5-turbo';
      
      const response = await fetch(`${cleanBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: "You are a creative and helpful assistant for WeChat articles. Return Markdown." },
            { role: "user", content: message }
          ]
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `OpenAI API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    } catch (error) {
      console.error("OpenAI/Custom Chat Error:", error);
      throw error;
    }
  }

  throw new Error("Unknown Provider");
};

export const generateArticleText = async (prompt: string, context: string, config?: AIConfig): Promise<string> => {
  const fullPrompt = context 
    ? `Existing content:\n"""\n${context.substring(0, 5000)}\n"""\n\nTask: ${prompt}`
    : prompt;
    
  return getChatResponse(fullPrompt, config);
};

export const generatePixelImage = async (prompt: string, config?: AIConfig): Promise<string> => {
  const provider = config?.provider || 'google';
  const apiKey = config?.apiKey || DEFAULT_API_KEY;

  if (!apiKey && provider !== 'google') throw new Error("API Key is missing for image generation.");
  if (!apiKey && provider === 'google' && !DEFAULT_API_KEY) throw new Error("API Key is missing.");

  // 1. Google Gemini Logic
  if (provider === 'google') {
    try {
      const ai = createGoogleClient(apiKey);
      // Using gemini-2.5-flash-image for general image generation per guidelines
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Generate an image based on this prompt: ${prompt}. The style should be suitable for a blog post header or illustration. Pixel art style preferred if not specified.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9", 
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64String = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64String}`;
        }
      }
      
      throw new Error("No image data returned from API");
    } catch (error) {
      console.error("Gemini Image generation error:", error);
      throw error;
    }
  }
  
  // 2. OpenAI Compatible Logic (DALL-E)
  else if (provider === 'openai') {
    try {
      const baseUrl = config?.baseUrl || 'https://api.openai.com/v1';
      const cleanBaseUrl = baseUrl.replace(/\/$/, '');
      const model = config?.model || 'dall-e-3';

      const response = await fetch(`${cleanBaseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            prompt: prompt + " pixel art style",
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `OpenAI Image Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle b64_json
      if (data.data?.[0]?.b64_json) {
          return `data:image/png;base64,${data.data[0].b64_json}`;
      }
      // Handle URL (fallback)
      if (data.data?.[0]?.url) {
          // Warning: URLs might expire, but for immediate display it's okay. 
          // Ideally, we'd fetch and convert to base64 here if we want persistence, 
          // but due to CORS, that often fails on client-side.
          return data.data[0].url;
      }

      throw new Error("No image data in response");

    } catch (error) {
       console.error("OpenAI/Custom Image generation error:", error);
       throw error;
    }
  }

  throw new Error("Unknown Image Provider");
};

export const generateThemeConfig = async (description: string, config?: AIConfig): Promise<ThemeStyle> => {
  // Uses Chat logic to generate JSON
  const prompt = `
    Generate a JSON object representing a CSS style theme for a WeChat article based on this description: "${description}".
    The JSON must match the following TypeScript interface exactly. Return ONLY valid JSON, no markdown formatting.
    All CSS values must be strings (camelCase for properties).
    
    Interface:
    {
      container: React.CSSProperties; // Main wrapper
      h1: React.CSSProperties; // Title
      h2: React.CSSProperties; // Section header
      h3: React.CSSProperties; // Subheader
      p: React.CSSProperties; // Paragraph
      li: React.CSSProperties; // List item
      blockquote: React.CSSProperties; // Quote block
      img: React.CSSProperties; // Image style
      hr: React.CSSProperties; // Divider
    }
    
    Ensure colors, borders, and fonts match the "${description}" vibe.
  `;

  try {
    const jsonText = await getChatResponse(prompt, config);
    // Sanitize in case model adds ```json ... ```
    const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson) as ThemeStyle;
  } catch (error) {
    console.error("Theme generation error:", error);
    throw error;
  }
};