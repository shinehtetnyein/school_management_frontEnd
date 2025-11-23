import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Breadcrumbs,
  Link,
  Button,
  Tabs,
  Tab,
  Stack,
  Divider,
} from "@mui/material";
import {
  Edit,
  Phone,
  Email,
  Apartment,
  PersonOutline,
  CalendarTodayOutlined,
  CheckCircleOutline,
  MonetizationOnOutlined,
  AssessmentOutlined,
  LocalLibraryOutlined,
  FiberManualRecord,
} from "@mui/icons-material";

// Import the new component
import StudentDetail from "./StudentDetail";

// Import directly from the centralized mock data file
import { mockData } from "../../../mockData";
import StudentTimeTable from "./StudentTimeTable";
import StudentLeaveAttendance from "./StudentLeaveAttendance";

const { students: rows } = mockData;

// --- Helper Components ---
// Helper for Key-Value pairs seen in "Basic Info"
const InfoItem = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1.2,
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "right" }}>
      {value}
    </Typography>
  </Box>
);

// --- Main Detail Page Component ---

const StudentDetailPage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for the main content tabs
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // State for the Hostel/Transportation tabs
  const [transportTabValue, setTransportTabValue] = useState(0);

  useEffect(() => {
    const foundStudent = rows.find((row) => row.id === studentId);
    if (foundStudent) {
      setStudent(foundStudent);
    }
    setLoading(false);
  }, [studentId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!student) {
    return <Typography>Student not found</Typography>;
  }

  return (
    <Box sx={{ p: 3, bgcolor: "background.secondary", minHeight: "100vh" }}>
      {/* 1. Header with Breadcrumbs and Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Student Details
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" separator="/">
            <Link
              component={RouterLink}
              underline="hover"
              color="inherit"
              to="/dashboard/students"
            >
              Student
            </Link>
            <Typography color="text.primary">Student Details</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button variant="outlined" color="primary">
            Login Details
          </Button>
          <Button variant="contained" color="primary" startIcon={<Edit />}>
            Edit Student
          </Button>
        </Box>
      </Box>

      {/* 2. Main Two-Column Layout */}
      <Grid container spacing={3}>
        {/* --- LEFT COLUMN (Sidebar) --- */}
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack spacing={3}>
            {/* Student Info Card */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Avatar
                    src={student.avatar || "/path/to/janet.png"}
                    alt={student.name}
                    sx={{ width: 70, height: 70, borderRadius: 1 }}
                  />
                  <Box>
                    <Chip
                      icon={
                        <FiberManualRecord
                          sx={{ fontSize: "8px !important" }}
                        />
                      }
                      label={student.status || "Active"}
                      size="small"
                      sx={{
                        height: 24,
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        mb: 1,
                        border: "none",
                        borderRadius: 1,
                        ...(student.status === "Inactive"
                          ? { bgcolor: "#f3f4f6", color: "#4b5563" }
                          : { bgcolor: "#ecfdf5", color: "#059669" }),
                        "& .MuiChip-icon": { color: "inherit", ml: "8px" },
                        "& .MuiChip-label": { pl: "6px", pr: "10px" },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="h6" sx={{ lineHeight: 1 }}>
                        {student.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="primary.secondary">
                      {student.id}
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ ml: -3, mr: -3 }} />
                {/* Body Section: Basic Information */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Basic Information
                  </Typography>
                  <InfoItem label="Roll No" value={student.rollNo} />
                  <InfoItem label="Gender" value={student.gender} />
                  <InfoItem label="Date of Birth" value={student.dob} />
                  <InfoItem label="Blood Group" value="O +ve" />
                  <InfoItem label="Religion" value="Christianity" />
                  <InfoItem label="Caste" value="Catholic" />
                  <InfoItem label="Category" value="OBC" />
                  <InfoItem label="Mother tongue" value="English" />
                  <InfoItem
                    label="Language"
                    value={
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Chip label="English" size="small" />
                        <Chip label="Spanish" size="small" />
                      </Stack>
                    }
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, textTransform: "none", borderRadius: "8px" }}
                >
                  Add Fees
                </Button>
              </CardContent>
            </Card>

            {/* Primary Contact Info Card */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 600 }}>
                  Primary Contact Info
                </Typography>
                <Stack spacing={2.5}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        bgcolor: "#F9FAFB",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6B7280",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <Phone fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Phone Number
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        +1 46548 84498
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        bgcolor: "#F9FAFB",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6B7280",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <Email fontSize="small" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Email Address
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        jan@example.com
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Sibling Information Card */}
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 600 }}>
                  Sibling Information
                </Typography>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      bgcolor: "#F9FAFB",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <Avatar
                      src="/path/to/ralph.png"
                      variant="rounded"
                      sx={{ width: 48, height: 48, borderRadius: 1.5 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                      >
                        Ralph Claudia
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Class III, B
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#F9FAFB",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <Avatar
                      src="/path/to/julie.png"
                      variant="rounded"
                      sx={{ width: 48, height: 48, borderRadius: 1.5 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, fontSize: "0.95rem" }}
                      >
                        Julie Scott
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Class V, A
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Hostel/Transportation Card */}
            <Card>
              <CardContent sx={{ p: 2 }}>
                <Tabs
                  value={transportTabValue}
                  onChange={(e, val) => setTransportTabValue(val)}
                  variant="fullWidth"
                  sx={{
                    mb: 3,
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    },
                  }}
                >
                  <Tab label="Hostel" />
                  <Tab label="Transportation" />
                </Tabs>

                {transportTabValue === 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      px: 1,
                      pb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "#F9FAFB",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6B7280",
                        border: "1px solid #E5E7EB",
                      }}
                    >
                      <Apartment fontSize="small" />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                      >
                        HI-Hostel, Floor
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "primary.main", fontWeight: 500 }}
                      >
                        Room No : 25
                      </Typography>
                    </Box>
                  </Box>
                )}

                {transportTabValue === 1 && (
                  <Box
                    sx={{ py: 2, textAlign: "center", color: "text.secondary" }}
                  >
                    <Typography variant="body2">
                      No transportation details available.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* --- RIGHT COLUMN (Main Content) --- */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ mb: 2, mr: 1, mt: -1.3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab
                icon={<PersonOutline sx={{ fontSize: "1.1rem" }} />}
                iconPosition="start"
                label="Student Details"
                sx={{
                  fontSize: "0.8rem",
                  textTransform: "none",
                  minHeight: "48px",
                }}
              />
              <Tab
                icon={<CalendarTodayOutlined sx={{ fontSize: "1.1rem" }} />}
                iconPosition="start"
                label="Time Table"
                sx={{
                  fontSize: "0.8rem",
                  textTransform: "none",
                  minHeight: "48px",
                }}
              />
              <Tab
                icon={<CheckCircleOutline sx={{ fontSize: "1.1rem" }} />}
                iconPosition="start"
                label="Leave & Attendance"
                sx={{
                  fontSize: "0.8rem",
                  textTransform: "none",
                  minHeight: "48px",
                }}
              />
              <Tab
                icon={<MonetizationOnOutlined sx={{ fontSize: "1.1rem" }} />}
                iconPosition="start"
                label="Fees"
                sx={{
                  fontSize: "0.8rem",
                  textTransform: "none",
                  minHeight: "48px",
                }}
              />
              <Tab
                icon={<AssessmentOutlined sx={{ fontSize: "1.1rem" }} />}
                iconPosition="start"
                label="Exam & Results"
                sx={{
                  fontSize: "0.8rem",
                  textTransform: "none",
                  minHeight: "48px",
                }}
              />
              <Tab
                icon={<LocalLibraryOutlined sx={{ fontSize: "1.1rem" }} />}
                iconPosition="start"
                label="Library"
                sx={{
                  fontSize: "0.8rem",
                  textTransform: "none",
                  minHeight: "48px",
                }}
              />
            </Tabs>
          </Box>

          {/* Tab Panel 1: Student Details */}
          {tabValue === 0 && <StudentDetail />}

          {/* Other Tab Panels (Empty for now) */}
          {tabValue === 1 && <StudentTimeTable />}
          {tabValue === 2 && <StudentLeaveAttendance />}
          {tabValue === 3 && (
            <Box sx={{ p: 3 }}>
              <Typography>Fees content goes here.</Typography>
            </Box>
          )}
          {tabValue === 4 && (
            <Box sx={{ p: 3 }}>
              <Typography>Exam & Results content goes here.</Typography>
            </Box>
          )}
          {tabValue === 5 && (
            <Box sx={{ p: 3 }}>
              <Typography>Library content goes here.</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDetailPage;
