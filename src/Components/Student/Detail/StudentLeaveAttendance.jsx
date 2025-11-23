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
} from "@mui/material";
import { CalendarTodayOutlined } from "@mui/icons-material";
import TableComponent from "../../../Reuseable/TableComponent";

// --- Mock Data ---
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

// --- Helper Component: Summary Card ---
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

// --- Helper Component: Status Chip ---
const StatusChip = ({ status }) => {
  let bgcolor = "#e0e0e0";
  let textColor = "#000";

  if (status === "Approved") {
    bgcolor = "#ECFDF5"; // Light green
    textColor = "#059669"; // Dark green
  } else if (status === "Pending") {
    bgcolor = "#FFF0F0"; // Light red
    textColor = "#E63946"; // Dark red
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

const StudentLeaveAttendance = () => {
  const [subTabValue, setSubTabValue] = useState(0); // 0 for Leaves, 1 for Attendance

  const handleSubTabChange = (event, newValue) => setSubTabValue(newValue);

  return (
    <Box sx={{ borderRadius: "8px", width: "113%" }}>
      {/* 1. Top Sub-Tabs (Leaves / Attendance) */}
      <Card
        sx={{
          mb: 3,
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <Tabs
          value={subTabValue}
          onChange={handleSubTabChange}
          sx={{
            p: 2,
            "& .MuiTabs-indicator": {
              display: "none", // Hide the default underline
            },
          }}
        >
          <Tab
            label="Leaves"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              textTransform: "none",
              fontSize: "13px",
              minHeight: 20, // Smaller height for button look
              borderRadius: "8px", // Rounded corners
              px: 3, // Horizontal padding
              mr: 2, // Space between buttons
              color: subTabValue === 0 ? "white" : "text.primary",
              bgcolor: subTabValue === 0 ? "primary.main" : "transparent",
              "&.Mui-selected": {
                color: "white", // Ensure selected text is white
              },
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
              "&.Mui-selected": {
                color: "white",
              },
              "&:hover": {
                bgcolor: subTabValue === 1 ? "primary.dark" : "action.hover",
              },
            }}
          />
        </Tabs>
      </Card>

      {/* 2. Leaves Content */}
      {subTabValue === 0 && (
        <Box>
          {/* Summary Cards Section */}
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

          {/* Main Card for Table View */}
          <Card sx={{ borderRadius: "8px" }}>
            <CardContent sx={{ pt: 3, pb: 3, px: 0 }}>
              {/* Table Header with "Apply Leave" Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                  px: 3, // Add horizontal padding here instead
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Leaves
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<CalendarTodayOutlined />}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Apply Leave
                </Button>
              </Box>

              <Divider />

              {/* Data Table */}
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
                title="" // Title is handled above the component
                selectable={false}
              />
            </CardContent>
          </Card>
        </Box>
      )}

      {/* 3. Attendance Content (Placeholder) */}
      {subTabValue === 1 && (
        <Box sx={{ p: 3 }}>
          <Typography>Attendance content goes here.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default StudentLeaveAttendance;
