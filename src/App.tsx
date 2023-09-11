// @ts-ignore
import List from '@editorjs/list'
import { styled } from '@mui/material/styles'
import GridLayout, { type Layout } from 'react-grid-layout'
import { useResizeDetector } from "react-resize-detector"
import { useState, useRef, useEffect } from 'react'
import {
    useEditor,
    EditorContent,
    // FloatingMenu,
    // BubbleMenu,
    type Editor,
} from '@tiptap/react'

// tiptap extensions
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"

import FloatingMenu from '@/components/TipTap/FloatingMenu'
import BubbleMenu from '@/components/TipTap/BubbleMenu'
// import { MantineExtension } from '@/components/TipTap/MantineTable'

// #region
const GridWidget = styled("div")(() => {
    return {
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: 8,
    }
});

const GridWidgetChild = styled("div")(() => {
    return {
        position: 'absolute',
        inset: 0,
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 15,
        overflow: 'visible',
    }
});

const ContainerAll = styled("div")(() => {
    return {
        position: 'relative',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 15,
        '> div': {
            backgroundColor: '#eee',
            padding: 15,
        },
    }
});
// #endregion



function App() {

    // #region
    const gridRef = useRef(null);

    const [ isLayoutable, setLayoutable ] = useState<boolean>(false);

    const { width, height, ref } = useResizeDetector();

    const layout: Layout[] = [
        { i: "a", x: 0, y: 0, w: 6, h: 10,minW: 3, minH: 3 },
        { i: "b", x: 3, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
        { i: "c", x: 6, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
        { i: "d", x: 9, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
        { i: "e", x: 12, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
    ];

    useEffect(() => {
        if(gridRef.current){
            console.log("REFERENCE:", gridRef.current);
        }
    }, []);

    // #endregion
    // #region

    const editor = useEditor({
        extensions: [
            StarterKit,
            Table.configure({
                HTMLAttributes: {
                    class: 'table-fixed',
                },
            }),
            TableCell,
            TableHeader,
            TableRow,
            // MantineExtension,
            Placeholder.configure({
                includeChildren: true,
                showOnlyCurrent: false,

            }),
        ],
        editorProps: {
            attributes: {
                class: 'outline-none'
            }
        }
    });
    // #endregion
    
    // #region
    return <ContainerAll>
        <div ref={ref} style={{ overflowX: 'hidden', overflowY: 'auto',  }}>
            <GridLayout
                className='layout'
                layout={layout}
                cols={12}
                rowHeight={30}
                width={width}
                // @ts-ignore
                compactType={""}
                isDraggable={isLayoutable}
                isResizable={isLayoutable}
                ref={gridRef}
            >
                {
                    layout.map((e, i) => {
                        return <GridWidget key={e.i}>
                            <GridWidgetChild>
                                {/* <EditorProvider
                                    config={config}
                                /> */}
                                <div>
                                    <EditorContent
                                        className=" p-4 m-2 rounded text-zinc-100 bg-zinc-900 prose prose-invert max-w-full min-h-screen"
                                        editor={editor}
                                    />
                                    <FloatingMenu editor={editor as Editor | null} />
                                    <BubbleMenu editor={editor as Editor | null} />
                                </div>
                            </GridWidgetChild>
                        </GridWidget>
                    })
                }
            </GridLayout>
        </div>
        <div>
            <input type="checkbox" id="layout-toggle" checked={isLayoutable} onChange={ evt => setLayoutable(evt.target.checked) } />
            <label htmlFor="layout-toggle">Layout</label>
        </div>
    </ContainerAll>
    // #endregion
}

export default App