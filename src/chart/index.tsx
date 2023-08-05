import BaseComponent from "../components/EditorJS/BaseComponent";
import Perspective from "./Perspective";

export default class Chart extends BaseComponent{
    constructor(){
        super({
            customCss: {
                minHeight: '420px',
                backgroundColor: '#07081d',
            }
        });
    }

    getIdPrefix(): string {
        return 'ChartComponent-'
    }

    getReactComponent(): React.ReactNode {
        return <Perspective />
    }
}