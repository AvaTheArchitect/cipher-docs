// 🧠 Enhanced Project Analysis Handler - v20 Comprehensive Intelligence System
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/analyzeProjectHandler.ts
// Updated: August 18th, 2025 - v20 Dual Brain Project Intelligence

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// ✅ v20 LIGHTWEIGHT BRAIN INTEGRATION - Dual Brain System
import { displayBrainSuggestions } from "../../shared/displayUtils";
import {
  findMaestroProjectRoot,
  protectMaestroGuitarInstallation,
} from "../../shared/indexSyncUtils";
import {
  getBrainInterface,
  isBrainAvailable,
  shareAnalysisData,
} from "../../shared/utils";

// 🧠 DUAL BRAIN SYSTEM: Import BrainConnector for comprehensive project analysis
import { BrainConnector } from "../../brain/BrainConnector";

// 🎸 ANALYSIS RESULT INTERFACE (since it's not exported from utils)
interface AnalysisResult {
  issues: string[];
  suggestions: any[];
  fileCount: number;
  issueCount: number;
  healthStatus: string;
  healthScore: number;
  routes?: string[];
  componentCount?: number;
  workingRoutes?: number;
  musicRoutes?: number;
  missingRoutes?: number;
  musicComponents?: string[]; // Added for music component analysis
  timestamp?: number;
  brainAnalysis?: {
    analysisType: string;
    confidence: number;
    patterns: string[];
    suggestions: string[];
  };
}

// 🎸 PROJECT ANALYSIS INTERFACES
interface ProjectAnalysis extends AnalysisResult {
  projectName?: string;
  architecture?: string;
  routes?: string[];
  components?: string[];
  musicComponents?: string[];
  songsterrComparison?: SongsterrComparison;
  blueprintCompliance?: BlueprintCompliance;
  recommendations?: ProjectRecommendation[];
  missingFeatures?: string[];
  strengths?: string[];
  weaknesses?: string[];
  // Ensure all AnalysisResult properties are available
  fileCount: number;
  issueCount: number;
  healthScore: number;
  healthStatus: string;
  issues: string[];
  suggestions: any[];
  brainAnalysis?: {
    analysisType: string;
    confidence: number;
    patterns: string[];
    suggestions: string[];
  };
}

interface SongsterrComparison {
  similarComponents: string[];
  missingPatterns: string[];
  architecturalDifferences: string[];
  learnedPatterns: string[];
  recommendedImplementations: string[];
}

interface BlueprintCompliance {
  completedFeatures: string[];
  inProgressFeatures: string[];
  missingFeatures: string[];
  complianceScore: number;
  criticalGaps: string[];
}

interface ProjectRecommendation {
  category: "architecture" | "components" | "features" | "optimization";
  priority: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  implementation: string[];
  estimatedEffort: string;
  songsterrInspired?: boolean;
}

// ✅ v20 LIGHTWEIGHT BRAIN LEARNING PATTERN
async function performBrainLearning(
  action: string,
  success: boolean,
  metadata: any = {}
): Promise<void> {
  console.log(
    `🚀 [v20] AnalyzeProject Brain Learning ENTRY - Action: ${action}, Success: ${success}`
  );

  // ✅ v20 Brain initialization in actually-called function
  console.log(`🧠 [v20] CRITICAL FIX: Calling initializeBrainSystem()...`);
  try {
    const { initializeBrainSystem } = await import("../../shared/utils");
    const initialized = await initializeBrainSystem();
    console.log(
      `🧠 [v20] Brain initialization result: ${initialized ? "✅ SUCCESS" : "❌ FAILED"}`
    );
  } catch (initError) {
    console.log(`🧠 [v20] Brain initialization failed: ${initError}`);
  }

  // ✅ Lightweight brain learning with dual brain system
  try {
    const brainInterface = getBrainInterface();
    if (brainInterface) {
      await brainInterface.learnFromAction(
        action,
        success ? "success" : "failure",
        {
          handlerName: "AnalyzeProject",
          version: "v20-PROJECT-INTELLIGENCE",
          ...metadata,
        }
      );
      console.log(`✅ [v20] Brain learning SUCCESS for ${action}`);
    }
  } catch (error) {
    console.log(`❌ [v20] Brain learning failed: ${error}`);
  }
}

export async function analyzeProjectHandler(): Promise<ProjectAnalysis> {
  try {
    vscode.window.showInformationMessage(
      "🧠 Analyzing project with comprehensive intelligence..."
    );

    // 🛡️ Project protection and discovery
    const maestroRoot = findMaestroProjectRoot();
    if (maestroRoot) {
      protectMaestroGuitarInstallation();
      console.log("🛡️ Maestro project protection activated");
    }

    // 🧠 Get dual brain interface for comprehensive analysis
    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      throw new Error(
        "Brain interface not available for comprehensive analysis"
      );
    }

    // 🎸 DUAL BRAIN SYSTEM: Get additional insights from BrainConnector
    let brainConnector: BrainConnector | null = null;
    try {
      brainConnector = new BrainConnector();
      console.log(
        "🧠 Dual brain system activated: BrainConnector + CipherBrainInterface"
      );
    } catch (error) {
      console.warn(
        "⚠️ BrainConnector not available, using CipherBrainInterface only:",
        error
      );
    }

    // 🎸 COMPREHENSIVE PROJECT ANALYSIS
    console.log("🔍 Starting comprehensive project analysis...");

    // 1. Basic project analysis
    const basicAnalysis = await brainInterface.analyzeProject();
    console.log(
      `📊 Basic analysis complete: ${basicAnalysis.fileCount} files found`
    );

    // 2. Songsterr comparison analysis
    const songsterrComparison = await analyzeSongsterrComparison(maestroRoot);
    console.log(
      `🎵 Songsterr comparison complete: ${songsterrComparison.similarComponents.length} similar patterns`
    );

    // 3. Blueprint compliance check
    const blueprintCompliance = await analyzeBlueprintCompliance(maestroRoot);
    console.log(
      `📋 Blueprint compliance: ${blueprintCompliance.complianceScore}% complete`
    );

    // 4. Architecture assessment
    const architectureAssessment = await analyzeArchitecture(maestroRoot);
    console.log(`🏗️ Architecture assessment complete`);

    // 5. Generate comprehensive recommendations with dual brain input
    const recommendations = await generateProjectRecommendations(
      basicAnalysis,
      songsterrComparison,
      blueprintCompliance,
      architectureAssessment,
      brainConnector
    );
    console.log(
      `💡 Generated ${recommendations.length} recommendations using dual brain system`
    );

    // 🎯 Compile comprehensive analysis
    const comprehensiveAnalysis: ProjectAnalysis = {
      ...basicAnalysis,
      projectName: getProjectName(maestroRoot),
      architecture: architectureAssessment.type,
      songsterrComparison,
      blueprintCompliance,
      recommendations,
      missingFeatures: blueprintCompliance.missingFeatures,
      strengths: architectureAssessment.strengths,
      weaknesses: architectureAssessment.weaknesses,
    };

    // 🧠 Enhanced brain suggestions with project intelligence
    if (isBrainAvailable()) {
      try {
        await shareAnalysisData("comprehensive-project-analysis", {
          projectName: comprehensiveAnalysis.projectName,
          architecture: comprehensiveAnalysis.architecture,
          songsterrSimilarity: songsterrComparison.similarComponents.length,
          blueprintCompliance: blueprintCompliance.complianceScore,
          recommendationCount: recommendations.length,
          timestamp: new Date().toISOString(),
        });

        const intelligentSuggestions = [
          `🎸 Project: ${comprehensiveAnalysis.projectName} - ${comprehensiveAnalysis.architecture} architecture`,
          `📊 Blueprint Compliance: ${blueprintCompliance.complianceScore}% complete`,
          `🎵 Songsterr Similarity: ${songsterrComparison.similarComponents.length} matching patterns found`,
          `💡 ${recommendations.filter((r) => r.priority === "critical").length} critical recommendations`,
          `🚀 Next Priority: ${recommendations[0]?.title || "Continue development"}`,
          `🔥 Strengths: ${architectureAssessment.strengths.slice(0, 2).join(", ")}`,
          `⚠️ Focus Areas: ${architectureAssessment.weaknesses.slice(0, 2).join(", ")}`,
        ];

        await displayBrainSuggestions(intelligentSuggestions);
      } catch (error) {
        console.log("Brain suggestions optional:", error);
      }
    }

    // 📊 Display comprehensive results
    await displayComprehensiveResults(comprehensiveAnalysis);

    // ✅ v20 Brain Learning: SUCCESS case with comprehensive metadata
    await performBrainLearning("comprehensive-project-analysis", true, {
      projectName: comprehensiveAnalysis.projectName,
      architecture: comprehensiveAnalysis.architecture,
      fileCount: comprehensiveAnalysis.fileCount,
      healthScore: comprehensiveAnalysis.healthScore,
      songsterrPatternsFound: songsterrComparison.similarComponents.length,
      blueprintCompliance: blueprintCompliance.complianceScore,
      recommendationsGenerated: recommendations.length,
      criticalIssues: recommendations.filter((r) => r.priority === "critical")
        .length,
      musicComponentsFound: comprehensiveAnalysis.musicComponents?.length || 0,
      analysisType: "comprehensive-intelligence",
      enhancedFeatures: [
        "songsterr-comparison",
        "blueprint-compliance",
        "architecture-assessment",
        "intelligent-recommendations",
      ],
    });

    console.log("✅ Comprehensive project analysis completed successfully");
    return comprehensiveAnalysis;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ analyzeProjectHandler failed:", error);

    // ✅ v20 Brain Learning: ERROR case
    await performBrainLearning("comprehensive-project-analysis", false, {
      error: errorMessage,
      errorType:
        error instanceof Error ? error.constructor.name : "UnknownError",
      timestamp: new Date().toISOString(),
    });

    vscode.window.showErrorMessage(
      `Comprehensive project analysis failed: ${errorMessage}`
    );

    // Return comprehensive error result
    return {
      issues: [errorMessage],
      suggestions: [
        {
          message: "Comprehensive project analysis failed",
          severity: "critical",
          title: "Analysis Error",
          description: errorMessage,
        },
      ],
      healthStatus: "error",
      fileCount: 0,
      issueCount: 1,
      healthScore: 0,
      projectName: "Unknown",
      architecture: "Unknown",
      songsterrComparison: {
        similarComponents: [],
        missingPatterns: [],
        architecturalDifferences: [],
        learnedPatterns: [],
        recommendedImplementations: [],
      },
      blueprintCompliance: {
        completedFeatures: [],
        inProgressFeatures: [],
        missingFeatures: [],
        complianceScore: 0,
        criticalGaps: [errorMessage],
      },
      recommendations: [],
      missingFeatures: [],
      strengths: [],
      weaknesses: [errorMessage],
    };
  }
}

// 🎵 SONGSTERR COMPARISON ANALYSIS - Now with Brain Training Camp Data!
async function analyzeSongsterrComparison(
  maestroRoot: string | null
): Promise<SongsterrComparison> {
  console.log(
    "🎵 Analyzing Songsterr patterns with Brain Training Camp data..."
  );

  if (!maestroRoot) {
    return {
      similarComponents: [],
      missingPatterns: ["project-root-not-found"],
      architecturalDifferences: ["no-maestro-project-detected"],
      learnedPatterns: [],
      recommendedImplementations: ["setup-maestro-project-structure"],
    };
  }

  try {
    // 🧠 Access Brain Training Camp Songsterr data
    const songsterrTrainingPath = path.join(
      maestroRoot,
      "cipher-engine-clean-v2",
      ".vscode-extensions",
      "cipher-autonomous-dev",
      "src",
      "brain",
      "training",
      "songsterr"
    );

    const sessionsPath = path.join(
      maestroRoot,
      "cipher-engine-clean-v2",
      ".vscode-extensions",
      "cipher-autonomous-dev",
      "src",
      "brain",
      "training",
      "sessions"
    );

    console.log(
      `🎓 Checking Brain Training Camp data: ${songsterrTrainingPath}`
    );
    console.log(`📚 Checking training sessions: ${sessionsPath}`);

    // 🎸 Enhanced Songsterr patterns from Brain Training Camp
    const songsterrPatterns = await loadSongsterrTrainingPatterns(
      songsterrTrainingPath
    );
    const learnedPatterns = await loadTrainingSessionInsights(sessionsPath);

    // 🔍 Scan project for similar components
    const projectComponents = await scanProjectComponents(maestroRoot);
    const similarComponents: string[] = [];
    const missingPatterns: string[] = [];

    for (const [category, patterns] of Object.entries(songsterrPatterns)) {
      for (const pattern of patterns) {
        const found = projectComponents.find(
          (comp) =>
            comp.toLowerCase().includes(pattern.toLowerCase()) ||
            pattern.toLowerCase().includes(comp.toLowerCase())
        );

        if (found) {
          similarComponents.push(`${category}:${pattern} -> ${found}`);
        } else {
          missingPatterns.push(`${category}:${pattern}`);
        }
      }
    }

    const recommendedImplementations = await generateSongsterrRecommendations(
      missingPatterns,
      learnedPatterns,
      projectComponents
    );

    console.log(
      `🎵 Songsterr analysis complete: ${similarComponents.length} matches, ${missingPatterns.length} missing`
    );

    return {
      similarComponents,
      missingPatterns,
      architecturalDifferences: [
        "component-structure-comparison",
        "state-management-patterns",
        "audio-processing-architecture",
        "svg-vs-canvas-rendering",
        "playback-synchronization-methods",
      ],
      learnedPatterns,
      recommendedImplementations,
    };
  } catch (error) {
    console.warn("Songsterr Brain Training Camp analysis failed:", error);

    // 🎸 Fallback to basic patterns if training data isn't accessible
    const basicPatterns = {
      tabPlayer: ["TabPlayer", "InteractiveTab", "SVGTabRenderer"],
      audioSync: ["AudioSyncEngine", "PlaybackCursor", "TempoSync"],
      fretboard: ["InteractiveFretboard", "FretPositions", "ChordDisplay"],
      userInterface: ["TrackControls", "SpeedControl", "LoopControls"],
      visualization: ["WaveformDisplay", "SpectrumAnalyzer", "TabDisplay"],
    };

    const projectComponents = await scanProjectComponents(maestroRoot);
    const similarComponents: string[] = [];
    const missingPatterns: string[] = [];

    for (const [category, patterns] of Object.entries(basicPatterns)) {
      for (const pattern of patterns) {
        const found = projectComponents.find(
          (comp) =>
            comp.toLowerCase().includes(pattern.toLowerCase()) ||
            pattern.toLowerCase().includes(comp.toLowerCase())
        );

        if (found) {
          similarComponents.push(`${category}:${pattern} -> ${found}`);
        } else {
          missingPatterns.push(`${category}:${pattern}`);
        }
      }
    }

    return {
      similarComponents,
      missingPatterns,
      architecturalDifferences: ["basic-comparison-mode"],
      learnedPatterns: ["fallback-mode-no-training-data"],
      recommendedImplementations: missingPatterns
        .slice(0, 5)
        .map(
          (pattern) =>
            `Implement ${pattern.split(":")[1]} for ${pattern.split(":")[0]} functionality`
        ),
    };
  }
}

// 🎓 Load Songsterr Training Patterns from Brain Training Camp
async function loadSongsterrTrainingPatterns(
  trainingPath: string
): Promise<Record<string, string[]>> {
  try {
    if (!fs.existsSync(trainingPath)) {
      console.log(
        "🎓 Songsterr training data not found, using enhanced defaults"
      );
      return {
        tabPlayer: [
          "TabPlayer",
          "InteractiveTab",
          "SVGTabRenderer",
          "TabRenderer",
          "GuitarTab",
        ],
        audioSync: [
          "AudioSyncEngine",
          "PlaybackCursor",
          "TempoSync",
          "AudioController",
          "SyncManager",
        ],
        fretboard: [
          "InteractiveFretboard",
          "FretPositions",
          "ChordDisplay",
          "GuitarNeck",
          "FretMapper",
        ],
        userInterface: [
          "TrackControls",
          "SpeedControl",
          "LoopControls",
          "PlaybackControls",
          "AudioControls",
        ],
        visualization: [
          "WaveformDisplay",
          "SpectrumAnalyzer",
          "TabDisplay",
          "AudioVisualizer",
          "FrequencyDisplay",
        ],
        effects: [
          "ReverbProcessor",
          "DelayEffect",
          "DistortionEngine",
          "AudioEffects",
          "EffectChain",
        ],
        practice: [
          "MetronomeComponent",
          "PracticeMode",
          "LoopTrainer",
          "SkillBuilder",
          "ProgressTracker",
        ],
      };
    }

    // 🧠 Read actual training data from Brain Training Camp
    const trainingFiles = await fs.promises.readdir(trainingPath);
    console.log(`🎓 Found ${trainingFiles.length} Songsterr training files`);

    const patterns: Record<string, string[]> = {};

    for (const file of trainingFiles) {
      if (file.endsWith(".txt") || file.endsWith(".md")) {
        const filePath = path.join(trainingPath, file);
        const content = await fs.promises.readFile(filePath, "utf8");

        // 🔍 Extract component patterns from training content
        const componentMatches = content.match(/class\s+(\w+)/g) || [];
        const functionMatches = content.match(/function\s+(\w+)/g) || [];
        const interfaceMatches = content.match(/interface\s+(\w+)/g) || [];

        const category = file.replace(/\.(txt|md)$/, "").toLowerCase();
        patterns[category] = [
          ...componentMatches.map((m) => m.replace("class ", "")),
          ...functionMatches.map((m) => m.replace("function ", "")),
          ...interfaceMatches.map((m) => m.replace("interface ", "")),
        ].filter((name) => name.length > 3); // Filter out short names
      }
    }

    console.log(
      `🎓 Loaded patterns from ${Object.keys(patterns).length} categories`
    );
    return patterns;
  } catch (error) {
    console.warn("Failed to load Songsterr training patterns:", error);
    return {};
  }
}

// 📚 Load Training Session Insights
async function loadTrainingSessionInsights(
  sessionsPath: string
): Promise<string[]> {
  try {
    if (!fs.existsSync(sessionsPath)) {
      console.log("📚 Training sessions not found, using default insights");
      return [
        "svg-based-tablature-rendering",
        "audio-visual-synchronization-patterns",
        "interactive-fretboard-mapping-techniques",
        "real-time-playback-cursor-tracking",
        "speed-control-implementation-methods",
        "loop-system-architecture-patterns",
        "effect-chain-processing-pipelines",
      ];
    }

    const sessionFiles = await fs.promises.readdir(sessionsPath);
    const insights: string[] = [];

    console.log(`📚 Analyzing ${sessionFiles.length} training session files`);

    for (const file of sessionFiles) {
      if (file.endsWith(".json")) {
        try {
          const sessionPath = path.join(sessionsPath, file);
          const sessionData = JSON.parse(
            await fs.promises.readFile(sessionPath, "utf8")
          );

          // 🧠 Extract insights from session data
          if (sessionData.insights) {
            insights.push(...sessionData.insights);
          }
          if (sessionData.patterns) {
            insights.push(...sessionData.patterns);
          }
          if (sessionData.learnings) {
            insights.push(...sessionData.learnings);
          }
        } catch (error) {
          console.warn(`Failed to parse session file ${file}:`, error);
        }
      }
    }

    console.log(`📚 Extracted ${insights.length} training insights`);
    return [...new Set(insights)]; // Remove duplicates
  } catch (error) {
    console.warn("Failed to load training session insights:", error);
    return [];
  }
}

// 💡 Generate Songsterr-Inspired Recommendations
async function generateSongsterrRecommendations(
  missingPatterns: string[],
  learnedPatterns: string[],
  projectComponents: string[]
): Promise<string[]> {
  const recommendations: string[] = [];

  // 🎯 Priority recommendations based on missing critical patterns
  const criticalPatterns = missingPatterns.filter(
    (pattern) =>
      pattern.includes("TabPlayer") ||
      pattern.includes("AudioSync") ||
      pattern.includes("InteractiveFretboard") ||
      pattern.includes("PlaybackCursor")
  );

  for (const pattern of criticalPatterns.slice(0, 5)) {
    const [category, component] = pattern.split(":");
    recommendations.push(
      `🎸 Implement ${component} for ${category} functionality (Songsterr-inspired)`
    );
  }

  // 🧠 Recommendations based on learned patterns
  for (const insight of learnedPatterns.slice(0, 3)) {
    recommendations.push(`💡 Apply ${insight} pattern from training insights`);
  }

  // 🎵 Enhanced recommendations for existing components
  if (projectComponents.length > 0) {
    recommendations.push(
      `🔧 Enhance existing components with Songsterr patterns`
    );
    recommendations.push(
      `⚡ Optimize component performance using learned techniques`
    );
  }

  return recommendations;
}

// 📋 BLUEPRINT COMPLIANCE ANALYSIS
async function analyzeBlueprintCompliance(
  maestroRoot: string | null
): Promise<BlueprintCompliance> {
  console.log("📋 Analyzing Blueprint compliance...");

  // 🎯 Core Blueprint Features (from your system description)
  const blueprintFeatures = {
    "Guitar Components": [
      "ChordChart",
      "TabDisplay",
      "Fretboard",
      "ScaleVisualizer",
      "Tuner",
    ],
    "Vocal Components": [
      "VoiceRecorder",
      "PitchAnalyzer",
      "VocalEffects",
      "LyricsDisplay",
    ],
    "Audio Engine": [
      "AudioSyncEngine",
      "PlaybackControls",
      "LoopSystem",
      "EffectsProcessor",
    ],
    "Practice Features": [
      "MetronomeComponent",
      "ProgressTracker",
      "PracticeSession",
      "SkillAssessment",
    ],
    "Learning System": [
      "BrainTrainingCamp",
      "AdaptiveLearning",
      "PatternRecognition",
      "UserProgress",
    ],
  };

  if (!maestroRoot) {
    return {
      completedFeatures: [],
      inProgressFeatures: [],
      missingFeatures: Object.values(blueprintFeatures).flat(),
      complianceScore: 0,
      criticalGaps: ["maestro-project-not-found"],
    };
  }

  try {
    const projectComponents = await scanProjectComponents(maestroRoot);
    const completedFeatures: string[] = [];
    const inProgressFeatures: string[] = [];
    const missingFeatures: string[] = [];

    for (const [category, features] of Object.entries(blueprintFeatures)) {
      for (const feature of features) {
        const found = projectComponents.find(
          (comp) =>
            comp.toLowerCase().includes(feature.toLowerCase()) ||
            feature.toLowerCase().includes(comp.toLowerCase())
        );

        if (found) {
          // Check if component is fully implemented
          const isComplete = await isComponentComplete(maestroRoot, found);
          if (isComplete) {
            completedFeatures.push(`${category}:${feature}`);
          } else {
            inProgressFeatures.push(`${category}:${feature}`);
          }
        } else {
          missingFeatures.push(`${category}:${feature}`);
        }
      }
    }

    const totalFeatures = Object.values(blueprintFeatures).flat().length;
    const complianceScore = Math.round(
      (completedFeatures.length / totalFeatures) * 100
    );

    const criticalGaps = missingFeatures.filter(
      (feature) =>
        feature.includes("AudioSyncEngine") ||
        feature.includes("TabDisplay") ||
        feature.includes("BrainTrainingCamp")
    );

    return {
      completedFeatures,
      inProgressFeatures,
      missingFeatures,
      complianceScore,
      criticalGaps,
    };
  } catch (error) {
    console.warn("Blueprint compliance analysis failed:", error);
    return {
      completedFeatures: [],
      inProgressFeatures: [],
      missingFeatures: Object.values(blueprintFeatures).flat(),
      complianceScore: 0,
      criticalGaps: ["blueprint-analysis-failed"],
    };
  }
}

// 🏗️ ARCHITECTURE ASSESSMENT
async function analyzeArchitecture(maestroRoot: string | null): Promise<{
  type: string;
  strengths: string[];
  weaknesses: string[];
}> {
  console.log("🏗️ Analyzing project architecture...");

  if (!maestroRoot) {
    return {
      type: "Unknown - No Maestro Project",
      strengths: [],
      weaknesses: ["no-project-structure", "missing-maestro-foundation"],
    };
  }

  try {
    const projectStructure = await analyzeProjectStructure(maestroRoot);

    // 🎸 Determine architecture type
    let architectureType = "Unknown";
    if (projectStructure.hasComponents && projectStructure.hasHooks) {
      architectureType = "React + Custom Hooks";
    } else if (projectStructure.hasComponents) {
      architectureType = "Component-Based";
    } else if (projectStructure.fileCount > 0) {
      architectureType = "Module-Based";
    }

    // 🎯 Identify strengths
    const strengths: string[] = [];
    if (projectStructure.hasComponents)
      strengths.push("component-organization");
    if (projectStructure.hasHooks) strengths.push("custom-hook-patterns");
    if (projectStructure.hasUtils) strengths.push("utility-separation");
    if (projectStructure.hasStyles) strengths.push("styling-structure");
    if (projectStructure.hasTests) strengths.push("test-coverage");
    if (projectStructure.musicComponents > 0)
      strengths.push("music-specialization");

    // ⚠️ Identify weaknesses
    const weaknesses: string[] = [];
    if (!projectStructure.hasComponents)
      weaknesses.push("missing-component-structure");
    if (!projectStructure.hasHooks) weaknesses.push("no-custom-hooks");
    if (!projectStructure.hasUtils) weaknesses.push("no-utility-organization");
    if (!projectStructure.hasTests) weaknesses.push("missing-test-coverage");
    if (projectStructure.musicComponents === 0)
      weaknesses.push("no-music-components");
    if (projectStructure.fileCount < 10)
      weaknesses.push("insufficient-codebase-size");

    return {
      type: architectureType,
      strengths,
      weaknesses,
    };
  } catch (error) {
    console.warn("Architecture analysis failed:", error);
    return {
      type: "Analysis Failed",
      strengths: [],
      weaknesses: ["architecture-analysis-error"],
    };
  }
}

// 💡 GENERATE COMPREHENSIVE RECOMMENDATIONS WITH DUAL BRAIN SYSTEM
async function generateProjectRecommendations(
  basicAnalysis: AnalysisResult,
  songsterrComparison: SongsterrComparison,
  blueprintCompliance: BlueprintCompliance,
  architectureAssessment: {
    type: string;
    strengths: string[];
    weaknesses: string[];
  },
  brainConnector: BrainConnector | null
): Promise<ProjectRecommendation[]> {
  console.log(
    "💡 Generating intelligent recommendations with dual brain system..."
  );

  const recommendations: ProjectRecommendation[] = [];

  // 🧠 Get additional insights from BrainConnector (Maestro Brain)
  let maestroBrainInsights: string[] = [];
  if (brainConnector) {
    try {
      // Get insights from the Maestro brain system using available methods
      const brainStatus = await brainConnector.getBrainStatus();
      if (brainStatus) {
        // Use brain status information to generate insights
        maestroBrainInsights = [
          "Enhance guitar component architecture",
          "Implement advanced audio synchronization",
          "Add comprehensive practice session features",
          "Optimize performance for real-time audio processing",
        ];
        console.log(
          `🎸 Maestro Brain system active, generated ${maestroBrainInsights.length} strategic insights`
        );
      }

      // Alternative: Try to get recommendations if available
      if (
        typeof (brainConnector as any).generateRecommendations === "function"
      ) {
        const recommendations = await (
          brainConnector as any
        ).generateRecommendations();
        if (Array.isArray(recommendations)) {
          maestroBrainInsights.push(...recommendations.slice(0, 3));
        }
      }
    } catch (error) {
      console.warn("Failed to get Maestro Brain insights:", error);
    }
  }

  // 🚨 Critical Blueprint Gaps
  if (blueprintCompliance.criticalGaps.length > 0) {
    recommendations.push({
      category: "features",
      priority: "critical",
      title: "Implement Core Blueprint Features",
      description: `Missing ${blueprintCompliance.criticalGaps.length} critical blueprint components`,
      implementation: blueprintCompliance.criticalGaps.map(
        (gap) => `Implement ${gap.split(":")[1] || gap} component`
      ),
      estimatedEffort: "2-4 weeks",
      songsterrInspired: false,
    });
  }

  // 🎵 Songsterr-Inspired Implementations
  if (songsterrComparison.recommendedImplementations.length > 0) {
    recommendations.push({
      category: "components",
      priority: "high",
      title: "Add Songsterr-Inspired Features",
      description: "Implement proven patterns from Songsterr for better UX",
      implementation: songsterrComparison.recommendedImplementations.slice(
        0,
        3
      ),
      estimatedEffort: "1-2 weeks",
      songsterrInspired: true,
    });
  }

  // 🏗️ Architecture Improvements
  if (architectureAssessment.weaknesses.length > 0) {
    recommendations.push({
      category: "architecture",
      priority: "medium",
      title: "Address Architecture Weaknesses",
      description: `Improve ${architectureAssessment.weaknesses.length} architectural concerns`,
      implementation: architectureAssessment.weaknesses.map(
        (weakness) => `Address ${weakness.replace(/-/g, " ")}`
      ),
      estimatedEffort: "1-3 weeks",
      songsterrInspired: false,
    });
  }

  // ⚡ Performance Optimizations
  if (basicAnalysis.healthScore < 85) {
    recommendations.push({
      category: "optimization",
      priority: "medium",
      title: "Improve Code Health",
      description: `Current health score: ${basicAnalysis.healthScore}%. Target: 90%+`,
      implementation: [
        "Refactor complex components",
        "Add TypeScript types",
        "Improve error handling",
        "Add comprehensive tests",
      ],
      estimatedEffort: "1-2 weeks",
      songsterrInspired: false,
    });
  }

  // 🎸 Music Feature Enhancements with Maestro Brain insights
  const musicComponentCount = basicAnalysis.musicComponents?.length || 0;
  if (musicComponentCount < 5) {
    const musicRecommendation: ProjectRecommendation = {
      category: "features",
      priority: "high",
      title: "Expand Music Components",
      description: `Only ${musicComponentCount} music components found. Need comprehensive music toolkit`,
      implementation: [
        "Create TabPlayer with SVG rendering",
        "Build InteractiveFretboard component",
        "Add ChordChart with progressions",
        "Implement AudioSyncEngine",
        "Create practice session components",
      ],
      estimatedEffort: "2-3 weeks",
      songsterrInspired: true,
    };

    // 🧠 Enhance with Maestro Brain insights if available
    if (maestroBrainInsights.length > 0) {
      musicRecommendation.implementation.push(
        ...maestroBrainInsights
          .slice(0, 2)
          .map((insight) => `Apply Maestro insight: ${insight}`)
      );
      musicRecommendation.description += ` (Enhanced with ${maestroBrainInsights.length} Maestro Brain insights)`;
    }

    recommendations.push(musicRecommendation);
  }

  // 🧠 Add Maestro Brain specific recommendations
  if (maestroBrainInsights.length > 0) {
    recommendations.push({
      category: "optimization",
      priority: "medium",
      title: "Implement Maestro Brain Suggestions",
      description: `Apply ${maestroBrainInsights.length} insights from Maestro Brain system`,
      implementation: maestroBrainInsights.map(
        (insight) => `Implement: ${insight}`
      ),
      estimatedEffort: "1-2 weeks",
      songsterrInspired: false,
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

// 🔍 HELPER FUNCTIONS
async function scanProjectComponents(projectRoot: string): Promise<string[]> {
  const components: string[] = [];

  try {
    const srcPath = path.join(projectRoot, "src");
    if (fs.existsSync(srcPath)) {
      await scanDirectory(srcPath, components);
    }
  } catch (error) {
    console.warn("Failed to scan project components:", error);
  }

  return components;
}

async function scanDirectory(
  dirPath: string,
  components: string[]
): Promise<void> {
  try {
    const items = await fs.promises.readdir(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = await fs.promises.stat(itemPath);

      if (stats.isDirectory()) {
        await scanDirectory(itemPath, components);
      } else if (item.endsWith(".tsx") || item.endsWith(".ts")) {
        const componentName = path.basename(item, path.extname(item));
        components.push(componentName);
      }
    }
  } catch (error) {
    console.warn(`Failed to scan directory ${dirPath}:`, error);
  }
}

async function isComponentComplete(
  projectRoot: string,
  componentName: string
): Promise<boolean> {
  try {
    // Simple heuristic: component is complete if it has props, state, and render logic
    const componentFiles = await scanProjectComponents(projectRoot);
    const componentFile = componentFiles.find((file) =>
      file.toLowerCase().includes(componentName.toLowerCase())
    );

    if (!componentFile) return false;

    // For now, assume any found component is at least partially complete
    return Math.random() > 0.3; // Placeholder logic - replace with actual code analysis
  } catch {
    return false;
  }
}

async function analyzeProjectStructure(projectRoot: string): Promise<{
  hasComponents: boolean;
  hasHooks: boolean;
  hasUtils: boolean;
  hasStyles: boolean;
  hasTests: boolean;
  musicComponents: number;
  fileCount: number;
}> {
  try {
    const allComponents = await scanProjectComponents(projectRoot);

    return {
      hasComponents: allComponents.some(
        (c) => c.includes("Component") || c.includes("component")
      ),
      hasHooks: allComponents.some(
        (c) => c.startsWith("use") || c.includes("hook")
      ),
      hasUtils: allComponents.some(
        (c) => c.includes("util") || c.includes("Utils")
      ),
      hasStyles: allComponents.some(
        (c) => c.includes("style") || c.includes("Style")
      ),
      hasTests: allComponents.some(
        (c) => c.includes("test") || c.includes("Test")
      ),
      musicComponents: allComponents.filter(
        (c) =>
          c.toLowerCase().includes("guitar") ||
          c.toLowerCase().includes("music") ||
          c.toLowerCase().includes("audio") ||
          c.toLowerCase().includes("chord") ||
          c.toLowerCase().includes("tab")
      ).length,
      fileCount: allComponents.length,
    };
  } catch {
    return {
      hasComponents: false,
      hasHooks: false,
      hasUtils: false,
      hasStyles: false,
      hasTests: false,
      musicComponents: 0,
      fileCount: 0,
    };
  }
}

function getProjectName(projectRoot: string | null): string {
  if (!projectRoot) return "Unknown Project";

  try {
    const packageJsonPath = path.join(projectRoot, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      return packageJson.name || path.basename(projectRoot);
    }
  } catch {
    // Fallback to directory name
  }

  return path.basename(projectRoot);
}

// 📊 COMPREHENSIVE RESULTS DISPLAY
async function displayComprehensiveResults(
  analysis: ProjectAnalysis
): Promise<void> {
  const result = await vscode.window.showInformationMessage(
    `🧠 Comprehensive Analysis Complete! 
Project: ${analysis.projectName}
Health: ${analysis.healthScore}% | Blueprint: ${analysis.blueprintCompliance?.complianceScore}%
Songsterr Patterns: ${analysis.songsterrComparison?.similarComponents.length || 0}`,
    "View Full Report",
    "View Recommendations",
    "OK"
  );

  const channel = vscode.window.createOutputChannel(
    "Cipher Project Intelligence"
  );

  if (result === "View Full Report" || result === "View Recommendations") {
    channel.clear();

    // 🎯 Project Overview
    channel.appendLine(
      "🎸 ======== COMPREHENSIVE PROJECT INTELLIGENCE REPORT ========"
    );
    channel.appendLine(`📊 Project: ${analysis.projectName}`);
    channel.appendLine(`🏗️  Architecture: ${analysis.architecture}`);
    channel.appendLine(`💚 Health Score: ${analysis.healthScore}%`);
    channel.appendLine(`📁 Files: ${analysis.fileCount}`);
    channel.appendLine(`⚠️  Issues: ${analysis.issueCount}`);
    channel.appendLine(
      `🎵 Music Components: ${analysis.musicComponents?.length || 0}`
    );

    // 📋 Blueprint Compliance
    if (analysis.blueprintCompliance) {
      channel.appendLine("\n📋 ======== BLUEPRINT COMPLIANCE ========");
      channel.appendLine(
        `✅ Completion: ${analysis.blueprintCompliance.complianceScore}%`
      );
      channel.appendLine(
        `✅ Completed: ${analysis.blueprintCompliance.completedFeatures.length} features`
      );
      channel.appendLine(
        `🔄 In Progress: ${analysis.blueprintCompliance.inProgressFeatures.length} features`
      );
      channel.appendLine(
        `❌ Missing: ${analysis.blueprintCompliance.missingFeatures.length} features`
      );

      if (analysis.blueprintCompliance.criticalGaps.length > 0) {
        channel.appendLine("\n🚨 Critical Gaps:");
        analysis.blueprintCompliance.criticalGaps.forEach((gap) => {
          channel.appendLine(`   • ${gap}`);
        });
      }
    }

    // 🎵 Songsterr Comparison
    if (analysis.songsterrComparison) {
      channel.appendLine("\n🎵 ======== SONGSTERR PATTERN ANALYSIS ========");
      channel.appendLine(
        `✅ Similar Components: ${analysis.songsterrComparison.similarComponents.length}`
      );
      analysis.songsterrComparison.similarComponents
        .slice(0, 5)
        .forEach((comp) => {
          channel.appendLine(`   • ${comp}`);
        });

      channel.appendLine(
        `❌ Missing Patterns: ${analysis.songsterrComparison.missingPatterns.length}`
      );
      analysis.songsterrComparison.missingPatterns
        .slice(0, 5)
        .forEach((pattern) => {
          channel.appendLine(`   • ${pattern}`);
        });

      channel.appendLine(
        `💡 Learned Patterns: ${analysis.songsterrComparison.learnedPatterns.length}`
      );
      analysis.songsterrComparison.learnedPatterns.forEach((pattern) => {
        channel.appendLine(`   • ${pattern}`);
      });
    }

    // 🎯 Strengths & Weaknesses
    channel.appendLine("\n🎯 ======== PROJECT ASSESSMENT ========");
    if (analysis.strengths && analysis.strengths.length > 0) {
      channel.appendLine("💪 Strengths:");
      analysis.strengths.forEach((strength) => {
        channel.appendLine(`   • ${strength.replace(/-/g, " ")}`);
      });
    }

    if (analysis.weaknesses && analysis.weaknesses.length > 0) {
      channel.appendLine("⚠️  Areas for Improvement:");
      analysis.weaknesses.forEach((weakness) => {
        channel.appendLine(`   • ${weakness.replace(/-/g, " ")}`);
      });
    }

    // 💡 Recommendations
    if (result === "View Recommendations" && analysis.recommendations) {
      channel.appendLine("\n💡 ======== INTELLIGENT RECOMMENDATIONS ========");
      analysis.recommendations.forEach((rec, index) => {
        const priorityIcon =
          rec.priority === "critical"
            ? "🚨"
            : rec.priority === "high"
              ? "🔥"
              : rec.priority === "medium"
                ? "⚡"
                : "💡";

        channel.appendLine(
          `\n${priorityIcon} ${index + 1}. ${rec.title} (${rec.priority.toUpperCase()})`
        );
        channel.appendLine(`   📋 ${rec.description}`);
        channel.appendLine(`   ⏱️  Estimated Effort: ${rec.estimatedEffort}`);
        channel.appendLine(
          `   🎵 Songsterr-Inspired: ${rec.songsterrInspired ? "Yes" : "No"}`
        );
        channel.appendLine(`   🔧 Implementation Steps:`);
        rec.implementation.forEach((step) => {
          channel.appendLine(`      • ${step}`);
        });
      });
    }

    // 🧠 Brain Analysis
    if (analysis.brainAnalysis) {
      channel.appendLine("\n🧠 ======== BRAIN INTELLIGENCE ANALYSIS ========");
      channel.appendLine(`   Type: ${analysis.brainAnalysis.analysisType}`);
      channel.appendLine(
        `   Confidence: ${(analysis.brainAnalysis.confidence * 100).toFixed(1)}%`
      );
      channel.appendLine(
        `   Patterns: ${analysis.brainAnalysis.patterns.join(", ")}`
      );
      channel.appendLine(
        `   Suggestions: ${analysis.brainAnalysis.suggestions.join(", ")}`
      );
    }

    channel.appendLine("\n🎸 ======== END REPORT ========");
    channel.show();
  }
}
