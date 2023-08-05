import perspective from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer/dist/css/vaporwave.css";
import "@finos/perspective-viewer/dist/css/solarized.css";

import React, { CSSProperties } from "react";
import ReactDOM from 'react-dom/client';

class BaseComponent {
    private readonly id: string;
    private data: any;
    private wrapper: HTMLDivElement;
    
    private counter: number = 1;
    private timeout: number;

    constructor(
        {
            data,
            customCss,
        }: {
            data?: any
            customCss?: CSSProperties
        }
    ){

        this.data = data
        this.id = ""

        const defaultCss: CSSProperties = {
            position: 'relative',
            width: '100%',
            minHeight: '90px',
            backgroundColor: '#eee',
            ...(customCss || {}),
        }

        const wrapper = document.createElement("div")
        Object.keys(defaultCss).forEach(key => {
            console.log(key)
            // @ts-ignore
            wrapper.style[key] = defaultCss[key]
        })
        this.wrapper = wrapper

        this.timeout = this.calculateTimeout(this.counter)
        this.setId(this.generateUniqueId())
    }

    getData(): any {
        return this.data
    }

    getIdPrefix(): string{
        return 'EditorComponent-'
    }

    /**
     * Generates an unique ID for the component to put in wrapper that react uses
     * @returns The id of the component
     */
    generateUniqueId(): string {
        // @ts-ignore
        return this.getIdPrefix() + Date.now().toString(16) + '-' + (parseInt(Math.random()*10000)).toString()
    }

    /**
     * Set the id of component container
     * @id The id of container
     */
    setId(id: string){
        // @ts-ignore
        this.id = id
        this.wrapper.id = id
    }

    getId(): string{
        return this.id
    }

    /**
     * 
     * @param x Counter number
     * @returns 
     */
    calculateTimeout(x: number){
        if(x > 9) return 700
        if(x < 1) return 10
        return -0.0001333*x*x*x*x*x*x*x*x*x*x + 0.003164*x*x*x*x*x*x*x*x*x - 0.01442*x*x*x*x*x*x*x*x - 0.1758*x*x*x*x*x*x*x + 1.259*x*x*x*x*x*x + 10.71*x*x*x*x*x - 155*x*x*x*x + 740.3*x*x*x - 1721*x*x + 1925*x - 790.7
    }

    static get toolbox(){
        return {
            title: 'Component',
            icon: `<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path   d="M 8.5000002,0.51785707 10.552,4.6756639 15.140413,5.3423994 11.820206,8.5788004 12.604,13.148672 8.5,10.991071 4.3959992,13.148672 5.1797937,8.5788004 1.8595875,5.342399 6.4479997,4.6756639 Z" transform="matrix(22.103491,0,0,22.103491,-19.879668,-13.039006)" />
            </svg>`,
        }
    }

    render(){
        this.renderReactComponent()

        return this.wrapper
    }

    getReactComponent(): React.ReactNode{
        return <div style={{
            padding: 12,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <h1>Component</h1>
            <p>Hello, i'm a new component</p>
        </div>
    }

    renderReactComponent(){
        if(this.id === "") throw new Error("ID does not set");
        console.log("RENDER COMPONENT", this.counter)
        try{
            setTimeout(() => {
                ReactDOM.createRoot(
                    document.getElementById(this.getId())!
                ).render(this.getReactComponent());
            }, this.timeout);
        }
        catch(error){
            console.error(error)
            if(this.counter < 8){
                this.calculateTimeout(this.counter++);
                this.renderReactComponent();
            }
        }
    }
}

export default class Chart extends BaseComponent{
    constructor(){
        super({
            customCss: {
                minHeight: '400px'
            }
        });
    }

    getIdPrefix(): string {
        return 'ChartComponent-'
    }

    getReactComponent(): React.ReactNode {
        return <perspective-viewer
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }}
        />
    }
}