/**
 * 🔐 CipherBrainInterface - CORRECTED v3.1 - Pure Learning & Orchestration Engine
 * ===============================================================================
 * ✅ NO HANDLER IMPORTS - Only recommends, doesn't execute
 * ✅ Pure learning and pattern recognition system
 * ✅ Handler orchestration through recommendations
 * ✅ Learns from handler results without directly calling them
 */

import * as vscode from "vscode";
import { BrainConnector } from "./BrainConnector";
import { MusicDevIntelligence } from "./MusicDevIntelligence";

// ===== ORIGINAL TYPE DEFINITIONS (PRESERVED) =====
interface CacheEntry {
  type: string;
  data: any;
  timestamp: Date;
  source: string;
}

interface LearningContext {
  recentAnalyses: CacheEntry[];
  cacheSize: number;
  patterns: PatternData;
}

interface PatternData {
  commonComponents: string[];
  frequentIssues: [string, number][];
  suggestedImprovements: string[];
}

interface GuitarAnalysis {
  components?: string[];
  issues?: string[];
  suggestions?: string[];
  brainSuggestions?: any;
  workspaceContext?: any;
  learningInsights?: LearningContext;
}

interface VocalAnalysis {
  components?: string[];
  issues?: string[];
  suggestions?: string[];
  brainSuggestions?: any;
  workspaceContext?: any;
  learningInsights?: LearningContext;
}

interface FileEvent {
  event: string;
  path: string;
  isMusicRelated: boolean;
  timestamp: Date;
}

interface RealLearningPattern {
  patternType:
    | "code-structure"
    | "error-fix"
    | "optimization"
    | "component-pattern";
  beforeCode: string;
  afterCode: string;
  reasoning: string;
  confidence: number;
  applicableScenarios: string[];
  learnedFrom: string;
  timestamp: Date;
}

interface LearningSession {
  sessionId: string;
  handlerName: string;
  patterns: RealLearningPattern[];
  insights: string[];
  improvements: string[];
  duration: number;
  success: boolean;
}

interface CipherLearningState {
  isLearningEnabled: boolean;
  learningMode: "adaptive" | "static" | "training";
  statisticalBrainActive: boolean;
  musicBrainActive: boolean;
  trainingBrainActive: boolean;
  totalPatternsLearned: number;
  lastLearningAction: Date | null;
}

// ===== ORCHESTRATION INTERFACES (FIXED - NO EXECUTION) =====
interface HandlerCapability {
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

interface ProblemClassification {
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

interface HandlerRecommendation {
  handlerName: string;
  confidence: number;
  reasoning: string;
  estimatedSuccessRate: number;
  fallbackHandlers: string[];
  executionOrder: number;
}

interface OrchestrationResult {
  primaryHandler: string;
  backupHandlers: string[];
  reasoning: string;
  confidence: number;
  classification: ProblemClassification;
  recommendations: HandlerRecommendation[];
}

interface IntegrationStatus {
  brain: any;
  musicIntelligence: any;
  cache: {
    size: number;
    lastUpdate: Date | null;
  };
  integration: {
    initialized: boolean;
    version: string;
    brainConnected?: boolean;
    musicIntelligenceActive?: boolean;
    learningActive?: boolean;
    orchestrationActive?: boolean;
  };
  capabilities?: {
    guitarAnalysis: boolean;
    vocalAnalysis: boolean;
    patternRecognition: boolean;
    personalizedSuggestions: boolean;
    crossSystemLearning: boolean;
    musicTheoryIntegration: boolean;
    realPatternLearning?: boolean;
    patternMatching?: boolean;
    adaptiveLearning?: boolean;
    handlerOrchestration?: boolean;
    intelligentRouting?: boolean;
    problemClassification?: boolean;
  };
  learning?: CipherLearningState;
  realPatterns?: {
    total: number;
    byType: Record<string, number>;
  };
  orchestration?: {
    handlersRegistered: number;
    routingDecisions: number;
    successfulRoutes: number;
    lastRouting: Date | null;
  };
}

export class CipherBrainInterface {
  private static instance: CipherBrainInterface;
  private brainConnector: BrainConnector;
  private musicIntelligence: MusicDevIntelligence;
  private learningCache: Map<string, CacheEntry> = new Map();

  // ✅ ORIGINAL: Real learning components
  private realLearningPatterns: Map<string, RealLearningPattern> = new Map();
  private learningSessions: LearningSession[] = [];
  private learningState: CipherLearningState;

  // 🚀 FIXED: Handler orchestration components (RECOMMENDATION ONLY)
  private handlerCapabilities: Map<string, HandlerCapability> = new Map();
  private routingDecisions: Map<string, OrchestrationResult> = new Map();
  private orchestrationEnabled: boolean = true;

  private constructor() {
    this.brainConnector = BrainConnector.getInstance();
    this.musicIntelligence = new MusicDevIntelligence(this.brainConnector);

    // ✅ Initialize enhanced learning state
    this.learningState = {
      isLearningEnabled: true,
      learningMode: "adaptive",
      statisticalBrainActive: true,
      musicBrainActive: true,
      trainingBrainActive: false,
      totalPatternsLearned: 0,
      lastLearningAction: null,
    };

    // 🚀 Initialize handler orchestration
    this.initializeHandlerCapabilities();

    // 🎯 ORCHESTRATION ENABLED - Handler patterns discovered!
    this.orchestrationEnabled = true;

    console.log(
      "🔐 CipherBrainInterface v3.1 initialized - Pure Learning & Orchestration"
    );
  }

  static getInstance(): CipherBrainInterface {
    if (!CipherBrainInterface.instance) {
      CipherBrainInterface.instance = new CipherBrainInterface();
    }
    return CipherBrainInterface.instance;
  }

  // =============================================================================
  // 🚀 FIXED: HANDLER ORCHESTRATION SYSTEM (RECOMMENDATION ONLY)
  // =============================================================================

  /**
   * 🎯 Initialize Handler Capabilities Database
   */
  private initializeHandlerCapabilities(): void {
    // CORE HANDLERS
    this.registerHandler("analyzeCurrentFileHandler", {
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

    this.registerHandler("smartFileRebuilderHandler", {
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

    this.registerHandler("autoFixCurrentFileHandler", {
      category: "core",
      capabilities: ["auto-repair", "syntax-fixes", "import-fixes"],
      strengths: ["automated fixes", "common errors", "fast turnaround"],
      limitations: ["limited fix types", "cannot handle complex issues"],
      successRate: 0.8,
      averageExecutionTime: 1500,
    });

    this.registerHandler("quickFileFixHandler", {
      category: "core",
      capabilities: ["quick-fixes", "simple-repairs", "minor-issues"],
      strengths: ["fast execution", "simple problems", "immediate fixes"],
      limitations: ["simple fixes only", "cannot handle complex issues"],
      successRate: 0.75,
      averageExecutionTime: 1000,
    });

    // INTELLIGENCE HANDLERS
    this.registerHandler("brainFixer", {
      category: "intelligence",
      capabilities: [
        "simple-fixes",
        "pattern-matching",
        "training",
        "quick-repairs",
      ],
      strengths: [
        "missing imports",
        "syntax errors",
        "fast execution",
        "learning",
      ],
      limitations: ["simple fixes only", "cannot restructure"],
      successRate: 0.75,
      averageExecutionTime: 1000,
    });

    this.registerHandler("trainBrainRunner", {
      category: "intelligence",
      capabilities: ["brain-training", "pattern-learning", "fix-practice"],
      strengths: ["learning enhancement", "pattern recognition", "training"],
      limitations: ["training only", "not for production fixes"],
      successRate: 0.8,
      averageExecutionTime: 3000,
    });

    // MUSIC HANDLERS
    this.registerHandler("analyzeGuitarComponentsHandler", {
      category: "music",
      capabilities: ["guitar-analysis", "chord-detection", "music-components"],
      strengths: ["guitar expertise", "music theory", "component analysis"],
      limitations: ["music files only", "specialized domain"],
      successRate: 0.9,
      averageExecutionTime: 3000,
    });

    this.registerHandler("generateGuitarComponentHandler", {
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

    this.registerHandler("analyzeVocalComponentsHandler", {
      category: "music",
      capabilities: ["vocal-analysis", "voice-processing", "music-components"],
      strengths: [
        "vocal technique analysis",
        "voice coaching",
        "audio processing",
      ],
      limitations: ["vocal domain only", "requires audio context"],
      successRate: 0.88,
      averageExecutionTime: 3500,
    });

    this.registerHandler("createSongwritersStudioHandler", {
      category: "music",
      capabilities: ["audio-creation", "songwriting", "studio-setup"],
      strengths: [
        "audio studio creation",
        "songwriting tools",
        "music production",
      ],
      limitations: ["audio domain only", "complex setup"],
      successRate: 0.83,
      averageExecutionTime: 5000,
    });

    // ROUTE HANDLERS
    this.registerHandler("analyzeRoutesHandler", {
      category: "routes",
      capabilities: [
        "route-analysis",
        "dependency-mapping",
        "navigation-structure",
      ],
      strengths: [
        "route visualization",
        "dependency detection",
        "structure analysis",
      ],
      limitations: ["routes only", "cannot fix issues"],
      successRate: 0.88,
      averageExecutionTime: 3500,
    });

    this.registerHandler("showRouteTreeHandler", {
      category: "routes",
      capabilities: [
        "route-visualization",
        "tree-display",
        "navigation-structure",
      ],
      strengths: [
        "visual route trees",
        "clear navigation",
        "ASCII art display",
      ],
      limitations: ["visualization only", "read-only"],
      successRate: 0.95,
      averageExecutionTime: 2000,
    });

    this.registerHandler("auditRouteHealthHandler", {
      category: "routes",
      capabilities: ["route-health", "error-detection", "performance-analysis"],
      strengths: [
        "health monitoring",
        "error detection",
        "performance metrics",
      ],
      limitations: ["audit only", "cannot auto-fix"],
      successRate: 0.92,
      averageExecutionTime: 4000,
    });

    this.registerHandler("autoFixRoutesHandler", {
      category: "routes",
      capabilities: [
        "route-fixes",
        "navigation-repair",
        "routing-optimization",
      ],
      strengths: [
        "route repairs",
        "automated fixes",
        "performance improvements",
      ],
      limitations: ["routes only", "moderate complexity"],
      successRate: 0.82,
      averageExecutionTime: 4000,
    });

    this.registerHandler("createVisualRouteMapHandler", {
      category: "routes",
      capabilities: [
        "route-mapping",
        "visual-representation",
        "navigation-overview",
      ],
      strengths: [
        "visual route maps",
        "comprehensive overview",
        "interactive display",
      ],
      limitations: ["visualization only", "read-only"],
      successRate: 0.9,
      averageExecutionTime: 3000,
    });

    // UTILITIES HANDLERS
    this.registerHandler("optimizePerformanceHandler", {
      category: "utilities",
      capabilities: [
        "performance-analysis",
        "optimization",
        "code-improvement",
      ],
      strengths: [
        "performance gains",
        "bundle optimization",
        "memory improvements",
      ],
      limitations: ["optimization focus only", "may require manual review"],
      successRate: 0.85,
      averageExecutionTime: 6000,
    });

    this.registerHandler("generateTestsHandler", {
      category: "import-export",
      capabilities: [
        "test-generation",
        "coverage-improvement",
        "quality-assurance",
      ],
      strengths: [
        "comprehensive tests",
        "coverage analysis",
        "automated generation",
      ],
      limitations: ["test generation only", "may need refinement"],
      successRate: 0.87,
      averageExecutionTime: 4500,
    });

    // DEPLOYMENT HANDLERS
    this.registerHandler("deployToVercelHandler", {
      category: "deployment",
      capabilities: ["vercel-deployment", "automated-deployment", "ci-cd"],
      strengths: ["vercel integration", "automated process", "fast deployment"],
      limitations: ["vercel only", "requires setup"],
      successRate: 0.9,
      averageExecutionTime: 15000,
    });

    console.log(
      `🎯 Initialized ${this.handlerCapabilities.size} handler capabilities`
    );
  }

  /**
   * 📝 Register Handler Capabilities
   */
  private registerHandler(
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

  /**
   * 🧠 Analyze Problem and Classify
   */
  async classifyProblem(
    code: string,
    filePath: string,
    context: any = {}
  ): Promise<ProblemClassification> {
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

      // MISSING BRACKETS/SYNTAX
      else if (this.hasMissingBrackets(code)) {
        problemType = "syntax-error";
        complexity = "simple";
        confidence = 0.8;
        indicators.push("Missing brackets or syntax");
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

      // COMPLEX REFACTORING
      else if (code.length > 1000 && this.hasComplexStructure(code)) {
        problemType = "complex-refactor";
        complexity = "expert";
        confidence = 0.7;
        indicators.push("Large file requiring refactoring");
      }

      // SIMPLE FIXES
      else if (this.hasSimpleIssues(code)) {
        problemType = "simple-fix";
        complexity = "simple";
        confidence = 0.8;
        indicators.push("Simple fixes detected");
      }

      // Learn from classification
      await this.learnFromHandlerAction(
        "problem-classifier",
        "classification",
        "success",
        {
          problemType,
          complexity,
          confidence,
          filePath,
        }
      );
    } catch (error) {
      console.warn("Problem classification failed:", error);
      await this.learnFromHandlerAction(
        "problem-classifier",
        "classification",
        "failure",
        { error }
      );
    }

    return {
      problemType,
      complexity,
      confidence,
      indicators,
      context: { filePath, codeLength: code.length, ...context },
    };
  }

  /**
   * 🎯 Get Optimal Handler Recommendation
   */
  async getOptimalHandler(
    problem: ProblemClassification
  ): Promise<OrchestrationResult> {
    const recommendations: HandlerRecommendation[] = [];
    let primaryHandler = "";
    let reasoning = "";

    try {
      // Get matching handlers based on problem type
      const matchingHandlers = this.findMatchingHandlers(problem);

      // Score and rank handlers
      for (const handler of matchingHandlers) {
        const score = this.calculateHandlerScore(handler, problem);

        recommendations.push({
          handlerName: handler.handlerName,
          confidence: score,
          reasoning: this.generateHandlerReasoning(handler, problem),
          estimatedSuccessRate: handler.successRate * score,
          fallbackHandlers: this.getFallbackHandlers(handler, problem),
          executionOrder: recommendations.length + 1,
        });
      }

      // Sort by confidence
      recommendations.sort((a, b) => b.confidence - a.confidence);

      // Select primary handler
      if (recommendations.length > 0) {
        primaryHandler = recommendations[0].handlerName;
        reasoning = recommendations[0].reasoning;
      }

      // Generate orchestration result
      const result: OrchestrationResult = {
        primaryHandler: primaryHandler || "smartFileRebuilderHandler", // fallback
        backupHandlers: recommendations.slice(1, 4).map((r) => r.handlerName),
        reasoning: reasoning || "Default intelligent routing",
        confidence: recommendations[0]?.confidence || 0.7,
        classification: problem,
        recommendations,
      };

      // Cache the decision
      const decisionKey = `${problem.problemType}-${Date.now()}`;
      this.routingDecisions.set(decisionKey, result);

      // Learn from routing decision
      await this.learnFromHandlerAction("orchestrator", "routing", "success", {
        problemType: problem.problemType,
        primaryHandler,
        confidence: result.confidence,
      });

      console.log(
        `🎯 Orchestration: ${
          problem.problemType
        } → ${primaryHandler} (${Math.round(
          result.confidence * 100
        )}% confidence)`
      );

      return result;
    } catch (error) {
      console.error("🚨 Orchestration failed:", error);

      // Learn from orchestration failures
      await this.learnFromHandlerAction(
        "orchestrator",
        "orchestration",
        "failure",
        {
          error: error instanceof Error ? error.message : String(error),
        }
      );

      // Return safe fallback
      return {
        primaryHandler: "smartFileRebuilderHandler",
        backupHandlers: ["autoFixCurrentFileHandler", "brainFixer"],
        reasoning: "Orchestration error - using intelligent fallback",
        confidence: 0.5,
        classification: problem,
        recommendations: [],
      };
    }
  }

  // ===== PROBLEM DETECTION HELPERS =====
  private hasMissingBrackets(code: string): boolean {
    const openBrackets = (code.match(/\{/g) || []).length;
    const closeBrackets = (code.match(/\}/g) || []).length;
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;

    return openBrackets !== closeBrackets || openParens !== closeParens;
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

  private hasComplexStructure(code: string): boolean {
    const complexityIndicators = [
      (code.match(/function/g) || []).length > 5,
      (code.match(/interface/g) || []).length > 3,
      (code.match(/import/g) || []).length > 10,
      code.includes("class ") && (code.match(/method/g) || []).length > 5,
    ];

    return complexityIndicators.filter(Boolean).length >= 2;
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

  // ===== HANDLER MATCHING AND SCORING =====
  private findMatchingHandlers(
    problem: ProblemClassification
  ): HandlerCapability[] {
    const matching: HandlerCapability[] = [];

    for (const handler of this.handlerCapabilities.values()) {
      let isMatch = false;

      // Check capabilities match
      switch (problem.problemType) {
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
          isMatch =
            handler.category === "music" ||
            handler.capabilities.includes("guitar-analysis") ||
            handler.capabilities.includes("vocal-analysis") ||
            handler.capabilities.includes("music-components");
          break;

        case "guitar-analysis":
          isMatch =
            handler.capabilities.includes("guitar-analysis") ||
            handler.capabilities.includes("chord-detection");
          break;

        case "vocal-analysis":
          isMatch =
            handler.capabilities.includes("vocal-analysis") ||
            handler.capabilities.includes("voice-processing");
          break;

        case "audio-creation":
          isMatch =
            handler.capabilities.includes("audio-creation") ||
            handler.capabilities.includes("songwriting");
          break;

        case "route-issue":
          isMatch =
            handler.category === "routes" ||
            handler.capabilities.includes("route-analysis");
          break;

        case "route-health":
          isMatch =
            handler.capabilities.includes("route-health") ||
            handler.capabilities.includes("error-detection");
          break;

        case "route-visualization":
          isMatch =
            handler.capabilities.includes("route-visualization") ||
            handler.capabilities.includes("tree-display");
          break;

        case "performance-issue":
          isMatch =
            handler.capabilities.includes("performance-analysis") ||
            handler.capabilities.includes("optimization");
          break;

        case "test-generation":
          isMatch = handler.capabilities.includes("test-generation");
          break;

        default:
          // For unknown or complex problems, include general-purpose handlers
          isMatch =
            handler.capabilities.includes("structural-refactoring") ||
            handler.capabilities.includes("file-analysis");
      }

      if (isMatch) {
        matching.push(handler);
      }
    }

    // If no specific matches, add default capable handlers
    if (matching.length === 0) {
      const fallbackHandlers = [
        "smartFileRebuilderHandler",
        "autoFixCurrentFileHandler",
        "brainFixer",
      ];
      for (const handlerName of fallbackHandlers) {
        const handler = this.handlerCapabilities.get(handlerName);
        if (handler) {
          matching.push(handler);
        }
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

    // Recent usage (recency bias)
    if (handler.lastUsed) {
      const daysSinceUsed =
        (Date.now() - handler.lastUsed.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceUsed < 7) {
        score += 0.1; // Recent usage bonus
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
      "vocal-analysis": [
        "vocal-analysis",
        "voice-processing",
        "music-components",
      ],
      "audio-creation": ["audio-creation", "songwriting", "studio-setup"],
      "route-issue": ["route-analysis", "navigation-repair"],
      "route-health": [
        "route-health",
        "error-detection",
        "performance-analysis",
      ],
      "route-visualization": [
        "route-visualization",
        "tree-display",
        "navigation-structure",
      ],
      "performance-issue": ["performance-analysis", "optimization"],
      "test-generation": ["test-generation", "coverage-improvement"],
    };

    return capabilityMap[problemType] || ["file-analysis", "general-purpose"];
  }

  private getComplexityAlignment(
    handler: HandlerCapability,
    problem: ProblemClassification
  ): number {
    // Simple handlers for simple problems, complex handlers for complex problems
    const handlerComplexity = this.getHandlerComplexity(handler);

    if (problem.complexity === "simple" && handlerComplexity === "simple")
      return 1.0;
    if (problem.complexity === "moderate" && handlerComplexity === "moderate")
      return 1.0;
    if (problem.complexity === "complex" && handlerComplexity === "complex")
      return 1.0;
    if (problem.complexity === "expert" && handlerComplexity === "complex")
      return 0.9;

    // Penalize over-engineering (complex handler for simple problem)
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

  private getFallbackHandlers(
    primaryHandler: HandlerCapability,
    problem: ProblemClassification
  ): string[] {
    const fallbacks: string[] = [];

    // General fallback strategy
    if (primaryHandler.handlerName !== "smartFileRebuilderHandler") {
      fallbacks.push("smartFileRebuilderHandler");
    }
    if (primaryHandler.handlerName !== "autoFixCurrentFileHandler") {
      fallbacks.push("autoFixCurrentFileHandler");
    }
    if (primaryHandler.handlerName !== "brainFixer") {
      fallbacks.push("brainFixer");
    }

    return fallbacks.slice(0, 2); // Limit to 2 fallbacks
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

    if (
      problem.complexity === "simple" &&
      handler.capabilities.includes("simple-fixes")
    ) {
      reasons.push("Optimized for quick fixes");
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

  private updateHandlerUsage(handlerName: string): void {
    const handler = this.handlerCapabilities.get(handlerName);
    if (handler) {
      handler.lastUsed = new Date();
      // Slight confidence boost for usage
      handler.confidence = Math.min(1.0, handler.confidence + 0.01);
      this.handlerCapabilities.set(handlerName, handler);
    }
  }

  // =============================================================================
  // 🎯 PUBLIC RECOMMENDATION API METHODS (FIXED - NO EXECUTION)
  // =============================================================================

  /**
   * 🧠 Main Orchestration Method - The Brain's Decision Engine
   */
  async orchestrateHandler(
    code: string,
    filePath: string,
    action: string = "auto",
    context: any = {}
  ): Promise<OrchestrationResult> {
    if (!this.orchestrationEnabled) {
      // Fallback to traditional routing
      return {
        primaryHandler: "smartFileRebuilderHandler",
        backupHandlers: ["autoFixCurrentFileHandler"],
        reasoning: "Orchestration disabled - using fallback",
        confidence: 0.6,
        classification: {
          problemType: "unknown",
          complexity: "moderate",
          confidence: 0.6,
          indicators: ["Orchestration disabled"],
          context,
        },
        recommendations: [],
      };
    }

    try {
      console.log("🧠 Starting intelligent handler orchestration...");

      // Step 1: Classify the problem
      const classification = await this.classifyProblem(code, filePath, {
        action,
        ...context,
      });

      // Step 2: Get optimal handler recommendation
      const orchestration = await this.getOptimalHandler(classification);

      // Step 3: Update handler usage statistics
      this.updateHandlerUsage(orchestration.primaryHandler);

      console.log(
        `🎯 Orchestration Complete: ${classification.problemType} → ${orchestration.primaryHandler}`
      );

      return orchestration;
    } catch (error) {
      console.error("🚨 Orchestration failed:", error);

      // Learn from orchestration failures
      await this.learnFromHandlerAction(
        "orchestrator",
        "orchestration",
        "failure",
        {
          error: error instanceof Error ? error.message : String(error),
          filePath,
          action,
        }
      );

      // Return safe fallback
      return {
        primaryHandler: "smartFileRebuilderHandler",
        backupHandlers: ["autoFixCurrentFileHandler", "brainFixer"],
        reasoning: "Orchestration error - using intelligent fallback",
        confidence: 0.5,
        classification: {
          problemType: "unknown",
          complexity: "moderate",
          confidence: 0.5,
          indicators: ["Orchestration error"],
          context,
        },
        recommendations: [],
      };
    }
  }

  /**
   * 🎯 Get Handler Recommendation for Specific Problem
   */
  async getHandlerRecommendation(
    problemDescription: string,
    context: any = {}
  ): Promise<string[]> {
    try {
      // Create mock classification based on description
      const classification: ProblemClassification = {
        problemType: this.inferProblemType(problemDescription),
        complexity: this.inferComplexity(problemDescription),
        confidence: 0.7,
        indicators: [problemDescription],
        context,
      };

      const orchestration = await this.getOptimalHandler(classification);

      return [
        orchestration.primaryHandler,
        ...orchestration.backupHandlers,
      ].slice(0, 3);
    } catch (error) {
      console.error("Handler recommendation failed:", error);
      return [
        "smartFileRebuilderHandler",
        "autoFixCurrentFileHandler",
        "brainFixer",
      ];
    }
  }

  private inferProblemType(
    description: string
  ): ProblemClassification["problemType"] {
    const desc = description.toLowerCase();

    if (desc.includes("hook") && desc.includes("conditional"))
      return "structural-issue";
    if (desc.includes("missing") && desc.includes("import"))
      return "syntax-error";
    if (desc.includes("create") && desc.includes("component"))
      return "component-creation";

    // Music-specific inference
    if (desc.includes("guitar")) return "guitar-analysis";
    if (desc.includes("vocal") || desc.includes("voice"))
      return "vocal-analysis";
    if (desc.includes("audio") || desc.includes("studio"))
      return "audio-creation";
    if (desc.includes("music") || desc.includes("song"))
      return "music-analysis";

    // Route-specific inference
    if (desc.includes("health") && desc.includes("route"))
      return "route-health";
    if (desc.includes("tree") && desc.includes("route"))
      return "route-visualization";
    if (desc.includes("route") || desc.includes("navigation"))
      return "route-issue";

    if (desc.includes("performance") || desc.includes("optimize"))
      return "performance-issue";
    if (desc.includes("test")) return "test-generation";
    if (desc.includes("complex") || desc.includes("refactor"))
      return "complex-refactor";
    if (desc.includes("simple") || desc.includes("quick")) return "simple-fix";

    return "unknown";
  }

  private inferComplexity(
    description: string
  ): ProblemClassification["complexity"] {
    const desc = description.toLowerCase();

    if (
      desc.includes("complex") ||
      desc.includes("structural") ||
      desc.includes("refactor")
    )
      return "complex";
    if (desc.includes("expert") || desc.includes("advanced")) return "expert";
    if (
      desc.includes("simple") ||
      desc.includes("quick") ||
      desc.includes("minor")
    )
      return "simple";

    return "moderate";
  }

  /**
   * 📊 Get Smart Recommendation - Public API
   */
  async getSmartRecommendation(
    filePath?: string
  ): Promise<OrchestrationResult> {
    const editor = vscode.window.activeTextEditor;
    if (!editor && !filePath) {
      throw new Error("No active file to analyze");
    }

    const code = editor ? editor.document.getText() : "";
    const targetPath = filePath || editor!.document.fileName;

    return await this.orchestrateHandler(code, targetPath, "recommendation");
  }

  /**
   * 🔄 Toggle Orchestration System
   */
  toggleOrchestration(): boolean {
    this.orchestrationEnabled = !this.orchestrationEnabled;
    console.log(
      `🎯 Handler Orchestration ${
        this.orchestrationEnabled ? "ENABLED" : "DISABLED"
      }`
    );
    return this.orchestrationEnabled;
  }

  /**
   * 📊 Get Orchestration Statistics
   */
  getOrchestrationStats(): any {
    const totalDecisions = this.routingDecisions.size;
    const handlerUsage = new Map<string, number>();

    for (const decision of this.routingDecisions.values()) {
      const handler = decision.primaryHandler;
      handlerUsage.set(handler, (handlerUsage.get(handler) || 0) + 1);
    }

    const mostUsedHandler = Array.from(handlerUsage.entries()).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      orchestrationEnabled: this.orchestrationEnabled,
      totalRoutingDecisions: totalDecisions,
      handlersRegistered: this.handlerCapabilities.size,
      mostUsedHandler: mostUsedHandler
        ? {
            name: mostUsedHandler[0],
            usageCount: mostUsedHandler[1],
          }
        : null,
      handlerUsageBreakdown: Object.fromEntries(handlerUsage),
      averageConfidence:
        totalDecisions > 0
          ? Array.from(this.routingDecisions.values()).reduce(
              (sum, d) => sum + d.confidence,
              0
            ) / totalDecisions
          : 0,
    };
  }

  // =============================================================================
  // ✅ ORIGINAL LEARNING METHODS (PRESERVED COMPLETELY)
  // =============================================================================

  /**
   * 🚀 Initialize Cipher-Brain Integration
   */
  async initialize(): Promise<void> {
    console.log(
      "🚀 Initializing enhanced Cipher-Brain integration with orchestration..."
    );

    try {
      // Initialize Brain connection
      const brainConnected = await this.brainConnector.initialize();

      // Initialize music intelligence
      await this.musicIntelligence.initialize();

      // Start file watching for learning
      this.startFileWatching();

      // Load persistent learning data
      await this.loadLearningData();

      // Load orchestration data
      await this.loadOrchestrationData();

      console.log(
        `✅ Enhanced Cipher-Brain integration ready (Brain: ${
          brainConnected ? "Connected" : "Simulation"
        }, Orchestration: ${this.orchestrationEnabled ? "Active" : "Disabled"})`
      );
    } catch (error) {
      console.error("❌ Cipher-Brain initialization failed:", error);
      throw error;
    }
  }

  /**
   * 🔄 Toggle Learning - REAL IMPLEMENTATION WITH SYNC
   */
  toggleLearning(): boolean {
    this.learningState.isLearningEnabled =
      !this.learningState.isLearningEnabled;

    // Update learning mode based on state
    if (this.learningState.isLearningEnabled) {
      this.learningState.learningMode = "adaptive";
      this.startActiveLearning();
    } else {
      this.learningState.learningMode = "static";
      this.pauseLearning();
    }

    // ✅ SYNC WITH STATISTICAL BRAIN
    try {
      const cipherBrain = (this.brainConnector as any).getCipherBrain?.();
      if (cipherBrain) {
        cipherBrain.toggleLearning();
        console.log("🔗 Synced learning state with statistical brain");
      }
    } catch (error) {
      console.warn("Failed to sync with CipherBrain:", error);
    }

    // Persist learning state
    this.persistLearningData();

    const status = this.learningState.isLearningEnabled
      ? "ENABLED"
      : "DISABLED";
    console.log(
      `🔄 Adaptive Learning ${status}! Mode: ${this.learningState.learningMode}`
    );

    return this.learningState.isLearningEnabled;
  }

  /**
   * 📊 Get Learning Status - ENHANCED
   */
  getLearningStatus(): CipherLearningState {
    return { ...this.learningState };
  }

  /**
   * 🎯 Learn From Handler Action - REAL LEARNING ENGINE (ENHANCED)
   */
  async learnFromHandlerAction(
    handlerName: string,
    actionType: string,
    result: "success" | "failure",
    context: any
  ): Promise<void> {
    if (!this.learningState.isLearningEnabled) {
      console.log("📴 Learning disabled - skipping handler action");
      return;
    }

    this.learningState.lastLearningAction = new Date();

    try {
      // 🧠 Statistical Learning (existing)
      await this.brainConnector.learnFromAction?.(actionType, result, context);

      // 🎯 Real Pattern Learning (NEW)
      if (result === "success" && context) {
        await this.extractRealLearningPattern(handlerName, actionType, context);
      }

      // 🎵 Music-specific Learning
      if (this.isMusicRelatedAction(actionType)) {
        await this.musicIntelligence.learnFromAnalysis(context);
      }

      // 🚀 NEW: Learn from orchestration decisions
      if (actionType === "orchestration" && result === "success") {
        await this.learnFromOrchestrationSuccess(handlerName, context);
      }

      this.learningState.totalPatternsLearned++;
      console.log(`🧠 Learned from ${handlerName}.${actionType} (${result})`);

      // Update learning session
      await this.updateLearningSession(
        handlerName,
        actionType,
        result,
        context
      );
    } catch (error) {
      console.error("Learning from handler action failed:", error);
    }
  }

  /**
   * 🎯 Learn from Successful Orchestration
   */
  private async learnFromOrchestrationSuccess(
    handlerName: string,
    context: any
  ): Promise<void> {
    if (context.problemType && context.primaryHandler) {
      // Reinforce successful routing patterns
      const pattern: RealLearningPattern = {
        patternType: "component-pattern",
        beforeCode: `Problem: ${context.problemType}`,
        afterCode: `Handler: ${context.primaryHandler}`,
        reasoning: `Successful routing: ${context.problemType} → ${context.primaryHandler}`,
        confidence: context.confidence || 0.8,
        applicableScenarios: [context.problemType, "orchestration", "routing"],
        learnedFrom: "orchestration-engine",
        timestamp: new Date(),
      };

      const patternId = `orchestration-${context.problemType}-${Date.now()}`;
      this.realLearningPatterns.set(patternId, pattern);
    }
  }

  /**
   * 🔍 Extract Real Learning Pattern - ACTUAL LEARNING
   */
  private async extractRealLearningPattern(
    handlerName: string,
    actionType: string,
    context: any
  ): Promise<void> {
    try {
      let pattern: RealLearningPattern | null = null;

      // Extract different types of learning patterns
      switch (actionType) {
        case "file-analysis":
          pattern = await this.extractFileAnalysisPattern(context);
          break;

        case "component-creation":
          pattern = await this.extractComponentPattern(context);
          break;

        case "auto-fix":
          pattern = await this.extractAutoFixPattern(context);
          break;

        case "optimization":
          pattern = await this.extractOptimizationPattern(context);
          break;

        case "guitar-analysis":
          pattern = await this.extractGuitarAnalysisPattern(context);
          break;

        case "vocal-analysis":
          pattern = await this.extractVocalAnalysisPattern(context);
          break;

        default:
          pattern = await this.extractGenericPattern(actionType, context);
      }

      if (pattern) {
        const patternId = `${handlerName}-${actionType}-${Date.now()}`;
        this.realLearningPatterns.set(patternId, pattern);

        console.log(
          `🎯 Learned real pattern: ${pattern.patternType} from ${handlerName}`
        );

        // Persist immediately
        this.persistLearningData();
      }
    } catch (error) {
      console.warn("Failed to extract learning pattern:", error);
    }
  }

  /**
   * 📝 Extract File Analysis Pattern
   */
  private async extractFileAnalysisPattern(
    context: any
  ): Promise<RealLearningPattern | null> {
    if (!context.fileName) return null;

    return {
      patternType: "code-structure",
      beforeCode: context.originalCode || "File analysis requested",
      afterCode: context.analysisResult || "Analysis completed successfully",
      reasoning: `File ${context.fileName} analyzed: ${
        context.issues?.length || 0
      } issues, ${context.suggestions?.length || 0} suggestions`,
      confidence: 0.8,
      applicableScenarios: [
        context.fileType || "unknown",
        "code-analysis",
        "quality-check",
      ],
      learnedFrom: "file-analysis-handler",
      timestamp: new Date(),
    };
  }

  /**
   * 🔧 Extract Auto-Fix Pattern
   */
  private async extractAutoFixPattern(
    context: any
  ): Promise<RealLearningPattern | null> {
    if (!context.originalCode && !context.fixType) return null;

    return {
      patternType: "error-fix",
      beforeCode: context.originalCode?.substring(0, 200) || "Code with errors",
      afterCode: context.fixedCode?.substring(0, 200) || "Fixed code",
      reasoning: `Auto-fix applied: ${context.fixType || "general fix"} - ${
        context.description || "error resolved"
      }`,
      confidence: context.confidence || 0.9,
      applicableScenarios: [
        "syntax-error",
        "auto-fix",
        context.fixType || "general",
      ],
      learnedFrom: "auto-fix-handler",
      timestamp: new Date(),
    };
  }

  /**
   * 🏗️ Extract Component Pattern
   */
  private async extractComponentPattern(
    context: any
  ): Promise<RealLearningPattern | null> {
    if (!context.componentName && !context.componentType) return null;

    return {
      patternType: "component-pattern",
      beforeCode: "Component creation requested",
      afterCode: `${context.componentType || "React"} component created`,
      reasoning: `Successfully created ${
        context.componentName || "component"
      } (${context.componentType || "unknown type"})`,
      confidence: 0.85,
      applicableScenarios: [
        context.componentType || "react",
        "component-creation",
        "code-generation",
      ],
      learnedFrom: "component-creation-handler",
      timestamp: new Date(),
    };
  }

  /**
   * ⚡ Extract Optimization Pattern
   */
  private async extractOptimizationPattern(
    context: any
  ): Promise<RealLearningPattern | null> {
    return {
      patternType: "optimization",
      beforeCode: context.beforeOptimization || "Code before optimization",
      afterCode: context.afterOptimization || "Code after optimization",
      reasoning: `Optimization applied: ${
        context.optimizationType || "performance"
      } - ${context.improvement || "improved performance"}`,
      confidence: context.confidence || 0.8,
      applicableScenarios: [
        "performance",
        "optimization",
        context.optimizationType || "general",
      ],
      learnedFrom: "optimization-handler",
      timestamp: new Date(),
    };
  }

  /**
   * 🎸 Extract Guitar Analysis Pattern
   */
  private async extractGuitarAnalysisPattern(
    context: any
  ): Promise<RealLearningPattern | null> {
    return {
      patternType: "component-pattern",
      beforeCode: "Guitar component analysis requested",
      afterCode: `Guitar analysis completed: ${
        context.componentsFound || 0
      } components`,
      reasoning: `Guitar analysis: ${context.chords || 0} chords, ${
        context.progressions || 0
      } progressions detected`,
      confidence: 0.9,
      applicableScenarios: [
        "guitar",
        "music",
        "audio-components",
        "music-theory",
      ],
      learnedFrom: "guitar-analysis-handler",
      timestamp: new Date(),
    };
  }

  /**
   * 🎤 Extract Vocal Analysis Pattern
   */
  private async extractVocalAnalysisPattern(
    context: any
  ): Promise<RealLearningPattern | null> {
    return {
      patternType: "component-pattern",
      beforeCode: "Vocal component analysis requested",
      afterCode: `Vocal analysis completed: ${
        context.componentsFound || 0
      } components`,
      reasoning: `Vocal analysis: ${context.techniques || 0} techniques, ${
        context.ranges || 0
      } ranges detected`,
      confidence: 0.9,
      applicableScenarios: [
        "vocal",
        "music",
        "audio-components",
        "voice-processing",
      ],
      learnedFrom: "vocal-analysis-handler",
      timestamp: new Date(),
    };
  }

  /**
   * 🔧 Extract Generic Pattern
   */
  private async extractGenericPattern(
    actionType: string,
    context: any
  ): Promise<RealLearningPattern | null> {
    return {
      patternType: "code-structure",
      beforeCode: context.input || "Action requested",
      afterCode: context.output || "Action completed",
      reasoning: `Generic pattern from ${actionType}: ${
        context.description || "successful operation"
      }`,
      confidence: 0.6,
      applicableScenarios: [
        actionType,
        "generic",
        context.category || "unknown",
      ],
      learnedFrom: "generic-handler",
      timestamp: new Date(),
    };
  }

  /**
   * 📊 Update Learning Session
   */
  private async updateLearningSession(
    handlerName: string,
    actionType: string,
    result: "success" | "failure",
    context: any
  ): Promise<void> {
    const sessionId = `${handlerName}-${Date.now()}`;

    // Find or create session
    let session = this.learningSessions.find(
      (s) => s.handlerName === handlerName
    );
    if (!session) {
      session = {
        sessionId,
        handlerName,
        patterns: [],
        insights: [],
        improvements: [],
        duration: 0,
        success: result === "success",
      };
      this.learningSessions.push(session);
    }

    // Update session data
    if (context.insights) {
      session.insights.push(...context.insights);
    }
    if (context.improvements) {
      session.improvements.push(...context.improvements);
    }

    // Keep only recent sessions
    if (this.learningSessions.length > 50) {
      this.learningSessions = this.learningSessions.slice(-50);
    }
  }

  /**
   * 🎵 Check if Action is Music-Related
   */
  private isMusicRelatedAction(actionType: string): boolean {
    const musicKeywords = [
      "guitar",
      "vocal",
      "audio",
      "music",
      "chord",
      "note",
      "sound",
      "theory",
    ];
    return musicKeywords.some((keyword) =>
      actionType.toLowerCase().includes(keyword)
    );
  }

  /**
   * 📂 Group Patterns by Type
   */
  private groupPatternsByType(): Record<string, number> {
    const groups: Record<string, number> = {};

    for (const pattern of this.realLearningPatterns.values()) {
      groups[pattern.patternType] = (groups[pattern.patternType] || 0) + 1;
    }

    return groups;
  }

  /**
   * 🚀 Start Active Learning
   */
  private startActiveLearning(): void {
    console.log("🚀 Starting active learning mode");
    this.learningState.statisticalBrainActive = true;
    this.learningState.musicBrainActive = true;
  }

  /**
   * ⏸️ Pause Learning
   */
  private pauseLearning(): void {
    console.log("⏸️ Pausing learning - entering static mode");
    // Preserve existing patterns but stop learning new ones
  }

  /**
   * 👁️ Start File Watching for Learning
   */
  private startFileWatching(): void {
    const watcher = vscode.workspace.createFileSystemWatcher(
      "**/*.{ts,tsx,js,jsx}"
    );

    watcher.onDidCreate((uri) => this.logFileEvent("created", uri));
    watcher.onDidChange((uri) => this.logFileEvent("changed", uri));
    watcher.onDidDelete((uri) => this.logFileEvent("deleted", uri));

    console.log("👁️ File watching started for learning");
  }

  /**
   * 📝 Log File Events for Learning
   */
  private logFileEvent(event: string, uri: vscode.Uri): void {
    const isMusicFile =
      /\b(audio|music|sound|guitar|vocal|midi|chord|note|scale)\b/i.test(
        uri.fsPath
      );

    if (isMusicFile) {
      const fileEventData: FileEvent = {
        event,
        path: uri.fsPath,
        isMusicRelated: true,
        timestamp: new Date(),
      };

      this.cacheAnalysis("file-event", fileEventData);

      // Learn from music file events
      this.learnFromHandlerAction("file-watcher", "file-event", "success", {
        event,
        filePath: uri.fsPath,
        isMusicRelated: true,
      });

      console.log(`🎵 Music-related file ${event}: ${uri.fsPath}`);
    }
  }

  /**
   * 📚 Learn from Code Analysis - ENHANCED
   */
  async learnFromCodeAnalysis(analysis: any): Promise<void> {
    try {
      // Cache locally
      this.cacheAnalysis("code-analysis", analysis);

      // Share with Brain for ecosystem learning
      await this.brainConnector.shareIntelligence("code-analysis", analysis);

      // Update music intelligence patterns
      await this.musicIntelligence.learnFromAnalysis(analysis);

      // ✅ NEW: Use enhanced learning system
      await this.learnFromHandlerAction(
        "code-analysis",
        "file-analysis",
        "success",
        {
          analysisData: analysis,
          insights: ["Code patterns analyzed", "Quality metrics updated"],
        }
      );

      console.log("📚 Code analysis learned and cached");
    } catch (error) {
      console.warn("Learning from analysis failed:", error);
    }
  }

  /**
   * 📊 Cache Analysis Results
   */
  private cacheAnalysis(type: string, data: any): void {
    const key = `${type}_${Date.now()}`;
    const cacheEntry: CacheEntry = {
      type,
      data,
      timestamp: new Date(),
      source: "cipher",
    };

    this.learningCache.set(key, cacheEntry);

    // Keep cache size manageable
    if (this.learningCache.size > 100) {
      const oldestKey = this.learningCache.keys().next().value;
      if (oldestKey) {
        this.learningCache.delete(oldestKey);
      }
    }
  }

  /**
   * 🧠 Get Learning Context
   */
  private getLearningContext(): LearningContext {
    const recentAnalyses = Array.from(this.learningCache.values())
      .filter((item) => Date.now() - item.timestamp.getTime() < 3600000) // Last hour
      .slice(-10); // Last 10 items

    return {
      recentAnalyses,
      cacheSize: this.learningCache.size,
      patterns: this.extractPatterns(recentAnalyses),
    };
  }

  /**
   * 🔍 Extract Learning Patterns (Original)
   */
  private extractPatterns(analyses: CacheEntry[]): PatternData {
    const patterns: PatternData = {
      commonComponents: [],
      frequentIssues: [],
      suggestedImprovements: [],
    };

    const componentSet = new Set<string>();
    const issuesMap = new Map<string, number>();
    const improvementsSet = new Set<string>();

    analyses.forEach((analysis) => {
      if (
        analysis.data?.components &&
        Array.isArray(analysis.data.components)
      ) {
        analysis.data.components.forEach((comp: string) =>
          componentSet.add(comp)
        );
      }

      if (analysis.data?.issues && Array.isArray(analysis.data.issues)) {
        analysis.data.issues.forEach((issue: string) => {
          issuesMap.set(issue, (issuesMap.get(issue) || 0) + 1);
        });
      }

      if (
        analysis.data?.suggestions &&
        Array.isArray(analysis.data.suggestions)
      ) {
        analysis.data.suggestions.forEach((suggestion: string) =>
          improvementsSet.add(suggestion)
        );
      }
    });

    patterns.commonComponents = Array.from(componentSet);
    patterns.frequentIssues = Array.from(issuesMap.entries());
    patterns.suggestedImprovements = Array.from(improvementsSet);

    return patterns;
  }

  // =============================================================================
  // 🎵 ORIGINAL MUSIC DEVELOPMENT METHODS (ENHANCED)
  // =============================================================================

  /**
   * 🎸 Analyze Guitar Components in Code - ENHANCED
   */
  async analyzeGuitarComponents(): Promise<GuitarAnalysis> {
    try {
      // Get guitar analysis from Brain
      const brainAnalysis =
        await this.brainConnector.getGuitarComponentSuggestions();

      // Add Cipher-specific enhancements
      const cipherAnalysis = await this.musicIntelligence.enhanceGuitarAnalysis(
        brainAnalysis
      );

      // ✅ ENHANCED: Get pattern-based suggestions
      const patternSuggestions = await this.getPatternBasedSuggestions(
        JSON.stringify(cipherAnalysis),
        "guitar-analysis"
      );

      // Enhanced analysis with proper typing
      const enhancedAnalysis: GuitarAnalysis = {
        ...cipherAnalysis,
        brainSuggestions: brainAnalysis,
        learningInsights: this.getLearningContext(),
        suggestions: [
          ...(cipherAnalysis.suggestions || []),
          ...patternSuggestions,
        ],
      };

      // Cache for learning and learn from analysis
      this.cacheAnalysis("guitar-components", enhancedAnalysis);
      await this.learnFromHandlerAction(
        "guitar-analysis",
        "guitar-analysis",
        "success",
        {
          componentsFound: enhancedAnalysis.components?.length || 0,
          insights: patternSuggestions,
        }
      );

      return enhancedAnalysis;
    } catch (error) {
      await this.learnFromHandlerAction(
        "guitar-analysis",
        "guitar-analysis",
        "failure",
        { error: String(error) }
      );
      console.error("Guitar component analysis failed:", error);
      throw error;
    }
  }

  /**
   * 🎤 Analyze Vocal Components in Code - ENHANCED
   */
  async analyzeVocalComponents(): Promise<VocalAnalysis> {
    try {
      // Get vocal analysis from Brain
      const brainAnalysis =
        await this.brainConnector.getVocalComponentSuggestions();

      // Add Cipher-specific enhancements
      const cipherAnalysis = await this.musicIntelligence.enhanceVocalAnalysis(
        brainAnalysis
      );

      // ✅ ENHANCED: Get pattern-based suggestions
      const patternSuggestions = await this.getPatternBasedSuggestions(
        JSON.stringify(cipherAnalysis),
        "vocal-analysis"
      );

      // Enhanced analysis with proper typing
      const enhancedAnalysis: VocalAnalysis = {
        ...cipherAnalysis,
        brainSuggestions: brainAnalysis,
        learningInsights: this.getLearningContext(),
        suggestions: [
          ...(cipherAnalysis.suggestions || []),
          ...patternSuggestions,
        ],
      };

      // Cache for learning and learn from analysis
      this.cacheAnalysis("vocal-components", enhancedAnalysis);
      await this.learnFromHandlerAction(
        "vocal-analysis",
        "vocal-analysis",
        "success",
        {
          componentsFound: enhancedAnalysis.components?.length || 0,
          insights: patternSuggestions,
        }
      );

      return enhancedAnalysis;
    } catch (error) {
      await this.learnFromHandlerAction(
        "vocal-analysis",
        "vocal-analysis",
        "failure",
        { error: String(error) }
      );
      console.error("Vocal component analysis failed:", error);
      throw error;
    }
  }

  /**
   * 💡 Get Personalized Music Dev Suggestions - ENHANCED
   */
  async getPersonalizedSuggestions(): Promise<string[]> {
    try {
      // Get base suggestions from Brain
      const brainSuggestions =
        await this.brainConnector.getMusicDevSuggestions();

      // Enhance with Cipher-specific context
      const cipherSuggestions = await this.musicIntelligence.enhanceSuggestions(
        brainSuggestions,
        this.getLearningContext()
      );

      // ✅ ENHANCED: Add pattern-based suggestions
      const patternSuggestions = await this.getPatternBasedSuggestions(
        "",
        "music-development"
      );

      return [...cipherSuggestions, ...patternSuggestions].slice(0, 10);
    } catch (error) {
      console.error("Failed to get personalized suggestions:", error);
      return [
        "Focus on modular component architecture",
        "Implement proper audio context management",
        "Add error boundaries for audio components",
      ];
    }
  }

  /**
   * 🏗️ Generate Music Component Code - ENHANCED
   */
  async generateMusicComponent(
    componentType: "guitar" | "vocal" | "audio" | "theory"
  ): Promise<string> {
    try {
      const generatedCode = await this.musicIntelligence.generateComponentCode(
        componentType
      );

      // Learn from successful generation
      await this.learnFromHandlerAction(
        "component-generation",
        "component-creation",
        "success",
        {
          componentType,
          componentName: `${componentType}Component`,
          generatedCode: generatedCode.substring(0, 100),
        }
      );

      return generatedCode;
    } catch (error) {
      await this.learnFromHandlerAction(
        "component-generation",
        "component-creation",
        "failure",
        { error: String(error) }
      );
      console.error("Component generation failed:", error);
      throw error;
    }
  }

  /**
   * ✅ FIXED: Get Pattern-Based Suggestions - The Missing Method!
   */
  async getPatternBasedSuggestions(
    currentCode: string,
    context: string
  ): Promise<string[]> {
    try {
      const suggestions: string[] = [];

      // Find relevant patterns
      const relevantPatterns = Array.from(this.realLearningPatterns.values())
        .filter((pattern) => {
          return (
            pattern.applicableScenarios.includes(context) ||
            pattern.learnedFrom.includes(context)
          );
        })
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 5);

      // Generate suggestions from patterns
      for (const pattern of relevantPatterns) {
        if (pattern.reasoning) {
          suggestions.push(
            `Based on pattern: ${pattern.reasoning.substring(0, 80)}...`
          );
        }

        // Add scenario-specific suggestions
        if (pattern.applicableScenarios.length > 0) {
          suggestions.push(
            `Consider: ${pattern.applicableScenarios.join(", ")} approach`
          );
        }
      }

      // Add generic suggestions if no patterns found
      if (suggestions.length === 0) {
        suggestions.push("Consider breaking down complex components");
        suggestions.push("Add proper error handling");
        suggestions.push("Implement responsive design patterns");
      }

      return suggestions.slice(0, 3); // Limit to 3 suggestions
    } catch (error) {
      console.warn("Failed to get pattern-based suggestions:", error);
      return ["No pattern-based suggestions available"];
    }
  }

  // =============================================================================
  // 💾 ENHANCED PERSISTENCE (ORCHESTRATION + LEARNING)
  // =============================================================================

  /**
   * 💾 Load Orchestration Data
   */
  private async loadOrchestrationData(): Promise<void> {
    try {
      const savedOrchestration = await vscode.workspace
        .getConfiguration("cipher")
        .get("orchestrationData");

      if (savedOrchestration && typeof savedOrchestration === "object") {
        const data = savedOrchestration as any;

        if (
          data.handlerCapabilities &&
          Array.isArray(data.handlerCapabilities)
        ) {
          for (const [name, capability] of data.handlerCapabilities) {
            this.handlerCapabilities.set(name, capability);
          }
        }

        if (data.orchestrationEnabled !== undefined) {
          this.orchestrationEnabled = data.orchestrationEnabled;
        }

        console.log("📥 Loaded orchestration data");
      }
    } catch (error) {
      console.warn("Failed to load orchestration data:", error);
    }
  }

  /**
   * 💾 Persist Orchestration Data
   */
  private async persistOrchestrationData(): Promise<void> {
    try {
      const config = vscode.workspace.getConfiguration("cipher");

      const orchestrationData = {
        handlerCapabilities: Array.from(this.handlerCapabilities.entries()),
        orchestrationEnabled: this.orchestrationEnabled,
        lastPersisted: new Date().toISOString(),
      };

      await config.update(
        "orchestrationData",
        orchestrationData,
        vscode.ConfigurationTarget.Global
      );
      console.log("💾 Orchestration data persisted");
    } catch (error) {
      console.warn("Failed to persist orchestration data:", error);
    }
  }

  /**
   * 💾 Load Learning Data
   */
  private async loadLearningData(): Promise<void> {
    try {
      // Load from VS Code global state or file system
      const savedPatterns = await vscode.workspace
        .getConfiguration("cipher")
        .get("learningPatterns");
      const savedState = await vscode.workspace
        .getConfiguration("cipher")
        .get("learningState");

      if (savedPatterns && Array.isArray(savedPatterns)) {
        for (const [id, pattern] of savedPatterns) {
          this.realLearningPatterns.set(id, pattern);
        }
        console.log(`📥 Loaded ${savedPatterns.length} learning patterns`);
      }

      if (savedState) {
        this.learningState = { ...this.learningState, ...savedState };
        console.log(
          `📥 Loaded learning state: ${this.learningState.learningMode}`
        );
      }
    } catch (error) {
      console.warn("Failed to load learning data:", error);
    }
  }

  /**
   * 💾 Persist Learning Data
   */
  private async persistLearningData(): Promise<void> {
    try {
      // Save to VS Code configuration
      const config = vscode.workspace.getConfiguration("cipher");

      const patternsArray = Array.from(this.realLearningPatterns.entries());
      await config.update(
        "learningPatterns",
        patternsArray,
        vscode.ConfigurationTarget.Global
      );
      await config.update(
        "learningState",
        this.learningState,
        vscode.ConfigurationTarget.Global
      );

      console.log("💾 Learning data persisted");
    } catch (error) {
      console.warn("Failed to persist learning data:", error);
    }
  }

  /**
   * 📊 Get Enhanced Integration Status (UPDATED)
   */
  async getStatus(): Promise<IntegrationStatus> {
    const brainStatus = await this.brainConnector.getBrainStatus();
    const musicStatus = this.musicIntelligence.getStatus();
    const orchestrationStats = this.getOrchestrationStats();

    // Get the last update timestamp safely
    const cacheValues = Array.from(this.learningCache.values());
    const lastUpdate =
      cacheValues.length > 0
        ? cacheValues[cacheValues.length - 1]?.timestamp
        : null;

    const status: IntegrationStatus = {
      brain: brainStatus,
      musicIntelligence: musicStatus,
      cache: {
        size: this.learningCache.size,
        lastUpdate: lastUpdate || null,
      },
      integration: {
        initialized: true,
        version: "3.1.0",
        brainConnected: brainStatus?.connected || false,
        musicIntelligenceActive: musicStatus?.active || true,
        learningActive: this.learningState.isLearningEnabled,
        orchestrationActive: this.orchestrationEnabled,
      },
      capabilities: {
        guitarAnalysis: true,
        vocalAnalysis: true,
        patternRecognition: true,
        personalizedSuggestions: true,
        crossSystemLearning: brainStatus?.connected || false,
        musicTheoryIntegration: true,
        realPatternLearning: true,
        patternMatching: true,
        adaptiveLearning: this.learningState.isLearningEnabled,
        handlerOrchestration: this.orchestrationEnabled,
        intelligentRouting: this.orchestrationEnabled,
        problemClassification: true,
      },
      learning: this.learningState,
      realPatterns: {
        total: this.realLearningPatterns.size,
        byType: this.groupPatternsByType(),
      },
      orchestration: {
        handlersRegistered: this.handlerCapabilities.size,
        routingDecisions: this.routingDecisions.size,
        successfulRoutes: orchestrationStats.totalRoutingDecisions,
        lastRouting: this.routingDecisions.size > 0 ? new Date() : null,
      },
    };

    return status;
  }

  /**
   * 📊 Generate Enhanced Learning Report (UPDATED)
   */
  generateLearningReport(): string {
    const patternsByType = this.groupPatternsByType();
    const orchestrationStats = this.getOrchestrationStats();

    const recentPatterns = Array.from(this.realLearningPatterns.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 10);

    const recentSessions = this.learningSessions
      .sort((a, b) => b.sessionId.localeCompare(a.sessionId))
      .slice(0, 5);

    return `# 🧠 Cipher Brain Intelligence Report v3.1 (FIXED ORCHESTRATION)

## Learning Status
- **Learning Enabled**: ${
      this.learningState.isLearningEnabled ? "✅ Active" : "❌ Disabled"
    }
- **Learning Mode**: ${this.learningState.learningMode}
- **Total Patterns Learned**: ${this.learningState.totalPatternsLearned}
- **Real Patterns Stored**: ${this.realLearningPatterns.size}
- **Last Learning Action**: ${
      this.learningState.lastLearningAction?.toLocaleString() || "Never"
    }

## 🎯 Handler Orchestration System (FIXED - RECOMMENDATION ONLY)
- **Orchestration Enabled**: ${
      this.orchestrationEnabled ? "✅ Active" : "❌ Disabled"
    }
- **Handlers Registered**: ${orchestrationStats.handlersRegistered}
- **Total Routing Decisions**: ${orchestrationStats.totalRoutingDecisions}
- **Average Confidence**: ${Math.round(
      (orchestrationStats.averageConfidence || 0) * 100
    )}%
- **Most Used Handler**: ${
      orchestrationStats.mostUsedHandler?.name || "None"
    } (${orchestrationStats.mostUsedHandler?.usageCount || 0} times)

## Handler Usage Breakdown
${
  Object.entries(orchestrationStats.handlerUsageBreakdown)
    .map(([handler, count]) => `- **${handler}**: ${count} uses`)
    .join("\n") || "- No routing decisions yet"
}

## Pattern Distribution
${
  Object.entries(patternsByType)
    .map(([type, count]) => `- **${type}**: ${count} patterns`)
    .join("\n") || "- No patterns learned yet"
}

## Recent Learning Patterns
${
  recentPatterns
    .map(
      (pattern) =>
        `- **${pattern.patternType}**: ${pattern.reasoning.substring(
          0,
          80
        )}... (${Math.round(pattern.confidence * 100)}% confidence)`
    )
    .join("\n") || "- No recent patterns"
}

## Learning Sessions
${
  recentSessions
    .map(
      (session) =>
        `- **${session.handlerName}**: ${session.patterns.length} patterns, ${session.insights.length} insights`
    )
    .join("\n") || "- No recent sessions"
}

## Brain System Status
- **Statistical Brain**: ${
      this.learningState.statisticalBrainActive ? "🟢 Active" : "🔴 Inactive"
    }
- **Music Brain**: ${
      this.learningState.musicBrainActive ? "🟢 Active" : "🔴 Inactive"
    }
- **Training Brain**: ${
      this.learningState.trainingBrainActive ? "🟢 Active" : "🔴 Inactive"
    }
- **Orchestration Brain**: ${
      this.orchestrationEnabled ? "🟢 Active" : "🔴 Inactive"
    }

## Capabilities
- **Pattern Recognition**: ✅ Active
- **Pattern Matching**: ✅ Active
- **Adaptive Learning**: ${
      this.learningState.isLearningEnabled ? "✅ Active" : "❌ Disabled"
    }
- **Music Intelligence**: ✅ Active
- **File Watching**: ✅ Active
- **🎯 Handler Orchestration**: ${
      this.orchestrationEnabled
        ? "✅ Active (Recommendation Only)"
        : "❌ Disabled"
    }
- **🧠 Problem Classification**: ✅ Active
- **🔄 Intelligent Routing**: ${
      this.orchestrationEnabled
        ? "✅ Active (Recommendation Only)"
        : "❌ Disabled"
    }

---
*Generated by Cipher Enhanced Brain Interface System v3.1 with Fixed Handler Orchestration (Recommendation Only)*`;
  }
}

// ✅ FIXED: Add default export
export default CipherBrainInterface;
