import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataServices from "../../services/data-services";
import Configuration from "../../services/configuration";

/**
 * TimetableClass
 *
 * - Fetches timetable items from API
 * - Builds teachers list and time slots from API
 * - Renders a grid with time slots as rows and days as columns
 * - Clicking teacher navigates to /teachers/:id
 *
 * NOTE: Replace API_URL with your real endpoint.
 */

const API_URL = "/api/timetable"; // <- change this to your real endpoint

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// test

const DEFAULT_TIME_SLOTS = [
  { start: "09:00", end: "09:45", label: "09:00 - 09:45 AM" },
  { start: "09:45", end: "10:30", label: "09:45 - 10:30 AM" },
  { start: "10:45", end: "11:30", label: "10:45 - 11:30 AM" },
];

/* Utility: format Date/ISO string to "HH:MM" (24-hour, zero padded).
   Uses local time. */
function isoToHM(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/* Utility: produce readable label for a slot */
function slotLabel(start, end) {
  // Convert to "HH:MM - HH:MM" and if you'd like AM/PM you could convert
  return `${start} - ${end}`;
}

/* Deterministic color generator from integer id (so same teacher gets same color) */
function colorFromId(id) {
  const colors = [
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#9C27B0",
    "#f44336",
    "#00BCD4",
    "#795548",
    "#3F51B5",
    "#8BC34A",
    "#FF5722",
  ];
  if (!id && id !== 0) return "#607D8B";
  return colors[id % colors.length];
}

/* Map API item -> class card data */
function mapApiItemToClass(apiItem) {
  // teacher name & id
  const teacherId = apiItem.teacher_id;
  const teacherName =
    apiItem.teacher && (apiItem.teacher.first_name || apiItem.teacher.last_name)
      ? `${apiItem.teacher.first_name || ""} ${
          apiItem.teacher.last_name || ""
        }`.trim()
      : `Teacher ${teacherId || ""}`;

  const teacher = {
    id: teacherId,
    name: teacherName,
    avatar:
      apiItem.teacher && apiItem.teacher.first_name
        ? apiItem.teacher.first_name[0]
        : (teacherName && teacherName[0]) || "?",
    color: colorFromId(teacherId),
    email: apiItem.teacher?.email || null,
  };

  const start = isoToHM(apiItem.start_time);
  const end = isoToHM(apiItem.end_time);

  return {
    id: apiItem.id,
    uuid: apiItem.uuid,
    subject: apiItem.subject?.name || apiItem.subject || "Unknown Subject",
    teacher,
    teacherId: teacherId,
    day: apiItem.day_of_week || "Monday",
    startTime: start,
    endTime: end,
    roomNumber: apiItem.room_number || apiItem.classroom?.room_number || "",
    notes: apiItem.notes || "",
    raw: apiItem,
  };
}

/* Component to render a class card */
const ClassCard = ({ classInfo, onTeacherClick }) => {
  const teacher = classInfo.teacher;
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: "100%",
        backgroundColor: teacher?.color || "#f5f5f5",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.15)",
        minHeight: 120,
        "&:hover": { boxShadow: 4 },
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{ display: "block", mb: 1, opacity: 0.95, fontSize: "0.75rem" }}
        >
          {classInfo.startTime} - {classInfo.endTime}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: "1.05rem", mb: 1 }}
        >
          {classInfo.subject}
        </Typography>
        {classInfo.roomNumber && (
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, fontSize: "0.85rem" }}
          >
            Room: {classInfo.roomNumber}
          </Typography>
        )}
      </Box>

      <Button
        onClick={() => onTeacherClick(classInfo.teacherId)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 0.5,
          backgroundColor: "rgba(255, 255, 255, 0.16)",
          borderRadius: 1,
          color: "white",
          textTransform: "none",
          minWidth: "auto",
          "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.22)" },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "rgba(255,255,255,0.95)",
            color: teacher.color,
            fontSize: "0.875rem",
            fontWeight: "bold",
          }}
        >
          {teacher.avatar}
        </Avatar>
        <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
          {teacher.name}
        </Typography>
      </Button>
    </Paper>
  );
};

export default function TimetableClass() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]); // raw API items
  const [selectedTeacherId, setSelectedTeacherId] = useState("All");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // Disable automatic redirect-on-401 so this component can show inline errors
  const dataService = useMemo(
    () => new DataServices({ autoRedirect: false }),
    []
  );
  const config = useMemo(() => new Configuration(), []);

  /* Fetch timetable items from API on mount */
  const fetchTimetable = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await dataService.retrieve(
        config.SERVICE_NAME,
        config.SERVICE_ACTION_TIMETABLES
      );

      const items =
        response?.data?.timetable ||
        response?.data?.data ||
        response?.timetable ||
        response?.data ||
        [];

      if (Array.isArray(items) && items.length > 0) {
        setApiData(items);
      } else {
        setApiData([]);
        setError("Be patient. Server unreachable. Please try again later.");
      }
    } catch (err) {
      console.error("Error fetching timetable:", err);
      setApiData([]);

      if (
        err.message?.includes("Network Error") ||
        err.message?.includes("timeout") ||
        err.message?.includes("failed to fetch") ||
        err.message?.includes("no rows")
      ) {
        setError("⚠️ Network request failed. Check your connection.");
      } else {
        setError(
          "Be patient. Server unreachable. Please check your connection or try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  }, [dataService, config]);

  useEffect(() => {
    fetchTimetable();
  }, [fetchTimetable]);

  /* Derived: mapped classes (mapped & normalized) */
  const mappedClasses = useMemo(() => {
    return apiData.map(mapApiItemToClass);
  }, [apiData]);

  /* Derived: teacher list from mapped classes (unique by id) */
  const teachers = useMemo(() => {
    const map = new Map();
    for (const c of mappedClasses) {
      if (c.teacher && c.teacher.id != null) {
        map.set(c.teacher.id, c.teacher);
      }
    }
    // sort by name
    return Array.from(map.values()).sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
  }, [mappedClasses]);

  /* Build time slots:
     - combine default slots + unique slots from API start/end times
     - ensure uniqueness and sort ascending
     - label each slot using slotLabel */
  const timeSlots = useMemo(() => {
    const slots = new Map();

    // seed default slots
    for (const s of DEFAULT_TIME_SLOTS) {
      const key = `${s.start}-${s.end}`;
      slots.set(key, { start: s.start, end: s.end, label: s.label });
    }

    // add slots from data
    for (const c of mappedClasses) {
      if (c.startTime && c.endTime) {
        const key = `${c.startTime}-${c.endTime}`;
        if (!slots.has(key)) {
          slots.set(key, {
            start: c.startTime,
            end: c.endTime,
            label: slotLabel(c.startTime, c.endTime),
          });
        }
      }
    }

    // convert to array and sort by start time
    const arr = Array.from(slots.values());
    arr.sort((a, b) => {
      const [ah, am] = a.start.split(":").map(Number);
      const [bh, bm] = b.start.split(":").map(Number);
      return ah !== bh ? ah - bh : am - bm;
    });

    return arr;
  }, [mappedClasses]);

  /* Group mapped classes by day -> then by slot start so we can lookup cell by day+slot */
  const classesByDayAndSlot = useMemo(() => {
    const index = {};
    for (const day of DAYS) {
      index[day] = {};
    }
    for (const c of mappedClasses) {
      const day = c.day || "Monday";
      const slotKey = `${c.startTime}-${c.endTime}`;
      if (!index[day]) index[day] = {};
      // If multiple classes fall in same slot+day, keep first (or you can push array)
      index[day][slotKey] = c;
    }
    return index;
  }, [mappedClasses]);

  /* Filtered classes (if teacher filter applied) */
  const filteredClassesByDayAndSlot = useMemo(() => {
    if (selectedTeacherId === "All") return classesByDayAndSlot;

    // Build filtered index where cells that don't match teacher are empty
    const filtered = {};
    for (const day of DAYS) {
      filtered[day] = {};
      for (const slot of timeSlots) {
        const key = `${slot.start}-${slot.end}`;
        const cell = classesByDayAndSlot[day]?.[key];
        if (cell && cell.teacherId === selectedTeacherId) {
          filtered[day][key] = cell;
        } else {
          filtered[day][key] = undefined;
        }
      }
    }
    return filtered;
  }, [classesByDayAndSlot, selectedTeacherId, timeSlots]);

  /* Handlers */
  const handleTeacherChange = (e) => {
    setSelectedTeacherId(e.target.value);
  };

  const handleTeacherClick = (teacherId) => {
    navigate(`/teachers/${teacherId}`);
  };

  if (loading) {
    return (
      <Box sx={{ p: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" color="error">
            Error loading timetable
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, overflowX: "auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "primary.main", fontSize: "2rem" }}
          >
            Time Table
          </Typography>

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel id="teacher-filter-label">Filter by Teacher</InputLabel>
            <Select
              labelId="teacher-filter-label"
              value={selectedTeacherId}
              label="Filter by Teacher"
              onChange={handleTeacherChange}
            >
              <MenuItem value="All">All Teachers</MenuItem>
              {teachers.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Days Header Row */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "200px repeat(6, 1fr)",
              gap: 2,
              mb: 2,
            }}
          >
            {/* Time column header */}
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Time Slots
              </Typography>
            </Box>

            {/* Day headers */}
            {DAYS.map((day) => (
              <Paper
                key={day}
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                <Typography variant="h6">{day}</Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Timetable Content */}
        <Box sx={{ width: "100%", overflow: "auto" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {timeSlots.map((slot) => {
              const slotKey = `${slot.start}-${slot.end}`;
              return (
                <Box
                  key={slotKey}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "200px repeat(6, 1fr)",
                    gap: 2,
                    alignItems: "stretch",
                  }}
                >
                  {/* Time Slot Label */}
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "grey.100",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "medium", fontSize: "0.9rem" }}
                    >
                      {slot.label}
                    </Typography>
                  </Paper>

                  {/* Day cells */}
                  {DAYS.map((day) => {
                    const cell = filteredClassesByDayAndSlot[day]?.[slotKey];
                    return (
                      <Box key={`${day}-${slotKey}`} sx={{ minHeight: 140 }}>
                        {cell ? (
                          <ClassCard
                            classInfo={cell}
                            onTeacherClick={handleTeacherClick}
                          />
                        ) : (
                          <Paper
                            sx={{
                              height: "100%",
                              minHeight: 140,
                              backgroundColor: "transparent",
                              border: "2px dashed #e0e0e0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary", opacity: 0.5 }}
                            >
                              No Class
                            </Typography>
                          </Paper>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
