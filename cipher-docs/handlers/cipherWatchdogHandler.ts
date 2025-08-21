// 🕵️ Cipher Watchdog Handler - Mystery Folder Detective (FIXED VERSION)
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/watchers/cipherWatchdogHandler.ts
// Purpose: Detects and logs mysterious folder creation (especially the brain/ folder mystery!)

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { BrainConnector } from "../../brain/BrainConnector";
import { getBrainInterface } from "../../shared/utils";

interface WatchdogEvent {
  timestamp: string;
  eventType: "created" | "deleted" | "modified";
  folderPath: string;
  folderName: string;
  stackTrace?: string;
  vscodeExtensions?: string[];
  suspiciousActivity?: string[];
}

interface WatchdogConfig {
  enableWatching: boolean;
  watchedFolders: string[];
  logToFile: boolean;
  logToConsole: boolean;
  detectProcesses: boolean;
  enableBrainLearning: boolean;
}

/**
 * 🕵️ CipherWatchdog Handler - The Mystery Solver (CORRECTED v20 BRAIN UNIFICATION)
 * Watches for mysterious folder creation and identifies the culprits!
 * Uses CORRECTED lightweight brain learning pattern with proper null checking
 * NO session saving (that's only for Brain Training Camp)
 */
export class CipherWatchdogHandler {
  private watchers: vscode.FileSystemWatcher[] = [];
  private brainConnector: BrainConnector;
  private config: WatchdogConfig;
  private logDir: string;
  private eventsLog: WatchdogEvent[] = [];

  // 🛡️ RECURSION PROTECTION
  private static isLearning = false;
  private static learningQueue: Array<() => Promise<void>> = [];
  private static learningInProgress = new Set<string>();

  // 🎯 MYSTERY FOLDERS TO WATCH
  private static readonly MYSTERY_FOLDERS = [
    "brain",
    "Brain",
    "cipher-reports",
    "maestro-reports",
    ".cipher-cache",
    "temp",
  ];

  constructor(brainConnector: BrainConnector) {
    this.brainConnector = brainConnector;

    // Default configuration with SAFER brain learning
    this.config = {
      enableWatching: true,
      watchedFolders: CipherWatchdogHandler.MYSTERY_FOLDERS,
      logToFile: true,
      logToConsole: true,
      detectProcesses: true,
      enableBrainLearning: false, // 🚨 DISABLED by default to prevent recursion
    };

    // Setup logging directory
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (workspaceRoot) {
      this.logDir = path.join(workspaceRoot, ".cipher-watchdog-logs");
      this.ensureLogDirectory();
    } else {
      this.logDir = "";
    }

    console.log(
      "🕵️ Cipher Watchdog Handler initialized - Ready to solve mysteries! (Stack Overflow Protected)"
    );
  }

  // ===== PUBLIC INTERFACE =====

  /**
   * 🚀 Start Watching for Mysterious Activity (PROTECTED VERSION)
   */
  public async startWatching(): Promise<void> {
    if (!this.config.enableWatching) {
      console.log("🕵️ Watchdog disabled in config");
      return;
    }

    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      vscode.window.showErrorMessage("🕵️ No workspace found for watching");
      return;
    }

    console.log("🕵️ Starting Cipher Watchdog surveillance...");

    try {
      // Watch each mystery folder
      for (const folderName of this.config.watchedFolders) {
        await this.watchFolder(workspaceRoot, folderName);
      }

      // 🛡️ SAFE Brain Learning - Only if not already learning
      if (this.config.enableBrainLearning) {
        await this.safeBrainLearning("watchdog-started", "success", {
          watchedFolders: this.config.watchedFolders.length,
          workspace: path.basename(workspaceRoot),
        });
      }

      vscode.window.showInformationMessage(
        `🕵️ Cipher Watchdog active! Monitoring ${this.config.watchedFolders.length} mystery folders.`
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("🚨 Watchdog startup error:", errorMessage);

      if (errorMessage.includes("Maximum call stack size exceeded")) {
        console.log("🛡️ Stack overflow detected - disabling brain learning");
        this.config.enableBrainLearning = false;
        vscode.window.showWarningMessage(
          "🕵️ Watchdog started with brain learning disabled (recursion protection)"
        );
      }
      throw error;
    }
  }

  /**
   * 🛑 Stop All Watching
   */
  public stopWatching(): void {
    console.log("🕵️ Stopping Cipher Watchdog surveillance...");

    this.watchers.forEach((watcher) => watcher.dispose());
    this.watchers = [];

    // Clear recursion protection
    CipherWatchdogHandler.isLearning = false;
    CipherWatchdogHandler.learningQueue = [];
    CipherWatchdogHandler.learningInProgress.clear();

    console.log("🕵️ [v20] Cipher Watchdog stopped.");
    vscode.window.showInformationMessage("🕵️ Cipher Watchdog stopped.");
  }

  /**
   * 🔄 Enable/Disable Brain Learning Safely
   */
  public setBrainLearning(enabled: boolean): void {
    this.config.enableBrainLearning = enabled;
    console.log(`🧠 Brain learning ${enabled ? "ENABLED" : "DISABLED"}`);
  }

  /**
   * 🧠 Test Brain Integration (v20 Lightweight Pattern with Proper Null Checking)
   */
  public async testBrainIntegration(): Promise<boolean> {
    console.log("🧠 [v20] Testing Watchdog Brain Integration...");

    try {
      // Test brain initialization
      const { initializeBrainSystem, getBrainInterface } = await import(
        "../../shared/utils"
      );
      const initialized = await initializeBrainSystem();
      console.log(
        `🧠 [v20] Brain initialization test: ${initialized ? "✅ SUCCESS" : "❌ FAILED"}`
      );

      if (!initialized) {
        return false;
      }

      // Test brain interface with proper null checking
      const brainInterface = getBrainInterface();
      if (!brainInterface) {
        console.log(`🧠 [v20] Brain interface test: ❌ NOT AVAILABLE`);
        return false;
      }

      console.log(`🧠 [v20] Brain interface test: ✅ AVAILABLE`);

      // Test lightweight learning
      await this.safeBrainLearning("watchdog-brain-test", "success", {
        testType: "integration",
        timestamp: new Date().toISOString(),
      });

      console.log("🧠 [v20] Watchdog Brain Integration: ✅ ALL TESTS PASSED");
      return true;
    } catch (error) {
      console.error("🧠 [v20] Brain Integration Test Failed:", error);
      return false;
    }
  }

  /**
   * 💾 Save Session Data (v20 Unified Session Pattern)
   */
  private async saveSessionData(): Promise<void> {
    if (!this.config.logToFile || !this.logDir) {
      return;
    }

    try {
      const sessionData = {
        sessionId: `watchdog-${Date.now()}`,
        timestamp: new Date().toISOString(),
        handlerName: "CipherWatchdog",
        version: "v20-UNIFIED",
        events: this.eventsLog,
        config: this.config,
        stats: {
          totalEvents: this.eventsLog.length,
          createdEvents: this.eventsLog.filter((e) => e.eventType === "created")
            .length,
          deletedEvents: this.eventsLog.filter((e) => e.eventType === "deleted")
            .length,
          suspiciousEvents: this.eventsLog.filter(
            (e) => e.suspiciousActivity && e.suspiciousActivity.length > 0
          ).length,
          brainFolderEvents: this.eventsLog.filter((e) =>
            e.folderName.toLowerCase().includes("brain")
          ).length,
        },
        recursionProtection: {
          isLearning: CipherWatchdogHandler.isLearning,
          queueSize: CipherWatchdogHandler.learningQueue.length,
          activeOperations: CipherWatchdogHandler.learningInProgress.size,
        },
      };

      // Save to unified session directory
      const sessionFile = path.join(
        this.logDir,
        `session-${sessionData.sessionId}.json`
      );
      fs.writeFileSync(sessionFile, JSON.stringify(sessionData, null, 2));
      console.log(`💾 [v20] Watchdog session saved: ${sessionFile}`);
    } catch (error) {
      console.warn("💾 [v20] Failed to save session data:", error);
    }
  }
  public generateReport(): string {
    const totalEvents = this.eventsLog.length;
    const creationEvents = this.eventsLog.filter(
      (e) => e.eventType === "created"
    );
    const suspiciousEvents = this.eventsLog.filter(
      (e) => e.suspiciousActivity && e.suspiciousActivity.length > 0
    );

    const report = `
🕵️ CIPHER WATCHDOG MYSTERY REPORT
==================================

📊 SURVEILLANCE SUMMARY:
- Total Events Detected: ${totalEvents}
- Folder Creations: ${creationEvents.length}
- Suspicious Activities: ${suspiciousEvents.length}
- Brain Learning Status: ${this.config.enableBrainLearning ? "ENABLED" : "DISABLED"}

🚨 MOST SUSPICIOUS EVENTS:
${suspiciousEvents
  .slice(-5)
  .map(
    (event) =>
      `[${event.timestamp}] ${event.folderName} → ${event.suspiciousActivity?.join(", ")}`
  )
  .join("\n")}

🎯 BRAIN FOLDER MYSTERY:
${
  creationEvents
    .filter((e) => e.folderName.toLowerCase().includes("brain"))
    .map((e) => `[${e.timestamp}] ${e.folderPath} created`)
    .join("\n") || "No brain folder activity detected yet"
}

📁 FOLDER ACTIVITY BREAKDOWN:
${this.config.watchedFolders
  .map((folder) => {
    const count = creationEvents.filter((e) => e.folderName === folder).length;
    return `- ${folder}: ${count} creation(s)`;
  })
  .join("\n")}

🔍 RECOMMENDATIONS:
${this.generateRecommendations()}

Generated: ${new Date().toISOString()}
By: Cipher Watchdog v2.0 🕵️ (Stack Protected)
        `;

    return report;
  }

  // ===== PRIVATE METHODS =====

  private async watchFolder(
    workspaceRoot: string,
    folderName: string
  ): Promise<void> {
    const folderPattern = path.join(workspaceRoot, folderName);

    // Watch for folder creation/deletion
    const watcher = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(workspaceRoot, folderName),
      false, // Don't ignore creates
      true, // Ignore changes
      false // Don't ignore deletes
    );

    // Folder created
    watcher.onDidCreate(async (uri) => {
      await this.handleFolderEvent("created", uri, folderName);
    });

    // Folder deleted
    watcher.onDidDelete(async (uri) => {
      await this.handleFolderEvent("deleted", uri, folderName);
    });

    this.watchers.push(watcher);
    console.log(`🕵️ Watching: ${folderPattern}`);
  }

  private async handleFolderEvent(
    eventType: "created" | "deleted",
    uri: vscode.Uri,
    folderName: string
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const folderPath = uri.fsPath;

    console.log(
      `🚨 WATCHDOG ALERT: ${folderName} folder ${eventType} at ${folderPath}`
    );

    try {
      // Detect suspicious activity
      const suspiciousActivity = await this.detectSuspiciousActivity(
        eventType,
        folderPath
      );

      // Get VS Code extensions info
      const extensions = this.getActiveExtensions();

      // Create event record
      const event: WatchdogEvent = {
        timestamp,
        eventType,
        folderPath,
        folderName,
        vscodeExtensions: extensions,
        suspiciousActivity,
      };

      // Add stack trace for creations
      if (eventType === "created") {
        event.stackTrace = await this.captureStackTrace();
      }

      // Store event
      this.eventsLog.push(event);

      // Log the event
      await this.logEvent(event);

      // 🛡️ SAFE Brain Learning - Only if enabled and not recursing
      if (this.config.enableBrainLearning) {
        await this.safeBrainLearning(
          `mystery-folder-${eventType}`,
          "detected",
          {
            folderName,
            suspiciousActivity: suspiciousActivity.length,
            timestamp,
          }
        );
      }

      // Show alert for brain folder specifically
      if (
        folderName.toLowerCase().includes("brain") &&
        eventType === "created"
      ) {
        vscode.window
          .showWarningMessage(
            `🚨 MYSTERY SOLVED? Brain folder created at ${path.basename(folderPath)}! Check Watchdog logs.`,
            "View Report",
            "Disable Brain Learning"
          )
          .then(async (selection) => {
            if (selection === "View Report") {
              await this.showReport();
            } else if (selection === "Disable Brain Learning") {
              this.setBrainLearning(false);
            }
          });
      }
    } catch (error) {
      console.error("🚨 Error handling folder event:", error);

      if (
        error instanceof Error &&
        error.message.includes("Maximum call stack size exceeded")
      ) {
        console.log(
          "🛡️ Stack overflow detected in event handler - disabling brain learning"
        );
        this.config.enableBrainLearning = false;
      }
    }
  }

  // 🛡️ RECURSION-SAFE BRAIN LEARNING (CORRECTED v20 LIGHTWEIGHT PATTERN)
  private async safeBrainLearning(
    action: string,
    result: string,
    metadata: any
  ): Promise<void> {
    const learningKey = `${action}-${result}`;

    // Check if this exact learning operation is already in progress
    if (CipherWatchdogHandler.learningInProgress.has(learningKey)) {
      console.log(`🛡️ Skipping duplicate learning operation: ${learningKey}`);
      return;
    }

    // Check if any learning is currently in progress
    if (CipherWatchdogHandler.isLearning) {
      console.log(`🛡️ Learning in progress, queuing: ${learningKey}`);

      // Queue the learning operation
      CipherWatchdogHandler.learningQueue.push(async () => {
        await this.executeBrainLearning(action, result, metadata, learningKey);
      });

      // Process queue if it's not too large (prevent memory buildup)
      if (CipherWatchdogHandler.learningQueue.length > 10) {
        console.log("🛡️ Learning queue too large, clearing oldest operations");
        CipherWatchdogHandler.learningQueue =
          CipherWatchdogHandler.learningQueue.slice(-5);
      }

      return;
    }

    // Execute immediately
    await this.executeBrainLearning(action, result, metadata, learningKey);

    // Process any queued operations
    await this.processLearningQueue();
  }

  private async executeBrainLearning(
    action: string,
    result: string,
    metadata: any,
    learningKey: string
  ): Promise<void> {
    CipherWatchdogHandler.isLearning = true;
    CipherWatchdogHandler.learningInProgress.add(learningKey);

    try {
      console.log(
        `🚀 [v20] CipherWatchdog Brain Learning ENTRY - Action: ${action}, Result: ${result}`
      );

      // ✅ Lightweight metadata for v20 brain unification (NO session saving)
      const enhancedMetadata = {
        ...metadata,
        handlerName: "CipherWatchdog",
        version: "v20-UNIFIED",
        timestamp: new Date().toISOString(),
        // Watchdog-specific learning data only
        totalEvents: this.eventsLog.length,
        isRecursionProtected: true,
      };

      // ✅ v20 CRITICAL FIX: Brain initialization in actually-called function
      console.log(`🧠 [v20] CRITICAL FIX: Calling initializeBrainSystem()...`);
      try {
        const { initializeBrainSystem } = await import("../../shared/utils");
        const initialized = await initializeBrainSystem();
        console.log(
          `🧠 [v20] Watchdog brain initialization result: ${initialized ? "✅ SUCCESS" : "❌ FAILED"}`
        );

        if (!initialized) {
          console.log(`🧠 [v20] Brain not available, using fallback learning`);
          await this.fallbackBrainLearning(action, result, enhancedMetadata);
          return;
        }
      } catch (initError) {
        console.log(
          `🧠 [v20] Brain initialization failed: ${initError}, using fallback learning`
        );
        await this.fallbackBrainLearning(action, result, enhancedMetadata);
        return;
      }

      // ✅ Proper brain interface usage with null checking
      const brainInterface = getBrainInterface();
      if (!brainInterface) {
        console.log(
          `🧠 [v20] Brain interface not available, using fallback learning`
        );
        await this.fallbackBrainLearning(action, result, enhancedMetadata);
        return;
      }

      console.log(`🧠 [v20] Safe brain learning: ${learningKey}`);
      await brainInterface.learnFromAction(action, result, enhancedMetadata);
      console.log(`✅ [v20] Brain learning completed: ${learningKey}`);

      // ✅ Brain debug with available interface
      console.log(`🧠 [v20] Brain Debug - SUCCESS Learning:
        - Brain Interface: ✅ AVAILABLE
        - Action: ${action}
        - Result: ${result}`);
    } catch (error) {
      console.error(
        `❌ [v20] Brain learning failed for ${learningKey}:`,
        error
      );

      if (
        error instanceof Error &&
        error.message.includes("Maximum call stack size exceeded")
      ) {
        console.log(
          "🛡️ [v20] Stack overflow detected in brain learning - disabling"
        );
        this.config.enableBrainLearning = false;
      }
    } finally {
      CipherWatchdogHandler.learningInProgress.delete(learningKey);
      CipherWatchdogHandler.isLearning = false;
    }
  }

  private async processLearningQueue(): Promise<void> {
    while (
      CipherWatchdogHandler.learningQueue.length > 0 &&
      !CipherWatchdogHandler.isLearning
    ) {
      const operation = CipherWatchdogHandler.learningQueue.shift();
      if (operation) {
        try {
          await operation();
        } catch (error) {
          console.error("🚨 Queued learning operation failed:", error);
        }
      }
    }
  }

  // ✅ Fallback brain learning when brain interface is not available
  private async fallbackBrainLearning(
    action: string,
    result: string,
    metadata: any
  ): Promise<void> {
    try {
      console.log(`🧠 [v20] Fallback learning for: ${action} - ${result}`);
      // Use the direct brain connector as fallback
      await this.brainConnector.learnFromAction(action, result, metadata);
      console.log(`✅ [v20] Fallback brain learning completed`);
    } catch (error) {
      console.error(`❌ [v20] Fallback brain learning failed:`, error);
    }
  }

  private async detectSuspiciousActivity(
    eventType: string,
    folderPath: string
  ): Promise<string[]> {
    const suspicious: string[] = [];

    // Check timing patterns
    const recentEvents = this.eventsLog.filter(
      (e) => Date.now() - new Date(e.timestamp).getTime() < 5000 // Last 5 seconds
    );

    if (recentEvents.length > 2) {
      suspicious.push("Rapid folder activity detected");
    }

    // Check if folder appears right after VS Code startup
    if (this.eventsLog.length < 3) {
      suspicious.push("Folder created during VS Code startup");
    }

    // Check for patterns
    const brainFolderCreations = this.eventsLog.filter(
      (e) =>
        e.folderName.toLowerCase().includes("brain") &&
        e.eventType === "created"
    );

    if (brainFolderCreations.length > 1) {
      suspicious.push("Recurring brain folder creation pattern");
    }

    // Check if it's the exact mystery folder
    if (folderPath.endsWith("/maestro-ai/cipher-engine-clean-v2/brain")) {
      suspicious.push("EXACT MYSTERY FOLDER - This is the one!");
    }

    // Check for potential recursion triggers
    if (CipherWatchdogHandler.isLearning && eventType === "created") {
      suspicious.push(
        "Folder created while brain learning active (potential recursion)"
      );
    }

    return suspicious;
  }

  private async captureStackTrace(): Promise<string> {
    try {
      // Get call stack (simplified for VS Code environment)
      const error = new Error();
      return (
        error.stack?.split("\n").slice(0, 10).join("\n") ||
        "Stack not available"
      );
    } catch {
      return "Unable to capture stack trace";
    }
  }

  private getActiveExtensions(): string[] {
    try {
      return vscode.extensions.all
        .filter((ext) => ext.isActive)
        .map((ext) => `${ext.id} (${ext.packageJSON.version})`)
        .slice(0, 10); // Limit to top 10 for logging
    } catch {
      return ["Unable to get extensions"];
    }
  }

  private async logEvent(event: WatchdogEvent): Promise<void> {
    const logMessage = `
🚨 WATCHDOG EVENT DETECTED:
- Time: ${event.timestamp}
- Action: ${event.eventType.toUpperCase()}
- Folder: ${event.folderName}
- Path: ${event.folderPath}
- Suspicious: ${event.suspiciousActivity?.join(", ") || "None"}
- Active Extensions: ${event.vscodeExtensions?.length || 0}
`;

    // Console logging
    if (this.config.logToConsole) {
      console.log(logMessage);
    }

    // File logging
    if (this.config.logToFile && this.logDir) {
      const logFile = path.join(
        this.logDir,
        `watchdog-${new Date().toISOString().split("T")[0]}.log`
      );

      try {
        fs.appendFileSync(logFile, logMessage + "\n");
      } catch (error) {
        console.warn("Failed to write watchdog log:", error);
      }
    }
  }

  private generateRecommendations(): string {
    const brainEvents = this.eventsLog.filter((e) =>
      e.folderName.toLowerCase().includes("brain")
    );

    if (brainEvents.length === 0) {
      return "- Continue monitoring. No brain folder activity detected yet.";
    }

    const recommendations = [
      "- Check if any VS Code extensions are creating folders automatically",
      "- Review recent git operations that might create folders",
      "- Check if any npm scripts or build processes create folders",
      "- Look for any file watchers or auto-sync tools",
    ];

    if (brainEvents.length > 2) {
      recommendations.push(
        "- Pattern detected! Check the timestamps for clues about triggers"
      );
    }

    // Add stack overflow specific recommendations
    if (!this.config.enableBrainLearning) {
      recommendations.push(
        "- Brain learning disabled due to recursion protection",
        "- Consider reviewing BrainConnector.learnFromAction() for recursive calls"
      );
    }

    return recommendations.join("\n");
  }

  private ensureLogDirectory(): void {
    if (this.logDir && !fs.existsSync(this.logDir)) {
      try {
        fs.mkdirSync(this.logDir, { recursive: true });
        console.log(`🕵️ Created watchdog log directory: ${this.logDir}`);
      } catch (error) {
        console.warn("Failed to create watchdog log directory:", error);
      }
    }
  }

  private async showReport(): Promise<void> {
    const report = this.generateReport();

    // Create and show report in new document
    const doc = await vscode.workspace.openTextDocument({
      content: report,
      language: "plaintext",
    });
    await vscode.window.showTextDocument(doc);
  }
}

// ===== COMMAND HANDLERS =====

/**
 * 🚀 Start Watchdog Command (PROTECTED VERSION)
 */
export async function startCipherWatchdogHandler(): Promise<void> {
  try {
    const brainConnector = getBrainInterface();
    const watchdog = new CipherWatchdogHandler(brainConnector!);

    await watchdog.startWatching();

    // Store instance globally for stop command
    (global as any).cipherWatchdog = watchdog;

    console.log(
      "✅ Cipher Watchdog started successfully with stack overflow protection"
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to start Cipher Watchdog:", errorMessage);

    if (errorMessage.includes("Maximum call stack size exceeded")) {
      vscode.window.showErrorMessage(
        `🛡️ Watchdog failed due to stack overflow. This suggests a recursion issue in the brain learning system. The handler has been updated with protection.`
      );
    } else {
      vscode.window.showErrorMessage(
        `🕵️ Watchdog failed to start: ${errorMessage}`
      );
    }
  }
}

/**
 * 🛑 Stop Watchdog Command
 */
export async function stopCipherWatchdogHandler(): Promise<void> {
  try {
    const watchdog = (global as any).cipherWatchdog as CipherWatchdogHandler;
    if (watchdog) {
      watchdog.stopWatching();
      (global as any).cipherWatchdog = null;
    } else {
      vscode.window.showWarningMessage("🕵️ Watchdog was not running");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to stop Cipher Watchdog:", errorMessage);
    vscode.window.showErrorMessage(
      `🕵️ Failed to stop watchdog: ${errorMessage}`
    );
  }
}

/**
 * 🧠 Toggle Brain Learning Command
 */
export async function toggleWatchdogBrainLearningHandler(): Promise<void> {
  try {
    const watchdog = (global as any).cipherWatchdog as CipherWatchdogHandler;
    if (watchdog) {
      // Get current status (this would need to be exposed in the class)
      const choice = await vscode.window.showQuickPick(
        ["Enable Brain Learning", "Disable Brain Learning"],
        { placeHolder: "Choose brain learning setting" }
      );

      if (choice) {
        const enable = choice.includes("Enable");
        watchdog.setBrainLearning(enable);
        vscode.window.showInformationMessage(
          `🧠 Brain learning ${enable ? "enabled" : "disabled"}`
        );
      }
    } else {
      vscode.window.showWarningMessage("🕵️ Start watchdog first");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to toggle brain learning:", errorMessage);
    vscode.window.showErrorMessage(
      `🕵️ Failed to toggle brain learning: ${errorMessage}`
    );
  }
}

/**
 * 🧠 Test Brain Integration Command (v20 Unification)
 */
export async function testWatchdogBrainIntegrationHandler(): Promise<void> {
  try {
    const watchdog = (global as any).cipherWatchdog as CipherWatchdogHandler;
    if (watchdog) {
      const success = await watchdog.testBrainIntegration();

      if (success) {
        vscode.window.showInformationMessage(
          "🧠 Watchdog Brain Integration: ✅ ALL TESTS PASSED"
        );
      } else {
        vscode.window.showWarningMessage(
          "🧠 Watchdog Brain Integration: ❌ TESTS FAILED - Check console logs"
        );
      }
    } else {
      vscode.window.showWarningMessage(
        "🕵️ Start watchdog first to test brain integration"
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to test brain integration:", errorMessage);
    vscode.window.showErrorMessage(
      `🧠 Brain integration test failed: ${errorMessage}`
    );
  }
}

/**
 * 📊 Generate Report Command
 */
export async function generateWatchdogReportHandler(): Promise<void> {
  try {
    const watchdog = (global as any).cipherWatchdog as CipherWatchdogHandler;
    if (watchdog) {
      const report = watchdog.generateReport();

      // Create and show report in new document
      const doc = await vscode.workspace.openTextDocument({
        content: report,
        language: "plaintext",
      });
      await vscode.window.showTextDocument(doc);
    } else {
      vscode.window.showWarningMessage(
        "🕵️ Start watchdog first to generate report"
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ Failed to generate watchdog report:", errorMessage);
    vscode.window.showErrorMessage(
      `🕵️ Failed to generate report: ${errorMessage}`
    );
  }
}
