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

  // --- CUSTOM RENDERERS ---

  // Custom Pre to detect code blocks
  const PreBlock = ({ children, ...rest }: any) => {
    const childrenWithProp = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            // @ts-ignore
            return React.cloneElement(child, { isBlock: true });
        }
        return child;
    });

    return (
        <section style={{
            margin: '1.5em 0',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.05)',
            backgroundColor: '#f6f8fa'
        }}>
            <pre style={{ 
                padding: '16px', 
                overflowX: 'auto', 
                fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#24292e',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                backgroundColor: 'transparent'
            }} {...rest}>
                {childrenWithProp}
            </pre>
        </section>
    );
  };

  const CodeBlock = ({ node, inline, className, children, isBlock, ...props }: any) => {
    if (isBlock) {
        return (
            <code style={{ 
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                color: 'inherit',
                whiteSpace: 'inherit',
                display: 'block'
            }} {...props}>
                {children}
            </code>
        );
    }

    // Inline Code Style
    return (
        <code style={{ 
            backgroundColor: 'rgba(27,31,35,0.05)', 
            padding: '2px 6px', 
            borderRadius: '4px', 
            fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
            fontSize: '0.9em',
            color: '#d63384',
            margin: '0 2px'
        }} {...props}>
            {children}
        </code>
    );
  };

  return (
    // DIRECT RENDER WITHOUT OUTER BACKGROUND LAYER
    // Removed the outer section that had backgroundColor: '#f9f8f4' and the footer
    <section 
        id="wechat-preview-content" 
        style={{
            maxWidth: '100%', 
            margin: '0 auto', 
            boxSizing: 'border-box',
            minHeight: '100%',
            ...styles.container 
        }}
        data-tool="ChaoFlux"
    >
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({node, ...props}) => <section style={{textAlign: 'center', marginBottom: '1.5em'}}><h1 style={styles.h1} {...props} /></section>,
                h2: ({node, ...props}) => <section style={{marginBottom: '1.2em', marginTop: '2em'}}><h2 style={styles.h2} {...props} /></section>,
                h3: ({node, ...props}) => <h3 style={styles.h3} {...props} />,
                h4: ({node, ...props}) => <h4 style={{ ...styles.h3, fontSize: '1.1em', marginTop: '16px', marginBottom: '12px', borderLeft: 'none', borderBottom: '1px dashed #ccc', paddingBottom: '4px' }} {...props} />,
                h5: ({node, ...props}) => <h5 style={{ ...styles.h3, fontSize: '1em', marginTop: '14px', marginBottom: '10px' }} {...props} />,
                h6: ({node, ...props}) => <h6 style={{ ...styles.h3, fontSize: '0.9em', marginTop: '12px', marginBottom: '8px', color: '#666' }} {...props} />,
                p: ({node, ...props}) => <p style={styles.p} {...props} />,
                // Explicit list styling to prevent style loss
                ul: ({node, ...props}) => <ul style={{ listStyleType: 'disc', paddingLeft: '2em', margin: '1em 0', color: styles.container.color }} {...props} />,
                ol: ({node, ...props}) => <ol style={{ listStyleType: 'decimal', paddingLeft: '2em', margin: '1em 0', color: styles.container.color }} {...props} />,
                li: ({node, ...props}) => <li style={styles.li} {...props} />,
                blockquote: ({node, ...props}) => <blockquote style={styles.blockquote} {...props} />,
                img: ({node, ...props}) => (
                    <section style={{margin: '1.5em 0', textAlign: 'center'}}>
                        <img 
                            className="rich_pages wxw-img" 
                            style={{
                                ...styles.img, 
                                visibility: 'visible', 
                                height: 'auto', 
                                display: 'inline-block', 
                                verticalAlign: 'middle'
                            }} 
                            {...props} 
                        />
                    </section>
                ),
                hr: ({node, ...props}) => <hr style={styles.hr} {...props} />,
                a: ({node, ...props}) => <a style={{ color: '#576b95', textDecoration: 'none', borderBottom: '1px dashed #576b95' }} {...props} />,
                table: ({node, ...props}) => <section style={{overflowX: 'auto', marginBottom: '16px'}}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', border: '1px solid #eee' }} {...props} /></section>,
                thead: ({node, ...props}) => <thead style={{ backgroundColor: '#f8f8f8' }} {...props} />,
                tbody: ({node, ...props}) => <tbody {...props} />,
                tr: ({node, ...props}) => <tr style={{ borderBottom: '1px solid #eee' }} {...props} />,
                th: ({node, ...props}) => <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', border: '1px solid #eee', color: '#555' }} {...props} />,
                td: ({node, ...props}) => <td style={{ padding: '12px', border: '1px solid #eee', color: '#666' }} {...props} />,
                pre: PreBlock,
                code: CodeBlock
            }}
        >
            {markdown}
        </ReactMarkdown>
    </section>
  );
};

export default ArticlePreview;