import { createReactEditorJS } from 'react-editor-js'
import { useState, useRef, useEffect, CSSProperties } from 'react'
import EditorJS, { EditorConfig } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import SimpleImage from './simple-image'
import Chart from './chart'
// @ts-ignore
import List from '@editorjs/list'
import ColumnEditor from './components/EditorJS/ColumnEditor'
import EditorProvider from './components/EditorJS/EditorProvider'
import GridLayout, { type Layout } from 'react-grid-layout'


const st: CSSProperties = {
    backgroundColor: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

function App() {

    const layout: Layout[] = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        { i: "c", x: 4, y: 0, w: 1, h: 2 },
    ];

    return <GridLayout
        className='layout'
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
    >
        <div style={st} key="a">a</div>
        <div style={st} key="b">b</div>
        <div style={st} key="c">c</div>
    </GridLayout>
}

export default App