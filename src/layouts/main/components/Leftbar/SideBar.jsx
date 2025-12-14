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
  Box,
  alpha,
  Avatar,
  Typography,
} from "@mui/material";

import FeedIcon from "@mui/icons-material/Feed";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Class as ClassIcon,
  CalendarToday as CalendarIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  ChevronRight,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  LibraryBooks as LibraryBooksIcon,
  AccountBalance as AccountBalanceIcon,
  Group as GroupIcon,
  MenuBook as MenuBookIcon,
  Category as CategoryIcon,
  School,
} from "@mui/icons-material";

import { styled } from "@mui/material/styles";
import DataServices from "../../../../services/data-services";

const drawerWidthExpanded = 250;
const drawerWidthCollapsed = 80;

const dataServices = new DataServices();

/* ---------------------------------------------
    STYLED DRAWER (Smooth Expand/Collapse)
---------------------------------------------- */
const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidthExpanded : drawerWidthCollapsed,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidthExpanded : drawerWidthCollapsed,
    overflow: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: 230,
    }),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    border: "none",
    boxShadow: theme.shadows[3],
    // hide scrollbar
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
  },
}));

/* ---------------------------------------------
    LIST ITEM STYLES
---------------------------------------------- */
const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(1, 1.5),
  minHeight: 48,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
  },
  ...(selected && {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    "& .MuiListItemIcon-root": {
      color: theme.palette.text.primary,
    },
  }),
}));

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  minWidth: 40,
  color: "inherit",
}));

/* ---------------------------------------------
                SIDEBAR COMPONENT
---------------------------------------------- */
const SideBar = ({ isSidebarOpen, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openMenus, setOpenMenus] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  /* ---------------------------------------------
        MENU ITEMS
  ---------------------------------------------- */
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
        { id: "all-student", text: "All Student", route: "/all-students" },
        { id: "student-list", text: "Student List", route: "/students" },
      ],
    },
    {
      id: "parents",
      icon: <PeopleIcon/>,
      text: "Parents",
      subItems: [
        {id: "all-parents", text: "All Parents", route: "/all-parents"},
        {id: "parent-list", text: "Parent List", route: "/parents"},
      ]
    },
    {
      id: "classes",
      icon: <ClassIcon />,
      text: "Classes",
      subItems: [
        { id: "class-list", text: "Class List", route: "/classes" },
        { id: "timetable", text: "Timetable", route: "/timetable" },
      ],
    },
    {
      id: "homework",
      icon: <FeedIcon />,
      text: "Homework",
      route: "/homework",
    },
    {
      id: "attendance",
      icon: <CalendarIcon />,
      text: "Attendance",
      subItems: [
        {
          id: "student-attendance",
          text: "Student Attendance",
          route: "/student-attendance",
        },
        {
          id: "teacher-attendance",
          text: "Teacher Attendance",
          route: "/teacher-attendance",
        },
      ],
    },
    {
      id: "examination",
      icon: <AssignmentIcon />,
      text: "Examination",
      subItems: [
        {
          id: "exam-schedule",
          text: "Exam Schedule",
          route: "/examination/schedule",
        },
        {
          id: "exam-results",
          text: "Exam Results",
          route: "/examination/results",
        },
      ],
    },
    { id: "courses", icon: <SchoolIcon />, text: "Courses" },
    { id: "section", icon: <CategoryIcon />, text: "Section" },
    { id: "subject", icon: <MenuBookIcon />, text: "Subject" },
    { id: "fees", icon: <AccountBalanceIcon />, text: "Fees" },
    {
      id: "library",
      icon: <LibraryBooksIcon />,
      text: "Library",
      subItems: [
        { id: "librarian", text: "Librarian", route: "/library/librarian" },
        { id: "books", text: "Books", route: "/library/books" },
      ],
    },
    { id: "all-users", icon: <GroupIcon />, text: "All Users" },
    {
      id: "logout",
      icon: <LogoutIcon />,
      text: "Sign Out",
      action: () => setIsDialogOpen(true),
    },
  ];

  /* ---------------------------------------------
      HANDLERS
  ---------------------------------------------- */
  const toggleMenu = (id) =>
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleNavigation = (route) => {
    if (route) {
      navigate(route);
      if (isMobile) onClose?.();
    }
  };

  const isItemSelected = (item) =>
    item.route && location.pathname === item.route;

  /* ---------------------------------------------
      MENU ITEM RENDERING
  ---------------------------------------------- */
  const renderMenuItem = (item) => {
    const hasSub = item.subItems?.length > 0;
    const open = openMenus[item.id];

    /* Mini mode */
    if (!isSidebarOpen) {
      return (
        <Tooltip key={item.id} title={item.text} placement="right" arrow>
          <ListItem disablePadding>
            <StyledListItemButton
              selected={isItemSelected(item)}
              sx={{ justifyContent: "center" }}
              onClick={
                item.action
                  ? item.action
                  : hasSub
                  ? () => toggleMenu(item.id)
                  : () => handleNavigation(item.route)
              }
            >
              <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            </StyledListItemButton>
          </ListItem>
        </Tooltip>
      );
    }

    /* Expanded mode */
    return (
      <Box key={item.id}>
        <ListItem disablePadding>
          <StyledListItemButton
            selected={isItemSelected(item)}
            onClick={
              item.action
                ? item.action
                : hasSub
                ? () => toggleMenu(item.id)
                : () => handleNavigation(item.route)
            }
          >
            <StyledListItemIcon>{item.icon}</StyledListItemIcon>
            {isSidebarOpen && <ListItemText primary={item.text} />}
            {hasSub && (open ? <ExpandLess /> : <ExpandMore />)}
          </StyledListItemButton>
        </ListItem>

        {hasSub && (
          <Collapse in={open} timeout={200} unmountOnExit>
            <List component="div" disablePadding>
              {item.subItems.map((sub) => (
                <ListItemButton
                  key={sub.id}
                  onClick={() => handleNavigation(sub.route)}
                  sx={{ pl: 4, py: 0.5 }}
                >
                  <ChevronRight sx={{ fontSize: 16, mr: 1 }} />
                  <ListItemText primary={sub.text} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  /* ---------------------------------------------
      COMPONENT OUTPUT
  ---------------------------------------------- */
  return (
    <>
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isSidebarOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
      >
        {/* -------- HEADER (Smooth resize) -------- */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "10px",
            height: 65,
            transition: "width 0.25s ease",
            width: isSidebarOpen ? drawerWidthExpanded : drawerWidthCollapsed,
            position: "fixed",
            backgroundColor: theme.palette.background.default,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 3,
          }}
        >
          <Avatar
            sx={{
              width: 55,
              height: 55,
              mr: isSidebarOpen ? 2 : 0,
              transition: "margin 0.25s ease",
            }}
          >
            <School />
          </Avatar>

          {isSidebarOpen && (
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
            >
              Future Leaders
            </Typography>
          )}
        </Box>

        {/* -------- MENU SECTION (Smooth spacing) -------- */}
        <List
          sx={{
            mt: 9,
            overflowY: "auto",
            height: "calc(100vh - 90px)",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {menuItems.map(renderMenuItem)}
        </List>
      </StyledDrawer>

      {/* Dialog, Loading, Snackbar */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={() => setIsLoading(true)}>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <Alert severity="success">Signed out successfully</Alert>
      </Snackbar>
    </>
  );
};

export default SideBar;
