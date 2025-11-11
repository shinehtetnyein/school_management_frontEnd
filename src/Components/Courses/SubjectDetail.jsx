import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	Box,
	Container,
	Typography,
	Paper,
	CircularProgress,
	Alert,
	Button,
} from "@mui/material";
import {} from "@mui/icons-material";

// Mock data simulating what an API would return.
// The 'slug' should match the one generated in CourseList.jsx
const mockSubjectDetails = [
	{
		slug: "mathematics",
		name: "Mathematics",
		description:
			"This course covers fundamental concepts of calculus, algebra, and geometry. Students will develop problem-solving skills and a strong mathematical foundation.",
		instructor: "Dr. Evelyn Reed",
		duration: "14 weeks",
		credits: 3,
	},
	{
		slug: "english-literature",
		name: "English Literature",
		description:
			"A survey of major works of English literature from the Renaissance to the modern period. Focus on critical reading and analytical writing.",
		instructor: "Prof. Julian Vance",
		duration: "12 weeks",
		credits: 3,
	},
	// ... add mock details for all 12 courses here for completeness
	{
		slug: "computer-science",
		name: "Computer Science",
		description:
			"An introduction to programming, data structures, and algorithms. This course uses Python to teach the core principles of computational thinking.",
		instructor: "Dr. Ada Lovelace",
		duration: "15 weeks",
		credits: 4,
	},
	{
		slug: "physics",
		name: "Physics",
		description:
			"Explore the laws of motion, energy, and the universe. From classical mechanics to quantum physics, this course builds a strong foundation in physical sciences.",
		instructor: "Dr. Isaac Newton",
		duration: "15 weeks",
		credits: 4,
	},
	{
		slug: "chemistry",
		name: "Chemistry",
		description:
			"Dive into the world of atoms, molecules, and chemical reactions. This course covers organic and inorganic chemistry principles.",
		instructor: "Dr. Marie Curie",
		duration: "15 weeks",
		credits: 4,
	},
	{
		slug: "biology",
		name: "Biology",
		description:
			"Study the science of life, from molecular biology to ecosystems. Topics include genetics, evolution, and human anatomy.",
		instructor: "Dr. Charles Darwin",
		duration: "14 weeks",
		credits: 3,
	},
	{
		slug: "history",
		name: "History",
		description:
			"Journey through time and explore major world events, civilizations, and historical figures that have shaped our present.",
		instructor: "Prof. Eleanor Roosevelt",
		duration: "12 weeks",
		credits: 3,
	},
	{
		slug: "geography",
		name: "Geography",
		description:
			"Discover the Earth's landscapes, environments, and the relationship between people and their surroundings.",
		instructor: "Dr. Jane Goodall",
		duration: "12 weeks",
		credits: 3,
	},
	{
		slug: "art-and-design",
		name: "Art & Design",
		description:
			"Unleash your creativity by exploring various art forms, from drawing and painting to digital media and design principles.",
		instructor: "Mr. Leonardo da Vinci",
		duration: "10 weeks",
		credits: 2,
	},
	{
		slug: "music",
		name: "Music",
		description:
			"Learn music theory, history, and performance. This course is open to all skill levels and covers a wide range of musical genres.",
		instructor: "Ms. Clara Schumann",
		duration: "10 weeks",
		credits: 2,
	},
	{
		slug: "physical-education",
		name: "Physical Education",
		description:
			"Focus on health, fitness, and sportsmanship. Participate in various sports and activities to promote a healthy lifestyle.",
		instructor: "Coach Serena Williams",
		duration: "16 weeks",
		credits: 1,
	},
	{
		slug: "economics",
		name: "Economics",
		description:
			"Understand the principles of micro and macroeconomics, including supply and demand, market structures, and fiscal policy.",
		instructor: "Dr. Adam Smith",
		duration: "13 weeks",
		credits: 3,
	},
];

const SubjectDetails = () => {
	const { courseSlug } = useParams();
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate("/dashboard/courses");
	};

	// In the future, you would make an API call here.
	// For now, we find the course in our mock data.
	const course = mockSubjectDetails.find((c) => c.slug === courseSlug);

	// You can add a loading state for when you fetch from an API
	// if (!course) {
	//  return <CircularProgress />;
	// }

	if (!course) {
		return (
			<Container sx={{ py: 4 }}>
				<Alert severity='error'>Course not found!</Alert>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Button
				variant='outlined'
				onClick={handleBackClick}
				sx={{ mb: 3 }}>
				Back to Subjects
			</Button>
			<Paper
				elevation={3}
				sx={{ p: 4 }}>
				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					{course.icon}
					<Typography
						variant='h3'
						component='h1'
						gutterBottom
						sx={{ mb: 0 }}>
						{course.name}
					</Typography>
				</Box>
				<Typography
					variant='h3'
					component='h1'
					gutterBottom>
					{course.name}
				</Typography>
				<Typography
					variant='body1'
					paragraph>
					{course.description}
				</Typography>
				<Typography variant='h6'>Instructor: {course.instructor}</Typography>
				<Typography variant='h6'>Duration: {course.duration}</Typography>
				<Typography variant='h6'>Credits: {course.credits}</Typography>
			</Paper>
		</Container>
	);
};

export default SubjectDetails;
