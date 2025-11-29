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
    <div className="markdown-content">
      <style jsx global>{`
        .markdown-content {
          max-width: none;
          line-height: 1.75;
          font-size: 1.1rem;
        }

        .markdown-content h1 {
          font-size: 2.475rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1.5rem;
          color: #111827;
        }

        .markdown-content h2 {
          font-size: 2.0625rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e5e7eb;
          color: #111827;
        }

        .markdown-content h3 {
          font-size: 1.65rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }

        .markdown-content p {
          margin-bottom: 1rem;
          color: #374151;
          line-height: 1.75;
        }

        .markdown-content a {
          color: #2563eb;
          text-decoration: none;
        }

        .markdown-content a:hover {
          text-decoration: underline;
        }

        .markdown-content strong {
          font-weight: 600;
          color: #111827;
        }

        .markdown-content ul,
        .markdown-content ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .markdown-content ul {
          list-style-type: disc;
        }

        .markdown-content ol {
          list-style-type: decimal;
        }

        .markdown-content li {
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .markdown-content code {
          background-color: #f3f4f6;
          color: #db2777;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family: "Courier New", monospace;
        }

        .markdown-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .markdown-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
          border-radius: 0;
          font-size: 0.875rem;
        }

        .markdown-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          font-style: italic;
          color: #4b5563;
          margin: 1.5rem 0;
        }

        .markdown-content img {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 1.5rem 0;
        }

        .markdown-content hr {
          border: 0;
          border-top: 1px solid #e5e7eb;
          margin: 2rem 0;
        }

        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }

        .markdown-content th {
          background-color: #f3f4f6;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          border: 1px solid #e5e7eb;
        }

        .markdown-content td {
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
        }

        @media (prefers-color-scheme: dark) {
          .markdown-content h1,
          .markdown-content h2,
          .markdown-content h3,
          .markdown-content strong {
            color: #f9fafb;
          }

          .markdown-content h2 {
            border-bottom-color: #374151;
          }

          .markdown-content p,
          .markdown-content li {
            color: #d1d5db;
          }

          .markdown-content a {
            color: #60a5fa;
          }

          .markdown-content code {
            background-color: #1f2937;
            color: #f472b6;
          }

          .markdown-content blockquote {
            color: #9ca3af;
          }

          .markdown-content hr {
            border-top-color: #374151;
          }

          .markdown-content th {
            background-color: #1f2937;
            border-color: #374151;
          }

          .markdown-content td {
            border-color: #374151;
          }
        }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
