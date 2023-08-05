import React, { ChangeEvent, PropsWithChildren, useEffect, useRef, useState } from "react";

import perspective from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer/dist/css/vaporwave.css";
import "@finos/perspective-viewer/dist/css/solarized.css";
import { HTMLPerspectiveViewerElement } from "@finos/perspective-viewer/dist/esm/extensions";
// import { PerspectiveViewerProps } from "./types";

export default function(){
    const perspectiveRef = useRef<HTMLPerspectiveViewerElement>(null);

    useEffect(() => {
        async function main() {
            try{
                if(perspectiveRef.current){
                    
                    const table = await perspective.worker().table([
                        // @ts-ignore
                        {
                            "name": "Tiago",
                            "age": 19
                        },
                        // @ts-ignore
                        {
                            "name": "Higor",
                            "age": 25
                        }
                    ]);

                    perspectiveRef.current.load(table)
                    perspectiveRef.current.restore({
                        plugin: 'Sunburst',
                        plugin_config: { sunburstLevel: {} },
                        settings: true,
                        // @ts-ignore
                        theme: 'Vaporwave',
                        title: 'Something',
                        group_by: [ 'name' ],
                        split_by: [],
                        columns: [ 'age', null, null ],
                        filter: [],
                        sort: [],
                        expressions: [],
                        aggregates: {}
                    })
                }
            }
            catch(error){
                console.log(error);
            }
        }
        main();
        // console.log(data)
        // const loadData = async () => {
        //     if (data && perspectiveRef.current) {
        //         const table = await perspective.worker().table(data);
        //         perspectiveRef.current.load(table);
        //         config && perspectiveRef.current.restore(config);
        //     };
        // };
        // loadData();
    }, []);

    return <perspective-viewer
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }}
        ref={perspectiveRef}
    />
}