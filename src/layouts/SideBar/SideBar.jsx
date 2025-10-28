// components/layout/Sidebar.jsx
import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Box,
	Typography,
	Toolbar,
	Divider,
	useTheme,
} from "@mui/material";
import {
	Dashboard as DashboardIcon,
	School as SchoolIcon,
	Person as PersonIcon,
	Class as ClassIcon,
	MenuBook as MenuBookIcon,
	CheckCircle as CheckCircleIcon,
	Grade as GradeIcon,
	Payment as PaymentIcon,
	Assessment as AssessmentIcon,
	Settings as SettingsIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 280;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
	const theme = useTheme();
	const location = useLocation();

	const menuItems = [
		{
			path: "/dashboard",
			icon: <DashboardIcon />,
			label: "Dashboard",
			exact: true,
		},
		{ path: "/students", icon: <SchoolIcon />, label: "Students" },
		{ path: "/teachers", icon: <PersonIcon />, label: "Teachers" },
		{ path: "/classes", icon: <ClassIcon />, label: "Classes" },
		{ path: "/subjects", icon: <MenuBookIcon />, label: "Subjects" },
		{ path: "/attendance", icon: <CheckCircleIcon />, label: "Attendance" },
		{ path: "/grades", icon: <GradeIcon />, label: "Grades" },
		{ path: "/fees", icon: <PaymentIcon />, label: "Fees" },
		{ path: "/reports", icon: <AssessmentIcon />, label: "Reports" },
		{ path: "/settings", icon: <SettingsIcon />, label: "Settings" },
	];

	const isActive = (path, exact = false) => {
		if (exact) {
			return location.pathname === path;
		}
		return location.pathname.startsWith(path);
	};

	const drawer = (
		<Box>
			<Toolbar>
				<Typography
					variant='h6'
					noWrap
					component='div'
					sx={{ fontWeight: "bold" }}>
					School MS
				</Typography>
			</Toolbar>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<ListItem
						key={item.path}
						disablePadding>
						<ListItemButton
							component={Link}
							to={item.path}
							selected={isActive(item.path, item.exact)}
							sx={{
								"&.Mui-selected": {
									backgroundColor: theme.palette.primary.light,
									"&:hover": {
										backgroundColor: theme.palette.primary.light,
									},
								},
							}}>
							<ListItemIcon
								sx={{
									color: isActive(item.path, item.exact)
										? theme.palette.primary.main
										: "inherit",
								}}>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box
			component='nav'
			sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
			{/* Mobile drawer */}
			<Drawer
				variant='temporary'
				open={mobileOpen}
				onClose={onDrawerToggle}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}>
				{drawer}
			</Drawer>

			{/* Desktop drawer */}
			<Drawer
				variant='permanent'
				sx={{
					display: { xs: "none", md: "block" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}
				open>
				{drawer}
			</Drawer>
		</Box>
	);
};

export default Sidebar;
