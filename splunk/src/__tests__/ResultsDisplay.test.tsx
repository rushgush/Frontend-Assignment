import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsDisplay from '../components/ResultsDisplay';

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
    
    const { container } = render(
      <ResultsDisplay 
        serverModels={['High Density Server']} 
        config={config} 
      />
    );
    
    // Just verify the rendered output contains key pieces of text
    expect(container.textContent).toContain('Your Configuration');
    expect(container.textContent).toContain('CPU');
    expect(container.textContent).toContain('ARM');
    expect(container.textContent).toContain('Memory');
    expect(container.textContent).toContain('GPU');
    expect(container.textContent).toContain('Yes');
    expect(container.textContent).toContain('High Density Server');
  });
  
  test('should display server models correctly', () => {
    const config = {
      cpu: 'Power',
      memory: 262144,
      hasGPU: false
    };
    
    const { container } = render(
      <ResultsDisplay 
        serverModels={['Tower Server', '4U Rack Server', 'Mainframe']} 
        config={config} 
      />
    );
    
    // Check that all models appear in the content
    expect(container.textContent).toContain('Tower Server');
    expect(container.textContent).toContain('4U Rack Server');
    expect(container.textContent).toContain('Mainframe');
  });
  
  test('should display No Options message when no models are available', () => {
    const config = {
      cpu: 'X86',
      memory: 524288,
      hasGPU: true
    };
    
    const { container } = render(
      <ResultsDisplay 
        serverModels={['No Options']} 
        config={config} 
      />
    );
    
    // Check for the "no models" message
    expect(container.textContent).toContain('No compatible server models found');
  });
}); 