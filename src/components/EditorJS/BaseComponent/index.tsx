import React, { CSSProperties } from "react";
import ReactDOM from 'react-dom/client';

export default class BaseComponent {
    private readonly id: string;
    private data: any;
    private wrapper: HTMLDivElement;
    private settingsWrapper: HTMLElement;
    
    private readonly timeouts = [ 2, 5, 10, 15, 20, 50, 100, 150, 200, 250 ]

    constructor(
        {
            data,
            customCss,
        }: {
            data?: any
            customCss?: CSSProperties
        }
    ){

        this.data = data;
        this.id = "";

        const defaultCss: CSSProperties = {
            position: 'relative',
            width: '100%',
            minHeight: '90px',
            backgroundColor: '#eee',
            ...(customCss || {}),
        }

        const wrapper = document.createElement("div");
        Object.keys(defaultCss).forEach(key => {
            // console.log(key)
            // @ts-ignore
            wrapper.style[key] = defaultCss[key];
        })
        this.wrapper = wrapper;

        this.settingsWrapper = document.createElement("div");

        this.setId(this.generateUniqueId());
    }

    public getData(): any {
        return this.data
    }

    protected getIdPrefix(): string{
        return 'EditorComponent-'
    }

    /**
     * Generates an unique ID for the component to put in wrapper that react uses
     * @returns The id of the component
     */
    protected generateUniqueId(): string {
        // @ts-ignore
        return this.getIdPrefix() + Date.now().toString(16) + '-' + (parseInt(Math.random()*10000)).toString()
    }

    /**
     * Set the id of component container
     * @id The id of container
     */
    private setId(id: string){
        // @ts-ignore
        this.id = id;
        this.wrapper.id = id;
        this.settingsWrapper.id = `Settings-${id}`;
    }

    public getId(): string{
        return this.id;
    }

    static get toolbox(){
        return {
            title: 'Component',
            icon: `<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path   d="M 8.5000002,0.51785707 10.552,4.6756639 15.140413,5.3423994 11.820206,8.5788004 12.604,13.148672 8.5,10.991071 4.3959992,13.148672 5.1797937,8.5788004 1.8595875,5.342399 6.4479997,4.6756639 Z" transform="matrix(22.103491,0,0,22.103491,-19.879668,-13.039006)" />
            </svg>`,
        }
    }

    private render(){
        this.renderReactComponent();

        return this.wrapper;
    }

    private renderSettings(){
        this.rederSettingsReactComponent();

        return this.settingsWrapper;
    }

    protected getReactComponent(): React.ReactNode{
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

    protected getSettingsReactComponent(): React.ReactNode{
        return <></>
    }

    private renderReactComponent(idx = 0){
        if(this.id === "") throw new Error("ID does not set");
        
        const timeout =
            idx === this.timeouts.length
                ? this.timeouts[this.timeouts.length - 1]
                : this.timeouts[idx];

        console.log("Redering try:", idx+1);
        try{
            setTimeout(() => {
                ReactDOM.createRoot(
                    document.getElementById(this.getId())!
                ).render(this.getReactComponent());
            }, timeout);
        }
        catch(error){
            console.error(error)
            if(idx > 10) throw new Error("Failed to render component after 10 tries");
            this.renderReactComponent(idx + 1);
        }
    }

    private rederSettingsReactComponent(idx = 0){
        if(this.id === "") throw new Error("ID does not set");

        const timeout =
            idx === this.timeouts.length
                ? this.timeouts[this.timeouts.length - 1]
                : this.timeouts[idx];

        try{
            setTimeout(() => {
                ReactDOM.createRoot(
                    document.getElementById(this.getId())!
                ).render(this.getSettingsReactComponent());
            }, timeout);
        }
        catch(error){
            console.error(error)
            if(idx > 10) throw new Error("Failed to render component after 10 tries");
            this.renderReactComponent(idx + 1);
        }
    }
}