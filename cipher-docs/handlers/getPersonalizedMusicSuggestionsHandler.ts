// src/handlers/music/getPersonalizedMusicSuggestionsHandler.ts
import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import {
  displayBrainSuggestions,
  displayMusicSuggestions,
} from "../../shared/displayUtils";
import {
  getBrainInterface,
  isBrainAvailable,
  shareAnalysisData,
} from "../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../brain/BrainConnector";


// 🎵 Music suggestion types and interfaces
interface MusicPreferences {
  genres: string[];
  instruments: string[];
  skillLevel: "beginner" | "intermediate" | "advanced" | "professional";
  focusAreas: string[];
  learningGoals: string[];
  practiceTimeAvailable: number; // minutes
  preferredLearningStyle: "visual" | "auditory" | "kinesthetic" | "mixed";
}

interface MusicSuggestion {
  type: "practice" | "learning" | "composition" | "performance" | "theory";
  title: string;
  description: string;
  difficulty: number; // 1-10
  estimatedTime: number; // minutes
  categories: string[];
  resources?: string[];
  prerequisites?: string[];
  priority: "high" | "medium" | "low";
}

interface PersonalizedSuggestionsResponse {
  suggestions: MusicSuggestion[];
  reasoningContext: string;
  adaptiveRecommendations: string[];
  nextSteps: string[];
}

export async function getPersonalizedMusicSuggestionsHandler(): Promise<void> {
  try {
    vscode.window.showInformationMessage(
      "💡 Analyzing your musical journey..."
    );

    // 🧠 Brain availability check with enhanced feedback
    if (!isBrainAvailable()) {
      vscode.window.showWarningMessage(
        "🧠 Brain interface not available. Using basic suggestions mode."
      );
      await generateBasicSuggestions();
      return;
    }

    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      vscode.window.showWarningMessage("Failed to connect to brain interface");
      return;
    }

    // 🎯 Get user preferences and context
    const userPreferences = await getUserMusicPreferences();
    const projectContext = await analyzeCurrentProject();
    const practiceHistory = await getPracticeHistory();

    // 🧠 Share comprehensive analysis data
    await shareAnalysisData("personalized-music-analysis", {
      preferences: userPreferences,
      projectContext,
      practiceHistory,
      timestamp: new Date().toISOString(),
      requestType: "personalized-suggestions",
    });

    vscode.window.showInformationMessage(
      "🎵 Generating personalized recommendations..."
    );

    // 🎼 Generate personalized suggestions
    const personalizedResponse = await generatePersonalizedSuggestions(
      brainInterface,
      userPreferences,
      projectContext,
      practiceHistory
    );

    // 🧠 Display brain-enhanced suggestions
    await displayBrainSuggestions([
      `🎯 Generated ${personalizedResponse.suggestions.length} personalized recommendations`,
      `🎪 Focus areas identified: ${userPreferences.focusAreas.join(", ")}`,
      `⏰ Optimized for ${userPreferences.practiceTimeAvailable} minutes practice sessions`,
      `📈 Skill level: ${userPreferences.skillLevel}`,
      ...personalizedResponse.adaptiveRecommendations,
    ]);

    // 🎵 Display music suggestions with enhanced formatting
    await displayMusicSuggestions(
      personalizedResponse.suggestions.map((s) => s.title)
    );

    // 📊 Learn from successful suggestion generation
    const brainConnector = new BrainConnector();
    (brainConnector as any).learnFromAction(
      "generate-personalized-suggestions",
      "success",
      {
        suggestionsCount: personalizedResponse.suggestions.length,
        userPreferences,
        timestamp: new Date().toISOString(),
      }
    );

    // 🔄 Update user preferences based on interaction
    await updateUserMusicPreferences({
      ...userPreferences,
      lastSuggestionRequest: new Date().toISOString(),
      suggestionsReceived:
        (userPreferences as any).suggestionsReceived + 1 || 1,
    });

    vscode.window.showInformationMessage(
      `🎵✅ Generated ${personalizedResponse.suggestions.length} personalized music suggestions!`
    );

    // 🚀 Offer follow-up actions
    const followUpAction = await vscode.window.showQuickPick(
      [
        "📝 Create practice schedule",
        "🎯 Set learning goals",
        "📊 View detailed analytics",
        "🔄 Refresh suggestions",
        "⚙️ Update preferences",
        "Done",
      ],
      { placeHolder: "Would you like to take any follow-up actions?" }
    );

    if (followUpAction && followUpAction !== "Done") {
      await handleFollowUpAction(followUpAction, userPreferences);
    }
  } catch (error) {
    console.error("Personalized Music Suggestions Error:", error);

    // 🧠 Share error analysis
    await shareAnalysisData("music-suggestions-error", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      context: "personalized-suggestions-handler",
    });

    // 📝 Learn from failure
    const brainConnector = new BrainConnector();
    (brainConnector as any).learnFromAction(
      "generate-personalized-suggestions",
      "failure",
      { error: error instanceof Error ? error.message : String(error) }
    );

    vscode.window.showErrorMessage(
      `Failed to generate personalized music suggestions: ${error}`
    );
  }
}

async function getUserMusicPreferences(): Promise<MusicPreferences> {
  const stored = await getUserStoredPreferences("music");

  if (stored && Object.keys(stored).length > 0) {
    return stored as MusicPreferences;
  }

  // 🎵 Interactive preference gathering
  vscode.window.showInformationMessage(
    "🎯 Let's customize your music experience!"
  );

  const genres =
    (await vscode.window.showQuickPick(
      [
        "Classical",
        "Jazz",
        "Rock",
        "Pop",
        "Electronic",
        "Folk",
        "Blues",
        "Country",
        "R&B",
        "Hip-Hop",
        "World Music",
        "Experimental",
      ],
      {
        placeHolder:
          "Select your preferred genres (hold Ctrl/Cmd for multiple)",
        canPickMany: true,
      }
    )) || [];

  const instruments =
    (await vscode.window.showQuickPick(
      [
        "Piano",
        "Guitar",
        "Violin",
        "Drums",
        "Bass",
        "Vocals",
        "Saxophone",
        "Trumpet",
        "Flute",
        "Cello",
        "Synthesizer",
        "Ukulele",
      ],
      {
        placeHolder: "Select instruments you play or want to learn",
        canPickMany: true,
      }
    )) || [];

  const skillLevel =
    ((await vscode.window.showQuickPick(
      ["beginner", "intermediate", "advanced", "professional"],
      { placeHolder: "What's your overall skill level?" }
    )) as MusicPreferences["skillLevel"]) || "intermediate";

  const focusAreas =
    (await vscode.window.showQuickPick(
      [
        "Technique",
        "Theory",
        "Composition",
        "Improvisation",
        "Performance",
        "Recording",
        "Arrangement",
        "Ear Training",
      ],
      {
        placeHolder: "What areas would you like to focus on?",
        canPickMany: true,
      }
    )) || [];

  const practiceTime = await vscode.window.showInputBox({
    prompt: "How many minutes do you typically have for practice sessions?",
    value: "30",
    validateInput: (value) => {
      const num = parseInt(value);
      return isNaN(num) || num <= 0
        ? "Please enter a positive number"
        : undefined;
    },
  });

  const learningStyle =
    ((await vscode.window.showQuickPick(
      ["visual", "auditory", "kinesthetic", "mixed"],
      { placeHolder: "What's your preferred learning style?" }
    )) as MusicPreferences["preferredLearningStyle"]) || "mixed";

  const preferences: MusicPreferences = {
    genres,
    instruments,
    skillLevel,
    focusAreas,
    learningGoals: [], // Will be populated by brain analysis
    practiceTimeAvailable: parseInt(practiceTime || "30"),
    preferredLearningStyle: learningStyle,
  };

  await updateUserMusicPreferences(preferences);
  return preferences;
}

async function analyzeCurrentProject(): Promise<any> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) return null;

  try {
    // 🔍 Analyze current workspace for music-related files
    const files = await vscode.workspace.findFiles(
      "**/*.{mid,midi,wav,mp3,musicxml,abc,ly}"
    );
    const codeFiles = await vscode.workspace.findFiles(
      "**/*.{js,ts,jsx,tsx,py}"
    );

    return {
      hasAudioFiles: files.length > 0,
      audioFileCount: files.length,
      hasCodeFiles: codeFiles.length > 0,
      workspaceName: workspaceFolder.name,
      projectType: determineProjectType(files, codeFiles),
    };
  } catch (error) {
    console.log("Project analysis error:", error);
    return null;
  }
}

function determineProjectType(
  audioFiles: vscode.Uri[],
  codeFiles: vscode.Uri[]
): string {
  if (audioFiles.length > 10) return "audio-production";
  if (codeFiles.length > audioFiles.length && codeFiles.length > 5)
    return "music-software";
  if (audioFiles.length > 0) return "music-composition";
  if (codeFiles.length > 0) return "general-development";
  return "learning";
}

async function getPracticeHistory(): Promise<any> {
  // 🕐 Analyze recent activity patterns
  const stored = await getUserStoredPreferences("practice-history");
  return (
    stored || {
      sessionsThisWeek: 0,
      averageSessionLength: 30,
      commonPracticeAreas: [],
      lastPracticeDate: null,
      streakDays: 0,
    }
  );
}

async function generatePersonalizedSuggestions(
  brainInterface: any,
  preferences: MusicPreferences,
  projectContext: any,
  practiceHistory: any
): Promise<PersonalizedSuggestionsResponse> {
  try {
    // 🧠 Get brain-generated suggestions
    const brainSuggestions = await brainInterface.getPersonalizedSuggestions({
      type: "music",
      context: {
        preferences,
        projectContext,
        practiceHistory,
        timestamp: new Date().toISOString(),
      },
    });

    // 🎵 Generate comprehensive suggestions
    const suggestions: MusicSuggestion[] = [
      ...generateTechniqueSuggestions(preferences),
      ...generateTheorySuggestions(preferences),
      ...generateCompositionSuggestions(preferences, projectContext),
      ...generatePracticeSuggestions(preferences, practiceHistory),
      ...(brainSuggestions?.suggestions || []),
    ];

    // 🎯 Prioritize and filter suggestions
    const prioritizedSuggestions = prioritizeSuggestions(
      suggestions,
      preferences,
      practiceHistory
    );

    return {
      suggestions: prioritizedSuggestions.slice(0, 12), // Top 12 suggestions
      reasoningContext: generateReasoningContext(preferences, projectContext),
      adaptiveRecommendations: generateAdaptiveRecommendations(
        preferences,
        practiceHistory
      ),
      nextSteps: generateNextSteps(preferences),
    };
  } catch (error) {
    console.log("Brain suggestions unavailable, using fallback:", error);
    return generateFallbackSuggestions(
      preferences,
      projectContext,
      practiceHistory
    );
  }
}

function generateTechniqueSuggestions(
  preferences: MusicPreferences
): MusicSuggestion[] {
  if (!preferences.focusAreas.includes("Technique")) return [];

  const suggestions: MusicSuggestion[] = [];

  preferences.instruments.forEach((instrument) => {
    suggestions.push({
      type: "practice",
      title: `${instrument} Technique Drills`,
      description: `Focused exercises to improve your ${instrument.toLowerCase()} technique`,
      difficulty:
        preferences.skillLevel === "beginner"
          ? 3
          : preferences.skillLevel === "intermediate"
            ? 5
            : 7,
      estimatedTime: preferences.practiceTimeAvailable,
      categories: ["technique", instrument.toLowerCase()],
      priority: "high",
    });
  });

  return suggestions;
}

function generateTheorySuggestions(
  preferences: MusicPreferences
): MusicSuggestion[] {
  if (!preferences.focusAreas.includes("Theory")) return [];

  const theoryTopics = [
    "Chord Progressions",
    "Scale Analysis",
    "Harmonic Analysis",
    "Counterpoint",
    "Form and Structure",
    "Voice Leading",
  ];

  return theoryTopics.slice(0, 2).map((topic) => ({
    type: "learning",
    title: `${topic} Study`,
    description: `Deepen your understanding of ${topic.toLowerCase()}`,
    difficulty: preferences.skillLevel === "beginner" ? 4 : 6,
    estimatedTime: Math.min(preferences.practiceTimeAvailable, 45),
    categories: ["theory", "study"],
    priority: "medium",
  }));
}

function generateCompositionSuggestions(
  preferences: MusicPreferences,
  projectContext: any
): MusicSuggestion[] {
  if (!preferences.focusAreas.includes("Composition")) return [];

  const suggestions: MusicSuggestion[] = [];

  preferences.genres.forEach((genre) => {
    suggestions.push({
      type: "composition",
      title: `${genre} Composition Exercise`,
      description: `Create a short piece in ${genre.toLowerCase()} style`,
      difficulty: preferences.skillLevel === "beginner" ? 5 : 7,
      estimatedTime: preferences.practiceTimeAvailable * 2,
      categories: ["composition", genre.toLowerCase()],
      priority:
        projectContext?.projectType === "music-composition" ? "high" : "medium",
    });
  });

  return suggestions.slice(0, 2);
}

function generatePracticeSuggestions(
  preferences: MusicPreferences,
  practiceHistory: any
): MusicSuggestion[] {
  const suggestions: MusicSuggestion[] = [];

  // 🔥 Streak-based suggestions
  if (practiceHistory.streakDays > 7) {
    suggestions.push({
      type: "practice",
      title: "Challenge Piece",
      description: "Take on a challenging piece to push your boundaries",
      difficulty: Math.min(
        preferences.skillLevel === "professional" ? 10 : 8,
        9
      ),
      estimatedTime: preferences.practiceTimeAvailable,
      categories: ["challenge", "performance"],
      priority: "high",
    });
  }

  // 📅 Session-based recommendations
  if (practiceHistory.sessionsThisWeek < 3) {
    suggestions.push({
      type: "practice",
      title: "Quick Fundamentals Review",
      description: "Get back on track with essential fundamentals",
      difficulty: 3,
      estimatedTime: Math.min(preferences.practiceTimeAvailable, 20),
      categories: ["fundamentals", "warmup"],
      priority: "high",
    });
  }

  return suggestions;
}

function prioritizeSuggestions(
  suggestions: MusicSuggestion[],
  preferences: MusicPreferences,
  practiceHistory: any
): MusicSuggestion[] {
  return suggestions.sort((a, b) => {
    // Priority order: high > medium > low
    const priorityScore = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityScore[a.priority];
    const bPriority = priorityScore[b.priority];

    if (aPriority !== bPriority) return bPriority - aPriority;

    // Secondary sort by relevance to user preferences
    const aRelevance = calculateRelevanceScore(a, preferences);
    const bRelevance = calculateRelevanceScore(b, preferences);

    return bRelevance - aRelevance;
  });
}

function calculateRelevanceScore(
  suggestion: MusicSuggestion,
  preferences: MusicPreferences
): number {
  let score = 0;

  // Match with focus areas
  suggestion.categories.forEach((category) => {
    if (
      preferences.focusAreas.some((area) =>
        area.toLowerCase().includes(category)
      )
    ) {
      score += 2;
    }
  });

  // Match with instruments
  suggestion.categories.forEach((category) => {
    if (
      preferences.instruments.some(
        (instrument) => instrument.toLowerCase() === category
      )
    ) {
      score += 3;
    }
  });

  // Time compatibility
  if (
    Math.abs(suggestion.estimatedTime - preferences.practiceTimeAvailable) < 10
  ) {
    score += 1;
  }

  return score;
}

function generateReasoningContext(
  preferences: MusicPreferences,
  projectContext: any
): string {
  return `Based on your ${preferences.skillLevel} level in ${preferences.instruments.join(", ")}, 
    focusing on ${preferences.focusAreas.join(", ")}, with ${preferences.practiceTimeAvailable} 
    minutes available for practice sessions.`;
}

function generateAdaptiveRecommendations(
  preferences: MusicPreferences,
  practiceHistory: any
): string[] {
  const recommendations: string[] = [];

  if (practiceHistory.streakDays > 14) {
    recommendations.push(
      "🔥 Amazing practice streak! Consider setting a new challenge goal"
    );
  }

  if (preferences.practiceTimeAvailable < 20) {
    recommendations.push(
      "⏰ Consider micro-practice sessions for maximum efficiency"
    );
  }

  if (preferences.focusAreas.length > 4) {
    recommendations.push("🎯 Focus on 2-3 areas for better progress");
  }

  return recommendations;
}

function generateNextSteps(preferences: MusicPreferences): string[] {
  return [
    `Continue developing ${preferences.focusAreas[0]} skills`,
    `Explore advanced ${preferences.instruments[0]} techniques`,
    "Track practice sessions for better insights",
    "Set weekly learning goals",
  ];
}

async function generateBasicSuggestions(): Promise<void> {
  const basicSuggestions = [
    "Practice scales and arpeggios",
    "Work on sight-reading exercises",
    "Study chord progressions",
    "Practice improvisation",
    "Record and analyze your playing",
  ];

  await displayMusicSuggestions(basicSuggestions);
}

async function generateFallbackSuggestions(
  preferences: MusicPreferences,
  projectContext: any,
  practiceHistory: any
): Promise<PersonalizedSuggestionsResponse> {
  const fallbackSuggestions: MusicSuggestion[] = [
    {
      type: "practice",
      title: "Daily Warm-up Routine",
      description: "Essential warm-up exercises for your instruments",
      difficulty: 3,
      estimatedTime: 15,
      categories: ["warmup", "fundamentals"],
      priority: "high",
    },
    {
      type: "learning",
      title: "Music Theory Fundamentals",
      description: "Build strong theoretical foundation",
      difficulty: 4,
      estimatedTime: 30,
      categories: ["theory", "learning"],
      priority: "medium",
    },
  ];

  return {
    suggestions: fallbackSuggestions,
    reasoningContext: "Fallback suggestions due to limited brain connectivity",
    adaptiveRecommendations: [
      "Enable brain interface for personalized suggestions",
    ],
    nextSteps: ["Check brain connectivity", "Update preferences"],
  };
}

async function handleFollowUpAction(
  action: string,
  preferences: MusicPreferences
): Promise<void> {
  switch (action) {
    case "📝 Create practice schedule":
      vscode.window.showInformationMessage(
        "Practice schedule feature coming soon!"
      );
      break;
    case "🎯 Set learning goals":
      vscode.window.showInformationMessage(
        "Learning goals feature coming soon!"
      );
      break;
    case "📊 View detailed analytics":
      vscode.window.showInformationMessage("Analytics dashboard coming soon!");
      break;
    case "🔄 Refresh suggestions":
      await getPersonalizedMusicSuggestionsHandler();
      break;
    case "⚙️ Update preferences":
      await clearUserMusicPreferences();
      await getPersonalizedMusicSuggestionsHandler();
      break;
  }
}

// 💾 User preferences management functions
async function getUserStoredPreferences(key: string): Promise<any> {
  try {
    const config = vscode.workspace.getConfiguration("cipher-autonomous-dev");
    return config.get(`userPreferences.${key}`) || {};
  } catch (error) {
    console.log(`Error getting stored preferences for ${key}:`, error);
    return {};
  }
}

async function updateUserMusicPreferences(preferences: any): Promise<void> {
  try {
    const config = vscode.workspace.getConfiguration("cipher-autonomous-dev");
    await config.update(
      "userPreferences.music",
      preferences,
      vscode.ConfigurationTarget.Global
    );
  } catch (error) {
    console.log("Error updating music preferences:", error);
  }
}

async function clearUserMusicPreferences(): Promise<void> {
  try {
    const config = vscode.workspace.getConfiguration("cipher-autonomous-dev");
    await config.update(
      "userPreferences.music",
      undefined,
      vscode.ConfigurationTarget.Global
    );
  } catch (error) {
    console.log("Error clearing music preferences:", error);
  }
}
