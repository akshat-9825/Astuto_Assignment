import { MRT_RowData } from "material-react-table";
import { SchemaItemType } from "../../mock/tableData";

export interface MaterialReactTableType {
    schemaData: SchemaItemType[];
    data: MRT_RowData[];
}