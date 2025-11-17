import React, { useState } from "react";
import TableComponent from "../../Reuseable/TableComponent";
import { Box, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalBox from "../../Reuseable/ModalBox";

// Sample data for the homework table
const homeworkData = [
	{
		id: "HW001",
		class: "10th",
		section: "A",
		subject: "Mathematics",
		homeworkDate: "2025-11-16",
		submissionDate: "2025-11-20",
		submittedBy: "Alice",
	},
	{
		id: "HW002",
		class: "9th",
		section: "B",
		subject: "Science",
		homeworkDate: "2025-11-16",
		submissionDate: "2025-11-21",
		submittedBy: "Bob",
	},
	{
		id: "HW003",
		class: "10th",
		section: "A",
		subject: "History",
		homeworkDate: "2025-11-14",
		submissionDate: "2025-11-15", // Overdue
		submittedBy: "Charlie",
	},
];

/**
 * Renders a status chip based on the submission date.
 * @param {string} submissionDate - The due date for the homework.
 * @returns {JSX.Element} A Material-UI Chip component.
 */
const StatusCell = ({ value: submissionDate }) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Normalize today's date

	const dueDate = new Date(submissionDate);
	dueDate.setHours(0, 0, 0, 0); // Normalize due date

	let status = {
		label: "Pending",
		color: "primary",
	};

	if (dueDate < today) {
		status = {
			label: "Overdue",
			color: "error",
		};
	} else if (dueDate.getTime() === today.getTime()) {
		status = {
			label: "Due Today",
			color: "warning",
		};
	}

	return (
		<Chip
			label={status.label}
			color={status.color}
			size='small'
		/>
	);
};

const Homework = () => {
	// --- STATE MANAGEMENT ---
	const [homework, setHomework] = useState(homeworkData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingHomework, setEditingHomework] = useState(null);

	// --- MODAL AND DATA HANDLERS ---
	const handleOpenModal = (homeworkItem) => {
		setEditingHomework(homeworkItem);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingHomework(null);
	};

	const handleSaveChanges = (updatedHomework) => {
		setHomework((prevHomework) =>
			prevHomework.map((hw) =>
				hw.id === updatedHomework.id ? updatedHomework : hw
			)
		);
		handleCloseModal();
	};

	const columns = [
		{ Header: "ID", accessor: "id", disableSort: true },
		{ Header: "Class", accessor: "class" },
		{ Header: "Section", accessor: "section" },
		{ Header: "Subject", accessor: "subject" },
		{ Header: "Homework Date", accessor: "homeworkDate" },
		{ Header: "Submission Date", accessor: "submissionDate" },
		{ Header: "Submit By", accessor: "submittedBy" },
		{
			Header: "Status",
			accessor: "status", // This can be a dummy accessor
			Cell: ({ row }) => <StatusCell value={row.submissionDate} />,
		},
		{
			Header: "Actions",
			accessor: "actions",
			disableSort: true,
			Cell: ({ row }) => (
				<IconButton
					onClick={(e) => {
						e.stopPropagation(); // Prevent row selection
						handleOpenModal(row);
					}}>
					<EditIcon />
				</IconButton>
			),
		},
	];

	const handleDelete = (selectedIds) => {
		const updatedHomework = homework.filter(
			(item) => !selectedIds.includes(item.id)
		);
		setHomework(updatedHomework);
		console.log("Deleted IDs:", selectedIds);
	};

	return (
		<Box sx={{ p: 3 }}>
			{/* --- HOMEWORK TABLE --- */}
			<TableComponent
				columns={columns}
				data={homework}
				onDeleteSelected={handleDelete}
				title='Homework Assignments'
			/>

			{/* --- REUSABLE EDIT MODAL --- */}
			<ModalBox
				open={isModalOpen}
				onClose={handleCloseModal}
				item={editingHomework}
				onSave={handleSaveChanges}
				title='Edit Homework'
			/>
		</Box>
	);
};

export default Homework;
