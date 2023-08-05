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

    constructor(customCss: CSSProperties = {}){

        this.id = ""

        const defaultCss: CSSProperties = {
            position: 'relative',
            width: '100%',
            minHeight: '90px',
            backgroundColor: '#eee',
            ...customCss,
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

    /**
     * Generates an unique ID for the component to put in wrapper that react uses
     * @returns The id of the component
     */
    generateUniqueId(): string {
        // @ts-ignore
        return 'EditorComponent-' + Date.now().toString(16) + '-' + (parseInt(Math.random()*10000)).toString()
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
            title: 'Chart',
            icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
        }
    }

    render(){
        // const perspectiveTxtComponent = `
        //     <perspective-viewer
        //         id='viewer'
        //         style="position: absolute; inset: 0"
        //     >
        //     </perspective-viewer>
        // `
        // container.innerHTML = perspectiveTxtComponent
        
        // this.wrapper.appendChild(container.children[0])
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
            minHeight: '480px'
        });
    }

    getReactComponent(): React.ReactNode {
        return <perspective-viewer
            // id={`viewer-${uuid}`}
            //@ts-ignore
            // theme={(() => {
            //     console.log("currentTheme", currentTheme)
            //     switch (currentTheme) {
            //         case "light":
            //             return 'Solarized'
            //         case "dark":
            //             return 'Vaporwave'
            //         default:
            //             return 'Solarized'
            //     }
            // })()}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }}
            // ref={perspectiveRef}
        />
    }
}