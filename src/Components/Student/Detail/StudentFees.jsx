import React, { useState } from "react";
import {
  Box,
  Card,
  Button,
  Menu,
  MenuItem,
  Chip,
  Link,
  Typography,
  CardContent,
  Divider,
} from "@mui/material";
import { CalendarToday, KeyboardArrowDown } from "@mui/icons-material";
import TableComponent from "../../../Reuseable/TableComponent";

// --- Mock Data ---
const feesData = [
  {
    id: 1,
    group: "Class 1 General (Admission Fees)",
    code: "admission-fees",
    dueDate: "25 Mar 2024",
    amount: "2000",
    status: "Paid",
    refId: "#435454",
    mode: "Cash",
    datePaid: "25 Jan 2024",
    discount: "10%",
    fine: "200",
  },
  {
    id: 2,
    group: "Class 1 General (Mar month fees)",
    code: "mar-month-fees",
    dueDate: "10 Apr 2024",
    amount: "2500",
    status: "Paid",
    refId: "#435453",
    mode: "Cash",
    datePaid: "03 Apr 2024",
    discount: "10%",
    fine: "0",
  },
  {
    id: 3,
    group: "Class 1 General (Apr month Fees)",
    code: "apr-month-fees",
    dueDate: "10 May 2024",
    amount: "2500",
    status: "Paid",
    refId: "#435453",
    mode: "Cash",
    datePaid: "03 Apr 2024",
    discount: "10%",
    fine: "0",
  },
  {
    id: 4,
    group: "Class 1 General (May month Fees)",
    code: "may-month-fees",
    dueDate: "10 Jun 2024",
    amount: "2500",
    status: "Paid",
    refId: "#435451",
    mode: "Cash",
    datePaid: "02 Jun 2024",
    discount: "10%",
    fine: "200",
  },
  {
    id: 5,
    group: "Class 1 General (Jun month Fees)",
    code: "jun-month-fees",
    dueDate: "10 Jul 2024",
    amount: "2500",
    status: "Paid",
    refId: "#435450",
    mode: "Cash",
    datePaid: "05 Jul 2024",
    discount: "10%",
    fine: "200",
  },
  {
    id: 6,
    group: "Class 1 General (Jul month Fees)",
    code: "jul-month-fees",
    dueDate: "10 Aug 2024",
    amount: "2500",
    status: "Paid",
    refId: "#435449",
    mode: "Cash",
    datePaid: "01 Aug 2024",
    discount: "10%",
    fine: "200",
  },
];

// --- Helper Component: Status Chip ---
const StatusChip = ({ status }) => {
  let bgcolor = "#ECFDF5"; // Light green background
  let color = "#059669"; // Dark green text

  // You can add logic for 'Unpaid' or 'Partial' here if needed
  if (status === "Unpaid") {
    bgcolor = "#FFF0F0";
    color = "#E63946";
  }

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: bgcolor,
        color: color,
        fontWeight: 700,
        fontSize: "0.75rem",
        height: 24,
        borderRadius: 1,
        "& .MuiChip-label": {
          px: 1,
          display: "flex",
          alignItems: "center",
        },
        // The little dot inside the chip
        "& .MuiChip-label::before": {
          content: '""',
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "currentColor",
          mr: 0.6,
        },
      }}
    />
  );
};

const StudentFees = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const columns = [
    {
      Header: "Fees Group",
      accessor: "group",
      Cell: ({ value }) => (
        <Link
          href="#"
          underline="none"
          sx={{
            minWidth: "110px",
            fontWeight: 500,
            color: "#3b82f6", // Blue color like in image
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {value}
        </Link>
      ),
    },
    {
      Header: "Fees Code",
      accessor: "code",
    },
    {
      Header: "Due Date",
      accessor: "dueDate",
    },
    {
      Header: "Amount $",
      accessor: "amount",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <StatusChip status={value} />,
    },
    { Header: "Ref ID", accessor: "refId" },
    { Header: "Mode", accessor: "mode" },
    { Header: "Date Paid", accessor: "datePaid" },
    { Header: "Discount ($)", accessor: "discount" },
    { Header: "Fine ($)", accessor: "fine" },
  ];

  return (
    <Card
      sx={{
        width: "113%",
        borderRadius: "8px",
        boxShadow: "none",
        // border: "1px solid",
        // borderColor: "divider",
      }}
    >
      <CardContent sx={{ pt: 3, pb: 3, px: 0 }}>
        <Box
          sx={{
            mb: 3,
            mx: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Fees
          </Typography>
          <Button
            variant="outlined"
            onClick={handleClick}
            startIcon={<CalendarToday sx={{ fontSize: 16 }} />}
            endIcon={<KeyboardArrowDown sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              borderColor: "divider",
              color: "text.primary",
              borderRadius: 1,
              fontWeight: 500,
              minWidth: 160,
              justifyContent: "space-between",
            }}
          >
            Year : 2024 / 2025
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Year : 2024 / 2025</MenuItem>
            <MenuItem onClick={handleClose}>Year : 2023 / 2024</MenuItem>
          </Menu>
        </Box>
        <Divider />
        <TableComponent
          columns={columns}
          data={feesData}
          title=""
          selectable={false}
          showSearch={false}
        />
      </CardContent>
    </Card>
  );
};

export default StudentFees;
