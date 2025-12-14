import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const books = [
  {
    id: 1,
    title: "The Small-Town Library",
    takenOn: "25 Jan 2024",
    lastDate: "25 Jan 2024",
  },
  {
    id: 2,
    title: "Apex Time",
    takenOn: "22 Jan 2024",
    lastDate: "25 Jan 2024",
  },
  {
    id: 3,
    title: "The Cobalt Guitar",
    takenOn: "30 Jan 2024",
    lastDate: "10 Feb 2024",
  },
  {
    id: 4,
    title: "Shard and the Tomb",
    takenOn: "10 Feb 2024",
    lastDate: "20 Feb 2024",
  },
  {
    id: 5,
    title: "Shard and the Tomb 2",
    takenOn: "12 Feb 2024",
    lastDate: "22 Feb 2024",
  },
  {
    id: 6,
    title: "Plague of Fear",
    takenOn: "15 Feb 2024",
    lastDate: "25 Feb 2024",
  },
];

export default function Library() {
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
          Library
        </Typography>

        <Chip
          icon={<CalendarTodayIcon />}
          label="This Year"
          variant="outlined"
          sx={{ px: 1.5, py: 2.5, fontSize: 14 }}
        />
      </Box>

      {/* Books Grid */}
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: "1px solid #e2e8f0",
                        width:"225px",
                        height: "100%",
                    }}
                >
                <CardContent>
                    {/* Book Image Placeholder */}
                    <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        bgcolor: "#e5e7eb",
                        mb: 2,
                    }}
                    />

                    <Typography fontWeight={600} fontSize={18} mb={2}>
                    {book.title}
                    </Typography>

                    <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    >
                    <Box>
                        <Typography color="text.secondary" fontSize={14}>
                        Book taken on
                        </Typography>
                        <Typography fontWeight={500}>{book.takenOn}</Typography>
                    </Box>

                    <Box>
                        <Typography color="text.secondary" fontSize={14}>
                        Last Date
                        </Typography>
                        <Typography fontWeight={500}>{book.lastDate}</Typography>
                    </Box>
                    </Box>
                </CardContent>
                </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
