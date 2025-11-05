import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  Stack,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const sampleStudents = [
  { id: 'S1001', name: 'Aung Zaw', email: 'aung.zaw@example.com', phone: '+95 9 400 000001', class: 'Grade 10', status: 'Active', enrolled: '2024-09-01' },
  { id: 'S1002', name: 'Mya Thidar', email: 'mya.thi@example.com', phone: '+95 9 400 000002', class: 'Grade 9', status: 'Active', enrolled: '2023-06-12' },
  { id: 'S1003', name: 'Ko Ko', email: 'koko@example.com', phone: '+95 9 400 000003', class: 'Grade 11', status: 'Inactive', enrolled: '2022-03-22' },
  { id: 'S1004', name: 'Su Su', email: 'susu@example.com', phone: '+95 9 400 000004', class: 'Grade 8', status: 'Active', enrolled: '2024-01-15' },
  { id: 'S1005', name: 'Min Tun', email: 'min.tun@example.com', phone: '+95 9 400 000005', class: 'Grade 12', status: 'Active', enrolled: '2021-11-02' },
  { id: 'S1006', name: 'Hla Hla', email: 'hlahlah@example.com', phone: '+95 9 400 000006', class: 'Grade 10', status: 'Active', enrolled: '2022-08-14' },
];

function exportCSV(rows) {
  const header = ['ID', 'Name', 'Email', 'Phone', 'Class', 'Status', 'Enrolled'];
  const csv = [header, ...rows.map(r => [r.id, r.name, r.email, r.phone, r.class, r.status, r.enrolled])]
    .map(row => row.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'students.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const StudentTable = () => {
  const [students, setStudents] = useState(sampleStudents);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    if (!query) return students;
    const q = query.toLowerCase();
    return students.filter(s => (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q)
    ));
  }, [students, query]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

  const handleDelete = (id) => {
    if (!confirm('Delete student ' + id + '?')) return;
    setStudents(prev => prev.filter(p => p.id !== id));
  };

  const handleEdit = (id) => {
    alert('Edit student: ' + id);
  };

  const visible = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            placeholder="Search students, email, class..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
          />
          <Button startIcon={<DownloadIcon />} variant="outlined" size="small" onClick={() => exportCSV(filtered)}>Export</Button>
        </Stack>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>{filtered.length} students</Typography>
      </Stack>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Enrolled</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((s) => (
              <TableRow key={s.id} hover>
                <TableCell>{s.id}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main' }}>{s.name.split(' ').map(n => n[0]).slice(0,2).join('')}</Avatar>
                    <Box>
                      <Typography variant="body2">{s.name}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>{s.status}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell>{s.class}</TableCell>
                <TableCell>{s.enrolled}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleEdit(s.id)} aria-label={`edit-${s.id}`}><EditIcon /></IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(s.id)} aria-label={`delete-${s.id}`}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {visible.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">No students found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5,10,25]}
      />
    </Paper>
  );
};

export default StudentTable;
