import { useMemo, useState } from "react";
import { MaterialReactTableType } from "../utils";
import {
    flexRender,
    MRT_ColumnDef,
    MRT_RowData,
    MRT_TableBodyCellValue,
    useMaterialReactTable,
} from "material-react-table";
import { SchemaItemType } from "../../mock/tableData";
import {
    Button,
    Pagination,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import styled from "@emotion/styled";

const CustomPagination = styled(Pagination)(() => ({
    "& .MuiPaginationItem-root": {
        "&.Mui-selected": {
            backgroundColor: "#DBEAFE",
            color: "#2563EB",
        },
        "&.Mui-selected:hover": {
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
        },
    },
}));

const CustomMaterialTable: React.FunctionComponent<MaterialReactTableType> = ({
    schemaData,
    data,
}: MaterialReactTableType) => {
    const [page, setPage] = useState(0);
    const pageSize = 5;

    const tableData = useMemo(() => {
        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
    }, [data, page, pageSize]);

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
        initialState: {
            pagination: { pageSize, pageIndex: page },
            showGlobalFilter: true,
        },
        manualPagination: true,
    });

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage - 1);
    };

    const handlePrevButton = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNextButton = () => {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    const totalPages = Math.ceil(data.length / pageSize);

    return (
        <TableContainer
            className="bg-white shadow-xl"
            sx={{ borderRadius: "4px" }}
        >
            <Table>
                <TableHead className="bg-gray-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell
                                    align="left"
                                    variant="head"
                                    sx={{ fontWeight: 600 }}
                                    key={header.id}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.Header ??
                                                  header.column.columnDef
                                                      .header,
                                              header.getContext()
                                          )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <TableRow key={row.id} selected={row.getIsSelected()}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    align="left"
                                    variant="body"
                                    key={cell.id}
                                >
                                    <MRT_TableBodyCellValue
                                        cell={cell}
                                        table={table}
                                        staticRowIndex={rowIndex}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="p-1 flex flex-row items-center justify-between rounded-b">
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        bgcolor: "white",
                        color: "black",
                        boxShadow: "none !important",
                        "&:hover": {
                            bgcolor: "unset !important",
                        },
                    }}
                    startIcon={
                        <Radio
                            disabled={page === 0}
                            checked={false}
                            onClick={handlePrevButton}
                        />
                    }
                >
                    Prev
                </Button>
                <CustomPagination
                    count={totalPages}
                    page={page + 1}
                    onChange={handleChangePage}
                    shape="rounded"
                    color="primary"
                    hidePrevButton
                    hideNextButton
                />
                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        bgcolor: "white",
                        color: "black",
                        boxShadow: "none !important",
                        "&:hover": {
                            bgcolor: "unset !important",
                        },
                    }}
                    endIcon={
                        <Radio
                            disabled={page === totalPages - 1}
                            checked={false}
                            onClick={handleNextButton}
                        />
                    }
                >
                    Next
                </Button>
            </div>
        </TableContainer>
    );
};

export default CustomMaterialTable;
