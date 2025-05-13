import { getAvailableServerModels, Configuration } from '../utils/serverModelSelection';

describe('Server Model Selection', () => {
  // Test case 1 from README: Memory less than 2,048MB
  test('should return No Options when memory is less than 2,048MB', () => {
    const config: Configuration = {
      cpu: 'Power',
      memory: 1024,
      hasGPU: false
    };
    
    const result = getAvailableServerModels(config);
    expect(result).toEqual(['No Options']);
  });
  
  // Test case 2 from README: Power CPU with 262,144MB memory without GPU
  test('should return Tower Server, 4U Rack Server, and Mainframe for Power CPU with 262,144MB without GPU', () => {
    const config: Configuration = {
      cpu: 'Power',
      memory: 262144,
      hasGPU: false
    };
    
    const result = getAvailableServerModels(config);
    // Check that all expected models are included (order may vary)
    expect(result).toContain('Tower Server');
    expect(result).toContain('4U Rack Server');
    expect(result).toContain('Mainframe');
    expect(result.length).toBe(3);
  });
  
  // Test case 3 from README: X86 CPU with 524,288MB memory without GPU
  test('should return Tower Server and 4U Rack Server for X86 CPU with 524,288MB without GPU', () => {
    const config: Configuration = {
      cpu: 'X86',
      memory: 524288,
      hasGPU: false
    };
    
    const result = getAvailableServerModels(config);
    expect(result).toContain('Tower Server');
    expect(result).toContain('4U Rack Server');
    expect(result.length).toBe(2);
  });
  
  // Test case 4 from README: ARM CPU with 524,288MB memory with GPU
  test('should return High Density Server for ARM CPU with 524,288MB with GPU', () => {
    const config: Configuration = {
      cpu: 'ARM',
      memory: 524288,
      hasGPU: true
    };
    
    const result = getAvailableServerModels(config);
    expect(result).toEqual(['High Density Server']);
  });
  
  // Additional test cases
  test('should return No Options for non-ARM CPU with GPU', () => {
    const config: Configuration = {
      cpu: 'X86',
      memory: 524288,
      hasGPU: true
    };
    
    const result = getAvailableServerModels(config);
    expect(result).toEqual(['No Options']);
  });
  
  test('should return No Options for ARM CPU with GPU but insufficient memory', () => {
    const config: Configuration = {
      cpu: 'ARM',
      memory: 131072, // Less than required 524,288MB
      hasGPU: true
    };
    
    const result = getAvailableServerModels(config);
    expect(result).toEqual(['No Options']);
  });
  
  test('should return only Tower Server for X86 CPU with lower memory', () => {
    const config: Configuration = {
      cpu: 'X86',
      memory: 65536, // Less than 131,072MB threshold
      hasGPU: false
    };
    
    const result = getAvailableServerModels(config);
    expect(result).toEqual(['Tower Server']);
  });
}); 