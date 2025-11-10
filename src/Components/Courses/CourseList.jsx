import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const courseData = [
	{ name: "Mathematics", color: "#F44336" },
	{ name: "English Literature", color: "#E91E63" },
	{ name: "Physics", color: "#9C27B0" },
	{ name: "Chemistry", color: "#673AB7" },
	{ name: "Biology", color: "#3F51B5" },
	{ name: "History", color: "#2196F3" },
	{ name: "Geography", color: "#03A9F4" },
	{ name: "Computer Science", color: "#00BCD4" },
	{ name: "Art & Design", color: "#009688" },
	{ name: "Music", color: "#4CAF50" },
	{ name: "Physical Education", color: "#8BC34A" },
	{ name: "Economics", color: "#CDDC39" },
];

const CourseList = () => {
	const navigate = useNavigate();

	const handleCardClick = (courseName) => {
		const courseSlug = courseName
			.toLowerCase()
			.replace(/ & /g, "and")
			.replace(/\s+/g, "-");
		// Navigate relative to the current path (/dashboard/courses)
		navigate(courseSlug);
	};

	return (
		<Box sx={{ p: 3, height: "100vh", boxSizing: "border-box" }}>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: 4,
					height: "100%",
				}}>
				{courseData.map((course) => (
					<Box
						key={course.name}
						sx={{
							flex: "1 1 calc(33.333% - 32px)", // 3 columns with gap
							display: "flex",
							boxSizing: "border-box",
						}}>
						<Card
							onClick={() => handleCardClick(course.name)}
							sx={{
								backgroundColor: course.color,
								color: "white",
								width: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								cursor: "pointer",
								transition: "transform 0.2s ease-in-out",
								"&:hover": {
									transform: "scale(1.03)",
								},
							}}>
							<CardContent>
								<Typography
									variant='h5'
									component='div'
									align='center'>
									{course.name}
								</Typography>
							</CardContent>
						</Card>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default CourseList;
