// @ts-ignore
import List from '@editorjs/list'
import { styled } from '@mui/material/styles'
import GridLayout, { type Layout } from 'react-grid-layout'
import EditorProvider from '@/components/EditorJS/EditorProvider'
import config from '@/editorJsConfig'

const GridWidget = styled("div")(() => {
    return {
        position: 'relative',
        backgroundColor: '#eee',
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
        overflow: 'hidden'
    }
});

function App() {

    // const layout: Layout[] = [
    //     { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    //     { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    //     { i: "c", x: 4, y: 0, w: 1, h: 2 },
    // ];

    const layout: Layout[] = [
        { i: "a", x: 0, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
        { i: "b", x: 3, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
        { i: "c", x: 6, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
        { i: "d", x: 9, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
        { i: "e", x: 12, y: 0, w: 3, h: 4,minW: 3, minH: 3 },
    ];

    return <GridLayout
        className='layout'
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        // @ts-ignore
        compactType={""}
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
}

export default App