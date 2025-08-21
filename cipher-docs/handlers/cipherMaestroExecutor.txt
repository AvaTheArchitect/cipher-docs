/**
 * 🎸 Cipher Maestro Guitar Practice Execution Handler
 * Simple step-by-step executor for processing zip files and building guitar practice modules
 * Acts like a .sh script but in TypeScript
 */

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// 🎸 Import handlers from correct paths
import { ZipFileHandler } from "./zipFileHandler";

// 🎸 Import command functions - UPDATED names
import {
  autoProcessMaestroInput,
  importRequirementsFromZip,
  runCompleteMaestroGuitarPipeline,
} from "../../commands/maestroCommands";

// 🔧 UPDATED: Import the correct class and handler
import { MaestroGuitarModuleBuilder } from "../music/maestroGuitarModuleBuilderHandler";

// 🧠** KEEP FOR All HANDLER FILES— Brain Enhanced **
import { BrainConnector } from "../../brain/BrainConnector";
import { isBrainConnected } from "../../shared/utils";

// 🔧 Ensure imports are recognized as used
const _ensureImports = () => {
  // This tells VS Code these imports are intentionally used
  return {
    ZipFileHandler,
    MaestroGuitarModuleBuilder, // 🔧 FIXED: Correct class name
    importRequirementsFromZip,
    autoProcessMaestroInput,
    runCompleteMaestroGuitarPipeline,
  };
};

export class CipherMaestroExecutor {
  private outputChannel: vscode.OutputChannel;
  private workspaceRoot: string;
  private inputFolder: string;
  private brainConnector: BrainConnector;

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel(
      "Cipher Maestro Guitar Practice Generator"
    );
    this.workspaceRoot =
      vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "";
    this.inputFolder = path.join(this.workspaceRoot, "maestro-ai-input");
    this.brainConnector = new BrainConnector();
  }

  /**
   * Main execution method - runs the complete zip processing pipeline
   */
  async executeZipProcessing(): Promise<void> {
    this.log("🚀 Cipher Maestro Guitar Practice Generator Starting...");

    try {
      // Brain learning: Starting execution
      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "cipher_maestro_execution_start",
          "success",
          {
            timestamp: Date.now(),
            source: "cipher_executor",
          }
        );
      }

      // Step 1: Check for the specific zip file
      await this.step1_CheckForZipFiles();

      // Step 2: Use existing sophisticated zip handler
      await this.step2_ProcessZipFiles();

      // Step 3: Use existing import requirements
      await this.step3_ImportRequirements();

      // Step 4: Use existing module builder
      await this.step4_BuildPracticeGenerator();

      // Step 5: Use existing pipeline
      await this.step5_RunCompletePipeline();

      // Brain learning: Execution complete
      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "cipher_maestro_execution_complete",
          "success",
          {
            timestamp: Date.now(),
            source: "cipher_executor",
          }
        );
      }

      this.log("✅ Cipher Maestro Guitar Practice Generator Complete!");
      vscode.window.showInformationMessage(
        "🎸 Cipher successfully built the Maestro Guitar Practice Generator!"
      );
    } catch (error) {
      this.logError("❌ Execution failed:", error);

      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "cipher_maestro_execution_error",
          "failure",
          {
            error: error instanceof Error ? error.message : String(error),
            timestamp: Date.now(),
          }
        );
      }

      vscode.window.showErrorMessage(`Cipher execution failed: ${error}`);
    }
  }

  /**
   * Step 1: Check for the specific Practice Generator zip file
   */
  private async step1_CheckForZipFiles(): Promise<void> {
    this.log(
      "📁 Step 1: Checking for Maestro Guitar Practice Generator zip file..."
    );

    if (!fs.existsSync(this.inputFolder)) {
      throw new Error(`Input folder not found: ${this.inputFolder}`);
    }

    const files = fs.readdirSync(this.inputFolder);
    const targetZip = "maestro-ai-autonomous-pipeline-LOCKED.zip";

    if (!files.includes(targetZip)) {
      const zipFiles = files.filter((file) => file.endsWith(".zip"));
      if (zipFiles.length === 0) {
        throw new Error("No zip files found in maestro-ai-input folder");
      }
      this.log(`   Found zip files: ${zipFiles.join(", ")}`);
      this.log(`   Looking for: ${targetZip}`);
    } else {
      this.log(`   ✅ Found target zip file: ${targetZip}`);
    }
  }

  /**
   * Step 2: Process zip files using existing sophisticated handler
   */
  private async step2_ProcessZipFiles(): Promise<void> {
    this.log("📦 Step 2: Processing zip files with existing handler...");

    const files = fs.readdirSync(this.inputFolder);
    const zipFiles = files.filter((file) => file.endsWith(".zip"));

    for (const zipFile of zipFiles) {
      const zipPath = path.join(this.inputFolder, zipFile);
      this.log(`   Processing: ${zipFile}`);

      try {
        // Use existing sophisticated zip handler
        const zipHandler = new ZipFileHandler();
        await zipHandler.processZipFile(zipPath);

        if (isBrainConnected()) {
          (this.brainConnector as any).learnFromAction(
            "zip_file_processed",
            "success",
            {
              zipFile: zipFile,
              timestamp: Date.now(),
            }
          );
        }

        this.log(`   ✅ Successfully processed: ${zipFile}`);
      } catch (error) {
        this.logError(`   ❌ Failed to process ${zipFile}:`, error);
        throw error;
      }
    }
  }

  /**
   * Step 3: Import requirements using existing function
   */
  private async step3_ImportRequirements(): Promise<void> {
    this.log("📋 Step 3: Importing requirements with existing system...");

    try {
      // Use existing sophisticated import function
      await importRequirementsFromZip();

      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "requirements_imported",
          "success",
          {
            timestamp: Date.now(),
          }
        );
      }

      this.log("   ✅ Requirements imported successfully");
    } catch (error) {
      this.logError("   ❌ Failed to import requirements:", error);
      throw error;
    }
  }

  /**
   * 🔧 UPDATED: Step 4: Build Practice Generator using correct module builder
   */
  private async step4_BuildPracticeGenerator(): Promise<void> {
    this.log(
      "🎸 Step 4: Building Maestro Guitar Practice Generator modules..."
    );

    try {
      // 🔧 FIXED: Use correct class name and instantiation
      const moduleBuilder = new MaestroGuitarModuleBuilder();
      await moduleBuilder.buildMaestroGuitarModules();

      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "maestro_practice_generator_built",
          "success",
          {
            timestamp: Date.now(),
          }
        );
      }

      this.log(
        "   ✅ Maestro Guitar Practice Generator modules built successfully"
      );
    } catch (error) {
      this.logError(
        "   ❌ Failed to build Maestro Guitar Practice Generator:",
        error
      );
      throw error;
    }
  }

  /**
   * 🔧 UPDATED: Step 5: Run complete pipeline using existing orchestrator
   */
  private async step5_RunCompletePipeline(): Promise<void> {
    this.log("🔨 Step 5: Running complete Maestro Guitar Practice pipeline...");

    try {
      // 🔧 UPDATED: Use correct pipeline function name
      await runCompleteMaestroGuitarPipeline();

      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "complete_maestro_pipeline_run",
          "success",
          {
            timestamp: Date.now(),
          }
        );
      }

      this.log(
        "   ✅ Complete Maestro Guitar Practice pipeline executed successfully"
      );
    } catch (error) {
      this.logError("   ❌ Failed to run complete pipeline:", error);
      throw error;
    }
  }

  /**
   * 🔧 UPDATED: Alternative: Run auto-process using existing sophisticated system
   */
  async executeAutoProcess(): Promise<void> {
    this.log(
      "🤖 Cipher Maestro Guitar Practice Generator Auto-Process Starting..."
    );

    try {
      // 🔧 UPDATED: Use correct auto-process function
      await autoProcessMaestroInput();

      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "maestro_auto_process_complete",
          "success",
          {
            timestamp: Date.now(),
          }
        );
      }

      this.log("✅ Maestro Guitar Practice auto-process complete!");
      vscode.window.showInformationMessage(
        "🎸 Cipher Maestro Guitar Practice Generator auto-process completed successfully!"
      );
    } catch (error) {
      this.logError("❌ Auto-process failed:", error);

      if (isBrainConnected()) {
        (this.brainConnector as any).learnFromAction(
          "maestro_auto_process_error",
          "failure",
          {
            error: error instanceof Error ? error.message : String(error),
            timestamp: Date.now(),
          }
        );
      }

      vscode.window.showErrorMessage(`Cipher auto-process failed: ${error}`);
    }
  }

  /**
   * Utility: Log message to output channel
   */
  private log(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    this.outputChannel.appendLine(logMessage);
    console.log(logMessage);
  }

  /**
   * Utility: Log error message
   */
  private logError(message: string, error: any): void {
    const errorMessage = `${message} ${error?.message || error}`;
    this.log(errorMessage);
    console.error(errorMessage, error);
  }

  /**
   * Utility: Show output channel
   */
  showOutput(): void {
    this.outputChannel.show();
  }
}

/**
 * 🔧 UPDATED: Register Cipher Maestro Guitar Practice Generator commands with VS Code
 */
export function registerCipherMaestroCommands(
  context: vscode.ExtensionContext
): void {
  const executor = new CipherMaestroExecutor();

  // Command 1: Full Maestro Guitar Practice Generator processing pipeline
  const executeZipCommand = vscode.commands.registerCommand(
    "cipher.executeMaestroGuitarPracticeGenerator",
    async () => {
      executor.showOutput();
      await executor.executeZipProcessing();
    }
  );

  // Command 2: Auto-process Maestro Guitar Practice Generator (uses existing sophisticated system)
  const autoProcessCommand = vscode.commands.registerCommand(
    "cipher.autoProcessMaestroGuitarPracticeGenerator",
    async () => {
      executor.showOutput();
      await executor.executeAutoProcess();
    }
  );

  // Command 3: Show output
  const showOutputCommand = vscode.commands.registerCommand(
    "cipher.showMaestroGuitarPracticeGeneratorOutput",
    () => {
      executor.showOutput();
    }
  );

  context.subscriptions.push(
    executeZipCommand,
    autoProcessCommand,
    showOutputCommand
  );
}

/**
 * 🔧 UPDATED: Quick execution functions for direct use
 */
export async function cipherExecuteMaestroGuitarPracticeGenerator(): Promise<void> {
  const executor = new CipherMaestroExecutor();
  await executor.executeZipProcessing();
}

export async function cipherAutoProcessMaestroGuitarPracticeGenerator(): Promise<void> {
  const executor = new CipherMaestroExecutor();
  await executor.executeAutoProcess();
}
