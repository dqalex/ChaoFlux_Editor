import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ThemeStyle } from '../types';

interface ArticlePreviewProps {
  markdown: string;
  themeStyle: ThemeStyle | undefined;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ markdown, themeStyle }) => {
  // Fallback to a safe empty object or basic style if themeStyle is undefined
  const styles = themeStyle || {
    container: { padding: '20px' } as React.CSSProperties,
    h1: { fontSize: '24px', fontWeight: 'bold' }, 
    h2: { fontSize: '20px', fontWeight: 'bold' }, 
    h3: { fontSize: '18px', fontWeight: 'bold' }, 
    p: { marginBottom: '16px', lineHeight: '1.6' }, 
    li: { marginBottom: '8px' }, 
    blockquote: { borderLeft: '4px solid #ccc', paddingLeft: '10px', color: '#666' }, 
    img: { maxWidth: '100%' }, 
    hr: { margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }
  } as ThemeStyle;

  if (!themeStyle && !markdown) {
      return (
        <div className="min-h-full flex items-center justify-center text-red-500 font-bold p-4 text-center">
            Theme Error: No theme selected or theme is missing.
        </div>
      );
  }

  return (
    // ID used for selection copying
    <div id="wechat-preview-content" style={styles.container}>
      {/* Wrapper to ensure styles copy correctly */}
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({node, ...props}) => <h1 style={styles.h1} {...props} />,
                h2: ({node, ...props}) => <h2 style={styles.h2} {...props} />,
                h3: ({node, ...props}) => <h3 style={styles.h3} {...props} />,
                h4: ({node, ...props}) => <h4 style={{ ...styles.h3, fontSize: '1.1em', marginTop: '16px', marginBottom: '12px' }} {...props} />,
                h5: ({node, ...props}) => <h5 style={{ ...styles.h3, fontSize: '1em', marginTop: '14px', marginBottom: '10px' }} {...props} />,
                h6: ({node, ...props}) => <h6 style={{ ...styles.h3, fontSize: '0.9em', marginTop: '12px', marginBottom: '8px', color: '#666' }} {...props} />,
                p: ({node, ...props}) => <p style={styles.p} {...props} />,
                ul: ({node, ...props}) => <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '16px' }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ listStyleType: 'decimal', paddingLeft: '20px', marginBottom: '16px' }} {...props} />,
                li: ({node, ...props}) => <li style={styles.li} {...props} />,
                blockquote: ({node, ...props}) => <blockquote style={styles.blockquote} {...props} />,
                img: ({node, ...props}) => <img style={styles.img} {...props} />,
                hr: ({node, ...props}) => <hr style={styles.hr} {...props} />,
                a: ({node, ...props}) => <a style={{ color: '#576b95', textDecoration: 'none', borderBottom: '1px dashed #576b95' }} {...props} />,
                strong: ({node, ...props}) => <strong style={{ fontWeight: 'bold' }} {...props} />,
                em: ({node, ...props}) => <em style={{ fontStyle: 'italic' }} {...props} />,
                del: ({node, ...props}) => <del style={{ textDecoration: 'line-through', color: '#888' }} {...props} />,
                table: ({node, ...props}) => <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', fontSize: '0.95em' }} {...props} />,
                thead: ({node, ...props}) => <thead style={{ backgroundColor: '#f8f8f8' }} {...props} />,
                tbody: ({node, ...props}) => <tbody {...props} />,
                tr: ({node, ...props}) => <tr style={{ borderBottom: '1px solid #f0f0f0' }} {...props} />,
                th: ({node, ...props}) => <th style={{ padding: '8px 10px', textAlign: 'left', border: '1px solid #ddd', fontWeight: 'bold' }} {...props} />,
                td: ({node, ...props}) => <td style={{ padding: '8px 10px', border: '1px solid #ddd' }} {...props} />,
                pre: ({node, ...props}) => (
                    <pre style={{ 
                        backgroundColor: '#f6f8fa', 
                        padding: '16px', 
                        borderRadius: '4px', 
                        overflowX: 'auto', 
                        marginBottom: '16px',
                        fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
                        fontSize: '14px',
                        lineHeight: '1.45'
                    }} {...props} />
                ),
                code: ({node, inline, className, children, ...props}: any) => {
                    if (inline) {
                        return (
                            <code style={{ 
                                backgroundColor: 'rgba(27,31,35,0.05)', 
                                padding: '0.2em 0.4em', 
                                borderRadius: '3px', 
                                fontFamily: 'monospace',
                                fontSize: '0.9em',
                                color: '#d63384'
                            }} {...props}>
                                {children}
                            </code>
                        );
                    }
                    return (
                        <code style={{ 
                            backgroundColor: 'transparent',
                            fontFamily: 'inherit',
                            fontSize: 'inherit',
                            color: 'inherit'
                        }} {...props}>
                            {children}
                        </code>
                    );
                }
            }}
        >
            {markdown}
        </ReactMarkdown>
      </div>
      
      {/* Signature/Footer for the article */}
      <section style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', opacity: 0.6 }}>
        <p>Created with ChaoFlux Editor</p>
      </section>
    </div>
  );
};

export default ArticlePreview;