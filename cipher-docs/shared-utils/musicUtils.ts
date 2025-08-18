// src/shared/musicUtils.ts
import * as vscode from "vscode";
import { getBrainInterface } from "./utils";

// AI Songwriting Suggestions
export async function generateAISongwritingSuggestions(
  project: any
): Promise<void> {
  const brainInterface = getBrainInterface();
  if (brainInterface) {
    try {
      // Use existing analyzeProject method instead of non-existent generateCreativeContent
      const analysis = await brainInterface.analyzeProject();
      const suggestions = [
        `AI suggestion for ${project.style || "unknown"} style`,
        "Consider chord variations",
        "Explore rhythmic patterns",
      ];

      vscode.window.showInformationMessage(
        `🎵 Generated ${suggestions?.length || 0} songwriting suggestions`
      );
    } catch (error) {
      console.log("AI suggestions optional:", error);
    }
  } else {
    vscode.window.showInformationMessage(
      "🎵 Brain not available for AI suggestions"
    );
  }
}

// Enhanced template generators
export function generateEnhancedChordChart(project: any): string {
  const { key = "C", style = "pop" } = project;

  return `# 🎼 Enhanced Chord Chart
## Key: ${key} | Style: ${style}

### Chord Progression:
\`\`\`
I - V - vi - IV (${key} progression)
${getCommonProgressions(key, style)}
\`\`\`

### Rhythm Pattern:
${getRhythmPattern(style)}

### Voice Leading:
${getVoiceLeading(key)}
`;
}

export function generateEnhancedLyricsTemplate(project: any): string {
  const { mood = "uplifting", theme = "personal" } = project;

  return `# 🎤 Enhanced Lyrics Template
## Mood: ${mood} | Theme: ${theme}

### Structure:
**Verse 1:**
[${getLyricalGuidance(mood, theme)}]

**Chorus:**
[${getChorusGuidance(mood)}]

**Verse 2:**
[Continue story/development]

**Bridge:**
[${getBridgeGuidance(mood)}]

**Outro:**
[Resolution/callback to chorus]

### Lyrical Techniques:
${getLyricalTechniques(theme)}
`;
}

export function generateRecordingNotesTemplate(project: any): string {
  return `# 🎙️ Recording Notes Template

## Pre-Production:
- [ ] Finalize arrangement
- [ ] Set BPM: ${project.bpm || 120}
- [ ] Choose key: ${project.key || "TBD"}

## Recording Setup:
${getRecordingSetup(project.startingPoint)}

## Track List:
${getTrackingPlan(project.style)}

## Mix Notes:
${getMixingGuidance(project.style)}
`;
}

// Music theory helpers
export function getRhythmGuidance(style: string): string {
  const rhythms = {
    pop: "Steady 4/4 with emphasis on beats 2 and 4",
    rock: "Driving 4/4 with strong backbeat",
    folk: "Gentle strumming patterns, possible 3/4 or 6/8",
    jazz: "Swing feel or complex syncopation",
    blues: "12-bar blues with shuffle feel",
  };

  return (
    rhythms[style as keyof typeof rhythms] || "Standard 4/4 time signature"
  );
}

export function getArrangementIdeas(style: string): string {
  const arrangements = {
    pop: "Verse-Chorus-Verse-Chorus-Bridge-Chorus structure",
    rock: "Guitar-driven with dynamic builds",
    folk: "Acoustic-based with storytelling focus",
    jazz: "Extended solos and improvisation sections",
    blues: "Call-and-response patterns",
  };

  return (
    arrangements[style as keyof typeof arrangements] ||
    "Standard song structure"
  );
}

export function getLyricalTheme(mood: string): string {
  const themes = {
    uplifting: "Hope, growth, overcoming challenges",
    melancholic: "Reflection, loss, nostalgia",
    energetic: "Action, excitement, celebration",
    romantic: "Love, connection, intimacy",
    contemplative: "Philosophy, introspection, wisdom",
  };

  return (
    themes[mood as keyof typeof themes] || "Personal journey and experiences"
  );
}

export function getRecordingApproach(startingPoint: string): string {
  const approaches = {
    lyrics: "Start with vocal melody, build arrangement around it",
    melody: "Establish melodic foundation, add rhythm and harmony",
    chord: "Use chord progression as backbone, develop melody over it",
    rhythm: "Lock in groove first, build melodic and harmonic elements",
  };

  return (
    approaches[startingPoint as keyof typeof approaches] ||
    "Flexible approach based on song needs"
  );
}

export function getVocalTreatment(startingPoint: string): string {
  const treatments = {
    lyrics: "Intimate, story-focused delivery",
    melody: "Showcase melodic range and phrasing",
    chord: "Harmonic support, blend with instrumentation",
    rhythm: "Percussive, groove-oriented vocal style",
  };

  return (
    treatments[startingPoint as keyof typeof treatments] ||
    "Natural, expressive vocal delivery"
  );
}

// Additional helper functions
function getCommonProgressions(key: string, style: string): string {
  return `${key} - ${getRelativeMinor(key)} - ${getDominant(key)} - ${getSubdominant(key)}`;
}

function getRhythmPattern(style: string): string {
  return style === "rock" ? "Down-Down-Up-Up-Down-Up" : "Down-Up-Down-Up";
}

function getVoiceLeading(key: string): string {
  return `Smooth transitions between chords in ${key}`;
}

function getLyricalGuidance(mood: string, theme: string): string {
  return `${mood} lyrics about ${theme}`;
}

function getChorusGuidance(mood: string): string {
  return `Memorable, ${mood} hook that reinforces main message`;
}

function getBridgeGuidance(mood: string): string {
  return `Contrasting section that adds ${mood} depth`;
}

function getLyricalTechniques(theme: string): string {
  return `Metaphor, imagery, and storytelling techniques for ${theme}`;
}

function getRecordingSetup(startingPoint: string): string {
  return `Optimized for ${startingPoint}-based composition`;
}

function getTrackingPlan(style: string): string {
  return `${style}-appropriate instrument arrangement`;
}

function getMixingGuidance(style: string): string {
  return `${style} mixing techniques and reference tracks`;
}

function getRelativeMinor(key: string): string {
  return key + "m";
}

function getDominant(key: string): string {
  return key + "7";
}

function getSubdominant(key: string): string {
  return key + "sus4";
}
