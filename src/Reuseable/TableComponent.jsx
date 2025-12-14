import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Checkbox,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

/**
 * A generic comparator function for sorting in descending order.
 *  a The first object to compare.
 *  b The second object to compare.
 *  orderBy The property to sort by.
 *  -1, 1, or 0 for sorting.
 */
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Returns a comparator function based on the desired order.
 *  'desc'} order The sort order.
 *  orderBy The property to sort by.
 *   A comparator function for Array.prototype.sort().
 */
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Sorts an array stably. This means if two elements have the same value for the sorting key,
 * their original relative order is preserved.
 *  array The array to be sorted.
 *  comparator The comparator function to use for sorting.
 *  The stably sorted array.
 */
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

/**
 * A toolbar component that is displayed at the top of the table.
 * It shows the table title and a search bar by default. When items are selected,
 * it shows the number of selected items and a delete action button.
 *  props The component props.
 *  props.numSelected The number of currently selected rows.
 *  props.onDelete The function to call when the delete button is clicked.
 *  props.title The title of the table.
 */
const EnhancedTableToolbar = ({
  numSelected,
  onDelete,
  title,
  filterText,
  onFilterChange,
  showSearch,
}) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 3 }, // Adjusted padding
        pr: { xs: 3, sm: 3 }, // Adjusted padding
        borderRadius: "8px",
        bgcolor: "#ffffff",
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
        pt: 0, // Toolbar is now inside the card content flow
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        title && (
          <Typography
            sx={{
              flex: "1 1 100%",
              fontWeight: 700,
              fontSize: "1.125rem",
              color: "text.primary",
              pl: 1,
            }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : showSearch ? (
        <TextField
          variant="standard"
          value={filterText}
          onChange={onFilterChange}
          placeholder="Search..."
          sx={{
            minWidth: "260px",
            mr: 3,
          }}
          InputProps={{
            startAdornment: <SearchIcon position="start" />,
          }}
        />
      ) : null}
    </Toolbar>
  );
};

/**
 * A reusable and feature-rich table component built with Material-UI.
 * It supports sorting, filtering, row selection, pagination, and custom styling.
 *
 *  props The component props.
 *  props.columns An array of column configuration objects.
 *    Header: The text to display in the column header.
 *    accessor: The key in the data object for this column.
 *    [Cell]: An optional custom render function for the cell.
 * props.data The array of data objects to display in the table. Each object must have a unique `id` property.
 * props.onDeleteSelected A callback function that is called with an array of selected IDs when the delete action is triggered.
 *  props.title The title to display in the toolbar.
 *  [props.getRowStyles] An optional function that receives a row's data and returns a style object for that row.
 */
const TableComponent = ({
  columns,
  data,
  onDeleteSelected,
  title,
  selectable = true,
  showSearch = true,
  // getRowStyles = () => ({}),
}) => {
  // --- STATE MANAGEMENT ---
  // State for sorting
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0]?.accessor || "");

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for row selection
  const [selected, setSelected] = useState([]);

  // State for the search filter text
  const [filterText, setFilterText] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  // --- DATA PROCESSING ---
  const filteredData = data.filter((row) =>
    columns.some((column) => {
      const value = row[column.accessor];
      return (
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    })
  );

  // Get the rows that should be visible on the current page after sorting and filtering
  const currentVisibleRows = stableSort(
    filteredData,
    getComparator(order, orderBy)
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // --- EVENT HANDLERS ---
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = currentVisibleRows.map((n) => n.id);
      // Add the new selections to the existing ones, avoiding duplicates
      setSelected((prevSelected) => [
        ...new Set([...prevSelected, ...newSelecteds]),
      ]);
      return;
    }
    // Remove the visible rows' IDs from the selection
    const visibleIds = currentVisibleRows.map((row) => row.id);
    setSelected((prevSelected) =>
      prevSelected.filter((id) => !visibleIds.includes(id))
    );
  };

  const handleClick = (event, id) => {
    if (!selectable) {
      return;
    }

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleDelete = () => {
    if (onDeleteSelected) {
      onDeleteSelected(selected);
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // const numSelected = selected.length;

  if (!data || data.length === 0) {
    return <p>No data to display</p>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
      }}
    >
      <EnhancedTableToolbar
        numSelected={selected.length}
        onDelete={handleDelete}
        title={title}
        filterText={filterText}
        onFilterChange={handleFilterChange}
        showSearch={showSearch}
      />
      <TableContainer
        sx={{
          maxHeight: 600, // Sets a maximum height for the container
          minHeight: 320, // Ensures a minimum height to prevent layout shifts
          "& .MuiTable-root": { position: "relative" },
          "& .MuiTableHead-root": { position: "sticky", top: 0, zIndex: 1 },
        }}
      >
        <Table
          sx={{
            tableLayout: columns.some((c) => c.width) ? "fixed" : "auto",
            minWidth: "100%",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                "& .MuiTableCell-root": {
                  backgroundColor: "#f3f3f3ff",
                  color: "white",
                },
                "& .MuiTableSortLabel-root, & .MuiTableSortLabel-root:hover, & .MuiTableSortLabel-root.Mui-active":
                  { color: "#000", fontWeight:600},
              }}
            >
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={(() => {
                      const visibleIds = currentVisibleRows.map(
                        (row) => row.id
                      );
                      const selectedOnPage = visibleIds.filter((id) =>
                        selected.includes(id)
                      );
                      return (
                        selectedOnPage.length > 0 &&
                        selectedOnPage.length < visibleIds.length
                      );
                    })()}
                    checked={
                      currentVisibleRows.length > 0 &&
                      currentVisibleRows.every((row) =>
                        selected.includes(row.id)
                      )
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all desserts" }}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  key={column.accessor}
                  sortDirection={orderBy === column.accessor ? order : false}
                  sx={{
                    width: column.width || "auto",
                    maxWidth: column.width || "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === column.accessor}
                    direction={orderBy === column.accessor ? order : "asc"}
                    onClick={() => handleRequestSort(column.accessor)}
                    sx={{ display: "inline-flex", alignItems: "center" }}
                  >
                    {column.Header}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentVisibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              // const customRowStyles = getRowStyles(row);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => {
                    // Prevent row click when clicking on interactive elements like buttons or checkboxes
                    if (event.target.closest("button, input[type='checkbox']"))
                      return;
                    handleClick(event, row.id);
                  }}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  sx={{
                    height: "70px",
                  }}
                  selected={isItemSelected}
                >
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        width: column.width || "auto",
                        maxWidth: column.width || "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {column.Cell
                        ? column.Cell({ value: row[column.accessor], row: row })
                        : row[column.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Custom Pagination Control */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography sx={{ mr: 1, fontSize: "0.875rem" }}>
          Rows per page:
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 70 }} size="small">
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            displayEmpty
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>
        <Typography sx={{ mx: 2 }}>
          Page {page + 1} of {Math.ceil(filteredData.length / rowsPerPage)}
        </Typography>
        <IconButton
          onClick={(e) => handleChangePage(e, page - 1)}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={(e) => handleChangePage(e, page + 1)}
          disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Box>
  );
};
export default TableComponent;
