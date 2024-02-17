import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function PaymentForm({ formData, updateFormData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="level-label">Experience Level</InputLabel>
            <Select
              labelId="level-label"
              name="level"
              label="Experience Level"
              defaultValue=""
              onChange={handleChange}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="sound-label">Sounds you prefer</InputLabel>
            <Select
              labelId="sound-label"
              name="sound"
              label="Environmental Preferences"
              defaultValue=""
              onChange={handleChange}
            >
              <MenuItem value="rain">Rain</MenuItem>
              <MenuItem value="forest_sounds">Forest Sounds</MenuItem>
              <MenuItem value="silence">Silence</MenuItem>
              <MenuItem value="Let AI Choose for you!">Let AI Choose for you!</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="duration-label">Choose your preferred meditation accent or let us surprise you with our diverse inclusive voices</InputLabel>
            <Select
              labelId="accent"
              name="accent"
              label="Preferred Meditation Accent"
              defaultValue=""
              onChange={handleChange}
            >
              <MenuItem value={"american"}>American</MenuItem>
              <MenuItem value={"indian"}>Indian</MenuItem>
              <MenuItem value={"british"}>British</MenuItem>
              <MenuItem value={"african"}>African</MenuItem>
              <MenuItem value={"latin"}>Latin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="duration-label">Do you have a voice preference?</InputLabel>
            <Select
              labelId="gender"
              name="gender"
              label="Preferred Meditation Voice"
              defaultValue=""
              onChange={handleChange}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
