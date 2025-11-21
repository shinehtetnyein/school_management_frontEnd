import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
  useMediaQuery,
  useTheme,
  Typography,
  Divider,
  Box,
  alpha,
} from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import BackpackIcon from "@mui/icons-material/Backpack";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  ChevronRight,
  Message as MessageIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import DataServices from "../../../../services/data-services";

const drawerWidthExpanded = 250;
const drawerWidthCollapsed = 80;

const dataServices = new DataServices();

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidthExpanded : drawerWidthCollapsed,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidthExpanded : drawerWidthCollapsed,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    border: "none",
    boxShadow: theme.shadows[3],
    // Hide scrollbar for a cleaner look while allowing scrolling
    "&::-webkit-scrollbar": {
      display: "none", // For Chrome, Safari, and Opera
    },
    scrollbarWidth: "none", // For Firefox
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(1, 1.5),
  minHeight: 48,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
  ...(selected && {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.text.primary,
    },
  }),
}));

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 40,
  color: "inherit",
});

const Leftbar = ({ isCollapsed, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Open sign-out dialog
  const handleSignOutClick = () => {
    setIsDialogOpen(true);
  };

  // Confirm sign-out
  const handleSignOutConfirm = () => {
    setIsDialogOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Clear tokens and user data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dataServices.removeTokenCookie();

      // Show snackbar notification
      setIsSnackbarOpen(true);

      // Redirect to login page
      navigate("/login", { replace: true });
    }, 1500); // short delay to show loading indicator
  };

  // Cancel sign-out
  const handleSignOutCancel = () => {
    setIsDialogOpen(false);
  };

  // ✅ PLAIN ENGLISH MENU — NO t() ANYWHERE!
  const menuItems = [
    {
      id: "dashboard",
      icon: <DashboardIcon />,
      text: "Dashboard",
      route: "/dashboard",
    },
    {
      id: "students",
      icon: <PeopleIcon />,
      text: "Students",
      subItems: [
        {
          id: "all-student",
          text: "All Student",
          route: "/dashboard/all",
        },
        {
          id: "student-list",
          text: "Student List",
          route: "/dashboard/students",
        },
      ],
    },

    {
      id: "classes",
      icon: <ClassIcon />,
      text: "Classes",
      subItems: [
        { id: "class-list", text: "Class List", route: "/dashboard/classes" },
        { id: "timetable", text: "Timetable", route: "/dashboard/timetable" },
      ],
    },
    {
      id: "homework",
      icon: <FeedIcon />,
      text: "Homework",
      route: "/dashboard/homework",
    },
    {
      id: "attendance",
      icon: <CalendarIcon />,
      text: "Attendance",
      subItems: [
        {
          id: "daily-attendance",
          text: "Daily Attendance",
          route: "/dashboard/attendance/daily",
        },
        {
          id: "attendance-report",
          text: "Attendance Report",
          route: "/dashboard/attendance/report",
        },
        {
          id: "absentees",
          text: "Absentees",
          route: "/dashboard/attendance/absentees",
        },
      ],
    },
    {
      id: "examination",
      icon: <BackpackIcon />,
      text: "Examination",
      subItems: [
        {
          id: "exam-schedule",
          text: "Exam Schedule",
          route: "/dashboard/examination/schedule",
        },
        {
          id: "exam-attendance",
          text: "Exam Attendance",
          route: "/dashboard/examination/attendance",
        },
        {
          id: "exam-results",
          text: "Exam Results",
          route: "/dashboard/examination/results",
        },
      ],
    },
    {
      id: "grades",
      icon: <AssignmentIcon />,
      text: "Grades",
      subItems: [
        {
          id: "grade-entry",
          text: "Grade Entry",
          route: "/dashboard/grades/entry",
        },
        { id: "gradebook", text: "Gradebook", route: "/dashboard/grades/book" },
        {
          id: "report-cards",
          text: "Report Cards",
          route: "/dashboard/grades/reports",
        },
      ],
    },
    {
      id: "courses",
      icon: <BookIcon />,
      text: "Courses",
      subItems: [
        { id: "course-list", text: "Course List", route: "/dashboard/courses" },
        { id: "subjects", text: "Subjects", route: "/dashboard/subjects" },
        { id: "syllabus", text: "Syllabus", route: "/dashboard/syllabus" },
      ],
    },
    {
      id: "fees",
      icon: <MoneyIcon />,
      text: "Fees",
      subItems: [
        {
          id: "fee-structure",
          text: "Fee Structure",
          route: "/dashboard/fees/structure",
        },
        {
          id: "fee-collection",
          text: "Fee Collection",
          route: "/dashboard/fees/collection",
        },
        {
          id: "fee-receipts",
          text: "Fee Receipts",
          route: "/dashboard/fees/receipts",
        },
        {
          id: "fee-overdue",
          text: "Overdue Fees",
          route: "/dashboard/fees/overdue",
        },
      ],
    },
    {
      id: "reports",
      icon: <ReportIcon />,
      text: "Reports",
      subItems: [
        {
          id: "academic-report",
          text: "Academic Report",
          route: "/dashboard/reports/academic",
        },
        {
          id: "attendance-report",
          text: "Attendance Summary",
          route: "/dashboard/reports/attendance",
        },
        {
          id: "fee-summary",
          text: "Fee Summary",
          route: "/dashboard/reports/fees",
        },
        {
          id: "student-progress",
          text: "Student Progress",
          route: "/dashboard/reports/progress",
        },
      ],
    },
    {
      id: "communications",
      icon: <MessageIcon />,
      text: "Communications",
      subItems: [
        {
          id: "announcements",
          text: "Announcements",
          route: "/dashboard/communications/announcements",
        },
        {
          id: "messages",
          text: "Messages",
          route: "/dashboard/communications/messages",
        },
        {
          id: "parent-notifications",
          text: "Parent Notifications",
          route: "/dashboard/communications/parents",
        },
      ],
    },
    {
      id: "settings",
      icon: <SettingsIcon />,
      text: "Settings",
      subItems: [
        {
          id: "school-info",
          text: "School Info",
          route: "/dashboard/settings/school",
        },
        { id: "users", text: "Users", route: "/dashboard/settings/users" },
        { id: "roles", text: "Roles", route: "/dashboard/settings/roles" },
        { id: "backup", text: "Backup", route: "/dashboard/settings/backup" },
      ],
    },
    {
      id: "logout",
      icon: <LogoutIcon />,
      text: "Sign Out",
      action: handleSignOutClick,
    },
  ];

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const toggleMenu = (menuId) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const isItemSelected = (item) => {
    if (item.route) {
      return location.pathname === item.route;
    }
    return false;
  };

  const handleNavigation = (route) => {
    if (route) {
      navigate(route);
      if (isMobile && onClose) {
        onClose();
      }
    }
  };

  const renderMenuItem = (item) => {
    const isSelected = isItemSelected(item);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isMenuOpen = openMenus[item.id];

    if (isCollapsed) {
      return (
        <Tooltip key={item.id} title={item.text} placement="right" arrow>
          <ListItem disablePadding sx={{ display: "block" }}>
            <StyledListItemButton
              selected={isSelected}
              onClick={
                item.action
                  ? item.action
                  : hasSubItems
                  ? () => toggleMenu(item.id)
                  : () => handleNavigation(item.route)
              }
              sx={{
                justifyContent: "center",
                px: 2.5,
              }}
            >
              <StyledListItemIcon sx={{ justifyContent: "center" }}>
                {item.icon}
              </StyledListItemIcon>
            </StyledListItemButton>
          </ListItem>
        </Tooltip>
      );
    }

    return (
      <Box key={item.id}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <StyledListItemButton
            selected={isSelected}
            onClick={
              item.action
                ? item.action
                : hasSubItems
                ? () => toggleMenu(item.id)
                : () => handleNavigation(item.route)
            }
          >
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            <ListItemText primary={item.text} />
            {hasSubItems && (isMenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </StyledListItemButton>
        </ListItem>

        {hasSubItems && (
          <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => (
                <ListItemButton
                  key={subItem.id}
                  onClick={() => handleNavigation(subItem.route)}
                  sx={{
                    pl: 4,
                    py: 0.5,
                    mx: 1,
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                    },
                  }}
                >
                  <ChevronRight sx={{ fontSize: 16, mr: 1 }} />
                  <ListItemText
                    primary={subItem.text}
                    primaryTypographyProps={{ fontSize: "0.9rem" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <>
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={!isCollapsed}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
      >
        <List sx={{ mt: 7 }}>{menuItems.map(renderMenuItem)}</List>
      </StyledDrawer>

      {/* Dialogs and notifications */}
      <Dialog
        open={isDialogOpen}
        onClose={handleSignOutCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignOutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignOutConfirm} autoFocus color="error">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Signed out successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default Leftbar;
