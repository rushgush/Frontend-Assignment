import { validateMemory } from '../utils/memoryValidation';

describe('Memory Validation', () => {
  test('should accept valid memory values', () => {
    // Valid values: multiples of 1024 and powers of 2, within range, comma-formatted
    const validValues = ['4,096', '8,192', '16,384', '32,768', '8,388,608'];
    
    validValues.forEach(value => {
      const result = validateMemory(value);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
  
  test('should reject non-numeric values', () => {
    const result = validateMemory('abc');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('valid number');
  });
  
  test('should reject values below minimum (4,096MB)', () => {
    const result = validateMemory('2048');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('between 4,096MB and 8,388,608MB');
  });
  
  test('should reject values above maximum (8,388,608MB)', () => {
    const result = validateMemory('16777216'); // 16MB
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('between 4,096MB and 8,388,608MB');
  });
  
  test('should reject values that are not multiples of 1024', () => {
    const result = validateMemory('5000');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('multiple of 1024MB');
  });
  
  test('should reject values that are not powers of 2', () => {
    // 3072 is a multiple of 1024 but not a power of 2
    const result = validateMemory('3072');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('between 4,096MB and 8,388,608MB');
  });
  
  test('should handle comma-separated input properly', () => {
    const result = validateMemory('32,768');
    expect(result.isValid).toBe(true);
  });
}); 