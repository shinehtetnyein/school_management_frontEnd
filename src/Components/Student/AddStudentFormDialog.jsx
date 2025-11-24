import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DataServices from "../../services/data-services";
import Configuration from "../../services/configuration";

const AddStudentFormDialog = ({ open, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_no: "",
    date_of_birth: null,
    nrc: "",
    religion: "",
    mother_tongue: "",
    language: "English",
    gender: "male",
    roll_no: "",
    enrollment_date: null,
    status: "active",
    course_id: "",
    subject_id: "",
    section_id: "",
    classroom_id: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const religions = ["Christian", "Buddhist", "Muslim", "Hindu", "Other"];
  const languages = ["English", "Burmese", "Chinese", "Other"];
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
  ];

  const dataService = new DataServices();
  const config = new Configuration();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.phone_no.trim())
      newErrors.phone_no = "Phone number is required";
    if (!formData.date_of_birth)
      newErrors.date_of_birth = "Date of birth is required";
    if (!formData.nrc.trim()) newErrors.nrc = "NRC is required";
    if (!formData.roll_no.trim()) newErrors.roll_no = "Roll number is required";
    if (!formData.enrollment_date)
      newErrors.enrollment_date = "Enrollment date is required";
    if (!formData.course_id) newErrors.course_id = "Course ID is required";
    if (!formData.subject_id) newErrors.subject_id = "Subject ID is required";
    if (!formData.section_id) newErrors.section_id = "Section ID is required";
    if (!formData.classroom_id)
      newErrors.classroom_id = "Classroom ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          submitData.append(
            key,
            formData[key] instanceof Date
              ? formData[key].toISOString().split("T")[0]
              : formData[key]
          );
        }
      });

      const response = await dataService.retrievePOSTFormData(
        submitData,
        `${config.SERVICE_NAME}${config.SERVICE_ACTION_STUDENTS}`
      );

      const ok =
        response?.success ||
        response?.data ||
        response?.id ||
        response?.student;
      if (ok) {
        setSuccessMessage("Student added successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          phone_no: "",
          date_of_birth: null,
          nrc: "",
          religion: "",
          mother_tongue: "",
          language: "English",
          gender: "male",
          roll_no: "",
          enrollment_date: null,
          status: "active",
          course_id: "",
          subject_id: "",
          section_id: "",
          classroom_id: "",
        });
        if (typeof onSuccess === "function") {
          try {
            onSuccess();
          } catch (e) {
            // ignore
          }
        }
      } else {
        throw new Error("Failed to add student");
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: "Error adding student. Please try again." });
    } finally {
      setIsSubmitting(false);
      // Notify parent if provided when we successfully added a student
      if (successMessage && typeof onSuccess === "function") {
        try {
          onSuccess();
        } catch (e) {
          // ignore callback errors
        }
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Add New Student
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          {errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="First Name *"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
              <TextField
                fullWidth
                label="Last Name *"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
              <TextField
                fullWidth
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                label="Password *"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Phone Number *"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                error={!!errors.phone_no}
                helperText={errors.phone_no}
              />
              <DatePicker
                label="Date of Birth *"
                value={formData.date_of_birth}
                onChange={(date) => handleDateChange("date_of_birth", date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.date_of_birth,
                    helperText: errors.date_of_birth,
                  },
                }}
              />
              <TextField
                fullWidth
                label="NRC *"
                name="nrc"
                value={formData.nrc}
                onChange={handleChange}
                error={!!errors.nrc}
                helperText={errors.nrc}
                placeholder="12/XYZ(N)123456"
              />

              <FormControl fullWidth>
                <InputLabel>Gender *</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  error={!!errors.gender}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText>{errors.gender}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Religion</InputLabel>
                <Select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                >
                  {religions.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Mother Tongue"
                name="mother_tongue"
                value={formData.mother_tongue}
                onChange={handleChange}
              />

              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  {languages.map((l) => (
                    <MenuItem key={l} value={l}>
                      {l}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Roll No *"
                name="roll_no"
                value={formData.roll_no}
                onChange={handleChange}
                error={!!errors.roll_no}
                helperText={errors.roll_no}
              />
              <DatePicker
                label="Enrollment Date *"
                value={formData.enrollment_date}
                onChange={(date) => handleDateChange("enrollment_date", date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.enrollment_date,
                    helperText: errors.enrollment_date,
                  },
                }}
              />

              <FormControl fullWidth>
                <InputLabel>Status *</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statusOptions.map((s) => (
                    <MenuItem key={s.value} value={s.value}>
                      {s.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Course ID *"
                name="course_id"
                type="number"
                value={formData.course_id}
                onChange={handleChange}
                error={!!errors.course_id}
                helperText={errors.course_id}
              />
              <TextField
                fullWidth
                label="Subject ID *"
                name="subject_id"
                type="number"
                value={formData.subject_id}
                onChange={handleChange}
                error={!!errors.subject_id}
                helperText={errors.subject_id}
              />
              <TextField
                fullWidth
                label="Section ID *"
                name="section_id"
                type="number"
                value={formData.section_id}
                onChange={handleChange}
                error={!!errors.section_id}
                helperText={errors.section_id}
              />
              <TextField
                fullWidth
                label="Classroom ID *"
                name="classroom_id"
                type="number"
                value={formData.classroom_id}
                onChange={handleChange}
                error={!!errors.classroom_id}
                helperText={errors.classroom_id}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Add Student"}
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddStudentFormDialog;
