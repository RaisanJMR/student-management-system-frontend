import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";


const EditStudentForm = ({ formData, handleFormChange, grades }) => (
    <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                label="Student Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                variant="outlined"
                required
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                variant="outlined"
                required
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                label="Contact Number"
                name="contact"
                value={formData.contact}
                onChange={handleFormChange}
                variant="outlined"
                required
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleFormChange}
                variant="outlined"
                required
            />
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" required>
                <InputLabel>Grade</InputLabel>
                <Select
                    name="grade"
                    value={formData.grade}
                    onChange={handleFormChange}
                    label="Grade"
                >
                    {grades.map((grade) => (
                        <MenuItem key={grade} value={grade}>
                            {grade}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    </Grid>
);
export default EditStudentForm