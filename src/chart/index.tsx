"use client";
import { Dispatch, SetStateAction } from "react";
import BaseComponent from "@/components/EditorJS/BaseComponent";
import Perspective from "@/chart/Perspective";
import Settings from "@/chart/Settings";

export default class Chart extends BaseComponent{
    public widgetHeight: number = 90;
    public setters: {
        setHeightComponent: Dispatch<SetStateAction<number>> | null
        setHeightSettings: Dispatch<SetStateAction<number>> | null
    } = {
        setHeightComponent: null,
        setHeightSettings: null,
    }
    // @ts-ignore
    constructor(props){
        super({
            ...props,
            customCss: {
                minHeight: 'unset',
                backgroundColor: '#07081d',
            }
        });
    }

    getIdPrefix(): string {
        return 'ChartComponent-'
    }

    getReactComponent(): React.ReactNode {
        return <Perspective
            context={this}
        />
    }

    getSettingsReactComponent(): React.ReactNode {
        this.setWrapperClass("ce-popover__items", "settings");
        return <Settings
            context={this}
        />
    }
}