
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'


const AddStudentForm = ({ formData, addFormChange, grades }) => {

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          type='text'
          value={formData.name || ''}
          onChange={addFormChange}
          required
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={addFormChange}
          required
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Contact"
          name="contact"
          type='tel'
          value={formData.contact || ''}
          onChange={addFormChange}
          required
        />
      </Grid>
      <Grid xs={12} md={6}>
        <FormControl fullWidth required>
          <InputLabel>Grade</InputLabel>
          <Select
            name="grade"
            value={formData.grade || ''}
            label="Grade"
            onChange={addFormChange}
          >
            {grades.map(grade => (
              <MenuItem key={grade} value={grade}>{grade}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={formData.age || ''}
          onChange={addFormChange}
          required
        />
      </Grid>
    </Grid>
  )
}

export default AddStudentForm
