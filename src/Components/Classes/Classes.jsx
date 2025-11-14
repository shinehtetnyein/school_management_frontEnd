import React, { useState, useMemo } from "react";
import TableComponent from "../../TableComponent";
import { Typography, Box } from "@mui/material";

/**
 * Formats a time string to a consistent HH:MM AM/PM format.
 * Ensures hours are zero-padded.
 *  timeString The time string to format (e.g., "9:00 AM").
 *   The formatted time string (e.g., "09:00 AM").
 */
const formatTime = (timeString) => {
	if (!timeString) return "";
	const [time, modifier] = timeString.split(" ");
	let [hours, minutes] = time.split(":");

	if (hours.length < 2) {
		hours = `0${hours}`;
	}

	return `${hours}:${minutes} ${modifier}`;
};

/**
 * The Classes component renders a page to display and manage school classes.
 * It uses the reusable TableComponent to show class data and provides functionality
 * for deleting classes and applying custom row styles for full classes.
 */
const Classes = () => {
	const columns = useMemo(
		() => [
			{ Header: "Class Name", accessor: "name" },
			{ Header: "Subject", accessor: "subject" },
			{ Header: "Section", accessor: "section" },
			{ Header: "Teacher", accessor: "teacher" },
			{ Header: "Room", accessor: "room" },
			{ Header: "Days", accessor: "days" },
			{
				Header: "Start Time",
				accessor: "startTime",
				Cell: ({ value }) => formatTime(value),
			},
			{
				Header: "End Time",
				accessor: "endTime",
				Cell: ({ value }) => formatTime(value),
			},
			{ Header: "No of Students", accessor: "studentCount" },
		],
		[]
	);

	const initialData = useMemo(
		() => [
			{
				id: 1,
				name: "Algebra II",
				subject: "Math",
				section: "A",
				teacher: "Mr. Armstrong",
				room: "201",
				days: "M/W/F",
				startTime: "9:00 AM",
				endTime: "9:50 AM",
				studentCount: 25,
			},
			{
				id: 2,
				name: "English Literature",
				subject: "English",
				section: "B",
				teacher: "Ms. Beatty",
				room: "105",
				days: "T/Th",
				startTime: "10:30 AM",
				endTime: "11:45 AM",
				studentCount: 30,
			},
			{
				id: 3,
				name: "World History",
				subject: "History",
				section: "A",
				teacher: "Mr. Cortez",
				room: "303",
				days: "M/W/F",
				startTime: "1:00 PM",
				endTime: "1:50 PM",
				studentCount: 28,
			},
			{
				id: 4,
				name: "Chemistry",
				subject: "Science",
				section: "C",
				teacher: "Mrs. Davis",
				room: "Lab A",
				days: "T/Th",
				startTime: "8:00 AM",
				endTime: "9:15 AM",
				studentCount: 22,
			},
			{
				id: 5,
				name: "Physical Education",
				subject: "PE",
				section: "All",
				teacher: "Coach Evans",
				room: "Gym",
				days: "Daily",
				startTime: "11:00 AM",
				endTime: "12:00 PM",
				studentCount: 45,
			},
			{
				id: 6,
				name: "Studio Art",
				subject: "Arts",
				section: "D",
				teacher: "Ms. Foster",
				room: "Art Studio",
				days: "M/W",
				startTime: "2:30 PM",
				endTime: "3:45 PM",
				studentCount: 18,
			},
		],
		[]
	);

	const [data, setData] = useState(initialData);

	/**
	 * Handles the deletion of selected rows from the table.
	 *  selectedIds An array of IDs for the rows to be deleted.
	 */
	const handleDelete = (selectedIds) => {
		const newData = data.filter((row) => !selectedIds.includes(row.id));
		setData(newData);
	};

	/**
	 * A callback function passed to the TableComponent to apply conditional styling to rows.
	 * It highlights rows for classes that are at or over capacity (30+ students).
	 *  row The data object for the current row.
	 *   A style object to be applied to the row, or an empty object for default styling.
	 */
	const getRowStyling = (row) => {
		if (row.studentCount >= 30) {
			return {
				backgroundColor: "rgba(255, 204, 204, 0.4)", // Light red background
			};
		}
		return {}; // Return empty object for default styling
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography
				variant='h4'
				gutterBottom></Typography>
			<TableComponent
				columns={columns}
				data={data}
				onDeleteSelected={handleDelete}
				title='Classes'
				getRowStyles={getRowStyling}
			/>
		</Box>
	);
};

export default Classes;
