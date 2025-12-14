import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const exams = [
  {
    id: 1,
    title: "Monthly Test (May)",
    subjects: [
      { name: "English (150)", max: 100, min: 35, obtained: 65 },
      { name: "Mathematics (214)", max: 100, min: 35, obtained: 73 },
      { name: "Physics (120)", max: 100, min: 35, obtained: 55 },
      { name: "Chemistry (110)", max: 100, min: 35, obtained: 90 },
      { name: "Spanish (140)", max: 100, min: 35, obtained: 88 },
    ],
    summary: { rank: 30, total: 500, obtained: 395, percentage: 79.5, result: "Pass" },
  },
  {
    id: 2,
    title: "Monthly Test (Apr)",
    subjects: [
      { name: "English", max: 100, min: 35, obtained: 58 },
      { name: "Mathematics", max: 100, min: 35, obtained: 69 },
      { name: "Physics", max: 100, min: 35, obtained: 61 },
      { name: "Chemistry", max: 100, min: 35, obtained: 72 },
      { name: "Spanish", max: 100, min: 35, obtained: 80 },
    ],
    summary: { rank: 42, total: 500, obtained: 340, percentage: 68, result: "Pass" },
  },
  {
    id: 3,
    title: "Monthly Test (Mar)",
    subjects: [
      { name: "English", max: 100, min: 35, obtained: 75 },
      { name: "Mathematics", max: 100, min: 35, obtained: 82 },
      { name: "Physics", max: 100, min: 35, obtained: 70 },
      { name: "Chemistry", max: 100, min: 35, obtained: 85 },
      { name: "Spanish", max: 100, min: 35, obtained: 78 },
    ],
    summary: { rank: 18, total: 500, obtained: 390, percentage: 78, result: "Pass" },
  },
  {
    id: 4,
    title: "Monthly Test (Feb)",
    subjects: [
      { name: "English", max: 100, min: 35, obtained: 45 },
      { name: "Mathematics", max: 100, min: 35, obtained: 38 },
      { name: "Physics", max: 100, min: 35, obtained: 41 },
      { name: "Chemistry", max: 100, min: 35, obtained: 60 },
      { name: "Spanish", max: 100, min: 35, obtained: 50 },
    ],
    summary: { rank: 65, total: 500, obtained: 234, percentage: 46.8, result: "Pass" },
  },
  {
    id: 5,
    title: "Monthly Test (Jan)",
    subjects: [
      { name: "English", max: 100, min: 35, obtained: 30 },
      { name: "Mathematics", max: 100, min: 35, obtained: 28 },
      { name: "Physics", max: 100, min: 35, obtained: 40 },
      { name: "Chemistry", max: 100, min: 35, obtained: 33 },
      { name: "Spanish", max: 100, min: 35, obtained: 45 },
    ],
    summary: { rank: 98, total: 500, obtained: 176, percentage: 35.2, result: "Fail" },
  },
];


export default function ExamsResults() {
  const [year] = useState("2024 / 2025");

  return (
    <Box sx={{ p: 3, bgcolor: "#ffffffff", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Exams & Results
        </Typography>

        <Chip
          icon={<CalendarTodayIcon />}
          label={`Year : ${year}`}
          variant="outlined"
          sx={{ px: 1.5, py: 2.5, fontSize: 14 }}
        />
      </Box>

      {/* Exam List */}
      <Stack spacing={2}>
        {exams.map((exam) => (
          <Accordion
            key={exam.id}
            disableGutters
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #e2e8f0",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    bgcolor: "#4CAF50",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  <CheckIcon fontSize="small" />
                </Box>
                <Typography fontWeight={500}>{exam.title}</Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {/* Table */}
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#f1f5f9" }}>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell>Max Marks</TableCell>
                      <TableCell>Min Marks</TableCell>
                      <TableCell>Marks Obtained</TableCell>
                      <TableCell align="right">Result</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exam.subjects.map((sub, i) => (
                      <TableRow key={i}>
                        <TableCell>{sub.name}</TableCell>
                        <TableCell>{sub.max}</TableCell>
                        <TableCell>{sub.min}</TableCell>
                        <TableCell>{sub.obtained}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label="● Pass"
                            sx={{
                              bgcolor: "#e8f5e9",
                              color: "#2e7d32",
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Summary Bar */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "#1f2a44",
                  color: "#fff",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Typography>Rank : {exam.summary.rank}</Typography>
                <Typography>Total : {exam.summary.total}</Typography>
                <Typography>Marks Obtained : {exam.summary.obtained}</Typography>
                <Typography>
                  Percentage : {exam.summary.percentage} &nbsp; Result :{" "}
                  <Box component="span" sx={{ color: "#4CAF50", fontWeight: 600 }}>
                    {exam.summary.result}
                  </Box>
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}
