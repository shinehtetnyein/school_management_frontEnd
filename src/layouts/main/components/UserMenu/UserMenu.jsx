import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { AccountCircle, Settings, ExitToApp } from "@mui/icons-material";

const UserMenu = ({ anchorEl, open, onClose, onSignOut }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 200,
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={() => {
          onSignOut();
          onClose();
        }}
        sx={{ color: "error.main" }}
      >
        <ListItemIcon>
          <ExitToApp fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
