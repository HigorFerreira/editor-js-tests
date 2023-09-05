import { type EditorConfig } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import SimpleImage from '@/simple-image'
import Chart from '@/chart'
// @ts-ignore
import List from '@editorjs/list'

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

export default editorConfig;