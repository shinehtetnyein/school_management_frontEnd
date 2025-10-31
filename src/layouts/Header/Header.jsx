// components/layout/Header.jsx
import React, { useState, useContext } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Badge,
	Box,
	Divider,
	ListItemIcon,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Search as SearchIcon,
	Notifications as NotificationsIcon,
	AccountCircle,
	Settings as SettingsIcon,
	Logout as LogoutIcon,
	Language as LanguageIcon,
	Brightness4 as Brightness4Icon,
	Brightness7 as Brightness7Icon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { ThemeContext } from "../../theme/context/ThemeContext";
import logo from "../../assets/logo-school.svg";
import { InputBase } from "@mui/material";

const drawerWidth = 280;

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "300px",
		},
	},
}));

const Header = ({ onMenuClick }) => {
	const navigate = useNavigate();
	const { isDarkMode, toggleTheme } = useContext(ThemeContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const [notificationAnchor, setNotificationAnchor] = useState(null);
	const [langEl, setLangEl] = useState(null);
	const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "en");

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleProfileMenuClose = () => {
		setAnchorEl(null);
	};

	const handleNotificationOpen = (event) => {
		setNotificationAnchor(event.currentTarget);
	};

	const handleNotificationClose = () => {
		setNotificationAnchor(null);
	};

	const handleLangOpen = (event) => setLangEl(event.currentTarget);
	const handleLangClose = () => setLangEl(null);
	const changeLanguage = (code) => {
		setLanguage(code);
		localStorage.setItem("lang", code);
		handleLangClose();
	};

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		navigate("/login");
		handleProfileMenuClose();
	};

	return (
		<>
			<AppBar
				position='fixed'
				sx={{
					width: { md: `calc(100% - ${drawerWidth}px)` },
					ml: { md: `${drawerWidth}px` },
				}}>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={onMenuClick}
						sx={{ mr: 2, display: { md: "none" } }}>
						<MenuIcon />
					</IconButton>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Box component="img" src={logo} alt="School logo" sx={{ width: 28, height: 28 }} />
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ display: { xs: "none", md: "block" } }}>
							School Management System
						</Typography>
					</Box>

					<Search sx={{ flexGrow: 1, maxWidth: 400, mx: 3 }}>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search students, teachers, classes...'
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>

					<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
						<IconButton color='inherit' onClick={handleLangOpen} aria-label='language'>
							<LanguageIcon />
						</IconButton>
						<IconButton color='inherit' onClick={toggleTheme} aria-label='toggle theme'>
							{isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
						<IconButton
							color='inherit'
							onClick={handleNotificationOpen}
							aria-label='notifications'>
							<Badge badgeContent={3} color='error'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton onClick={handleProfileMenuOpen} color='inherit' aria-label='account'>
							<Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>

			{/* Language Menu */}
			<Menu anchorEl={langEl} open={Boolean(langEl)} onClose={handleLangClose}>
				<MenuItem selected={language==='en'} onClick={() => changeLanguage('en')}>English</MenuItem>
				<MenuItem selected={language==='mm'} onClick={() => changeLanguage('mm')}>မြန်မာ</MenuItem>
			</Menu>

			{/* User Profile Menu */}
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleProfileMenuClose}
				onClick={handleProfileMenuClose}>
				<MenuItem onClick={() => navigate("/dashboard/profile")}>
					<ListItemIcon>
						<AccountCircle fontSize='small' />
					</ListItemIcon>
					Profile
				</MenuItem>
				<MenuItem onClick={() => navigate("/dashboard/settings")}>
					<ListItemIcon>
						<SettingsIcon fontSize='small' />
					</ListItemIcon>
					Settings
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutIcon fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>

			{/* Notification Menu */}
			<Menu
				anchorEl={notificationAnchor}
				open={Boolean(notificationAnchor)}
				onClose={handleNotificationClose}>
				<MenuItem onClick={handleNotificationClose}>
					<Typography variant='body2'>New student registration</Typography>
				</MenuItem>
				<MenuItem onClick={handleNotificationClose}>
					<Typography variant='body2'>Fee payment received</Typography>
				</MenuItem>
				<MenuItem onClick={handleNotificationClose}>
					<Typography variant='body2'>Attendance report ready</Typography>
				</MenuItem>
			</Menu>
		</>
	);
};

export default Header;
