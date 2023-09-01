"use client";
import { useRef, useEffect } from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';

export default function EditorProvider(config?: EditorConfig) {

    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if(!editorRef.current){
            editorRef.current = new EditorJS(config)
        }
        
        return () => {
            if(editorRef.current && editorRef.current.destroy){
                editorRef.current?.destroy();
                editorRef.current = null;
            }
        }
    }, [])

    return <div>
        <button onClick={async () => {
            console.log(await editorRef.current?.save())
        }}>Save</button>
        <div
            id='editorjs'
            // style={{
            //     width: '21cm',
            //     border: '1px solid black',
            //     padding: '25px',
            //     transform: 'scale(1)'
            // }}
        />
    </div>
}