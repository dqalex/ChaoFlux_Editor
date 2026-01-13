import { MarkdownElement } from '../types';

export const parseMarkdown = (text: string): MarkdownElement[] => {
  const lines = text.split('\n');
  const elements: MarkdownElement[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    // Headings
    if (line.startsWith('# ')) {
      elements.push({ type: 'h1', content: line.substring(2) });
    } else if (line.startsWith('## ')) {
      elements.push({ type: 'h2', content: line.substring(3) });
    } else if (line.startsWith('### ')) {
      elements.push({ type: 'h3', content: line.substring(4) });
    } 
    // Images: ![alt](url)
    else if (line.match(/^!\[(.*?)\]\((.*?)\)$/)) {
      const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        elements.push({ type: 'img', alt: match[1], url: match[2], content: '' });
      }
    }
    // Blockquote
    else if (line.startsWith('> ')) {
        elements.push({ type: 'blockquote', content: line.substring(2) });
    }
    // Horizontal Rule
    else if (line === '---' || line === '***') {
        elements.push({ type: 'hr', content: '' });
    }
    // List Items
    else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push({ type: 'li', content: line.substring(2) });
    }
    // Paragraph
    else {
      elements.push({ type: 'p', content: line });
    }
  }

  return elements;
};

// Helper to process inline formatting (bold, italic)
export const processInlineStyles = (text: string) => {
    // Bold **text**
    let processed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Code `text`
    processed = processed.replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 rounded font-mono text-sm border border-gray-300 text-pink-600">$1</code>');
    
    return processed;
};
