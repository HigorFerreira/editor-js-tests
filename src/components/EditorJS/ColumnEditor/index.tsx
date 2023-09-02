import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from "react";
import BaseComponent from "../BaseComponent";

function Menu(
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

function ColumnComponent(
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

type PublicStates = {
    settingsSetColumns: Dispatch<SetStateAction<number>> | null
    mainComponentSetColumns: Dispatch<SetStateAction<number>> | null
}

export default class ColumnEditor extends BaseComponent {
    public publicStates: PublicStates = {
        mainComponentSetColumns: null,
        settingsSetColumns: null,
    }

    static get toolbox(){
        return {
            title: 'Coluna',
            icon: `<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path   d="M 8.5000002,0.51785707 10.552,4.6756639 15.140413,5.3423994 11.820206,8.5788004 12.604,13.148672 8.5,10.991071 4.3959992,13.148672 5.1797937,8.5788004 1.8595875,5.342399 6.4479997,4.6756639 Z" transform="matrix(22.103491,0,0,22.103491,-19.879668,-13.039006)" />
            </svg>`,
        }
    }

    protected getReactComponent(): ReactNode {
        return <ColumnComponent
            context={this}
        />
    }

    protected getSettingsReactComponent(): ReactNode {
        return <Menu
            context={this}
        />
    }
}