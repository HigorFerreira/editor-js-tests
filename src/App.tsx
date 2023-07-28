import { useState, useRef, useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import SimpleImage from './simple-image'
// @ts-ignore
import List from '@editorjs/list'
import './App.css'

function App() {

    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        if(!editorRef.current){
            editorRef.current = new EditorJS({
                holder: 'editorjs',
                tools: {
                    image: SimpleImage,
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
                    console.log("EDITOR API", api)
                    console.log("EDITOR EVENT", event)
                },
                // data: {
                //     "time": 1550476186479,
                //     "blocks": [
                //        {
                //           "id": "oUq2g_tl8y",
                //           "type": "header",
                //           "data": {
                //              "text": "Editor.js",
                //              "level": 2
                //           }
                //        },
                //        {
                //           "id": "zbGZFPM-iI",
                //           "type": "paragraph",
                //           "data": {
                //              "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."
                //           }
                //        },
                //        {
                //           "id": "qYIGsjS5rt",
                //           "type": "header",
                //           "data": {
                //              "text": "Key features",
                //              "level": 3
                //           }
                //        },
                //        {
                //           "id": "XV87kJS_H1",
                //           "type": "list",
                //           "data": {
                //              "style": "unordered",
                //              "items": [
                //                 "It is a block-styled editor",
                //                 "It returns clean data output in JSON",
                //                 "Designed to be extendable and pluggable with a simple API"
                //              ]
                //           }
                //        },
                //        {
                //           "id": "AOulAjL8XM",
                //           "type": "header",
                //           "data": {
                //              "text": "What does it mean «block-styled editor»",
                //              "level": 3
                //           }
                //        },
                //        {
                //           "id": "cyZjplMOZ0",
                //           "type": "paragraph",
                //           "data": {
                //              "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core."
                //           }
                //        }
                //     ],
                //     "version": "2.8.1"
                //  },
            })
        }
        
        return () => {
            if(editorRef.current){
                // editorRef.current?.destroy();
                // editorRef.current = null;
            }
        }
    }, [])

    return <div style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
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