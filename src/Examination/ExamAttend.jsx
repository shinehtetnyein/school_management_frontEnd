import React, { useState, useMemo } from "react";
import TableComponent from "../Reuseable/TableComponent";
import { Box, Chip } from "@mui/material";

// --- Sample Data ---
const attendanceData = [
	{
		id: "STU001",
		studentName: "Alice",
		mathematics: "Present",
		science: "Present",
		history: "Absent",
	},
	{
		id: "STU002",
		studentName: "Bob",
		mathematics: "Present",
		science: "Present",
		history: "Present",
	},
	{
		id: "STU003",
		studentName: "Charlie",
		mathematics: "Absent",
		science: "Present",
		history: "Absent",
	},
];

// --- Custom Cell Renderer for Status ---
const AttendanceStatusCell = ({ value }) => (
	<Chip
		label={value}
		color={value === "Absent" ? "error" : "success"}
		size='small'
		sx={{ fontWeight: "500" }}
	/>
);

const ExamAttend = () => {
	const [attendance, setAttendance] = useState(attendanceData);

	const columns = useMemo(
		() => [
			{ Header: "ID", accessor: "id" },
			{ Header: "Student Name", accessor: "studentName" },
			{
				Header: "Mathematics",
				accessor: "mathematics",
				Cell: ({ value }) => <AttendanceStatusCell value={value} />,
			},
			{
				Header: "Science",
				accessor: "science",
				Cell: ({ value }) => <AttendanceStatusCell value={value} />,
			},
			{
				Header: "History",
				accessor: "history",
				Cell: ({ value }) => <AttendanceStatusCell value={value} />,
			},
		],
		[]
	);

	return (
		<Box sx={{ p: 3 }}>
			<TableComponent
				columns={columns}
				data={attendance}
				onDeleteSelected={(selectedIds) =>
					setAttendance(
						attendance.filter((item) => !selectedIds.includes(item.id))
					)
				}
				title='Exam Attendance'
			/>
		</Box>
	);
};

export default ExamAttend;
