"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold, Italic, Underline, Strikethrough, Code, Code2,
  Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Minus, Undo2, Redo2, Link2, Image, Video, TvMinimalPlay,
  Highlighter, Type, AlignLeft,
} from "lucide-react";
import { useRef, useState } from "react";

interface ToolbarProps {
  editor: Editor;
  onImageUpload: (file: File) => Promise<void>;
  onVideoUpload: (file: File) => Promise<void>;
}

export default function Toolbar({ editor, onImageUpload, onVideoUpload }: ToolbarProps) {
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showImageUrl, setShowImageUrl] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const btn = (active: boolean) =>
    `p-1.5 rounded transition-colors ${
      active
        ? "bg-gray-900 text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const divider = <div className="w-px h-5 bg-gray-200 mx-1 self-center" />;

  const insertLink = () => {
    if (!linkUrl) return;
    editor.chain().focus().setLink({ href: linkUrl }).run();
    setLinkUrl("");
    setShowLinkInput(false);
  };

  const insertYoutube = () => {
    if (!youtubeUrl) return;
    editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
    setYoutubeUrl("");
    setShowYoutubeInput(false);
  };

  const insertImageUrl = () => {
    if (!imageUrl) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setImageUrl("");
    setShowImageUrl(false);
  };

  return (
    <div className="sticky top-14 z-40 bg-white border-b border-gray-200 shadow-sm">
      {/* Row 1 */}
      <div className="flex flex-wrap items-center gap-0.5 px-4 py-2 border-b border-gray-100">
        {/* 단락 스타일 */}
        <button className={btn(editor.isActive("heading", { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="제목 1">
          <Heading1 size={16} />
        </button>
        <button className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="제목 2">
          <Heading2 size={16} />
        </button>
        <button className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="제목 3">
          <Heading3 size={16} />
        </button>
        <button className={btn(!editor.isActive("heading"))} onClick={() => editor.chain().focus().setParagraph().run()} title="본문">
          <AlignLeft size={16} />
        </button>

        {divider}

        {/* 텍스트 서식 */}
        <button className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} title="굵게 (⌘B)">
          <Bold size={16} />
        </button>
        <button className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} title="기울임 (⌘I)">
          <Italic size={16} />
        </button>
        <button className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()} title="밑줄 (⌘U)">
          <Underline size={16} />
        </button>
        <button className={btn(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()} title="취소선">
          <Strikethrough size={16} />
        </button>
        <button className={btn(editor.isActive("code"))} onClick={() => editor.chain().focus().toggleCode().run()} title="인라인 코드">
          <Code size={16} />
        </button>

        {divider}

        {/* 색상 */}
        <label className="relative p-1.5 rounded hover:bg-gray-100 cursor-pointer" title="글자 색상">
          <Type size={16} className="text-gray-600" />
          <input
            type="color"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </label>
        <label className="relative p-1.5 rounded hover:bg-gray-100 cursor-pointer" title="형광펜">
          <Highlighter size={16} className="text-gray-600" />
          <input
            type="color"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
          />
        </label>

        {divider}

        {/* 실행취소/다시실행 */}
        <button className={btn(false)} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="실행 취소 (⌘Z)">
          <Undo2 size={16} />
        </button>
        <button className={btn(false)} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="다시 실행 (⌘⇧Z)">
          <Redo2 size={16} />
        </button>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap items-center gap-0.5 px-4 py-2">
        {/* 목록 */}
        <button className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="글머리 목록">
          <List size={16} />
        </button>
        <button className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="번호 목록">
          <ListOrdered size={16} />
        </button>
        <button className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="인용문">
          <Quote size={16} />
        </button>
        <button className={btn(editor.isActive("codeBlock"))} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="코드 블록">
          <Code2 size={16} />
        </button>
        <button className={btn(false)} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="구분선">
          <Minus size={16} />
        </button>

        {divider}

        {/* 링크 */}
        <button
          className={btn(editor.isActive("link"))}
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              setShowLinkInput((v) => !v);
              setShowYoutubeInput(false);
              setShowImageUrl(false);
            }
          }}
          title="링크 삽입"
        >
          <Link2 size={16} />
        </button>

        {divider}

        {/* 이미지 */}
        <button className={btn(false)} onClick={() => { setShowImageUrl((v) => !v); setShowLinkInput(false); setShowYoutubeInput(false); }} title="이미지 URL">
          <Image size={16} />
        </button>
        <button
          className="p-1.5 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          onClick={() => imageRef.current?.click()}
          title="이미지 파일 업로드"
        >
          업로드
        </button>
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) await onImageUpload(file);
            e.target.value = "";
          }}
        />

        {divider}

        {/* 영상 */}
        <button className={btn(false)} onClick={() => { setShowYoutubeInput((v) => !v); setShowLinkInput(false); setShowImageUrl(false); }} title="YouTube 삽입">
          <TvMinimalPlay size={16} />
        </button>
        <button
          className="p-1.5 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          onClick={() => videoRef.current?.click()}
          title="동영상 파일 업로드"
        >
          <Video size={16} />
        </button>
        <input
          ref={videoRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) await onVideoUpload(file);
            e.target.value = "";
          }}
        />
      </div>

      {/* 인라인 입력창들 */}
      {showLinkInput && (
        <div className="flex gap-2 px-4 py-2 bg-gray-50 border-t border-gray-100">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertLink()}
            placeholder="https://..."
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
            autoFocus
          />
          <button onClick={insertLink} className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-700">삽입</button>
          <button onClick={() => setShowLinkInput(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900">취소</button>
        </div>
      )}
      {showYoutubeInput && (
        <div className="flex gap-2 px-4 py-2 bg-gray-50 border-t border-gray-100">
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertYoutube()}
            placeholder="YouTube URL (https://www.youtube.com/watch?v=...)"
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
            autoFocus
          />
          <button onClick={insertYoutube} className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-700">삽입</button>
          <button onClick={() => setShowYoutubeInput(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900">취소</button>
        </div>
      )}
      {showImageUrl && (
        <div className="flex gap-2 px-4 py-2 bg-gray-50 border-t border-gray-100">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertImageUrl()}
            placeholder="이미지 URL (https://...)"
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-gray-900"
            autoFocus
          />
          <button onClick={insertImageUrl} className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-700">삽입</button>
          <button onClick={() => setShowImageUrl(false)} className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900">취소</button>
        </div>
      )}
    </div>
  );
}
