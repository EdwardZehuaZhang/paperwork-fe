"use client";

import * as React from "react";
import { Upload as UploadIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  multiple?: boolean;
  onAccept?: (files: File[]) => void;
  onUpload?: (files: File[], options: { onProgress: (file: File, progress: number) => void }) => Promise<any>;
  onFileReject?: (file: File, message: string) => void;
}

const FileUploadContext = React.createContext<{
  files: File[];
  isUploading: boolean;
  disabled: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  onFileSelect: (files: File[]) => void;
  onFileRemove: (file: File) => void;
  onProgress: (file: File, progress: number) => void;
  fileProgress: Record<string, number>;
}>({
  files: [],
  isUploading: false,
  disabled: false,
  onFileSelect: () => {},
  onFileRemove: () => {},
  onProgress: () => {},
  fileProgress: {},
});

export function FileUpload({
  accept,
  maxFiles = 2,
  maxSize = 4 * 1024 * 1024,
  disabled = false,
  multiple = true,
  onAccept,
  onUpload,
  onFileReject,
  className,
  children,
  ...props
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [fileProgress, setFileProgress] = React.useState<Record<string, number>>({});

  const handleFileSelect = React.useCallback(
    (newFiles: File[]) => {
      const validFiles: File[] = [];
      let totalFiles = files.length;

      for (const file of newFiles) {
        // Check file size
        if (file.size > maxSize) {
          onFileReject?.(file, `File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
          continue;
        }

        // Check file count
        if (totalFiles >= maxFiles) {
          onFileReject?.(file, `Maximum ${maxFiles} files allowed`);
          continue;
        }

        validFiles.push(file);
        totalFiles++;
      }

      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onAccept?.(validFiles);

      // Trigger upload if onUpload is provided
      if (onUpload && validFiles.length > 0) {
        setIsUploading(true);
        onUpload(validFiles, {
          onProgress: (file, progress) => {
            setFileProgress((prev) => ({
              ...prev,
              [file.name]: progress,
            }));
          },
        }).finally(() => {
          setIsUploading(false);
        });
      }
    },
    [files, maxFiles, maxSize, onAccept, onUpload, onFileReject]
  );

  const handleFileRemove = React.useCallback((fileToRemove: File) => {
    setFiles((prev) => prev.filter((f) => f !== fileToRemove));
    setFileProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileToRemove.name];
      return newProgress;
    });
  }, []);

  const onProgress = React.useCallback((file: File, progress: number) => {
    setFileProgress((prev) => ({
      ...prev,
      [file.name]: progress,
    }));
  }, []);

  return (
    <FileUploadContext.Provider
      value={{
        files,
        isUploading,
        disabled,
        accept,
        maxFiles,
        maxSize,
        onFileSelect: handleFileSelect,
        onFileRemove: handleFileRemove,
        onProgress,
        fileProgress,
      }}
    >
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </FileUploadContext.Provider>
  );
}

export function FileUploadDropzone({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(FileUploadContext);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      context.onFileSelect(droppedFiles);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      context.onFileSelect(selectedFiles);
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border-2 border-dashed border-input px-6 py-10 text-center transition-colors",
        isDragActive && "border-primary bg-primary/5",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={true}
        accept={context.accept}
        onChange={handleInputChange}
        disabled={context.disabled || context.isUploading}
        className="hidden"
        id="file-upload-input"
      />
      {children}
    </div>
  );
}

export function FileUploadTrigger({
  asChild = false,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    document.getElementById("file-upload-input")?.click();
  };

  if (asChild) {
    return React.cloneElement(props.children as React.ReactElement, {
      onClick: handleClick,
      ...props,
    });
  }

  return <button onClick={handleClick} {...props} />;
}

export function FileUploadList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(FileUploadContext);

  if (context.files.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-2 mt-4", className)} {...props}>
      {context.files.map((file, index) => (
        <FileUploadItem key={`${file.name}-${index}`} value={file} />
      ))}
    </div>
  );
}

export function FileUploadItem({ value: file, className, children }: { value: File } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-lg border border-input p-3", className)}>
      {children}
    </div>
  );
}

export function FileUploadItemPreview({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex h-10 w-10 items-center justify-center rounded bg-accent", className)}>
      <UploadIcon className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}

export function FileUploadItemMetadata({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(FileUploadContext);
  // Note: This would need additional context to know which file
  return <div className={cn("flex-1", className)} />;
}

export function FileUploadItemDelete({
  asChild = false,
  ...props
}: { asChild?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(FileUploadContext);

  if (asChild) {
    return React.cloneElement(props.children as React.ReactElement, props);
  }

  return <button {...props} />;
}

export function FileUploadItemProgress({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-1 w-full rounded-full bg-accent overflow-hidden", className)} />;
}

export type FileUploadProps_ = FileUploadProps;
