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
import { VideoNode } from "@/components/write/VideoExtension";

interface TiptapViewerProps {
  content: object;
}

export default function TiptapViewer({ content }: TiptapViewerProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: true }),
      Image.configure({ inline: false }),
      Youtube.configure({ width: 640, height: 360 }),
      VideoNode,
    ],
    content,
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className="tiptap-viewer prose prose-sm max-w-none">
      <EditorContent editor={editor} />
    </div>
  );
}
