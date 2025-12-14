import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import GoogleCallbackHandler from "./Components/GoogleCallbackHandler";
import { ThemeProvider } from "./theme/context/ThemeContext";
import Main from "./layouts/main/DashboardLayout";
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
import StudentDetailPage from "./Components/Student/Detail/StudentDetailPage";
import Students from "./Components/Student/Students";
import DashboardLayout from "./layouts/main/DashboardLayout";
import Parents from "./Components/Parent/Parents";
import ParentList from "./Components/Parent/ParentList";

const RouteComponent = () => {
  return (
    <div>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/google/callback"
                element={<GoogleCallbackHandler />}
              />
              <Route path="/" element={<DashboardLayout />}>
                {/* The index route for /dashboard */}
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="students" element={<StudentList />} />
                <Route path="all-students" element={<Students />} />
                <Route
                  path="students/:studentId"
                  element={<StudentDetailPage />}
                />
                <Route path="parents" element={<Parents />} />
                <Route path="all-parents" element={<ParentList />} />
                <Route
                  path="students/:studentId"
                  element={<StudentDetailPage />}
                />
                {/* Group course routes together */}
                <Route path="courses">
                  <Route index element={<CourseList />} />
                  <Route path=":courseSlug" element={<CourseDetails />} />
                </Route>
                <Route path="classes" element={<Classes />} />
                <Route path="homework" element={<Homework />} />
                <Route path="examination/schedule" element={<ExamSchedule />} />
                <Route path="examination/attendance" element={<ExamAttend />} />
                <Route path="examination/results" element={<ExamResult />} />
                <Route path="timetable" element={<TimetableClass />} />
                <Route path="subjects">
                  <Route index element={<Subjects />} />
                  <Route path=":courseSlug" element={<SubjectDetails />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default RouteComponent;
