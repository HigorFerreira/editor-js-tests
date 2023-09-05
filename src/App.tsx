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