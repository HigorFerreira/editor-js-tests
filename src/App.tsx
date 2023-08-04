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
    return <div style={{
        width: '100vw',
        height: '100vh'
    }}>
        <ReactEditorJS holder='custom'>
            <div id='custom'></div>
        </ReactEditorJS>
    </div>
}

export default App