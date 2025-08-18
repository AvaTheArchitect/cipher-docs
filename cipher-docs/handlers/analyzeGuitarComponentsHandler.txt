// handlers/music/guitar/analyzeGuitarComponentsHandler.ts
// 🎸 LAYER 1: CIPHER HANDLER - Guitar Component Analysis
// Integrates with Maestro.ai Brain Engine for intelligent guitar component analysis
import * as path from "path";
import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import { displayGuitarAnalysis } from "../../../shared/displayUtils";
import {
  calculateComplexity,
  getBrainInterface,
  getFileType,
  isBrainAvailable,
  shareAnalysisData,
} from "../../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../../brain/BrainConnector";

// Extend BrainConnector for guitar-specific analysis

// Guitar-specific analysis interface
interface GuitarComponentAnalysis {
  componentType: string;
  musicTheoryComplexity: number;
  guitarTechniques: string[];
  chordProgressions: string[];
  tuningDetected: string;
  skillLevel: "beginner" | "intermediate" | "advanced" | "professional";
  suggestions: string[];
  practiceRecommendations: string[];
  relatedComponents: string[];
}

export async function analyzeGuitarComponentsHandler(): Promise<void> {
  try {
    const startTime = Date.now();

    // Enhanced user feedback with progress
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "🎸 Maestro.ai Guitar Analysis",
        cancellable: false,
      },
      async (progress) => {
        progress.report({
          increment: 10,
          message: "Initializing Brain Engine...",
        });

        // 🧠 LAYER 2: Brain Engine Integration
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
          vscode.window.showErrorMessage(
            "🧠 Brain interface not available for guitar analysis"
          );
          return;
        }

        progress.report({
          increment: 20,
          message: "Scanning workspace for guitar components...",
        });

        // Enhanced workspace analysis
        const workspaceAnalysis = await analyzeGuitarWorkspace();

        progress.report({
          increment: 30,
          message: "Analyzing guitar code patterns...",
        });

        // 🎸 Guitar-specific analysis using Brain Engine
        let guitarAnalysis: GuitarComponentAnalysis;

        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          // Analyze current file if guitar-related
          guitarAnalysis = await analyzeCurrentGuitarFile(
            activeEditor,
            brainInterface
          );
          progress.report({
            increment: 40,
            message: "Analyzing current guitar component...",
          });
        } else {
          // Analyze entire workspace for guitar components
          guitarAnalysis =
            await analyzeWorkspaceGuitarComponents(brainInterface);
          progress.report({
            increment: 40,
            message: "Analyzing workspace guitar components...",
          });
        }

        progress.report({
          increment: 60,
          message: "Applying music theory analysis...",
        });

        // 🎵 Music Theory Integration
        const musicTheoryInsights = await analyzeMusicTheory(
          guitarAnalysis,
          brainInterface
        );

        progress.report({
          increment: 80,
          message: "Generating practice recommendations...",
        });

        // 🎯 Practice Optimization
        const practiceOptimization =
          await generateAdvancedPracticeRecommendations(
            guitarAnalysis,
            brainInterface
          );

        progress.report({ increment: 90, message: "Finalizing analysis..." });

        // Combine all analysis data
        const completeAnalysis = {
          ...guitarAnalysis,
          workspaceInfo: workspaceAnalysis,
          musicTheoryInsights,
          practiceOptimization,
          analysisTime: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        };

        progress.report({
          increment: 95,
          message: "Sharing with Maestro Brain...",
        });

        // 📊 MAESTRO ECOSYSTEM: Share data with Brain for learning
        if (isBrainAvailable()) {
          await shareAnalysisData("guitar-analysis", {
            analysis: completeAnalysis,
            success: true,
            timestamp: new Date().toISOString(),
            workspace:
              vscode.workspace.workspaceFolders?.[0]?.name || "unknown",
          });

          // Learn from this analysis for future improvements
          const brainConnector = brainInterface as any;
          if (brainConnector.learnFromAction) {
            await brainConnector.learnFromAction(
              "guitar-component-analysis",
              "success",
              completeAnalysis
            );
          }
        }

        progress.report({ increment: 100, message: "Analysis complete!" });

        // 🎸 Display results using enhanced guitar analysis display
        await displayGuitarAnalysis(completeAnalysis);

        // Success notification with insights
        const insightCount =
          completeAnalysis.suggestions.length +
          completeAnalysis.practiceRecommendations.length;
        vscode.window.showInformationMessage(
          `🎸✅ Guitar analysis complete! Found ${insightCount} insights and recommendations.`
        );
      }
    );
  } catch (error) {
    console.error("🎸 Guitar Component Analysis Error:", error);

    // Share error with Brain for learning
    await shareAnalysisData("guitar-analysis-error", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      success: false,
    });

    vscode.window.showErrorMessage(`🎸 Guitar analysis failed: ${error}`);
  }
}

// 🎸 Guitar-specific workspace analysis
async function analyzeGuitarWorkspace(): Promise<any> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders)
    return { components: [], message: "No workspace found" };

  // Force explicit array type
  const guitarComponents: Array<{
    fileName: string;
    filePath: string;
    type: string;
    complexity: number;
    hasGuitarKeywords: boolean;
    hasChordProgressions: boolean;
    hasTablature: boolean;
    lineCount: number;
  }> = [];
  const guitarFiles = await vscode.workspace.findFiles(
    "**/*{guitar,chord,fret,tab,tune}*.{ts,tsx,js,jsx}",
    "**/node_modules/**"
  );

  for (const file of guitarFiles) {
    const document = await vscode.workspace.openTextDocument(file);
    const content = document.getText();

    const analysis = {
      fileName: path.basename(file.fsPath),
      filePath: file.fsPath,
      type: getFileType(file.fsPath),
      complexity: calculateComplexity(content),
      hasGuitarKeywords: /guitar|chord|fret|tab|tune|strum|pick/i.test(content),
      hasChordProgressions:
        /chord.*progression|C\s*-\s*F\s*-\s*G|I\s*-\s*V\s*-\s*vi/i.test(
          content
        ),
      hasTablature: /tab|tablature|\d+[h|p|b|r]?\d*/.test(content),
      lineCount: content.split("\n").length,
    };

    if (
      analysis.hasGuitarKeywords ||
      analysis.hasChordProgressions ||
      analysis.hasTablature
    ) {
      guitarComponents.push(analysis);
    }
  }

  return {
    totalComponents: guitarComponents.length,
    components: guitarComponents,
    workspaceName: workspaceFolders[0].name,
    guitarComponentTypes: [...new Set(guitarComponents.map((c) => c.type))],
  };
}

// 🎸 Current file guitar analysis
async function analyzeCurrentGuitarFile(
  editor: vscode.TextEditor,
  brainInterface: any
): Promise<GuitarComponentAnalysis> {
  const document = editor.document;
  const content = document.getText();
  const fileName = path.basename(document.fileName);

  // Use brain for intelligent analysis (consuming the result to avoid unused variable)
  await brainInterface.analyzeCurrentFile(editor);

  // Guitar-specific pattern detection
  const chordProgressions = extractChordProgressions(content);
  const guitarTechniques = detectGuitarTechniques(content);
  const tuning = detectTuning(content);
  const skillLevel = assessSkillLevel(
    content,
    chordProgressions,
    guitarTechniques
  );

  return {
    componentType: detectGuitarComponentType(fileName, content),
    musicTheoryComplexity: calculateMusicTheoryComplexity(
      chordProgressions,
      content
    ),
    guitarTechniques,
    chordProgressions,
    tuningDetected: tuning,
    skillLevel,
    suggestions: generateGuitarSuggestions(
      content,
      chordProgressions,
      guitarTechniques
    ),
    practiceRecommendations: generatePracticeRecommendations(
      skillLevel,
      guitarTechniques
    ),
    relatedComponents: findRelatedComponents(fileName, content),
  };
}

// 🎸 Workspace guitar components analysis
async function analyzeWorkspaceGuitarComponents(
  brainInterface: any
): Promise<GuitarComponentAnalysis> {
  // Analyze all guitar components in workspace
  const workspaceAnalysis = await analyzeGuitarWorkspace();

  const aggregatedAnalysis: GuitarComponentAnalysis = {
    componentType: "workspace",
    musicTheoryComplexity: 0,
    guitarTechniques: [] as string[],
    chordProgressions: [] as string[],
    tuningDetected: "standard",
    skillLevel: "intermediate",
    suggestions: [] as string[],
    practiceRecommendations: [] as string[],
    relatedComponents: [] as string[],
  };

  // Aggregate analysis from all components
  for (const component of workspaceAnalysis.components) {
    // Read component content if available, otherwise use empty string
    let componentContent = "";
    try {
      if (component.filePath) {
        const document = await vscode.workspace.openTextDocument(
          vscode.Uri.file(component.filePath)
        );
        componentContent = document.getText();
      }
    } catch (error) {
      console.log(`Could not read component: ${component.fileName}`);
    }

    // Add logic to aggregate guitar analysis across components
    aggregatedAnalysis.guitarTechniques.push(
      ...detectGuitarTechniques(componentContent)
    );
    aggregatedAnalysis.chordProgressions.push(
      ...extractChordProgressions(componentContent)
    );
  }

  // Remove duplicates and enhance
  aggregatedAnalysis.guitarTechniques = [
    ...new Set(aggregatedAnalysis.guitarTechniques),
  ];
  aggregatedAnalysis.chordProgressions = [
    ...new Set(aggregatedAnalysis.chordProgressions),
  ];
  aggregatedAnalysis.suggestions =
    generateWorkspaceGuitarSuggestions(workspaceAnalysis);

  // Log brain interface usage for debugging
  if (brainInterface) {
    console.log(
      "Using brain interface for workspace guitar component analysis"
    );
  }

  return aggregatedAnalysis;
}

// 🎵 Helper functions for guitar analysis
function extractChordProgressions(content: string): string[] {
  const chordPatterns = [
    /([A-G][#b]?(?:maj|min|m|M|7|9|11|13|sus|add|dim|aug)?(?:\s*-\s*[A-G][#b]?(?:maj|min|m|M|7|9|11|13|sus|add|dim|aug)?){2,})/gi,
    /\b([IVvi]+(?:\s*-\s*[IVvi]+){1,})\b/gi, // Roman numeral progressions
    /(['"][CDEFGAB][#b]?(?:maj|min|m|7|9)?\s*-\s*[CDEFGAB][#b]?(?:maj|min|m|7|9)?.*?['"])/gi,
  ];

  // Force explicit string array type
  const progressions: string[] = [];
  for (const pattern of chordPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      progressions.push(
        ...matches.map((m: string) => m.replace(/['"]/g, "").trim())
      );
    }
  }

  return [...new Set(progressions)];
}

function detectGuitarTechniques(content: string): string[] {
  // Force explicit string array type
  const techniques: string[] = [];
  const techniquePatterns = {
    fingerpicking: /finger.*pick|arpegg|classical.*guitar/i,
    strumming: /strum|down.*up|rhythm.*guitar/i,
    bending: /bend|string.*bend/i,
    "hammer-on": /hammer.*on|legato/i,
    "pull-off": /pull.*off/i,
    sliding: /slide|gliss/i,
    "palm-muting": /palm.*mute|muted/i,
    "alternate-picking": /alternate.*pick|economy.*pick/i,
    tremolo: /tremolo|rapid.*pick/i,
    harmonics: /harmonic|natural.*harmonic|artificial.*harmonic/i,
  };

  for (const [technique, pattern] of Object.entries(techniquePatterns)) {
    if (pattern.test(content)) {
      techniques.push(technique);
    }
  }

  return techniques;
}

function detectTuning(content: string): string {
  const tuningPatterns = {
    standard: /standard.*tun|EADGBE/i,
    "drop-d": /drop.*d|DADGBE/i,
    "open-g": /open.*g|DGDGBD/i,
    dadgad: /DADGAD/i,
    "open-d": /open.*d|DADF#AD/i,
  };

  for (const [tuning, pattern] of Object.entries(tuningPatterns)) {
    if (pattern.test(content)) {
      return tuning;
    }
  }

  return "standard";
}

function detectGuitarComponentType(fileName: string, content: string): string {
  if (/chord/i.test(fileName) || /chord/i.test(content))
    return "chord-component";
  if (/fret/i.test(fileName) || /fretboard/i.test(content))
    return "fretboard-component";
  if (/tab/i.test(fileName) || /tablature/i.test(content))
    return "tablature-component";
  if (/tune/i.test(fileName) || /tuner/i.test(content))
    return "tuner-component";
  if (/guitar/i.test(fileName)) return "guitar-component";
  return "unknown-component";
}

function calculateMusicTheoryComplexity(
  chords: string[],
  content: string
): number {
  let complexity = 1;

  // Complex chords increase complexity
  const complexChords = chords.filter((chord) =>
    /7|9|11|13|sus|add|dim|aug|maj7|min7|m7/.test(chord)
  ).length;

  complexity += complexChords * 0.5;

  // Music theory terms increase complexity
  const theoryTerms =
    /modulation|key.*change|secondary.*dominant|tritone.*sub/i.test(content);
  if (theoryTerms) complexity += 1;

  return Math.min(Math.round(complexity * 10) / 10, 5); // Cap at 5.0
}

function assessSkillLevel(
  content: string,
  chords: string[],
  techniques: string[]
): "beginner" | "intermediate" | "advanced" | "professional" {
  let score = 0;

  // Complex chords
  if (chords.some((c) => /7|9|11|13/.test(c))) score += 1;
  if (chords.some((c) => /sus|add|dim|aug/.test(c))) score += 1;

  // Advanced techniques
  if (techniques.length > 3) score += 1;
  if (techniques.includes("harmonics") || techniques.includes("tremolo"))
    score += 1;

  // Code complexity
  if (content.length > 2000) score += 1;
  if (/audio.*context|web.*audio/i.test(content)) score += 2;

  if (score >= 5) return "professional";
  if (score >= 3) return "advanced";
  if (score >= 1) return "intermediate";
  return "beginner";
}

function generateGuitarSuggestions(
  content: string,
  chords: string[],
  techniques: string[]
): string[] {
  // 🔧 FIX: Explicitly type as string[] to avoid 'never[]' inference
  const suggestions: string[] = [];

  if (chords.length === 0) {
    suggestions.push(
      "Consider adding chord progression information for better music theory integration"
    );
  }

  if (techniques.length < 2) {
    suggestions.push(
      "Add more guitar technique annotations to improve practice recommendations"
    );
  }

  if (!/audio/i.test(content)) {
    suggestions.push(
      "Consider integrating Web Audio API for real-time audio feedback"
    );
  }

  if (
    chords.some((c) => c.includes("C") || c.includes("F") || c.includes("G"))
  ) {
    suggestions.push(
      "Detected common key of C major - consider adding relative minor (Am) progressions"
    );
  }

  suggestions.push(
    "Use Maestro.ai Brain Engine for enhanced music theory suggestions"
  );

  return suggestions;
}

function generatePracticeRecommendations(
  skillLevel: string,
  techniques: string[]
): string[] {
  // 🔧 FIX: Explicitly type as string[] to avoid 'never[]' inference
  const recommendations: string[] = [];

  switch (skillLevel) {
    case "beginner":
      recommendations.push(
        "Focus on basic chord changes and strumming patterns"
      );
      recommendations.push("Practice with a metronome for steady timing");
      break;
    case "intermediate":
      recommendations.push(
        "Work on barre chords and more complex strumming patterns"
      );
      recommendations.push("Practice chord progressions in different keys");
      break;
    case "advanced":
      recommendations.push(
        "Focus on advanced techniques like fingerpicking and lead guitar"
      );
      recommendations.push("Practice improvisation over chord progressions");
      break;
    case "professional":
      recommendations.push("Work on composition and arrangement skills");
      recommendations.push("Explore complex jazz harmony and extended chords");
      break;
  }

  // Technique-specific recommendations
  if (!techniques.includes("fingerpicking")) {
    recommendations.push(
      "Try incorporating fingerpicking patterns for texture variety"
    );
  }

  if (!techniques.includes("bending")) {
    recommendations.push(
      "Practice string bending for expressive lead guitar work"
    );
  }

  return recommendations;
}

async function analyzeMusicTheory(
  analysis: GuitarComponentAnalysis,
  brainInterface?: any
): Promise<any> {
  // Use the analysis parameter and optionally the brain interface
  const keyFromChords = detectKeyFromChords(analysis.chordProgressions);
  const scales = getScaleRecommendations(analysis.chordProgressions);
  const harmony = analyzeHarmony(analysis.chordProgressions);
  const practiceScales = getPracticeScales(analysis.skillLevel);

  // Log brain interface usage for debugging
  if (brainInterface) {
    console.log("Using brain interface for enhanced music theory analysis");
  }

  return {
    keySignature: keyFromChords,
    scaleRecommendations: scales,
    harmonyAnalysis: harmony,
    practiceScales: practiceScales,
  };
}

async function generateAdvancedPracticeRecommendations(
  analysis: GuitarComponentAnalysis,
  brainInterface?: any
): Promise<any> {
  // Use the analysis parameter to generate recommendations
  const dailyRoutine = getDailyPracticeRoutine(analysis.skillLevel);
  const focusAreas = getTechniqueFocusAreas(analysis.guitarTechniques);
  const songs = getSongRecommendations(
    analysis.chordProgressions,
    analysis.skillLevel
  );
  const progressions = getProgressionPractice(analysis.chordProgressions);

  // Log brain interface usage for debugging
  if (brainInterface) {
    console.log("Using brain interface for advanced practice recommendations");
  }

  return {
    dailyPractice: dailyRoutine,
    techniqueFocus: focusAreas,
    songRecommendations: songs,
    progressionPractice: progressions,
  };
}

// Additional helper functions
function findRelatedComponents(fileName: string, content: string): string[] {
  // Use parameters to find related components based on file name and content patterns
  const relatedTypes: string[] = [];

  if (fileName.includes("guitar") || content.includes("guitar")) {
    if (content.includes("chord")) relatedTypes.push("ChordDisplay");
    if (content.includes("fret")) relatedTypes.push("Fretboard");
    if (content.includes("tab")) relatedTypes.push("TabPlayer");
    if (content.includes("tune")) relatedTypes.push("GuitarTuner");
  }

  return relatedTypes;
}

function generateWorkspaceGuitarSuggestions(workspaceAnalysis: any): string[] {
  // 🔧 FIX: Explicitly type as string[] to avoid 'never[]' inference
  const suggestions: string[] = [];

  if (workspaceAnalysis.totalComponents === 0) {
    suggestions.push(
      "No guitar components detected. Consider creating guitar-specific components."
    );
  } else if (workspaceAnalysis.totalComponents < 3) {
    suggestions.push(
      "Add more guitar components for a comprehensive guitar learning experience"
    );
  }

  suggestions.push(
    "Use Maestro.ai Brain Engine to optimize your guitar component architecture"
  );

  return suggestions;
}

function detectKeyFromChords(chords: string[]): string {
  // Analyze chord patterns to detect key signature
  if (chords.length === 0) return "C Major";

  // Simple key detection based on common chord patterns
  const cMajorChords = ["C", "Dm", "Em", "F", "G", "Am", "Bdim"];
  const gMajorChords = ["G", "Am", "Bm", "C", "D", "Em", "F#dim"];

  const cMajorMatches = chords.filter((chord) =>
    cMajorChords.some((c) => chord.includes(c))
  ).length;
  const gMajorMatches = chords.filter((chord) =>
    gMajorChords.some((c) => chord.includes(c))
  ).length;

  if (gMajorMatches > cMajorMatches) return "G Major";
  return "C Major";
}

function getScaleRecommendations(chords: string[]): string[] {
  // Generate scale recommendations based on detected chords
  const scales: string[] = [];

  if (chords.length === 0) {
    scales.push("C Major Scale", "A Minor Pentatonic");
  } else {
    // Analyze chords to recommend appropriate scales
    if (
      chords.some((c) => c.includes("C") || c.includes("F") || c.includes("G"))
    ) {
      scales.push("C Major Scale", "C Major Pentatonic");
    }
    if (chords.some((c) => c.includes("Am") || c.includes("Em"))) {
      scales.push("A Minor Scale", "A Minor Pentatonic");
    }
  }

  return scales.length > 0
    ? scales
    : ["C Major Scale", "A Minor Pentatonic", "G Major Scale"];
}

function analyzeHarmony(chords: string[]): any {
  // Analyze harmonic complexity based on chord types
  let complexity = "basic";

  if (chords.some((chord) => /7|9|11|13/.test(chord))) {
    complexity = "intermediate";
  }
  if (chords.some((chord) => /maj7|min7|dim|aug|sus/.test(chord))) {
    complexity = "advanced";
  }

  const type = chords.length > 0 ? "diatonic" : "unknown";

  return {
    type,
    complexity,
    chordCount: chords.length,
    hasExtendedChords: chords.some((chord) => /7|9|11|13/.test(chord)),
  };
}

function getPracticeScales(skillLevel: string): string[] {
  const scales = {
    beginner: ["C Major", "A Minor", "G Major"],
    intermediate: ["C Major", "A Minor Pentatonic", "E Minor", "D Major"],
    advanced: ["C Major", "A Harmonic Minor", "D Dorian", "G Mixolydian"],
    professional: [
      "All modes",
      "Jazz scales",
      "Exotic scales",
      "Custom scales",
    ],
  };

  return scales[skillLevel as keyof typeof scales] || scales.beginner;
}

function getDailyPracticeRoutine(skillLevel: string): string[] {
  const routines = {
    beginner: ["10 min warm-up", "20 min chord practice", "10 min strumming"],
    intermediate: [
      "15 min warm-up",
      "20 min scales",
      "15 min chord changes",
      "10 min songs",
    ],
    advanced: [
      "20 min technical exercises",
      "20 min improvisation",
      "15 min repertoire",
      "5 min theory",
    ],
    professional: [
      "30 min technique",
      "30 min composition",
      "20 min performance prep",
      "10 min ear training",
    ],
  };

  return routines[skillLevel as keyof typeof routines] || routines.beginner;
}

function getTechniqueFocusAreas(techniques: string[]): string[] {
  const allTechniques = [
    "fingerpicking",
    "strumming",
    "bending",
    "hammer-on",
    "pull-off",
    "sliding",
  ];
  return allTechniques.filter((tech) => !techniques.includes(tech));
}

function getSongRecommendations(
  _chords: string[],
  _skillLevel: string
): string[] {
  // Parameters prefixed with _ to indicate they're intentionally unused for now
  // This is a placeholder implementation that could be enhanced later
  return [
    "Wonderwall - Oasis",
    "Blackbird - Beatles",
    "Hotel California - Eagles",
  ];
}

function getProgressionPractice(_chords: string[]): string[] {
  // Parameter prefixed with _ to indicate it's intentionally unused for now
  // This is a placeholder implementation that could be enhanced later
  return [
    "I-V-vi-IV progression",
    "ii-V-I progression",
    "I-vi-ii-V progression",
  ];
}
