import React, { useState } from 'react';
import { Container, Divider, Paper, Typography, Box, ThemeProvider, createTheme } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';
import ResultsDisplay from './components/ResultsDisplay';
import { getAvailableServerModels, ServerModel } from './utils/serverModelSelection';

interface Configuration {
  cpu: string;
  memory: number;
  hasGPU: boolean;
}

// Create a professional theme with a simple color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A professional blue
    },
    secondary: {
      main: '#f5f5f5', // Light gray
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
        },
      },
    },
  },
});

function App() {
  const [serverModels, setServerModels] = useState<ServerModel[]>([]);
  const [config, setConfig] = useState<Configuration | null>(null);
  
  const handleSubmit = (config: Configuration) => {
    const models = getAvailableServerModels(config);
    setConfig(config);
    setServerModels(models);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        py: 4 
      }}>
        <Container maxWidth="md">
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ mb: 4, fontWeight: 500 }}
          >
            Server Model Configuration
          </Typography>
          
          <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
            <ConfigurationForm onSubmit={handleSubmit} />
          </Paper>
          
          {config && (
            <Paper elevation={1} sx={{ p: 4 }}>
              <ResultsDisplay serverModels={serverModels} config={config} />
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
