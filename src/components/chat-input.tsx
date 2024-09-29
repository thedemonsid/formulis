"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PaperclipIcon, SendIcon } from "lucide-react";
interface ChatInputComponentProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}
export const ChatInputComponent: React.FC<ChatInputComponentProps> = ({
  input,
  onInputChange,
  onSubmit,
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg shadow-md">
      <form>
        <div className="relative">
          <Textarea
            value={input}
            onChange={onInputChange}
            placeholder="Type your message here..."
            className="min-h-[100px] pr-24 resize-none"
          />
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <PaperclipIcon className="h-4 w-4" />
              <span className="sr-only">Attach files</span>
            </Button>
            <Button type="submit" size="icon" onClick={onSubmit}>
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
        {files && files.length > 0 && (
          <div className="mt-2 text-sm text-muted-foreground">
            {Array.from(files).map((file, index) => (
              <div key={index}>{file.name}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
