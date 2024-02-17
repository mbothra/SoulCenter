import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm({ formData, updateFormData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <React.Fragment>
      
      <Typography variant="h6" gutterBottom>
        Current Mood or Emotional State
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="mood"
            name="mood"
            label="How are you feeling?"
            fullWidth
            autoComplete="anxious or sad"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            required
            id="uname"
            name="uname"
            label="Tell me your Name"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this data for personalizing meditation in the future"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}