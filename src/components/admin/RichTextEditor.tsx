
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Code, 
  Quote,
  Eye,
  Edit
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const [isPreview, setIsPreview] = useState(false);

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Set cursor position after formatting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatButtons = [
    { icon: Bold, label: 'Bold', action: () => insertFormatting('**', '**') },
    { icon: Italic, label: 'Italic', action: () => insertFormatting('*', '*') },
    { icon: Underline, label: 'Underline', action: () => insertFormatting('<u>', '</u>') },
    { icon: Code, label: 'Code', action: () => insertFormatting('`', '`') },
    { icon: Quote, label: 'Quote', action: () => insertFormatting('> ') },
    { icon: List, label: 'Bullet List', action: () => insertFormatting('- ') },
    { icon: ListOrdered, label: 'Numbered List', action: () => insertFormatting('1. ') },
    { icon: Link, label: 'Link', action: () => insertFormatting('[Link Text](', ')') },
    { icon: Image, label: 'Image', action: () => insertFormatting('![Alt Text](', ')') },
  ];

  const renderPreview = (text: string) => {
    // Simple markdown-to-HTML conversion for preview
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 rounded">$1</code>')
      .replace(/^> (.+)/gm, '<blockquote class="border-l-4 border-purple-500 pl-4 italic">$1</blockquote>')
      .replace(/^- (.+)/gm, '<li>$1</li>')
      .replace(/^1\. (.+)/gm, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-400 hover:underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="max-w-full h-auto rounded" />')
      .replace(/\n/g, '<br />');
  };

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-sm">Content Editor</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant={!isPreview ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreview(false)}
              className={!isPreview ? "bg-purple-600" : "border-gray-700 text-gray-300"}
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              type="button"
              variant={isPreview ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreview(true)}
              className={isPreview ? "bg-purple-600" : "border-gray-700 text-gray-300"}
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {!isPreview && (
          <div className="flex flex-wrap gap-1 p-2 bg-gray-800/50 rounded border border-gray-700">
            {formatButtons.map((button, index) => (
              <Button
                key={index}
                type="button"
                variant="ghost"
                size="sm"
                onClick={button.action}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
                title={button.label}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
        )}

        {isPreview ? (
          <div 
            className="min-h-[200px] p-4 bg-gray-800/30 border border-gray-700 rounded text-gray-300 prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] bg-gray-800 border-gray-700 text-white font-mono text-sm"
            rows={12}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RichTextEditor;
