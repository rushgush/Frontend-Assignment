import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsDisplay from '../components/ResultsDisplay';
import '@testing-library/jest-dom';

describe('ResultsDisplay', () => {
  test('should not render when config is null', () => {
    const { container } = render(
      <ResultsDisplay 
        serverModels={[]} 
        config={null} 
      />
    );
    
    // Container should be empty
    expect(container.firstChild).toBeNull();
  });
  
  test('should display configuration details correctly', () => {
    const config = {
      cpu: 'ARM',
      memory: 524288,
      hasGPU: true
    };
    
    render(
      <ResultsDisplay 
        serverModels={['High Density Server']} 
        config={config} 
      />
    );
    
    expect(screen.getByText(/CPU: ARM/)).toBeInTheDocument();
    expect(screen.getByText(/Memory: 524,288 MB/)).toBeInTheDocument();
    expect(screen.getByText(/GPU Accelerator Card: Yes/)).toBeInTheDocument();
  });
  
  test('should display server models correctly', () => {
    const config = {
      cpu: 'Power',
      memory: 262144,
      hasGPU: false
    };
    
    render(
      <ResultsDisplay 
        serverModels={['Tower Server', '4U Rack Server', 'Mainframe']} 
        config={config} 
      />
    );
    
    expect(screen.getByText('Tower Server')).toBeInTheDocument();
    expect(screen.getByText('4U Rack Server')).toBeInTheDocument();
    expect(screen.getByText('Mainframe')).toBeInTheDocument();
  });
  
  test('should display No Options message when no models are available', () => {
    const config = {
      cpu: 'X86',
      memory: 524288,
      hasGPU: true
    };
    
    render(
      <ResultsDisplay 
        serverModels={['No Options']} 
        config={config} 
      />
    );
    
    expect(screen.getByText('No Options')).toBeInTheDocument();
  });
}); 