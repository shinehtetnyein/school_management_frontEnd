import React, { useState, useMemo } from "react";
import TableComponent from "../Reuseable/TableComponent";
import {
	Box,
	Chip,
	IconButton,
	Modal,
	Tooltip,
	Typography,
	Paper,
	Grid,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

// --- Sample Data and Helper Functions ---

const resultData = [
	{
		id: "RES001",
		studentName: "Alice",
		mathematics: 95,
		science: 88,
		history: 76,
	},
	{
		id: "RES002",
		studentName: "Bob",
		mathematics: 45,
		science: 52,
		history: 61,
	},
	{
		id: "RES003",
		studentName: "Charlie",
		mathematics: 25,
		science: 40,
		history: 35,
	},
];

const processResults = (data) => {
	return data.map((student) => {
		const total = student.mathematics + student.science + student.history;
		const percent = (total / 300) * 100; // Assuming max marks are 100 per subject
		let grade = "F";
		if (percent >= 90) grade = "A+";
		else if (percent >= 80) grade = "A";
		else if (percent >= 70) grade = "B";
		else if (percent >= 60) grade = "C";
		else if (percent >= 50) grade = "D";
		else if (percent >= 33) grade = "E";

		const result = percent >= 33 ? "Pass" : "Fail";

		return {
			...student,
			total,
			percent: `${percent.toFixed(2)}%`,
			grade,
			result,
		};
	});
};

const ResultStatusCell = ({ value }) => (
	<Chip
		label={value}
		color={value === "Pass" ? "success" : "error"}
		size='small'
		sx={{ fontWeight: "bold" }}
	/>
);

const ExamResult = () => {
	// --- STATE MANAGEMENT ---
	const [results, setResults] = useState(processResults(resultData));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState(null);

	const columns = useMemo(
		() => [
			{ Header: "ID", accessor: "id" },
			{ Header: "Student Name", accessor: "studentName" },
			{ Header: "Mathematics", accessor: "mathematics" },
			{ Header: "Science", accessor: "science" },
			{ Header: "History", accessor: "history" },
			{ Header: "Total", accessor: "total" },
			{ Header: "Percent", accessor: "percent" },
			{ Header: "Grade", accessor: "grade" },
			{
				Header: "Result",
				accessor: "result",
				Cell: ({ value }) => <ResultStatusCell value={value} />,
			},
			{
				Header: "Action",
				accessor: "action",
				disableSort: true,
				Cell: ({ row }) => (
					<Tooltip title='View Report Card'>
						<IconButton
							onClick={(e) => {
								e.stopPropagation();
								handleOpenModal(row);
							}}>
							<ArticleIcon />
						</IconButton>
					</Tooltip>
				),
			},
		],
		[]
	);

	// --- HANDLERS ---
	const handleOpenModal = (studentData) => {
		setSelectedStudent(studentData);
		setIsModalOpen(true);
	};

	const handleDelete = (selectedIds) => {
		const updatedResults = results.filter(
			(item) => !selectedIds.includes(item.id)
		);
		setResults(updatedResults);
	};

	const handleCloseModal = () => setIsModalOpen(false);

	return (
		<Box sx={{ p: 3 }}>
			<TableComponent
				columns={columns}
				data={results}
				onDeleteSelected={handleDelete}
				title='Exam Results'
			/>

			{/* --- REPORT CARD MODAL --- */}
			<Modal
				open={isModalOpen}
				onClose={handleCloseModal}>
				<Paper
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 500,
						boxShadow: 24,
						p: 4,
					}}>
					{selectedStudent && (
						<>
							<Typography
								variant='h5'
								component='h2'
								gutterBottom
								align='center'>
								Student Report Card
							</Typography>
							<Typography variant='h6'>
								{selectedStudent.studentName}
							</Typography>
							<Typography
								variant='subtitle1'
								color='text.secondary'
								gutterBottom>
								ID: {selectedStudent.id}
							</Typography>
							<Box sx={{ my: 2 }}>
								<Grid
									container
									spacing={1}>
									<Grid
										item
										xs={6}>
										<Typography>Mathematics:</Typography>
									</Grid>
									<Grid
										item
										xs={6}>
										<Typography align='right'>
											{selectedStudent.mathematics}
										</Typography>
									</Grid>
									{/* Repeat for other subjects */}
								</Grid>
							</Box>
							<Box sx={{ borderTop: 1, borderColor: "divider", pt: 2, mt: 2 }}>
								<Typography variant='h6'>
									Total: {selectedStudent.total}
								</Typography>
								<Typography variant='h6'>
									Percentage: {selectedStudent.percent}
								</Typography>
								<Typography variant='h6'>
									Grade: {selectedStudent.grade}
								</Typography>
								<ResultStatusCell value={selectedStudent.result} />
							</Box>
						</>
					)}
				</Paper>
			</Modal>
		</Box>
	);
};

export default ExamResult;
