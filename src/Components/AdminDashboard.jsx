import React, { useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Badge,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { mockData } from "../mockData";
import "../styles/admin.css";

function StudentsSection() {
  const [students, setStudents] = useState(mockData.students || []);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", class: "" });

  const filtered = useMemo(() => students.filter(s => (
    s.name.toLowerCase().includes(query.toLowerCase()) || s.email.toLowerCase().includes(query.toLowerCase())
  )), [students, query]);

  const openNew = () => { setEditing(null); setForm({ name: "", email: "", phone: "", class: "" }); setOpen(true); };
  const openEdit = (s) => { setEditing(s.id); setForm({ name: s.name, email: s.email, phone: s.phone, class: s.class }); setOpen(true); };
  const save = () => {
    if (editing) {
      setStudents(prev => prev.map(p => p.id === editing ? { ...p, ...form } : p));
    } else {
      setStudents(prev => [{ id: `s${Date.now()}`, ...form }, ...prev]);
    }
    setOpen(false);
  };
  const remove = (id) => setStudents(prev => prev.filter(p => p.id !== id));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb:2 }}>
        <Typography variant="h6">Students</Typography>
        <Box sx={{ display: 'flex', gap:1 }}>
          <TextField size="small" placeholder="Search students" value={query} onChange={(e)=>setQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
          <Button startIcon={<AddIcon/>} variant="contained" onClick={openNew}>Add Student</Button>
        </Box>
      </Stack>

      <Card className="panel-card">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{s.class}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={()=>openEdit(s)}><EditIcon fontSize="small"/></IconButton>
                    <IconButton size="small" color="error" onClick={()=>remove(s.id)}><DeleteIcon fontSize="small"/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>{editing ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt:1, minWidth: 360 }}>
            <TextField label="Full name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            <TextField label="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
            <TextField label="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
            <TextField label="Class" value={form.class} onChange={(e)=>setForm({...form, class:e.target.value})} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function TeachersSection(){
  const [teachers, setTeachers] = useState(mockData.teachers || []);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', subject:'' });
  const openNew = ()=>{ setForm({ name:'', email:'', subject:'' }); setOpen(true); };
  const save = ()=>{ setTeachers(prev=>[{ id:`t${Date.now()}`, ...form }, ...prev]); setOpen(false); };
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb:2 }}>
        <Typography variant="h6">Teachers</Typography>
        <Button startIcon={<AddIcon/>} variant="contained" onClick={openNew}>Add Teacher</Button>
      </Stack>
      <Card className="panel-card">
        <CardContent>
          <ul>
            {teachers.map(t=>(<li key={t.id}>{t.name} — {t.subject} — {t.email}</li>))}
          </ul>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt:1, minWidth: 360 }}>
            <TextField label="Full name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
            <TextField label="Email" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
            <TextField label="Subject" value={form.subject} onChange={(e)=>setForm({...form, subject:e.target.value})} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function CoursesSection(){
  return (
    <Box>
      <Typography variant="h6" sx={{ mb:2 }}>Courses</Typography>
      <Card className="panel-card">
        <CardContent>
          <Typography>Course management will follow the class diagram. Sample courses:</Typography>
          <ul>
            <li>Mathematics - Grade 10</li>
            <li>Science - Grade 10</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
}

function AttendanceSection(){
  return (
    <Box>
      <Typography variant="h6" sx={{ mb:2 }}>Attendance</Typography>
      <Card className="panel-card">
        <CardContent>
          <Typography>Attendance reports and quick filters will appear here. Example:</Typography>
          <ul>
            <li>2025-07-01 — Grade 10 — Present: 23 / Absent: 2</li>
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
}

function LibrarySection(){
  return (
    <Box>
      <Typography variant="h6" sx={{ mb:2 }}>Library</Typography>
      <Card className="panel-card">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow><TableCell>Title</TableCell><TableCell>Author</TableCell><TableCell>Category</TableCell></TableRow>
            </TableHead>
            <TableBody>
              {mockData.books.map(b=>(<TableRow key={b.id}><TableCell>{b.title}</TableCell><TableCell>{b.author}</TableCell><TableCell>{b.category||'General'}</TableCell></TableRow>))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

function ResourcesSection(){
  return (
    <Box>
      <Typography variant="h6" sx={{ mb:2 }}>Resources</Typography>
      <Card className="panel-card">
        <CardContent>
          <ul>
            {mockData.resources.map(r=>(<li key={r.id}>{r.name} — qty: {r.quantity} — {r.status}</li>))}
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
}

function ReportsSection(){
  return (
    <Box>
      <Typography variant="h6" sx={{ mb:2 }}>Reports</Typography>
      <Card className="panel-card">
        <CardContent>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Export Students CSV</Button>
            <Button variant="outlined">Export Attendance</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

function SettingsSection(){
  const [schoolName, setSchoolName] = useState("My School");
  const [term, setTerm] = useState("2025 Spring");
  return (
    <Box>
      <Typography variant="h6" sx={{ mb:2 }}>Settings</Typography>
      <Card className="panel-card">
        <CardContent>
          <Stack spacing={2} sx={{ maxWidth: 520 }}>
            <TextField label="School name" value={schoolName} onChange={(e)=>setSchoolName(e.target.value)} />
            <TextField label="Current term" value={term} onChange={(e)=>setTerm(e.target.value)} />
            <Stack direction="row" spacing={2}><Button variant="contained">Save</Button><Button>Reset</Button></Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState("overview");

  return (
    <div className="admin-root">
      <AppBar position="static" className="admin-topbar">
        <Toolbar className="admin-toolbar">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" className="admin-title">School Management</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>Admin Panel</Typography>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <TextField
              placeholder="Search students, teachers, events..."
              size="small"
              variant="outlined"
              className="search-input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: '#fff', color: '#764ba2' }}>A</Avatar>
            <Button color="inherit" onClick={() => navigate('/')} >Sign Out</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box className="admin-container">
        <Box className="admin-sidebar">
          <Typography variant="subtitle1" className="sidebar-section">Menu</Typography>
          <Typography className={`sidebar-item ${section==='overview'?'active':''}`} onClick={() => setSection('overview')}>Overview</Typography>
          <Typography className={`sidebar-item ${section==='students'?'active':''}`} onClick={() => setSection('students')}>Students</Typography>
          <Typography className={`sidebar-item ${section==='teachers'?'active':''}`} onClick={() => setSection('teachers')}>Teachers</Typography>
          <Typography className={`sidebar-item ${section==='courses'?'active':''}`} onClick={() => setSection('courses')}>Courses</Typography>
          <Typography className={`sidebar-item ${section==='attendance'?'active':''}`} onClick={() => setSection('attendance')}>Attendance</Typography>
          <Typography className={`sidebar-item ${section==='library'?'active':''}`} onClick={() => setSection('library')}>Library</Typography>
          <Typography className={`sidebar-item ${section==='resources'?'active':''}`} onClick={() => setSection('resources')}>Resources</Typography>
          <Typography className={`sidebar-item ${section==='reports'?'active':''}`} onClick={() => setSection('reports')}>Reports</Typography>
          <Typography className={`sidebar-item ${section==='settings'?'active':''}`} onClick={() => setSection('settings')}>Settings</Typography>
        </Box>

        <Box className="admin-main">
          <Typography variant="h4" className="main-heading">{section === 'overview' ? 'Welcome, Admin' : (section.charAt(0).toUpperCase() + section.slice(1))}</Typography>

          {section === 'overview' && (
            <>
              <Grid container spacing={2} className="stat-grid">
                <Grid item xs={12} sm={6} md={3}>
                  <Card className="stat-card">
                    <CardContent>
                      <Typography className="stat-number">{mockData.students.length}</Typography>
                      <Typography className="stat-label">Students</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className="stat-card">
                    <CardContent>
                      <Typography className="stat-number">{mockData.teachers.length}</Typography>
                      <Typography className="stat-label">Teachers</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className="stat-card">
                    <CardContent>
                      <Typography className="stat-number">{mockData.courses ? mockData.courses.length : 12}</Typography>
                      <Typography className="stat-label">Courses</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card className="stat-card">
                    <CardContent>
                      <Typography className="stat-number">{mockData.events.length}</Typography>
                      <Typography className="stat-label">Events</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Box className="panel-row">
                <Card className="panel-card">
                  <CardContent>
                    <Typography variant="h6">Recent Registrations</Typography>
                    <ul className="simple-list">
                      {mockData.students.slice(0,3).map(s => (<li key={s.id}>{s.name} - Student</li>))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="panel-card">
                  <CardContent>
                    <Typography variant="h6">Upcoming Events</Typography>
                    <ul className="simple-list">
                      {mockData.events.map(ev => (<li key={ev.id}>{ev.title} - {ev.start_date}</li>))}
                    </ul>
                  </CardContent>
                </Card>
              </Box>
            </>
          )}

          {section === 'students' && <StudentsSection />}
          {section === 'teachers' && <TeachersSection />}
          {section === 'courses' && <CoursesSection />}
          {section === 'attendance' && <AttendanceSection />}
          {section === 'library' && <LibrarySection />}
          {section === 'resources' && <ResourcesSection />}
          {section === 'reports' && <ReportsSection />}
          {section === 'settings' && <SettingsSection />}

        </Box>
      </Box>
    </div>
  );
}
