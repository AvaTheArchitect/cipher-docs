// 🧠 Cipher Brain System - Intelligence Engine ENHANCED with Orchestration
// Location: .vscode-extensions/cipher-autonomous-dev/src/brain/CipherBrain.ts

import * as vscode from "vscode";

export interface PatternData {
  successes: number;
  failures: number;
  lastUsed: string;
  confidence: number;
  userFeedback: number[];
}

export interface UserFeedback {
  action: string;
  satisfaction: number; // 1-5 scale
  timeToComplete: number;
  context: ProjectContext;
}

export interface ProjectContext {
  currentFile?: string;
  fileType?: string;
  projectSize: number;
  complexity: number;
  recentActions: string[];
  userRole?: string;
  preferences: Map<string, any>;
}

// ===== NEW PROTECTION INTERFACES =====
export interface ProtectionContext extends ProjectContext {
  handlerName?: string;
  targetFolders?: string[];
  filesProtected?: number;
  backupsCreated?: number;
  indexFilesCreated?: number;
  protectionType?: "single" | "bulk" | "songsterr";
}

export interface ProtectionAnalytics {
  totalProtections: number;
  successRate: number;
  failureRate: number;
  mostProtectedHandler: string;
  averageFilesProtected: number;
  backupEffectiveness: number;
  indexCreationRate: number;
  recommendations: string[];
}

// 🚀 NEW: ORCHESTRATION INTERFACES (ADDED)
export interface HandlerCapability {
  handlerName: string;
  category:
    | "core"
    | "music"
    | "routes"
    | "deployment"
    | "utilities"
    | "intelligence"
    | "import-export";
  capabilities: string[];
  strengths: string[];
  limitations: string[];
  successRate: number;
  averageExecutionTime: number;
  lastUsed: Date | null;
  confidence: number;
}

export interface ProblemClassification {
  problemType:
    | "syntax-error"
    | "structural-issue"
    | "optimization-needed"
    | "component-creation"
    | "music-analysis"
    | "guitar-analysis"
    | "vocal-analysis"
    | "audio-creation"
    | "route-issue"
    | "route-health"
    | "route-visualization"
    | "deployment-task"
    | "test-generation"
    | "performance-issue"
    | "complex-refactor"
    | "simple-fix"
    | "unknown";
  complexity: "simple" | "moderate" | "complex" | "expert";
  confidence: number;
  indicators: string[];
  context: any;
}

export interface HandlerRecommendation {
  handlerName: string;
  confidence: number;
  reasoning: string;
  estimatedSuccessRate: number;
  fallbackHandlers: string[];
  executionOrder: number;
}

export interface OrchestrationPattern {
  handlerSequence: string[];
  problemType: string;
  successRate: number;
  averageExecutionTime: number;
  filesCreated: number;
  complexity: number;
  lastUsed: Date;
  userSatisfaction: number;
}

// ✅ FIXED: Change Map to Record for serialization compatibility
export interface LearningData {
  patterns: Record<string, PatternData>; // ✅ FIXED: was Map<string, PatternData>
  userPreferences: Record<string, any>; // ✅ FIXED: was Map<string, any>
  projectHistory: ProjectSnapshot[];
  adaptiveBehavior: AdaptiveBehavior;
  // 🚀 NEW: Add orchestration data
  handlerCapabilities?: Record<string, HandlerCapability>;
  orchestrationPatterns?: Record<string, OrchestrationPattern>;
}

export interface ProjectSnapshot {
  timestamp: string;
  filesCount: number;
  componentsCount: number;
  issuesCount: number;
  actionsPerformed: string[];
  userSatisfaction: number;
}

export interface AdaptiveBehavior {
  suggestionFrequency: number;
  autoFixAggressiveness: number;
  analysisDepth: number;
  preferredFeatures: string[];
}

/**
 * 🧠 CipherBrain - Internal Intelligence Engine ENHANCED
 * This is the CORE intelligence that BrainConnector manages internally
 * Extension.ts should NEVER import this directly!
 */
export class CipherBrain {
  private patterns: Map<string, PatternData> = new Map();
  private userPreferences: Map<string, any> = new Map();
  private projectHistory: ProjectSnapshot[] = [];
  private adaptiveBehavior: AdaptiveBehavior;
  private context: vscode.ExtensionContext | any;
  private learningEnabled: boolean = true;

  // 🚀 NEW: Orchestration intelligence
  private handlerCapabilities: Map<string, HandlerCapability> = new Map();
  private orchestrationPatterns: Map<string, OrchestrationPattern> = new Map();

  constructor(context: vscode.ExtensionContext | any) {
    this.context = context;
    this.adaptiveBehavior = {
      suggestionFrequency: 3,
      autoFixAggressiveness: 2,
      analysisDepth: 3,
      preferredFeatures: [],
    };
    this.loadPersistentData();
    this.initializeHandlerCapabilities();
  }

  // 🚀 NEW: Initialize Handler Capabilities
  private initializeHandlerCapabilities(): void {
    // Core handlers
    this.registerHandlerCapability("analyzeCurrentFileHandler", {
      category: "core",
      capabilities: ["file-analysis", "syntax-checking", "quality-assessment"],
      strengths: [
        "TypeScript analysis",
        "component analysis",
        "error detection",
      ],
      limitations: ["cannot fix issues", "read-only analysis"],
      successRate: 0.9,
      averageExecutionTime: 2000,
    });

    this.registerHandlerCapability("smartFileRebuilderHandler", {
      category: "core",
      capabilities: [
        "structural-refactoring",
        "complex-fixes",
        "component-creation",
        "hook-restructuring",
      ],
      strengths: [
        "BadHooks fixes",
        "SVG modules",
        "complex rebuilds",
        "architectural changes",
      ],
      limitations: ["slower execution", "requires valid input"],
      successRate: 0.85,
      averageExecutionTime: 5000,
    });

    // Music handlers
    this.registerHandlerCapability("generateGuitarComponentHandler", {
      category: "music",
      capabilities: [
        "guitar-component-creation",
        "music-generation",
        "code-generation",
      ],
      strengths: ["custom guitar components", "music-specific logic"],
      limitations: ["guitar domain only", "requires music context"],
      successRate: 0.85,
      averageExecutionTime: 4000,
    });

    this.registerHandlerCapability("analyzeGuitarComponentsHandler", {
      category: "music",
      capabilities: ["guitar-analysis", "chord-detection", "music-components"],
      strengths: ["guitar expertise", "music theory", "component analysis"],
      limitations: ["music files only", "specialized domain"],
      successRate: 0.9,
      averageExecutionTime: 3000,
    });

    console.log(
      `🧠 Initialized ${this.handlerCapabilities.size} handler capabilities`
    );
  }

  private registerHandlerCapability(
    handlerName: string,
    capabilities: Partial<HandlerCapability>
  ): void {
    const handler: HandlerCapability = {
      handlerName,
      category: capabilities.category || "utilities",
      capabilities: capabilities.capabilities || [],
      strengths: capabilities.strengths || [],
      limitations: capabilities.limitations || [],
      successRate: capabilities.successRate || 0.7,
      averageExecutionTime: capabilities.averageExecutionTime || 3000,
      lastUsed: null,
      confidence: capabilities.successRate || 0.7,
    };

    this.handlerCapabilities.set(handlerName, handler);
  }

  // ===== CORE LEARNING FUNCTIONS =====

  learnFromAction(
    action: string,
    result: "success" | "failure",
    context?: ProjectContext
  ): void {
    if (!this.learningEnabled) return;

    const pattern = this.patterns.get(action) || {
      successes: 0,
      failures: 0,
      lastUsed: new Date().toISOString(),
      confidence: 0.5,
      userFeedback: [],
    };

    if (result === "success") {
      pattern.successes++;
      pattern.confidence = Math.min(1.0, pattern.confidence + 0.1);
    } else {
      pattern.failures++;
      pattern.confidence = Math.max(0.1, pattern.confidence - 0.05);
    }

    pattern.lastUsed = new Date().toISOString();
    this.patterns.set(action, pattern);

    this.adaptBehaviorBasedOnPatterns();
    this.persistData();
  }

  // 🚀 NEW: Learn from Handler Orchestration
  learnFromOrchestration(
    handlerSequence: string[],
    problemType: string,
    result: "success" | "failure",
    metadata: {
      executionTime: number;
      filesCreated: number;
      complexity: number;
      userSatisfaction?: number;
    }
  ): void {
    if (!this.learningEnabled) return;

    const patternKey = `${problemType}-${handlerSequence.join("->")}`;
    const pattern = this.orchestrationPatterns.get(patternKey) || {
      handlerSequence,
      problemType,
      successRate: 0.5,
      averageExecutionTime: 0,
      filesCreated: 0,
      complexity: 0,
      lastUsed: new Date(),
      userSatisfaction: 3,
    };

    if (result === "success") {
      pattern.successRate = Math.min(1.0, pattern.successRate + 0.1);
      pattern.userSatisfaction = Math.min(5, pattern.userSatisfaction + 0.2);
    } else {
      pattern.successRate = Math.max(0.1, pattern.successRate - 0.1);
      pattern.userSatisfaction = Math.max(1, pattern.userSatisfaction - 0.3);
    }

    // Update averages
    pattern.averageExecutionTime =
      (pattern.averageExecutionTime + metadata.executionTime) / 2;
    pattern.filesCreated = Math.max(
      pattern.filesCreated,
      metadata.filesCreated
    );
    pattern.complexity = (pattern.complexity + metadata.complexity) / 2;
    pattern.lastUsed = new Date();

    this.orchestrationPatterns.set(patternKey, pattern);

    // Update individual handler success rates
    for (const handlerName of handlerSequence) {
      const handler = this.handlerCapabilities.get(handlerName);
      if (handler) {
        if (result === "success") {
          handler.successRate = Math.min(1.0, handler.successRate + 0.05);
          handler.confidence = Math.min(1.0, handler.confidence + 0.03);
        } else {
          handler.successRate = Math.max(0.1, handler.successRate - 0.03);
          handler.confidence = Math.max(0.1, handler.confidence - 0.02);
        }
        handler.lastUsed = new Date();
        this.handlerCapabilities.set(handlerName, handler);
      }
    }

    console.log(`🧠 Learned orchestration: ${patternKey} (${result})`);
    this.persistData();
  }

  // 🚀 NEW: Classify Problem Type for Handler Recommendation
  classifyProblem(
    code: string,
    filePath: string,
    context: any = {}
  ): ProblemClassification {
    const indicators: string[] = [];
    let problemType: ProblemClassification["problemType"] = "unknown";
    let complexity: ProblemClassification["complexity"] = "moderate";
    let confidence = 0.5;

    try {
      // STRUCTURAL ISSUES
      if (
        code.includes("if (") &&
        (code.includes("useState") || code.includes("useEffect"))
      ) {
        problemType = "structural-issue";
        complexity = "complex";
        confidence = 0.9;
        indicators.push("Conditional hooks detected");
        indicators.push("Requires structural refactoring");
      }
      // SYNTAX ERRORS
      else if (code.includes("import") && code.includes('from "";')) {
        problemType = "syntax-error";
        complexity = "simple";
        confidence = 0.85;
        indicators.push("Missing import paths");
      }
      // COMPONENT CREATION
      else if (context.action === "create-component" || !code.trim()) {
        problemType = "component-creation";
        complexity = "moderate";
        confidence = 0.9;
        indicators.push("New component creation requested");
      }
      // MUSIC ANALYSIS
      else if (this.isMusicRelated(filePath, code)) {
        problemType = "music-analysis";
        complexity = "moderate";
        confidence = 0.85;
        indicators.push("Music-related code detected");
      }
      // GUITAR SPECIFIC
      else if (
        filePath.includes("guitar") ||
        code.includes("chord") ||
        code.includes("tab")
      ) {
        problemType = "guitar-analysis";
        complexity = "moderate";
        confidence = 0.9;
        indicators.push("Guitar component detected");
      }
      // PERFORMANCE ISSUES
      else if (this.hasPerformanceIssues(code)) {
        problemType = "performance-issue";
        complexity = "moderate";
        confidence = 0.8;
        indicators.push("Performance optimization opportunities");
      }
      // ROUTE ISSUES
      else if (this.isRouteRelated(filePath, code)) {
        problemType = "route-issue";
        complexity = "moderate";
        confidence = 0.85;
        indicators.push("Route or navigation related");
      }
      // SIMPLE FIXES
      else if (this.hasSimpleIssues(code)) {
        problemType = "simple-fix";
        complexity = "simple";
        confidence = 0.8;
        indicators.push("Simple fixes detected");
      }

      // Learn from classification
      this.learnFromAction("problem-classifier", "success", {
        currentFile: filePath,
        fileType: this.getFileTypeFromPath(filePath),
        projectSize: 1,
        complexity: this.complexityToNumber(complexity),
        recentActions: [problemType],
        preferences: new Map(),
      });
    } catch (error) {
      console.warn("Problem classification failed:", error);
      this.learnFromAction("problem-classifier", "failure", {
        currentFile: filePath,
        fileType: this.getFileTypeFromPath(filePath),
        projectSize: 1,
        complexity: 1,
        recentActions: ["classification-error"],
        preferences: new Map(),
      });
    }

    return {
      problemType,
      complexity,
      confidence,
      indicators,
      context: { filePath, codeLength: code.length, ...context },
    };
  }

  // 🚀 NEW: Get Handler Recommendations
  getHandlerRecommendations(
    classification: ProblemClassification
  ): HandlerRecommendation[] {
    const recommendations: HandlerRecommendation[] = [];

    // Find matching handlers based on problem type
    const matchingHandlers = this.findMatchingHandlers(classification);

    // Score and rank handlers
    for (const handler of matchingHandlers) {
      const score = this.calculateHandlerScore(handler, classification);

      recommendations.push({
        handlerName: handler.handlerName,
        confidence: score,
        reasoning: this.generateHandlerReasoning(handler, classification),
        estimatedSuccessRate: handler.successRate * score,
        fallbackHandlers: this.getFallbackHandlers(handler),
        executionOrder: recommendations.length + 1,
      });
    }

    // Sort by confidence
    recommendations.sort((a, b) => b.confidence - a.confidence);
    return recommendations;
  }

  // 🚀 NEW: Get Pattern-Based Suggestions (for handlers)
  getPatternBasedSuggestions(currentCode: string, context: string): string[] {
    try {
      const suggestions: string[] = [];

      // Find relevant patterns based on context
      const relevantPatterns = Array.from(this.patterns.entries())
        .filter(([action, pattern]) => {
          return (
            action.includes(context) ||
            (pattern.confidence > 0.7 && pattern.successes > pattern.failures)
          );
        })
        .sort(([, a], [, b]) => b.confidence - a.confidence)
        .slice(0, 5);

      // Generate suggestions from successful patterns
      for (const [action, pattern] of relevantPatterns) {
        if (pattern.confidence > 0.6) {
          suggestions.push(
            `Based on successful pattern: ${action.replace(/-/g, " ")}`
          );
        }
      }

      // Context-specific suggestions
      if (context === "guitar-analysis") {
        suggestions.push("Consider chord progression analysis");
        suggestions.push("Add tablature support");
        suggestions.push("Implement interactive playback");
      } else if (context === "component-creation") {
        suggestions.push("Add proper TypeScript interfaces");
        suggestions.push("Include error boundaries");
        suggestions.push("Implement responsive design");
      } else if (context === "route-analysis") {
        suggestions.push("Check for route dependencies");
        suggestions.push("Verify navigation structure");
        suggestions.push("Add route protection");
      }

      // Orchestration-based suggestions
      const successfulOrchestrations = Array.from(
        this.orchestrationPatterns.values()
      )
        .filter((pattern) => pattern.successRate > 0.8)
        .sort((a, b) => b.userSatisfaction - a.userSatisfaction)
        .slice(0, 3);

      for (const pattern of successfulOrchestrations) {
        suggestions.push(
          `Try successful pattern: ${pattern.handlerSequence.join(" → ")}`
        );
      }

      return suggestions.slice(0, 5); // Limit to 5 suggestions
    } catch (error) {
      console.warn("Failed to get pattern-based suggestions:", error);
      return [
        "Consider following established patterns",
        "Review similar successful implementations",
      ];
    }
  }

  // 🚀 NEW: Recommend Optimal Handler Sequence
  recommendHandlerSequence(classification: ProblemClassification): string[] {
    const recommendations = this.getHandlerRecommendations(classification);

    if (recommendations.length === 0) {
      return ["smartFileRebuilderHandler"]; // Fallback
    }

    // For complex problems, recommend multiple handlers
    if (
      classification.complexity === "complex" ||
      classification.complexity === "expert"
    ) {
      return recommendations.slice(0, 3).map((r) => r.handlerName);
    }

    // For simple problems, single handler
    return [recommendations[0].handlerName];
  }

  // Helper methods for problem classification
  private complexityToNumber(
    complexity: "simple" | "moderate" | "complex" | "expert"
  ): number {
    const complexityMap = {
      simple: 1,
      moderate: 3,
      complex: 5,
      expert: 7,
    };
    return complexityMap[complexity] || 3;
  }

  private getFileTypeFromPath(filePath: string): string {
    const extension = filePath.split(".").pop()?.toLowerCase() || "unknown";
    const typeMap: Record<string, string> = {
      ts: "typescript",
      tsx: "typescript-react",
      js: "javascript",
      jsx: "javascript-react",
      vue: "vue",
      md: "markdown",
    };
    return typeMap[extension] || extension;
  }

  private isMusicRelated(filePath: string, code: string): boolean {
    const musicKeywords = [
      "guitar",
      "vocal",
      "audio",
      "music",
      "chord",
      "note",
      "sound",
      "theory",
      "tab",
    ];
    const filePathLower = filePath.toLowerCase();
    const codeLower = code.toLowerCase();
    return musicKeywords.some(
      (keyword) =>
        filePathLower.includes(keyword) || codeLower.includes(keyword)
    );
  }

  private hasPerformanceIssues(code: string): boolean {
    const performanceIssues = [
      code.includes(".map(") && !code.includes("useMemo"),
      code.includes("onClick") && !code.includes("useCallback"),
      code.includes("useState") &&
        code.length > 500 &&
        !code.includes("React.memo"),
      code.includes("useEffect") && code.split("useEffect").length > 3,
    ];
    return performanceIssues.filter(Boolean).length >= 2;
  }

  private isRouteRelated(filePath: string, code: string): boolean {
    const routeIndicators = [
      "route",
      "router",
      "navigation",
      "Link",
      "useNavigate",
      "useParams",
    ];
    return routeIndicators.some(
      (indicator) => filePath.includes(indicator) || code.includes(indicator)
    );
  }

  private hasSimpleIssues(code: string): boolean {
    const simpleIssues = [
      code.includes('from ""'),
      code.includes(";;"),
      code.includes("missing"),
      code.includes("undefined") && code.length < 500,
    ];
    return simpleIssues.filter(Boolean).length > 0;
  }

  private findMatchingHandlers(
    classification: ProblemClassification
  ): HandlerCapability[] {
    const matching: HandlerCapability[] = [];

    for (const handler of this.handlerCapabilities.values()) {
      let isMatch = false;

      switch (classification.problemType) {
        case "structural-issue":
          isMatch =
            handler.capabilities.includes("structural-refactoring") ||
            handler.capabilities.includes("complex-fixes");
          break;
        case "syntax-error":
        case "simple-fix":
          isMatch =
            handler.capabilities.includes("simple-fixes") ||
            handler.capabilities.includes("auto-repair") ||
            handler.capabilities.includes("syntax-fixes");
          break;
        case "component-creation":
          isMatch =
            handler.capabilities.includes("component-creation") ||
            handler.capabilities.includes("code-generation");
          break;
        case "music-analysis":
        case "guitar-analysis":
          isMatch =
            handler.category === "music" ||
            handler.capabilities.includes("guitar-analysis") ||
            handler.capabilities.includes("music-components");
          break;
        case "route-issue":
          isMatch =
            handler.category === "routes" ||
            handler.capabilities.includes("route-analysis");
          break;
        case "performance-issue":
          isMatch =
            handler.capabilities.includes("performance-analysis") ||
            handler.capabilities.includes("optimization");
          break;
        default:
          isMatch =
            handler.capabilities.includes("structural-refactoring") ||
            handler.capabilities.includes("file-analysis");
      }

      if (isMatch) {
        matching.push(handler);
      }
    }

    return matching;
  }

  private calculateHandlerScore(
    handler: HandlerCapability,
    problem: ProblemClassification
  ): number {
    let score = 0.5; // Base score

    // Success rate factor
    score += handler.successRate * 0.3;

    // Capability matching
    const capabilityMatch = this.getCapabilityMatchScore(handler, problem);
    score += capabilityMatch * 0.3;

    // Complexity alignment
    const complexityAlignment = this.getComplexityAlignment(handler, problem);
    score += complexityAlignment * 0.2;

    // Recent usage bonus
    if (handler.lastUsed) {
      const daysSinceUsed =
        (Date.now() - handler.lastUsed.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceUsed < 7) {
        score += 0.1;
      }
    }

    // Confidence factor
    score += handler.confidence * 0.1;

    return Math.min(1.0, Math.max(0.1, score));
  }

  private getCapabilityMatchScore(
    handler: HandlerCapability,
    problem: ProblemClassification
  ): number {
    const relevantCapabilities = this.getRelevantCapabilities(
      problem.problemType
    );
    let matches = 0;

    for (const capability of handler.capabilities) {
      if (relevantCapabilities.includes(capability)) {
        matches++;
      }
    }

    return matches / Math.max(1, relevantCapabilities.length);
  }

  private getRelevantCapabilities(problemType: string): string[] {
    const capabilityMap: Record<string, string[]> = {
      "structural-issue": [
        "structural-refactoring",
        "complex-fixes",
        "hook-restructuring",
      ],
      "syntax-error": ["simple-fixes", "syntax-fixes", "auto-repair"],
      "simple-fix": ["simple-fixes", "pattern-matching", "quick-repairs"],
      "component-creation": ["component-creation", "code-generation"],
      "music-analysis": [
        "guitar-analysis",
        "vocal-analysis",
        "music-components",
        "audio-creation",
      ],
      "guitar-analysis": [
        "guitar-analysis",
        "chord-detection",
        "music-components",
      ],
      "route-issue": ["route-analysis", "navigation-repair"],
      "performance-issue": ["performance-analysis", "optimization"],
    };

    return capabilityMap[problemType] || ["file-analysis", "general-purpose"];
  }

  private getComplexityAlignment(
    handler: HandlerCapability,
    problem: ProblemClassification
  ): number {
    const handlerComplexity = this.getHandlerComplexity(handler);

    if (problem.complexity === "simple" && handlerComplexity === "simple")
      return 1.0;
    if (problem.complexity === "moderate" && handlerComplexity === "moderate")
      return 1.0;
    if (problem.complexity === "complex" && handlerComplexity === "complex")
      return 1.0;
    if (problem.complexity === "expert" && handlerComplexity === "complex")
      return 0.9;

    // Penalize over-engineering
    if (problem.complexity === "simple" && handlerComplexity === "complex")
      return 0.3;

    return 0.6; // Moderate mismatch
  }

  private getHandlerComplexity(
    handler: HandlerCapability
  ): "simple" | "moderate" | "complex" {
    if (
      handler.capabilities.includes("simple-fixes") ||
      handler.capabilities.includes("quick-repairs")
    ) {
      return "simple";
    }
    if (
      handler.capabilities.includes("structural-refactoring") ||
      handler.capabilities.includes("complex-fixes")
    ) {
      return "complex";
    }
    return "moderate";
  }

  private getFallbackHandlers(primaryHandler: HandlerCapability): string[] {
    const fallbacks: string[] = [];

    if (primaryHandler.handlerName !== "smartFileRebuilderHandler") {
      fallbacks.push("smartFileRebuilderHandler");
    }
    if (primaryHandler.handlerName !== "autoFixCurrentFileHandler") {
      fallbacks.push("autoFixCurrentFileHandler");
    }

    return fallbacks.slice(0, 2);
  }

  private generateHandlerReasoning(
    handler: HandlerCapability,
    problem: ProblemClassification
  ): string {
    const reasons: string[] = [];

    if (handler.successRate > 0.8) {
      reasons.push(
        `High success rate (${Math.round(handler.successRate * 100)}%)`
      );
    }

    for (const strength of handler.strengths) {
      if (this.isStrengthRelevant(strength, problem)) {
        reasons.push(`Strong in ${strength}`);
      }
    }

    if (
      problem.complexity === "complex" &&
      handler.capabilities.includes("structural-refactoring")
    ) {
      reasons.push("Handles complex structural changes");
    }

    return reasons.length > 0 ? reasons.join(", ") : "General capability match";
  }

  private isStrengthRelevant(
    strength: string,
    problem: ProblemClassification
  ): boolean {
    const strengthKeywords = strength.toLowerCase();
    const problemIndicators = problem.indicators.join(" ").toLowerCase();

    return (
      problemIndicators.includes(strengthKeywords) ||
      problem.problemType.includes(strengthKeywords.split(" ")[0])
    );
  }

  // ===== PROTECTION-SPECIFIC LEARNING (EXISTING - PRESERVED) =====

  /**
   * Learn from protection activities and adapt protection behavior
   */
  learnFromProtection(
    protectionType: string,
    result: "success" | "failure",
    context: ProtectionContext
  ): void {
    if (!this.learningEnabled) return;

    // Learn from general protection pattern
    this.learnFromAction(`protection-${protectionType}`, result, context);

    // Learn handler-specific patterns
    if (context.handlerName) {
      this.learnFromAction(
        `handler-${context.handlerName}-protection`,
        result,
        context
      );
    }

    // Learn folder-specific patterns
    if (context.targetFolders && context.targetFolders.length > 0) {
      const folderPattern = context.targetFolders.join("-");
      this.learnFromAction(
        `folder-protection-${folderPattern}`,
        result,
        context
      );
    }

    // Adapt protection behavior based on results
    if (result === "success") {
      this.adaptProtectionBehavior("increase", context);
    } else {
      this.adaptProtectionBehavior("decrease", context);
    }

    this.persistData();
  }

  /**
   * Adapt protection behavior based on success patterns
   */
  private adaptProtectionBehavior(
    direction: "increase" | "decrease",
    context: ProtectionContext
  ): void {
    // Store protection preferences
    const currentAggressiveness =
      this.userPreferences.get("protectionAggressiveness") || 3;

    if (direction === "increase" && currentAggressiveness < 5) {
      this.rememberPreference(
        "protectionAggressiveness",
        currentAggressiveness + 0.2
      );
    } else if (direction === "decrease" && currentAggressiveness > 1) {
      this.rememberPreference(
        "protectionAggressiveness",
        currentAggressiveness - 0.1
      );
    }

    // Learn backup preferences
    if (context.backupsCreated && context.backupsCreated > 0) {
      this.rememberPreference("backupPreference", "aggressive");
    }

    // Learn index management preferences
    if (context.indexFilesCreated && context.indexFilesCreated > 0) {
      this.rememberPreference("indexManagementPreference", "active");
    }
  }

  /**
   * Predict protection needs based on learned patterns
   */
  async predictProtectionNeeds(context: ProjectContext): Promise<string[]> {
    const predictions: string[] = [];

    // Check if current file type often needs protection
    if (context.currentFile) {
      const fileExt = context.currentFile.split(".").pop();
      const protectionPattern = this.getPatternSuccess(`protection-${fileExt}`);

      if (protectionPattern > 0.7) {
        predictions.push(`🛡️ High protection success for .${fileExt} files`);
      }
    }

    // Predict based on project complexity
    if (context.complexity > 5) {
      const complexProtectionPattern = this.getPatternSuccess(
        "protection-complex-files"
      );
      if (complexProtectionPattern > 0.6) {
        predictions.push("🚨 Complex files often benefit from protection");
      }
    }

    // Predict based on recent actions
    if (
      context.recentActions.includes("bulk-install") ||
      context.recentActions.includes("zip-install")
    ) {
      predictions.push("📦 Bulk operations detected - recommend protection");
    }

    // Check handler-specific patterns
    const handlerProtectionPatterns = Array.from(this.patterns.entries())
      .filter(
        ([action]) =>
          action.includes("handler-") && action.includes("-protection")
      )
      .filter(([_, data]) => data.confidence > 0.8);

    if (handlerProtectionPatterns.length > 0) {
      predictions.push("🎯 High-confidence protection patterns detected");
    }

    return predictions;
  }

  /**
   * Generate protection recommendations based on learned patterns
   */
  generateProtectionRecommendations(handlerName?: string): string[] {
    const recommendations: string[] = [];

    // Handler-specific recommendations
    if (handlerName) {
      const handlerPattern = this.patterns.get(
        `handler-${handlerName}-protection`
      );

      if (handlerPattern) {
        if (handlerPattern.confidence > 0.8) {
          recommendations.push(
            `✅ ${handlerName} has high protection success rate`
          );
        } else if (handlerPattern.failures > handlerPattern.successes) {
          recommendations.push(`⚠️ ${handlerName} protection needs attention`);
        }
      } else {
        recommendations.push(
          `🆕 First-time protection for ${handlerName} - monitoring performance`
        );
      }
    }

    // General protection recommendations
    const backupPattern = this.patterns.get("backup-success");
    if (backupPattern && backupPattern.confidence > 0.9) {
      recommendations.push(
        "💾 Backup system highly effective - continue using"
      );
    }

    const indexPattern = this.patterns.get("index-creation");
    if (indexPattern && indexPattern.confidence > 0.8) {
      recommendations.push("📄 Index file management working well");
    }

    // Adaptive recommendations based on user preferences
    const protectionAggressiveness =
      this.userPreferences.get("protectionAggressiveness") || 3;
    if (protectionAggressiveness < 2) {
      recommendations.push("🔧 Consider enabling more protection features");
    } else if (protectionAggressiveness > 4) {
      recommendations.push("⚡ Protection system running at high efficiency");
    }

    // Songsterr-specific recommendations
    const songsterrPattern = this.patterns.get(
      "protection-songsterr-protection"
    );
    if (songsterrPattern && songsterrPattern.successes > 3) {
      recommendations.push("🎸 Songsterr protection patterns well-established");
    }

    return recommendations.length > 0
      ? recommendations
      : ["🤖 Continue using protection features to improve recommendations"];
  }

  /**
   * Analyze protection effectiveness across all handlers
   */
  analyzeProtectionEffectiveness(): ProtectionAnalytics {
    const protectionPatterns = Array.from(this.patterns.entries()).filter(
      ([action]) => action.includes("protection")
    );

    if (protectionPatterns.length === 0) {
      return {
        totalProtections: 0,
        successRate: 0,
        failureRate: 0,
        mostProtectedHandler: "none",
        averageFilesProtected: 0,
        backupEffectiveness: 0,
        indexCreationRate: 0,
        recommendations: ["Start using protection features to build analytics"],
      };
    }

    const totalActions = protectionPatterns.reduce(
      (sum, [_, data]) => sum + data.successes + data.failures,
      0
    );

    const totalSuccesses = protectionPatterns.reduce(
      (sum, [_, data]) => sum + data.successes,
      0
    );

    const successRate = totalActions > 0 ? totalSuccesses / totalActions : 0;

    // Find most protected handler
    const handlerPatterns = protectionPatterns.filter(([action]) =>
      action.includes("handler-")
    );
    const mostProtectedHandler =
      handlerPatterns.length > 0
        ? handlerPatterns
            .sort(
              ([_, a], [__, b]) =>
                b.successes + b.failures - (a.successes + a.failures)
            )[0][0]
            .replace("handler-", "")
            .replace("-protection", "")
        : "none";

    // Calculate backup effectiveness
    const backupPattern = this.patterns.get("backup-success");
    const backupEffectiveness = backupPattern ? backupPattern.confidence : 0;

    // Calculate index creation rate
    const indexPattern = this.patterns.get("index-creation");
    const indexCreationRate = indexPattern ? indexPattern.confidence : 0;

    return {
      totalProtections: totalActions,
      successRate: Math.round(successRate * 100) / 100,
      failureRate: Math.round((1 - successRate) * 100) / 100,
      mostProtectedHandler,
      averageFilesProtected:
        this.userPreferences.get("averageFilesProtected") || 0,
      backupEffectiveness: Math.round(backupEffectiveness * 100) / 100,
      indexCreationRate: Math.round(indexCreationRate * 100) / 100,
      recommendations: this.generateProtectionRecommendations(),
    };
  }

  /**
   * Smart protection suggestions based on current context
   */
  async suggestProtectionStrategy(context: ProjectContext): Promise<string[]> {
    const suggestions: string[] = [];

    // Context-based suggestions
    if (
      context.currentFile?.includes("songsterr") ||
      context.currentFile?.includes("music")
    ) {
      const musicProtectionPattern = this.getPatternSuccess("protection-music");
      if (musicProtectionPattern > 0.7) {
        suggestions.push("🎵 Use proven music component protection strategy");
      }
    }

    if (context.projectSize > 50) {
      suggestions.push("📁 Large project detected - recommend bulk protection");
    }

    if (context.complexity > 7) {
      suggestions.push(
        "🔧 High complexity - enable aggressive protection mode"
      );
    }

    // Recent action-based suggestions
    if (context.recentActions.includes("zip-install")) {
      suggestions.push(
        "📦 Zip installation detected - use comprehensive protection"
      );
    }

    // Adaptive suggestions based on learned preferences
    const protectionAggressiveness =
      this.userPreferences.get("protectionAggressiveness") || 3;
    if (protectionAggressiveness > 4) {
      suggestions.push("⚡ High-confidence protection mode available");
    }

    // Handler-specific suggestions from successful patterns
    const successfulProtectionPatterns = Array.from(this.patterns.entries())
      .filter(
        ([action, data]) =>
          action.includes("protection") && data.confidence > 0.8
      )
      .sort(([_, a], [__, b]) => b.confidence - a.confidence)
      .slice(0, 3);

    successfulProtectionPatterns.forEach(([action, data]) => {
      const actionName = action
        .replace("protection-", "")
        .replace("-protection", "");
      suggestions.push(
        `✨ ${actionName} protection has ${Math.round(
          data.confidence * 100
        )}% success rate`
      );
    });

    return suggestions;
  }

  // ===== PREDICTIVE ANALYSIS (ENHANCED) =====

  async suggestNextAction(context: ProjectContext): Promise<string[]> {
    const suggestions: string[] = [];

    if (context.currentFile?.includes(".tsx")) {
      if (this.getPatternSuccess("component-optimization") > 0.7) {
        suggestions.push("🎯 Run component optimization");
      }
      suggestions.push("🧪 Generate unit tests");
      suggestions.push("⚡ Check performance optimizations");
    }

    if (context.currentFile?.includes(".ts")) {
      suggestions.push("🔍 Analyze TypeScript quality");
      suggestions.push("📊 Review complexity metrics");
    }

    // 🚀 ENHANCED: Include orchestration-based suggestions
    const successfulOrchestrations = Array.from(
      this.orchestrationPatterns.values()
    )
      .filter((pattern) => pattern.successRate > 0.8)
      .sort((a, b) => b.userSatisfaction - a.userSatisfaction)
      .slice(0, 3);

    for (const pattern of successfulOrchestrations) {
      if (this.isOrchestrationRelevant(pattern, context)) {
        suggestions.push(
          `🎯 Try proven workflow: ${pattern.handlerSequence.join(" → ")}`
        );
      }
    }

    const successfulPatterns = Array.from(this.patterns.entries())
      .filter(
        ([_, data]) => data.confidence > 0.6 && data.successes > data.failures
      )
      .sort(([_, a], [__, b]) => b.confidence - a.confidence)
      .slice(0, 3)
      .map(([action]) => this.actionToSuggestion(action));

    if (
      context.projectSize > 50 &&
      !this.hasRecentAction("analyze-routes", context)
    ) {
      suggestions.push("🗺️ Analyze route structure");
    }

    if (context.complexity > 7 && this.getPatternSuccess("auto-fix") > 0.8) {
      suggestions.push("🔧 Run auto-fix for complex files");
    }

    const roleSuggestions = this.getRoleBasedSuggestions(context.userRole);

    return [
      ...new Set([...suggestions, ...successfulPatterns, ...roleSuggestions]),
    ].slice(0, 5);
  }

  private isOrchestrationRelevant(
    pattern: OrchestrationPattern,
    context: ProjectContext
  ): boolean {
    // Check if the orchestration pattern is relevant to current context
    if (context.currentFile) {
      if (
        context.currentFile.includes("guitar") &&
        pattern.problemType === "guitar-analysis"
      ) {
        return true;
      }
      if (
        context.currentFile.includes(".tsx") &&
        pattern.problemType === "component-creation"
      ) {
        return true;
      }
      if (
        context.currentFile.includes("route") &&
        pattern.problemType === "route-issue"
      ) {
        return true;
      }
    }

    // Check complexity match
    if (context.complexity > 5 && pattern.complexity > 3) {
      return true;
    }

    return false;
  }

  // ===== ALL OTHER EXISTING METHODS (PRESERVED) =====
  // [All your existing methods like rememberPreference, adaptBehavior, analyzeCodePatternsWithLearning, etc.]

  rememberPreference(key: string, value: any): void {
    this.userPreferences.set(key, value);

    if (key === "preferredAnalysisDepth") {
      this.adaptiveBehavior.analysisDepth = value;
    }
    if (key === "autoFixPreference") {
      this.adaptiveBehavior.autoFixAggressiveness = value;
    }

    this.persistData();
  }

  adaptBehavior(feedback: UserFeedback): void {
    if (feedback.satisfaction >= 4) {
      this.learnFromAction(feedback.action, "success", feedback.context);

      if (feedback.action.includes("optimize")) {
        this.adaptiveBehavior.autoFixAggressiveness = Math.min(
          5,
          this.adaptiveBehavior.autoFixAggressiveness + 0.5
        );
      }
    } else {
      this.learnFromAction(feedback.action, "failure", feedback.context);
      this.adaptiveBehavior.suggestionFrequency = Math.max(
        1,
        this.adaptiveBehavior.suggestionFrequency - 0.5
      );
    }

    if (feedback.satisfaction >= 4) {
      if (!this.adaptiveBehavior.preferredFeatures.includes(feedback.action)) {
        this.adaptiveBehavior.preferredFeatures.push(feedback.action);
      }
    }

    this.persistData();
  }

  async analyzeCodePatternsWithLearning(
    workspaceUri: vscode.Uri
  ): Promise<any> {
    const files = await vscode.workspace.findFiles(
      "**/*.{ts,tsx,js,jsx}",
      "**/node_modules/**"
    );

    const patterns = {
      components: 0,
      hooks: 0,
      complexFiles: 0,
      testCoverage: 0,
      typeScriptUsage: 0,
      performanceIssues: 0,
      learningInsights: [] as string[],
    };

    for (const file of files) {
      try {
        const content = await vscode.workspace.fs.readFile(file);
        const text = content.toString();

        if (
          text.includes("export default function") ||
          (text.includes("const ") && text.includes("= () =>"))
        ) {
          patterns.components++;
        }

        if (text.includes("useState") || text.includes("useEffect")) {
          patterns.hooks++;
        }

        if (text.length > 1000) {
          patterns.complexFiles++;
        }

        if (file.path.includes(".test.") || file.path.includes(".spec.")) {
          patterns.testCoverage++;
        }

        if (file.path.includes(".tsx") || file.path.includes(".ts")) {
          patterns.typeScriptUsage++;
        }

        if (
          text.includes(".map(") &&
          !text.includes("useMemo") &&
          text.length > 500
        ) {
          patterns.performanceIssues++;
        }
      } catch (error) {
        // File read error
      }
    }

    if (patterns.testCoverage / patterns.components < 0.3) {
      patterns.learningInsights.push(
        "Low test coverage detected - suggest test generation"
      );
    }

    if (patterns.performanceIssues > 5) {
      patterns.learningInsights.push(
        "Multiple performance optimization opportunities"
      );
    }

    if (patterns.complexFiles / files.length > 0.4) {
      patterns.learningInsights.push("High complexity - suggest refactoring");
    }

    this.learnFromCodePatterns(patterns);
    return patterns;
  }

  async optimizeCode(code: string): Promise<string> {
    this.learnFromAction("code-optimization", "success");

    let optimized = code;

    try {
      if (
        code.includes("export const") &&
        code.includes("React.FC") &&
        !code.includes("React.memo")
      ) {
        optimized =
          "// Consider adding React.memo for performance\n" + optimized;
        this.learnFromAction("react-memo-suggestion", "success");
      }

      if (code.includes("onClick") && !code.includes("useCallback")) {
        optimized =
          "// Consider adding useCallback for event handlers\n" + optimized;
        this.learnFromAction("usecallback-suggestion", "success");
      }

      if (
        code.includes(".map(") &&
        code.includes(".filter(") &&
        !code.includes("useMemo")
      ) {
        optimized =
          "// Consider using useMemo for expensive array operations\n" +
          optimized;
        this.learnFromAction("usememo-suggestion", "success");
      }

      if (code.includes("any") && code.includes(".ts")) {
        optimized =
          '// Consider replacing "any" with specific types\n' + optimized;
        this.learnFromAction("typescript-typing-suggestion", "success");
      }

      if (code.length > 1000 && !code.includes("React.lazy")) {
        optimized =
          "// Consider code splitting for large components\n" + optimized;
        this.learnFromAction("code-splitting-suggestion", "success");
      }

      if (optimized !== code) {
        this.learnFromAction("successful-optimization", "success");
      }
    } catch (error) {
      this.learnFromAction("optimization-failure", "failure");
      console.warn("🧠 Code optimization failed:", error);
    }

    return optimized;
  }

  async predictPotentialIssues(codePatterns: any): Promise<any[]> {
    const issues: any[] = [];

    if (
      codePatterns.components > 50 &&
      this.getPatternSuccess("bundle-optimization") < 0.5
    ) {
      issues.push({
        type: "performance",
        description: "Large bundle size predicted - suggest code splitting",
        severity: "medium",
        confidence: 0.8,
        suggestedAction: "implement-code-splitting",
      });
    }

    if (codePatterns.complexFiles > 10 && codePatterns.testCoverage < 0.3) {
      issues.push({
        type: "maintenance",
        description: "High maintenance burden predicted",
        severity: "high",
        confidence: 0.9,
        suggestedAction: "increase-test-coverage",
      });
    }

    if (codePatterns.performanceIssues > 5) {
      issues.push({
        type: "performance",
        description: "Multiple performance bottlenecks detected",
        severity: "medium",
        confidence: 0.85,
        suggestedAction: "run-performance-optimization",
      });
    }

    for (const issue of issues) {
      this.learnFromAction(`predict-${issue.type}`, "success");
    }

    return issues;
  }

  // ===== HELPER METHODS =====

  private adaptBehaviorBasedOnPatterns(): void {
    const totalActions = Array.from(this.patterns.values()).reduce(
      (sum, pattern) => sum + pattern.successes + pattern.failures,
      0
    );

    if (totalActions < 10) return;

    const successRate =
      Array.from(this.patterns.values()).reduce(
        (sum, pattern) =>
          sum + pattern.successes / (pattern.successes + pattern.failures),
        0
      ) / this.patterns.size;

    if (successRate > 0.8) {
      this.adaptiveBehavior.suggestionFrequency = Math.min(
        5,
        this.adaptiveBehavior.suggestionFrequency + 0.2
      );
    } else if (successRate < 0.4) {
      this.adaptiveBehavior.suggestionFrequency = Math.max(
        1,
        this.adaptiveBehavior.suggestionFrequency - 0.2
      );
    }

    const autoFixSuccess = this.getPatternSuccess("auto-fix");
    if (autoFixSuccess > 0.9) {
      this.adaptiveBehavior.autoFixAggressiveness = Math.min(
        5,
        this.adaptiveBehavior.autoFixAggressiveness + 0.3
      );
    }
  }

  private getPatternSuccess(actionPattern: string): number {
    const matchingPatterns = Array.from(this.patterns.entries()).filter(
      ([action]) => action.includes(actionPattern)
    );

    if (matchingPatterns.length === 0) return 0.5;

    const totalSuccess = matchingPatterns.reduce(
      (sum, [_, pattern]) =>
        sum + pattern.successes / (pattern.successes + pattern.failures),
      0
    );

    return totalSuccess / matchingPatterns.length;
  }

  private hasRecentAction(action: string, context: ProjectContext): boolean {
    return context.recentActions.some(
      (recentAction) =>
        recentAction.includes(action) || action.includes(recentAction)
    );
  }

  private actionToSuggestion(action: string): string {
    const suggestionMap: { [key: string]: string } = {
      "analyze-project": "🧠 Run project analysis",
      "optimize-performance": "⚡ Optimize performance",
      "auto-fix": "🔧 Auto-fix issues",
      "generate-tests": "🧪 Generate tests",
      "analyze-routes": "🗺️ Analyze routes",
      "component-optimization": "🎯 Optimize components",
    };

    for (const [key, suggestion] of Object.entries(suggestionMap)) {
      if (action.includes(key)) return suggestion;
    }

    return `🤖 ${action
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase())}`;
  }

  private getRoleBasedSuggestions(userRole?: string): string[] {
    if (!userRole) return [];

    const roleSuggestions: { [key: string]: string[] } = {
      frontend: [
        "🎨 Review component structure",
        "⚡ Check performance metrics",
      ],
      backend: ["🔍 Analyze API patterns", "🛡️ Review security practices"],
      designer: [
        "🎨 Check design consistency",
        "📱 Review responsive patterns",
      ],
      qa: ["🧪 Increase test coverage", "🔍 Review error handling"],
      musician: ["🎵 Analyze music components", "🎸 Review guitar features"],
    };

    return roleSuggestions[userRole] || [];
  }

  private learnFromCodePatterns(patterns: any): void {
    if (patterns.testCoverage / patterns.components > 0.8) {
      this.learnFromAction("maintain-test-coverage", "success");
    }

    if (patterns.performanceIssues === 0) {
      this.learnFromAction("performance-optimization", "success");
    }

    if (patterns.typeScriptUsage / patterns.components > 0.9) {
      this.learnFromAction("typescript-adoption", "success");
    }
  }

  // ===== PERSISTENCE - ENHANCED =====

  private async loadPersistentData(): Promise<void> {
    try {
      if (this.context && this.context.globalState) {
        const savedData = this.context.globalState.get("cipherBrainData") as
          | LearningData
          | undefined;
        if (savedData) {
          this.patterns = new Map(Object.entries(savedData.patterns || {}));
          this.userPreferences = new Map(
            Object.entries(savedData.userPreferences || {})
          );
          this.projectHistory = savedData.projectHistory || [];
          this.adaptiveBehavior =
            savedData.adaptiveBehavior || this.adaptiveBehavior;

          // 🚀 NEW: Load orchestration data
          if (savedData.handlerCapabilities) {
            this.handlerCapabilities = new Map(
              Object.entries(savedData.handlerCapabilities)
            );
          }
          if (savedData.orchestrationPatterns) {
            this.orchestrationPatterns = new Map(
              Object.entries(savedData.orchestrationPatterns)
            );
          }
        }
      }
    } catch (error) {
      console.error("Failed to load brain data:", error);
    }
  }

  private async persistData(): Promise<void> {
    try {
      if (this.context && this.context.globalState) {
        const dataToSave: LearningData = {
          patterns: Object.fromEntries(this.patterns),
          userPreferences: Object.fromEntries(this.userPreferences),
          projectHistory: this.projectHistory,
          adaptiveBehavior: this.adaptiveBehavior,
          // 🚀 NEW: Save orchestration data
          handlerCapabilities: Object.fromEntries(this.handlerCapabilities),
          orchestrationPatterns: Object.fromEntries(this.orchestrationPatterns),
        };

        await this.context.globalState.update("cipherBrainData", dataToSave);
      }
    } catch (error) {
      console.error("Failed to persist brain data:", error);
    }
  }

  // ===== PUBLIC INTERFACE (ENHANCED) =====

  getInsights(): string[] {
    const insights: string[] = [];

    if (this.patterns.size > 0) {
      const mostSuccessful = Array.from(this.patterns.entries()).sort(
        ([_, a], [__, b]) => b.confidence - a.confidence
      )[0];

      insights.push(
        `Most successful action: ${mostSuccessful[0]} (${Math.round(
          mostSuccessful[1].confidence * 100
        )}% confidence)`
      );
    }

    // 🚀 NEW: Orchestration insights
    if (this.orchestrationPatterns.size > 0) {
      const bestOrchestration = Array.from(
        this.orchestrationPatterns.values()
      ).sort((a, b) => b.successRate - a.successRate)[0];

      insights.push(
        `Best workflow: ${bestOrchestration.handlerSequence.join(
          " → "
        )} (${Math.round(bestOrchestration.successRate * 100)}% success)`
      );
    }

    if (this.adaptiveBehavior.preferredFeatures.length > 0) {
      insights.push(
        `Preferred features: ${this.adaptiveBehavior.preferredFeatures.join(
          ", "
        )}`
      );
    }

    insights.push(
      `Learning enabled: ${this.learningEnabled ? "✅ Active" : "❌ Disabled"}`
    );
    insights.push(`Patterns learned: ${this.patterns.size}`);
    insights.push(`Orchestration patterns: ${this.orchestrationPatterns.size}`);

    return insights;
  }

  async generateIntelligentReport(): Promise<string> {
    const insights = this.getInsights();
    const topPatterns = Array.from(this.patterns.entries())
      .sort(([_, a], [__, b]) => b.confidence - a.confidence)
      .slice(0, 5);

    const protectionAnalytics = this.analyzeProtectionEffectiveness();

    // 🚀 NEW: Orchestration analytics
    const topOrchestrations = Array.from(this.orchestrationPatterns.values())
      .sort((a, b) => b.successRate - a.successRate)
      .slice(0, 5);

    return `# 🧠 Cipher Brain Intelligence Report (ENHANCED)

## Learning Status
${insights.map((insight) => `- ${insight}`).join("\n")}

## Top Learning Patterns
${topPatterns
  .map(
    ([action, data]) =>
      `- **${action}**: ${data.successes} successes, ${
        data.failures
      } failures (${Math.round(data.confidence * 100)}% confidence)`
  )
  .join("\n")}

## 🎯 Top Orchestration Patterns
${
  topOrchestrations
    .map(
      (pattern) =>
        `- **${pattern.problemType}**: ${pattern.handlerSequence.join(
          " → "
        )} (${Math.round(pattern.successRate * 100)}% success, ${
          pattern.filesCreated
        } files)`
    )
    .join("\n") || "- No orchestration patterns learned yet"
}

## 🛡️ Protection Analytics
- **Total Protections**: ${protectionAnalytics.totalProtections}
- **Success Rate**: ${Math.round(protectionAnalytics.successRate * 100)}%
- **Most Protected Handler**: ${protectionAnalytics.mostProtectedHandler}
- **Backup Effectiveness**: ${Math.round(
      protectionAnalytics.backupEffectiveness * 100
    )}%
- **Index Creation Rate**: ${Math.round(
      protectionAnalytics.indexCreationRate * 100
    )}%

## Adaptive Behavior
- Suggestion Frequency: ${this.adaptiveBehavior.suggestionFrequency}/5
- Auto-fix Aggressiveness: ${this.adaptiveBehavior.autoFixAggressiveness}/5
- Analysis Depth: ${this.adaptiveBehavior.analysisDepth}/5
- Protection Aggressiveness: ${
      Math.round(
        (this.userPreferences.get("protectionAggressiveness") || 3) * 100
      ) / 100
    }/5

## 🎯 Handler Performance
${
  Array.from(this.handlerCapabilities.values())
    .sort((a, b) => b.successRate - a.successRate)
    .slice(0, 5)
    .map(
      (handler) =>
        `- **${handler.handlerName}**: ${Math.round(
          handler.successRate * 100
        )}% success, ${handler.category} category`
    )
    .join("\n") || "- No handler performance data yet"
}

## Recommendations
${await this.generateRecommendations()}

## 🛡️ Protection Recommendations
${protectionAnalytics.recommendations.map((r) => `- ${r}`).join("\n")}

---
*Generated by Cipher Brain Intelligence System (Enhanced with Orchestration)*`;
  }

  private async generateRecommendations(): Promise<string> {
    const recommendations: string[] = [];

    if (this.getPatternSuccess("test-generation") < 0.5) {
      recommendations.push(
        "Consider running more test generation to improve coverage"
      );
    }

    if (this.adaptiveBehavior.autoFixAggressiveness < 2) {
      recommendations.push(
        "Try enabling more auto-fix features to boost productivity"
      );
    }

    if (this.patterns.size < 10) {
      recommendations.push(
        "Continue using Cipher features to improve learning"
      );
    }

    // 🚀 NEW: Orchestration recommendations
    if (this.orchestrationPatterns.size === 0) {
      recommendations.push(
        "🎯 Try complex workflows to develop orchestration patterns"
      );
    } else {
      const bestPattern = Array.from(this.orchestrationPatterns.values()).sort(
        (a, b) => b.successRate - a.successRate
      )[0];

      if (bestPattern.successRate > 0.9) {
        recommendations.push(
          `🎯 Excellent workflow discovered: ${bestPattern.handlerSequence.join(
            " → "
          )} - consider reusing`
        );
      }
    }

    const protectionAnalytics = this.analyzeProtectionEffectiveness();
    if (
      protectionAnalytics.successRate < 0.8 &&
      protectionAnalytics.totalProtections > 5
    ) {
      recommendations.push(
        "🛡️ Protection success rate could be improved - review protection strategies"
      );
    }

    if (protectionAnalytics.backupEffectiveness > 0.9) {
      recommendations.push("💾 Backup system is highly effective - great job!");
    }

    if (protectionAnalytics.totalProtections === 0) {
      recommendations.push(
        "🆕 Try using file protection features for safer development"
      );
    }

    return recommendations.length > 0
      ? recommendations.map((r) => `- ${r}`).join("\n")
      : "- Your development patterns look optimal!";
  }

  toggleLearning(): boolean {
    this.learningEnabled = !this.learningEnabled;
    this.persistData();
    return this.learningEnabled;
  }

  reset(): void {
    this.patterns.clear();
    this.userPreferences.clear();
    this.projectHistory = [];
    this.handlerCapabilities.clear();
    this.orchestrationPatterns.clear();
    this.adaptiveBehavior = {
      suggestionFrequency: 3,
      autoFixAggressiveness: 2,
      analysisDepth: 3,
      preferredFeatures: [],
    };
    this.initializeHandlerCapabilities(); // Reinitialize handler capabilities
    this.persistData();
  }
}
