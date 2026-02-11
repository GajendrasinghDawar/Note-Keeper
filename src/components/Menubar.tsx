import { useCurrentEditor } from "@tiptap/react";

import {
  FontFamilyIcon,
  StrikethroughIcon,
  FontBoldIcon,
  DividerHorizontalIcon,
  TextIcon,
  ResetIcon,
  HeadingIcon,
  LineHeightIcon,
} from "@radix-ui/react-icons";
import { UndoIcon, RedoIcon } from "./Icons";
import Tooltip from "./Tooltip";
import { MenuButton } from "./MenuButton";
import { SetLinkForm } from "./SetLinkForm";

export default function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className=" flex flex-wrap gap-2  text-xs  font-medium px-2 py-2 mb-5 overflow-hidden border-b  border-slate5">
      <SetLinkForm editor={editor} />

      <Tooltip content={"Bold"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <FontBoldIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Italic"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <FontFamilyIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Strike through"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("Strike")}
        >
          <StrikethroughIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Reset"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().unsetAllMarks().run();
          }}
          isActive={editor.isActive("clearMarks")}
        >
          <ResetIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Paragraph"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setParagraph().run();
          }}
          isActive={editor.isActive("paragraph")}
        >
          <TextIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Heading"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          isActive={editor.isActive("heading")}
        >
          <HeadingIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Divider"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHorizontalRule().run();
          }}
          isActive={editor.isActive("horizontalRule")}
        >
          <DividerHorizontalIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Line Height"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setHardBreak().run();
          }}
          isActive={editor.isActive("hardBreak")}
        >
          <LineHeightIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Undo"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().chain().focus().undo().run()}
          isActive={editor.isActive("undo")}
        >
          <UndoIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Redo"}>
        <MenuButton
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().chain().focus().redo().run()}
          isActive={editor.isActive("redo")}
        >
          <RedoIcon />
        </MenuButton>
      </Tooltip>

      <Tooltip content={"Text red"}>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setColor("#FF977D").run();
          }}
          className={`hover:bg-crimson4 border  border-crimson5 flex justify-center items-center w-7 h-7 bg-crimson3 text-crimson11 rounded-lg p-1 min-w-max ${editor.isActive("textStyle", { color: "#FF977D" }) ? "border-crimson6 bg-crimson5 " : ""}`}
        >
          text red
        </button>
      </Tooltip>

      <Tooltip content={"Text green"}>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setColor("#71D083").run();
          }}
          className={`hover:bg-jade4 border  border-jade4 flex justify-center items-center w-7 h-7 bg-jade3 text-jade11 rounded-lg p-1 min-w-max ${editor.isActive("textStyle", { color: "#71D083" }) ? "border-jade6 bg-jade5" : ""}`}
        >
          text green
        </button>
      </Tooltip>
    </div>
  );
}
