import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import MainContainer from "../components/MainContainer";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule, SetFilterModule } from "ag-grid-enterprise";
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule]);

export default function EmployeeGrid() {
  const employees = useSelector((state) => state.employee);

  const columnDefs = useMemo(
    () => [
      { headerName: "Name", field: "name", filter: "agTextColumnFilter", },
      { headerName: "Email", field: "email", filter: "agTextColumnFilter", flex: 1, minWidth: 300 },
      { headerName: "Phone", field: "phone", filter: "agTextColumnFilter", flex: 1, minWidth: 300 },
      { headerName: "Role", field: "role", filter: "agTextColumnFilter" },
      { headerName: "Joining Date", field: "joiningDate", filter: "agDateColumnFilter" },
    ],
    []
  );

  return (
    <MainContainer>


      <div className="d-flex justify-content-between mb-3">
        <h2>Employee List</h2>
        <Link to="/create-employee"><button className="btn btn-success">Add</button></Link>
      </div>

      <div className="ag-theme-alpine" style={{ height: "200px" }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={employees}
        />
      </div>


    </MainContainer>
  );
}
