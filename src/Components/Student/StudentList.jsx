/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useCallback } from "react";
import {
  MenuItem,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
  Menu,
} from "@mui/material";
import {
  FilterList,
  CalendarToday,
  SortByAlpha,
  GridView,
  ViewList,
  Visibility,
} from "@mui/icons-material";
import TableComponent from "../../TableComponent";
import CollectFeesModal from "./CollectFeesModal";
import { useNavigate } from "react-router-dom";
import { mockData } from "../../mockData";

const { students: rows } = mockData;

const StudentList = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [data, setData] = useState(rows);

  const handleViewStudent = useCallback(
    (studentId) => {
      navigate(`/dashboard/students/${studentId}`);
    },
    [navigate]
  );

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
        Cell: ({ row }) => (
          <IconButton
            size="small"
            color="primary"
            onClick={(e) => {
              e.stopPropagation(); // Stop the event from bubbling up to the row
              handleViewStudent(row.id);
            }}
          >
            <Visibility fontSize="small" />
          </IconButton>
        ),
      },
    ],
    [handleViewStudent]
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
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

      <CollectFeesModal
        open={isModalOpen}
        onClose={handleCloseModal}
        student={selectedStudent}
      />
    </Box>
  );
};

export default StudentList;
