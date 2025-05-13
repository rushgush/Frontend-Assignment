import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfigurationForm from '../components/ConfigurationForm';

describe('ConfigurationForm', () => {
  const mockSubmit = jest.fn();
  beforeEach(() => {
    mockSubmit.mockClear();
    render(<ConfigurationForm onSubmit={mockSubmit} />);
  });
  
  test('renders form elements correctly', () => {
    expect(screen.getByText(/hardware configuration/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
  
  test('submit button should be disabled initially', () => {
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });
  
  test('should enable submit button when valid inputs are provided', async () => {
    // Select CPU
    const cpuSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(cpuSelect);
    const x86Option = screen.getByRole('option', { name: /x86/i });
    fireEvent.click(x86Option);
    
    // Enter valid memory
    const memoryInput = screen.getByRole('textbox');
    await userEvent.type(memoryInput, '4096');
    
    // Check if submit button is enabled
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
  
  test('should show error for invalid memory input', async () => {
    // Enter invalid memory (not a power of 2)
    const memoryInput = screen.getByRole('textbox');
    await userEvent.type(memoryInput, '3072');
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/memory must be between 4,096MB and 8,388,608MB/i)).toBeInTheDocument();
    });
    
    // Submit button should remain disabled
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });
  
  test('should call onSubmit with correct values when form is submitted', async () => {
    // Select CPU
    const cpuSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(cpuSelect);
    const armOption = screen.getByRole('option', { name: /arm/i });
    fireEvent.click(armOption);
    
    // Enter valid memory
    const memoryInput = screen.getByRole('textbox');
    await userEvent.type(memoryInput, '524288');
    
    // Check GPU checkbox
    const gpuCheckbox = screen.getByRole('checkbox');
    fireEvent.click(gpuCheckbox);
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    // Check if onSubmit was called with correct values
    expect(mockSubmit).toHaveBeenCalledWith({
      cpu: 'ARM',
      memory: 524288,
      hasGPU: true
    });
  });
}); 