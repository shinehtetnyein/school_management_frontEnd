// components/layout/Footer.jsx
import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 280;

const Footer = () => {
  const theme = useTheme();

  return (
    <Paper
      component="footer"
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        p: 2,
        backgroundColor: theme.palette.grey[100],
        zIndex: theme.zIndex.drawer - 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2025 School Management System. All rights reserved.
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          Version 1.0.0
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography
            variant="body2"
            component={Link}
            to="/help"
            sx={{ 
              color: theme.palette.primary.main, 
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Help
          </Typography>
          <Typography
            variant="body2"
            component={Link}
            to="/support"
            sx={{ 
              color: theme.palette.primary.main, 
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Support
          </Typography>
          <Typography
            variant="body2"
            component={Link}
            to="/privacy"
            sx={{ 
              color: theme.palette.primary.main, 
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            Privacy Policy
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Footer;
