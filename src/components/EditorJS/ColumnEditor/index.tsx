import { type EditorConfig } from "@editorjs/editorjs";
import { type ReactNode } from "react";
import BaseComponent from "../BaseComponent";
import ColumnComponent from "./ColumnComponent";
import Menu from "./Menu";

import type {
    PublicStates
} from './types';


export default class ColumnEditor extends BaseComponent {
    public publicStates: PublicStates = {
        mainComponentSetColumns: null,
        settingsSetColumns: null,
    }
    public columns: number = 2;
    private editorConfig: EditorConfig

    // @ts-ignore
    constructor(props, editorConfig: EditorConfig){
        console.log(props, editorConfig);
        super({
            ...props,
            customCss: {
                minHeight: 'unset',
                backgroundColor: 'unset'
            }
        });

        this.editorConfig = editorConfig;
    }

    static get toolbox(){
        return {
            title: 'Coluna',
            icon: `<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path   d="M 8.5000002,0.51785707 10.552,4.6756639 15.140413,5.3423994 11.820206,8.5788004 12.604,13.148672 8.5,10.991071 4.3959992,13.148672 5.1797937,8.5788004 1.8595875,5.342399 6.4479997,4.6756639 Z" transform="matrix(22.103491,0,0,22.103491,-19.879668,-13.039006)" />
            </svg>`,
        }
    }

    protected getIdPrefix(): string {
        return "ColumnEditor";
    }

    protected getReactComponent(): ReactNode {
        return <ColumnComponent
            context={this}
            editorConfig={ this.editorConfig }
        />
    }

    protected getSettingsReactComponent(): ReactNode {
        return <Menu
            context={this}
        />
    }
}