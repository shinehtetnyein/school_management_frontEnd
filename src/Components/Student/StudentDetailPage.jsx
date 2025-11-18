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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import {
  Edit,
  Phone,
  Email,
  Home,
  Download,
  Apartment,
  LockPerson,
  PersonOutline,
  CalendarTodayOutlined,
  CheckCircleOutline,
  MonetizationOnOutlined,
  AssessmentOutlined,
  LocalLibraryOutlined,
  FiberManualRecord,
} from "@mui/icons-material";

// Import directly from the centralized mock data file
import { mockData } from "../../mockData";
const { students: rows } = mockData;

// --- Helper Components ---
// Helper for Key-Value pairs seen in "Basic Info", "Bank Details", etc.
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

// NEW Helper for info blocks in cards (Address, School, Bank, etc.)
const InfoBlock = ({ title, content, icon = null }) => (
  <Box>
    <Typography
      variant="subtitle2"
      color="text.secondary"
      sx={{
        display: "flex",
        alignItems: "center",
        mb: icon ? 1 : 0.5, // More space if there's an icon
        gap: 1,
        textTransform: "uppercase",
        fontSize: "0.75rem",
      }}
    >
      {icon}
      {title}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {content}
    </Typography>
  </Box>
);
// NEW Helper for the Document list items
const DocumentItem = ({ name }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 1.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bgcolor: "background.secondary", // This should be your theme's light gray
      borderColor: "divider",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Avatar
        variant="rounded"
        sx={{
          width: 28,
          height: 28,
          bgcolor: "#fff0f0",
          color: "#e63946",
          fontSize: "0.8rem",
          fontWeight: 600,
        }}
      >
        PDF
      </Avatar>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {name}
      </Typography>
    </Box>
    <IconButton
      size="small"
      sx={{
        bgcolor: "#283593", // Dark blue color
        color: "white",
        borderRadius: 1,
        p: 1,
        "&:hover": { bgcolor: "#1a237e" },
      }}
    >
      <Download sx={{ fontSize: "1rem" }} />
    </IconButton>
  </Paper>
);
// Helper for the "Parents Information" card - REDESIGNED
const ParentInfoCard = ({ name, relation, phone, email, avatarSrc }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      gap: 2,
      borderColor: "divider",
    }}
  >
    {/* Column 1: Avatar */}
    <Avatar
      src={avatarSrc}
      variant="rounded"
      sx={{ width: 48, height: 48, borderRadius: 1 }}
    />

    {/* Column 2: Name & Relation */}
    <Box sx={{ flex: 1, minWidth: "120px" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
        {name}
      </Typography>
      <Typography
        variant="body2"
        color="primary"
        sx={{ fontWeight: 500, mt: 0.5 }}
      >
        {relation}
      </Typography>
    </Box>

    {/* Column 3: Phone (Hidden on very small screens) */}
    <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        Phone
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {phone}
      </Typography>
    </Box>

    {/* Column 4: Email (Hidden on small screens) */}
    <Box sx={{ flex: 1.5, display: { xs: "none", md: "block" } }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        Email
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {email}
      </Typography>
    </Box>

    {/* Column 5: Action Button */}
    <IconButton
      size="small"
      sx={{
        bgcolor: "#283593", // Dark blue color
        color: "white",
        borderRadius: 1,
        p: 1,
        "&:hover": { bgcolor: "#1a237e" },
      }}
    >
      <LockPerson />
    </IconButton>
  </Paper>
);

// --- Main Detail Page Component ---

const StudentDetailPage = () => {
  // This hook reads the ':studentId' from the URL
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
    // Find the student from the mock data
    const foundStudent = rows.find((row) => row.id === studentId);

    if (foundStudent) {
      setStudent(foundStudent);
    }
    setLoading(false);
  }, [studentId]); // Re-run this effect if the studentId changes

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
        <Grid size={{ xs: 12, lg: 4 }}>
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
                      // Add the dot icon with specific size
                      icon={
                        <FiberManualRecord
                          sx={{ fontSize: "8px !important" }}
                        />
                      }
                      label={student.status || "Active"}
                      size="small"
                      sx={{
                        height: 24, // Standard height for small badges
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        mb: 1,
                        border: "none", // Remove border if any default exists
                        borderRadius: 1,

                        // --- CONDITIONAL STYLING ---
                        ...(student.status === "Inactive"
                          ? {
                              bgcolor: "#f3f4f6", // Light Gray
                              color: "#4b5563", // Dark Gray Text
                            }
                          : {
                              bgcolor: "#ecfdf5", // Very Light Green (Mint)
                              color: "#059669", // Dark Green Text
                            }),

                        // --- CHILD ELEMENT STYLING ---
                        // Ensure the dot inherits the text color
                        "& .MuiChip-icon": {
                          color: "inherit",
                          ml: "8px", // Spacing from left edge
                        },
                        // Adjust text padding
                        "& .MuiChip-label": {
                          pl: "6px", // Space between dot and text
                          pr: "10px",
                        },
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
                  <InfoItem label="Blood Group" value="O +ve" /> {/* Mock */}
                  <InfoItem label="Religion" value="Christianity" />{" "}
                  {/* Mock */}
                  <InfoItem label="Caste" value="Catholic" /> {/* Mock */}
                  <InfoItem label="Category" value="OBC" /> {/* Mock */}
                  <InfoItem label="Mother tongue" value="English" />{" "}
                  {/* Mock */}
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
                {/* Footer Button */}
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
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Primary Contact Info
                </Typography>
                <List dense>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone Number"
                      secondary="+1 46548 84498" /* Mock */
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Email fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Address"
                      secondary="jan@example.com" /* Mock */
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Sibling Information Card */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sibling Information
                </Typography>
                <List>
                  <ListItem disablePadding>
                    <ListItemAvatar>
                      <Avatar src="/path/to/ralph.png" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Ralph Claudia"
                      secondary="III, B" /* Mock */
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemAvatar>
                      <Avatar src="/path/to/julie.png" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Julie Scott"
                      secondary="V, A" /* Mock */
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Hostel/Transportation Card */}
            <Card>
              <CardContent>
                <Tabs
                  value={transportTabValue}
                  onChange={(e, val) => setTransportTabValue(val)}
                  variant="fullWidth"
                  sx={{ mb: 2 }}
                >
                  <Tab label="Hostel" />
                  <Tab label="Transportation" />
                </Tabs>
                {transportTabValue === 0 && (
                  <Box>
                    <InfoItem label="Hostel" value="Hl-Hostel, Floor" />{" "}
                    {/* Mock */}
                    <InfoItem label="Room No" value="25" /> {/* Mock */}
                  </Box>
                )}
                {transportTabValue === 1 && (
                  <Typography sx={{ pt: 2, textAlign: "center" }}>
                    No transportation details.
                  </Typography>
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
          {tabValue === 0 && (
            <Box sx={{ p: 0 }}>
              <Stack spacing={3}>
                {/* Parents Information - Using variant="outlined" to apply theme border */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Parents Information
                    </Typography>
                    <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                    <Stack spacing={2}>
                      <ParentInfoCard
                        name="Jerald Vicinius"
                        relation="Father"
                        phone="+1 45545 46464"
                        email="jera@example.com"
                        avatarSrc="/path/to/jerald.png"
                      />
                      <ParentInfoCard
                        name="Roberta Webber"
                        relation="Mother"
                        phone="+1 46499 24357"
                        email="robe@example.com"
                        avatarSrc="/path/to/roberta.png"
                      />
                      <ParentInfoCard
                        name="Jerald Vicinius"
                        relation="Guardian (Father)"
                        phone="+1 45545 46464"
                        email="jera@example.com"
                        avatarSrc="/path/to/jerald.png"
                      />
                    </Stack>
                  </CardContent>
                </Card>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {/* --- Documents Card (Restyled) --- */}
                    <Card sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Documents
                        </Typography>
                        <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                        <Stack spacing={2}>
                          <DocumentItem name="BirthCertificate.pdf" />
                          <DocumentItem name="Transfer Certificate.pdf" />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    {/* --- Address Card (Restyled) --- */}
                    <Card sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Address
                        </Typography>
                        <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                        <Stack spacing={2}>
                          <InfoBlock
                            icon={
                              <Avatar
                                sx={{
                                  bgcolor: "#f8f9fa",
                                  color: "#4b5563",
                                  width: 32,
                                  height: 32,
                                  borderRadius: 1,
                                }}
                              >
                                <Home sx={{ fontSize: "1.1rem" }} />
                              </Avatar>
                            }
                            title="Current Address"
                            content="3495 Red Hawk Road, Buffalo Lake, MN 55314"
                          />
                          <InfoBlock
                            icon={
                              <Avatar
                                sx={{
                                  bgcolor: "#f8f9fa",
                                  color: "#4b5563",
                                  width: 32,
                                  height: 32,
                                  borderRadius: 1,
                                }}
                              >
                                <Apartment sx={{ fontSize: "1.1rem" }} />
                              </Avatar>
                            }
                            title="Permanent Address"
                            content="3495 Red Hawk Road, Buffalo Lake, MN 55314"
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* --- Previous School Card (Restyled) --- */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Previous School Details
                    </Typography>
                    <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                    <Grid container spacing={2}>
                      {/* ***** FIX HERE: 'item' prop added ***** */}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <InfoBlock
                          title="Previous School Name"
                          content="Oxford Matriculation, USA"
                        />
                      </Grid>
                      {/* ***** FIX HERE: 'item' prop added ***** */}
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <InfoBlock
                          title="School Address"
                          content="1852 Barnes Avenue, Cincinnati, OH 45202"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* NEW: Grid for Bank and Medical */}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {/* --- Bank Details Card (Restyled) --- */}
                    <Card sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Bank Details
                        </Typography>
                        <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 4 }}>
                            <InfoBlock
                              title="Bank Name"
                              content="Bank of America"
                            />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 4 }}>
                            <InfoBlock title="Branch" content="Cincinnati" />
                          </Grid>

                          <Grid size={{ xs: 12, sm: 4 }}>
                            <InfoBlock title="IFSC" content="BOA83209832" />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    {/* --- Medical History Card (Restyled) --- */}
                    <Card sx={{ height: "100%" }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Medical History
                        </Typography>
                        <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                        <Grid container spacing={2}>
                          {/* ***** FIX HERE: 'item' prop added ***** */}
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <InfoBlock
                              title="Known Allergies"
                              content={<Chip label="Rashes" size="small" />}
                            />
                          </Grid>
                          {/* ***** FIX HERE: 'item' prop added ***** */}
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <InfoBlock title="Medications" content="-" />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                {/* Other Info - Using variant="outlined" */}
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Other Info
                    </Typography>
                    <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Depending on the specific needs of your organization or
                      system, additional information may be collected or
                      tracked. It's important to ensure that any data collected
                      complies with privacy regulations and policies to protect
                      students' sensitive information.
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Box>
          )}

          {/* Other Tab Panels (Empty for now) */}
          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography>Time Table content goes here.</Typography>
            </Box>
          )}
          {tabValue === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography>Leave & Attendance content goes here.</Typography>
            </Box>
          )}
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
