import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  CalendarToday,
  AccessTime,
  Person,
  School,
  Assignment,
  Grade,
  TrendingUp,
  MoreVert,
  AccountCircle,
  ShowChart,
  Payment,
  LibraryBooks,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
  },
  typography: {
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
});

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Mock data for student management
  const studentStats = [
    {
      label: "Total Students",
      value: "1,248",
      icon: <Person />,
      color: "#1976d2",
      progress: 75,
    },
    {
      label: "Active Students",
      value: "984",
      icon: <School />,
      color: "#2e7d32",
      progress: 82,
    },
    {
      label: "New Enrollments",
      value: "127",
      icon: <Assignment />,
      color: "#ed6c02",
      progress: 68,
    },
    {
      label: "Graduated",
      value: "89",
      icon: <Grade />,
      color: "#9c27b0",
      progress: 45,
    },
  ];

  const performanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Average Grades",
        data: [85, 78, 92, 88, 76, 95],
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const attendanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Attendance Rate (%)",
        data: [92, 88, 95, 90],
        backgroundColor: "rgba(46, 125, 50, 0.6)",
        borderColor: "#2e7d32",
        borderWidth: 2,
      },
    ],
  };

  const courseDistribution = {
    labels: ["Science", "Math", "Arts", "Languages", "Sports"],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          "#1976d2",
          "#2e7d32",
          "#ed6c02",
          "#9c27b0",
          "#d32f2f",
        ],
        borderWidth: 2,
      },
    ],
  };

  const recentActivities = [
    {
      student: "John Doe",
      action: "Submitted assignment",
      time: "2 min ago",
      course: "Mathematics",
    },
    {
      student: "Jane Smith",
      action: "Completed quiz",
      time: "15 min ago",
      course: "Science",
    },
    {
      student: "Mike Johnson",
      action: "Enrolled in course",
      time: "1 hour ago",
      course: "Arts",
    },
    {
      student: "Sarah Wilson",
      action: "Received grade",
      time: "3 hours ago",
      course: "Languages",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ p: 3, bgcolor: "background.default", minHeight: "100vh" }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
              >
                Student Management Dashboard
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slotProps={{ textField: { size: "small" } }}
                />
                <IconButton onClick={handleMenuOpen}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Export Data</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                </Menu>
              </Box>
            </Box>
            <Typography variant="body1" color="text.secondary">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {studentStats.map((stat, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
                        {stat.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="div">
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={stat.progress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: `${stat.color}20`,
                        "& .MuiLinearProgress-bar": {
                          bgcolor: stat.color,
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Performance Chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <ShowChart sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="h6">Academic Performance</Typography>
                </Box>
                <Line
                  data={performanceData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                    },
                  }}
                />
              </Paper>
            </Grid>

            {/* Attendance Chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <AccessTime sx={{ mr: 1, color: "success.main" }} />
                  <Typography variant="h6">Attendance Rate</Typography>
                </Box>
                <Bar
                  data={attendanceData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                    },
                  }}
                />
              </Paper>
            </Grid>

            {/* Course Distribution */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <LibraryBooks sx={{ mr: 1, color: "secondary.main" }} />
                  <Typography variant="h6">Course Distribution</Typography>
                </Box>
                <Doughnut
                  data={courseDistribution}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "bottom" },
                    },
                  }}
                />
              </Paper>
            </Grid>

            {/* Recent Activities */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Assignment sx={{ mr: 1, color: "warning.main" }} />
                  <Typography variant="h6">Recent Activities</Typography>
                </Box>
                <Box sx={{ maxHeight: 300, overflow: "auto" }}>
                  {recentActivities.map((activity, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        mb: 1,
                        bgcolor: "grey.50",
                        borderRadius: 1,
                        "&:hover": {
                          bgcolor: "primary.light",
                          color: "white",
                        },
                      }}
                    >
                      <AccountCircle sx={{ mr: 2, color: "action.active" }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {activity.student} - {activity.action}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.course} • {activity.time}
                        </Typography>
                      </Box>
                      <Chip
                        label={activity.course}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Quick Stats */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Payment sx={{ fontSize: 40, color: "success.main", mb: 1 }} />
                <Typography variant="h6" color="success.main">
                  $42,750
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Fees Collected
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: "info.main", mb: 1 }} />
                <Typography variant="h6" color="info.main">
                  92%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Overall Performance
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <School sx={{ fontSize: 40, color: "warning.main", mb: 1 }} />
                <Typography variant="h6" color="warning.main">
                  45
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Classes Today
                </Typography>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ textAlign: "center", p: 2 }}>
                <Assignment sx={{ fontSize: 40, color: "error.main", mb: 1 }} />
                <Typography variant="h6" color="error.main">
                  127
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pending Assignments
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Dashboard;
