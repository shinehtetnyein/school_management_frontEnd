import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import { ThemeProvider } from "./theme/context/ThemeContext";
import Main from "./layouts/main/Main";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import StudentList from "./Components/Student/StudentList";
import CourseList from "./Components/Courses/CourseList";
import GradeList from "./Components/Courses/GradeList";
import Subjects from "./Components/Courses/Subjects";
import CourseDetails from "./Components/Courses/CourseDetails";
import SubjectDetails from "./Components/Courses/SubjectDetail";

const RouteComponent = () => {
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};

	return (
		<div>
			<ThemeProvider>
				<AuthProvider>
					<Router>
						<Routes>
							<Route
								path='/'
								index
								element={<LoginForm />}></Route>
							<Route
								path='/login'
								element={<LoginForm />}
							/>
							<Route
								path='/dashboard'
								element={
									<Main
										toggleSidebar={toggleSidebar}
										isSidebarCollapsed={isSidebarCollapsed}
									/>
								}>
								{/* The index route for /dashboard */}
								<Route
									index
									element={<Dashboard />}
								/>
								<Route
									path='students'
									element={<StudentList />}
								/>
								{/* Group course routes together */}
								<Route path='courses'>
									<Route
										index
										element={<CourseList />}
									/>
									<Route
										path=':courseSlug'
										element={<CourseDetails />}
									/>
								</Route>
								<Route path='subjects'>
									<Route
										index
										element={<Subjects />}
									/>
									<Route
										path=':courseSlug'
										element={<SubjectDetails />}
									/>
								</Route>
							</Route>
						</Routes>
					</Router>
				</AuthProvider>
			</ThemeProvider>
		</div>
	);
};

export default RouteComponent;
