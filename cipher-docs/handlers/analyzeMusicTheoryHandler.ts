// handlers/music/composition/analyzeMusicTheoryHandler.ts
import * as path from "path";
import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import { displayBrainSuggestions } from "../../../shared/displayUtils";
import {
  getBrainInterface,
  getFileType,
  isBrainAvailable,
  shareAnalysisData,
} from "../../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../../brain/BrainConnector";


export async function analyzeMusicTheoryHandler(): Promise<void> {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("🎼 No active file to analyze");
      return;
    }

    const document = editor.document;
    const text = document.getText();
    const fileName = document.fileName;
    const fileType = getFileType(fileName);

    vscode.window.showInformationMessage(
      "🎼 Analyzing music theory content with AI..."
    );

    // Enhanced music theory analysis
    const musicTheoryAnalysis = analyzeMusicTheoryContent(text);

    // Use brain analysis if available
    if (isBrainAvailable()) {
      const brainInterface = getBrainInterface();
      if (!brainInterface) {
        vscode.window.showWarningMessage("Brain interface not available");
        return;
      }
      const brainAnalysis = await brainInterface.analyzeCurrentFile(editor);

      // Combine analyses
      musicTheoryAnalysis.brainInsights = brainAnalysis.brainInsights || [];
    }

    // Show results using established display patterns
    await displayMusicTheoryAnalysis(musicTheoryAnalysis, fileName);

    // Share with brain
    await shareAnalysisData("music-theory", {
      action: "music-theory-analysis",
      fileType,
      chordsFound: musicTheoryAnalysis.chords.length,
      scalesFound: musicTheoryAnalysis.scales.length,
      conceptsFound: musicTheoryAnalysis.concepts.length,
      success: true,
      timestamp: Date.now(),
    });

    vscode.window.showInformationMessage(
      "✅ Music theory analysis complete! 🎼"
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("🎼 Music theory analysis error:", error);

    await shareAnalysisData("music-theory", {
      action: "music-theory-analysis",
      success: false,
      error: errorMessage,
      timestamp: Date.now(),
    });

    vscode.window.showErrorMessage(
      `🎼 Music theory analysis failed: ${errorMessage}`
    );
  }
}

function analyzeMusicTheoryContent(text: string): any {
  const analysis = {
    chords: [] as string[],
    scales: [] as string[],
    keys: [] as string[],
    concepts: [] as string[],
    suggestions: [] as string[],
    brainInsights: [] as any[],
  };

  // Detect chords (enhanced pattern)
  const chordPattern = /\b[A-G][#b]?(maj|min|dim|aug|add|sus|\d+)?\b/g;
  const chordMatches = text.match(chordPattern) || [];
  analysis.chords = [...new Set(chordMatches)];

  // Detect scales
  const scalePattern =
    /\b[A-G][#b]?\s+(major|minor|dorian|phrygian|lydian|mixolydian|aeolian|locrian|pentatonic|blues)\b/gi;
  const scaleMatches = text.match(scalePattern) || [];
  analysis.scales = [...new Set(scaleMatches)];

  // Detect music theory concepts
  const concepts = [
    "cadence",
    "progression",
    "modulation",
    "voice leading",
    "counterpoint",
    "harmony",
    "melody",
    "rhythm",
    "meter",
    "key signature",
    "time signature",
    "interval",
    "chord inversion",
    "resolution",
    "tension",
    "functional harmony",
    "secondary dominant",
  ];

  analysis.concepts = concepts.filter((concept) =>
    text.toLowerCase().includes(concept)
  );

  // Generate intelligent suggestions
  if (analysis.chords.length > 0) {
    analysis.suggestions.push(
      "Consider analyzing chord function and voice leading"
    );
    analysis.suggestions.push(
      "Check for common chord progressions (I-V-vi-IV, etc.)"
    );
  }
  if (analysis.scales.length > 0) {
    analysis.suggestions.push("Explore modal characteristics and applications");
    analysis.suggestions.push(
      "Analyze scale relationships and modulation opportunities"
    );
  }
  if (analysis.concepts.length === 0) {
    analysis.suggestions.push(
      "Add more music theory terminology for enhanced analysis"
    );
  }
  if (
    analysis.concepts.includes("harmony") &&
    analysis.concepts.includes("melody")
  ) {
    analysis.suggestions.push(
      "Consider counterpoint analysis between harmony and melody"
    );
  }

  return analysis;
}

async function displayMusicTheoryAnalysis(
  analysis: any,
  fileName: string
): Promise<void> {
  const channel = vscode.window.createOutputChannel("Music Theory Analysis v9");
  channel.clear();
  channel.appendLine(`🎼 Music Theory Analysis: ${path.basename(fileName)}`);
  channel.appendLine("=".repeat(60));

  channel.appendLine(`\n🎵 Chords Found (${analysis.chords.length}):`);
  if (analysis.chords.length > 0) {
    analysis.chords.forEach((chord: string) => {
      channel.appendLine(`  • ${chord}`);
    });
  } else {
    channel.appendLine("  No chords detected");
  }

  channel.appendLine(`\n🎶 Scales Found (${analysis.scales.length}):`);
  if (analysis.scales.length > 0) {
    analysis.scales.forEach((scale: string) => {
      channel.appendLine(`  • ${scale}`);
    });
  } else {
    channel.appendLine("  No scales detected");
  }

  channel.appendLine(`\n📚 Theory Concepts (${analysis.concepts.length}):`);
  if (analysis.concepts.length > 0) {
    analysis.concepts.forEach((concept: string) => {
      channel.appendLine(`  • ${concept}`);
    });
  } else {
    channel.appendLine("  No theory concepts detected");
  }

  if (analysis.brainInsights && analysis.brainInsights.length > 0) {
    channel.appendLine(`\n🧠 Brain Insights:`);
    analysis.brainInsights.forEach((insight: any) => {
      channel.appendLine(`  • ${insight.message || insight}`);
    });
  }

  channel.appendLine(`\n💡 Suggestions (${analysis.suggestions.length}):`);
  analysis.suggestions.forEach((suggestion: string) => {
    channel.appendLine(`  • ${suggestion}`);
  });

  channel.appendLine(`\n📊 Analysis Summary:`);
  channel.appendLine(
    `  • Total Musical Elements: ${analysis.chords.length + analysis.scales.length + analysis.concepts.length}`
  );
  channel.appendLine(
    `  • Analysis Depth: ${analysis.concepts.length > 5 ? "Deep" : analysis.concepts.length > 2 ? "Moderate" : "Basic"}`
  );
  channel.appendLine(`  • Generated: ${new Date().toLocaleString()}`);

  channel.show();

  // Display brain suggestions if available
  if (analysis.brainInsights && analysis.brainInsights.length > 0) {
    await displayBrainSuggestions(analysis.brainInsights);
  }
}
