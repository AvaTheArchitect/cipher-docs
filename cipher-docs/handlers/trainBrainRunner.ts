// 🧠 TrainBrain Runner - Master Training Coordinator v20 FIXED Aug 16th, 2025
// Handler Version: TrainBrainRunner-v20 (August 16th, 2025)
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/intelligence/trainBrainRunner.ts
// 🔧 FIXED: Proper brain interface integration using getBrainInterface() pattern + v20 initialization + Complete config system

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// 🧠 Brain Enhanced - Import shared utilities and types
import { getBrainInterface, isBrainAvailable } from "../../shared/utils"; // ✅ ADDED: isBrainAvailable

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../brain/BrainConnector";

// 🔧 FIXED: Import our training handlers with correct relative paths
import { AutoFixResult, BrainFixer } from "./brainFixer";
import { DigestAndLearn, DigestResults } from "./digestAndLearn";

export interface TrainingSession {
  id: string;
  timestamp: string;
  type: "digest" | "autofix" | "combined";
  results: DigestResults | AutoFixResult | CombinedTrainingResults;
  duration: number;
  success: boolean;
  patternsLearned: number;
  confidenceBoost: number;
}

export interface CombinedTrainingResults {
  digestResults: DigestResults;
  autofixResults: any;
  crossValidationScore: number;
  patternsApplied: string[];
  newCapabilities: string[];
}

export interface TrainingConfig {
  enableDigestLearning: boolean;
  enableAutofixTraining: boolean;
  batchSize: number;
  confidenceThreshold: number;
  saveIntermediateResults: boolean;
  autoValidation: boolean;
}

/**
 * 🧠 TrainBrain Runner - Master Training Coordinator
 * Orchestrates all training activities and manages the learning pipeline
 * FIXED: Uses proper brain interface integration + v20 initialization
 */
export class TrainBrainRunner {
  private brainConnector: BrainConnector;
  private digestLearner: DigestAndLearn;
  private brainFixer: BrainFixer;
  private trainingDir: string;
  private extensionPath: string; // 🆕 Store extension path
  private sessionsHistory: TrainingSession[] = [];
  private config: TrainingConfig;

  constructor(brainConnector: BrainConnector, extensionPath: string) {
    this.brainConnector = brainConnector;
    this.extensionPath = extensionPath; // 🆕 Store the extension path

    // 🔧 FIXED: Use workspace root like brainFixer.ts (not extension path)
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      const projectRoot = workspaceFolders[0].uri.fsPath;
      this.trainingDir = path.join(
        projectRoot,
        ".vscode-extensions",
        "cipher-autonomous-dev",
        "src",
        "brain",
        "training"
      );
      console.log(
        `🔧 FIXED: Using workspace root for training dir: ${this.trainingDir}`
      );
    } else {
      // Fallback to extension path if no workspace
      this.trainingDir = path.join(extensionPath, "src", "brain", "training");
      console.log(
        `⚠️ FALLBACK: Using extension path for training dir: ${this.trainingDir}`
      );
    }

    // Initialize sub-components
    this.digestLearner = new DigestAndLearn(brainConnector, extensionPath);
    this.brainFixer = new BrainFixer(brainConnector, extensionPath);

    // Default configuration
    this.config = {
      enableDigestLearning: true,
      enableAutofixTraining: true,
      batchSize: 10,
      confidenceThreshold: 0.7,
      saveIntermediateResults: true,
      autoValidation: true,
    };

    this.ensureTrainingDirectories();
    this.loadTrainingHistory();
    this.loadConfigSync(); // 🔧 FIXED: Use sync version in constructor
  }

  // 🆕 ENHANCED: Find training content files (supports both PDF and TXT)
  private findTrainingContentFile(extensionPath: string): string | undefined {
    console.log("🆕 NEW CODE RUNNING - WORKSPACE DETECTION ACTIVE!");

    // 🔧 FIXED: Use workspace root instead of extension path for project files
    const workspaceFolders = vscode.workspace.workspaceFolders;
    let projectRoot = "";

    if (workspaceFolders && workspaceFolders.length > 0) {
      projectRoot = workspaceFolders[0].uri.fsPath;
      console.log(`🔍 DEBUGGING: Using workspace root: ${projectRoot}`);
    } else {
      console.log(
        "🔍 DEBUGGING: No workspace found, using extension path method"
      );
      projectRoot = path.join(extensionPath, "..", "..");
    }

    // 📁 Possible locations for training content
    const possiblePaths = [
      // In songsterr training folder (extension internal)
      path.join(
        extensionPath,
        "src",
        "brain",
        "training",
        "songsterr",
        "implementation-sources.txt"
      ),
      path.join(
        extensionPath,
        "src",
        "brain",
        "training",
        "songsterr",
        "songsterr-content.txt"
      ),
      path.join(
        extensionPath,
        "src",
        "brain",
        "training",
        "songsterr",
        "songsterr-content.pdf"
      ),

      // 🔧 FIXED: In project ai-team-input folder (using workspace root)
      path.join(projectRoot, "ai-team-input", "songsterr-content.txt"),
      path.join(projectRoot, "ai-team-input", "songsterr-content.pdf"),
      path.join(
        projectRoot,
        "ai-team-input",
        "maestro-vs-songsterr-comparison.txt"
      ), // 🆕 Added your file

      // 🔧 FIXED: Alternative project locations
      path.join(projectRoot, "maestro-ai-input", "songsterr-content.txt"),
      path.join(projectRoot, "maestro-ai-input", "songsterr-content.pdf"),
    ];

    console.log("🔍 Searching for training content files...");
    console.log(`📂 Extension path: ${extensionPath}`);
    console.log(`📂 Project root: ${projectRoot}`);

    for (const filePath of possiblePaths) {
      console.log(`🔍 Checking: ${filePath}`);
      if (fs.existsSync(filePath)) {
        console.log(`✅ Found training content: ${filePath}`);
        return filePath;
      } else {
        console.log(`❌ Not found: ${filePath}`);
      }
    }

    // 🆕 NEW: Scan ai-team-input directory for ANY .txt files
    const aiTeamInputDir = path.join(projectRoot, "ai-team-input");
    console.log(`🔍 Scanning directory: ${aiTeamInputDir}`);

    if (fs.existsSync(aiTeamInputDir)) {
      const files = fs.readdirSync(aiTeamInputDir);
      console.log(`📁 Files in ai-team-input: ${files.join(", ")}`);

      const txtFiles = files.filter(
        (f) => f.endsWith(".txt") || f.endsWith(".pdf")
      );
      if (txtFiles.length > 0) {
        const firstTxtFile = path.join(aiTeamInputDir, txtFiles[0]);
        console.log(`✅ Using first available training file: ${firstTxtFile}`);
        return firstTxtFile;
      }
    } else {
      console.log(
        `❌ ai-team-input directory does not exist: ${aiTeamInputDir}`
      );

      // 🆕 Try alternative naming
      const maestroInputDir = path.join(projectRoot, "maestro-ai-input");
      if (fs.existsSync(maestroInputDir)) {
        console.log(`🔍 Found alternative: ${maestroInputDir}`);
        const files = fs.readdirSync(maestroInputDir);
        const txtFiles = files.filter(
          (f) => f.endsWith(".txt") || f.endsWith(".pdf")
        );
        if (txtFiles.length > 0) {
          const firstTxtFile = path.join(maestroInputDir, txtFiles[0]);
          console.log(`✅ Using file from maestro-ai-input: ${firstTxtFile}`);
          return firstTxtFile;
        }
      }
    }

    return undefined;
  }

  // 🆕 ENHANCED: Check file type and process accordingly
  private async processTrainingFile(filePath: string): Promise<string> {
    const extension = path.extname(filePath).toLowerCase();

    if (extension === ".txt") {
      console.log("📄 Processing TXT file...");
      return await fs.promises.readFile(filePath, "utf8");
    } else if (extension === ".pdf") {
      console.log("📄 Processing PDF file...");
      // For now, show helpful message about PDF conversion
      vscode.window.showWarningMessage(
        "📄 PDF detected! For best results, convert PDF to TXT first. " +
          "Current session will attempt basic PDF text extraction..."
      );

      // Basic PDF processing (you might want to add a proper PDF library later)
      try {
        // For now, assume it's been converted to text format
        return await fs.promises.readFile(filePath, "utf8");
      } catch (error) {
        throw new Error(
          `PDF processing failed: ${error}. Please convert PDF to TXT format.`
        );
      }
    } else {
      throw new Error(
        `Unsupported file format: ${extension}. Use .txt or .pdf files.`
      );
    }
  }

  // ===== MAIN TRAINING METHODS =====

  /**
   * 📖 Run digest-only training on Songsterr content (supports PDF and TXT)
   * FIXED: Uses proper brain interface integration + v20 initialization
   */
  async runDigestOnlyTraining(contentPath?: string): Promise<TrainingSession> {
    const startTime = Date.now();
    const sessionId = `digest-${Date.now()}`;

    try {
      vscode.window.showInformationMessage("📖 Starting digest training...");

      // 🧠 [v20] CRITICAL FIX: Calling initializeBrainSystem()...
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

      // 🔧 FIXED: Use the stored extension path
      let actualContentPath = contentPath;
      if (!actualContentPath) {
        console.log(`🔍 Using stored extension path: ${this.extensionPath}`);

        actualContentPath =
          this.findTrainingContentFile(this.extensionPath) ?? undefined;
        if (!actualContentPath) {
          throw new Error(
            "Training content not found. Please place either:\n" +
              "- songsterr-content.txt or songsterr-content.pdf in ai-team-input/ folder\n" +
              "- implementation-sources.txt in brain/training/songsterr/ folder"
          );
        }
      }

      if (!fs.existsSync(actualContentPath)) {
        throw new Error(`Training content not found: ${actualContentPath}`);
      }

      console.log(`📖 Using training content: ${actualContentPath}`);

      // Process the file based on its type
      const contentText = await this.processTrainingFile(actualContentPath);

      const results =
        await this.digestLearner.digestSongsterrContent(actualContentPath);
      const duration = Date.now() - startTime;

      const session: TrainingSession = {
        id: sessionId,
        timestamp: new Date().toISOString(),
        type: "digest",
        results,
        duration,
        success: true,
        patternsLearned: results.patternsExtracted,
        confidenceBoost: this.calculateDigestConfidenceBoost(results),
      };

      this.sessionsHistory.push(session);
      await this.saveSession(session);
      await this.saveConfig(); // 🆕 Save config after training

      // ✅ FIXED: Use proper brain interface instead of brainConnector
      try {
        if (isBrainAvailable()) {
          const brainInterface = getBrainInterface();
          if (brainInterface) {
            await brainInterface.learnFromAction(
              "digest-training-complete",
              "success",
              {
                patternsLearned: results.patternsExtracted,
                duration,
                fileType: path.extname(actualContentPath),
                handlerName: "TrainBrainRunner",
                sessionId,
              }
            );
            console.log("🧠 Successfully reported digest training to brain");
          } else {
            console.log(
              "🧠 Brain interface is null - skipping learning report"
            );
          }
        } else {
          console.log("🧠 Brain not available - skipping learning report");
        }
      } catch (brainError) {
        console.warn("🧠 Brain learning failed:", brainError);
        // Don't throw - continue even if brain learning fails
      }

      return session;
    } catch (error) {
      const session: TrainingSession = {
        id: sessionId,
        timestamp: new Date().toISOString(),
        type: "digest",
        results: {} as DigestResults,
        duration: Date.now() - startTime,
        success: false,
        patternsLearned: 0,
        confidenceBoost: 0,
      };

      this.sessionsHistory.push(session);
      throw error;
    }
  }

  /**
   * 🔧 Run autofix-only training on broken code files
   * FIXED: Uses proper brain interface integration + v20 support
   */
  async runAutofixOnlyTraining(autofixDir?: string): Promise<TrainingSession> {
    const startTime = Date.now();
    const sessionId = `autofix-${Date.now()}`;

    try {
      vscode.window.showInformationMessage("🔧 Starting autofix training...");

      // ✅ Let brainFixer handle all path resolution with enhanced logic
      const results = await this.brainFixer.runTrainingBatch(autofixDir);
      const duration = Date.now() - startTime;

      const session: TrainingSession = {
        id: sessionId,
        timestamp: new Date().toISOString(),
        type: "autofix",
        results,
        duration,
        success: true,
        patternsLearned: results.totalFixes,
        confidenceBoost: this.calculateAutofixConfidenceBoost(results),
      };

      this.sessionsHistory.push(session);
      await this.saveSession(session);
      await this.saveConfig(); // 🆕 Save config after training

      // ✅ FIXED: Use proper brain interface instead of brainConnector
      try {
        if (isBrainAvailable()) {
          const brainInterface = getBrainInterface();
          if (brainInterface) {
            await brainInterface.learnFromAction(
              "autofix-training-complete",
              "success",
              {
                fixesApplied: results.totalFixes,
                avgMatchScore: results.avgMatchScore,
                duration,
                handlerName: "TrainBrainRunner",
                sessionId,
              }
            );
            console.log("🧠 Successfully reported autofix training to brain");
          } else {
            console.log(
              "🧠 Brain interface is null - skipping learning report"
            );
          }
        } else {
          console.log("🧠 Brain not available - skipping learning report");
        }
      } catch (brainError) {
        console.warn("🧠 Brain learning failed:", brainError);
        // Don't throw - continue even if brain learning fails
      }

      return session;
    } catch (error) {
      const session: TrainingSession = {
        id: sessionId,
        timestamp: new Date().toISOString(),
        type: "autofix",
        results: {} as AutoFixResult,
        duration: Date.now() - startTime,
        success: false,
        patternsLearned: 0,
        confidenceBoost: 0,
      };

      this.sessionsHistory.push(session);
      throw error;
    }
  }

  /**
   * 🚀 Run complete training pipeline (digest + autofix + validation)
   * FIXED: Uses proper brain interface integration + v20 support
   */
  async runCompletePipeline(
    contentPath?: string,
    autofixDir?: string
  ): Promise<TrainingSession> {
    const startTime = Date.now();
    const sessionId = `combined-${Date.now()}`;

    try {
      vscode.window.showInformationMessage(
        "🚀 Starting complete training pipeline..."
      );

      // Phase 1: Digest learning
      const digestResults = await this.runDigestOnlyTraining(contentPath);
      vscode.window.showInformationMessage(
        `✅ Digest complete: ${digestResults.patternsLearned} patterns learned`
      );

      // Phase 2: Autofix training
      const autofixSession = await this.runAutofixOnlyTraining(autofixDir);
      const autofixResults = autofixSession.results as any;
      vscode.window.showInformationMessage(
        `✅ Autofix complete: ${autofixSession.patternsLearned} fixes applied`
      );

      // Phase 3: Cross-validation
      const crossValidationScore = await this.performCrossValidation(
        digestResults.results as DigestResults,
        autofixResults
      );

      // Phase 4: Pattern application test
      const patternsApplied = await this.testPatternApplication();
      const newCapabilities = this.detectNewCapabilities(
        digestResults.results as DigestResults,
        autofixResults
      );

      const combinedResults: CombinedTrainingResults = {
        digestResults: digestResults.results as DigestResults,
        autofixResults,
        crossValidationScore,
        patternsApplied,
        newCapabilities,
      };

      const duration = Date.now() - startTime;
      const session: TrainingSession = {
        id: sessionId,
        timestamp: new Date().toISOString(),
        type: "combined",
        results: combinedResults,
        duration,
        success: true,
        patternsLearned:
          digestResults.patternsLearned + autofixSession.patternsLearned,
        confidenceBoost: this.calculateCombinedConfidenceBoost(combinedResults),
      };

      this.sessionsHistory.push(session);
      await this.saveSession(session);
      await this.saveConfig(); // 🆕 Save config after training

      // ✅ FIXED: Use proper brain interface instead of brainConnector
      try {
        if (isBrainAvailable()) {
          const brainInterface = getBrainInterface();
          if (brainInterface) {
            await brainInterface.learnFromAction(
              "complete-training-pipeline",
              "success",
              {
                totalPatterns: session.patternsLearned,
                confidenceBoost: session.confidenceBoost,
                duration,
                handlerName: "TrainBrainRunner",
                sessionId,
                crossValidationScore,
                newCapabilities,
              }
            );
            console.log("🧠 Successfully reported complete training to brain");
          } else {
            console.log(
              "🧠 Brain interface is null - skipping learning report"
            );
          }
        } else {
          console.log("🧠 Brain not available - skipping learning report");
        }
      } catch (brainError) {
        console.warn("🧠 Brain learning failed:", brainError);
        // Don't throw - continue even if brain learning fails
      }

      return session;
    } catch (error) {
      const session: TrainingSession = {
        id: sessionId,
        timestamp: new Date().toISOString(),
        type: "combined",
        results: {} as CombinedTrainingResults,
        duration: Date.now() - startTime,
        success: false,
        patternsLearned: 0,
        confidenceBoost: 0,
      };

      this.sessionsHistory.push(session);
      throw error;
    }
  }

  // ===== TESTING AND VALIDATION =====

  /**
   * 🎯 Test learned patterns on new code
   */
  async testLearnedPatterns(code: string): Promise<any> {
    try {
      const similarPatterns = this.digestLearner.findSimilarPatterns(code, 10);
      const autofixResult = await this.brainFixer.attemptAutoFix(
        "temp-test-file",
        undefined
      );

      const confidenceScore = this.calculatePatternConfidence(
        similarPatterns,
        autofixResult
      );
      const suggestedFixes = autofixResult.fixesApplied || [];

      // Report pattern testing to brain
      try {
        if (isBrainAvailable()) {
          const brainInterface = getBrainInterface();
          if (brainInterface) {
            await brainInterface.learnFromAction(
              "pattern-testing-complete",
              "success",
              {
                patternsFound: similarPatterns.length,
                fixesAvailable: suggestedFixes.length,
                confidenceScore,
                handlerName: "TrainBrainRunner",
              }
            );
          }
        }
      } catch (brainError) {
        console.warn(
          "🧠 Brain learning failed during pattern testing:",
          brainError
        );
      }

      return {
        similarPatterns,
        suggestedFixes,
        confidenceScore,
        patternsFound: similarPatterns.length,
        fixesAvailable: suggestedFixes.length,
      };
    } catch (error) {
      throw new Error(
        `Pattern testing failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * 🔄 Perform cross-validation between digest and autofix results
   */
  private async performCrossValidation(
    digestResults: DigestResults,
    autofixResults: any
  ): Promise<number> {
    let validationScore = 0;

    // Check if digest patterns can help with autofix scenarios
    const digestPatterns = digestResults.trainingData;
    const componentPatterns = digestPatterns.filter(
      (p) => p.type === "component"
    );

    if (componentPatterns.length > 0 && autofixResults.avgMatchScore > 0.7) {
      validationScore += 0.3;
    }

    // Check if autofix improvements align with digest insights
    if (
      autofixResults.totalFixes > 0 &&
      digestResults.learningInsights.length > 0
    ) {
      validationScore += 0.4;
    }

    // Check pattern complexity alignment
    const avgDigestComplexity =
      digestPatterns.reduce((sum, p) => sum + p.complexity, 0) /
      digestPatterns.length;
    if (avgDigestComplexity > 2 && autofixResults.avgMatchScore > 0.6) {
      validationScore += 0.3;
    }

    return Math.min(1.0, validationScore);
  }

  /**
   * 🧪 Test pattern application capabilities
   */
  private async testPatternApplication(): Promise<string[]> {
    const appliedPatterns: string[] = [];

    try {
      const digestStats = this.digestLearner.getTrainingStats();
      const patternTypes = Object.keys(digestStats.patternsByType);

      for (const patternType of patternTypes) {
        if (digestStats.patternsByType[patternType] >= 3) {
          appliedPatterns.push(`${patternType}-patterns-ready`);
        }
      }

      return appliedPatterns;
    } catch (error) {
      console.warn("Pattern application test failed:", error);
      return [];
    }
  }

  // ===== CONFIG MANAGEMENT METHODS =====

  /**
   * 📂 Load configuration from JSON file (sync version for constructor)
   */
  private loadConfigSync(): void {
    const configPath = this.getConfigPath();

    try {
      if (fs.existsSync(configPath)) {
        const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));

        // Merge loaded config with defaults (in case new settings were added)
        this.config = {
          enableDigestLearning: configData.enableDigestLearning ?? true,
          enableAutofixTraining: configData.enableAutofixTraining ?? true,
          batchSize: configData.batchSize ?? 10,
          confidenceThreshold: configData.confidenceThreshold ?? 0.7,
          saveIntermediateResults: configData.saveIntermediateResults ?? true,
          autoValidation: configData.autoValidation ?? true,
        };

        console.log(`⚙️ Configuration loaded: ${configPath}`);
      } else {
        console.log("⚙️ No saved config found, using defaults");
        // Save defaults to create initial config file (sync version)
        this.saveConfigSync();
      }
    } catch (error) {
      console.warn("Failed to load configuration, using defaults:", error);
      // Keep the default config if loading fails
    }
  }

  /**
   * 💾 Save current configuration to JSON file (sync version)
   */
  private saveConfigSync(): void {
    const configPath = this.getConfigPath();

    console.log(
      `🔍 DEBUGGING SYNC: Attempting to save config to: ${configPath}`
    ); // ← ADD DEBUGGING

    try {
      const configData = {
        ...this.config,
        lastUpdated: new Date().toISOString(),
        version: "v20",
      };

      fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
      console.log(
        `✅ DEBUGGING SYNC: Configuration successfully saved to: ${configPath}`
      ); // ← ADD DEBUGGING
    } catch (error) {
      console.error(
        `❌ DEBUGGING SYNC: Failed to save configuration to ${configPath}:`,
        error
      ); // ← ADD DEBUGGING
      console.warn(
        `Failed to save configuration: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * 💾 Save current configuration to JSON file
   */
  private async saveConfig(): Promise<void> {
    const configPath = this.getConfigPath();

    console.log(`🔍 DEBUGGING: Attempting to save config to: ${configPath}`); // ← ADD DEBUGGING

    try {
      const configData = {
        ...this.config,
        lastUpdated: new Date().toISOString(),
        version: "v20",
      };

      fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));
      console.log(
        `✅ DEBUGGING: Configuration successfully saved to: ${configPath}`
      ); // ← ADD DEBUGGING
    } catch (error) {
      console.error(
        `❌ DEBUGGING: Failed to save configuration to ${configPath}:`,
        error
      ); // ← ADD DEBUGGING
      console.warn(
        `Failed to save configuration: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * 📂 Load configuration from JSON file
   */
  private loadConfig(): void {
    const configPath = this.getConfigPath();

    try {
      if (fs.existsSync(configPath)) {
        const configData = JSON.parse(fs.readFileSync(configPath, "utf8"));

        // Merge loaded config with defaults (in case new settings were added)
        this.config = {
          enableDigestLearning: configData.enableDigestLearning ?? true,
          enableAutofixTraining: configData.enableAutofixTraining ?? true,
          batchSize: configData.batchSize ?? 10,
          confidenceThreshold: configData.confidenceThreshold ?? 0.7,
          saveIntermediateResults: configData.saveIntermediateResults ?? true,
          autoValidation: configData.autoValidation ?? true,
        };

        console.log(`⚙️ Configuration loaded: ${configPath}`);
      } else {
        console.log("⚙️ No saved config found, using defaults");
        this.saveConfigSync(); // Save defaults to create initial config file
      }
    } catch (error) {
      console.warn("Failed to load configuration, using defaults:", error);
      // Keep the default config if loading fails
    }
  }

  /**
   * 🔧 Update configuration and save to file
   */
  public async updateConfig(updates: Partial<TrainingConfig>): Promise<void> {
    this.config = { ...this.config, ...updates };
    await this.saveConfig();
    console.log("⚙️ Configuration updated:", updates);
  }

  /**
   * 📍 Get configuration file path
   */
  private getConfigPath(): string {
    return path.join(this.trainingDir, "config", "training-config.json");
  }

  /**
   * 🔄 Reset configuration to defaults
   */
  public async resetConfigToDefaults(): Promise<void> {
    this.config = {
      enableDigestLearning: true,
      enableAutofixTraining: true,
      batchSize: 10,
      confidenceThreshold: 0.7,
      saveIntermediateResults: true,
      autoValidation: true,
    };
    await this.saveConfig();
    console.log("⚙️ Configuration reset to defaults");
  }

  /**
   * 📊 Get current configuration
   */
  public getConfig(): TrainingConfig {
    return { ...this.config };
  }

  // ===== HELPER METHODS =====

  private calculateDigestConfidenceBoost(results: DigestResults): number {
    const baseBoost = Math.min(5, results.patternsExtracted * 0.1);
    const complexityBonus =
      results.trainingData.reduce((sum, p) => sum + p.complexity, 0) * 0.02;
    const insightBonus = results.learningInsights.length * 0.3;

    return Math.min(10, baseBoost + complexityBonus + insightBonus);
  }

  private calculateAutofixConfidenceBoost(results: any): number {
    const matchScoreBonus = results.avgMatchScore * 3;
    const fixCountBonus = Math.min(3, results.totalFixes * 0.1);

    return Math.min(10, matchScoreBonus + fixCountBonus);
  }

  private calculateCombinedConfidenceBoost(
    results: CombinedTrainingResults
  ): number {
    const digestBoost = this.calculateDigestConfidenceBoost(
      results.digestResults
    );
    const autofixBoost = this.calculateAutofixConfidenceBoost(
      results.autofixResults
    );
    const crossValidationBonus = results.crossValidationScore * 2;
    const newCapabilityBonus = results.newCapabilities.length * 0.5;

    return Math.min(
      15,
      digestBoost + autofixBoost + crossValidationBonus + newCapabilityBonus
    );
  }

  private calculatePatternConfidence(
    patterns: any[],
    autofixResult: AutoFixResult
  ): number {
    const patternCount = patterns.length;
    const avgPatternConfidence =
      patterns.reduce((sum, p) => sum + (p.confidence || 0.5), 0) /
      (patternCount || 1);
    const autofixConfidence = autofixResult.confidenceBoost || 0;

    return Math.min(10, avgPatternConfidence * 5 + autofixConfidence * 0.5);
  }

  private detectNewCapabilities(
    digestResults: DigestResults,
    autofixResults: any
  ): string[] {
    const capabilities: string[] = [];

    // Audio pattern capabilities
    const audioPatterns = digestResults.trainingData.filter(
      (p) => p.type === "audio-sync" || p.type === "playback"
    );
    if (audioPatterns.length >= 3) {
      capabilities.push("advanced-audio-handling");
    }

    // Component architecture capabilities
    const componentPatterns = digestResults.trainingData.filter(
      (p) => p.type === "component"
    );
    if (componentPatterns.length >= 10) {
      capabilities.push("complex-component-architecture");
    }

    // Auto-fix capabilities
    if (autofixResults.avgMatchScore > 0.8) {
      capabilities.push("high-accuracy-autofix");
    }

    return capabilities;
  }

  // ===== FILE OPERATIONS =====

  private ensureTrainingDirectories(): void {
    const directories = [
      this.trainingDir,
      path.join(this.trainingDir, "sessions"),
      path.join(this.trainingDir, "config"),
      path.join(this.trainingDir, "songsterr"), // 🆕 Ensure songsterr folder exists
      // 🆕 FIXED: Add complete autofixer directory structure
      path.join(this.trainingDir, "autofixer"),
      path.join(this.trainingDir, "autofixer", "broken"),
      path.join(this.trainingDir, "autofixer", "expected"),
      path.join(this.trainingDir, "autofixer", "results"),
    ];

    directories.forEach((dir) => {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`📁 Created directory: ${dir}`);
        }
      } catch (error) {
        console.warn(
          `Failed to create directory ${dir}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    });
  }

  private async saveSession(session: TrainingSession): Promise<void> {
    const filename = `session-${session.id}.json`;
    const filepath = path.join(this.trainingDir, "sessions", filename);

    try {
      // 🆕 Add version tracking to session files
      const sessionWithVersion = {
        ...session,
        handlerVersion: "TrainBrainRunner-v20",
        timestamp: new Date().toISOString(),
        generatedBy: "TrainBrainRunner-v20 (August 16th, 2025)",
      };

      fs.writeFileSync(filepath, JSON.stringify(sessionWithVersion, null, 2));
      console.log(`💾 Session saved: ${filepath}`);
    } catch (error) {
      console.warn(
        `Failed to save training session: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private loadTrainingHistory(): void {
    const sessionsDir = path.join(this.trainingDir, "sessions");

    try {
      if (fs.existsSync(sessionsDir)) {
        const sessionFiles = fs
          .readdirSync(sessionsDir)
          .filter((f) => f.endsWith(".json"));

        for (const file of sessionFiles) {
          const filepath = path.join(sessionsDir, file);
          const sessionData = JSON.parse(fs.readFileSync(filepath, "utf8"));
          this.sessionsHistory.push(sessionData);
        }

        // Sort by timestamp
        this.sessionsHistory.sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      }
    } catch (error) {
      console.warn("Failed to load training history:", error);
    }
  }

  // ===== PUBLIC INTERFACE =====

  /**
   * 📊 Generate comprehensive training report
   */
  generateTrainingReport(): string {
    const totalSessions = this.sessionsHistory.length;
    const successfulSessions = this.sessionsHistory.filter(
      (s) => s.success
    ).length;
    const totalPatterns = this.sessionsHistory.reduce(
      (sum, s) => sum + s.patternsLearned,
      0
    );
    const avgConfidenceBoost =
      this.sessionsHistory.reduce((sum, s) => sum + s.confidenceBoost, 0) /
      (totalSessions || 1);

    const digestStats = this.digestLearner.getTrainingStats();
    const recentSessions = this.sessionsHistory.slice(-5);

    return `# 🧠 Cipher Brain Training Report v20

## Overall Training Status
- **Total Training Sessions**: ${totalSessions}
- **Successful Sessions**: ${successfulSessions} (${Math.round((successfulSessions / (totalSessions || 1)) * 100)}%)
- **Total Patterns Learned**: ${totalPatterns}
- **Average Confidence Boost**: ${avgConfidenceBoost.toFixed(1)}%

## Digest Learning Statistics
- **Patterns by Type**: ${Object.entries(digestStats.patternsByType)
      .map(([type, count]) => `${type}: ${count}`)
      .join(", ")}
- **Average Pattern Complexity**: ${digestStats.avgComplexity.toFixed(1)}/5
- **Top Tags**: ${digestStats.topTags.slice(0, 5).join(", ")}

## Recent Training Sessions
${recentSessions.map((session) => `- **${session.id}** (${session.type}): ${session.patternsLearned} patterns, +${session.confidenceBoost.toFixed(1)}% confidence`).join("\n")}

## Current Training Configuration
- **Digest Learning**: ${this.config.enableDigestLearning ? "✅ Enabled" : "❌ Disabled"}
- **Autofix Training**: ${this.config.enableAutofixTraining ? "✅ Enabled" : "❌ Disabled"}
- **Batch Size**: ${this.config.batchSize} files
- **Confidence Threshold**: ${(this.config.confidenceThreshold * 100).toFixed(0)}%
- **Save Intermediate Results**: ${this.config.saveIntermediateResults ? "✅ Yes" : "❌ No"}
- **Auto Validation**: ${this.config.autoValidation ? "✅ Yes" : "❌ No"}

## Training Capabilities Acquired
${this.getAcquiredCapabilities()
  .map((cap) => `✅ ${cap}`)
  .join("\n")}

---
*Generated: ${new Date().toISOString()}*
*Training Directory: ${this.trainingDir}*
*Brain v20 Status: Active*
*Handler Version: TrainBrainRunner-v20*`;
  }

  private getAcquiredCapabilities(): string[] {
    const capabilities: string[] = [];
    const digestStats = this.digestLearner.getTrainingStats();

    if (digestStats.patternsByType["component"] >= 10)
      capabilities.push("Advanced React Component Patterns");
    if (digestStats.patternsByType["hook"] >= 5)
      capabilities.push("Custom Hook Architecture");
    if (digestStats.patternsByType["audio-sync"] >= 3)
      capabilities.push("Audio Synchronization Logic");
    if (digestStats.patternsByType["loop-logic"] >= 3)
      capabilities.push("Loop and Timing Control");

    const successfulAutofixSessions = this.sessionsHistory.filter(
      (s) => s.type === "autofix" && s.success
    ).length;
    if (successfulAutofixSessions >= 3)
      capabilities.push("Automated Code Fixing");

    capabilities.push("Brain v20 Advanced Training Pipeline");

    return capabilities;
  }
}

// ===== HANDLER FUNCTIONS (Following Your Pattern) =====

/**
 * 📖 Train Brain: Digest Songsterr PDF Handler
 * FIXED: Uses proper brain interface integration + v20 support
 */
export async function trainBrainDigestHandler(): Promise<void> {
  try {
    vscode.window.showInformationMessage(
      "📖 Initializing brain digest training..."
    );

    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      vscode.window.showWarningMessage("Brain interface not available");
      return;
    }

    // 🔧 FIXED: More reliable extension path resolution with debugging
    let actualExtensionPath: string | undefined;

    console.log("🔍 DEBUGGING: Starting extension path resolution...");

    // Try multiple approaches to get extension path
    const extension = vscode.extensions.getExtension("cipher-autonomous-dev");
    console.log(
      `🔍 DEBUGGING: Extension lookup result:`,
      extension ? "FOUND" : "NOT FOUND"
    );

    if (extension) {
      actualExtensionPath = extension.extensionPath;
      console.log(
        `🔍 DEBUGGING: Extension path from direct lookup: ${actualExtensionPath}`
      );
    } else {
      // Fallback: look for the extension in all extensions
      console.log(
        "🔍 DEBUGGING: Trying fallback - searching all extensions..."
      );
      const allExtensions = vscode.extensions.all;
      console.log(
        `🔍 DEBUGGING: Total extensions found: ${allExtensions.length}`
      );

      const cipherExtension = allExtensions.find((ext) => {
        const match =
          ext.id.includes("cipher-autonomous-dev") ||
          ext.packageJSON?.name === "cipher-autonomous-dev";
        if (match) {
          console.log(`🔍 DEBUGGING: Found matching extension: ${ext.id}`);
        }
        return match;
      });

      if (cipherExtension) {
        actualExtensionPath = cipherExtension.extensionPath;
        console.log(
          `🔍 DEBUGGING: Extension path from fallback: ${actualExtensionPath}`
        );
      } else {
        console.log("🔍 DEBUGGING: No matching extension found in fallback");
      }
    }

    if (!actualExtensionPath) {
      console.error("🔍 DEBUGGING: Extension path resolution FAILED");
      vscode.window.showErrorMessage("Extension path not found");
      return;
    }

    console.log(`✅ DEBUGGING: Using extension path: ${actualExtensionPath}`);

    const runner = new TrainBrainRunner(brainInterface, actualExtensionPath);

    // 🔧 FIXED: Let the runner auto-detect the content file
    const session = await runner.runDigestOnlyTraining();

    vscode.window.showInformationMessage(
      `🎉 Digest training complete! Learned ${session.patternsLearned} patterns.`
    );

    // Report handler completion to brain
    try {
      if (isBrainAvailable()) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
          await brainInterface.learnFromAction(
            "digest-handler-complete",
            "success",
            {
              handlerName: "trainBrainDigestHandler",
              sessionId: session.id,
              patternsLearned: session.patternsLearned,
            }
          );
        }
      }
    } catch (brainError) {
      console.warn("🧠 Brain learning failed in handler:", brainError);
    }
  } catch (error) {
    console.error("🔍 DEBUGGING: Digest training error:", error);
    vscode.window.showErrorMessage(`Digest training failed: ${error}`);
  }
}

/**
 * 🔧 Train Brain: Auto-Fix Files Handler
 * FIXED: Uses proper brain interface integration + v20 support
 */
export async function trainBrainAutofixHandler(): Promise<void> {
  try {
    vscode.window.showInformationMessage(
      "🔧 Initializing brain autofix training..."
    );

    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      vscode.window.showWarningMessage("Brain interface not available");
      return;
    }

    // 🔧 FIXED: More reliable extension path resolution
    let actualExtensionPath: string | undefined;

    // Try multiple approaches to get extension path
    const extension = vscode.extensions.getExtension("cipher-autonomous-dev");
    if (extension) {
      actualExtensionPath = extension.extensionPath;
    } else {
      // Fallback: look for the extension in all extensions
      const allExtensions = vscode.extensions.all;
      const cipherExtension = allExtensions.find(
        (ext) =>
          ext.id.includes("cipher-autonomous-dev") ||
          ext.packageJSON?.name === "cipher-autonomous-dev"
      );
      if (cipherExtension) {
        actualExtensionPath = cipherExtension.extensionPath;
      }
    }

    if (!actualExtensionPath) {
      vscode.window.showErrorMessage("Extension path not found");
      return;
    }

    console.log(`✅ Using extension path: ${actualExtensionPath}`);

    const runner = new TrainBrainRunner(brainInterface, actualExtensionPath);

    // 🔧 FIXED: Let the runner auto-detect the autofix directory
    const session = await runner.runAutofixOnlyTraining();

    vscode.window.showInformationMessage(
      `🔧 Auto-fix training complete! Processed ${session.patternsLearned} fixes.`
    );

    // Report handler completion to brain
    try {
      if (isBrainAvailable()) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
          await brainInterface.learnFromAction(
            "autofix-handler-complete",
            "success",
            {
              handlerName: "trainBrainAutofixHandler",
              sessionId: session.id,
              fixesProcessed: session.patternsLearned,
            }
          );
        }
      }
    } catch (brainError) {
      console.warn("🧠 Brain learning failed in handler:", brainError);
    }
  } catch (error) {
    console.error("Auto-fix training error:", error);
    vscode.window.showErrorMessage(`Auto-fix training failed: ${error}`);
  }
}

/**
 * 🚀 Train Brain: Complete Pipeline Handler
 * FIXED: Uses proper brain interface integration + v20 support
 */
export async function trainBrainCompleteHandler(): Promise<void> {
  try {
    vscode.window.showInformationMessage(
      "🚀 Initializing complete brain training pipeline..."
    );

    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      vscode.window.showWarningMessage("Brain interface not available");
      return;
    }

    // 🔧 FIXED: More reliable extension path resolution
    let actualExtensionPath: string | undefined;

    // Try multiple approaches to get extension path
    const extension = vscode.extensions.getExtension("cipher-autonomous-dev");
    if (extension) {
      actualExtensionPath = extension.extensionPath;
    } else {
      // Fallback: look for the extension in all extensions
      const allExtensions = vscode.extensions.all;
      const cipherExtension = allExtensions.find(
        (ext) =>
          ext.id.includes("cipher-autonomous-dev") ||
          ext.packageJSON?.name === "cipher-autonomous-dev"
      );
      if (cipherExtension) {
        actualExtensionPath = cipherExtension.extensionPath;
      }
    }

    if (!actualExtensionPath) {
      vscode.window.showErrorMessage("Extension path not found");
      return;
    }

    console.log(`✅ Using extension path: ${actualExtensionPath}`);

    const runner = new TrainBrainRunner(brainInterface, actualExtensionPath);

    // 🔧 FIXED: Auto-detect both content and autofix paths
    const session = await runner.runCompletePipeline();

    vscode.window.showInformationMessage(
      `🚀 Complete training done! ${session.patternsLearned} patterns learned, +${session.confidenceBoost.toFixed(1)} confidence boost.`
    );

    // Report handler completion to brain
    try {
      if (isBrainAvailable()) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
          await brainInterface.learnFromAction(
            "complete-pipeline-handler-complete",
            "success",
            {
              handlerName: "trainBrainCompleteHandler",
              sessionId: session.id,
              totalPatterns: session.patternsLearned,
              confidenceBoost: session.confidenceBoost,
            }
          );
        }
      }
    } catch (brainError) {
      console.warn("🧠 Brain learning failed in handler:", brainError);
    }
  } catch (error) {
    console.error("Complete training error:", error);
    vscode.window.showErrorMessage(`Complete training failed: ${error}`);
  }
}

/**
 * 📊 Show Training Report Handler
 * FIXED: Uses proper brain interface integration + v20 support
 */
export async function showTrainingReportHandler(): Promise<void> {
  try {
    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      vscode.window.showWarningMessage("Brain interface not available");
      return;
    }

    // 🔧 FIXED: More reliable extension path resolution
    let actualExtensionPath: string | undefined;

    // Try multiple approaches to get extension path
    const extension = vscode.extensions.getExtension("cipher-autonomous-dev");
    if (extension) {
      actualExtensionPath = extension.extensionPath;
    } else {
      // Fallback: look for the extension in all extensions
      const allExtensions = vscode.extensions.all;
      const cipherExtension = allExtensions.find(
        (ext) =>
          ext.id.includes("cipher-autonomous-dev") ||
          ext.packageJSON?.name === "cipher-autonomous-dev"
      );
      if (cipherExtension) {
        actualExtensionPath = cipherExtension.extensionPath;
      }
    }

    if (!actualExtensionPath) {
      vscode.window.showErrorMessage("Extension path not found");
      return;
    }

    const runner = new TrainBrainRunner(brainInterface, actualExtensionPath);
    const report = runner.generateTrainingReport();

    // Show in new document
    const doc = await vscode.workspace.openTextDocument({
      content: report,
      language: "markdown",
    });

    await vscode.window.showTextDocument(doc);

    // Report handler completion to brain
    try {
      if (isBrainAvailable()) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
          await brainInterface.learnFromAction(
            "training-report-handler-complete",
            "success",
            {
              handlerName: "showTrainingReportHandler",
              reportGenerated: true,
            }
          );
        }
      }
    } catch (brainError) {
      console.warn("🧠 Brain learning failed in handler:", brainError);
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to generate report: ${error}`);
  }
}

/**
 * ⚙️ Training Configuration Manager Handler
 * FIXED: Uses proper brain interface integration + v20 support
 */
export async function manageTrainingConfigHandler(): Promise<void> {
  try {
    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      vscode.window.showWarningMessage("Brain interface not available");
      return;
    }

    // Get extension path
    let actualExtensionPath: string | undefined;
    const extension = vscode.extensions.getExtension("cipher-autonomous-dev");
    if (extension) {
      actualExtensionPath = extension.extensionPath;
    } else {
      const allExtensions = vscode.extensions.all;
      const cipherExtension = allExtensions.find(
        (ext) =>
          ext.id.includes("cipher-autonomous-dev") ||
          ext.packageJSON?.name === "cipher-autonomous-dev"
      );
      if (cipherExtension) {
        actualExtensionPath = cipherExtension.extensionPath;
      }
    }

    if (!actualExtensionPath) {
      vscode.window.showErrorMessage("Extension path not found");
      return;
    }

    const runner = new TrainBrainRunner(brainInterface, actualExtensionPath);
    const currentConfig = runner.getConfig();

    // Show current config and options
    const actions = [
      "📊 View Current Config",
      "🔧 Enable/Disable Digest Learning",
      "⚡ Enable/Disable Autofix Training",
      "📏 Change Batch Size",
      "🎯 Adjust Confidence Threshold",
      "🔄 Reset to Defaults",
    ];

    const selectedAction = await vscode.window.showQuickPick(actions, {
      placeHolder: "Choose configuration action",
    });

    if (!selectedAction) return;

    switch (selectedAction) {
      case "📊 View Current Config":
        const configReport = `# 🧠 Training Configuration

**Current Settings:**
- Digest Learning: ${currentConfig.enableDigestLearning ? "✅ Enabled" : "❌ Disabled"}
- Autofix Training: ${currentConfig.enableAutofixTraining ? "✅ Enabled" : "❌ Disabled"}
- Batch Size: ${currentConfig.batchSize} files
- Confidence Threshold: ${(currentConfig.confidenceThreshold * 100).toFixed(0)}%
- Save Intermediate Results: ${currentConfig.saveIntermediateResults ? "✅ Yes" : "❌ No"}
- Auto Validation: ${currentConfig.autoValidation ? "✅ Yes" : "❌ No"}

*Configuration file: training-config.json*`;

        const doc = await vscode.workspace.openTextDocument({
          content: configReport,
          language: "markdown",
        });
        await vscode.window.showTextDocument(doc);
        break;

      case "🔧 Enable/Disable Digest Learning":
        await runner.updateConfig({
          enableDigestLearning: !currentConfig.enableDigestLearning,
        });
        vscode.window.showInformationMessage(
          `Digest Learning ${!currentConfig.enableDigestLearning ? "enabled" : "disabled"}`
        );
        break;

      case "⚡ Enable/Disable Autofix Training":
        await runner.updateConfig({
          enableAutofixTraining: !currentConfig.enableAutofixTraining,
        });
        vscode.window.showInformationMessage(
          `Autofix Training ${!currentConfig.enableAutofixTraining ? "enabled" : "disabled"}`
        );
        break;

      case "📏 Change Batch Size":
        const batchSizeInput = await vscode.window.showInputBox({
          prompt: "Enter new batch size (number of files to process together)",
          value: currentConfig.batchSize.toString(),
          validateInput: (value) => {
            const num = parseInt(value);
            if (isNaN(num) || num < 1 || num > 100) {
              return "Please enter a number between 1 and 100";
            }
            return null;
          },
        });

        if (batchSizeInput) {
          await runner.updateConfig({ batchSize: parseInt(batchSizeInput) });
          vscode.window.showInformationMessage(
            `Batch size set to ${batchSizeInput}`
          );
        }
        break;

      case "🎯 Adjust Confidence Threshold":
        const thresholdInput = await vscode.window.showInputBox({
          prompt: "Enter confidence threshold (0-100%)",
          value: (currentConfig.confidenceThreshold * 100).toString(),
          validateInput: (value) => {
            const num = parseFloat(value);
            if (isNaN(num) || num < 0 || num > 100) {
              return "Please enter a number between 0 and 100";
            }
            return null;
          },
        });

        if (thresholdInput) {
          await runner.updateConfig({
            confidenceThreshold: parseFloat(thresholdInput) / 100,
          });
          vscode.window.showInformationMessage(
            `Confidence threshold set to ${thresholdInput}%`
          );
        }
        break;

      case "🔄 Reset to Defaults":
        const confirm = await vscode.window.showWarningMessage(
          "Reset all training configuration to defaults?",
          "Yes",
          "Cancel"
        );

        if (confirm === "Yes") {
          await runner.resetConfigToDefaults();
          vscode.window.showInformationMessage(
            "Configuration reset to defaults"
          );
        }
        break;
    }

    // Report config management to brain
    try {
      if (isBrainAvailable()) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
          await brainInterface.learnFromAction(
            "config-management-complete",
            "success",
            {
              handlerName: "manageTrainingConfigHandler",
              action: selectedAction,
              currentConfig: runner.getConfig(),
            }
          );
        }
      }
    } catch (brainError) {
      console.warn("🧠 Brain learning failed in config handler:", brainError);
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Configuration management failed: ${error}`);
  }
}

/**
 * 🎯 Test Learned Patterns Handler
 * FIXED: Uses proper brain interface integration + v20 support
 */
export async function testLearnedPatternsHandler(): Promise<void> {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active editor found");
      return;
    }

    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      vscode.window.showWarningMessage("Brain interface not available");
      return;
    }

    // 🔧 FIXED: More reliable extension path resolution
    let actualExtensionPath: string | undefined;

    // Try multiple approaches to get extension path
    const extension = vscode.extensions.getExtension("cipher-autonomous-dev");
    if (extension) {
      actualExtensionPath = extension.extensionPath;
    } else {
      // Fallback: look for the extension in all extensions
      const allExtensions = vscode.extensions.all;
      const cipherExtension = allExtensions.find(
        (ext) =>
          ext.id.includes("cipher-autonomous-dev") ||
          ext.packageJSON?.name === "cipher-autonomous-dev"
      );
      if (cipherExtension) {
        actualExtensionPath = cipherExtension.extensionPath;
      }
    }

    if (!actualExtensionPath) {
      vscode.window.showErrorMessage("Extension path not found");
      return;
    }

    const runner = new TrainBrainRunner(brainInterface, actualExtensionPath);
    const code = editor.document.getText();
    const results = await runner.testLearnedPatterns(code);

    const message = `🎯 Pattern Test Results:
- Similar patterns found: ${results.similarPatterns.length}
- Suggested fixes: ${results.suggestedFixes.length}
- Confidence score: ${results.confidenceScore.toFixed(1)}`;

    vscode.window.showInformationMessage(message);

    // Report handler completion to brain
    try {
      if (isBrainAvailable()) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
          await brainInterface.learnFromAction(
            "pattern-test-handler-complete",
            "success",
            {
              handlerName: "testLearnedPatternsHandler",
              patternsFound: results.similarPatterns.length,
              confidenceScore: results.confidenceScore,
            }
          );
        }
      }
    } catch (brainError) {
      console.warn("🧠 Brain learning failed in handler:", brainError);
    }
  } catch (error) {
    vscode.window.showErrorMessage(`Pattern testing failed: ${error}`);
  }
}
