import React, { useState } from 'react';
import { Container, Divider } from '@mui/material';
import ConfigurationForm from './components/ConfigurationForm';
import ResultsDisplay from './components/ResultsDisplay';
import { getAvailableServerModels, ServerModel } from './utils/serverModelSelection';

interface Configuration {
  cpu: string;
  memory: number;
  hasGPU: boolean;
}

function App() {
  const [serverModels, setServerModels] = useState<ServerModel[]>([]);
  const [config, setConfig] = useState<Configuration | null>(null);
  
  const handleSubmit = (config: Configuration) => {
    const models = getAvailableServerModels(config);
    setConfig(config);
    setServerModels(models);
  };
  
  return (
    <Container sx={{ py: 4 }}>
      <ConfigurationForm onSubmit={handleSubmit} />
      
      {config && (
        <>
          <Divider sx={{ my: 4 }} />
          <ResultsDisplay serverModels={serverModels} config={config} />
        </>
      )}
    </Container>
  );
}

export default App;
