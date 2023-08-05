import React, { ChangeEvent, PropsWithChildren, useEffect, useRef, useState } from "react";

import perspective from "@finos/perspective";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer/dist/css/vaporwave.css";
import "@finos/perspective-viewer/dist/css/solarized.css";
import { HTMLPerspectiveViewerElement } from "@finos/perspective-viewer/dist/esm/extensions";
// import { PerspectiveViewerProps } from "./types";

import { RingLoader, PulseLoader, RiseLoader, CircleLoader, ClipLoader, PropagateLoader } from 'react-spinners'

export default function(){
    const perspectiveRef = useRef<HTMLPerspectiveViewerElement>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3500);
    }, [])

    useEffect(() => {
        async function main() {
            try{
                if(perspectiveRef.current){
                    
                    // @ts-ignore
                    const table = await perspective.worker().table([ { name: 'Tiago', age: 19 }, { name: 'Higor', age: 25 } ]);

                    await perspectiveRef.current.load(table)
                    await perspectiveRef.current.restore({
                        plugin: 'Sunburst',
                        plugin_config: { sunburstLevel: {} },
                        settings: true,
                        // @ts-ignore
                        theme: 'Vaporwave',
                        title: null,
                        group_by: [ 'name' ],
                        split_by: [],
                        columns: [ 'age', null, null ],
                        filter: [],
                        sort: [],
                        expressions: [],
                        aggregates: {}
                    })

                    await perspectiveRef.current.toggleConfig(false);
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

    return <>
        <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            visibility: loading ? 'visible' : 'hidden',
        }}>
            <ClipLoader color="#01cdfe" />
        </div>
        <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
            <perspective-viewer
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                }}
                ref={perspectiveRef}
            />
        </div>
    </>
}