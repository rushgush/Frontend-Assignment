export function validateMemory(memoryString: string): { isValid: boolean; error?: string } {
  // Remove commas for validation
  const cleanedValue = memoryString.replace(/,/g, '');
  const memoryValue = parseInt(cleanedValue, 10);
  
  // Check if it's a valid number
  if (isNaN(memoryValue)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  // Check range (4,096MB to 8,388,608MB)
  if (memoryValue < 4096 || memoryValue > 8388608) {
    return { isValid: false, error: 'Memory must be between 4,096MB and 8,388,608MB' };
  }
  
  // Check if it's a multiple of 1024
  if (memoryValue % 1024 !== 0) {
    return { isValid: false, error: 'Memory must be a multiple of 1024MB' };
  }
  
  // Check if it's a power of 2
  const log2 = Math.log2(memoryValue);
  if (log2 !== Math.floor(log2)) {
    return { isValid: false, error: 'Memory must be a power of 2' };
  }
  
  return { isValid: true };
} 