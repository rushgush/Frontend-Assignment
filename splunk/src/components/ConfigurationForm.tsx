import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

interface ConfigFormProps {
  onSubmit: (config: {
    cpu: string;
    memory: number;
    hasGPU: boolean;
  }) => void;
}

const ConfigurationForm: React.FC<ConfigFormProps> = ({ onSubmit }) => {
  const [cpu, setCpu] = useState<string>('');
  const [memory, setMemory] = useState<string>('');
  const [hasGPU, setHasGPU] = useState<boolean>(false);
  const [memoryError, setMemoryError] = useState<string>('');

  const validateMemory = (value: string): boolean => {
    // Remove commas for validation
    const memoryValue = parseInt(value.replace(/,/g, ''), 10);
    
    // Check if it's a valid number
    if (isNaN(memoryValue)) {
      setMemoryError('Please enter a valid number');
      return false;
    }
    
    // Check range (4,096MB to 8,388,608MB)
    if (memoryValue < 4096 || memoryValue > 8388608) {
      setMemoryError('Memory must be between 4,096MB and 8,388,608MB');
      return false;
    }
    
    // Check if it's a multiple of 1024
    if (memoryValue % 1024 !== 0) {
      setMemoryError('Memory must be a multiple of 1024MB');
      return false;
    }
    
    // Check if it's a power of 2
    const log2 = Math.log2(memoryValue);
    if (log2 !== Math.floor(log2)) {
      setMemoryError('Memory must be a power of 2');
      return false;
    }
    
    setMemoryError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cpu) {
      return;
    }
    
    if (!validateMemory(memory)) {
      return; // Don't submit if memory validation fails
    }
    
    const memoryValue = parseInt(memory.replace(/,/g, ''), 10);
    
    onSubmit({
      cpu,
      memory: memoryValue,
      hasGPU
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Hardware Configuration
      </Typography>
      
      <FormControl fullWidth margin="normal" required>
        <InputLabel>CPU Model</InputLabel>
        <Select
          value={cpu}
          label="CPU Model"
          onChange={(e) => setCpu(e.target.value)}
        >
          <MenuItem value="X86">X86</MenuItem>
          <MenuItem value="Power">Power</MenuItem>
          <MenuItem value="ARM">ARM</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <TextField
          label="Memory Size (MB)"
          value={memory}
          onChange={(e) => setMemory(e.target.value)}
          helperText={memoryError || "Enter memory in MB (e.g., 4,096)"}
          error={!!memoryError}
          required
        />
      </FormControl>
      
      <FormControlLabel
        control={
          <Checkbox 
            checked={hasGPU}
            onChange={(e) => setHasGPU(e.target.checked)}
          />
        }
        label="GPU Accelerator Card"
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        sx={{ mt: 3 }}
        disabled={!cpu || !memory || !!memoryError}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ConfigurationForm; 