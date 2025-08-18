
// 🎯 Type Guards for Maestro-AI & Cipher Autonomous
// Location: src/shared/typeGuards.ts
// These help TypeScript know exactly what type an object is (for compile-time safety)

import type {
    AnalysisResult,
    OptimizationSuggestion,
    PredictiveAnalysis,
    RebuildStrategy,
    RouteHealthAudit
} from './types';
  
  /**
   * 🛡️ Type guard: Is this a RouteHealthAudit?
   */
  export function isRouteHealthAudit(obj: unknown): obj is RouteHealthAudit {
    return !!obj && typeof obj === 'object' && 'score' in obj && 'routes' in obj && 'issues' in obj;
  }
  
  /**
   * 🧠 Type guard: Is this a PredictiveAnalysis?
   */
  export function isPredictiveAnalysis(obj: unknown): obj is PredictiveAnalysis {
    return !!obj && typeof obj === 'object' && ('patterns' in obj || 'predictions' in obj || 'complexity' in obj);
  }
  
  /**
   * 🎯 Type guard: Is this an AnalysisResult?
   */
  export function isAnalysisResult(obj: unknown): obj is AnalysisResult {
    return !!obj && typeof obj === 'object' && 'healthScore' in obj && 'issues' in obj && 'suggestions' in obj;
  }
  
  /**
   * 🚀 Type guard: Is this an OptimizationSuggestion?
   */
  export function isOptimizationSuggestion(obj: unknown): obj is OptimizationSuggestion {
    return !!obj && typeof obj === 'object' && 'type' in obj && 'confidence' in obj && 'fix' in obj;
  }
  
  
  // ====== EXPORT AS DEFAULT COLLECTION TOO ======
  export const TypeGuards = {
    isRouteHealthAudit,
    isPredictiveAnalysis,
    isAnalysisResult,
    isOptimizationSuggestion,
    isRebuildStrategy
  };
  
  export default TypeGuards;
  
  
/**
   * 🔧 Type guard: Is this a RebuildStrategy?
   */
  export function isRebuildStrategy(obj: unknown): obj is RebuildStrategy {
    return !!obj &&
      typeof obj === 'object' &&
      'type' in obj &&
      ['refactor', 'rewrite', 'optimize', 'enhance'].includes((obj as any).type) &&
      (
        !('preserveComments' in obj) || typeof (obj as any).preserveComments === 'boolean'
      ) &&
      (
        !('enhanceTypes' in obj) || typeof (obj as any).enhanceTypes === 'boolean'
      ) &&
      (
        !('addPerformanceOptimizations' in obj) || typeof (obj as any).addPerformanceOptimizations === 'boolean'
      );
  }
  