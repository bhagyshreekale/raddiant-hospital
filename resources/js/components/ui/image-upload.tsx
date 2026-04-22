import { useRef, useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
    name: string;
    label?: string;
    value?: string;
    onChange?: (url: string) => void;
    error?: string;
}

export function ImageUpload({ name, label, value, onChange, error }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>(value || '');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setPreview(value || '');
    }, [value]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        
        const formData = new FormData();
        formData.append('image', file);
        formData.append('filename', name);

        try {
            const response = await fetch('/upload/image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: formData,
            });

            const data = await response.json();
            
            if (data.url) {
                setPreview(data.url);
                onChange?.(data.url);
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview('');
        onChange?.('');
    };

    return (
        <div className="space-y-2">
            {label && <Label htmlFor={name}>{label}</Label>}
            
            {preview ? (
                <div className="relative border rounded-md overflow-hidden w-full h-40 bg-muted">
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    className={`border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                        error ? 'border-red-500' : 'border-input'
                    }`}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        name={name}
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="flex flex-col items-center justify-center h-32 p-4 text-center">
                        {uploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                        ) : (
                            <>
                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG, GIF up to 5MB
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
            
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}