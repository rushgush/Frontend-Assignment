export interface Configuration {
  cpu: string;
  memory: number;
  hasGPU: boolean;
}

export type ServerModel = 'Tower Server' | 'High Density Server' | '4U Rack Server' | 'Mainframe' | 'No Options';

export function getAvailableServerModels(config: Configuration): ServerModel[] {
  const { cpu, memory, hasGPU } = config;
  
 //Any Model must not have a lower than 2,048MB memory
  if (memory < 2048) {
    return ['No Options'];
  }
  
  // GPU Accelerator Card with ARM CPU and memory >= 524,288MB
  if (hasGPU) {
    if (cpu === 'ARM' && memory >= 524288) {
      return ['High Density Server'];
    } else {
      return ['No Options'];
    }
  }
  
  // Mainframe with Power CPU
  if (cpu === 'Power') {
    const models: ServerModel[] = [];
    
    models.push('Mainframe');
    
    if (memory >= 131072) {
      models.push('Tower Server', '4U Rack Server');
    } else {
      models.push('Tower Server');
    }
    
    return models;
  }
  
  // Memory size >= 131,072MB can be both Tower and 4U Rack Server
  if (memory >= 131072) {
    return ['Tower Server', '4U Rack Server'];
  } else {
    return ['Tower Server'];
  }
} 