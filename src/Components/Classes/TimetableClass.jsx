import React, { useState } from "react";
import {
	Box,
	Paper,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";

// --- Mock Data ---
// In a real application, this data would come from an API.

const teachers = [
	{ name: "Mr. Armstrong", color: "#4CAF50" }, // Green
	{ name: "Ms. Beatty", color: "#2196F3" }, // Blue
	{ name: "Mr. Cortez", color: "#FF9800" }, // Orange
	{ name: "Mrs. Davis", color: "#9C27B0" }, // Purple
	{ name: "Coach Evans", color: "#f44336" }, // Red
	{ name: "Ms. Foster", color: "#00BCD4" }, // Cyan
];

const classes = [
	{
		id: 1,
		subject: "Algebra II",
		teacherName: "Mr. Armstrong",
		day: "Monday",
		startTime: "09:00",
		endTime: "10:00",
	},
	{
		id: 2,
		subject: "English Lit",
		teacherName: "Ms. Beatty",
		day: "Monday",
		startTime: "10:00",
		endTime: "11:00",
	},
	{
		id: 3,
		subject: "Chemistry",
		teacherName: "Mrs. Davis",
		day: "Tuesday",
		startTime: "11:00",
		endTime: "13:00", // 2-hour class
	},
	{
		id: 4,
		subject: "World History",
		teacherName: "Mr. Cortez",
		day: "Wednesday",
		startTime: "13:00",
		endTime: "14:00",
	},
	{
		id: 5,
		subject: "Calculus",
		teacherName: "Mr. Armstrong",
		day: "Thursday",
		startTime: "14:00",
		endTime: "15:00",
	},
	{
		id: 6,
		subject: "Poetry",
		teacherName: "Ms. Beatty",
		day: "Friday",
		startTime: "09:00",
		endTime: "10:00",
	},
	{
		id: 7,
		subject: "Lab Session",
		teacherName: "Mrs. Davis",
		day: "Friday",
		startTime: "13:00",
		endTime: "15:00", // 2-hour lab
	},
];

const daysOfWeek = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
const timeSlots = Array.from(
	{ length: 10 },
	(_, i) => `${String(i + 8).padStart(2, "0")}:00`
); // 8 AM to 5 PM

/**
 * A card component to display individual class details within the timetable.
 */
const ClassCard = ({ classInfo, teacher }) => (
	<Paper
		elevation={3}
		sx={{
			p: 1,
			height: "100%",
			backgroundColor: teacher?.color || "#f0f0f0",
			color: "white",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		}}>
		<Typography
			variant='subtitle2'
			sx={{ fontWeight: "bold" }}>
			{classInfo.subject}
		</Typography>
		<Typography variant='caption'>{classInfo.teacherName}</Typography>
		<Typography variant='caption'>
			{classInfo.startTime} - {classInfo.endTime}
		</Typography>
	</Paper>
);

const TimetableClass = () => {
	const [selectedTeacher, setSelectedTeacher] = useState("All");

	const handleTeacherChange = (event) => {
		setSelectedTeacher(event.target.value);
	};

	const getGridPosition = (classInfo) => {
		const dayIndex = daysOfWeek.indexOf(classInfo.day) + 2; // +2 because grid column 1 is for time labels
		const startRowIndex = timeSlots.indexOf(classInfo.startTime) + 2; // +2 because grid row 1 is for day headers
		const endRowIndex = timeSlots.indexOf(classInfo.endTime) + 2;

		if (dayIndex < 2 || startRowIndex < 2 || endRowIndex < 2) return {};

		return {
			gridColumn: dayIndex,
			gridRow: `${startRowIndex} / ${endRowIndex}`,
		};
	};

	const filteredClasses =
		selectedTeacher === "All"
			? classes
			: classes.filter((c) => c.teacherName === selectedTeacher);

	return (
		<Box sx={{ p: 3 }}>
			<Paper sx={{ p: 3, overflowX: "auto" }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 2,
					}}>
					<Typography
						variant='h4'
						gutterBottom>
						Weekly Timetable
					</Typography>
					<FormControl sx={{ minWidth: 240 }}>
						<InputLabel id='teacher-filter-label'>Filter by Teacher</InputLabel>
						<Select
							labelId='teacher-filter-label'
							value={selectedTeacher}
							label='Filter by Teacher'
							onChange={handleTeacherChange}>
							<MenuItem value='All'>All Teachers</MenuItem>
							{teachers.map((teacher) => (
								<MenuItem
									key={teacher.name}
									value={teacher.name}>
									{teacher.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ width: "100%", overflow: "auto" }}>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "auto repeat(7, 1fr)",
							gridTemplateRows: `auto repeat(${timeSlots.length}, 1fr)`,
							gap: 1,
							minWidth: "1000px", // Ensure it's wide enough for all days
							p: 3,
						}}>
						{/* Time Slot Headers (Column 1) */}
						{timeSlots.map((time, index) => (
							<Box
								key={time}
								sx={{
									gridRow: index + 2,
									gridColumn: 1,
									p: 1,
								}}>
								<Typography variant='caption'>{time}</Typography>
							</Box>
						))}

						{/* Day Headers (Row 1) */}
						{daysOfWeek.map((day, index) => (
							<Paper
								key={day}
								sx={{
									gridRow: 1,
									gridColumn: index + 2,
									p: 1,
									textAlign: "center",
								}}>
								<Typography variant='subtitle1'>{day}</Typography>
							</Paper>
						))}

						{/* Class Cards */}
						{filteredClasses.map((classInfo) => {
							const teacher = teachers.find(
								(t) => t.name === classInfo.teacherName
							);
							return (
								<Box
									key={classInfo.id}
									sx={getGridPosition(classInfo)}>
									<ClassCard
										classInfo={classInfo}
										teacher={teacher}
									/>
								</Box>
							);
						})}
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default TimetableClass;
