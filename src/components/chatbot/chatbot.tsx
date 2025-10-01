'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, User, CornerDownLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatbotStore } from '@/hooks/use-chatbot-store';
import { getChatbotResponse } from '@/app/actions';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';
import MarkdownRenderer from '@/components/markdown-renderer';

type Message = {
  role: 'user' | 'model';
  content: { text: string }[];
};

export default function Chatbot() {
  const { isOpen, closeChatbot } = useChatbotStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startTransition(async () => {
        try {
            const initialResponse = await getChatbotResponse({ message: 'Hello' });
            if (initialResponse && initialResponse.response) {
              setMessages([
              {
                  role: 'model',
                  content: [{ text: initialResponse.response }],
              },
              ]);
            } else {
               throw new Error("Received an empty initial response.");
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Chatbot Error',
                description: 'Could not initialize the chatbot. Please try again.'
            });
            console.error('Chatbot initialization failed:', error);
        }
      });
    }
  }, [isOpen, messages.length, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      role: 'user',
      content: [{ text: input }],
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
        try {
            const history = [...messages, userMessage];
            const res = await getChatbotResponse({
                message: input,
                history: history,
            });

            if (res && res.response) {
              const modelMessage: Message = {
                  role: 'model',
                  content: [{ text: res.response }],
              };
              setMessages((prev) => [...prev, modelMessage]);
            } else {
              throw new Error("Received an empty response from the server.");
            }
        } catch (error) {
             const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
             toast({
                variant: 'destructive',
                title: 'Chatbot Error',
                description: `Could not get a response. Details: ${errorMessage}`
            });
            console.error('Chatbot response failed:', error);
             const errorResponseMessage: Message = {
                role: 'model',
                content: [{ text: "Sorry, I'm having trouble connecting. Please check your setup and try again." }],
            };
            setMessages((prev) => [...prev, errorResponseMessage]);
        }
    });
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 w-full max-w-sm rounded-lg border bg-card shadow-xl transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'
      )}
    >
      <div className="flex flex-col h-[60vh]">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Bot className="w-7 h-7 text-primary" />
            <h3 className="text-lg font-semibold">AyuLink Assistant</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={closeChatbot}>
            <span className="text-2xl">&times;</span>
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3',
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role === 'model' && (
                <Avatar className="w-8 h-8 border-2 border-primary">
                    <AvatarFallback>
                        <Bot className="w-5 h-5" />
                    </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg p-3 text-sm',
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <MarkdownRenderer content={msg.content.map((c) => c.text).join('')} />
              </div>
               {msg.role === 'user' && (
                <Avatar className="w-8 h-8 border">
                    <AvatarFallback>
                        <User className="w-5 h-5" />
                    </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && messages.length > 0 && messages[messages.length-1].role === 'user' && (
             <div className="flex items-start gap-3 justify-start">
                <Avatar className="w-8 h-8 border-2 border-primary">
                    <AvatarFallback>
                        <Bot className="w-5 h-5" />
                    </AvatarFallback>
                </Avatar>
                 <div className="max-w-xs rounded-lg p-3 text-sm bg-muted">
                    <Loader2 className="w-5 h-5 animate-spin" />
                 </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="pr-12"
              disabled={isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={handleSend}
              disabled={isPending || !input.trim()}
            >
              <CornerDownLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
