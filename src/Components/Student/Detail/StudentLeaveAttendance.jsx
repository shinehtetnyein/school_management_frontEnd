import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Tabs,
  Tab,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from "@mui/material";
import {
  CalendarTodayOutlined,
  Close as CloseIcon,
  CheckCircleOutline,
  HighlightOff,
  AccessTime,
  EventBusy,
  Refresh,
  FileDownloadOutlined,
  KeyboardArrowDown,
} from "@mui/icons-material";
import TableComponent from "../../../Reuseable/TableComponent"; // Your existing path

// --- Mock Data: Leaves ---
const leaveSummary = [
  { type: "Medical Leave", used: 5, available: 5, total: 10 },
  { type: "Casual Leave", used: 1, available: 11, total: 12 },
  { type: "Maternity Leave", used: 0, available: 10, total: 10 },
  { type: "Paternity Leave", used: 0, available: 0, total: 0 },
];

const leaveHistory = [
  {
    id: 1,
    type: "Medical Leave",
    date: "05 May 2024 - 09 May 2024",
    days: 5,
    appliedOn: "05 May 2024",
    status: "Approved",
  },
  {
    id: 2,
    type: "Casual Leave",
    date: "07 May 2024 - 07 May 2024",
    days: 1,
    appliedOn: "07 May 2024",
    status: "Approved",
  },
  {
    id: 3,
    type: "Special Leave",
    date: "09 May 2024 - 09 May 2024",
    days: 1,
    appliedOn: "09 May 2024",
    status: "Pending",
  },
  {
    id: 4,
    type: "Casual Leave",
    date: "08 May 2024 - 08 May 2024",
    days: 1,
    appliedOn: "04 May 2024",
    status: "Approved",
  },
  {
    id: 5,
    type: "Medical Leave",
    date: "08 May 2024 - 11 May 2024",
    days: 4,
    appliedOn: "08 May 2024",
    status: "Pending",
  },
  {
    id: 6,
    type: "Casual Leave",
    date: "20 May 2024 - 20 May 2024",
    days: 1,
    appliedOn: "19 May 2024",
    status: "Pending",
  },
];

// --- Mock Data: Attendance Matrix Generator ---
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const daysInMonth = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);

// Helper to get random status for the grid
const getRandomStatus = () => {
  const statuses = [
    "present",
    "present",
    "present",
    "absent",
    "late",
    "halfday",
    "holiday",
    null,
    null,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Generate 31 rows of data
const attendanceMatrix = daysInMonth.map((day) => {
  const row = { id: day, day }; // Add id for TableComponent
  months.forEach((month) => {
    row[month] = getRandomStatus();
  });
  return row;
});

// Columns for the Attendance TableComponent
const attendanceColumns = [
  {
    Header: "Date | Month",
    accessor: "day",
    Cell: ({ value }) => (
      <Typography variant="body2" sx={{ fontWeight: 500, minWidth: "120px" }}>
        {value}
      </Typography>
    ),
  },
  ...months.map((month) => ({
    Header: month.toLowerCase(),
    accessor: month,
    Cell: ({ value }) => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AttendancePill status={value} />
      </Box>
    ),
  })),
];

// Attendance Summary Cards Data
const attendanceStats = [
  {
    label: "Present",
    count: 265,
    icon: <CheckCircleOutline />,
    color: "#3B82F6",
    bgcolor: "#EFF6FF",
  },
  {
    label: "Absent",
    count: "05",
    icon: <HighlightOff />,
    color: "#EF4444",
    bgcolor: "#FEF2F2",
  },
  {
    label: "Half Day",
    count: "01",
    icon: <AccessTime />,
    color: "#3B82F6",
    bgcolor: "#EFF6FF",
  }, // Using Blue based on image icon
  {
    label: "Late",
    count: "12",
    icon: <EventBusy />,
    color: "#EAB308",
    bgcolor: "#FEFCE8",
  },
];

// --- Helper Components ---

const SummaryCard = ({ title, used, available, total }) => (
  <Card sx={{ height: "100%", borderRadius: "8px" }}>
    <CardContent sx={{ p: 2.5 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title} ({total})
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Used : <span style={{ fontWeight: 600, color: "#000" }}>{used}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available :{" "}
          <span style={{ fontWeight: 600, color: "#000" }}>{available}</span>
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const AttendanceStatCard = ({ label, count, icon, color, bgcolor }) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: "8px",
      boxShadow: "none",
      border: "1px solid #E5E7EB",
      p: 1,
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        "&:last-child": { pb: 2 },
      }}
    >
      <Box
        sx={{
          bgcolor: bgcolor,
          color: color,
          borderRadius: "8px",
          width: 48,
          height: 48,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {count}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const StatusChip = ({ status }) => {
  let bgcolor = "#e0e0e0";
  let textColor = "#000";

  if (status === "Approved") {
    bgcolor = "#ECFDF5";
    textColor = "#059669";
  } else if (status === "Pending") {
    bgcolor = "#FFF0F0";
    textColor = "#E63946";
  }

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: bgcolor,
        color: textColor,
        fontWeight: 600,
        fontSize: "0.75rem",
        height: 24,
        "& .MuiChip-label": { px: 1.5 },
      }}
    />
  );
};

// Component for the colored pill in the matrix
const AttendancePill = ({ status }) => {
  if (!status) return null;

  let color = "transparent";
  // Colors picked from your screenshot
  switch (status) {
    case "present":
      color = "#22C55E";
      break; // Green
    case "absent":
      color = "#EF4444";
      break; // Red
    case "late":
      color = "#0EA5E9";
      break; // Light Blue
    case "halfday":
      color = "#1E3A8A";
      break; // Dark Blue/Navy
    case "holiday":
      color = "#3B82F6";
      break; // Blue
    default:
      color = "#E5E7EB";
  }

  return (
    <Box
      sx={{
        width: "6px",
        height: "18px",
        bgcolor: color,
        borderRadius: "10px",
        margin: "0 auto",
      }}
    />
  );
};

const StudentLeaveAttendance = () => {
  const [subTabValue, setSubTabValue] = useState(0);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [leaveType, setLeaveType] = useState("Medical Leave");

  // State for "This Year" Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const openYearMenu = Boolean(anchorEl);
  const handleYearMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleYearMenuClose = () => setAnchorEl(null);

  const handleSubTabChange = (event, newValue) => setSubTabValue(newValue);
  const handleOpenDialog = () => setOpenLeaveDialog(true);
  const handleCloseDialog = () => {
    setOpenLeaveDialog(false);
    setLeaveType("Medical Leave");
  };

  const handleLeaveTypeChange = (event) => setLeaveType(event.target.value);

  return (
    <Box sx={{ borderRadius: "8px", width: "113%" }}>
      {/* 1. Top Sub-Tabs */}
      <Card sx={{ mb: 3, backgroundColor: "white", borderRadius: "8px" }}>
        <Tabs
          value={subTabValue}
          onChange={handleSubTabChange}
          sx={{
            p: 2,
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          <Tab
            label="Leaves"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              textTransform: "none",
              fontSize: "13px",
              minHeight: 20,
              borderRadius: "8px",
              px: 3,
              mr: 2,
              color: subTabValue === 0 ? "white" : "text.primary",
              bgcolor: subTabValue === 0 ? "primary.main" : "transparent",
              "&.Mui-selected": { color: "white" },
              "&:hover": {
                bgcolor: subTabValue === 0 ? "primary.dark" : "action.hover",
              },
            }}
          />
          <Tab
            label="Attendance"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              textTransform: "none",
              fontSize: "13px",
              minHeight: 20,
              borderRadius: "8px",
              px: 3,
              color: subTabValue === 1 ? "white" : "text.primary",
              bgcolor: subTabValue === 1 ? "primary.main" : "transparent",
              "&.Mui-selected": { color: "white" },
              "&:hover": {
                bgcolor: subTabValue === 1 ? "primary.dark" : "action.hover",
              },
            }}
          />
        </Tabs>
      </Card>

      {/* --- LEAVES CONTENT --- */}
      {subTabValue === 0 && (
        <Box>
          {/* Summary Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {leaveSummary.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <SummaryCard
                  title={item.type}
                  used={item.used}
                  available={item.available}
                  total={item.total}
                />
              </Grid>
            ))}
          </Grid>

          {/* Table */}
          <Card sx={{ borderRadius: "8px" }}>
            <CardContent sx={{ pt: 3, pb: 3, px: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  px: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Leaves
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<CalendarTodayOutlined />}
                  onClick={handleOpenDialog}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Apply Leave
                </Button>
              </Box>
              <Divider />
              <TableComponent
                columns={[
                  { Header: "Leave Type", accessor: "type" },
                  { Header: "Leave Date", accessor: "date" },
                  { Header: "No of Days", accessor: "days" },
                  { Header: "Applied On", accessor: "appliedOn" },
                  {
                    Header: "Status",
                    accessor: "status",
                    Cell: ({ value }) => <StatusChip status={value} />,
                  },
                ]}
                data={leaveHistory}
                title=""
                selectable={false}
              />
            </CardContent>
          </Card>
        </Box>
      )}

      {/* --- ATTENDANCE CONTENT --- */}
      {subTabValue === 1 && (
        <Box>
          {/* 1. Header & Stats Section */}
          <Card
            sx={{
              mb: 3,
              borderRadius: "8px",
              backgroundColor: "white",
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Attendance
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Last Updated on : 25 May 2024
                </Typography>
                <IconButton
                  color="primary"
                  size="small"
                  sx={{ bgcolor: "#eff6ff" }}
                >
                  <Refresh fontSize="small" />
                </IconButton>
                <Button
                  variant="outlined"
                  startIcon={<CalendarTodayOutlined />}
                  color="inherit"
                  sx={{ textTransform: "none", borderColor: "#E5E7EB" }}
                >
                  Year : 2024 / 2025
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 3, ml: -3, mr: -3 }} />

            <Grid container spacing={2}>
              {attendanceStats.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <AttendanceStatCard {...stat} />
                </Grid>
              ))}
            </Grid>
          </Card>

          {/* 2. Main Matrix Card */}
          <Card
            sx={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header of the Card */}
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Leave & Attendance
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={handleYearMenuClick}
                  startIcon={<CalendarTodayOutlined />}
                  endIcon={<KeyboardArrowDown />}
                  sx={{
                    textTransform: "none",
                    borderColor: "divider",
                    color: "text.secondary",
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 2,
                    "&:hover": {
                      borderColor: "primary.main",
                      bgcolor: "background.paper",
                    },
                  }}
                >
                  This Year
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={openYearMenu}
                  onClose={handleYearMenuClose}
                  MenuListProps={{ "aria-labelledby": "year-button" }}
                >
                  <MenuItem onClick={handleYearMenuClose}>This Year</MenuItem>
                  <MenuItem onClick={handleYearMenuClose}>This Week</MenuItem>
                  <MenuItem onClick={handleYearMenuClose}>This Month</MenuItem>
                </Menu>
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<FileDownloadOutlined />}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#F3F4F6",
                    boxShadow: "none",
                  }}
                >
                  Export
                </Button>
              </Box>
            </Box>

            {/* Legend / Filters */}
            <Box
              sx={{
                px: 3,
                pb: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              {[
                {
                  label: "Present",
                  color: "#22C55E",
                  icon: <CheckCircleOutline fontSize="inherit" />,
                },
                {
                  label: "Absent",
                  color: "#EF4444",
                  icon: <HighlightOff fontSize="inherit" />,
                },
                {
                  label: "Late",
                  color: "#0EA5E9",
                  icon: <AccessTime fontSize="inherit" />,
                },
                {
                  label: "Halfday",
                  color: "#1E3A8A",
                  icon: <CalendarTodayOutlined fontSize="inherit" />,
                },
                {
                  label: "Holiday",
                  color: "#3B82F6",
                  icon: <CalendarTodayOutlined fontSize="inherit" />,
                },
              ].map((item, idx) => (
                <Button
                  key={idx}
                  variant="outlined"
                  startIcon={item.icon}
                  sx={{
                    textTransform: "none",
                    color: "#374151",
                    borderColor: "#E5E7EB",
                    fontWeight: 500,
                    minWidth: "auto",
                    "& .MuiButton-startIcon": { color: item.color },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Matrix Table */}
            <TableComponent
              columns={attendanceColumns}
              data={attendanceMatrix}
              title=""
              selectable={false}
            />
          </Card>
        </Box>
      )}

      {/* --- Apply Leave Dialog --- */}
      <Dialog
        open={openLeaveDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          Apply Leave
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Leave Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Leave Type
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={leaveType}
                onChange={handleLeaveTypeChange}
              >
                <MenuItem value="Medical Leave">Medical Leave</MenuItem>
                <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Leave From date
              </Typography>
              <TextField
                fullWidth
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Leave to Date
              </Typography>
              <TextField
                fullWidth
                type="date"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl>
                <FormLabel
                  sx={{
                    color: "text.primary",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    mb: 0.5,
                  }}
                >
                  Leave Days
                </FormLabel>
                <RadioGroup row defaultValue="Full Day">
                  <FormControlLabel
                    value="Full Day"
                    control={<Radio />}
                    label="Full Day"
                  />
                  <FormControlLabel
                    value="First Half"
                    control={<Radio />}
                    label="First Half"
                  />
                  <FormControlLabel
                    value="Second Half"
                    control={<Radio />}
                    label="Second Half"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                No of Days
              </Typography>
              <TextField fullWidth size="small" placeholder="0" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Reason
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Enter reason here..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              bgcolor: "#f3f4f6",
              color: "#000",
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#e5e7eb" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Apply Leave
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentLeaveAttendance;
