
/**
 * OfflineMode service for handling offline functionality
 * This service provides fallback functionality when Supabase or API connections are unavailable
 */

import { toast } from "sonner";
import { getDemoSolutionById, getAllDemoSolutions, saveDemoSolution } from './DemoSolutionService';
import type { DemoSolution } from './DemoSolutionService';

// Interface for solution data
export interface Solution {
  id: string;
  title: string;
  description?: string;
  business_prompt?: string;
  ui_solution: string;
  database_solution: string;
  automation_solution: string;
  expert_insights?: Record<string, string>;
  created_at: string;
  updated_at: string;
  user_id?: string;
}

class OfflineMode {
  private _isOffline: boolean = false;
  private _isForced: boolean = false;

  constructor() {
    // Check if offline mode is enabled in localStorage
    const savedOfflineMode = localStorage.getItem('offlineMode');
    if (savedOfflineMode === 'true') {
      this._isForced = true;
      this._isOffline = true;
      console.log('Offline mode enabled from localStorage');
    }
    
    // Add offline detection
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
    
    // Check initial status
    this.updateOnlineStatus();
  }
  
  // Update online/offline status
  private updateOnlineStatus() {
    const wasOffline = this._isOffline;
    if (!this._isForced) {
      this._isOffline = !navigator.onLine;
    }
    
    // Notify if status changed
    if (wasOffline !== this._isOffline) {
      if (this._isOffline) {
        console.log('App is now offline. Using local data.');
        toast.info('You are now offline. Using local data.');
      } else {
        console.log('App is now online.');
        toast.success('You are now back online.');
      }
    }
  }
  
  // Check if app is in offline mode
  get isOffline(): boolean {
    return this._isOffline;
  }
  
  // Force offline mode on/off
  public setForceOffline(force: boolean): void {
    this._isForced = force;
    this._isOffline = force;
    localStorage.setItem('offlineMode', force ? 'true' : 'false');
    
    if (force) {
      toast.info('Offline mode has been enabled. Using local data only.');
    } else {
      this.updateOnlineStatus();
      toast.success('Offline mode has been disabled.');
    }
  }
  
  // Get all solutions (uses demo data when offline)
  public async getSolutions(): Promise<Solution[]> {
    if (this._isOffline) {
      // Combine demo solutions and any locally saved solutions
      const demoSolutions = getAllDemoSolutions();
      const localSolutions = this.getLocalSolutions();
      
      // Convert to Solution type
      const combinedSolutions: Solution[] = [
        ...demoSolutions.map(this.convertDemoToSolution),
        ...localSolutions
      ];
      
      return Promise.resolve(combinedSolutions);
    }
    
    // In a real implementation, this would call the Supabase API
    // But for now, we're just simulating network failure
    try {
      throw new Error('Simulated network failure');
      // In a real app, this would be:
      // const { data, error } = await supabase.from('solutions').select('*');
      // if (error) throw error;
      // return data;
    } catch (error) {
      console.warn('Failed to fetch solutions from API, using offline data', error);
      this._isOffline = true;
      
      // Return demo and local solutions
      const demoSolutions = getAllDemoSolutions();
      const localSolutions = this.getLocalSolutions();
      
      const combinedSolutions: Solution[] = [
        ...demoSolutions.map(this.convertDemoToSolution),
        ...localSolutions
      ];
      
      return combinedSolutions;
    }
  }
  
  // Get a specific solution by ID
  public async getSolutionById(id: string): Promise<Solution | null> {
    if (this._isOffline) {
      // Try to get from demo solutions
      const demoSolution = getDemoSolutionById(id);
      if (demoSolution) {
        return this.convertDemoToSolution(demoSolution);
      }
      
      // Try to get from local storage
      const localSolution = this.getLocalSolutionById(id);
      if (localSolution) {
        return localSolution;
      }
      
      return null;
    }
    
    // In a real implementation, this would call the Supabase API
    try {
      throw new Error('Simulated network failure');
      // In a real app, this would be:
      // const { data, error } = await supabase.from('solutions').select('*').eq('id', id).single();
      // if (error) throw error;
      // return data;
    } catch (error) {
      console.warn(`Failed to fetch solution ${id} from API, using offline data`, error);
      
      // Try to get from demo solutions
      const demoSolution = getDemoSolutionById(id);
      if (demoSolution) {
        return this.convertDemoToSolution(demoSolution);
      }
      
      // Try to get from local storage
      const localSolution = this.getLocalSolutionById(id);
      if (localSolution) {
        return localSolution;
      }
      
      return null;
    }
  }
  
  // Save a solution
  public async saveSolution(solution: Solution): Promise<Solution> {
    if (this._isOffline) {
      return this.saveLocalSolution(solution);
    }
    
    // In a real implementation, this would call the Supabase API
    try {
      throw new Error('Simulated network failure');
      // In a real app, this would be:
      // const { data, error } = await supabase.from('solutions').upsert(solution);
      // if (error) throw error;
      // return data;
    } catch (error) {
      console.warn('Failed to save solution to API, saving locally', error);
      return this.saveLocalSolution(solution);
    }
  }
  
  // Convert DemoSolution to Solution format
  private convertDemoToSolution(demo: DemoSolution): Solution {
    return {
      id: demo.id,
      title: demo.title,
      description: demo.description,
      business_prompt: demo.business_prompt,
      ui_solution: demo.ui_solution,
      database_solution: demo.database_solution,
      automation_solution: demo.automation_solution,
      created_at: demo.created_at,
      updated_at: demo.updated_at,
      expert_insights: {}
    };
  }
  
  // Get all locally saved solutions
  private getLocalSolutions(): Solution[] {
    try {
      const savedSolutions = localStorage.getItem('localSolutions');
      if (savedSolutions) {
        return JSON.parse(savedSolutions);
      }
    } catch (e) {
      console.error('Error retrieving local solutions', e);
    }
    return [];
  }
  
  // Get a specific locally saved solution by ID
  private getLocalSolutionById(id: string): Solution | null {
    try {
      const savedSolutions = this.getLocalSolutions();
      return savedSolutions.find(s => s.id === id) || null;
    } catch (e) {
      console.error(`Error retrieving local solution ${id}`, e);
      return null;
    }
  }
  
  // Save a solution locally
  private saveLocalSolution(solution: Solution): Promise<Solution> {
    return new Promise((resolve) => {
      try {
        const savedSolutions = this.getLocalSolutions();
        const now = new Date().toISOString();
        
        // If there's no ID, generate one
        if (!solution.id) {
          solution.id = `local-${Date.now()}`;
          solution.created_at = now;
        }
        
        solution.updated_at = now;
        
        // Find existing or add new
        const existingIndex = savedSolutions.findIndex(s => s.id === solution.id);
        if (existingIndex !== -1) {
          savedSolutions[existingIndex] = solution;
        } else {
          savedSolutions.push(solution);
        }
        
        // Save back to localStorage
        localStorage.setItem('localSolutions', JSON.stringify(savedSolutions));
        
        toast.success('Solution saved locally');
        resolve(solution);
      } catch (e) {
        console.error('Error saving solution locally', e);
        toast.error('Failed to save solution locally');
        resolve(solution); // Return the original solution even on error
      }
    });
  }
}

// Export a singleton instance
export default new OfflineMode();
