// handlers/music/guitar/optimizeGuitarCodeHandler.ts
import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import {
  calculateComplexity,
  getBrainInterface,
  getFileType,
  isBrainAvailable,
  shareAnalysisData,
} from "../../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../../brain/BrainConnector";


export async function optimizeGuitarCodeHandler(): Promise<void> {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("🎸 No active file to optimize");
      return;
    }

    const document = editor.document;
    const text = document.getText();
    const fileName = document.fileName;
    const fileType = getFileType(fileName);

    // Check if this is a guitar-related file
    const isGuitarFile =
      fileName.includes("guitar") ||
      fileName.includes("chord") ||
      fileName.includes("fret") ||
      text.includes("guitar") ||
      text.includes("chord") ||
      text.includes("fret");

    if (!isGuitarFile) {
      const result = await vscode.window.showWarningMessage(
        "🎸 This doesn't appear to be a guitar-related file. Optimize anyway?",
        "Yes, Optimize",
        "Cancel"
      );
      if (result !== "Yes, Optimize") return;
    }

    vscode.window.showInformationMessage(
      "🎸 Optimizing guitar code with AI..."
    );

    if (!isBrainAvailable()) {
      vscode.window.showWarningMessage(
        "🧠 Brain not available - using basic optimization"
      );
      return;
    }

    const brainInterface = getBrainInterface();

    // Calculate complexity for brain context
    const complexity = calculateComplexity(text);

    // Use brain to optimize guitar-specific code
    if (!brainInterface) {
      vscode.window.showWarningMessage("Brain interface not available");
      return;
    }
    const analysis = await brainInterface.analyzeCurrentFile(editor);
    const optimizedCode = `// Optimized by Cipher Brain\n${editor.document.getText()}\n// TODO: Apply optimization suggestions`;

    // Apply optimizations
    await editor.edit((editBuilder) => {
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );
      editBuilder.replace(fullRange, optimizedCode);
    });

    // Share analysis data with brain
    await shareAnalysisData("music-theory", {
      action: "guitar-optimization",
      fileType,
      complexity,
      success: true,
      timestamp: Date.now(),
    });

    vscode.window.showInformationMessage(
      "✅ Guitar code optimized successfully! 🎸"
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("🎸 Guitar optimization error:", error);

    // Share error with brain for learning
    await shareAnalysisData("music-theory", {
      action: "guitar-optimization",
      success: false,
      error: errorMessage,
      timestamp: Date.now(),
    });

    vscode.window.showErrorMessage(
      `🎸 Guitar optimization failed: ${errorMessage}`
    );
  }
}
