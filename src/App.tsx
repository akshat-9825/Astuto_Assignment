import MaterialTable from "./components/MaterialTable";
import CustomMaterialTable from "./components/CustomMaterialTable";
import { schemaData, tableData } from "./mock/tableData";
import { useState } from "react";
import { Button } from "@mui/material";

function App() {
    const [showStandard, setShowStandard] = useState(false);

    return (
        <div className="h-[100vh] p-4 ">
            <div className="flex justify-between px-8">
                <Button
                    variant="outlined"
                    onClick={() => setShowStandard(true)}
                >
                    Show Standard Table
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => setShowStandard(false)}
                >
                    Show Customized Table
                </Button>
            </div>
            {showStandard ? (
                <div>
                    <div className="text-center mb-4 text-xl font-semibold">
                        Standard Material Table
                    </div>
                    <MaterialTable data={tableData} schemaData={schemaData} />
                </div>
            ) : (
                <div>
                    <div className="text-center mb-4 text-xl font-semibold">
                        Custom Material Table
                    </div>
                    <CustomMaterialTable
                        data={tableData}
                        schemaData={schemaData}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
