/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import {
  MenuItem,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Menu,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack,
  useTheme,
} from "@mui/material";
import {
  FilterList,
  CalendarToday,
  SortByAlpha,
  GridView,
  ViewList,
  MoreVert,
  Phone,
  Email,
  Chat,
  Refresh, // For refresh button
} from "@mui/icons-material";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";

// --- Mock Data (Slightly adjusted to match image names) ---
const rows = [
  {
    id: "AD9892434",
    rollNo: 35013,
    name: "Janet Daniel",
    avatar: "/static/images/avatar/1.jpg",
    class: "III",
    section: "A",
    gender: "Female",
    status: "Active",
    dateOfJoin: "10 Jan 2015",
  },
  {
    id: "AD9892433",
    rollNo: 35012,
    name: "Joann Michael",
    avatar: "/static/images/avatar/2.jpg",
    class: "IV",
    section: "B",
    gender: "Male",
    status: "Active",
    dateOfJoin: "19 Aug 2014",
  },
  {
    id: "AD9892432",
    rollNo: 35011,
    name: "Kathleen Dison",
    avatar: "/static/images/avatar/3.jpg",
    class: "III",
    section: "A",
    gender: "Female",
    status: "Active",
    dateOfJoin: "05 Dec 2017",
  },
  {
    id: "AD9892431",
    rollNo: 35010,
    name: "Lisa Gourley",
    avatar: "/static/images/avatar/4.jpg",
    class: "II",
    section: "B",
    gender: "Female",
    status: "Inactive",
    dateOfJoin: "13 May 2017",
  },
  {
    id: "AD9892430",
    rollNo: 35009,
    name: "Gifford Fox",
    avatar: "/static/images/avatar/5.jpg",
    class: "I",
    section: "B",
    gender: "Male",
    status: "Active",
    dateOfJoin: "27 Feb 2018",
  },
  {
    id: "AD9892429",
    rollNo: 35008,
    name: "Michael Johnson",
    avatar: "/static/images/avatar/6.jpg",
    class: "V",
    section: "A",
    gender: "Male",
    status: "Active",
    dateOfJoin: "15 Mar 2019",
  },
  {
    id: "AD9892428",
    rollNo: 35007,
    name: "Sarah Williams",
    avatar: "/static/images/avatar/7.jpg",
    class: "IV",
    section: "C",
    gender: "Female",
    status: "Active",
    dateOfJoin: "22 Jul 2016",
  },
  {
    id: "AD9892427",
    rollNo: 35006,
    name: "Robert Brown",
    avatar: "/static/images/avatar/8.jpg",
    class: "II",
    section: "A",
    gender: "Male",
    status: "Inactive",
    dateOfJoin: "30 Nov 2018",
  },
  {
    id: "AD9892426",
    rollNo: 35005,
    name: "Emily Davis",
    avatar: "/static/images/avatar/1.jpg",
    class: "III",
    section: "B",
    gender: "Female",
    status: "Active",
    dateOfJoin: "14 Apr 2020",
  },
  {
    id: "AD9892425",
    rollNo: 35004,
    name: "David Wilson",
    avatar: "/static/images/avatar/2.jpg",
    class: "V",
    section: "B",
    gender: "Male",
    status: "Active",
    dateOfJoin: "08 Sep 2017",
  },
  {
    id: "AD9892424",
    rollNo: 35003,
    name: "Jennifer Miller",
    avatar: "/static/images/avatar/3.jpg",
    class: "I",
    section: "A",
    gender: "Female",
    status: "Active",
    dateOfJoin: "19 Dec 2019",
  },
  {
    id: "AD9892423",
    rollNo: 35002,
    name: "Christopher Moore",
    avatar: "/static/images/avatar/4.jpg",
    class: "IV",
    section: "A",
    gender: "Male",
    status: "Inactive",
    dateOfJoin: "03 Feb 2016",
  },
  {
    id: "AD9892422",
    rollNo: 35001,
    name: "Amanda Taylor",
    avatar: "/static/images/avatar/5.jpg",
    class: "II",
    section: "C",
    gender: "Female",
    status: "Active",
    dateOfJoin: "25 Aug 2021",
  },
  {
    id: "AD9892421",
    rollNo: 35000,
    name: "James Anderson",
    avatar: "/static/images/avatar/6.jpg",
    class: "III",
    section: "C",
    gender: "Male",
    status: "Active",
    dateOfJoin: "11 Jun 2018",
  },
  {
    id: "AD9892420",
    rollNo: 34999,
    name: "Jessica Thomas",
    avatar: "/static/images/avatar/7.jpg",
    class: "V",
    section: "C",
    gender: "Female",
    status: "Active",
    dateOfJoin: "07 Mar 2020",
  },
  {
    id: "AD9892419",
    rollNo: 34998,
    name: "Daniel Jackson",
    avatar: "/static/images/avatar/8.jpg",
    class: "I",
    section: "C",
    gender: "Male",
    status: "Inactive",
    dateOfJoin: "29 Oct 2019",
  },
  {
    id: "AD9892418",
    rollNo: 34997,
    name: "Michelle White",
    avatar: "/static/images/avatar/1.jpg",
    class: "IV",
    section: "D",
    gender: "Female",
    status: "Active",
    dateOfJoin: "16 Jan 2022",
  },
  {
    id: "AD9892417",
    rollNo: 34996,
    name: "Kevin Harris",
    avatar: "/static/images/avatar/2.jpg",
    class: "II",
    section: "D",
    gender: "Male",
    status: "Active",
    dateOfJoin: "09 May 2021",
  },
  {
    id: "AD9892416",
    rollNo: 34995,
    name: "Nicole Martin",
    avatar: "/static/images/avatar/3.jpg",
    class: "III",
    section: "D",
    gender: "Female",
    status: "Active",
    dateOfJoin: "24 Sep 2020",
  },
  {
    id: "AD9892415",
    rollNo: 34994,
    name: "Andrew Thompson",
    avatar: "/static/images/avatar/4.jpg",
    class: "V",
    section: "D",
    gender: "Male",
    status: "Inactive",
    dateOfJoin: "12 Dec 2018",
  },
  {
    id: "AD9892414",
    rollNo: 34993,
    name: "Rachel Garcia",
    avatar: "/static/images/avatar/5.jpg",
    class: "I",
    section: "D",
    gender: "Female",
    status: "Active",
    dateOfJoin: "05 Apr 2022",
  },
  {
    id: "AD9892413",
    rollNo: 34992,
    name: "Brian Martinez",
    avatar: "/static/images/avatar/6.jpg",
    class: "IV",
    section: "E",
    gender: "Male",
    status: "Active",
    dateOfJoin: "18 Jul 2021",
  },
  {
    id: "AD9892412",
    rollNo: 34991,
    name: "Lauren Robinson",
    avatar: "/static/images/avatar/7.jpg",
    class: "II",
    section: "E",
    gender: "Female",
    status: "Active",
    dateOfJoin: "31 Jan 2020",
  },
];

// --- New Student Card Component ---
const StudentCard = ({ student, theme }) => {
  const {
    id,
    rollNo,
    name,
    avatar,
    class: className,
    section,
    gender,
    status,
    dateOfJoin,
  } = student;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          borderRadius: "8px",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CardContent>
          {/* Top Section: ID, Status, Menu */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="body2" color="primary.secondary">
              {id}
            </Typography>
            <Chip
              label={status}
              color={status === "Active" ? "success" : "error"}
              size="small"
              sx={{ fontWeight: 500, fontSize: "0.75rem" }}
            />
            <IconButton size="small">
              <MoreVert
                fontSize="small"
                sx={{ color: theme.palette.action.icon }}
              />
            </IconButton>
          </Box>

          <Divider sx={{ my: 1.5, ml: -2, mr: -2 }} />

          {/* Middle Section: Avatar, Name, Class */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", mb: 2, mt: 3 }}
          >
            <Avatar src={avatar} alt={name} sx={{ width: 56, height: 56 }} />
            <Box>
              <Typography variant="h6" component="div">
                {name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {className}, {section}
              </Typography>
            </Box>
          </Stack>

          {/* Details Section: Roll, Gender, Joined */}
          <Grid container spacing={1} sx={{ mb: 3, textAlign: "left" }}>
            <Grid size={{ xs: 4 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                display="block"
              >
                Roll No
              </Typography>
              <Typography variant="body2">{rollNo}</Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                display="block"
              >
                Gender
              </Typography>
              <Typography variant="body2">{gender}</Typography>
            </Grid>
            <Grid size={{ xs: 4 }}>
              <Typography
                variant="body1"
                color="text.secondary"
                display="block"
              >
                Joined On
              </Typography>
              <Typography variant="body2">{dateOfJoin}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 1.5, ml: -2, mr: -2 }} />

          {/* Bottom Section: Icons, Add Fees */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={1.5}>
              <IconButton
                size="small"
                color="primary"
                sx={{
                  borderRadius: "50%",
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <Chat fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                sx={{
                  borderRadius: "50%",
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <Phone fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                sx={{
                  borderRadius: "50%",
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
              >
                <Email fontSize="small" />
              </IconButton>
            </Stack>
            <Button
              variant="outlined"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Add Fees
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

// --- The Main Component ---
const Students = () => {
  const theme = useTheme();
  // Set default view to "grid" to match the image
  const [view, setView] = useState("grid");
  const [data] = useState(rows);
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  const visibleStudents = data.slice(0, visibleCount);
  const hasMoreStudents = visibleCount < data.length;

  const handleViewChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  // --- State and handlers for Export Menu (unchanged) ---
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleExportClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: theme.palette.background.secondary,
        minHeight: "100vh",
      }}
    >
      {/* 1. Header and Breadcrumbs (Updated) */}
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
            Students
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <IconButton
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "8px",
            }}
          >
            <Refresh />
          </IconButton>
          <IconButton
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "8px",
            }}
          >
            <LocalPrintshopOutlinedIcon />
          </IconButton>
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

      {/* 2. Controls and Content Card (Updated) */}
      <Box
        sx={{
          p: 2.5,
          borderRadius: "8px",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Top Controls (Updated) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* Title for the grid/list */}
          <Typography variant="h6">Student Grid</Typography>

          {/* Controls on the right */}
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            {/* Search bar removed to match image */}
            <TextField
              size="small"
              defaultValue="2025/11/08 - 2025/11/14" // Date updated
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
                  fontSize: "0.875rem",
                },
              }}
            />
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FilterList />}
              sx={{ bgcolor: "background.paper", textTransform: "none" }}
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
              sx={{ bgcolor: "background.paper", textTransform: "none" }}
            >
              Sort by A-Z
            </Button>
          </Box>
        </Box>

        {/* Student Grid */}
        <Grid container spacing={3}>
          {visibleStudents.map((student) => (
            <StudentCard key={student.id} student={student} theme={theme} />
          ))}
        </Grid>

        {/* Load More Button */}
        {hasMoreStudents && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoadMore}
              startIcon={<CloudOutlinedIcon />}
              sx={{
                px: 4,
                py: 1,
                textTransform: "none",
                fontSize: "1rem",
                borderRadius: "8px",
              }}
            >
              Load More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Students;
