// 🧠 DigestAndLearn Handler - Songsterr PDF Training System v2 FIXED Aug 14th, 2025
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/intelligence/digestAndLearn.ts
//
// 🏗️ ARCHITECTURE CLARIFICATION:
// - DigestAndLearn = Studies Songsterr content, learns patterns, extracts knowledge
// - Training Content Input = cipher-engine-clean-v2/ai-team-input/ (Cipher root)
// - Analysis Results Output = .vscode-extensions/.../brain/training/songsterr/ (Extension)
//
// 🔧 BrainFixer.ts handles broken file auto-fixing (separate system!)
//
// 🧠 BRAIN INTEGRATION:
// - getBrainInterface() returns BrainConnector | null
// - BrainConnector.learnFromAction(actionType: string, result: string, context: object)
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// ✅ FIXED: Use proper import pattern following other handlers
import { getBrainInterface, isBrainAvailable } from "../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced (for type reference only)
import { BrainConnector } from "../../brain/BrainConnector";

export interface TrainingPattern {
  id: string;
  type:
    | "component"
    | "hook"
    | "playback"
    | "module"
    | "pattern"
    | "audio-sync"
    | "loop-logic";
  code: string;
  description: string;
  tags: string[];
  complexity: number; // 1-5 scale
  confidence: number;
  sourceFile: string;
  lineNumber?: number;
  dependencies?: string[];
}

export interface DigestResults {
  patternsExtracted: number;
  codeBlocksFound: number;
  modulesIdentified: string[];
  learningInsights: string[];
  trainingData: TrainingPattern[];
}

/**
 * 🧠 DigestAndLearn - Songsterr Content Analysis & Pattern Learning System
 * Converts Songsterr content into machine-readable training patterns
 * SCOPE: Content study, pattern extraction, knowledge learning
 * NOTE: Auto-fixing broken code is handled by BrainFixer.ts (separate system)
 */
export class DigestAndLearn {
  private brainConnector: BrainConnector; // Keep for compatibility but don't use for learning
  private trainingDir: string; // Extension training dir (for results/infrastructure)
  private cipherRootDir: string = ""; // Initialize to prevent TS error // Cipher root dir (for training content)
  private trainingContentDir: string; // Cipher root ai-team-input dir
  private patternsLearned: Map<string, TrainingPattern> = new Map();

  constructor(brainConnector: BrainConnector, extensionPath: string) {
    this.brainConnector = brainConnector;

    // ✅ FIXED: Use workspace detection for cipher root (like brainFixer.ts)
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      this.cipherRootDir = workspaceFolders[0].uri.fsPath;
      console.log(
        `🔍 [v20] DigestAndLearn using workspace root: ${this.cipherRootDir}`
      );
    } else {
      console.log(
        `🔍 [v20] DigestAndLearn using extension-based root: ${this.cipherRootDir}`
      );
    }

    // ✅ CORRECTED: Training infrastructure in extension
    this.trainingDir = path.join(
      this.cipherRootDir,
      ".vscode-extensions",
      "cipher-autonomous-dev",
      "src",
      "brain",
      "training",
      "songsterr"
    );

    // ✅ CORRECTED: Training content in Cipher root
    this.trainingContentDir = path.join(this.cipherRootDir, "ai-team-input");

    this.ensureTrainingDirectory();

    // ✅ FIXED: Removed vscode dependency for logging
    console.log(`🏗️ DigestAndLearn Content Study System setup:
      - Analysis results dir: ${this.trainingDir}
      - Cipher root dir: ${this.cipherRootDir}
      - Training content dir: ${this.trainingContentDir}
      - Scope: Content analysis & pattern learning (NOT auto-fixing)`);
  }

  // ===== MAIN DIGEST FUNCTION =====

  /**
   * 📖 Digest Songsterr PDF content and extract learning patterns
   * FIXED: Proper brain interface usage and file path resolution
   */
  async digestSongsterrContent(filePath?: string): Promise<DigestResults> {
    try {
      // ✅ ADDED: User feedback like other handlers
      vscode.window.showInformationMessage(
        "🧠 Starting Songsterr content analysis..."
      );

      // ✅ FIXED: Smart file path resolution
      const actualFilePath = await this.resolveTrainingFilePath(filePath);
      console.log(`📖 Starting digest of: ${actualFilePath}`);

      const content = await this.readTrainingFile(actualFilePath);
      console.log(`📄 Read ${content.length} characters from training file`);

      const results: DigestResults = {
        patternsExtracted: 0,
        codeBlocksFound: 0,
        modulesIdentified: [],
        learningInsights: [],
        trainingData: [],
      };

      // Extract different types of patterns
      const codeBlocks = this.extractCodeBlocks(content);
      results.codeBlocksFound = codeBlocks.length;
      console.log(`🔍 Found ${codeBlocks.length} code blocks`);

      for (const block of codeBlocks) {
        const patterns = await this.analyzeCodeBlock(block, actualFilePath);
        results.trainingData.push(...patterns);
        results.patternsExtracted += patterns.length;
      }

      // Identify modular architecture patterns
      const modules = this.identifyModularPatterns(content);
      results.modulesIdentified = modules;
      console.log(
        `🏗️ Identified ${modules.length} modules: ${modules.slice(0, 5).join(", ")}${modules.length > 5 ? "..." : ""}`
      );

      // Extract audio/playback specific logic
      const audioPatterns = this.extractAudioPatterns(content);
      results.trainingData.push(...audioPatterns);
      console.log(`🎵 Found ${audioPatterns.length} audio patterns`);

      // Extract loop and timing patterns
      const loopPatterns = this.extractLoopPatterns(content);
      results.trainingData.push(...loopPatterns);
      console.log(`🔄 Found ${loopPatterns.length} loop patterns`);

      // Generate learning insights
      results.learningInsights = this.generateLearningInsights(
        results.trainingData
      );

      // Store patterns in brain learning system
      await this.storeInBrainLearning(results.trainingData);

      // Save training data for future reference
      await this.saveTrainingData(results);

      // ✅ FIXED: Use proper brain interface following other handlers
      // 🧠 v20 CRITICAL FIX: Brain initialization before digest learning
      console.log(`🧠 [v20] CRITICAL FIX: Calling initializeBrainSystem()...`);
      try {
        const { initializeBrainSystem } = await import("../../shared/utils");
        const initialized = await initializeBrainSystem();
        console.log(
          `🧠 [v20] digestAndLearn brain initialization result: ${initialized ? "✅ SUCCESS" : "❌ FAILED"}`
        );

        if (!initialized) {
          console.log(`🧠 [v20] Brain not available for digest learning`);
        }
      } catch (initError) {
        console.log(`🧠 [v20] Brain initialization failed: ${initError}`);
      }
      try {
        if (isBrainAvailable()) {
          const brainInterface = getBrainInterface();
          if (brainInterface) {
            // ✅ CORRECTED: Use correct method name and signature
            await brainInterface.learnFromAction(
              "digest-songsterr-pdf",
              "success",
              {
                patternsFound: results.patternsExtracted,
                complexity: this.calculateAverageComplexity(
                  results.trainingData
                ),
                modules: results.modulesIdentified.length,
                insights: results.learningInsights.length,
                handlerName: "DigestAndLearn",
              }
            );
            console.log("🧠 Successfully reported learning to brain interface");
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
        // Don't throw - continue with digest even if brain learning fails
      }

      // ✅ ADDED: Success feedback to user
      vscode.window.showInformationMessage(
        `✅ Analysis complete: ${results.patternsExtracted} patterns extracted from ${results.codeBlocksFound} code blocks`
      );

      console.log(
        `✅ Digest complete: ${results.patternsExtracted} patterns extracted`
      );
      return results;
    } catch (error) {
      console.error("❌ Digest error:", error);

      // ✅ ADDED: Error feedback to user like other handlers
      vscode.window.showErrorMessage(
        `❌ Failed to analyze Songsterr content: ${error instanceof Error ? error.message : String(error)}`
      );

      // ✅ FIXED: Learn from digest failures using proper interface
      try {
        if (isBrainAvailable()) {
          const brainInterface = getBrainInterface();
          if (brainInterface) {
            // ✅ CORRECTED: Use correct method name and signature
            await brainInterface.learnFromAction(
              "digest-songsterr-pdf",
              "failure",
              {
                error: error instanceof Error ? error.message : String(error),
                filePath: filePath || "unknown",
                handlerName: "DigestAndLearn",
              }
            );
          }
        }
      } catch (brainError) {
        console.warn("🧠 Failed to report error to brain:", brainError);
      }

      throw new Error(
        `Failed to digest Songsterr content: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  // ===== ENHANCED FILE RESOLUTION =====

  /**
   * ✅ REAL ARCHITECTURE: Smart file path resolution - checks actual file locations
   */
  private async resolveTrainingFilePath(filePath?: string): Promise<string> {
    // If specific path provided, try it first
    if (filePath && fs.existsSync(filePath)) {
      return filePath;
    }

    // ✅ REAL PATHS: Check actual training file locations
    const possiblePaths = [
      // 1. Cipher root ai-team-input directory (where training content actually is)
      path.join(this.trainingContentDir, "songsterr-content.txt"),
      path.join(this.trainingContentDir, "maestro-vs-songsterr-comparison.txt"),
      path.join(this.trainingContentDir, "implementation-sources.txt"),

      // 2. Extension training directory (backup/alternative location)
      path.join(this.trainingDir, "songsterr-content.txt"),
      path.join(this.trainingDir, "implementation-sources.txt"),

      // 3. Provided path as-is
      filePath || "",
    ].filter(Boolean);

    for (const testPath of possiblePaths) {
      console.log(`🔍 Checking: ${testPath}`);
      if (fs.existsSync(testPath)) {
        console.log(`✅ Found: ${testPath}`);
        return testPath;
      } else {
        console.log(`❌ Not found: ${testPath}`);
      }
    }

    // If no files found, provide helpful error with REAL paths
    throw new Error(
      `No training files found. Checked locations:\n${possiblePaths.map((p) => `  - ${p}`).join("\n")}\n\n` +
        `Expected training content locations:\n` +
        `  📚 Primary: ${path.join(this.trainingContentDir, "songsterr-content.txt")}\n` +
        `  📚 Alternative: ${path.join(this.trainingContentDir, "maestro-vs-songsterr-comparison.txt")}\n` +
        `  🧠 Backup: ${path.join(this.trainingDir, "songsterr-content.txt")}\n\n` +
        `Note: This handler analyzes content files for learning. For auto-fixing broken code, use BrainFixer.ts instead.`
    );
  }

  // ===== BRAIN INTEGRATION (ENHANCED) =====

  /**
   * 🧠 Enhanced brain learning integration
   * FIXED: Use proper brain interface methods with null checks
   */
  private async storeInBrainLearning(
    patterns: TrainingPattern[]
  ): Promise<void> {
    console.log(
      `🧠 Storing ${patterns.length} patterns in brain learning system...`
    );

    try {
      if (!isBrainAvailable()) {
        console.log("🧠 Brain not available - skipping pattern storage");
        return;
      }

      const brainInterface = getBrainInterface();
      if (!brainInterface) {
        console.log("🧠 Brain interface is null - skipping pattern storage");
        return;
      }

      let storedCount = 0;

      for (const pattern of patterns) {
        try {
          // ✅ CORRECTED: Use proper brain interface method with correct signature
          await brainInterface.learnFromAction(
            `songsterr-${pattern.type}-pattern`,
            "success",
            {
              patternId: pattern.id,
              complexity: pattern.complexity,
              tags: pattern.tags,
              confidence: pattern.confidence,
              dependencies: pattern.dependencies,
              sourceFile: pattern.sourceFile,
              handlerName: "DigestAndLearn",
            }
          );

          this.patternsLearned.set(pattern.id, pattern);
          storedCount++;
        } catch (error) {
          console.warn(
            `Failed to store pattern ${pattern.id} in brain:`,
            error
          );
          // Continue with other patterns
        }
      }

      console.log(
        `✅ Successfully stored ${storedCount}/${patterns.length} patterns in brain`
      );
    } catch (error) {
      console.error("🧠 Brain learning system error:", error);
      // Don't throw - continue without brain learning
    }
  }

  // ===== CODE EXTRACTION METHODS (UNCHANGED) =====

  private extractCodeBlocks(
    content: string
  ): Array<{ text: string; language: string; context: string }> {
    const codeBlocks: Array<{
      text: string;
      language: string;
      context: string;
    }> = [];

    // Regex patterns for different code block formats
    const patterns = [
      // Standard markdown code blocks
      /```(\w+)?\n([\s\S]*?)```/g,
      // Inline code with context
      /`([^`\n]+)`/g,
      // JavaScript/TypeScript patterns
      /(function\s+\w+|const\s+\w+\s*=|class\s+\w+)[\s\S]*?(?=\n\n|\n[A-Z]|\n\d+\.|\n-|\n\*|$)/g,
      // React component patterns
      /(export\s+(?:default\s+)?(?:function|const)\s+\w+|interface\s+\w+)[\s\S]*?(?=\n\n|\n[A-Z]|\n\d+\.|\n-|\n\*|$)/g,
    ];

    let contextWindow = "";
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      contextWindow = lines.slice(Math.max(0, i - 2), i + 3).join("\n");

      patterns.forEach((pattern) => {
        let match;
        const linePattern = new RegExp(pattern.source, pattern.flags);
        while ((match = linePattern.exec(line)) !== null) {
          const codeText = match[2] || match[1] || match[0];
          const language = this.detectLanguage(codeText);

          if (codeText.length > 20) {
            // Filter out very short snippets
            codeBlocks.push({
              text: codeText.trim(),
              language,
              context: contextWindow,
            });
          }
        }
      });
    }

    return codeBlocks;
  }

  private async analyzeCodeBlock(
    block: { text: string; language: string; context: string },
    sourceFile: string
  ): Promise<TrainingPattern[]> {
    const patterns: TrainingPattern[] = [];
    const code = block.text;

    // Component Pattern Analysis
    if (this.isReactComponent(code)) {
      patterns.push({
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "component",
        code,
        description: this.generatePatternDescription(code, "component"),
        tags: this.extractTags(code, "component"),
        complexity: this.calculateComplexity(code),
        confidence: 0.8,
        sourceFile,
        dependencies: this.extractDependencies(code),
      });
    }

    // Hook Pattern Analysis
    if (this.isCustomHook(code)) {
      patterns.push({
        id: `hook-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "hook",
        code,
        description: this.generatePatternDescription(code, "hook"),
        tags: this.extractTags(code, "hook"),
        complexity: this.calculateComplexity(code),
        confidence: 0.85,
        sourceFile,
        dependencies: this.extractDependencies(code),
      });
    }

    // Audio/Playback Pattern Analysis
    if (this.isAudioPattern(code)) {
      patterns.push({
        id: `audio-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: "playback",
        code,
        description: this.generatePatternDescription(code, "audio"),
        tags: this.extractTags(code, "audio"),
        complexity: this.calculateComplexity(code),
        confidence: 0.9,
        sourceFile,
        dependencies: this.extractDependencies(code),
      });
    }

    return patterns;
  }

  // ===== SPECIALIZED PATTERN EXTRACTORS (UNCHANGED) =====

  private extractAudioPatterns(content: string): TrainingPattern[] {
    const patterns: TrainingPattern[] = [];
    const audioKeywords = [
      "AudioContext",
      "createBuffer",
      "createGain",
      "createAnalyser",
      "playback",
      "currentTime",
      "duration",
      "play()",
      "pause()",
      "seekTo",
      "setVolume",
      "audioBuffer",
      "Web Audio API",
      "SVG",
      "interactive",
      "cursor",
      "sync",
    ];

    const audioSections = this.findSectionsWithKeywords(content, audioKeywords);

    audioSections.forEach((section, index) => {
      patterns.push({
        id: `audio-pattern-${Date.now()}-${index}`,
        type: "audio-sync",
        code: section,
        description:
          "Audio playback and synchronization pattern from Songsterr",
        tags: ["audio", "playback", "sync", "timing", "svg"],
        complexity: 4,
        confidence: 0.85,
        sourceFile: "songsterr-audio-patterns",
      });
    });

    return patterns;
  }

  private extractLoopPatterns(content: string): TrainingPattern[] {
    const patterns: TrainingPattern[] = [];
    const loopKeywords = [
      "loop",
      "repeat",
      "setInterval",
      "requestAnimationFrame",
      "while",
      "for",
      "forEach",
      "repeat section",
      "loop mode",
      "beatMarkers",
      "measure",
      "timing",
    ];

    const loopSections = this.findSectionsWithKeywords(content, loopKeywords);

    loopSections.forEach((section, index) => {
      patterns.push({
        id: `loop-pattern-${Date.now()}-${index}`,
        type: "loop-logic",
        code: section,
        description: "Loop and repetition logic pattern from Songsterr",
        tags: ["loop", "timing", "repeat", "control-flow", "musical"],
        complexity: 3,
        confidence: 0.8,
        sourceFile: "songsterr-loop-patterns",
      });
    });

    return patterns;
  }

  private identifyModularPatterns(content: string): string[] {
    const modules: string[] = [];
    const modulePatterns = [
      /module\.exports\s*=\s*(\w+)/g,
      /export\s+(?:default\s+)?(?:class|function|const)\s+(\w+)/g,
      /import\s+.*\s+from\s+['"`]([^'"`]+)['"`]/g,
      /class\s+(\w+)/g,
      /namespace\s+(\w+)/g,
      /interface\s+(\w+)/g,
      /type\s+(\w+)/g,
      /enum\s+(\w+)/g,
    ];

    modulePatterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        if (match[1] && !modules.includes(match[1])) {
          modules.push(match[1]);
        }
      }
    });

    return modules;
  }

  // ===== HELPER METHODS (UNCHANGED) =====

  private detectLanguage(code: string): string {
    if (code.includes("import") && code.includes("export")) return "typescript";
    if (code.includes("useState") || code.includes("useEffect")) return "react";
    if (code.includes("function") || code.includes("const"))
      return "javascript";
    if (code.includes("interface") || code.includes("type "))
      return "typescript";
    if (code.includes("SVG") || code.includes("svg")) return "svg-react";
    return "text";
  }

  private isReactComponent(code: string): boolean {
    return (
      code.includes("export default function") ||
      (code.includes("const ") && code.includes("= () =>")) ||
      code.includes("React.FC") ||
      code.includes("useState") ||
      code.includes("useEffect") ||
      code.includes("JSX.Element") ||
      (code.includes("return") && code.includes("<"))
    );
  }

  private isCustomHook(code: string): boolean {
    return (
      code.includes("function use") ||
      code.includes("const use") ||
      code.includes("export function use") ||
      (code.includes("useState") && code.includes("return")) ||
      code.includes("useAudio") ||
      code.includes("useTab") ||
      code.includes("useSync")
    );
  }

  private isAudioPattern(code: string): boolean {
    const audioKeywords = [
      "AudioContext",
      "createBuffer",
      "play()",
      "pause()",
      "currentTime",
      "duration",
      "Web Audio",
      "Tone.js",
      "audioSync",
      "playback",
      "cursor",
      "SVG",
    ];
    return audioKeywords.some((keyword) => code.includes(keyword));
  }

  private calculateComplexity(code: string): number {
    let complexity = 1;

    const complexityPatterns = [
      /if\s*\(/g,
      /else/g,
      /while\s*\(/g,
      /for\s*\(/g,
      /switch\s*\(/g,
      /case\s+/g,
      /catch\s*\(/g,
      /\?\s*.*:/g,
      /&&/g,
      /\|\|/g,
      /onClick/g,
      /onLoad/g,
      /addEventListener/g,
    ];

    complexityPatterns.forEach((pattern) => {
      const matches = code.match(pattern);
      if (matches) complexity += matches.length;
    });

    return Math.min(5, Math.max(1, Math.floor(complexity / 5)));
  }

  private generatePatternDescription(code: string, type: string): string {
    const descriptions: Record<string, string> = {
      component: `React component pattern extracted from Songsterr - ${this.extractFirstLine(code)}`,
      hook: `Custom hook pattern from Songsterr - ${this.extractFirstLine(code)}`,
      audio: `Audio/playback pattern from Songsterr - ${this.extractFirstLine(code)}`,
      module: `Modular architecture pattern from Songsterr - ${this.extractFirstLine(code)}`,
    };

    return (
      descriptions[type] ||
      `Pattern from Songsterr - ${this.extractFirstLine(code)}`
    );
  }

  private extractTags(code: string, type: string): string[] {
    const baseTags = ["songsterr", "training", type];

    if (code.includes("useState")) baseTags.push("state-management");
    if (code.includes("useEffect")) baseTags.push("lifecycle");
    if (code.includes("async")) baseTags.push("async");
    if (code.includes("interface")) baseTags.push("typescript");
    if (code.includes("test") || code.includes("spec"))
      baseTags.push("testing");
    if (code.includes("SVG") || code.includes("svg"))
      baseTags.push("svg", "interactive");
    if (code.includes("audio") || code.includes("Audio"))
      baseTags.push("audio", "playback");
    if (code.includes("cursor") || code.includes("beat"))
      baseTags.push("timing", "sync");
    if (code.includes("tab") || code.includes("fret"))
      baseTags.push("guitar", "tablature");

    return baseTags;
  }

  private extractDependencies(code: string): string[] {
    const dependencies: string[] = [];
    const importPattern = /import\s+.*\s+from\s+['"`]([^'"`]+)['"`]/g;

    let match;
    while ((match = importPattern.exec(code)) !== null) {
      dependencies.push(match[1]);
    }

    if (code.includes("React") && !dependencies.includes("react")) {
      dependencies.push("react");
    }
    if (code.includes("SVG") && !dependencies.includes("svg")) {
      dependencies.push("svg");
    }
    if (code.includes("Tone") && !dependencies.includes("tone")) {
      dependencies.push("tone");
    }

    return dependencies;
  }

  private findSectionsWithKeywords(
    content: string,
    keywords: string[]
  ): string[] {
    const sections: string[] = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (
        keywords.some((keyword) =>
          line.toLowerCase().includes(keyword.toLowerCase())
        )
      ) {
        const contextStart = Math.max(0, i - 5);
        const contextEnd = Math.min(lines.length, i + 5);
        const section = lines.slice(contextStart, contextEnd).join("\n");

        if (section.length > 100) {
          sections.push(section);
        }
      }
    }

    return sections;
  }

  private extractFirstLine(code: string): string {
    const firstLine = code.split("\n")[0];
    return firstLine.substring(0, 50) + (firstLine.length > 50 ? "..." : "");
  }

  private calculateAverageComplexity(patterns: TrainingPattern[]): number {
    if (patterns.length === 0) return 0;
    const totalComplexity = patterns.reduce(
      (sum, pattern) => sum + pattern.complexity,
      0
    );
    return totalComplexity / patterns.length;
  }

  private generateLearningInsights(patterns: TrainingPattern[]): string[] {
    const insights: string[] = [];

    const componentPatterns = patterns.filter(
      (p) => p.type === "component"
    ).length;
    const hookPatterns = patterns.filter((p) => p.type === "hook").length;
    const audioPatterns = patterns.filter(
      (p) => p.type === "playback" || p.type === "audio-sync"
    ).length;

    if (componentPatterns > 10)
      insights.push(
        `Rich component architecture detected (${componentPatterns} patterns)`
      );
    if (hookPatterns > 5)
      insights.push(
        `Advanced hook patterns identified (${hookPatterns} custom hooks)`
      );
    if (audioPatterns > 3)
      insights.push(
        `Sophisticated audio handling patterns found (${audioPatterns} patterns)`
      );

    const avgComplexity = this.calculateAverageComplexity(patterns);
    if (avgComplexity > 3.5)
      insights.push(
        `High complexity patterns detected - advanced learning opportunity`
      );

    const svgPatterns = patterns.filter(
      (p) => p.tags.includes("svg") || p.tags.includes("interactive")
    ).length;
    if (svgPatterns > 2)
      insights.push(
        `Interactive SVG patterns detected - Songsterr-style architecture (${svgPatterns} patterns)`
      );

    return insights;
  }

  // ===== FILE OPERATIONS (ENHANCED) =====

  private async readTrainingFile(filePath: string): Promise<string> {
    try {
      if (fs.existsSync(filePath)) {
        console.log(`📖 Reading training file: ${filePath}`);
        return fs.readFileSync(filePath, "utf8");
      }
      throw new Error(`Training file not found: ${filePath}`);
    } catch (error) {
      throw new Error(
        `Failed to read training file: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async saveTrainingData(results: DigestResults): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `songsterr-training-${timestamp}.json`;
    const filepath = path.join(this.trainingDir, filename);

    try {
      await this.ensureTrainingDirectory();
      fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
      console.log(`✅ Training data saved: ${filepath}`);
    } catch (error) {
      console.error(
        `Failed to save training data: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private ensureTrainingDirectory(): void {
    try {
      if (!fs.existsSync(this.trainingDir)) {
        fs.mkdirSync(this.trainingDir, { recursive: true });
        console.log(`📁 Created training directory: ${this.trainingDir}`);
      }
    } catch (error) {
      console.warn(
        `Failed to create training directory: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  // ===== PUBLIC INTERFACE =====

  getTrainingStats(): any {
    return {
      patternsLearned: this.patternsLearned.size,
      patternsByType: this.groupPatternsByType(),
      avgComplexity: this.calculateAverageComplexity(
        Array.from(this.patternsLearned.values())
      ),
      topTags: this.getTopTags(),
      contentAnalysisResultsDir: this.trainingDir, // Where analysis results are saved (extension)
      trainingContentSourceDir: this.trainingContentDir, // Where content is read from (cipher root)
      cipherRootDirectory: this.cipherRootDir,
      scope:
        "Content analysis & pattern learning (NOT auto-fixing broken code)",
    };
  }

  private groupPatternsByType(): Record<string, number> {
    const groups: Record<string, number> = {};
    for (const pattern of this.patternsLearned.values()) {
      groups[pattern.type] = (groups[pattern.type] || 0) + 1;
    }
    return groups;
  }

  private getTopTags(): string[] {
    const tagCounts: Record<string, number> = {};

    for (const pattern of this.patternsLearned.values()) {
      for (const tag of pattern.tags) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag]) => tag);
  }

  findSimilarPatterns(code: string, limit: number = 5): TrainingPattern[] {
    const similarities: Array<{ pattern: TrainingPattern; score: number }> = [];

    for (const pattern of this.patternsLearned.values()) {
      const score = this.calculateSimilarity(code, pattern.code);
      similarities.push({ pattern, score });
    }

    return similarities
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.pattern);
  }

  private calculateSimilarity(code1: string, code2: string): number {
    const words1 = new Set(code1.toLowerCase().match(/\w+/g) || []);
    const words2 = new Set(code2.toLowerCase().match(/\w+/g) || []);

    const intersection = new Set([...words1].filter((x) => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    return intersection.size / union.size;
  }
}
