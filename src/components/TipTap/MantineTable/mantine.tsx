import {
    useEffect,
    useState
} from "react";

// Components imports
import { MantineProvider } from "@mantine/core";
import {
    type MRT_ColumnDef,
    MantineReactTable,
    useMantineReactTable
} from "mantine-react-table";
import {
    NodeViewContent,
    NodeViewWrapper
} from "@tiptap/react";



export default function Mantine() {
    const [data, setData] = useState<Object[]>([{ name: 'Tiago', age: 19 }, { name: 'Higor', age: 25 }])
    const [columns, setColumns] = useState<MRT_ColumnDef<any>[]>([])

    useEffect(() => {
        const _columns: MRT_ColumnDef<any>[] = []
        data.forEach((el) => {
            for (const key in el) {
                const column = { header: key, accessorKey: key }
                if (!_columns.some(obj => obj.accessorKey === key)) {
                    _columns.push(column)
                }
            }
        })
        setColumns(_columns)
    }, [data])

    const table = useMantineReactTable({
        columns,
        data,
    });

    return <NodeViewWrapper>
        <MantineProvider>
            <MantineReactTable table={table} />
        </MantineProvider>
        <NodeViewContent />
    </NodeViewWrapper>
}