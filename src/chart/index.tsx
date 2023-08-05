import perspective from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer/dist/css/vaporwave.css";
import "@finos/perspective-viewer/dist/css/solarized.css";

import BaseComponent from "../components/EditorJS/BaseComponent";

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