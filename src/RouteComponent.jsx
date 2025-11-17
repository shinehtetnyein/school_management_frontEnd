import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import { ThemeProvider } from "./theme/context/ThemeContext";
import Main from "./layouts/main/Main";
import Dashboard from "./Components/AdminDashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import StudentList from "./Components/Student/StudentList";
import CourseList from "./Components/Courses/CourseList";
import Subjects from "./Components/Courses/Subjects";
import CourseDetails from "./Components/Courses/CourseDetails";
import SubjectDetails from "./Components/Courses/SubjectDetail";
import Classes from "./Components/Classes/Classes";
import TimetableClass from "./Components/Classes/TimetableClass";
import Homework from "./Components/Homework/Homework";
import ExamSchedule from "./Examination/ExamSchedule";
import ExamAttend from "./Examination/ExamAttend";
import ExamResult from "./Examination/ExamResult";

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
              <Route path="/" index element={<LoginForm />}></Route>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/dashboard"
                element={
                  <Main
                    toggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                  />
                }
              >
                {/* The index route for /dashboard */}
                <Route index element={<Dashboard />} />
                <Route path="students" element={<StudentList />} />
                <Route path="all" element={<Students />} />
                {/* Group course routes together */}
                <Route path="courses">
                  <Route index element={<CourseList />} />
                  <Route path=":courseSlug" element={<CourseDetails />} />
                </Route>
                <Route path="classes" element={<Classes />} />
								<Route
									path='homework'
									element={<Homework />}
								/>
								<Route
									path='examination/schedule'
									element={<ExamSchedule />}
								/>
								<Route
									path='examination/attendance'
									element={<ExamAttend />}
								/>
								<Route
									path='examination/results'
									element={<ExamResult />}
								/>
                <Route path="timetable" element={<TimetableClass />} />
                <Route path="subjects">
                  <Route index element={<Subjects />} />
                  <Route path=":courseSlug" element={<SubjectDetails />} />
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
