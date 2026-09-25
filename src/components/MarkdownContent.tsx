"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="markdown-content">
      <style jsx global>{`
        .markdown-content {
          color: #334155;
          font-size: 1rem;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .markdown-content > :first-child { margin-top: 0; }
        .markdown-content > :last-child { margin-bottom: 0; }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4 {
          color: #0f172a;
          font-weight: 650;
          letter-spacing: -0.025em;
          line-height: 1.25;
        }
        .markdown-content h1 { margin: 2.2rem 0 1rem; font-size: clamp(1.8rem, 4vw, 2.35rem); }
        .markdown-content h2 { margin: 2.4rem 0 1rem; padding-bottom: .75rem; border-bottom: 1px solid #e2e8f0; font-size: clamp(1.5rem, 3.2vw, 1.9rem); }
        .markdown-content h3 { margin: 1.8rem 0 .75rem; font-size: 1.3rem; }
        .markdown-content h4 { margin: 1.5rem 0 .65rem; font-size: 1.1rem; }
        .markdown-content p { margin: 1rem 0; }
        .markdown-content a { color: #087b68; text-decoration: underline; text-decoration-color: #a7ddd0; text-underline-offset: 3px; }
        .markdown-content a:hover { color: #075a50; text-decoration-color: currentColor; }
        .markdown-content a:focus-visible { border-radius: 2px; outline: 2px solid #0f766e; outline-offset: 3px; }
        .markdown-content strong { color: #0f172a; font-weight: 650; }
        .markdown-content ul,
        .markdown-content ol { margin: 1.2rem 0; padding-left: 1.5rem; }
        .markdown-content ul { list-style: disc; }
        .markdown-content ol { list-style: decimal; }
        .markdown-content li { margin: .4rem 0; padding-left: .25rem; }
        .markdown-content li::marker { color: #0f9b83; }
        .markdown-content :not(pre) > code {
          border: 1px solid #dcebe6;
          border-radius: .4rem;
          background: #eff8f5;
          color: #087b68;
          padding: .12rem .38rem;
          font-size: .88em;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .markdown-content pre {
          max-width: 100%;
          margin: 1.5rem 0;
          overflow: auto;
          border: 1px solid #26384a;
          border-radius: 1rem;
          background: #101c2a;
          padding: 1.1rem 1.25rem;
          color: #e2e8f0;
          box-shadow: 0 14px 30px -22px rgba(15, 23, 42, .65);
          scrollbar-color: #526477 #101c2a;
        }
        .markdown-content pre:focus-visible { outline: 3px solid #5eead4; outline-offset: 3px; }
        .markdown-content pre code {
          display: block;
          min-width: max-content;
          background: transparent;
          color: inherit;
          padding: 0;
          font-size: .875rem;
          line-height: 1.75;
          tab-size: 4;
        }
        .markdown-content blockquote {
          margin: 1.5rem 0;
          border-left: 3px solid #21a88d;
          border-radius: 0 .75rem .75rem 0;
          background: #f0faf7;
          padding: .75rem 1rem;
          color: #475569;
        }
        .markdown-content blockquote > :first-child { margin-top: 0; }
        .markdown-content blockquote > :last-child { margin-bottom: 0; }
        .markdown-content img { max-width: 100%; height: auto; border-radius: .9rem; }
        .markdown-content hr { margin: 2rem 0; border: 0; border-top: 1px solid #e2e8f0; }
        .markdown-content table { display: block; width: 100%; overflow-x: auto; border-collapse: collapse; margin: 1.5rem 0; }
        .markdown-content th,
        .markdown-content td { min-width: 8rem; border: 1px solid #dbe4eb; padding: .7rem .8rem; text-align: left; }
        .markdown-content th { background: #f1f6f5; color: #0f172a; font-weight: 650; }
        .markdown-content tr:nth-child(even) td { background: #f8fafc; }

        @media (max-width: 640px) {
          .markdown-content { font-size: .97rem; }
          .markdown-content pre { margin-right: -.25rem; margin-left: -.25rem; border-radius: .75rem; padding: .9rem; }
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node: _node, ...props }) => <h2 {...props} />,
          pre: ({ node: _node, ...props }) => <pre tabIndex={0} aria-label="Пример кода: используйте горизонтальную прокрутку, если код не помещается" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
