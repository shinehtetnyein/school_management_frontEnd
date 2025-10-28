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

const Teachers = () => {
	const [teachers, setTeachers] = useState(mockData.teachers || []);
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({
		name: "",
		email: "",
		subject: "",
	});
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const teacherColumns = [
		{ id: "name", label: "Name", minWidth: 170 },
		{ id: "email", label: "Email", minWidth: 100 },
		{ id: "subject", label: "Subject", minWidth: 100 },
	];

	const filtered = useMemo(
		() =>
			teachers.filter(
				(t) =>
					t.name.toLowerCase().includes(query.toLowerCase()) ||
					t.email.toLowerCase().includes(query.toLowerCase()) ||
					t.subject.toLowerCase().includes(query.toLowerCase())
			),
		[teachers, query]
	);

	const paginatedData = useMemo(
		() => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[filtered, page, rowsPerPage]
	);

	const openNew = () => {
		setEditing(null);
		setForm({ name: "", email: "", subject: "" });
		setOpen(true);
	};
	const openEdit = (t) => {
		setEditing(t.id);
		setForm({ name: t.name, email: t.email, subject: t.subject });
		setOpen(true);
	};
	const save = () => {
		if (editing) {
			setTeachers((prev) =>
				prev.map((p) => (p.id === editing ? { ...p, ...form } : p))
			);
		} else {
			setTeachers((prev) => [{ id: `t${Date.now()}`, ...form }, ...prev]);
		}
		setOpen(false);
	};
	const remove = (id) => setTeachers((prev) => prev.filter((p) => p.id !== id));

	return (
		<Paper sx={{ p: 3 }}>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{ mb: 2 }}>
				<Typography variant='h5'>Teachers</Typography>
				<Box sx={{ display: "flex", gap: 1 }}>
					<TextField
						size='small'
						placeholder='Search teachers...'
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
						Add Teacher
					</Button>
				</Box>
			</Stack>

			<ReusableTable
				columns={teacherColumns}
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
				<DialogTitle>{editing ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
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
							label='Subject'
							value={form.subject}
							onChange={(e) => setForm({ ...form, subject: e.target.value })}
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

export default Teachers;
