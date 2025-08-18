// 🛡️ TypeScript Helper System for Cipher
// Location: .vscode-extensions/cipher-autonomous-dev/src/shared/typeHelpers.ts
// Purpose: Prevent common TypeScript errors and provide safe utilities

// ===== ERROR HANDLING UTILITIES =====

/**
 * 🚨 Safe Error Message Extraction
 * Fixes: 'error' is of type 'unknown'
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
      return String((error as any).message);
    }
    return 'Unknown error occurred';
  }
  
  /**
   * 🚨 Complete Error Details
   */
  export function getErrorDetails(error: unknown): ErrorDetails {
    if (error instanceof Error) {
      return {
        message: error.message,
        name: error.name,
        stack: error.stack
      };
    }
    return {
      message: getErrorMessage(error),
      name: 'UnknownError'
    };
  }
  
  interface ErrorDetails {
    message: string;
    name: string;
    stack?: string;
  }
  
  // ===== SAFE OBJECT ACCESS =====
  
  /**
   * 🛡️ Safe Property Access
   * Fixes: Property 'routes' does not exist on type 'unknown'
   */
  export function safeGet<T>(obj: any, path: string, defaultValue: T): T {
    if (!obj || typeof obj !== 'object') {
      return defaultValue;
    }
  
    try {
      const keys = path.split('.');
      let current = obj;
      
      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return defaultValue;
        }
      }
      
      return current !== undefined && current !== null ? current : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  
  /**
   * 🛡️ Safe Array Access
   */
  export function safeArray<T>(value: unknown, defaultValue: T[] = []): T[] {
    return Array.isArray(value) ? value : defaultValue;
  }
  
  /**
   * 🛡️ Safe String Access
   */
  export function safeString(value: unknown, defaultValue: string = ''): string {
    return typeof value === 'string' ? value : defaultValue;
  }
  
  /**
   * 🛡️ Safe Number Access
   */
  export function safeNumber(value: unknown, defaultValue: number = 0): number {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  }
  
  // ===== ANALYSIS OBJECT HELPERS =====
  
  /**
   * 🎯 Safe Analysis Routes Access
   * Fixes: analysis.routes type issues
   */
  export function getAnalysisRoutes(analysis: unknown): RouteInfo[] {
    return safeArray(safeGet(analysis, 'routes', []));
  }
  
  /**
   * 🎯 Safe Analysis Suggestions
   */
  export function getAnalysisSuggestions(analysis: unknown): string[] {
    return safeArray(safeGet(analysis, 'suggestions', []));
  }
  
  /**
   * 🎯 Safe Analysis Issues
   */
  export function getAnalysisIssues(analysis: unknown): string[] {
    return safeArray(safeGet(analysis, 'issues', []));
  }
  
  /**
   * 🎯 Complete Safe Analysis Access
   */
  export function getSafeAnalysis(analysis: unknown): SafeAnalysisResult {
    return {
      routes: getAnalysisRoutes(analysis),
      suggestions: getAnalysisSuggestions(analysis),
      issues: getAnalysisIssues(analysis),
      totalFiles: safeNumber(safeGet(analysis, 'totalFiles', 0)),
      components: safeNumber(safeGet(analysis, 'components', 0)),
      hooks: safeNumber(safeGet(analysis, 'hooks', 0)),
      utils: safeNumber(safeGet(analysis, 'utils', 0))
    };
  }
  
  interface SafeAnalysisResult {
    routes: RouteInfo[];
    suggestions: string[];
    issues: string[];
    totalFiles: number;
    components: number;
    hooks: number;
    utils: number;
  }
  
  // Import RouteInfo from types (you'll need this import)
  import { RouteInfo } from './types';
  
  // ===== PERFORMANCE OPTIMIZATION HELPERS =====
  
  /**
   * 🚀 Performance Optimization Type Safety
   * Fixes: "Optimize Performance" can't be both string and object
   */
  export type OptimizationLevel = 'low' | 'medium' | 'high';
  export type OptimizationTarget = 'memory' | 'cpu' | 'network' | 'rendering' | 'audio' | 'all';
  
  export interface PerformanceOptimization {
    id: string;
    target: OptimizationTarget;
    description: string;
    impact: OptimizationLevel;
    effort: OptimizationLevel;
    musicSpecific?: boolean;
    brainRecommended?: boolean;
  }
  
  /**
   * 🚀 Create Safe Performance Optimization
   */
  export function createOptimization(
    target: OptimizationTarget,
    description: string,
    impact: OptimizationLevel = 'medium',
    effort: OptimizationLevel = 'medium'
  ): PerformanceOptimization {
    return {
      id: `opt_${target}_${Date.now()}`,
      target,
      description,
      impact,
      effort,
      musicSpecific: target === 'audio',
      brainRecommended: false
    };
  }

  export type OptimizationSuggestion = {
    type: 'memo' | 'useCallback' | 'useMemo' | 'structure';
    description: string;
    confidence: string;
    optimizationSuggestions: string;
    linenumber: string;
    component: string;
    message: string; // ✅ ADD THIS LINE
    severity: 'info' | 'warning' | 'error';
    fix: string;
  };
  
  /**
   * 🚀 Music-Specific Optimizations
   */
  export function createMusicOptimization(description: string): PerformanceOptimization {
    return createOptimization('audio', description, 'high', 'medium');
  }
  
  // ===== BRAIN RESPONSE HELPERS =====
  
  /**
   * 🧠 Safe Brain Response Handling
   */
  export interface BrainResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    source: 'brain' | 'simulation';
    timestamp: number;
  }
  
  /**
   * 🧠 Create Safe Brain Response
   */
  export function createBrainResponse<T>(
    success: boolean,
    data?: T,
    error?: string,
    source: 'brain' | 'simulation' = 'simulation'
  ): BrainResponse<T> {
    return {
      success,
      data,
      error,
      source,
      timestamp: Date.now()
    };
  }
  
  /**
   * 🧠 Safe Brain Response Access
   */
  export function getBrainData<T>(response: unknown, defaultValue: T): T {
    if (response && typeof response === 'object' && 'data' in response) {
      return (response as any).data ?? defaultValue;
    }
    return defaultValue;
  }
  
  // ===== ASYNC OPERATION HELPERS =====
  
  /**
   * ⏱️ Safe Async Operation with Timeout
   */
  export async function safeAsync<T>(
    operation: Promise<T>,
    timeoutMs: number = 5000,
    defaultValue: T
  ): Promise<T> {
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Operation timeout')), timeoutMs);
      });
  
      return await Promise.race([operation, timeoutPromise]);
    } catch (error) {
      console.warn('Async operation failed:', getErrorMessage(error));
      return defaultValue;
    }
  }
  
  // ===== VALIDATION HELPERS =====
  
  /**
   * ✅ Type Guards
   */
  export function isString(value: unknown): value is string {
    return typeof value === 'string';
  }
  
  export function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
  }
  
  export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
  }
  
  export function isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  
  export function hasProperty<T extends string>(
    obj: unknown,
    prop: T
  ): obj is Record<T, unknown> {
    return isObject(obj) && prop in obj;
  }
  
  /**
   * ✅ Validate Analysis Object
   */
  export function isValidAnalysis(analysis: unknown): analysis is SafeAnalysisResult {
    return (
      isObject(analysis) &&
      hasProperty(analysis, 'routes') &&
      hasProperty(analysis, 'suggestions') &&
      hasProperty(analysis, 'issues') &&
      isArray(analysis.routes) &&
      isArray(analysis.suggestions) &&
      isArray(analysis.issues)
    );
  }
  
  // ===== EXPORT ALL UTILITIES =====
  export const TypeHelpers = {
    // Error handling
    getErrorMessage,
    getErrorDetails,
    
    // Safe access
    safeGet,
    safeArray,
    safeString,
    safeNumber,
    
    // Analysis helpers
    getAnalysisRoutes,
    getAnalysisSuggestions,
    getAnalysisIssues,
    getSafeAnalysis,
    
    // Performance
    createOptimization,
    createMusicOptimization,
    
    // Brain responses
    createBrainResponse,
    getBrainData,
    
    // Async operations
    safeAsync,
    
    // Validation
    isString,
    isNumber,
    isArray,
    isObject,
    hasProperty,
    isValidAnalysis
  };
  
  export default TypeHelpers;