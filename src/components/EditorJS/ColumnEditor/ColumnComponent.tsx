import { type PropsWithChildren, useEffect, useState } from "react";
import { type EditorConfig } from "@editorjs/editorjs";
import Editor from "./Editor";
import ColumnEditor from ".";

export default function ColumnComponent(
    {
        context,
        editorConfig,
    }: PropsWithChildren<{
        context: ColumnEditor
        editorConfig: Omit<EditorConfig, "holder" | "holderId">
    }>
){
    const [ columns, setColumns ] = useState(2);
    const [ arr, setArr ] = useState([ 0, 0 ]);

    useEffect(() => {
        context.publicStates.mainComponentSetColumns = setColumns;
    }, []);

    useEffect(() => {
        setArr(() => {
            let newArray = [];
            for(let i = 0; i < columns; i++){
                newArray.push(0);
            }
            return newArray;
        });
    }, [ columns ]);

    return <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 5,
        border: '1px solid black',
        padding: 2,
    }}>
        <style>{`
        .codex-editor--narrow .codex-editor__redactor{
            margin: 0;
        }
        `}</style>
        {
            arr.map((_, i) => {
                return <Editor
                    key={i}
                    context={context}
                    editorConfig={editorConfig}
                    onReady={ ({ editor }) => {

                    } }
                />
            })
        }
    </div>
}