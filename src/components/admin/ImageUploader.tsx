"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = "رفع صورة",
  hint = "PNG, JPG, WebP بحجم أقصى 5 ميجابايت",
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("حجم الملف يجب ألا يتجاوز 5 ميجابايت");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-media")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) {
        throw new Error(uploadError.message || "فشل رفع الصورة إلى Supabase Storage");
      }

      const { data: publicUrlData } = supabase.storage
        .from("portfolio-media")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;
      onChange(publicUrl);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء رفع الصورة");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-900 p-2 overflow-hidden group">
          <div className="flex items-center gap-4">
            {/* Image Preview */}
            <div className="w-16 h-16 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center overflow-hidden shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-neutral-300 truncate">{value}</p>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> تم حفظ الرابط بنجاح
              </p>
            </div>

            <button
              type="button"
              onClick={() => onChange("")}
              className="p-2 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 hover:bg-red-900 transition-colors"
              title="إزالة الصورة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="relative border-2 border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-900/50 hover:bg-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-neutral-400">
              <Loader2 className="w-6 h-6 animate-spin text-white" />
              <span className="text-xs font-medium">جاري رفع الصورة إلى Supabase...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-neutral-400">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white">اضغط هنا لرفع صورة جديدة</span>
              <span className="text-[11px] text-neutral-500 font-mono">{hint}</span>
            </div>
          )}
        </label>
      )}

      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1.5 mt-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
      {success && (
        <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-1">
          <CheckCircle className="w-3.5 h-3.5" /> تم رفع الصورة بنجاح!
        </p>
      )}
    </div>
  );
};
