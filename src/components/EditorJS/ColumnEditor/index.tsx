import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from "react";
import BaseComponent from "../BaseComponent";

function Menu(
    {
        context,
        onReady
    }: PropsWithChildren<{
        context: ColumnEditor
        onReady: (params: {
            setCounter: Dispatch<SetStateAction<number>>
        }) => void
    }>
){
    const [ _, setCounter ] = useState(0);
    const [ columns, setColumns ] = useState(context.columns);

    useEffect(() => {
        onReady({ setCounter });
    }, []);

    useEffect(() => {
        context.columns = columns;
        context.componentCounter && context.componentCounter(prev => prev + 1);
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
        context,
        onReady
    }: PropsWithChildren<{
        context: ColumnEditor
        onReady: (params: {
            setCounter: Dispatch<SetStateAction<number>>
        }) => void
    }>
){
    const [ counter, setCounter ] = useState(0);
    const [ columns, setColumns ] = useState(context.columns);
    const [ arr, setArr ] = useState([ 0, 0 ]);

    useEffect(() => {
        onReady({ setCounter });
    }, []);

    useEffect(() => {
        setColumns(context.columns);
    }, [ counter ]);

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

export default class ColumnEditor extends BaseComponent {
    public columns: number = 2;
    public componentCounter: Dispatch<SetStateAction<number>> | null = null;
    public settingsCounter: Dispatch<SetStateAction<number>> | null = null;

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
            onReady={ ({ setCounter }) => {
                this.componentCounter = setCounter;
            } }
        />
    }

    protected getSettingsReactComponent(): ReactNode {
        return <Menu
            context={this}
            onReady={ ({ setCounter }) => {
                this.settingsCounter = setCounter;
            } }
        />
    }
}