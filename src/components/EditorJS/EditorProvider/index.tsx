"use client";
import { useRef, useEffect, PropsWithChildren } from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';

export default function EditorProvider(
    {
        config,
        onReady,
    }: PropsWithChildren<{
        config?: Omit<EditorConfig, "holder" | "holderId">
        onReady?: (
            params: {
                editor: EditorJS
            }
        ) => void
    }>
) {

    const editorRef = useRef<EditorJS | null>(null);
    const editableAreaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(!editorRef.current && editableAreaRef.current){
            editorRef.current = new EditorJS({
                ...(config || {}),
                holder: editableAreaRef.current
            });

            onReady && onReady({
                editor: editorRef.current
            })
        }
        
        return () => {
            if(editorRef.current && editorRef.current.destroy){
                editorRef.current?.destroy();
                editorRef.current = null;
            }
        }
    }, [])

    return <>
        <div ref={ editableAreaRef } />
    </>
}