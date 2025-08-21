// handlers/music/audio/createSongwritersStudioHandler.ts
// Handler Version: createSongwritersStudioHandler-v20 (August 16th, 2025)
// 🔧 FIXED: Removed prototype extensions causing stack overflow + v20 brain unification

import * as vscode from "vscode";
// ✅ CLEAN ARCHITECTURE: Feature handlers use getBrainInterface() only
// ❌ REMOVED: BrainConnector import (causes stack overflow with prototype extensions)
// ✅ UNIFIED ARCHITECTURE IMPORTS
import {
  ensureDirectoryExists,
  getBrainInterface,
  isBrainAvailable,
  shareAnalysisData,
} from "../../../shared/utils";

import {
  generateAISongwritingSuggestions,
  generateEnhancedChordChart,
  generateEnhancedLyricsTemplate,
  generateRecordingNotesTemplate,
  getArrangementIdeas,
  getLyricalTheme,
  getRecordingApproach,
  getRhythmGuidance,
  getVocalTreatment,
} from "../../../shared/musicUtils";

// ✅ CLEAN v20 PATTERN for Feature Handlers (Music):
// Feature handlers ONLY learn from actions - they don't control the learning system

async function performBrainLearning(
  action: string,
  result: "success" | "failure",
  context?: any
): Promise<void> {
  console.log(
    `🚀 [v20] createSongwritersStudioHandler Brain Learning ENTRY - Action: ${action}, Success: ${result === "success"}`
  );

  // ✅ CRITICAL: Brain initialization in actually-called function
  console.log(`🧠 [v20] CRITICAL FIX: Calling initializeBrainSystem()...`);
  try {
    const { initializeBrainSystem } = await import("../../../shared/utils");
    const initialized = await initializeBrainSystem();
    console.log(
      `🧠 [v20] Brain initialization result: ${initialized ? "✅ SUCCESS" : "❌ FAILED"}`
    );
  } catch (initError) {
    console.log(`🧠 [v20] Brain initialization failed: ${initError}`);
  }

  // ✅ EXISTING PATTERN: Use getBrainInterface() (already working!)
  try {
    const brainInterface = getBrainInterface();
    if (brainInterface) {
      // ✅ FIXED: Build context object safely
      const learningContext = {
        handlerName: "createSongwritersStudioHandler",
        version: "v20",
      };

      // Add original context if it exists
      if (context) {
        Object.assign(learningContext, context);
      }

      await brainInterface.learnFromAction(action, result, learningContext);
      console.log(`✅ [v20] Brain learning SUCCESS for ${action}`);
    }
  } catch (error) {
    console.warn("Brain learning failed:", error);
  }
}
export async function createSongwritersStudioHandler(): Promise<void> {
  try {
    // Get songwriting starting point with enhanced options
    const startingPoint = await vscode.window.showQuickPick(
      [
        "🎤 Start with Vocal Melody (A Cappella)",
        "🎸 Start with Guitar Chords",
        "🎹 Start with Piano/Keys",
        "📝 Start with Lyrics Only",
        "🎵 Start with Existing Audio Sample",
        "🎶 Start with Rhythm/Beat",
        "💡 AI-Generated Song Idea",
        "🎼 Start with Chord Progression",
        "🎯 Start with Hook/Riff",
      ],
      {
        placeHolder: "How do you want to start writing your song?",
      }
    );

    if (!startingPoint) return;

    // Get song style/genre with expanded options
    const songStyle = await vscode.window.showQuickPick(
      [
        "🎸 Pop/Rock",
        "🎤 R&B/Soul",
        "🎵 Folk/Acoustic",
        "🎶 Electronic/EDM",
        "🎷 Jazz/Blues",
        "🎹 Classical/Orchestral",
        "🎪 Alternative/Indie",
        "🎤 Hip-Hop/Rap",
        "🎸 Country/Americana",
        "🎵 World/Fusion",
      ],
      {
        placeHolder: "Select song style/genre",
      }
    );

    if (!songStyle) return;

    // Get target mood/emotion with more options
    const mood = await vscode.window.showQuickPick(
      [
        "😊 Happy/Uplifting",
        "😢 Sad/Melancholic",
        "❤️ Romantic/Love",
        "🔥 Energetic/Powerful",
        "😌 Calm/Peaceful",
        "😤 Angry/Intense",
        "🤔 Contemplative/Deep",
        "🎉 Celebratory/Joyful",
        "😔 Nostalgic/Wistful",
        "🔮 Mysterious/Ethereal",
      ],
      {
        placeHolder: "Select target mood/emotion",
      }
    );

    if (!mood) return;

    // Get collaboration preferences
    const collaborationMode = await vscode.window.showQuickPick(
      [
        "🎯 Solo Writing Session",
        "🤝 Collaborative Workspace",
        "🧠 AI Co-Writer Mode",
        "📚 Learning/Educational Mode",
      ],
      {
        placeHolder: "Select writing mode",
      }
    );

    if (!collaborationMode) return;

    vscode.window.showInformationMessage(
      "🎵 Launching AI Songwriter's Studio..."
    );

    const songProject = await createSongwritingProject(
      startingPoint,
      songStyle,
      mood,
      collaborationMode
    );

    // Create comprehensive songwriting workspace
    await createSongwritingWorkspace(songProject);

    // Generate initial AI suggestions if brain available
    if (isBrainAvailable() && collaborationMode.includes("AI Co-Writer")) {
      await generateAISongwritingSuggestions(songProject);
    }

    // Share with brain for learning
    await shareAnalysisData("music-theory", {
      action: "songwriters-studio-creation",
      startingPoint,
      songStyle,
      mood,
      collaborationMode,
      success: true,
      timestamp: Date.now(),
    });

    // 🧠 v20 BRAIN INTEGRATION: Now feeds analysis results to brain for continuous learning
    await performBrainLearning("songwriters-studio-creation", "success", {
      startingPoint,
      songStyle,
      mood,
      collaborationMode,
      aiSuggestionsGenerated: collaborationMode.includes("AI Co-Writer"),
      timestamp: Date.now(),
    });

    vscode.window.showInformationMessage(
      "✅ Songwriter's Studio created! Start creating your masterpiece! 🎵"
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("🎵 Songwriter's Studio creation error:", error);

    await shareAnalysisData("music-theory", {
      action: "songwriters-studio-creation",
      success: false,
      error: errorMessage,
      timestamp: Date.now(),
    });

    // 🧠 v20 BRAIN INTEGRATION: Learn from failures too
    await performBrainLearning("songwriters-studio-creation", "failure", {
      error: errorMessage,
      timestamp: Date.now(),
    });

    vscode.window.showErrorMessage(
      `🎵 Songwriter's Studio creation failed: ${errorMessage}`
    );
  }
}

async function createSongwritingProject(
  startingPoint: string,
  style: string,
  mood: string,
  collaborationMode: string
): Promise<any> {
  return {
    id: `song_${Date.now()}`,
    startingPoint,
    style,
    mood,
    collaborationMode,
    timestamp: new Date(),
    structure: {
      intro: "",
      verse1: "",
      chorus: "",
      verse2: "",
      bridge: "",
      outro: "",
    },
    metadata: {
      bpm: null,
      key: null,
      timeSignature: "4/4",
      duration: "3:30",
      targetAudience: null,
    },
    progress: {
      lyricsComplete: 0,
      musicComplete: 0,
      arrangementComplete: 0,
      productionReady: false,
    },
  };
}

async function createSongwritingWorkspace(project: any): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    throw new Error("No workspace folder found");
  }

  const projectDir = vscode.Uri.joinPath(
    workspaceFolder.uri,
    "songwriter-studio",
    project.id
  );
  await ensureDirectoryExists(projectDir);

  // Create main project structure
  const files = await createSongwritingFiles(project, projectDir);

  // Open the main song file
  const doc = await vscode.workspace.openTextDocument(files.mainSong);
  await vscode.window.showTextDocument(doc);

  // Show welcome message with quick actions
  const quickAction = await vscode.window.showInformationMessage(
    `🎵 Songwriter's Studio Ready!\n\nProject: ${project.id}\nMode: ${project.collaborationMode}`,
    "Open Lyrics",
    "Open Chords",
    "AI Suggestions",
    "Start Recording Ideas",
    "OK"
  );

  if (quickAction === "Open Lyrics") {
    const lyricsDoc = await vscode.workspace.openTextDocument(files.lyrics);
    await vscode.window.showTextDocument(lyricsDoc, vscode.ViewColumn.Beside);
  } else if (quickAction === "Open Chords") {
    const chordsDoc = await vscode.workspace.openTextDocument(files.chords);
    await vscode.window.showTextDocument(chordsDoc, vscode.ViewColumn.Beside);
  } else if (quickAction === "AI Suggestions" && isBrainAvailable()) {
    await generateAISongwritingSuggestions(project);
  }
}

async function createSongwritingFiles(
  project: any,
  projectDir: vscode.Uri
): Promise<any> {
  // Main song file
  const songContent = generateEnhancedSongTemplate(project);
  const songFile = vscode.Uri.joinPath(projectDir, "song.md");
  await vscode.workspace.fs.writeFile(songFile, Buffer.from(songContent));

  // Chord chart file
  const chordContent = generateEnhancedChordChart(project);
  const chordFile = vscode.Uri.joinPath(projectDir, "chords.md");
  await vscode.workspace.fs.writeFile(chordFile, Buffer.from(chordContent));

  // Lyrics file
  const lyricsContent = generateEnhancedLyricsTemplate(project);
  const lyricsFile = vscode.Uri.joinPath(projectDir, "lyrics.txt");
  await vscode.workspace.fs.writeFile(lyricsFile, Buffer.from(lyricsContent));

  // Recording notes
  const notesContent = generateRecordingNotesTemplate(project);
  const notesFile = vscode.Uri.joinPath(projectDir, "recording-notes.md");
  await vscode.workspace.fs.writeFile(notesFile, Buffer.from(notesContent));

  // Project metadata
  const metadataContent = JSON.stringify(project, null, 2);
  const metadataFile = vscode.Uri.joinPath(projectDir, "project-metadata.json");
  await vscode.workspace.fs.writeFile(
    metadataFile,
    Buffer.from(metadataContent)
  );

  return {
    mainSong: songFile,
    chords: chordFile,
    lyrics: lyricsFile,
    notes: notesFile,
    metadata: metadataFile,
  };
}

function generateEnhancedSongTemplate(project: any): string {
  return `# 🎵 Songwriter's Studio Project

**Project ID:** ${project.id}  
**Starting Point:** ${project.startingPoint}  
**Style:** ${project.style}  
**Mood:** ${project.mood}  
**Collaboration Mode:** ${project.collaborationMode}
**Created:** ${project.timestamp.toLocaleDateString()}

## 🎯 Song Overview
- **Working Title:** _[Enter your song title]_
- **Key:** _${getRecommendedKey(project.style, project.mood)}_
- **Tempo:** _${getRecommendedTempo(project.style)} BPM_
- **Time Signature:** ${project.metadata.timeSignature}
- **Target Length:** ${project.metadata.duration}

## 🏗️ Song Structure & Progress

### 📝 Intro (0:00 - 0:15) - ${project.progress.musicComplete > 0 ? "✅" : "⏳"} 
_${getAIStarterText(project.startingPoint, "intro", project.style)}_

### 🎵 Verse 1 (0:15 - 0:45) - ${project.progress.lyricsComplete > 25 ? "✅" : "⏳"}
_${getAIStarterText(project.startingPoint, "verse", project.style)}_

### 🎶 Chorus (0:45 - 1:15) - ${project.progress.lyricsComplete > 50 ? "✅" : "⏳"}
_${getAIStarterText(project.startingPoint, "chorus", project.style)}_

### 🎵 Verse 2 (1:15 - 1:45) - ${project.progress.lyricsComplete > 75 ? "✅" : "⏳"}
_Story development and thematic progression_

### 🎶 Chorus (1:45 - 2:15) - ${project.progress.lyricsComplete > 50 ? "✅" : "⏳"}
_Repeat with energy build and vocal variations_

### 🌉 Bridge (2:15 - 2:45) - ⏳
_Contrasting section - new perspective/climax_

### 🎶 Final Chorus (2:45 - 3:15) - ⏳
_Extended/modified with peak emotional impact_

### 🏁 Outro (3:15 - 3:30) - ⏳
_Satisfying resolution and fade_

## 🎸 Musical Elements
- **Primary Instruments:** ${getPrimaryInstruments(project.startingPoint)}
- **Chord Progression:** See chords.md
- **Melody Direction:** ${getMelodyGuidance(project.startingPoint)}
- **Rhythm Feel:** ${getRhythmGuidance(project.style)}
- **Arrangement Ideas:** ${getArrangementIdeas(project.style)}

## 📝 Lyrical Framework
- **Central Theme:** ${getLyricalTheme(project.mood)}
- **Narrative Style:** ${getNarrativeStyle(project.style)}
- **Perspective:** ${getRecommendedPerspective(project.mood)}
- **Rhyme Scheme:** ${getRecommendedRhymeScheme(project.style)}

## 🎙️ Production Vision
- **Recording Approach:** ${getRecordingApproach(project.startingPoint)}
- **Sound Palette:** ${getSoundPalette(project.style, project.mood)}
- **Vocal Treatment:** ${getVocalTreatment(project.startingPoint)}
- **Target Audience:** ${getTargetAudience(project.style, project.mood)}

## 📊 Progress Tracker
- [ ] Lyrics Complete (${project.progress.lyricsComplete}%)
- [ ] Music Complete (${project.progress.musicComplete}%)
- [ ] Basic Arrangement (${project.progress.arrangementComplete}%)
- [ ] Demo Recording Ready
- [ ] Production Ready

## 💡 Quick Actions
- 🎤 [Record Voice Memo](./voice-memos/)
- 🎸 [Chord Experiments](./chords.md)
- 📝 [Lyric Ideas](./lyrics.txt)  
- 🎵 [Melody Sketches](./melodies/)
- 🎛️ [Production Notes](./recording-notes.md)

---
*Generated by Cipher AI Songwriter's Studio v9*  
*${project.collaborationMode.includes("AI") ? "🧠 AI Co-Writer Active" : "🎯 Solo Writing Mode"}*`;
}

// Helper functions for intelligent songwriting guidance
function getRecommendedKey(style: string, mood: string): string {
  if (mood.includes("Happy")) return "C Major, G Major, or D Major";
  if (mood.includes("Sad")) return "A Minor, E Minor, or D Minor";
  if (mood.includes("Romantic")) return "F Major, Bb Major, or G Major";
  if (mood.includes("Energetic")) return "E Major, A Major, or B Major";
  return "C Major (versatile starting point)";
}

function getRecommendedTempo(style: string): string {
  if (style.includes("Pop/Rock")) return "120-130";
  if (style.includes("Folk")) return "80-100";
  if (style.includes("Electronic")) return "128-140";
  if (style.includes("R&B")) return "70-90";
  if (style.includes("Country")) return "100-120";
  return "120";
}

function getPrimaryInstruments(startingPoint: string): string {
  if (startingPoint.includes("Guitar"))
    return "Acoustic/Electric Guitar, Voice";
  if (startingPoint.includes("Piano")) return "Piano/Keys, Voice";
  if (startingPoint.includes("Vocal"))
    return "Voice (lead), supporting instruments TBD";
  return "Flexible - choose based on song development";
}

function getNarrativeStyle(style: string): string {
  if (style.includes("Folk")) return "Storytelling, narrative-driven";
  if (style.includes("Pop")) return "Universal themes, relatable situations";
  if (style.includes("R&B")) return "Personal, emotional, conversational";
  if (style.includes("Country")) return "Story-based, character-driven";
  return "Style-appropriate narrative approach";
}

function getRecommendedPerspective(mood: string): string {
  if (mood.includes("Romantic"))
    return "Second person (you) or first person intimate";
  if (mood.includes("Sad")) return "First person reflective";
  if (mood.includes("Happy"))
    return "First person celebratory or universal we/us";
  return "Choose perspective that serves the story";
}

function getRecommendedRhymeScheme(style: string): string {
  if (style.includes("Pop")) return "ABAB or AABA (accessible)";
  if (style.includes("Folk")) return "ABCB or narrative (story-focused)";
  if (style.includes("Hip-Hop")) return "Complex, internal rhymes";
  return "ABAB (versatile and musical)";
}

function getSoundPalette(style: string, mood: string): string {
  const styleElements = {
    "🎸 Pop/Rock": "Electric guitars, drums, bass, keys",
    "🎤 R&B/Soul": "Smooth keys, bass, subtle drums, brass",
    "🎵 Folk/Acoustic": "Acoustic guitar, light percussion, strings",
    "🎶 Electronic/EDM": "Synths, programmed drums, electronic textures",
  };

  const moodModifiers = {
    Happy: " - bright, uplifting tones",
    Sad: " - darker, warmer tones",
    Energetic: " - dynamic, powerful sounds",
    Calm: " - soft, ambient textures",
  };

  return (
    (styleElements[style] || "Appropriate instrumentation") +
    (moodModifiers[mood.split("/")[0]] || "")
  );
}

function getTargetAudience(style: string, mood: string): string {
  if (style.includes("Pop") && mood.includes("Happy"))
    return "Mainstream, all ages, radio-friendly";
  if (style.includes("Folk") && mood.includes("Contemplative"))
    return "Singer-songwriter fans, thoughtful listeners";
  if (style.includes("Electronic") && mood.includes("Energetic"))
    return "Dance/club audience, electronic music fans";
  return "Audience appropriate to style and mood";
}

// Additional helper functions following the same pattern...
function getAIStarterText(
  startingPoint: string,
  section: string,
  style: string
): string {
  // Implementation for context-aware AI starter text
  return `AI Guidance: Develop ${section} based on ${startingPoint} approach in ${style} style`;
}

function getMelodyGuidance(startingPoint: string): string {
  if (startingPoint.includes("Vocal"))
    return "Voice-led - melody is primary compositional element";
  if (startingPoint.includes("Guitar"))
    return "Guitar-informed - melody works with chord progressions";
  if (startingPoint.includes("Piano"))
    return "Piano-based - melody integrates with harmonic structure";
  return "Develop melody to serve the song's emotional core";
}
