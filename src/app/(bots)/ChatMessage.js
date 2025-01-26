import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import React from 'react';

const processedMath = (text) => {
    
    // Replace \(...\) with $...$
    text = text.replace(/\\\((.*?)\\\)/g, '$$$1$$');
    // Replace \[...\] with $$...$$
    text = text.replace(/\\\[(.*?)\\\]/gs, '$$$$$1$$$$');
    
    return text;
}

export function ChatMessage ({ message }){

    const processedMessage = processedMath(message)

    try{
        return (
            <ReactMarkdown
                remarkPlugins={[remarkMath]} //math support
                rehypePlugins={[rehypeKatex]} //render math with KaTeX
                components={{
                    // Detect and render code blocks
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                    // Add custom styling for other Markdown elements
                    h1: ({ node, ...props }) => <h1 style={{ fontSize: '2em' }} {...props} />,
                    h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.5em' }} {...props} />,
                    ul: ({ node, ...props }) => <ul style={{ paddingLeft: '20px' }} {...props} />,
                    ol: ({ node, ...props }) => <ol style={{ paddingLeft: '20px' }} {...props} />,
                    blockquote: ({ node, ...props }) => (
                        <blockquote style={{ borderLeft: '4px solid #ccc', paddingLeft: '10px' }} {...props} />
                    ),
                }}
            >
                {processedMessage}
            </ReactMarkdown>
        );
    } catch(error){
        return <div>{message}</div>
    }
    
};