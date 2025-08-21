// handlers/music/composition/createChordProgressionHandler.ts
import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import {
  ensureDirectoryExists,
  getBrainInterface,
  isBrainAvailable,
  shareAnalysisData,
} from "../../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../../brain/BrainConnector";


export async function createChordProgressionHandler(): Promise<void> {
  try {
    // Get musical key
    const musicalKey = await vscode.window.showQuickPick(
      [
        "C Major",
        "G Major",
        "D Major",
        "A Major",
        "E Major",
        "B Major",
        "F# Major",
        "C# Major",
        "F Major",
        "Bb Major",
        "Eb Major",
        "Ab Major",
        "Db Major",
        "Gb Major",
        "A Minor",
        "E Minor",
        "B Minor",
        "F# Minor",
        "C# Minor",
        "G# Minor",
        "D# Minor",
        "A# Minor",
        "D Minor",
        "G Minor",
        "C Minor",
        "F Minor",
        "Bb Minor",
        "Eb Minor",
      ],
      {
        placeHolder: "Select musical key",
      }
    );

    if (!musicalKey) return;

    // Get genre/style
    const style = await vscode.window.showQuickPick(
      [
        "🎸 Pop/Rock",
        "🎷 Jazz",
        "🎹 Classical",
        "🎵 Folk/Country",
        "🎤 R&B/Soul",
        "🎶 Electronic",
        "🎸 Blues",
        "🎵 Gospel",
      ],
      {
        placeHolder: "Select musical style",
      }
    );

    if (!style) return;

    // Get progression length
    const length = await vscode.window.showQuickPick(
      ["4 chords", "6 chords", "8 chords", "12 chords (blues)", "16 chords"],
      {
        placeHolder: "Select progression length",
      }
    );

    if (!length) return;

    vscode.window.showInformationMessage(
      "🎼 Generating AI chord progression..."
    );

    // Use brain intelligence if available
    let progression;
    if (isBrainAvailable()) {
      const brainInterface = getBrainInterface();
      progression = await generateIntelligentChordProgression(
        musicalKey,
        style,
        length,
        brainInterface
      );
    } else {
      progression = await generateBasicChordProgression(
        musicalKey,
        style,
        length
      );
    }

    // Create progression file
    await createChordProgressionFile(progression, musicalKey, style);

    // Share with brain
    if (isBrainAvailable()) {
      await shareAnalysisData("music-theory", {
        action: "chord-progression-creation",
        key: musicalKey,
        style,
        length,
        success: true,
        timestamp: Date.now(),
      });
    }

    vscode.window.showInformationMessage("✅ Chord progression created! 🎼");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("🎼 Chord progression creation error:", error);

    await shareAnalysisData("music-theory", {
      action: "chord-progression-creation",
      success: false,
      error: errorMessage,
      timestamp: Date.now(),
    });

    vscode.window.showErrorMessage(
      `🎼 Chord progression creation failed: ${errorMessage}`
    );
  }
}

async function generateIntelligentChordProgression(
  key: string,
  style: string,
  length: string,
  brainInterface: any
): Promise<string> {
  try {
    // Try to get AI-generated progression from brain
    const aiProgression = await brainInterface.generateMusicComponent({
      type: "chord-progression",
      key,
      style,
      length,
    });

    if (aiProgression && aiProgression.content) {
      return aiProgression.content;
    }
  } catch (error) {
    console.warn("Brain progression generation failed, using fallback");
  }

  return generateBasicChordProgression(key, style, length);
}

async function generateBasicChordProgression(
  key: string,
  style: string,
  length: string
): Promise<string> {
  // Fallback chord progressions
  const progressions = {
    "C Major": {
      "🎸 Pop/Rock": ["C", "Am", "F", "G"],
      "🎷 Jazz": ["Cmaj7", "Am7", "Dm7", "G7"],
      "🎹 Classical": ["C", "F", "G", "C"],
    },
    // Add more progressions as needed
  };

  const baseProgression = progressions["C Major"]["🎸 Pop/Rock"]; // Default

  return `# 🎼 AI-Generated Chord Progression

**Key:** ${key}  
**Style:** ${style}  
**Length:** ${length}  
**Generated:** ${new Date().toLocaleDateString()}

## 🎵 Chord Progression
\`\`\`
${baseProgression.join(" - ")}
\`\`\`

## 🎸 Guitar Chord Charts
${baseProgression
  .map(
    (chord) => `### ${chord}
\`\`\`
[Guitar chord diagram for ${chord}]
\`\`\``
  )
  .join("\n")}

## 🎹 Piano Voicings
${baseProgression.map((chord) => `**${chord}:** Root position (add specific voicings)`).join("\n")}

## 🎵 Suggested Patterns
- Pattern 1: D-D-U-U-D-U (${style})
- Pattern 2: D-D-U-D-U-D-U
- Pattern 3: D-U-X-U-D-U-X-U

---
*Generated by Cipher AI Music Composition System*`;
}

async function createChordProgressionFile(
  content: string,
  key: string,
  style: string
): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    throw new Error("No workspace folder found");
  }

  const fileName = `${key.replace(" ", "")}_${style
    .replace(/[🎸🎷🎹🎵🎤🎶]/g, "")
    .trim()
    .replace(/\s+/g, "")}_Progression.md`;
  const progressionsDir = vscode.Uri.joinPath(
    workspaceFolder.uri,
    "chord-progressions"
  );

  await ensureDirectoryExists(progressionsDir);

  const fileUri = vscode.Uri.joinPath(progressionsDir, fileName);
  await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content));

  // Open the created file
  const doc = await vscode.workspace.openTextDocument(fileUri);
  await vscode.window.showTextDocument(doc);
}
