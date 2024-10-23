import { useState, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { 
  StyledInput, 
  StyledSelect, 
  Title, 
  SearchContainer,
  SearchByLabel, 
  ThemeToggle,
  GlobalStyle
} from "./styles";
import rowData from "./data.json";
import { formatCurrency, formatLabel } from "./utils";

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
  const [selectedOption, setSelectedOption] = useState<(typeof columnDefs)[number]["field"]>("first_name");
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  // Dynamically filtering data (using memoization) based on the selected option and search term.
  const filteredData = useMemo(() => {
    return rowData.filter((row: Row) => {
      if (selectedOption && selectedOption in row) {
        return String(row[selectedOption as keyof Row]).toLowerCase().startsWith(search.toLowerCase());
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

  const columnDefs: ColDef[] = [
    { field: "id", headerName: formatLabel("id") },
    { field: "first_name", headerName: formatLabel("first_name") },
    { field: "last_name", headerName: formatLabel("last_name") },
    {
      field: "ip_address", 
      headerName: formatLabel("ip_address"),
      cellRenderer: (params: any) => {
        const isVisible = visibleIPs[params.node.id];
        return isVisible ? params.value : "••••••••";
      },
      onCellClicked: (params: any) => {
        toggleIPVisibility(params.node.id);
        console.log(params.node.id);
      },
    },
    { field: "balance", headerName: formatLabel("balance"), 
      valueFormatter: (p: { value: number }) => formatCurrency(p.value) }, 
  ];


  // Added memoization to improve performance 
  const options = useMemo(() => {
    const opt: {
      label: string;
      value: string;
    }[] = [];

    rowData.forEach((row: Row) => { // Replaced map with forEach for better performance.
      Object.keys(row).forEach((key) => {
        if (!opt.some(item => item.value === key)) {
          opt.push({
            label: formatLabel(key),
            value: key,
          });
        }
      });
    });

    return opt;
  }, [rowData]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const defaultColDef = {
    flex: 1,
  };

  return (
    <>
      <GlobalStyle $isDarkMode={isDarkMode} />
        <Title>User Data Dashboard</Title>
        <SearchContainer>
          <SearchByLabel>Search By:</SearchByLabel>
          <StyledSelect
            value={selectedOption}
            onChange={(e) => setSelectedOption(e as typeof columnDefs[number]["field"])}
            options={options}
          />
          <StyledInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
          <ThemeToggle 
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
        </SearchContainer>
        <div
          className={isDarkMode ? "ag-theme-quartz-dark" : "ag-theme-quartz"}
          style={{
            height: 500,
            width: '100%',
          }}
        >
          <AgGridReact 
            defaultColDef={defaultColDef} 
            rowData={filteredData} 
            columnDefs={columnDefs} 
          />
        </div>
    </>
  );
}

export default App;
