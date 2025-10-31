import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Stack, Button, Chip } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LinearProgress from '@mui/material/LinearProgress';
import StudentTable from '../Components/StudentTable';

const StatCard = ({ icon: Icon, label, value }) => (
  <Card elevation={3} sx={{ borderRadius: 2 }}>
    <CardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={0.5}>
          <Typography variant="overline" sx={{ opacity: 0.7 }}>{label}</Typography>
          <Typography variant="h4" color="primary.main">{value}</Typography>
        </Stack>
        <Box sx={{ bgcolor: 'primary.main', color: '#fff', p: 1, borderRadius: 2, display: 'inline-flex' }}>
          <Icon />
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

const QuickLink = ({ label }) => (
  <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>{label}</Button>
);

const Dashboard = () => {
  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Welcome to the School Management System</Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>Overview for all users</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <QuickLink label="Students" />
          <QuickLink label="Teachers" />
          <QuickLink label="Classes" />
          <QuickLink label="Reports" />
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}><StatCard icon={SchoolIcon} label="Students" value={0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard icon={PersonIcon} label="Teachers" value={0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard icon={ClassIcon} label="Classes" value={0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard icon={AssessmentIcon} label="Reports" value={0} /></Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={7}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">Recent Activity</Typography>
                <Chip label="Live" color="primary" size="small" />
              </Stack>
              <Stack spacing={1.5}>
                <Typography variant="body2">• New student registered</Typography>
                <Typography variant="body2">• Class schedule updated</Typography>
                <Typography variant="body2">• Fee payment confirmed</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Attendance Overview</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>Today</Typography>
              <LinearProgress variant="determinate" value={72} sx={{ my: 1, height: 8, borderRadius: 4 }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">Present</Typography>
                <Typography variant="body2">72%</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Student table */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Students</Typography>
        <StudentTable />
      </Box>
    </Box>
  );
}

export default Dashboard;
