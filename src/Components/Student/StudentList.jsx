/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import {
  MenuItem,
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  TextField,
  IconButton,
  Avatar,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Menu,
} from "@mui/material";
import {
  FilterList,
  CalendarToday,
  SortByAlpha,
  Search,
  GridView,
  ViewList,
  Visibility,
} from "@mui/icons-material";

import CollectFeesModal from "./CollectFeesModal";
import TableComponent from "../../Reuseable/TableComponent";

// --- Mock Data ---
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

/*function EnhancedTableHead(props) {
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
            sx={{ fontWeight: "bold", minWidth: headCell.minWidth }}
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
}*/

// --- The Main Component ---

const StudentList = () => {
  const [view, setView] = useState("list");
  const [data, setData] = useState(rows);
  // State for Table
  const columns = useMemo(
    () => [
      { Header: "Admission No", accessor: "id" },
      { Header: "Roll No", accessor: "rollNo" },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar src={row.avatar} alt={row.name} />
            <Typography variant="body2">{row.name}</Typography>
          </Box>
        ),
      },
      { Header: "Class", accessor: "class" },
      { Header: "Section", accessor: "section" },
      { Header: "Gender", accessor: "gender" },
      { Header: "Status", accessor: "status" },
      { Header: "Date of Join", accessor: "dateOfJoin" },
      { Header: "DOB", accessor: "dob" },
      {
        Header: "Action",
        accessor: "action",
        Cell: () => (
          <IconButton size="small" color="primary">
            <Visibility fontSize="small" />
          </IconButton>
        ),
      },
    ],
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  // --- State and handlers for Export Menu ---
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleExportClose = () => {
    // In a real app, you'd handle the export logic here
    setAnchorEl(null);
  };

  const handleDeleteSelected = (selectedIds) => {
    const newData = data.filter((row) => !selectedIds.includes(row.id));
    setData(newData);
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
          <Button
            id="export-button"
            aria-controls={open ? "export-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleExportClick}
            variant="outlined"
            color="primary"
          >
            Export
          </Button>
          <Menu
            id="export-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleExportClose}
            MenuListProps={{ "aria-labelledby": "export-button" }}
          >
            <MenuItem onClick={handleExportClose}>Export as PDF</MenuItem>
            <MenuItem onClick={handleExportClose}>Export as Excel</MenuItem>
          </Menu>
          <Button variant="contained" color="primary">
            Add Student
          </Button>
        </Box>
      </Box>

      {/* 2. Controls and Table Card */}
      <Box sx={{ p: 2.5, borderRadius: 2, bgcolor: "background.default" }}>
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

        {/* 3. The Table */}
        <TableComponent
          columns={columns}
          data={data}
          onDeleteSelected={handleDeleteSelected}
          title="Students List"
          //getRowStyles={getRowStyling}
        />
      </Box>
      <CollectFeesModal
        open={isModalOpen}
        onClose={handleCloseModal}
        student={selectedStudent}
      />
    </Box>
  );
};

export default StudentList;
