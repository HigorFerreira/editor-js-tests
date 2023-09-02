import { type PropsWithChildren, useEffect, useState } from "react";
import ColumnEditor from ".";

export default function ColumnComponent(
    {
        context
    }: PropsWithChildren<{
        context: ColumnEditor
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
        gap: 5
    }}>
        {
            arr.map((_, i) => {
                return <div key={i} style={{
                    // width: '100%',
                    // height: '100%',
                }}>
                    <h3>PUTS</h3>
                </div>
            })
        }
    </div>
}