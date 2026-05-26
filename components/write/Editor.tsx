"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { VideoNode } from "./VideoExtension";
import Toolbar from "./Toolbar";
import { useState, useCallback } from "react";
import { Copy, Check, Download } from "lucide-react";

const BASE_PATH = "/my-portfolio";

export default function Editor() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: false, allowBase64: false }),
      Youtube.configure({ width: 640, height: 360 }),
      Placeholder.configure({ placeholder: "회고 내용을 작성하세요..." }),
      VideoNode,
    ],
    editorProps: {
      attributes: {
        class: "outline-none min-h-[400px]",
      },
    },
    immediatelyRender: false,
  });

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_PATH}/api/upload`, { method: "POST", body: formData });
    if (!res.ok) {
      alert("업로드 실패");
      return null;
    }
    const data = await res.json();
    return data.url as string;
  }, []);

  const handleImageUpload = useCallback(async (file: File) => {
    const url = await uploadFile(file);
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor, uploadFile]);

  const handleVideoUpload = useCallback(async (file: File) => {
    const url = await uploadFile(file);
    if (url && editor) {
      (editor.chain().focus() as any).setVideo({ src: url }).run();
    }
  }, [editor, uploadFile]);

  const generateSlug = () => {
    const today = new Date().toISOString().slice(0, 10);
    const titleSlug = title
      .replace(/[^a-zA-Z0-9가-힣\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 30) || "untitled";
    return `${today}-${titleSlug}`;
  };

  const generateJson = () => {
    const slug = generateSlug();
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const today = new Date().toISOString().slice(0, 10);

    return {
      slug,
      title: title || "제목 없음",
      date: today,
      tags: tagList,
      content: editor?.getJSON() ?? {},
    };
  };

  const handleCopy = async () => {
    const json = JSON.stringify(generateJson(), null, 2);
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const data = generateJson();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!editor) return null;

  const exportedJson = showExport ? JSON.stringify(generateJson(), null, 2) : "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Toolbar
        editor={editor}
        onImageUpload={handleImageUpload}
        onVideoUpload={handleVideoUpload}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        {/* 메타 정보 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full text-2xl font-bold text-gray-900 outline-none placeholder:text-gray-300"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="태그 (쉼표로 구분, 예: 회고, React, 프로젝트)"
            className="w-full text-sm text-gray-500 outline-none placeholder:text-gray-300 border-t border-gray-100 pt-3"
          />
        </div>

        {/* 에디터 본문 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
          <style>{editorStyles}</style>
          <EditorContent editor={editor} />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowExport((v) => !v)}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            JSON 미리보기
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700"
          >
            <Download size={15} />
            JSON 다운로드
          </button>
        </div>

        {/* JSON 미리보기 */}
        {showExport && (
          <div className="relative bg-gray-900 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
              <span className="text-xs text-gray-400 font-mono">
                📁 content/retrospective/{generateSlug()}.json
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                {copied ? "복사됨" : "복사"}
              </button>
            </div>
            <pre className="p-4 text-xs text-green-300 font-mono overflow-x-auto max-h-96 overflow-y-auto leading-relaxed">
              {exportedJson}
            </pre>
            <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                위 내용을 복사하거나 다운로드해서{" "}
                <code className="text-yellow-300">content/retrospective/</code> 폴더에 저장하세요.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const editorStyles = `
  .ProseMirror { outline: none; min-height: 400px; }
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left; color: #9ca3af; pointer-events: none; height: 0;
  }
  .ProseMirror h1 { font-size: 1.75rem; font-weight: 700; margin: 1.5rem 0 0.75rem; color: #111827; }
  .ProseMirror h2 { font-size: 1.375rem; font-weight: 700; margin: 1.25rem 0 0.5rem; color: #111827; }
  .ProseMirror h3 { font-size: 1.125rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #1f2937; }
  .ProseMirror p { margin-bottom: 0.75rem; line-height: 1.75; color: #374151; }
  .ProseMirror ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.75rem; }
  .ProseMirror ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 0.75rem; }
  .ProseMirror li { margin-bottom: 0.25rem; line-height: 1.75; color: #374151; }
  .ProseMirror strong { font-weight: 700; }
  .ProseMirror em { font-style: italic; }
  .ProseMirror u { text-decoration: underline; text-underline-offset: 2px; }
  .ProseMirror s { text-decoration: line-through; }
  .ProseMirror blockquote {
    border-left: 3px solid #e5e7eb; padding-left: 1rem;
    margin: 1rem 0; color: #6b7280; font-style: italic;
  }
  .ProseMirror code {
    background: #f3f4f6; padding: 0.125rem 0.375rem;
    border-radius: 0.25rem; font-size: 0.875em;
    font-family: ui-monospace, monospace; color: #ef4444;
  }
  .ProseMirror pre {
    background: #1f2937; color: #f9fafb;
    padding: 1rem; border-radius: 0.5rem;
    overflow-x: auto; margin: 1rem 0;
  }
  .ProseMirror pre code { background: none; color: inherit; padding: 0; font-size: 0.875rem; }
  .ProseMirror a { color: #3b82f6; text-decoration: underline; text-underline-offset: 2px; }
  .ProseMirror mark { border-radius: 0.2em; padding: 0.05em 0.2em; }
  .ProseMirror hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.5rem 0; }
  .ProseMirror img { max-width: 100%; border-radius: 8px; margin: 8px 0; }
  .ProseMirror .youtube-wrapper { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 1rem 0; border-radius: 8px; }
  .ProseMirror .youtube-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px; }
`;
