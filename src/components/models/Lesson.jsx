"use client";
import React, { useState } from "react";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import TextAlign from "@tiptap/extension-text-align";
import { IconButton } from "@material-tailwind/react";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const editorContent = editor.getHTML();
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  if (!editor) {
    return null;
  }

  return (
    <div className="buttonsWrapper pt-12 pb-7">
      <IconButton
        color="lime"
        variant="text"
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <i className="fa fa-bold fa-lg" />
      </IconButton>
      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <i className="fa fa-italic fa-lg" />
      </IconButton>
      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <i className="fa fa-strikethrough fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <i className="fa fa-code fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <i className="fa fa-paragraph fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <strong>H1</strong>
      </IconButton>
      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <strong>H2</strong>
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <strong>H3</strong>
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <strong>H4</strong>
      </IconButton>
      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        <strong>H5</strong>
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        <strong>H6</strong>
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <i className="fa fa-list fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <i className="fa fa-list-ol fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <i className="fa fa-rotate-left fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <i className="fa fa-rotate-right fa-lg" />
      </IconButton>

      <IconButton
        color="yellow"
        variant="text"
        onClick={() => {
          editor.chain().focus().toggleHighlight().run();
        }}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
        <i className="fas fa-highlighter fa-lg text-yellow-500" />
      </IconButton>

      <IconButton
        color="green"
        variant="text"
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#8ce99a" }).run()
        }
        className={
          editor.isActive("highlight", { color: "#8ce99a" }) ? "is-active" : ""
        }
      >
        <i className="fas fa-highlighter fa-lg text-[#8ce99a]" />
      </IconButton>
      <IconButton
        variant="text"
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#74c0fc" }).run()
        }
        className={
          editor.isActive("highlight", { color: "#74c0fc" }) ? "is-active" : ""
        }
      >
        <i className="fas fa-highlighter fa-lg text-[#74c0fc]" />
      </IconButton>
      <IconButton color="lime" variant="text" onClick={addImage}>
        <i className="fa fa-image fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <i className="fa fa-align-left fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <i className="fa fa-align-center fa-lg" />
      </IconButton>

      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <i className="fa fa-align-right fa-lg" />
      </IconButton>
      <IconButton
        color="lime"
        variant="text"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        <i className="fa fa-align-justify fa-lg" />
      </IconButton>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>

      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>

      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>

      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: true,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: true,
    },
  }),
  Highlight.configure({ multicolor: true }),
  Typography.configure({
    copyright: true,
    leftArrow: true,
    rightArrow: true,
  }),
  Image,
  Dropcursor,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const Lesson = (props) => {
  const { idx } = props;
  const content = `
  <h1 style="text-align: center">Lesson ${idx}</h1><hr><h2>Hi there,</h2><img src="https://static.actu.fr/uploads/2022/11/handala-fresque-grigny-960x640.jpg"><p>this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:</p><pre><code class="language-css">body {
  display: none;
  }</code></pre><p>I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p><blockquote><p>Wow, that’s amazing. Good work, boy! 👏 <br>— Mom</p></blockquote>
  `;
  return (
    <div className="z-40 flex-grow overflow-auto bg-[#1d1d1d] border-lime-700 rounded-lg border-2 mb-5 mx-10 px-10 mt-24">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      ></EditorProvider>
    </div>
  );
};

export default Lesson;
