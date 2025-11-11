import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Chip,
  Avatar,
  Grid,
  TextField,
  MenuItem,
  Switch,
  Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

// Mock data for dropdowns, replace with your actual data
const feesGroups = ["Fees Group A", "Fees Group B", "Fees Group C"];
const feesTypes = ["Tuition Fees", "Transport Fees", "Exam Fees"];
const paymentTypes = ["Paytm", "Credit Card", "Bank Transfer", "Cash"];

const CollectFeesModal = ({ open, onClose, student }) => {
  // State for the form fields
  const [formData, setFormData] = useState({
    feesGroup: "Fees Group A",
    feesType: "Tuition Fees",
    amount: "",
    collectionDate: "2025-11-11", // From your image
    paymentType: "Paytm",
    referenceNo: "",
    status: true,
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      status: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    // Add your form submission logic here
    console.log("Form Data:", formData, "Student:", student.name);
    onClose(); // Close modal on submit
  };

  // Don't render anything if no student is selected
  if (!student) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* 1. Modal Header */}
      <DialogTitle sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Collect Fees
            </Typography>
            <Chip label={student.id} color="primary" size="small" />
          </Box>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* 2. Modal Content */}
      <DialogContent dividers sx={{ p: 3, bgcolor: "#f9f9f9" }}>
        {/* Student Info Bar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
          p={2}
          bgcolor="background.default"
          borderRadius={2}
          border="1px solid rgba(224, 224, 224, 1)"
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar src={student.avatar} alt={student.name} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {student.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {student.class}, {student.section}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Outstanding
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              2000
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Last Date
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              25 May 2024
            </Typography>
          </Box>
          <Chip
            label="Unpaid"
            color="error"
            size="small"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        {/* Form Fields */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Fees Group
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              name="feesGroup"
              value={formData.feesGroup}
              onChange={handleChange}
            >
              {feesGroups.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Fees Type
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              name="feesType"
              value={formData.feesType}
              onChange={handleChange}
            >
              {feesTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Amount
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Collection Date
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="collectionDate"
              type="date" // Using 'date' type for better UX
              value={formData.collectionDate}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Payment Type
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
            >
              {paymentTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Payment Reference No
            </Typography>
            <TextField
              fullWidth
              size="small"
              name="referenceNo"
              placeholder="Enter Payment Reference No"
              value={formData.referenceNo}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Status
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="1px solid rgba(224, 224, 224, 1)"
              borderRadius={1}
              p={1}
              bgcolor="background.default"
            >
              <Typography variant="body2" color="text.secondary">
                Change the Status by toggle
              </Typography>
              <Switch
                checked={formData.status}
                onChange={handleSwitchChange}
                name="status"
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Notes
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="notes"
              placeholder="Add Notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      {/* 3. Modal Actions */}
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Pay Fees
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CollectFeesModal;
