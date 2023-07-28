import { useState, useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
// @ts-ignore
import List from '@editorjs/list'
import './App.css'

function App() {

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editorjs',
            tools: {
                header: {
                    // @ts-ignore
                    class: Header,
                    inlineToolbar: ['link'],
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
            }
        })
    }, [])

    return <div id='editorjs' style={{
        width: '100vw',
        height: '100vh'
    }}>

    </div>
}

export default App
