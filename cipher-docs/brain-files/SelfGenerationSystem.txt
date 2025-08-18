/**
 * 🤖 SelfGenerationSystem - Cipher Autonomous Evolution Engine - FIXED
 * ============================================================
 * Allows Cipher to write its own code, register commands, and evolve autonomously
 *
 * Capabilities:
 * 🔧 Self-Healing: Creates missing handlers automatically
 * 🚀 Self-Expansion: Generates new intelligent handlers
 * 🔄 Self-Rewiring: Modifies extension.ts and package.json automatically
 * 🧠 Self-Evolution: Learns patterns and creates smarter code over time
 */

import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";
import * as vscode from "vscode";

// ===== INTEGRATION WITH EXISTING CIPHER BRAIN =====
import { BrainConnector } from "./BrainConnector";
import { CipherBrainInterface } from "./CipherBrainInterface";
import { MusicDevIntelligence } from "./MusicDevIntelligence";

// Shared utilities integration
import { ensureDirectoryExists, performProjectAnalysis } from "../shared/utils";

import {
  generateAdvancedHandlerTemplate,
  generateHandlerTemplate,
  generateLyricsHandlerTemplate,
  generateMusicHandlerTemplate,
} from "../shared/templateGenerators";

const exec = promisify(child_process.exec);

// ===== TYPE DEFINITIONS =====
interface SelfGenerationConfig {
  autoHeal: boolean;
  autoExpand: boolean;
  autoRegister: boolean;
  autoCompile: boolean;
  autoReload: boolean;
  brainLearning: boolean;
}

interface MissingHandler {
  commandName: string;
  handlerName: string;
  suggestedType: "basic" | "music" | "lyrics" | "brain" | "auto";
  confidence: number;
  filePath: string;
}

interface GenerationResult {
  created: string[];
  modified: string[];
  compiled: boolean;
  registered: boolean;
  errors: string[];
  brainLearned: boolean;
}

interface ExtensionCommand {
  id: string;
  title: string;
  handler: string;
  category?: string;
}

export class SelfGenerationSystem {
  private static instance: SelfGenerationSystem;
  private brainConnector: BrainConnector;
  private cipherBrain: CipherBrainInterface;
  private musicIntelligence: MusicDevIntelligence;
  private config: SelfGenerationConfig;
  private workspacePath: string;
  private isRunning: boolean = false;

  private constructor() {
    this.brainConnector = BrainConnector.getInstance();
    this.cipherBrain = CipherBrainInterface.getInstance();
    this.musicIntelligence = new MusicDevIntelligence(this.brainConnector);

    // Default configuration
    this.config = {
      autoHeal: true,
      autoExpand: true,
      autoRegister: true,
      autoCompile: true,
      autoReload: false, // User choice for safety
      brainLearning: true,
    };

    const workspace = vscode.workspace.workspaceFolders?.[0];
    this.workspacePath = workspace?.uri.fsPath || "";
  }

  static getInstance(): SelfGenerationSystem {
    if (!SelfGenerationSystem.instance) {
      SelfGenerationSystem.instance = new SelfGenerationSystem();
    }
    return SelfGenerationSystem.instance;
  }

  // =============================================================================
  // 🚀 MAIN SELF-GENERATION ENTRY POINTS
  // =============================================================================

  /**
   * 🤖 Main Self-Generation Command - Full Autonomous Evolution
   */
  async runFullEvolution(): Promise<GenerationResult> {
    if (this.isRunning) {
      vscode.window.showWarningMessage(
        "🤖 Cipher evolution already in progress..."
      );
      return this.createEmptyResult();
    }

    this.isRunning = true;
    const result: GenerationResult = this.createEmptyResult();

    try {
      vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "🤖 Cipher Evolution Starting...",
          cancellable: false,
        },
        async (progress) => {
          progress.report({
            increment: 10,
            message: "🔍 Analyzing current state...",
          });
          await this.initializeBrain();

          progress.report({
            increment: 20,
            message: "🔧 Self-Healing: Finding missing handlers...",
          });
          const healingResult = await this.performSelfHealing();
          result.created.push(...healingResult.created);
          result.errors.push(...healingResult.errors);

          progress.report({
            increment: 40,
            message: "🚀 Self-Expansion: Generating intelligent handlers...",
          });
          const expansionResult = await this.performSelfExpansion();
          result.created.push(...expansionResult.created);
          result.errors.push(...expansionResult.errors);

          progress.report({
            increment: 60,
            message: "🔄 Self-Rewiring: Updating extension.ts...",
          });
          const rewiringResult = await this.performSelfRewiring();
          result.modified.push(...rewiringResult.modified);
          result.registered = rewiringResult.registered;
          result.errors.push(...rewiringResult.errors);

          progress.report({
            increment: 80,
            message: "🏗️ Compiling TypeScript...",
          });
          if (this.config.autoCompile) {
            result.compiled = await this.compileExtension();
          }

          progress.report({
            increment: 90,
            message: "🧠 Brain Learning: Storing evolution data...",
          });
          if (this.config.brainLearning) {
            await this.learnFromEvolution(result);
            result.brainLearned = true;
          }

          progress.report({
            increment: 100,
            message: "✅ Evolution complete!",
          });
        }
      );

      await this.showEvolutionResults(result);
    } catch (error) {
      result.errors.push(`Evolution failed: ${error}`);
      vscode.window.showErrorMessage(`🚨 Cipher evolution failed: ${error}`);
    } finally {
      this.isRunning = false;
    }

    return result;
  }

  /**
   * 🔧 Self-Healing Only - Create Missing Handlers
   */
  async runSelfHealing(): Promise<GenerationResult> {
    await this.initializeBrain();
    return await this.performSelfHealing();
  }

  /**
   * 🚀 Self-Expansion Only - Generate New Intelligent Handlers
   */
  async runSelfExpansion(): Promise<GenerationResult> {
    await this.initializeBrain();
    return await this.performSelfExpansion();
  }

  // =============================================================================
  // 🔧 SELF-HEALING: CREATE MISSING HANDLERS
  // =============================================================================

  private async performSelfHealing(): Promise<GenerationResult> {
    const result = this.createEmptyResult();

    try {
      const missingHandlers = await this.detectMissingHandlers();

      if (missingHandlers.length === 0) {
        vscode.window.showInformationMessage(
          "🎯 All handlers present! No healing needed."
        );
        return result;
      }

      vscode.window.showInformationMessage(
        `🔧 Self-Healing: Creating ${missingHandlers.length} missing handlers...`
      );

      for (const missing of missingHandlers) {
        try {
          await this.createMissingHandler(missing);
          result.created.push(missing.handlerName);
        } catch (error) {
          result.errors.push(
            `Failed to create ${missing.handlerName}: ${error}`
          );
        }
      }
    } catch (error) {
      result.errors.push(`Self-healing failed: ${error}`);
    }

    return result;
  }

  private async detectMissingHandlers(): Promise<MissingHandler[]> {
    const extensionPath = path.join(this.workspacePath, "src", "extension.ts");
    const handlersPath = path.join(this.workspacePath, "src", "handlers");

    if (!fs.existsSync(extensionPath)) {
      throw new Error("extension.ts not found");
    }

    // Read extension.ts and extract registered commands
    const extensionContent = fs.readFileSync(extensionPath, "utf8");
    const registeredCommands = this.extractRegisteredCommands(extensionContent);

    // Get existing handler files
    const existingHandlers = this.getExistingHandlers(handlersPath);

    // Find missing handlers
    const missing: MissingHandler[] = [];

    for (const command of registeredCommands) {
      const handlerName = this.commandToHandlerName(command.id);

      if (!existingHandlers.includes(handlerName)) {
        const handlerType = this.analyzeCommandType(command);

        missing.push({
          commandName: command.id,
          handlerName,
          suggestedType: handlerType.type,
          confidence: handlerType.confidence,
          filePath: path.join(handlersPath, `${handlerName}.ts`),
        });
      }
    }

    return missing;
  }

  private async createMissingHandler(missing: MissingHandler): Promise<void> {
    const handlersDir = path.dirname(missing.filePath);
    await ensureDirectoryExists(vscode.Uri.file(handlersDir));

    let content: string;

    // Use brain intelligence to generate appropriate handler
    switch (missing.suggestedType) {
      case "music":
        content = await this.generateMusicHandlerWithBrain(missing.handlerName);
        break;
      case "lyrics":
        content = await this.generateLyricsHandlerWithBrain(
          missing.handlerName
        );
        break;
      case "brain":
        content = await this.generateBrainPoweredHandler(missing.handlerName);
        break;
      case "auto":
        content = await this.generateAutoHandler(missing.handlerName);
        break;
      default:
        // ✅ FIXED: Add handlerType parameter
        content = generateHandlerTemplate(
          "generic",
          missing.handlerName.replace("Handler", "")
        );
    }

    fs.writeFileSync(missing.filePath, content, "utf8");

    console.log(
      `🔧 Self-Healing: Created ${missing.handlerName} (${missing.suggestedType})`
    );
  }

  // =============================================================================
  // 🚀 SELF-EXPANSION: GENERATE NEW INTELLIGENT HANDLERS
  // =============================================================================

  private async performSelfExpansion(): Promise<GenerationResult> {
    const result = this.createEmptyResult();

    try {
      // Analyze current project to identify expansion opportunities
      const expansionOpportunities =
        await this.identifyExpansionOpportunities();

      if (expansionOpportunities.length === 0) {
        vscode.window.showInformationMessage(
          "🎯 No expansion opportunities detected."
        );
        return result;
      }

      vscode.window.showInformationMessage(
        `🚀 Self-Expansion: Creating ${expansionOpportunities.length} intelligent handlers...`
      );

      for (const opportunity of expansionOpportunities) {
        try {
          await this.createExpansionHandler(opportunity);
          result.created.push(opportunity.handlerName);
        } catch (error) {
          result.errors.push(
            `Failed to create expansion handler ${opportunity.handlerName}: ${error}`
          );
        }
      }
    } catch (error) {
      result.errors.push(`Self-expansion failed: ${error}`);
    }

    return result;
  }

  private async identifyExpansionOpportunities(): Promise<MissingHandler[]> {
    const opportunities: MissingHandler[] = [];

    // Analyze project with brain intelligence
    const workspaceUri = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (!workspaceUri) return opportunities;

    const projectAnalysis = await performProjectAnalysis(workspaceUri);
    const musicContext = await this.analyzeMusicContext();

    // Brain-powered opportunity detection
    if (
      musicContext.hasGuitarComponents &&
      !this.handlerExists("createGuitarPracticeHandler")
    ) {
      opportunities.push(
        this.createOpportunity("createGuitarPractice", "music", 90)
      );
    }

    if (
      musicContext.hasVocalComponents &&
      !this.handlerExists("generateVocalExerciseHandler")
    ) {
      opportunities.push(
        this.createOpportunity("generateVocalExercise", "music", 85)
      );
    }

    if (
      projectAnalysis.routes.length > 10 &&
      !this.handlerExists("optimizeRouteStructureHandler")
    ) {
      opportunities.push(
        this.createOpportunity("optimizeRouteStructure", "brain", 80)
      );
    }

    // Add more intelligent opportunity detection based on patterns
    const brainSuggestions = await this.getBrainExpansionSuggestions();
    opportunities.push(...brainSuggestions);

    return opportunities;
  }

  private async createExpansionHandler(
    opportunity: MissingHandler
  ): Promise<void> {
    const content = await this.generateIntelligentHandler(opportunity);

    fs.writeFileSync(opportunity.filePath, content, "utf8");

    console.log(
      `🚀 Self-Expansion: Created ${opportunity.handlerName} (confidence: ${opportunity.confidence}%)`
    );
  }

  // =============================================================================
  // 🔄 SELF-REWIRING: AUTO-REGISTER COMMANDS
  // =============================================================================

  private async performSelfRewiring(): Promise<GenerationResult> {
    const result = this.createEmptyResult();

    try {
      // Update extension.ts with new handler registrations
      const extensionUpdated = await this.updateExtensionTs();
      if (extensionUpdated) {
        result.modified.push("extension.ts");
      }

      // Update package.json with new commands
      const packageUpdated = await this.updatePackageJson();
      if (packageUpdated) {
        result.modified.push("package.json");
        result.registered = true;
      }
    } catch (error) {
      result.errors.push(`Self-rewiring failed: ${error}`);
    }

    return result;
  }

  private async updateExtensionTs(): Promise<boolean> {
    const extensionPath = path.join(this.workspacePath, "src", "extension.ts");

    if (!fs.existsSync(extensionPath)) {
      throw new Error("extension.ts not found");
    }

    let content = fs.readFileSync(extensionPath, "utf8");
    let modified = false;

    // Get all handler files
    const handlerFiles = this.getAllHandlerFiles();

    for (const handlerFile of handlerFiles) {
      const handlerName = path.basename(handlerFile, ".ts");
      const importLine = `import { ${handlerName} } from './handlers/${handlerName}';`;

      // Add import if missing
      if (!content.includes(importLine)) {
        content = this.addImportToExtension(content, importLine);
        modified = true;
      }

      // Add command registration if missing
      const commandId = this.handlerToCommandId(handlerName);
      const registerLine = `\tvscode.commands.registerCommand('${commandId}', ${handlerName});`;

      if (!content.includes(registerLine)) {
        content = this.addCommandRegistration(content, registerLine);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(extensionPath, content, "utf8");
      console.log("🔄 Self-Rewiring: Updated extension.ts");
    }

    return modified;
  }

  private async updatePackageJson(): Promise<boolean> {
    const packagePath = path.join(this.workspacePath, "package.json");

    if (!fs.existsSync(packagePath)) {
      throw new Error("package.json not found");
    }

    const packageContent = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    let modified = false;

    // Ensure commands array exists
    if (!packageContent.contributes) {
      packageContent.contributes = {};
    }
    if (!packageContent.contributes.commands) {
      packageContent.contributes.commands = [];
    }

    // Get all handler files and add commands
    const handlerFiles = this.getAllHandlerFiles();

    for (const handlerFile of handlerFiles) {
      const handlerName = path.basename(handlerFile, ".ts");
      const commandId = this.handlerToCommandId(handlerName);

      // Check if command already exists
      const exists = packageContent.contributes.commands.find(
        (cmd: any) => cmd.command === commandId
      );

      if (!exists) {
        const commandTitle = this.generateCommandTitle(handlerName);
        packageContent.contributes.commands.push({
          command: commandId,
          title: commandTitle,
          category: "Cipher",
        });
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(
        packagePath,
        JSON.stringify(packageContent, null, 2),
        "utf8"
      );
      console.log("🔄 Self-Rewiring: Updated package.json");
    }

    return modified;
  }

  // =============================================================================
  // 🏗️ COMPILATION & DEPLOYMENT
  // =============================================================================

  private async compileExtension(): Promise<boolean> {
    try {
      const { stdout, stderr } = await exec("npm run compile", {
        cwd: this.workspacePath,
        timeout: 30000,
      });

      if (stderr && !stderr.includes("warning")) {
        console.error("Compilation errors:", stderr);
        return false;
      }

      console.log("🏗️ Compilation successful");
      return true;
    } catch (error) {
      console.error("Compilation failed:", error);
      return false;
    }
  }

  private async reloadExtension(): Promise<void> {
    const reload = await vscode.window.showInformationMessage(
      "🔄 Extension updated! Reload VS Code to see changes?",
      "Reload Now",
      "Later"
    );

    if (reload === "Reload Now") {
      await vscode.commands.executeCommand("workbench.action.reloadWindow");
    }
  }

  // =============================================================================
  // 🧠 BRAIN INTEGRATION & LEARNING
  // =============================================================================

  private async initializeBrain(): Promise<void> {
    try {
      await this.cipherBrain.initialize();
      await this.musicIntelligence.initialize();
    } catch (error) {
      console.warn("Brain initialization failed, using fallback mode:", error);
    }
  }

  private async learnFromEvolution(result: GenerationResult): Promise<void> {
    try {
      const learningData = {
        created: result.created,
        modified: result.modified,
        compiled: result.compiled,
        registered: result.registered,
        errors: result.errors,
        timestamp: Date.now(),
        patterns: this.extractEvolutionPatterns(result),
      };

      await this.cipherBrain.learnFromCodeAnalysis(learningData);
      console.log("🧠 Brain learned from evolution cycle");
    } catch (error) {
      console.warn("Brain learning failed:", error);
    }
  }

  private extractEvolutionPatterns(result: GenerationResult): any {
    return {
      successfulCreations: result.created.length,
      modificationsNeeded: result.modified.length,
      compilationSuccess: result.compiled,
      registrationSuccess: result.registered,
      errorPatterns: result.errors.map((error) => error.substring(0, 50)),
    };
  }

  // =============================================================================
  // 🛠️ UTILITY METHODS
  // =============================================================================

  private createEmptyResult(): GenerationResult {
    return {
      created: [],
      modified: [],
      compiled: false,
      registered: false,
      errors: [],
      brainLearned: false,
    };
  }

  private extractRegisteredCommands(
    extensionContent: string
  ): ExtensionCommand[] {
    const commands: ExtensionCommand[] = [];
    const regex =
      /vscode\.commands\.registerCommand\(['"]([^'"]+)['"],\s*([^)]+)\)/g;
    let match;

    while ((match = regex.exec(extensionContent)) !== null) {
      commands.push({
        id: match[1],
        title: this.generateCommandTitle(match[2]),
        handler: match[2],
      });
    }

    return commands;
  }

  private getExistingHandlers(handlersPath: string): string[] {
    if (!fs.existsSync(handlersPath)) {
      return [];
    }

    return fs
      .readdirSync(handlersPath)
      .filter((file) => file.endsWith("Handler.ts"))
      .map((file) => path.basename(file, ".ts"));
  }

  private getAllHandlerFiles(): string[] {
    const handlersPath = path.join(this.workspacePath, "src", "handlers");
    if (!fs.existsSync(handlersPath)) {
      return [];
    }

    return fs
      .readdirSync(handlersPath)
      .filter((file) => file.endsWith("Handler.ts"))
      .map((file) => path.join(handlersPath, file));
  }

  private commandToHandlerName(commandId: string): string {
    const commandName = commandId.split(".").pop() || "";
    return commandName + "Handler";
  }

  private handlerToCommandId(handlerName: string): string {
    const commandName = handlerName.replace("Handler", "");
    return `cipher.${commandName}`;
  }

  private generateCommandTitle(handlerName: string): string {
    const name = handlerName.replace("Handler", "");
    // Convert camelCase to Title Case
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  private analyzeCommandType(command: ExtensionCommand): {
    type: "basic" | "music" | "lyrics" | "brain" | "auto";
    confidence: number;
  } {
    const name = command.id.toLowerCase();

    if (
      name.includes("music") ||
      name.includes("guitar") ||
      name.includes("vocal") ||
      name.includes("audio")
    ) {
      return { type: "music", confidence: 90 };
    } else if (
      name.includes("lyric") ||
      name.includes("song") ||
      name.includes("verse")
    ) {
      return { type: "lyrics", confidence: 85 };
    } else if (
      name.includes("analyze") ||
      name.includes("generate") ||
      name.includes("optimize")
    ) {
      return { type: "brain", confidence: 80 };
    } else if (
      name.includes("auto") ||
      name.includes("smart") ||
      name.includes("intelligent")
    ) {
      return { type: "auto", confidence: 95 };
    }

    return { type: "basic", confidence: 60 };
  }

  private handlerExists(handlerName: string): boolean {
    const handlerPath = path.join(
      this.workspacePath,
      "src",
      "handlers",
      `${handlerName}.ts`
    );
    return fs.existsSync(handlerPath);
  }

  private createOpportunity(
    name: string,
    type: "basic" | "music" | "lyrics" | "brain" | "auto",
    confidence: number
  ): MissingHandler {
    const handlerName = name + "Handler";
    return {
      commandName: `cipher.${name}`,
      handlerName,
      suggestedType: type,
      confidence,
      filePath: path.join(
        this.workspacePath,
        "src",
        "handlers",
        `${handlerName}.ts`
      ),
    };
  }

  // Handler generation methods (delegate to existing system)
  private async generateMusicHandlerWithBrain(
    handlerName: string
  ): Promise<string> {
    // ✅ FIXED: Only pass name parameter
    return generateMusicHandlerTemplate(handlerName.replace("Handler", ""));
  }

  private async generateLyricsHandlerWithBrain(
    handlerName: string
  ): Promise<string> {
    // ✅ FIXED: Only pass name parameter
    return generateLyricsHandlerTemplate(handlerName.replace("Handler", ""));
  }

  private async generateBrainPoweredHandler(
    handlerName: string
  ): Promise<string> {
    // ✅ FIXED: Only pass name parameter
    return generateAdvancedHandlerTemplate(handlerName.replace("Handler", ""));
  }

  private async generateAutoHandler(handlerName: string): Promise<string> {
    // ✅ FIXED: Only pass name parameter
    return generateAdvancedHandlerTemplate(handlerName.replace("Handler", ""));
  }

  private async generateIntelligentHandler(
    opportunity: MissingHandler
  ): Promise<string> {
    switch (opportunity.suggestedType) {
      case "music":
        return this.generateMusicHandlerWithBrain(opportunity.handlerName);
      case "lyrics":
        return this.generateLyricsHandlerWithBrain(opportunity.handlerName);
      case "brain":
        return this.generateBrainPoweredHandler(opportunity.handlerName);
      case "auto":
        return this.generateAutoHandler(opportunity.handlerName);
      default:
        // ✅ FIXED: Add handlerType parameter
        return generateHandlerTemplate(
          "generic",
          opportunity.handlerName.replace("Handler", "")
        );
    }
  }

  private detectMusicTypeFromName(
    name: string
  ): "guitar" | "vocal" | "audio" | "theory" {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("guitar") || nameLower.includes("chord"))
      return "guitar";
    if (nameLower.includes("vocal") || nameLower.includes("voice"))
      return "vocal";
    if (nameLower.includes("audio") || nameLower.includes("sound"))
      return "audio";
    return "theory";
  }

  private async analyzeMusicContext(): Promise<{
    hasGuitarComponents: boolean;
    hasVocalComponents: boolean;
  }> {
    // Analyze workspace for music components
    const workspaceFiles = await vscode.workspace.findFiles(
      "**/*.{ts,tsx,js,jsx}"
    );
    let hasGuitarComponents = false;
    let hasVocalComponents = false;

    for (const file of workspaceFiles) {
      const content = fs.readFileSync(file.fsPath, "utf8").toLowerCase();
      if (
        content.includes("guitar") ||
        content.includes("chord") ||
        content.includes("fret")
      ) {
        hasGuitarComponents = true;
      }
      if (
        content.includes("vocal") ||
        content.includes("voice") ||
        content.includes("pitch")
      ) {
        hasVocalComponents = true;
      }
    }

    return { hasGuitarComponents, hasVocalComponents };
  }

  private async getBrainExpansionSuggestions(): Promise<MissingHandler[]> {
    const suggestions: MissingHandler[] = [];

    try {
      const brainSuggestions =
        await this.cipherBrain.getPersonalizedSuggestions();

      // Convert brain suggestions to handler opportunities
      for (const suggestion of brainSuggestions) {
        const handlerInfo = this.suggestionToHandler(suggestion);
        if (handlerInfo && !this.handlerExists(handlerInfo.handlerName)) {
          suggestions.push(handlerInfo);
        }
      }
    } catch (error) {
      console.warn("Failed to get brain expansion suggestions:", error);
    }

    return suggestions;
  }

  private suggestionToHandler(suggestion: string): MissingHandler | null {
    const suggestionLower = suggestion.toLowerCase();

    if (
      suggestionLower.includes("create") &&
      suggestionLower.includes("component")
    ) {
      const name = "createSmartComponent";
      return this.createOpportunity(name, "brain", 75);
    }

    if (
      suggestionLower.includes("analyze") &&
      suggestionLower.includes("music")
    ) {
      const name = "analyzeMusicProject";
      return this.createOpportunity(name, "music", 80);
    }

    return null;
  }

  private addImportToExtension(content: string, importLine: string): string {
    // Find the last import statement and add after it
    const importRegex = /^import\s+.*from\s+['"'][^'"]*['"];?\s*$/gm;
    const imports = content.match(importRegex);

    if (imports && imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const insertIndex = lastImportIndex + lastImport.length;

      return (
        content.slice(0, insertIndex) +
        "\n" +
        importLine +
        content.slice(insertIndex)
      );
    }

    // If no imports found, add at the beginning
    return importLine + "\n" + content;
  }

  private addCommandRegistration(
    content: string,
    registerLine: string
  ): string {
    // Find the activate function and add the registration
    const activateRegex = /export\s+function\s+activate\s*\([^)]*\)\s*{/;
    const match = content.match(activateRegex);

    if (match) {
      const insertIndex = content.indexOf(match[0]) + match[0].length;
      return (
        content.slice(0, insertIndex) +
        "\n" +
        registerLine +
        content.slice(insertIndex)
      );
    }

    return content; // If activate function not found, return unchanged
  }

  private async showEvolutionResults(result: GenerationResult): Promise<void> {
    const message = `🤖 Cipher Evolution Complete!

✅ Created: ${result.created.length} handlers
🔄 Modified: ${result.modified.length} files
🏗️ Compiled: ${result.compiled ? "Success" : "Failed"}
📝 Registered: ${result.registered ? "Success" : "Failed"}
🧠 Brain Learning: ${result.brainLearned ? "Active" : "Inactive"}
${result.errors.length > 0 ? `⚠️ Errors: ${result.errors.length}` : ""}`;

    const actions = ["View Details", "Reload Extension"];
    if (result.errors.length > 0) {
      actions.unshift("View Errors");
    }
    actions.push("OK");

    const action = await vscode.window.showInformationMessage(
      message,
      ...actions
    );

    if (action === "View Errors") {
      await this.showErrorDetails(result.errors);
    } else if (action === "View Details") {
      await this.showEvolutionDetails(result);
    } else if (action === "Reload Extension") {
      await this.reloadExtension();
    }
  }

  private async showErrorDetails(errors: string[]): Promise<void> {
    const errorMessage = errors.join("\n\n");
    vscode.window.showErrorMessage(`Evolution Errors:\n\n${errorMessage}`, {
      modal: true,
    });
  }

  private async showEvolutionDetails(result: GenerationResult): Promise<void> {
    const details = `Cipher Evolution Details:

Created Handlers:
${result.created.map((h) => `  • ${h}`).join("\n")}

Modified Files:
${result.modified.map((f) => `  • ${f}`).join("\n")}

Status:
  • Compilation: ${result.compiled ? "✅ Success" : "❌ Failed"}
  • Registration: ${result.registered ? "✅ Success" : "❌ Failed"}
  • Brain Learning: ${result.brainLearned ? "✅ Active" : "❌ Inactive"}`;

    vscode.window.showInformationMessage(details, { modal: true });
  }

  // =============================================================================
  // 🎯 PUBLIC API
  // =============================================================================

  async configure(config: Partial<SelfGenerationConfig>): Promise<void> {
    this.config = { ...this.config, ...config };
  }

  getStatus(): any {
    return {
      isRunning: this.isRunning,
      config: this.config,
      brainConnected: this.brainConnector.isConnectedToBrain(),
      workspacePath: this.workspacePath,
    };
  }
}

// Export singleton instance
export const selfGenerationSystem = SelfGenerationSystem.getInstance();
export default SelfGenerationSystem;
