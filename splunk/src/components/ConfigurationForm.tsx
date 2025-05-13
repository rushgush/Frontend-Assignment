import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Checkbox, 
  FormControl, 
  FormControlLabel, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Typography
} from '@mui/material';
import { validateMemory } from '../utils/memoryValidation';

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

  // Add this function to format numbers with commas
  const formatWithCommas = (value: string): string => {
    // Remove any existing commas
    const cleanValue = value.replace(/,/g, '');
    
    // Format with commas
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Then update the memory change handler:
  const handleMemoryChange = (value: string) => {
    // Only allow digits and commas
    const sanitizedValue = value.replace(/[^\d,]/g, '');
    
    // Format with commas
    const formattedValue = formatWithCommas(sanitizedValue);
    
    setMemory(formattedValue);
    const validation = validateMemory(formattedValue);
    setMemoryError(validation.error || '');
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
          onChange={(e) => handleMemoryChange(e.target.value)}
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