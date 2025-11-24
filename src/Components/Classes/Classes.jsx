import React, { useState, useMemo, useEffect } from "react";
import TableComponent from "../../Reuseable/TableComponent";
import DataServices from "../../services/data-services";
import Configuration from "../../services/configuration";
import { Typography, Box } from "@mui/material";

// (formatTime removed — times are not displayed in this view)

/**
 * The Classes component renders a page to display and manage school classes.
 * It uses the reusable TableComponent to show class data and provides functionality
 * for deleting classes and applying custom row styles for full classes.
 */
const Classes = () => {
  const columns = useMemo(
    () => [
      { Header: "Room", accessor: "room" },
      { Header: "Sections", accessor: "sections" },
      { Header: "Teachers", accessor: "teachers" },
      { Header: "Days", accessor: "days" },
      { Header: "Active Now", accessor: "active" },
      { Header: "No of Students", accessor: "studentCount" },
      { Header: "No of Subjects", accessor: "subjectCount" },
    ],
    []
  );

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataService = React.useMemo(() => new DataServices(), []);
  const config = React.useMemo(() => new Configuration(), []);

  useEffect(() => {
    const fetchClassrooms = async () => {
      setLoading(true);
      try {
        const body = await dataService.retrieve(
          config.SERVICE_NAME,
          config.SERVICE_ACTION_CLASSROOMS
        );
        const abbreviateDay = (day) => {
          if (!day) return "";
          const d = day.toString().toLowerCase();
          if (d.startsWith("mon")) return "M";
          if (d.startsWith("tue")) return "T";
          if (d.startsWith("wed")) return "W";
          if (d.startsWith("thu")) return "Th";
          if (d.startsWith("fri")) return "F";
          if (d.startsWith("sat")) return "Sa";
          if (d.startsWith("sun")) return "Su";
          return day;
        };

        const formatSection = (sectionName) => {
          if (!sectionName) return "";
          // Remove common prefix like "Section " and trim
          let s = sectionName.replace(/^Section\s+/i, "").trim();
          // If the remaining contains spaces or dashes, take first token (e.g., "A - Grade 10" -> "A")
          s = s.split(/\s|-|,|:/)[0];
          return s;
        };

        const items = (body?.classrooms || body || []).map((c, idx) => ({
          id: c.id || idx,
          room: c.room_name || c.room_number || c.room || "",
          sections: Array.isArray(c.sections)
            ? c.sections.map(formatSection).filter(Boolean).join(", ")
            : (typeof c.sections === "string"
                ? c.sections.replace(/^Section\s+/i, "")
                : c.sections) || "",
          teachers: Array.isArray(c.teachers)
            ? c.teachers.map((t) => t.name).join(", ")
            : c.teachers || "",
          days: Array.isArray(c.days)
            ? c.days.map(abbreviateDay).join("/")
            : (typeof c.days === "string"
                ? c.days.split(/,|\//).map(abbreviateDay).join("/")
                : c.days) || "",
          active: c.active_now ? "Yes" : "No",
          studentCount: c.no_of_students || c.number_of_students || 0,
          subjectCount:
            c.no_of_subjects ||
            (Array.isArray(c.course_name) ? c.course_name.length : 0),
        }));
        setData(items);
      } catch (err) {
        // optionally handle errors (toast/log)
        console.error("Failed to load classrooms:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, [dataService, config]);

  console.log(data);

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
      <Typography variant="h4" gutterBottom>
        Classes
      </Typography>
      {loading ? (
        <Typography>Loading classrooms...</Typography>
      ) : (
        <TableComponent
          columns={columns}
          data={data}
          onDeleteSelected={handleDelete}
          title="Classes"
          getRowStyles={getRowStyling}
        />
      )}
    </Box>
  );
};

export default Classes;
