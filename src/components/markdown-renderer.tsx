
import React from "react";

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content || typeof content !== 'string') {
    return null;
  }

  const renderTextWithMarkdown = (text: string) => {
    // Regex to find **bold** text
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldRegex);

    return parts.map((part, index) => {
      // Every second part is the captured group (the bolded text)
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      }
      return part;
    });
  };

  const lines = content.split("\n");

  const renderLine = (line: string, index: number) => {
    if (line.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
          {renderTextWithMarkdown(line.substring(4))}
        </h3>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl font-semibold mt-6 mb-3 border-b pb-2">
          {renderTextWithMarkdown(line.substring(3))}
        </h2>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <h1 key={index} className="text-3xl font-bold mt-8 mb-4 border-b pb-2">
          {renderTextWithMarkdown(line.substring(2))}
        </h1>
      );
    }
    if (line.startsWith("- ")) {
       // This logic groups list items. Find the start of a list.
      if (index > 0 && lines[index - 1].startsWith('- ')) {
        return null; // Already processed
      }

      const listItems = [];
      let i = index;
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(
          <li key={i} className="mb-1">
            {renderTextWithMarkdown(lines[i].substring(2))}
          </li>
        );
        i++;
      }
      return <ul key={index} className="list-disc list-inside space-y-1 my-4 pl-4">{listItems}</ul>;
    }
    if (line.trim() === "") {
      return <br key={index} />; // Preserve empty lines
    }

    return (
      <p key={index} className="leading-relaxed my-2">
        {renderTextWithMarkdown(line)}
      </p>
    );
  };

  return <div className="prose dark:prose-invert max-w-none">{lines.map(renderLine).filter(Boolean)}</div>;
};

export default MarkdownRenderer;
