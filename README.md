# Project Overview

This project involves developing a simple React application that displays a table of user data using the `ag-grid-react` library.

## Running the Application

The project can be run locally using `npm run dev` after installing dependencies with `npm install`.

## Features Implemented

1. **Search Capability**:
    - We implement a search bar that filters the data grid as the user types. We include search term as part of the component state and dynamically update our filtering of the row data as it changes. We filter for rows where the search term is a prefix of the selected field value.
    - We implement a dropdown that allows users to choose the field they want to search within. The list of options is determined by the fields found in the row data. We include the selected field as part of the component state and dynamically update our filtering of the row data as it changes. 

2. **Conditional Column Display**:
    - Within our component state, we have a object that tracks which rows have the IP address column visible. It's initialized as empty, meaning we start by hiding all IP address values. Users can click individual cells to toggle the visibility of the IP address column on a per-row basis, updating the state object accordingly.

3. **Cell Formatting**:
    - We use the valueFormatter callback function to format the balance field as currency, leveraging a helper utility function.
    - Column headers/field options are now dynamically labeled using a helper utility function to improve readability.

4. **Styling**:
    - We added extra styling, containers, and labels to improve the layout and readability of the application, particularly for the search bar and dropdown, which now sit side by side.
    - Implemented a dark mode! We use conditional global styling and extra state management to allow for toggling of the theme.

5. **Typescript**:
    - Typescript is used through the project! 

## Design Considerations

### Dropdown Options
Current implementation of determining dropdown options scans across all rows in determining the list of field options. However, this method can impact performance as data scales. Another approach would be to scan only the first row and grab the fields that way. I see considerable merit in executing this field list lookup on the columnDef object, especially considering that the typing for dropdown options is already defined by the fields in columnDef. In this sense, columnDef is treated as the source of truth of the data's schema. It would look something like this: 
```
const options = useMemo(() => {
    return columnDefs.map((col) => ({
      label: formatLabel(col.field),
      value: col.field
    }));
  }, [columnDefs]);

```

### Search Bar and Dropdown Components
I was considering creating a custom child component that would manage the search bar and dropdown. While this may provide greater separation of concern and allow for potential benefits in future extension and re-use, the child component would be tightly coupled to the parent component anyways, especially through state management, and is not worth the added complexity for this simple application. 

### Styling
Styling is always a bit open-ended, and for an app this relatively simple, it can be challenging to think of strong design elements. I focused on providing a functional and simplistic design, but I also added a dark theme to introduce some color variation. I'd love to hear other suggestions for styling here.
