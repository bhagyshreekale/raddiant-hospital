import * as React from "react";
import { cn } from "@/lib/utils";

declare global {
    interface Window {
        tinymce: {
            init: (config: Record<string, unknown>) => Promise<void>;
            remove: (selector: string) => void;
            get: (id: string) => unknown;
        };
    }
}

interface TinyMCEProps {
    value: string;
    onChange: (value: string) => void;
    height?: number;
    className?: string;
}

export function TinyMCE({ value, onChange, height = 500, className }: TinyMCEProps) {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const editorId = React.useRef(`tinymce-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`);
    const isInitialized = React.useRef(false);
    const initialValue = React.useRef(value);
    const onChangeRef = React.useRef(onChange);
    
    onChangeRef.current = onChange;

    React.useEffect(() => {
        if (window.tinymce) {
            setIsLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "/tinymce/tinymce.min.js";
        script.onload = () => {
            console.log("TinyMCE loaded");
            setIsLoaded(true);
        };
        script.onerror = () => console.error("Failed to load TinyMCE");
        document.head.appendChild(script);
    }, []);

    React.useEffect(() => {
        if (!isLoaded || !window.tinymce) return;
        if (isInitialized.current) return;
        
        isInitialized.current = true;

        window.tinymce.init({
            selector: `#${editorId.current}`,
            height: height,
            menubar: true,
            license_key: 'gPL',
            plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "help", "wordcount"
            ],
            toolbar: "undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright | bullist numlist outdent indent | image | removeformat | help",
            content_style: "body { font-family: system-ui, -apple-system, sans-serif; font-size: 14px; }",
            images_upload_handler: (blobInfo: { blob: () => File; filename: () => string }) => {
                return new Promise((resolve, reject) => {
                    const file = blobInfo.blob();
                    const formData = new FormData();
                    formData.append("image", file, blobInfo.filename());

                    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

                    fetch("/upload/image", {
                        method: "POST",
                        headers: {
                            "X-CSRF-TOKEN": csrfToken,
                        },
                        body: formData,
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.url) {
                                resolve(data.url);
                            } else {
                                reject("Upload failed");
                            }
                        })
                        .catch((error) => reject(error));
                });
            },
            setup: (editor: { on: (event: string, callback: () => void) => void; setContent: (content: string) => void; getContent: () => string }) => {
                if (initialValue.current) {
                    editor.setContent(initialValue.current);
                }
                editor.on("change keyup", () => {
                    onChangeRef.current(editor.getContent());
                });
            },
        });

        return () => {
            // Don't cleanup on unmount to preserve editor state
        };
    }, [isLoaded, height]);

    if (!isLoaded) {
        return (
            <div 
                className={cn("border border-gray-300 rounded-md flex items-center justify-center bg-gray-50", className)}
                style={{ height }}
            >
                <span className="text-gray-500">Loading editor...</span>
            </div>
        );
    }

    return (
        <div className={cn("tinymce-editor-container", className)}>
            <textarea
                id={editorId.current}
                defaultValue={initialValue.current}
            />
        </div>
    );
}