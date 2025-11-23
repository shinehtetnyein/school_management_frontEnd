import React from "react";
import {
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Avatar,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import { Download, LockPerson, Home, Apartment } from "@mui/icons-material";

// --- Helper Components for this Tab ---

const InfoBlock = ({ title, content, icon = null }) => (
  <Box>
    <Typography
      variant="subtitle2"
      color="text.secondary"
      sx={{
        display: "flex",
        alignItems: "center",
        mb: icon ? 1 : 0.5,
        gap: 1,
        textTransform: "uppercase",
        fontSize: "0.75rem",
      }}
    >
      {icon}
      {title}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {content}
    </Typography>
  </Box>
);

const DocumentItem = ({ name }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 1.5,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      bgcolor: "background.secondary",
      borderColor: "divider",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Avatar
        variant="rounded"
        sx={{
          width: 28,
          height: 28,
          bgcolor: "#fff0f0",
          color: "#e63946",
          fontSize: "0.8rem",
          fontWeight: 600,
        }}
      >
        PDF
      </Avatar>
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
        {name}
      </Typography>
    </Box>
    <IconButton
      size="small"
      sx={{
        bgcolor: "#283593",
        color: "white",
        borderRadius: 1,
        p: 1,
        "&:hover": { bgcolor: "#1a237e" },
      }}
    >
      <Download sx={{ fontSize: "1rem" }} />
    </IconButton>
  </Paper>
);

const ParentInfoCard = ({ name, relation, phone, email, avatarSrc }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      gap: 2,
      borderColor: "divider",
    }}
  >
    <Avatar
      src={avatarSrc}
      variant="rounded"
      sx={{ width: 48, height: 48, borderRadius: 1 }}
    />
    <Box sx={{ flex: 1, minWidth: "120px" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
        {name}
      </Typography>
      <Typography
        variant="body2"
        color="primary"
        sx={{ fontWeight: 500, mt: 0.5 }}
      >
        {relation}
      </Typography>
    </Box>
    <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        Phone
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {phone}
      </Typography>
    </Box>
    <Box sx={{ flex: 1.5, display: { xs: "none", md: "block" } }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        Email
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {email}
      </Typography>
    </Box>
    <IconButton
      size="small"
      sx={{
        bgcolor: "#283593",
        color: "white",
        borderRadius: 1,
        p: 1,
        "&:hover": { bgcolor: "#1a237e" },
      }}
    >
      <LockPerson />
    </IconButton>
  </Paper>
);

// --- Main Component ---

const StudentDetail = () => {
  return (
    <Box sx={{ p: 0, width: "113%", borderRadius: "8px" }}>
      <Stack spacing={3}>
        {/* Parents Information */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Parents Information
            </Typography>
            <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
            <Stack spacing={2}>
              <ParentInfoCard
                name="Jerald Vicinius"
                relation="Father"
                phone="+1 45545 46464"
                email="jera@example.com"
                avatarSrc="/path/to/jerald.png"
              />
              <ParentInfoCard
                name="Roberta Webber"
                relation="Mother"
                phone="+1 46499 24357"
                email="robe@example.com"
                avatarSrc="/path/to/roberta.png"
              />
              <ParentInfoCard
                name="Jerald Vicinius"
                relation="Guardian (Father)"
                phone="+1 45545 46464"
                email="jera@example.com"
                avatarSrc="/path/to/jerald.png"
              />
            </Stack>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Documents Card */}
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Documents
                </Typography>
                <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                <Stack spacing={2}>
                  <DocumentItem name="BirthCertificate.pdf" />
                  <DocumentItem name="Transfer Certificate.pdf" />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            {/* Address Card */}
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Address
                </Typography>
                <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                <Stack spacing={2}>
                  <InfoBlock
                    icon={
                      <Avatar
                        sx={{
                          bgcolor: "#f8f9fa",
                          color: "#4b5563",
                          width: 32,
                          height: 32,
                          borderRadius: 1,
                        }}
                      >
                        <Home sx={{ fontSize: "1.1rem" }} />
                      </Avatar>
                    }
                    title="Current Address"
                    content="3495 Red Hawk Road, Buffalo Lake, MN 55314"
                  />
                  <InfoBlock
                    icon={
                      <Avatar
                        sx={{
                          bgcolor: "#f8f9fa",
                          color: "#4b5563",
                          width: 32,
                          height: 32,
                          borderRadius: 1,
                        }}
                      >
                        <Apartment sx={{ fontSize: "1.1rem" }} />
                      </Avatar>
                    }
                    title="Permanent Address"
                    content="3495 Red Hawk Road, Buffalo Lake, MN 55314"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Previous School Card */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Previous School Details
            </Typography>
            <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoBlock
                  title="Previous School Name"
                  content="Oxford Matriculation, USA"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <InfoBlock
                  title="School Address"
                  content="1852 Barnes Avenue, Cincinnati, OH 45202"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Bank and Medical */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bank Details
                </Typography>
                <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <InfoBlock title="Bank Name" content="Bank of America" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <InfoBlock title="Branch" content="Cincinnati" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <InfoBlock title="IFSC" content="BOA83209832" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Medical History
                </Typography>
                <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoBlock
                      title="Known Allergies"
                      content={<Chip label="Rashes" size="small" />}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <InfoBlock title="Medications" content="-" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Other Info */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Other Info
            </Typography>
            <Divider sx={{ my: 2, ml: -2, mr: -2 }} />
            <Typography variant="body2" color="text.secondary">
              Depending on the specific needs of your organization or system,
              additional information may be collected or tracked. It's important
              to ensure that any data collected complies with privacy
              regulations and policies to protect students' sensitive
              information.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default StudentDetail;
