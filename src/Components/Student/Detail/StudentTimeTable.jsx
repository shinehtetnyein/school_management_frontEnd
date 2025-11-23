import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Paper,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  AccessTime,
  CalendarToday,
  KeyboardArrowDown,
} from "@mui/icons-material";

// --- Mock Data ---
const scheduleData = {
  Monday: [
    {
      id: 1,
      time: "09:00 - 09:45 AM",
      subject: "Maths",
      teacher: "Jacquelin",
      avatar: "/path/to/img1.jpg",
      color: "#FFF0F0",
    },
    {
      id: 2,
      time: "09:45 - 10:30 AM",
      subject: "English",
      teacher: "Hellana",
      avatar: "/path/to/img2.jpg",
      color: "#F3F4F6",
    },
    {
      id: 3,
      time: "10:45 - 11:30 AM",
      subject: "History",
      teacher: "Daniel",
      avatar: "/path/to/img3.jpg",
      color: "#ECFDF5",
    },
  ],
  Tuesday: [
    {
      id: 1,
      time: "09:00 - 09:45 AM",
      subject: "Spanish",
      teacher: "Erickson",
      avatar: "/path/to/img4.jpg",
      color: "#E0F2FE",
    },
    {
      id: 2,
      time: "09:45 - 10:30 AM",
      subject: "Physics",
      teacher: "Teresa",
      avatar: "/path/to/img5.jpg",
      color: "#FFFBEB",
    },
    {
      id: 3,
      time: "10:45 - 11:30 AM",
      subject: "Chemistry",
      teacher: "Aaron",
      avatar: "/path/to/img6.jpg",
      color: "#F3E8FF",
    },
  ],
  Wednesday: [
    {
      id: 1,
      time: "09:00 - 09:45 AM",
      subject: "Computer",
      teacher: "Daniel",
      avatar: "/path/to/img3.jpg",
      color: "#ECFDF5",
    },
    {
      id: 2,
      time: "09:45 - 10:30 AM",
      subject: "Science",
      teacher: "Morgan",
      avatar: "/path/to/img7.jpg",
      color: "#E0F7FA",
    },
  ],
  Thursday: [
    {
      id: 1,
      time: "09:00 - 09:45 AM",
      subject: "Physics",
      teacher: "Teresa",
      avatar: "/path/to/img5.jpg",
      color: "#FFFBEB",
    },
    {
      id: 2,
      time: "09:45 - 10:30 AM",
      subject: "Computer",
      teacher: "Daniel",
      avatar: "/path/to/img3.jpg",
      color: "#ECFDF5",
    },
  ],
  Friday: [
    {
      id: 1,
      time: "09:00 - 09:45 AM",
      subject: "English",
      teacher: "Hellana",
      avatar: "/path/to/img2.jpg",
      color: "#F3F4F6",
    },
    {
      id: 2,
      time: "09:45 - 10:30 AM",
      subject: "Spanish",
      teacher: "Erickson",
      avatar: "/path/to/img4.jpg",
      color: "#E0F2FE",
    },
  ],
};

const breaks = [
  { label: "Morning Break", time: "10:30 to 10:45 AM", color: "#3b82f6" },
  { label: "Lunch", time: "12:30 to 01:30 PM", color: "#eab308" },
  { label: "Evening Break", time: "03:30 to 03:45 PM", color: "#0284c7" },
];

// --- Helper Component: Class Card ---
const ClassCard = ({ data }) => (
  <Card
    sx={{
      bgcolor: data.color,
      border: "none",
      boxShadow: "none",
      borderRadius: 2,
      mb: 2,
    }}
  >
    <CardContent sx={{ p: "16px !important" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 1,
          color: "text.secondary",
        }}
      >
        <AccessTime sx={{ fontSize: "16px" }} />
        <Typography variant="body3">{data.time}</Typography>
      </Box>
      <Typography variant="body3" sx={{ mb: 2, color: "text.primary" }}>
        Subject : {data.subject}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          mt: 2,
          p: 0.5,
          pl: 0.5,
          pr: 1.5,
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          borderRadius: 1.5,
          bgcolor: "rgba(255,255,255,0.6)",
        }}
      >
        <Avatar
          src={data.avatar}
          sx={{ width: 24, height: 24, borderRadius: 1 }}
        />
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          {data.teacher}
        </Typography>
      </Paper>
    </CardContent>
  </Card>
);

// --- Helper Component: Break Card ---
const BreakCard = ({ label, time, color }) => (
  <Paper
    variant="outlined"
    sx={{ p: 2, borderRadius: 2, borderColor: "divider" }}
  >
    <Box
      sx={{
        bgcolor: color,
        color: "white",
        py: 0.5,
        px: 1.5,
        borderRadius: 1,
        display: "inline-block",
        fontSize: "0.75rem",
        fontWeight: 600,
        mb: 1.5,
      }}
    >
      {label}
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
      <Typography variant="body2" color="text.secondary">
        {time}
      </Typography>
    </Box>
  </Paper>
);

const StudentTimeTable = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // State for "This Year" Dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Card sx={{ borderRadius: "8px", width: "113%" }}>
      <CardContent sx={{ p: 2 }}>
        {/* --- HEADER SECTION (Title + Button) --- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4, // Spacing below header
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Exam & Result
          </Typography>

          <Box>
            <Button
              variant="outlined"
              onClick={handleClick}
              startIcon={<CalendarToday sx={{ fontSize: 18 }} />}
              endIcon={<KeyboardArrowDown sx={{ fontSize: 18 }} />}
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
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
              <MenuItem onClick={handleClose}>This Year</MenuItem>
              <MenuItem onClick={handleClose}>This Week</MenuItem>
              <MenuItem onClick={handleClose}>This Month</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Divider sx={{ mt: -2, ml: -3, mr: -3, mb: 1.5 }} />

        {/* --- WEEKLY SCHEDULE GRID --- */}
        <Grid container spacing={2}>
          {days.map((day) => (
            <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={day}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                {day}
              </Typography>
              <Box>
                {scheduleData[day]?.map((classInfo) => (
                  <ClassCard key={classInfo.id} data={classInfo} />
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* --- BREAKS SECTION --- */}
        <Box
          sx={{
            mt: 0,
            pt: 3,
          }}
        >
          <Grid container spacing={3}>
            {breaks.map((item, index) => (
              <Grid size={{ xs: 12, sm: 4 }} key={index}>
                <BreakCard
                  label={item.label}
                  time={item.time}
                  color={item.color}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentTimeTable;
