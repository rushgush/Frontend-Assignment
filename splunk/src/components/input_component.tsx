import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, FormControlLabel, Checkbox, Button, Typography, FormControl, InputLabel } from '@mui/material';

const InputForm: React.FC = () => {
  const [cpu, setCpu] = useState<string>('');
  const [memory, setMemory] = useState<string>('');
  const [gpu, setGpu] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ cpu, memory, gpu });
    // Add validation and logic to pass data to the output component
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" align="center">
        Hardware Configuration
      </Typography>

      <FormControl required>
        <InputLabel id="cpu-label">Select CPU</InputLabel>
        <Select
          labelId="cpu-label"
          id="cpu-select"
          value={cpu}
          onChange={(e) => setCpu(e.target.value)}
          label="Select CPU"
          required
        >
          <MenuItem value="X86">X86</MenuItem>
          <MenuItem value="Power">Power</MenuItem>
          <MenuItem value="ARM">ARM</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Memory Size (MB)"
        variant="outlined"
        value={memory}
        onChange={(e) => setMemory(e.target.value)}
        placeholder="Comma-separated values (e.g., 2048, 4096)"
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={gpu}
            onChange={(e) => setGpu(e.target.checked)}
          />
        }
        label="GPU Accelerator Card"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default InputForm;
