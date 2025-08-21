/**
 * 🎸 Enhanced Maestro.ai ZIP File Handler - Complete Autonomous Pipeline
 * Handles ZIP files from maestro-ai-input with auto-organization and module builder integration
 * .vscode-extensions/cipher-autonomous-dev/src/handlers/import-export/zipFileHandler.ts
 */

import AdmZip from "adm-zip";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// 🛡️ PROTECTION SYSTEM: Import the enhanced guard system
import {
  findMaestroProjectRoot,
  protectBulkModification,
  protectFileModification,
} from "../../shared/indexSyncUtils";

// 🧠 BRAIN INTEGRATION: Enhanced intelligence
import { BrainConnector } from "../../brain/BrainConnector";
import { isBrainConnected } from "../../shared/utils";

// 🎯 NEW: Import the enhanced module builder for auto-triggering
import { MaestroGuitarModuleBuilder } from "../music/maestroGuitarModuleBuilderHandler";


export interface ZipProcessingOptions {
  extractToMaestro?: boolean;
  createBackups?: boolean;
  preserveStructure?: boolean;
  skipProtection?: boolean;
  autoTriggerBuilder?: boolean; // ← NEW: Auto-trigger module builder
  organizeByContent?: boolean; // ← NEW: Smart content-based organization
}

export interface ZipProcessingResult {
  extractedFiles: string[];
  skippedFiles: string[];
  errors: string[];
  totalProcessed: number;
  organizedFiles: {
    // ← NEW: Track organized files
    componentSpecs: string[];
    featureRequirements: string[];
    integrationPlans: string[];
    general: string[];
  };
  builderTriggered?: boolean; // ← NEW: Track if module builder was triggered
  builderResult?: any; // ← NEW: Store builder results
}

// 🎯 NEW: Content analysis interfaces
interface FileContentAnalysis {
  isComponentSpec: boolean;
  isFeatureRequirement: boolean;
  isIntegrationPlan: boolean;
  hasCodeBlocks: boolean;
  componentCount: number;
  confidence: number;
  suggestedFolder: string;
}

/**
 * 🎸 Enhanced ZIP File Handler for Maestro.ai - Complete Autonomous Pipeline
 * Supports maestro-ai-input folder with smart organization and auto-triggering
 */
export class ZipFileHandler {
  private brainConnector: BrainConnector;
  private outputChannel: vscode.OutputChannel;
  private maestroRoot: string;
  private inputFolder: string;
  private brainDataPath?: string;

  constructor() {
    this.brainConnector = new BrainConnector();
    this.outputChannel = vscode.window.createOutputChannel(
      "Maestro ZIP Handler"
    );

    // 🔧 MULTI-ROOT WORKSPACE SUPPORT: Find correct Maestro root
    this.maestroRoot = findMaestroProjectRoot() || "";

    if (!this.maestroRoot) {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      this.maestroRoot = workspaceFolder?.uri.fsPath || "";
    }

    this.inputFolder = path.join(
      path.dirname(this.maestroRoot),
      "maestro-ai-input"
    );

    // 🧠 BRAIN CONNECTION: Set correct brain path for multi-root
    if (this.maestroRoot) {
      const workspaceFolder = vscode.workspace.workspaceFolders?.find(
        (folder) => folder.uri.fsPath === path.dirname(this.maestroRoot)
      );
      if (workspaceFolder) {
        // ✅ CORRECT PATH (matches your working test)
        this.brainDataPath = path.join(
          workspaceFolder.uri.fsPath,
          "..",
          "brain"
        );
      }
    }

    // 🎯 Enhanced logging for autonomous pipeline testing
    this.log(`🎸 Enhanced Maestro ZIP Handler initialized`);
    this.log(`📁 Maestro Root: ${this.maestroRoot}`);
    this.log(`📦 Input Folder: ${this.inputFolder}`);
    if (this.brainDataPath) {
      this.log(`🧠 Brain Path: ${this.brainDataPath}`);
    }
    console.log("🎸 === ZIP HANDLER AUTONOMOUS PIPELINE READY ===");
  }

  /**
   * 🎯 ENHANCED: Main ZIP processing method with auto-organization and triggering
   */
  public async processZipFile(
    zipPath: string,
    options: ZipProcessingOptions = {}
  ): Promise<ZipProcessingResult> {
    this.log(`🔍 Processing ZIP file: ${zipPath}`);
    console.log("🎸 === ZIP PROCESSING START ===");
    console.log(`📦 ZIP File: ${path.basename(zipPath)}`);
    console.log(`🎯 Auto-trigger: ${options.autoTriggerBuilder ?? true}`);
    console.log(`🗂️ Smart organization: ${options.organizeByContent ?? true}`);

    // Set defaults for autonomous operation
    const enhancedOptions = {
      autoTriggerBuilder: true,
      organizeByContent: true,
      createBackups: true,
      extractToMaestro: true,
      ...options,
    };

    // 🛡️ PROTECTION: Apply bulk protection before processing
    if (!enhancedOptions.skipProtection) {
      this.log(`🛡️ Applying protection to Maestro project...`);
      const protectionResult = protectBulkModification(this.maestroRoot);
      this.log(
        `🛡️ Protection result: ${protectionResult ? "✅ Active" : "❌ Failed"}`
      );
      console.log(`🛡️ Protection applied: ${protectionResult}`);
    }

    const result: ZipProcessingResult = {
      extractedFiles: [],
      skippedFiles: [],
      errors: [],
      totalProcessed: 0,
      organizedFiles: {
        componentSpecs: [],
        featureRequirements: [],
        integrationPlans: [],
        general: [],
      },
    };

    try {
      // Brain learning: Start ZIP processing
      if (isBrainConnected()) {
        console.log(
          "🧠 Brain connected - applying intelligence to ZIP processing"
        );
        (this.brainConnector as any).learnFromAction(
          "zip_processing_start",
          "success",
          {
            zipPath: path.basename(zipPath),
            maestroRoot: this.maestroRoot,
            options: enhancedOptions,
          }
        );
      } else {
        console.log("🧠 Brain not connected - proceeding without intelligence");
      }

      // Validate ZIP file exists
      if (!fs.existsSync(zipPath)) {
        throw new Error(`ZIP file not found: ${zipPath}`);
      }

      // Load and analyze ZIP
      const zip = new AdmZip(zipPath);
      const entries = zip.getEntries();

      this.log(`📦 Found ${entries.length} entries in ZIP file`);
      console.log(`📄 ZIP contains ${entries.length} files`);

      // 🎯 NEW: Create organized folder structure
      await this.createOrganizedFolders();

      // Process each entry with enhanced organization
      for (const entry of entries) {
        try {
          await this.processZipEntryEnhanced(
            entry,
            zip,
            result,
            enhancedOptions
          );
        } catch (error) {
          const errorMsg = `Failed to process ${entry.entryName}: ${error}`;
          this.log(`❌ ${errorMsg}`);
          result.errors.push(errorMsg);
        }
      }

      console.log(`✅ ZIP extraction complete:`);
      console.log(`  📄 Extracted: ${result.extractedFiles.length} files`);
      console.log(
        `  🎯 Component specs: ${result.organizedFiles.componentSpecs.length}`
      );
      console.log(
        `  📋 Requirements: ${result.organizedFiles.featureRequirements.length}`
      );
      console.log(
        `  🔗 Integration: ${result.organizedFiles.integrationPlans.length}`
      );

      // 🚀 NEW: Auto-trigger module builder if specs found
      if (
        enhancedOptions.autoTriggerBuilder &&
        this.shouldTriggerBuilder(result)
      ) {
        console.log("🚀 Auto-triggering module builder...");
        await this.autoTriggerModuleBuilder(result);
      }

      // Brain learning: ZIP processing complete
      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "zip_processing_complete",
          "success",
          {
            result,
            zipPath: path.basename(zipPath),
            autoTriggered: result.builderTriggered,
          }
        );
      }

      this.log(
        `✅ ZIP processing complete: ${result.extractedFiles.length} files extracted`
      );

      // Show enhanced results
      await this.showEnhancedProcessingResults(result, path.basename(zipPath));

      console.log("🎸 === ZIP PROCESSING COMPLETE ===");
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.log(`❌ ZIP processing failed: ${errorMessage}`);
      console.error("❌ ZIP processing error:", error);

      // Brain learning: ZIP processing error
      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "zip_processing_error",
          "failure",
          {
            error: errorMessage,
            zipPath: path.basename(zipPath),
          }
        );
      }

      result.errors.push(errorMessage);
      vscode.window.showErrorMessage(`ZIP processing failed: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * 🎯 NEW: Create organized folder structure in maestro-ai-input
   */
  private async createOrganizedFolders(): Promise<void> {
    const folders = [
      "component-specs",
      "feature-requirements",
      "integration-plans",
      "processed", // For cleanup
    ];

    for (const folder of folders) {
      const folderPath = path.join(this.inputFolder, folder);
      if (!fs.existsSync(folderPath)) {
        await fs.promises.mkdir(folderPath, { recursive: true });
        this.log(`📁 Created folder: ${folder}`);
      }
    }
  }

  /**
   * 🔧 ENHANCED: Process individual ZIP entry with smart organization
   */
  private async processZipEntryEnhanced(
    entry: any, // AdmZip entry type
    zip: AdmZip,
    result: ZipProcessingResult,
    options: ZipProcessingOptions
  ): Promise<void> {
    if (entry.isDirectory) {
      return; // Skip directories
    }

    const entryName = entry.entryName;
    const fileName = path.basename(entryName);

    // Skip system files
    if (fileName.startsWith(".") || fileName.includes("__MACOSX")) {
      result.skippedFiles.push(entryName);
      return;
    }

    console.log(`📄 Processing: ${fileName}`);

    // Get file content for analysis
    const content = entry.getData();
    const contentString = content.toString("utf8");

    // 🎯 NEW: Analyze content to determine organization
    const analysis = await this.analyzeFileContent(contentString, fileName);
    console.log(
      `🔍 Analysis: ${fileName} → ${analysis.suggestedFolder} (confidence: ${Math.round(analysis.confidence * 100)}%)`
    );

    // 🎯 NEW: Determine extraction path with smart organization
    const extractPath = this.determineSmartExtractionPath(
      entryName,
      fileName,
      analysis,
      options
    );

    if (!extractPath) {
      result.skippedFiles.push(entryName);
      this.log(`⏭️ Skipped: ${entryName} (no valid extraction path)`);
      return;
    }

    // 🛡️ PROTECTION: Apply protection before file modification
    if (!options.skipProtection) {
      protectFileModification(extractPath);
    }

    try {
      // Ensure directory exists
      const dirPath = path.dirname(extractPath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Write file (now protected)
      fs.writeFileSync(extractPath, content);

      // 🎯 NEW: Track organized files by category
      this.trackOrganizedFile(extractPath, analysis, result);

      result.extractedFiles.push(extractPath);
      result.totalProcessed++;

      this.log(`✅ Extracted: ${entryName} → ${extractPath}`);
      console.log(`✅ Organized: ${fileName} → ${analysis.suggestedFolder}`);
    } catch (error) {
      const errorMsg = `Failed to extract ${entryName}: ${error}`;
      result.errors.push(errorMsg);
      this.log(`❌ ${errorMsg}`);
    }
  }

  /**
   * 🎯 NEW: Analyze file content to determine organization category
   */
  private async analyzeFileContent(
    content: string,
    fileName: string
  ): Promise<FileContentAnalysis> {
    const lower = content.toLowerCase();
    const fileNameLower = fileName.toLowerCase();

    let componentScore = 0;
    let requirementScore = 0;
    let integrationScore = 0;

    // 🎯 Component Spec Detection
    const componentIndicators = [
      /react\.fc|usestate|component|interface.*props/gi,
      /```(?:typescript|tsx|jsx)/gi,
      /export.*component|export.*function.*\(/gi,
      /component.*specification|ui.*spec/gi,
    ];

    const requirementIndicators = [
      /requirements?|features?|user.*story/gi,
      /shall|must|should|will/gi,
      /##?\s*requirements?|##?\s*features?/gi,
      /\*\s*.*requirement|\-\s*.*feature/gi,
    ];

    const integrationIndicators = [
      /api|integration|sync|connection/gi,
      /endpoint|webhook|oauth|auth/gi,
      /##?\s*integration|##?\s*api/gi,
      /external.*service|third.*party/gi,
    ];

    // Score based on content patterns
    componentIndicators.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) componentScore += matches.length * 2;
    });

    requirementIndicators.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) requirementScore += matches.length;
    });

    integrationIndicators.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) integrationScore += matches.length;
    });

    // Filename-based scoring
    if (fileNameLower.includes("component") || fileNameLower.includes("ui"))
      componentScore += 5;
    if (
      fileNameLower.includes("spec") &&
      (fileNameLower.includes("component") || fileNameLower.includes("ui"))
    )
      componentScore += 3;
    if (
      fileNameLower.includes("requirement") ||
      fileNameLower.includes("feature")
    )
      requirementScore += 5;
    if (fileNameLower.includes("integration") || fileNameLower.includes("api"))
      integrationScore += 5;

    // Code block detection
    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
    const hasCodeBlocks = codeBlocks.length > 0;
    if (hasCodeBlocks) componentScore += codeBlocks.length;

    // Component counting
    const componentMatches =
      content.match(/export.*(?:function|const).*(?:Component|FC)/gi) || [];
    const componentCount = componentMatches.length;

    // Determine category with confidence
    const maxScore = Math.max(
      componentScore,
      requirementScore,
      integrationScore
    );
    const totalScore = componentScore + requirementScore + integrationScore;
    const confidence =
      totalScore > 0 ? maxScore / Math.max(totalScore, 10) : 0.1;

    let suggestedFolder = "general";
    let isComponentSpec = false;
    let isFeatureRequirement = false;
    let isIntegrationPlan = false;

    if (
      componentScore > requirementScore &&
      componentScore > integrationScore
    ) {
      suggestedFolder = "component-specs";
      isComponentSpec = true;
    } else if (requirementScore > integrationScore) {
      suggestedFolder = "feature-requirements";
      isFeatureRequirement = true;
    } else if (integrationScore > 0) {
      suggestedFolder = "integration-plans";
      isIntegrationPlan = true;
    }

    return {
      isComponentSpec,
      isFeatureRequirement,
      isIntegrationPlan,
      hasCodeBlocks,
      componentCount,
      confidence: Math.min(confidence, 1.0),
      suggestedFolder,
    };
  }

  /**
   * 🎯 NEW: Determine smart extraction path with organization
   */
  private determineSmartExtractionPath(
    entryName: string,
    fileName: string,
    analysis: FileContentAnalysis,
    options: ZipProcessingOptions
  ): string | null {
    const extension = path.extname(fileName).toLowerCase();

    // Only process text-based files that can be specifications
    if (
      ![".md", ".txt", ".json", ".ts", ".tsx", ".js", ".jsx"].includes(
        extension
      )
    ) {
      return null;
    }

    // 🎯 NEW: Use smart organization if enabled
    if (options.organizeByContent && analysis.confidence > 0.3) {
      return path.join(this.inputFolder, analysis.suggestedFolder, fileName);
    }

    // Default: extract to main input folder
    return path.join(this.inputFolder, fileName);
  }

  /**
   * 🎯 NEW: Track organized files by category
   */
  private trackOrganizedFile(
    filePath: string,
    analysis: FileContentAnalysis,
    result: ZipProcessingResult
  ): void {
    if (analysis.isComponentSpec) {
      result.organizedFiles.componentSpecs.push(filePath);
    } else if (analysis.isFeatureRequirement) {
      result.organizedFiles.featureRequirements.push(filePath);
    } else if (analysis.isIntegrationPlan) {
      result.organizedFiles.integrationPlans.push(filePath);
    } else {
      result.organizedFiles.general.push(filePath);
    }
  }

  /**
   * 🚀 NEW: Check if module builder should be triggered
   */
  private shouldTriggerBuilder(result: ZipProcessingResult): boolean {
    const hasSpecs =
      result.organizedFiles.componentSpecs.length > 0 ||
      result.organizedFiles.featureRequirements.length > 0 ||
      result.organizedFiles.general.length > 0;

    const hasValidFiles = result.extractedFiles.some(
      (file) => file.endsWith(".md") || file.endsWith(".txt")
    );

    console.log(`🎯 Builder trigger check:`);
    console.log(`  📄 Has specs: ${hasSpecs}`);
    console.log(`  ✅ Has valid files: ${hasValidFiles}`);

    return hasSpecs && hasValidFiles;
  }

  /**
   * 🚀 NEW: Auto-trigger the enhanced module builder
   */
  private async autoTriggerModuleBuilder(
    result: ZipProcessingResult
  ): Promise<void> {
    try {
      this.log("🚀 Auto-triggering Maestro Guitar Module Builder...");
      console.log("🚀 === AUTO-TRIGGERING MODULE BUILDER ===");

      // Find the first specification file to use as entry point
      const allSpecFiles = [
        ...result.organizedFiles.componentSpecs,
        ...result.organizedFiles.featureRequirements,
        ...result.organizedFiles.general,
      ];

      const entrySpec = allSpecFiles.find(
        (file) => file.endsWith(".md") || file.endsWith(".txt")
      );

      console.log(
        `📋 Using spec file: ${entrySpec ? path.basename(entrySpec) : "auto-discovery"}`
      );

      // Create and execute module builder
      const builder = new MaestroGuitarModuleBuilder();
      const buildResult = await builder.buildMaestroGuitarModules(entrySpec);

      result.builderTriggered = true;
      result.builderResult = buildResult;

      this.log(
        `✅ Module builder completed: ${buildResult.modules.length} modules built`
      );
      console.log(
        `✅ Auto-trigger success: ${buildResult.modules.length} modules built`
      );

      // Brain learning: Auto-trigger success
      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "auto_trigger_success",
          "success",
          {
            specFiles: allSpecFiles.length,
            modulesBuilt: buildResult.modules.length,
            entrySpec: entrySpec ? path.basename(entrySpec) : null,
          }
        );
      }

      // Show success notification
      vscode.window.showInformationMessage(
        `🎸 Autonomous pipeline complete! Built ${buildResult.modules.length} modules from ZIP file.`
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.log(`❌ Auto-trigger failed: ${errorMessage}`);
      console.error("❌ Auto-trigger error:", error);

      result.builderTriggered = false;
      result.errors.push(`Auto-trigger failed: ${errorMessage}`);

      // Brain learning: Auto-trigger failure
      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "auto_trigger_failure",
          "failure",
          { error: errorMessage }
        );
      }

      // Show error notification but don't fail the ZIP processing
      vscode.window.showWarningMessage(
        `ZIP extracted successfully, but module builder failed: ${errorMessage}`
      );
    }
  }

  /**
   * 📊 ENHANCED: Show processing results with autonomous pipeline info
   */
  private async showEnhancedProcessingResults(
    result: ZipProcessingResult,
    zipName: string
  ): Promise<void> {
    const panel = vscode.window.createWebviewPanel(
      "zipResults",
      "ZIP Processing Results - Autonomous Pipeline",
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    const moduleBuilderInfo = result.builderTriggered
      ? `
        <div class="success-highlight">
          <h3>🚀 Autonomous Pipeline Success!</h3>
          <p>✅ Module builder auto-triggered</p>
          <p>✅ ${result.builderResult?.modules?.length || 0} modules built</p>
          <p>✅ Components ready for use</p>
        </div>
      `
      : `
        <div class="info-highlight">
          <h3>📦 ZIP Extraction Complete</h3>
          <p>Files extracted and organized, but no specifications found for module building.</p>
        </div>
      `;

    panel.webview.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
          .header { color: #e74c3c; border-bottom: 2px solid #e74c3c; padding-bottom: 10px; }
          .success { color: #27ae60; }
          .warning { color: #f39c12; }
          .error { color: #e74c3c; }
          .file-list { list-style: none; padding: 0; max-height: 200px; overflow-y: auto; }
          .file-item { padding: 5px; margin: 2px 0; background: #f8f9fa; border-radius: 4px; font-size: 0.9em; }
          .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }
          .stat-box { padding: 15px; background: #fdeaea; border: 1px solid #e74c3c; border-radius: 8px; text-align: center; }
          .organization-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 15px 0; }
          .org-box { padding: 10px; background: #e8f4fd; border: 1px solid #3498db; border-radius: 6px; text-align: center; }
          .success-highlight { background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 15px; margin: 20px 0; }
          .info-highlight { background: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <h1 class="header">🎸 Maestro.ai ZIP Processing - Autonomous Pipeline</h1>
        
        ${moduleBuilderInfo}
        
        <div class="stats">
          <div class="stat-box">
            <h3>${result.extractedFiles.length}</h3>
            <p>Files Extracted</p>
          </div>
          <div class="stat-box">
            <h3>${result.skippedFiles.length}</h3>
            <p>Files Skipped</p>
          </div>
          <div class="stat-box">
            <h3>${result.errors.length}</h3>
            <p>Errors</p>
          </div>
          <div class="stat-box">
            <h3>${result.builderTriggered ? "Yes" : "No"}</h3>
            <p>Auto-Triggered</p>
          </div>
        </div>

        <h2>🗂️ Smart Organization Results</h2>
        <div class="organization-stats">
          <div class="org-box">
            <h4>${result.organizedFiles.componentSpecs.length}</h4>
            <p>Component Specs</p>
          </div>
          <div class="org-box">
            <h4>${result.organizedFiles.featureRequirements.length}</h4>
            <p>Requirements</p>
          </div>
          <div class="org-box">
            <h4>${result.organizedFiles.integrationPlans.length}</h4>
            <p>Integration Plans</p>
          </div>
          <div class="org-box">
            <h4>${result.organizedFiles.general.length}</h4>
            <p>General Files</p>
          </div>
        </div>

        <h2 class="success">📁 Organized Files by Category</h2>
        
        ${
          result.organizedFiles.componentSpecs.length > 0
            ? `
          <h3>🎯 Component Specifications (${result.organizedFiles.componentSpecs.length})</h3>
          <ul class="file-list">
            ${result.organizedFiles.componentSpecs.map((file) => `<li class="file-item">${path.basename(file)}</li>`).join("")}
          </ul>
        `
            : ""
        }

        ${
          result.organizedFiles.featureRequirements.length > 0
            ? `
          <h3>📋 Feature Requirements (${result.organizedFiles.featureRequirements.length})</h3>
          <ul class="file-list">
            ${result.organizedFiles.featureRequirements.map((file) => `<li class="file-item">${path.basename(file)}</li>`).join("")}
          </ul>
        `
            : ""
        }

        ${
          result.organizedFiles.integrationPlans.length > 0
            ? `
          <h3>🔗 Integration Plans (${result.organizedFiles.integrationPlans.length})</h3>
          <ul class="file-list">
            ${result.organizedFiles.integrationPlans.map((file) => `<li class="file-item">${path.basename(file)}</li>`).join("")}
          </ul>
        `
            : ""
        }

        ${
          result.organizedFiles.general.length > 0
            ? `
          <h3>📄 General Files (${result.organizedFiles.general.length})</h3>
          <ul class="file-list">
            ${result.organizedFiles.general.map((file) => `<li class="file-item">${path.basename(file)}</li>`).join("")}
          </ul>
        `
            : ""
        }

        ${
          result.skippedFiles.length > 0
            ? `
          <h2 class="warning">⏭️ Skipped Files (${result.skippedFiles.length})</h2>
          <ul class="file-list">
            ${result.skippedFiles.map((file) => `<li class="file-item">${file}</li>`).join("")}
          </ul>
        `
            : ""
        }

        ${
          result.errors.length > 0
            ? `
          <h2 class="error">❌ Errors (${result.errors.length})</h2>
          <ul class="file-list">
            ${result.errors.map((error) => `<li class="file-item">${error}</li>`).join("")}
          </ul>
        `
            : ""
        }

        <p><strong>Source ZIP:</strong> ${zipName}</p>
        <p><strong>Maestro Root:</strong> ${this.maestroRoot}</p>
        <p><strong>Input Folder:</strong> ${this.inputFolder}</p>
        
        ${
          result.builderTriggered
            ? `
          <p><strong>Modules Built:</strong> ${result.builderResult?.modules?.length || 0}</p>
          <p><strong>Build Time:</strong> ${result.builderResult?.estimatedTime || 0} minutes</p>
        `
            : ""
        }
      </body>
      </html>
    `;
  }

  /**
   * 🔍 Scan maestro-ai-input folder for ZIP files
   */
  public async scanForZipFiles(): Promise<string[]> {
    this.log(`🔍 Scanning for ZIP files in: ${this.inputFolder}`);

    if (!fs.existsSync(this.inputFolder)) {
      this.log(`⚠️ Input folder not found: ${this.inputFolder}`);
      return [];
    }

    const files = fs.readdirSync(this.inputFolder);
    const zipFiles = files
      .filter((file) => file.toLowerCase().endsWith(".zip"))
      .map((file) => path.join(this.inputFolder, file));

    this.log(`📦 Found ${zipFiles.length} ZIP files`);
    return zipFiles;
  }

  /**
   * 🤖 ENHANCED: Auto-process all ZIP files with autonomous pipeline
   */
  public async autoProcessInputFolder(
    options: ZipProcessingOptions = {}
  ): Promise<ZipProcessingResult[]> {
    console.log("🎸 === AUTO-PROCESSING INPUT FOLDER ===");

    const zipFiles = await this.scanForZipFiles();

    if (zipFiles.length === 0) {
      vscode.window.showInformationMessage(
        "No ZIP files found in maestro-ai-input folder"
      );
      return [];
    }

    console.log(`📦 Found ${zipFiles.length} ZIP files to process`);

    // Enhanced options for autonomous operation
    const enhancedOptions: ZipProcessingOptions = {
      extractToMaestro: true,
      createBackups: true,
      organizeByContent: true,
      autoTriggerBuilder: true,
      ...options,
    };

    const results: ZipProcessingResult[] = [];

    for (const zipFile of zipFiles) {
      try {
        this.log(`🚀 Auto-processing: ${path.basename(zipFile)}`);
        console.log(`🚀 Processing ZIP: ${path.basename(zipFile)}`);

        const result = await this.processZipFile(zipFile, enhancedOptions);
        results.push(result);

        console.log(`✅ Completed: ${path.basename(zipFile)}`);
      } catch (error) {
        this.log(`❌ Auto-process failed for ${zipFile}: ${error}`);
        console.error(`❌ Failed processing ${path.basename(zipFile)}:`, error);
      }
    }

    // Summary of autonomous processing
    const totalModulesBuilt = results.reduce(
      (sum, result) => sum + (result.builderResult?.modules?.length || 0),
      0
    );

    console.log("🎸 === AUTO-PROCESSING COMPLETE ===");
    console.log(`📦 Processed: ${results.length} ZIP files`);
    console.log(`🎯 Total modules built: ${totalModulesBuilt}`);

    if (totalModulesBuilt > 0) {
      vscode.window.showInformationMessage(
        `🎸 Autonomous pipeline complete! Processed ${results.length} ZIP files and built ${totalModulesBuilt} modules.`
      );
    }

    return results;
  }

  /**
   * 🔧 Utility: Log message to output channel
   */
  private log(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    this.outputChannel.appendLine(logMessage);
    console.log(logMessage);
  }

  /**
   * 📺 Show output channel
   */
  public showOutput(): void {
    this.outputChannel.show();
  }
}

/**
 * 🔧 Legacy support function for backward compatibility
 */
export async function handleZipFile(zipPath?: string): Promise<void> {
  const handler = new ZipFileHandler();

  if (zipPath) {
    await handler.processZipFile(zipPath);
  } else {
    // Auto-process input folder with autonomous pipeline
    await handler.autoProcessInputFolder({
      extractToMaestro: true,
      createBackups: true,
      organizeByContent: true,
      autoTriggerBuilder: true,
    });
  }
}

/**
 * 🚀 ENHANCED: Quick execution functions for VS Code commands with autonomous pipeline
 */
export async function processInputZipFiles(): Promise<void> {
  const handler = new ZipFileHandler();
  handler.showOutput();
  await handler.autoProcessInputFolder({
    extractToMaestro: true,
    createBackups: true,
    organizeByContent: true,
    autoTriggerBuilder: true,
  });
}

export async function processSingleZipFile(): Promise<void> {
  const handler = new ZipFileHandler();

  // Show file picker
  const zipFiles = await handler.scanForZipFiles();

  if (zipFiles.length === 0) {
    vscode.window.showWarningMessage(
      "No ZIP files found in maestro-ai-input folder"
    );
    return;
  }

  const selectedFile = await vscode.window.showQuickPick(
    zipFiles.map((file) => ({
      label: path.basename(file),
      description: file,
      file: file,
    })),
    { placeHolder: "Select ZIP file to process with autonomous pipeline" }
  );

  if (selectedFile) {
    handler.showOutput();
    await handler.processZipFile(selectedFile.file, {
      extractToMaestro: true,
      createBackups: true,
      organizeByContent: true,
      autoTriggerBuilder: true,
    });
  }
}
