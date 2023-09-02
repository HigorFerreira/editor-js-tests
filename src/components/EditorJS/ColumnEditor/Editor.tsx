import { useEffect, useRef } from "react";
import type { PropsWithChildren, MutableRefObject } from "react";
import type { EditorConfig } from "@editorjs/editorjs";
import type ColumnEditor from ".";
import EditorJS from "@editorjs/editorjs";

export default function Editor(
    {
        context,
        editorConfig,
        onReady,
    }: PropsWithChildren<{
        context: ColumnEditor
        editorConfig: Omit<EditorConfig, "holder" | "holderId">
        onReady: (
            params: {
                editor: MutableRefObject<EditorJS | null>
            }
        ) => void
    }>
){
    const editorRef = useRef<EditorJS | null>(null);
    const holderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!editorRef.current && holderRef.current){
            editorRef.current = new EditorJS({
                ...editorConfig,
                holder: holderRef.current
            });

            onReady({
                editor: editorRef
            });
        }
    }, []);

    return <div ref={ holderRef } />
}