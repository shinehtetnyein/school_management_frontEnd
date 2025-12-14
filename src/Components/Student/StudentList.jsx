/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useCallback, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  FilterList,
  CalendarToday,
  SortByAlpha,
  GridView,
  ViewList,
  Visibility,
} from "@mui/icons-material";

import CollectFeesModal from "./CollectFeesModal";
import AddStudentFormDialog from "./AddStudentFormDialog";
import TableComponent from "../../Reuseable/TableComponent";
import { useNavigate } from "react-router-dom";
import DataServices from "../../services/data-services";
import Configuration from "../../services/configuration";
import { mockData } from "../../mockData";

// Adding dummy data for the StudentList component
const rows = mockData?.students || [];

const StudentList = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [data, setData] = useState(rows);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const dataService = new DataServices();
  const config = new Configuration();

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dataService.retrieve(
        config.SERVICE_NAME + config.SERVICE_ACTION_STUDENTS
      );
      const list = res?.data || res || [];

      const students = Array.isArray(list)
        ? list
        : list.students || list.data || [];

      const mapped = students.map((s) => ({
        id: s.id,
        rollNo: s.roll_no || "",
        name: s.name || `${s.first_name || ""} ${s.last_name || ""}`.trim(),
        avatar: s.profile_photo || "/static/images/avatar/1.jpg",
        class:
          s.courses && s.courses.length
            ? s.courses[0].name
            : s.classrooms && s.classrooms.length
            ? s.classrooms[0].room_number
            : "N/A",
        section: s.sections && s.sections.length ? s.sections[0].name : "N/A",
        gender: s.gender || "",
        status: s.status || "",
        dateOfJoin:
          s.enrollment_date || (s.created_at ? s.created_at.split("T")[0] : ""),
        dob: s.date_of_birth || "",
      }));

      setData(mapped);
    } catch (err) {
      console.error("Failed to fetch students", err);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchStudents();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleViewStudent = useCallback(
    (studentId) => {
      navigate(`/students/${studentId}`);
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddDialog(true)}
          >
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
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ mt: 2 }}>
          <Alert severity="error">
            {error} <Button onClick={fetchStudents}>Retry</Button>
          </Alert>
        </Box>
      ) : (
        <TableComponent
          columns={columns}
          data={data}
          onDeleteSelected={handleDeleteSelected}
          title="Students List"
        />
      )}

      <AddStudentFormDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSuccess={() => {
          setOpenAddDialog(false);
          fetchStudents();
        }}
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
