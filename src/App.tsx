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
                    // console.log("EDITOR API", api)
                    // console.log("EDITOR EVENT", event)
                },
                data: {
                    time: 1552744582955,
                    blocks: [
                      {
                        type: "image",
                        data: {
                          url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
                        }
                      }
                    ],
                    version: "2.11.10"
                },
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