import React from "react";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import Placeholder from '@tiptap/extension-placeholder'


import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import Link from "@tiptap/extension-link";


import MenuBar from "./Menubar";

const extensions = [
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
    }),

    Markdown.configure({
        html: true,
    }),
    Color.configure({ types: [ TextStyle.name, ListItem.name ] }),
    TextStyle.configure({ types: [ ListItem.name ] }),
    Placeholder.configure({
        placeholder: 'Write something …',
    }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: true,
        },
        orderedList: {
            keepMarks: true,
        },
    }),
];

export default function MarkDownEditor({ value, setData }) {

    const intialContent = value;

    function onUpdate({ editor }) {
        const htmlOutput = editor.getHTML();
        setData(prevData => ({ ...prevData, content: htmlOutput }));
    }

    return (
        <div className="border   w-full overflow-hiddenborder  border-sand-sand6 focus:bg-sand-sand4  focus:ring-0 rounded-lg focus-within:border-sand-sand9 
        ">
            <EditorProvider
                onUpdate={ onUpdate }
                slotBefore={ <MenuBar /> }
                extensions={ extensions }
                content={ intialContent }
                editorProps={ {
                    attributes: {
                        class: "prose prose-sm  sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none overflow-y-auto h-full  px-2 mb-3  min-h-40",
                    },
                } }
            ></EditorProvider>
        </div>
    );
}