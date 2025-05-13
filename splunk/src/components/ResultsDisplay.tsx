import React from 'react';
import { Box, Typography, Divider, Chip } from '@mui/material';
import { ServerModel } from '../utils/serverModelSelection';

interface ResultsDisplayProps {
  serverModels: ServerModel[];
  config: {
    cpu: string;
    memory: number;
    hasGPU: boolean;
  } | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ serverModels, config }) => {
  if (!config) {
    return null;
  }

  const isNoOptions = serverModels.length === 1 && serverModels[0] === 'No Options';

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Results
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: '1 1 50%' }}>
          <Typography variant="subtitle1" gutterBottom>
            Your Configuration:
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>CPU:</strong> {config.cpu}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Memory:</strong> {config.memory.toLocaleString()} MB
            </Typography>
            <Typography variant="body1">
              <strong>GPU Accelerator Card:</strong> {config.hasGPU ? 'Yes' : 'No'}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ flex: '1 1 50%' }}>
          <Typography variant="subtitle1" gutterBottom>
            Available Models:
          </Typography>
          
          {isNoOptions ? (
            <Typography color="error" sx={{ mt: 2 }}>
              No compatible server models found
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {serverModels.map((model, index) => (
                <Chip 
                  key={index} 
                  label={model} 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ResultsDisplay; 