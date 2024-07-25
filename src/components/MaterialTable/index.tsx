import { useMemo } from "react";
import {
    MaterialReactTable,
    MRT_ColumnDef,
    MRT_RowData,
    useMaterialReactTable,
} from "material-react-table";
import { SchemaItemType } from "../../mock/tableData";
import { MaterialReactTableType } from "../utils";

const MaterialTable: React.FunctionComponent<MaterialReactTableType> = ({
    schemaData,
    data,
}: MaterialReactTableType) => {
    const tableData = useMemo(() => {
        return data || [];
    }, [data]);

    const columns = useMemo<MRT_ColumnDef<MRT_RowData>[]>(
        () =>
            schemaData.map((schemaItem: SchemaItemType) => {
                return {
                    accessorKey: schemaItem.id,
                    header: schemaItem.title,
                };
            }),
        [schemaData]
    );

    const table = useMaterialReactTable({
        columns,
        data: tableData,
        enableRowSelection: true,
        paginationDisplayMode: "pages",
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
            showGlobalFilter: true,
        },
    });

    return <MaterialReactTable table={table} />;
};

export default MaterialTable;
