import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { StyledInput, StyledSelect } from "./styles";
import rowData from "./data.json";
import { formatCurrency } from "./utils";
import SearchBar from "./components/SearchBar";

type Row = {
  id: number;
  first_name: string;
  last_name: string;
  ip_address: string;
  balance: number;
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [visibleIPs, setVisibleIPs] = useState<{[key: string]: boolean}>({});
  const [selectedOption, setSelectedOption] =
    useState<(typeof columnDefs)[number]["field"]>("id");

  // filtering should happen from the values in rowData, use the option to filter the desired column based on the user search.
  // colDefs should be dynamic, same work you do to the options can be done to it.
  // to style the input, you can just pass a prop similar

  const filteredData = useMemo(() => {
    return rowData.filter((row: Row) => {
      if (selectedOption in row) {
        return String(row[selectedOption as keyof Row]).toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
  }, [rowData, selectedOption, search]);


  const toggleIPVisibility = (id: string) => {
    setVisibleIPs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const columnDefs = [
    { field: "id" },
    { field: "first_name" },
    { field: "last_name", onCellClicked: (e) => console.log("here", e) },
    {
      field: "ip_address",
      cellRenderer: (params) => {
        const isVisible = visibleIPs[params.node.id];
        return isVisible ? params.value : "••••••••";
      },
      onCellClicked: (params) => {
        toggleIPVisibility(params.node.id);
        console.log(params.node.id);
      },
    },
    { field: "balance", valueFormatter: (p: { value: number }) => formatCurrency(p.value) }, 
  ];

  const defaultColDef = {
    flex: 1,
  };

  // const getDropdownOptions = useMemo(() => {
  //   return columnDefs.map((col) => ({
  //     label: col.field,
  //     value: col.field
  //   }));
  // }, [columnDefs]);

  const options = useMemo(() => {
    const opt: {
      label: string;
      value: string;
    }[] = [];

    rowData.map((row: Row) => {
      return Object.entries(row).map((e) => {
        const [label] = e;

        if (!opt.some(item => item.label === label)) {
          opt.push({
            label,
            value: label,
          });
        }
      });
    });

    return opt;
  }, [rowData]);

  return (
    <div
      className="ag-theme-quartz"
      style={{
        height: 500,
      }}
    >
      <StyledInput
        $yourProp={true}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <StyledSelect
        value={selectedOption}
        onChange={(e) => setSelectedOption(e as string)}
        options={options}
      >
      </StyledSelect>
      <AgGridReact 
        defaultColDef={defaultColDef} 
        rowData={filteredData} 
        columnDefs={columnDefs} 
      />
    </div>
  );
}

export default App;
