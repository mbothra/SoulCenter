import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function PaymentForm({ formData, updateFormData }) {
  const [conditions, setConditions] = React.useState('');
  const [imagery, setImagery] = React.useState(false);
  const [environment, setEnvironment] = React.useState('');

  const handleConditionsChange = (event) => {
    const { name, value } = event.target;
    // Update local state for conditions
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageryChange = (event) => {
    const { checked } = event.target;
    setImagery(checked); // Update local state for switch toggle
    // Update formData for imagery preference
    updateFormData({
      ...formData,
      imagery: checked,
    });
  };

  const handleEnvironmentChange = (event) => {
    const { name, value } = event.target;
    // Update local state for environment
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="conditions-label">Physical Conditions or Limitations</InputLabel>
            <Select
              labelId="conditions-label"
              name="conditions"
              label="Physical Conditions or Limitations"
              onChange={handleConditionsChange}
              variant="standard"
              defaultValue=""
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="limited_mobility">Limited Mobility</MenuItem>
              <MenuItem value="visual_impairment">Visual Impairment</MenuItem>
              <MenuItem value="hearing_impairment">Hearing Impairment</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginTop: 2 }}>
          <FormControlLabel
            control={<Switch checked={imagery} onChange={handleImageryChange} name="imagery"/>}
            label="Preference for Guided Imagery"
            name=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="env-label">Current Environment</InputLabel>
            <Select
              labelId="env-label"
              name="env"
              label="Current Environment"
              onChange={handleEnvironmentChange}
              variant="standard"
              defaultValue=""
            >
              <MenuItem value="home">Home</MenuItem>
              <MenuItem value="office">Office</MenuItem>
              <MenuItem value="outdoors">Outdoors</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
