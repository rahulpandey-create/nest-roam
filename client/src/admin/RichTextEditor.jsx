import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { TableKit } from "@tiptap/extension-table";
import {
  AlignCenter, AlignLeft, AlignRight, Bold,
  ImagePlus, Italic, Link2, List, ListOrdered, Quote, Redo2, Table2,
  Underline as UnderlineIcon, Undo2, Unlink, FileCode2, Minus,
} from "lucide-react";
import { API, adminRequest } from "./adminApi";

function ToolButton({ title, active = false, onClick, children, disabled = false }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      disabled={disabled}
      onClick={onClick}
      className={`blog-editor-tool ${active ? "is-active" : ""}`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange }) {
  const imageInputRef = useRef(null);
  const [sourceMode, setSourceMode] = useState(false);
  const [source, setSource] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const [editorStats, setEditorStats] = useState({ words: 0, readTime: 1 });
  const extensions = useMemo(() => [
    StarterKit.configure({
      heading: { levels: [2, 3, 4] },
      link: {
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      },
    }),
    Image.configure({ inline: false, allowBase64: false }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    TableKit.configure({ table: { resizable: true } }),
    Placeholder.configure({ placeholder: "Start writing your travel story…" }),
  ], []);

  const editor = useEditor({
    extensions,
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "blog-tiptap-content",
        "aria-label": "Article content editor",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const html = currentEditor.getHTML();
      onChange?.(html);
      const words = currentEditor.getText().trim().match(/\S+/g)?.length || 0;
      setEditorStats({ words, readTime: Math.max(1, Math.ceil(words / 200)) });
    },
    onCreate: ({ editor: currentEditor }) => {
      const words = currentEditor.getText().trim().match(/\S+/g)?.length || 0;
      setEditorStats({ words, readTime: Math.max(1, Math.ceil(words / 200)) });
    },
  });

  useEffect(() => {
    if (!editor || sourceMode || value === editor.getHTML()) return;
    editor.commands.setContent(value || "", { emitUpdate: false });
    const words = editor.getText().trim().match(/\S+/g)?.length || 0;
    setEditorStats({ words, readTime: Math.max(1, Math.ceil(words / 200)) });
  }, [editor, value, sourceMode]);

  function toggleSource() {
    if (!sourceMode) {
      setSource(editor?.getHTML() || value || "");
      setSourceMode(true);
      return;
    }
    editor?.commands.setContent(source, { emitUpdate: true });
    onChange?.(source);
    setSourceMode(false);
  }

  function addLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href;
    const href = window.prompt("Enter the link URL", previous || "https://");
    if (href === null) return;
    if (!href.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
  }

  async function uploadInlineImage(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !editor) return;
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const result = await adminRequest("/api/blogs/admin/upload-image", {
        method: "POST",
        body: formData,
      });
      const src = result.path?.startsWith("http") ? result.path : `${API}${result.path}`;
      editor.chain().focus().setImage({ src, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } catch (error) {
      window.alert(error.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  if (!editor) return <div className="min-h-[420px] rounded-2xl border bg-white p-6 text-sm text-slate-500">Loading editor…</div>;

  return (
    <div className="blog-editor-shell">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eadfce] bg-[#fbfaf7] px-3 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-1">
          <select
            aria-label="Text style"
            value={editor.isActive("heading", { level: 2 }) ? "h2" : editor.isActive("heading", { level: 3 }) ? "h3" : editor.isActive("heading", { level: 4 }) ? "h4" : "p"}
            onChange={(event) => {
              const selected = event.target.value;
              if (selected === "p") editor.chain().focus().setParagraph().run();
              else editor.chain().focus().toggleHeading({ level: Number(selected.slice(1)) }).run();
            }}
            className="blog-editor-select"
          >
            <option value="p">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
          </select>
          <span className="blog-editor-divider" />
          <ToolButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={18} /></ToolButton>
          <ToolButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={18} /></ToolButton>
          <ToolButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={18} /></ToolButton>
          <span className="blog-editor-divider" />
          <ToolButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={18} /></ToolButton>
          <ToolButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={18} /></ToolButton>
          <ToolButton title="Block quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={18} /></ToolButton>
          <span className="blog-editor-divider" />
          <ToolButton title="Insert link" active={editor.isActive("link")} onClick={addLink}><Link2 size={18} /></ToolButton>
          <ToolButton title="Remove link" disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().unsetLink().run()}><Unlink size={18} /></ToolButton>
          <ToolButton title={uploading ? "Uploading image…" : "Insert image"} disabled={uploading} onClick={() => imageInputRef.current?.click()}><ImagePlus size={18} /></ToolButton>
          <ToolButton title="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><Table2 size={18} /></ToolButton>
          <span className="blog-editor-divider" />
          <ToolButton title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={18} /></ToolButton>
          <ToolButton title="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={18} /></ToolButton>
          <ToolButton title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={18} /></ToolButton>
          <ToolButton title="Horizontal divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={18} /></ToolButton>
          <span className="blog-editor-divider" />
          <ToolButton title="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={18} /></ToolButton>
          <ToolButton title="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={18} /></ToolButton>
        </div>
        <button type="button" onClick={toggleSource} className="blog-source-toggle">
          <FileCode2 size={16} /> {sourceMode ? "Visual Editor" : "HTML Source"}
        </button>
      </div>

      <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" onChange={uploadInlineImage} />
      {sourceMode ? (
        <textarea
          value={source}
          onChange={(event) => {
            const nextSource = event.target.value;
            setSource(nextSource);
            onChange?.(nextSource);
            const words = nextSource.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim().match(/\S+/g)?.length || 0;
            setEditorStats({ words, readTime: Math.max(1, Math.ceil(words / 200)) });
          }}
          spellCheck="false"
          aria-label="HTML source"
          className="min-h-[520px] w-full resize-y border-0 bg-[#111827] p-6 font-mono text-sm leading-7 text-emerald-100 outline-none"
        />
      ) : (
        <EditorContent editor={editor} />
      )}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#eadfce] bg-[#fbfaf7] px-5 py-3 text-sm text-slate-500">
        <span>{editorStats.words.toLocaleString()} words</span>
        <span>Estimated reading time: {editorStats.readTime} min</span>
      </div>
      {uploading && <p className="border-t bg-blue-50 px-5 py-2 text-xs text-blue-800">Uploading image…</p>}
    </div>
  );
}
