import React from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
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

  return (
    <Card sx={{ mt: 4, width: '100%', maxWidth: '500px', margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Server Model Options
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Your Configuration:</Typography>
          <Typography>CPU: {config.cpu}</Typography>
          <Typography>Memory: {config.memory.toLocaleString()} MB</Typography>
          <Typography>GPU Accelerator Card: {config.hasGPU ? 'Yes' : 'No'}</Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1">Available Models:</Typography>
        {serverModels.length > 0 ? (
          <List>
            {serverModels.map((model, index) => (
              <ListItem key={index}>
                <ListItemText primary={model} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="error">No compatible server models found</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay; 