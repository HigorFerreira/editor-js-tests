import { createReactEditorJS } from 'react-editor-js'
import { useState, useRef, useEffect } from 'react'
import EditorJS, { EditorConfig } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import SimpleImage from './simple-image'
import Chart from './chart'
// @ts-ignore
import List from '@editorjs/list'
import ColumnEditor from './components/EditorJS/ColumnEditor'
import EditorProvider from './components/EditorJS/EditorProvider'

const editorConfig: EditorConfig = {
    tools: {
        // @ts-ignore
        chart: Chart,
        image: {
            // @ts-ignore
            class: SimpleImage,
            inlineToolbar: ['link'],
            config: {
                placeholder: 'Paste image URL'
            }
        },
        // column: {
        //     // @ts-ignore
        //     class: ColumnEditor,
        // },
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
}

function ColumnFactory(editorConfig: EditorConfig){
    return class extends ColumnEditor {
        constructor(params: any){
            super(params, editorConfig);
        }
    }
}

function App() {

    const [ editors, setEditors ] = useState<EditorJS[]>([]);
    useEffect(() => {
        console.log("EDITORS", editors);
    }, [ editors ]);

    return <>
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

        .simple-image.withBorder img {
            border: 1px solid #e8e8eb;
        }
        
        .simple-image.withBackground {
            background: #eff2f5;
            padding: 10px;
        }
        
        .simple-image.withBackground img {
            display: block;
            max-width: 60%;
            margin: 0 auto 15px;
        }

        /*
        .simple-image.stretched img {
            width: 100%;
            max-width: 100%;
        }
        */
        .codex-editor__redactor{
            padding-bottom: 0 !important;
        }
        `}</style>
        <button onClick={async () => {
            console.log(await editors[0]?.save());
        }}>Save</button>
        <EditorProvider
            onReady={({ editor }) => {
                setEditors(prev => [ ...prev, editor ])
            }}
            config={{
                ...editorConfig,
                tools: {
                    ...editorConfig.tools,
                    column: {
                        // @ts-ignore
                        class: ColumnFactory(editorConfig)
                    }
                }
            }}
        />
    </>
}

export default App