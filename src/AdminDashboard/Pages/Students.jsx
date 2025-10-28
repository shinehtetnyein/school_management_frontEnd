import React, { useState, useMemo } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	InputAdornment,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Stack,
	Paper,
} from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { mockData } from "../../mockData";
import ReusableTable from "../../Components/ReusableTable";

const Students = () => {
	const [students, setStudents] = useState(mockData.students || []);
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		class: "",
	});
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const studentColumns = [
		{ id: "name", label: "Name", minWidth: 170 },
		{ id: "email", label: "Email", minWidth: 100 },
		{ id: "phone", label: "Phone", minWidth: 100 },
		{ id: "class", label: "Class", minWidth: 100 },
	];

	const filtered = useMemo(
		() =>
			students.filter(
				(s) =>
					s.name.toLowerCase().includes(query.toLowerCase()) ||
					s.email.toLowerCase().includes(query.toLowerCase()) ||
					s.class.toLowerCase().includes(query.toLowerCase())
			),
		[students, query]
	);

	const paginatedData = useMemo(
		() => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[filtered, page, rowsPerPage]
	);

	const openNew = () => {
		setEditing(null);
		setForm({ name: "", email: "", phone: "", class: "" });
		setOpen(true);
	};
	const openEdit = (s) => {
		setEditing(s.id);
		setForm({ name: s.name, email: s.email, phone: s.phone, class: s.class });
		setOpen(true);
	};
	const save = () => {
		if (editing) {
			setStudents((prev) =>
				prev.map((p) => (p.id === editing ? { ...p, ...form } : p))
			);
		} else {
			setStudents((prev) => [{ id: `s${Date.now()}`, ...form }, ...prev]);
		}
		setOpen(false);
	};
	const remove = (id) => setStudents((prev) => prev.filter((p) => p.id !== id));

	return (
		<Paper sx={{ p: 3 }}>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{ mb: 2 }}>
				<Typography variant='h5'>Students</Typography>
				<Box sx={{ display: "flex", gap: 1 }}>
					<TextField
						size='small'
						placeholder='Search students...'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<Button
						startIcon={<AddIcon />}
						variant='contained'
						onClick={openNew}>
						Add Student
					</Button>
				</Box>
			</Stack>

			<ReusableTable
				columns={studentColumns}
				data={paginatedData}
				count={filtered.length}
				page={page}
				rowsPerPage={rowsPerPage}
				onPageChange={(e, newPage) => setPage(newPage)}
				onRowsPerPageChange={(e) => {
					setRowsPerPage(parseInt(e.target.value, 10));
					setPage(0);
				}}
				onEdit={openEdit}
				onDelete={remove}
			/>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}>
				<DialogTitle>{editing ? "Edit Student" : "Add Student"}</DialogTitle>
				<DialogContent>
					<Stack
						spacing={2}
						sx={{ mt: 1, minWidth: 360 }}>
						<TextField
							label='Full name'
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })}
						/>
						<TextField
							label='Email'
							value={form.email}
							onChange={(e) => setForm({ ...form, email: e.target.value })}
						/>
						<TextField
							label='Phone'
							value={form.phone}
							onChange={(e) => setForm({ ...form, phone: e.target.value })}
						/>
						<TextField
							label='Class'
							value={form.class}
							onChange={(e) => setForm({ ...form, class: e.target.value })}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Cancel</Button>
					<Button
						variant='contained'
						onClick={save}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Paper>
	);
};

export default Students;
