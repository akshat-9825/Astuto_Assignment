import MaterialTable from "./components/MaterialTable";
import { schemaData, tableData } from "./mock/tableData";

function App() {
    return (
        <div className="h-[100vh] p-4 bg-gray-300">
            <div>
                <MaterialTable data={tableData} schemaData={schemaData} />
            </div>
        </div>
    );
}

export default App;
