import { createReactEditorJS } from 'react-editor-js'
import { useState, useRef, useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import SimpleImage from './simple-image'
import Chart from './chart'
// @ts-ignore
import List from '@editorjs/list'
import Tiptap from './Tiptap'
import './App.css'

const ReactEditorJS = createReactEditorJS()

function App() {

    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if(!editorRef.current){
            editorRef.current = new EditorJS({
                holder: 'editorjs',
                tools: {
                    // @ts-ignore
                    chart: Chart,
                    image: {
                        // @ts-ignore
                        class: SimpleImage,
                        inlineToolbar: ['link'],
                    },
                    header: {
                        // @ts-ignore
                        class: Header,
                        inlineToolbar: ['link'],
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                },
                autofocus: true,
                // placeholder: 'Let\'s write something',
                onReady: () => {
                    console.log("Editor is working")
                },
                onChange: (api, event) => {
                    // console.log("EDITOR API", api)
                    // console.log("EDITOR EVENT", event)
                },
                data: {
                    time: 1552744582955,
                    blocks: [
                    ],
                    version: "2.11.10"
                },
            })
        }
        
        return () => {
            if(editorRef.current && editorRef.current.destroy){
                editorRef.current?.destroy();
                editorRef.current = null;
            }
        }
    }, [])

    return <div>
        <style>{`
        .simple-image {
            padding: 20px 0;
        }
        
        .simple-image input {
            width: 100%;
            padding: 10px;
            border: 1px solid #e4e4e4;
            border-radius: 3px;
            outline: none;
            font-size: 14px;
        }

        .simple-image [contenteditable] {
            // styles
        }

        .simple-image img {
            max-width: 100%;
            margin-bottom: 15px;
        }
        `}</style>
        <div
            id='editorjs'
            style={{
                width: '21cm',
                border: '1px solid black',
                padding: '25px',
                transform: 'scale(1)'
            }}
        />
    </div>
}

export default App