"use client";
import React, { ChangeEvent, PropsWithChildren, useEffect, useRef, useState } from "react";
import ChartClass from "@/chart";

export default function(
    {
        context
    }: PropsWithChildren<{
        context: ChartClass
    }>
){
    const [ height, setHeight ] = useState<number>(context.widgetHeight);

    useEffect(() => {
        context.setters.setHeightSettings = setHeight;
    }, []);

    useEffect(() => {
        if(context.setters.setHeightComponent){
            context.setters.setHeightComponent(height);
            context.widgetHeight = height;
        }
    }, [ height ]);

    return <>
        <div className={ context.api.styles.settingsButton }>
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>
        </div>
        <div className={ context.api.styles.settingsButton }>
            <svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>
        </div>
        <div className={ context.api.styles.settingsButton }>
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>
        </div>
        <div>
            <label htmlFor="">Altura:</label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* @ts-ignore */}
                <input type="range" min={90} max={520} value={ height } onChange={ evt => setHeight(parseInt(evt.target.value)) } />
                <span>{ height }px</span>
            </div>
        </div>
    </>
}