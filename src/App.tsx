// @ts-ignore
import List from '@editorjs/list'
import { styled } from '@mui/material/styles'
import GridLayout, { type Layout } from 'react-grid-layout'
import EditorProvider from '@/components/EditorJS/EditorProvider'
// import { SizeMe } from "react-sizeme"
import { useResizeDetector } from "react-resize-detector"
import config from "@/editorJsConfig"
import { useState, useRef, useEffect } from 'react'

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

function App() {

    // const layout: Layout[] = [
    //     { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    //     { i: "c", x: 4, y: 0, w: 1, h: 2 },
    // ];

    const gridRef = useRef(null);

    const [ isLayoutable, setLayoutable ] = useState<boolean>(true);

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
                                <EditorProvider
                                    config={config}
                                />
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
}

export default App