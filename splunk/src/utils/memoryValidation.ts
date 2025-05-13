export function validateMemory(memoryString: string): { isValid: boolean; error?: string } {
  // Empty input check
  if (!memoryString.trim()) {
    return { isValid: false, error: 'Memory is required' };
  }
  
  // Remove commas for numerical validation
  const cleanedValue = memoryString.replace(/,/g, '');
  
  // Check if it contains only digits after removing commas
  if (!/^\d+$/.test(cleanedValue)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  const memoryValue = parseInt(cleanedValue, 10);
  
  // Check range first (4,096MB to 8,388,608MB)
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
  
  // Check for proper comma formatting for numbers over 999
  if (memoryValue > 999) {
    // If no commas were found in the original input
    if (!memoryString.includes(',')) {
      return { isValid: false, error: 'Memory must use comma separated format (e.g., 4,096)' };
    }
    
    // Check if commas are in the right places
    const parts = memoryString.split(',');
    if (parts.some((part, index) => {
      return (index > 0 && part.length !== 3) || !/^\d+$/.test(part);
    })) {
      return { isValid: false, error: 'Memory must use proper comma formatting (e.g., 4,096)' };
    }
  }
  
  return { isValid: true };
} 