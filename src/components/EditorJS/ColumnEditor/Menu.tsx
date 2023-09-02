import { type PropsWithChildren, useEffect, useState } from "react";
import ColumnEditor from ".";

export default function Menu(
    {
        context,
    }: PropsWithChildren<{
        context: ColumnEditor
    }>
){
    const [ columns, setColumns ] = useState(2);

    useEffect(() => {
        context.publicStates.settingsSetColumns = setColumns;
    }, []);

    useEffect(() => {
        // @ts-ignore
        context.publicStates?.mainComponentSetColumns(columns);
        context.columns = columns;
    }, [ columns ]);

    return <>
        <div style={{
            margin: '0 5px',
        }}>
            <label htmlFor="">Colunas: </label>
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
            }}>
                {/* @ts-ignore */}
                <input type="range" min={2} max={4} value={columns} onChange={ evt => setColumns(evt.target.value) } />
                <div>{columns}</div>
            </div>
        </div>
    </>
}