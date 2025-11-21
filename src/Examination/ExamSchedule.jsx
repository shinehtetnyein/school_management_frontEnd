import React, { useState } from "react";
import TableComponent from "../Reuseable/TableComponent";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalBox from "../Reuseable/ModalBox";

// Sample data for the exam schedule table
const examData = [
	{
		id: "EXM001",
		subject: "Mathematics",
		examDate: "2025-12-01",
		startTime: "09:00 AM",
		endTime: "12:00 PM",
		duration: "3 hours",
		roomNo: "101",
		maxMark: 100,
		minMark: 33,
	},
	{
		id: "EXM002",
		subject: "Science",
		examDate: "2025-12-03",
		startTime: "09:00 AM",
		endTime: "11:30 AM",
		duration: "2.5 hours",
		roomNo: "102",
		maxMark: 75,
		minMark: 25,
	},
	{
		id: "EXM003",
		subject: "History",
		examDate: "2025-12-05",
		startTime: "01:00 PM",
		endTime: "03:00 PM",
		duration: "2 hours",
		roomNo: "205",
		maxMark: 50,
		minMark: 17,
	},
];

const ExamSchedule = () => {
	// --- STATE MANAGEMENT ---
	const [schedule, setSchedule] = useState(examData);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingExam, setEditingExam] = useState(null);

	// --- MODAL AND DATA HANDLERS ---
	const handleOpenModal = (examItem) => {
		setEditingExam(examItem);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingExam(null);
	};

	const handleSaveChanges = (updatedExam) => {
		setSchedule((prevSchedule) =>
			prevSchedule.map((ex) => (ex.id === updatedExam.id ? updatedExam : ex))
		);
		handleCloseModal();
	};

	const handleDelete = (selectedIds) => {
		const updatedSchedule = schedule.filter(
			(item) => !selectedIds.includes(item.id)
		);
		setSchedule(updatedSchedule);
		console.log("Deleted Exam IDs:", selectedIds);
	};

	const columns = [
		{ Header: "Subject", accessor: "subject" },
		{ Header: "Exam Date", accessor: "examDate" },
		{ Header: "Start Time", accessor: "startTime" },
		{ Header: "End Time", accessor: "endTime" },
		{ Header: "Duration", accessor: "duration" },
		{ Header: "Room No", accessor: "roomNo" },
		{ Header: "Max Mark", accessor: "maxMark" },
		{ Header: "Min Mark", accessor: "minMark" },
		{
			Header: "Action",
			accessor: "action",
			disableSort: true,
			Cell: ({ row }) => (
				<Tooltip title='Edit Schedule'>
					<IconButton
						onClick={(e) => {
							e.stopPropagation(); // Prevent row selection on click
							handleOpenModal(row);
						}}>
						<EditIcon />
					</IconButton>
				</Tooltip>
			),
		},
	];

	return (
		<Box sx={{ p: 3 }}>
			<TableComponent
				columns={columns}
				data={schedule}
				onDeleteSelected={handleDelete}
				title='Exam Schedule'
			/>
			<ModalBox
				open={isModalOpen}
				onClose={handleCloseModal}
				item={editingExam}
				onSave={handleSaveChanges}
				title='Edit Exam Schedule'
			/>
		</Box>
	);
};

export default ExamSchedule;
