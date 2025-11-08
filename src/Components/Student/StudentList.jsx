import { useState } from "react";
import {
  MenuItem,
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Paper,
  TextField,
  IconButton,
  Avatar,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import {
  FilterList,
  CalendarToday,
  SortByAlpha,
  Search,
  GridView,
  ViewList,
  MessageOutlined,
  CallOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";

// --- Mock Data ---
// (Same as before, but I've added a unique 'id' for sorting)
const rows = [
  {
    id: "AD9892434",
    rollNo: 35013,
    name: "Janet",
    avatar: "/path/to/janet.png",
    class: "III",
    section: "A",
    gender: "Female",
    status: "Active",
    dateOfJoin: "25 Mar 2024",
    dob: "10 Jan 2015",
  },
  {
    id: "AD9892433",
    rollNo: 35013,
    name: "Joann",
    avatar: "/path/to/joann.png",
    class: "IV",
    section: "B",
    gender: "Male",
    status: "Active",
    dateOfJoin: "18 Mar 2024",
    dob: "19 Aug 2014",
  },
  {
    id: "AD9892432",
    rollNo: 35011,
    name: "Kathleen",
    avatar: "/path/to/kathleen.png",
    class: "II",
    section: "A",
    gender: "Female",
    status: "Active",
    dateOfJoin: "14 Mar 2024",
    dob: "05 Dec 2017",
  },
  {
    id: "AD9892431",
    rollNo: 35010,
    name: "Gifford",
    avatar: "/path/to/gifford.png",
    class: "I",
    section: "B",
    gender: "Male",
    status: "Active",
    dateOfJoin: "27 Feb 2024",
    dob: "22 Mar 2018",
  },
  {
    id: "AD9892430",
    rollNo: 35009,
    name: "Lisa",
    avatar: "/path/to/lisa.png",
    class: "II",
    section: "B",
    gender: "Female",
    status: "Inactive",
    dateOfJoin: "13 Feb 2024",
    dob: "13 May 2017",
  },
  {
    id: "AD9892429",
    rollNo: 35008,
    name: "Ralph",
    avatar: "/path/to/ralph.png",
    class: "III",
    section: "B",
    gender: "Male",
    status: "Active",
    dateOfJoin: "11 Feb 2024",
    dob: "20 Jun 2015",
  },
];

// --- Sorting Helper Functions ---

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Stable sort preserves original order of equal elements
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// --- Table Header ---
// Column definitions
const headCells = [
  { id: "id", label: "Admission No" },
  { id: "rollNo", label: "Roll No" },
  { id: "name", label: "Name" },
  { id: "class", label: "Class" },
  { id: "section", label: "Section" },
  { id: "gender", label: "Gender" },
  { id: "status", label: "Status" },
  { id: "dateOfJoin", label: "Date of Join" },
  { id: "dob", label: "DOB" },
  { id: "action", label: "Action", sortable: false },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ bgcolor: "#f5f7fa" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all students" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold" }}
          >
            {headCell.sortable === false ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// --- The Main Component ---

const StudentList = () => {
  const [view, setView] = useState("list");

  // State for Table
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Matches your image's default

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // Replicates the "Row Per Page" select from your image
  const handleRowsPerPageSelectChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* 1. Header and Breadcrumbs (Same as before) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            Students List
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button variant="outlined" color="primary">
            Export
          </Button>
          <Button variant="contained" color="primary">
            Add Student
          </Button>
        </Box>
      </Box>

      {/* 2. Controls and Table Card */}
      <Paper sx={{ p: 2.5, borderRadius: 2 }}>
        {/* Top Controls (Same as before) */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
              sx: { bgcolor: "background.paper", borderRadius: 1.5 },
            }}
          />
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <TextField
              size="small"
              defaultValue="2025/10/31 - 2025/11/06"
              InputProps={{
                startAdornment: (
                  <CalendarToday
                    sx={{ mr: 1, color: "action.active", fontSize: "18px" }}
                  />
                ),
              }}
              sx={{
                "& .MuiInputBase-root": {
                  width: "245px",
                  bgcolor: "background.paper",
                  borderRadius: "8px",
                },
              }}
            />
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FilterList />}
              sx={{ bgcolor: "background.paper" }}
            >
              Filter
            </Button>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              size="small"
            >
              <ToggleButton value="list">
                <ViewList />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridView />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<SortByAlpha />}
              sx={{ bgcolor: "background.paper" }}
            >
              Sort by A-Z
            </Button>
          </Box>
        </Box>

        {/* Bottom Controls (Using the Select from your image) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* This is the custom "Row Per Page" select from your image */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">Row Per Page</Typography>
            <TextField
              select
              size="small"
              value={rowsPerPage}
              onChange={handleRowsPerPageSelectChange}
              sx={{ bgcolor: "background.paper" }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </TextField>
            <Typography variant="body2">Entries</Typography>
          </Box>
        </Box>

        {/* 3. The Table */}
        <TableContainer
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "8px",
          }}
        >
          <Table>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ "& td": { border: 0 } }} // Replicates the clean look
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>

                      {/* Data Cells */}
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.rollNo}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <Avatar src={row.avatar} alt={row.name} />
                          <Typography variant="body2">{row.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.class}</TableCell>
                      <TableCell>{row.section}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          size="small"
                          color={row.status === "Active" ? "success" : "error"}
                          variant="outlined"
                          sx={{
                            bgcolor:
                              row.status === "Active"
                                ? "rgba(46, 125, 50, 0.1)"
                                : "rgba(211, 47, 47, 0.1)",
                            borderColor:
                              row.status === "Active"
                                ? "rgba(46, 125, 50, 0.4)"
                                : "rgba(211, 47, 47, 0.4)",
                            color:
                              row.status === "Active"
                                ? "success.dark"
                                : "error.dark",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.dateOfJoin}</TableCell>
                      <TableCell>{row.dob}</TableCell>
                      <TableCell>
                        <Box>
                          <IconButton size="small" color="primary">
                            <MessageOutlined fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="success">
                            <CallOutlined fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="default">
                            <VisibilityOutlined fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 4. Table Pagination */}
        {/* This component provides the "1-10 of 6" and page-turning arrows */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // This hides the built-in "Rows per page" selector
          // so we can use the custom one you had in your image.
          // To use the built-in one, remove this line and the custom Select field above.
          labelRowsPerPage=""
          sx={{
            "& .MuiTablePagination-selectLabel": { display: "none" },
            "& .MuiTablePagination-input": { display: "none" },
          }}
        />
      </Paper>
    </Box>
  );
};

export default StudentList;
