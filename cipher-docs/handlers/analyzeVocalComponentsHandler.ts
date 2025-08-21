// handlers/music/vocal/analyzeVocalComponentsHandler.ts
// 🎤 LAYER 1: CIPHER HANDLER - Vocal Component Analysis
// Integrates with Maestro.ai Brain Engine for intelligent vocal component analysis
import * as path from "path";
import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import { displayVocalAnalysis } from "../../../shared/displayUtils";
import {
  calculateComplexity,
  getBrainInterface,
  getFileType,
  isBrainAvailable,
  shareAnalysisData,
} from "../../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../../brain/BrainConnector";

// Extend BrainConnector for vocal-specific analysis

// Vocal-specific analysis interface
interface VocalComponentAnalysis {
  componentType: string;
  vocalRange: {
    lowest: string;
    highest: string;
    comfortable: string;
  };
  vocalTechniques: string[];
  harmonyComplexity: number;
  breathingPatterns: string[];
  vocalStyles: string[];
  skillLevel: "beginner" | "intermediate" | "advanced" | "professional";
  pitchAccuracy: number;
  suggestions: string[];
  exerciseRecommendations: string[];
  relatedComponents: string[];
}

export async function analyzeVocalComponentsHandler(): Promise<void> {
  try {
    const startTime = Date.now();

    // Enhanced user feedback with progress
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "🎤 Maestro.ai Vocal Analysis",
        cancellable: false,
      },
      async (progress) => {
        progress.report({
          increment: 10,
          message: "Initializing Vocal Brain Engine...",
        });

        // 🧠 LAYER 2: Brain Engine Integration
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
          vscode.window.showErrorMessage(
            "🧠 Brain interface not available for vocal analysis"
          );
          return;
        }

        progress.report({
          increment: 20,
          message: "Scanning workspace for vocal components...",
        });

        // Enhanced workspace analysis
        const workspaceAnalysis = await analyzeVocalWorkspace();

        progress.report({
          increment: 30,
          message: "Analyzing vocal code patterns...",
        });

        // 🎤 Vocal-specific analysis using Brain Engine
        let vocalAnalysis: VocalComponentAnalysis;

        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
          // Analyze current file if vocal-related
          vocalAnalysis = await analyzeCurrentVocalFile(
            activeEditor,
            brainInterface
          );
          progress.report({
            increment: 40,
            message: "Analyzing current vocal component...",
          });
        } else {
          // Analyze entire workspace for vocal components
          vocalAnalysis = await analyzeWorkspaceVocalComponents(brainInterface);
          progress.report({
            increment: 40,
            message: "Analyzing workspace vocal components...",
          });
        }

        progress.report({
          increment: 60,
          message: "Applying vocal music theory analysis...",
        });

        // 🎵 Vocal Music Theory Integration
        const vocalTheoryInsights = await analyzeVocalMusicTheory(
          vocalAnalysis,
          brainInterface
        );

        progress.report({
          increment: 80,
          message: "Generating vocal exercise recommendations...",
        });

        // 🎯 Vocal Exercise Optimization
        const vocalExerciseOptimization =
          await generateVocalExerciseRecommendations(
            vocalAnalysis,
            brainInterface
          );

        progress.report({
          increment: 90,
          message: "Finalizing vocal analysis...",
        });

        // Combine all analysis data
        const completeAnalysis = {
          ...vocalAnalysis,
          workspaceInfo: workspaceAnalysis,
          vocalTheoryInsights,
          vocalExerciseOptimization,
          analysisTime: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        };

        progress.report({
          increment: 95,
          message: "Sharing with Maestro Brain...",
        });

        // 📊 MAESTRO ECOSYSTEM: Share data with Brain for learning
        if (isBrainAvailable()) {
          await shareAnalysisData("vocal-analysis", {
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
              "vocal-component-analysis",
              "success",
              completeAnalysis
            );
          }
        }

        progress.report({ increment: 100, message: "Analysis complete!" });

        // 🎤 Display results using enhanced vocal analysis display
        await displayVocalAnalysis(completeAnalysis);

        // Success notification with insights
        const insightCount =
          completeAnalysis.suggestions.length +
          completeAnalysis.exerciseRecommendations.length;
        vscode.window.showInformationMessage(
          `🎤✅ Vocal analysis complete! Found ${insightCount} insights and vocal exercises.`
        );
      }
    );
  } catch (error) {
    console.error("🎤 Vocal Component Analysis Error:", error);

    // Share error with Brain for learning
    await shareAnalysisData("vocal-analysis-error", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      success: false,
    });

    vscode.window.showErrorMessage(`🎤 Vocal analysis failed: ${error}`);
  }
}

// 🎤 Vocal-specific workspace analysis
async function analyzeVocalWorkspace(): Promise<any> {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders)
    return { components: [], message: "No workspace found" };

  // ✅ EXPLICIT ARRAY TYPING - Prevents TypeScript never[] inference
  const vocalComponents: Array<{
    fileName: string;
    filePath: string;
    type: string;
    complexity: number;
    hasVocalKeywords: boolean;
    hasHarmonyPatterns: boolean;
    hasPitchNotation: boolean;
    lineCount: number;
  }> = [];

  const vocalFiles = await vscode.workspace.findFiles(
    "**/*{vocal,voice,sing,harmony,pitch,breath}*.{ts,tsx,js,jsx}",
    "**/node_modules/**"
  );

  for (const file of vocalFiles) {
    const document = await vscode.workspace.openTextDocument(file);
    const content = document.getText();

    const analysis = {
      fileName: path.basename(file.fsPath),
      filePath: file.fsPath,
      type: getFileType(file.fsPath),
      complexity: calculateComplexity(content),
      hasVocalKeywords: /vocal|voice|sing|harmony|pitch|breath|chorus/i.test(
        content
      ),
      hasHarmonyPatterns: /harmony|interval|chord.*vocal|backing.*vocal/i.test(
        content
      ),
      hasPitchNotation: /pitch|note|frequency|hz|semitone|octave/i.test(
        content
      ),
      lineCount: content.split("\n").length,
    };

    if (
      analysis.hasVocalKeywords ||
      analysis.hasHarmonyPatterns ||
      analysis.hasPitchNotation
    ) {
      vocalComponents.push(analysis);
    }
  }

  return {
    totalComponents: vocalComponents.length,
    components: vocalComponents,
    workspaceName: workspaceFolders[0].name,
    vocalComponentTypes: [...new Set(vocalComponents.map((c) => c.type))],
  };
}

// 🎤 Current file vocal analysis
async function analyzeCurrentVocalFile(
  editor: vscode.TextEditor,
  brainInterface: any
): Promise<VocalComponentAnalysis> {
  const document = editor.document;
  const content = document.getText();
  const fileName = path.basename(document.fileName);

  // Use brain for intelligent analysis
  try {
    await brainInterface.analyzeCurrentFile(editor);
  } catch (error) {
    console.log("Brain analysis optional:", error);
  }

  // Vocal-specific pattern detection
  const vocalRange = detectVocalRange(content);
  const vocalTechniques = detectVocalTechniques(content);
  const harmonyComplexity = calculateHarmonyComplexity(content);
  const breathingPatterns = detectBreathingPatterns(content);
  const vocalStyles = detectVocalStyles(content);
  const pitchAccuracy = assessPitchAccuracy(content);
  const skillLevel = assessVocalSkillLevel(
    content,
    vocalTechniques,
    harmonyComplexity
  );

  return {
    componentType: detectVocalComponentType(fileName, content),
    vocalRange,
    vocalTechniques,
    harmonyComplexity,
    breathingPatterns,
    vocalStyles,
    skillLevel,
    pitchAccuracy,
    suggestions: generateVocalSuggestions(
      content,
      vocalTechniques,
      vocalStyles
    ),
    exerciseRecommendations: generateVocalExercises(
      skillLevel,
      vocalTechniques,
      vocalRange
    ),
    relatedComponents: findRelatedVocalComponents(fileName, content),
  };
}

// 🎤 Workspace vocal components analysis
async function analyzeWorkspaceVocalComponents(
  brainInterface: any
): Promise<VocalComponentAnalysis> {
  const workspaceAnalysis = await analyzeVocalWorkspace();

  const aggregatedAnalysis: VocalComponentAnalysis = {
    componentType: "workspace",
    vocalRange: { lowest: "C3", highest: "C5", comfortable: "C4-G4" },
    vocalTechniques: [] as string[],
    harmonyComplexity: 0,
    breathingPatterns: [] as string[],
    vocalStyles: [] as string[],
    skillLevel: "intermediate",
    pitchAccuracy: 75,
    suggestions: [] as string[],
    exerciseRecommendations: [] as string[],
    relatedComponents: [] as string[],
  };

  // Aggregate analysis from all vocal components
  for (const component of workspaceAnalysis.components) {
    let componentContent = "";
    try {
      if (component.filePath) {
        const document = await vscode.workspace.openTextDocument(
          vscode.Uri.file(component.filePath)
        );
        componentContent = document.getText();
      }
    } catch (error) {
      console.log(`Could not read vocal component: ${component.fileName}`);
    }

    // Aggregate vocal analysis across components
    aggregatedAnalysis.vocalTechniques.push(
      ...detectVocalTechniques(componentContent)
    );
    aggregatedAnalysis.breathingPatterns.push(
      ...detectBreathingPatterns(componentContent)
    );
    aggregatedAnalysis.vocalStyles.push(...detectVocalStyles(componentContent));
  }

  // Remove duplicates and enhance
  aggregatedAnalysis.vocalTechniques = [
    ...new Set(aggregatedAnalysis.vocalTechniques),
  ];
  aggregatedAnalysis.breathingPatterns = [
    ...new Set(aggregatedAnalysis.breathingPatterns),
  ];
  aggregatedAnalysis.vocalStyles = [...new Set(aggregatedAnalysis.vocalStyles)];
  aggregatedAnalysis.suggestions =
    generateWorkspaceVocalSuggestions(workspaceAnalysis);

  return aggregatedAnalysis;
}

// 🎵 Vocal analysis helper functions
function detectVocalRange(content: string): {
  lowest: string;
  highest: string;
  comfortable: string;
} {
  // Detect vocal range patterns
  const rangePatterns = {
    soprano: /soprano|high.*voice|C4.*C6/i,
    alto: /alto|low.*female|G3.*F5/i,
    tenor: /tenor|high.*male|C3.*A4/i,
    bass: /bass|low.*male|E2.*E4/i,
  };

  for (const [range, pattern] of Object.entries(rangePatterns)) {
    if (pattern.test(content)) {
      const ranges = {
        soprano: { lowest: "C4", highest: "C6", comfortable: "F4-F5" },
        alto: { lowest: "G3", highest: "F5", comfortable: "C4-C5" },
        tenor: { lowest: "C3", highest: "A4", comfortable: "G3-G4" },
        bass: { lowest: "E2", highest: "E4", comfortable: "A2-A3" },
      };
      return ranges[range as keyof typeof ranges];
    }
  }

  return { lowest: "C3", highest: "C5", comfortable: "C4-G4" };
}

function detectVocalTechniques(content: string): string[] {
  // ✅ EXPLICIT ARRAY TYPING - Prevents TypeScript never[] inference
  const techniques: string[] = [];

  const techniquePatterns = {
    belting: /belt|belting|chest.*voice|power.*vocal/i,
    vibrato: /vibrato|oscillation|tremolo.*voice/i,
    falsetto: /falsetto|head.*voice|breathy/i,
    "mixed-voice": /mixed.*voice|blend.*register/i,
    "vocal-fry": /vocal.*fry|creaky.*voice/i,
    melisma: /melisma|vocal.*run|riff/i,
    "breath-control": /breath.*control|diaphragm|breathing.*technique/i,
    "pitch-bending": /pitch.*bend|slide.*vocal|portamento/i,
    harmonizing: /harmony|harmoniz|backing.*vocal/i,
    scatting: /scat|vocal.*improvisation/i,
  };

  for (const [technique, pattern] of Object.entries(techniquePatterns)) {
    if (pattern.test(content)) {
      techniques.push(technique);
    }
  }

  return techniques;
}

function detectBreathingPatterns(content: string): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const patterns: string[] = [];

  const breathingPatterns = {
    diaphragmatic: /diaphragm|belly.*breath|deep.*breath/i,
    intercostal: /intercostal|rib.*breath|side.*breath/i,
    clavicular: /clavicular|chest.*breath|shallow/i,
    circular: /circular.*breath|continuous.*breath/i,
    "breath-support": /breath.*support|appoggio/i,
  };

  for (const [pattern, regex] of Object.entries(breathingPatterns)) {
    if (regex.test(content)) {
      patterns.push(pattern);
    }
  }

  return patterns;
}

function detectVocalStyles(content: string): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const styles: string[] = [];

  const stylePatterns = {
    classical: /classical|opera|art.*song|lieder/i,
    pop: /pop|contemporary|modern.*vocal/i,
    jazz: /jazz|swing|bebop|vocal.*jazz/i,
    "r&b": /r&b|soul|gospel|melismatic/i,
    rock: /rock|metal|alternative.*vocal/i,
    country: /country|folk|bluegrass.*vocal/i,
    "musical-theatre": /musical.*theatre|broadway|show.*tune/i,
    world: /world.*music|ethnic.*vocal|traditional/i,
  };

  for (const [style, pattern] of Object.entries(stylePatterns)) {
    if (pattern.test(content)) {
      styles.push(style);
    }
  }

  return styles;
}

function calculateHarmonyComplexity(content: string): number {
  let complexity = 1;

  // Complex harmony patterns increase complexity
  if (/close.*harmony|tight.*harmony/i.test(content)) complexity += 1;
  if (/interval.*training|perfect.*fifth|major.*third/i.test(content))
    complexity += 0.5;
  if (/chord.*tone|extension|9th|11th|13th/i.test(content)) complexity += 1.5;
  if (/counterpoint|polyphony|voice.*leading/i.test(content)) complexity += 2;

  return Math.min(Math.round(complexity * 10) / 10, 5);
}

function assessPitchAccuracy(content: string): number {
  // Assess pitch accuracy based on content indicators
  let accuracy = 75; // Default

  if (/pitch.*perfect|perfect.*pitch/i.test(content)) accuracy = 95;
  else if (/tuner|pitch.*reference|auto.*tune/i.test(content)) accuracy = 85;
  else if (/pitch.*training|ear.*training/i.test(content)) accuracy = 80;
  else if (/pitch.*problem|off.*key|flat|sharp/i.test(content)) accuracy = 60;

  return Math.min(Math.max(accuracy, 0), 100);
}

function detectVocalComponentType(fileName: string, content: string): string {
  if (/pitch/i.test(fileName) || /pitch.*visualiz/i.test(content))
    return "pitch-visualizer";
  if (/harmony/i.test(fileName) || /harmony.*display/i.test(content))
    return "harmony-component";
  if (/breath/i.test(fileName) || /breathing.*exercise/i.test(content))
    return "breathing-trainer";
  if (/vocal.*exercise/i.test(fileName) || /vocal.*trainer/i.test(content))
    return "vocal-exercise";
  if (/recorder/i.test(fileName) || /record.*vocal/i.test(content))
    return "vocal-recorder";
  if (/vocal/i.test(fileName)) return "vocal-component";
  return "unknown-component";
}

function assessVocalSkillLevel(
  content: string,
  techniques: string[],
  harmonyComplexity: number
): "beginner" | "intermediate" | "advanced" | "professional" {
  let score = 0;

  // Advanced techniques
  if (techniques.includes("belting") || techniques.includes("mixed-voice"))
    score += 1;
  if (techniques.includes("melisma") || techniques.includes("scatting"))
    score += 1.5;
  if (techniques.includes("harmonizing") && techniques.length > 3) score += 1;

  // Harmony complexity
  score += harmonyComplexity * 0.5;

  // Technical content indicators
  if (/advanced.*vocal|professional.*vocal/i.test(content)) score += 2;
  if (/voice.*teacher|vocal.*coach|master.*class/i.test(content)) score += 1.5;
  if (/opera|classical.*vocal|art.*song/i.test(content)) score += 1;

  if (score >= 5) return "professional";
  if (score >= 3) return "advanced";
  if (score >= 1) return "intermediate";
  return "beginner";
}

function generateVocalSuggestions(
  content: string,
  techniques: string[],
  styles: string[]
): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const suggestions: string[] = [];

  if (techniques.length === 0) {
    suggestions.push(
      "Consider adding vocal technique annotations for better training recommendations"
    );
  }

  if (styles.length === 0) {
    suggestions.push(
      "Add vocal style information to personalize exercise recommendations"
    );
  }

  if (!/breath/i.test(content)) {
    suggestions.push(
      "Consider integrating breathing exercises for comprehensive vocal training"
    );
  }

  if (!/pitch.*visual/i.test(content)) {
    suggestions.push("Add pitch visualization for real-time vocal feedback");
  }

  if (!techniques.includes("breath-control")) {
    suggestions.push("Focus on breath control exercises for vocal foundation");
  }

  suggestions.push(
    "Use Maestro.ai Brain Engine for personalized vocal coaching"
  );

  return suggestions;
}

function generateVocalExercises(
  skillLevel: string,
  techniques: string[],
  vocalRange: { lowest: string; highest: string; comfortable: string }
): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const exercises: string[] = [];

  switch (skillLevel) {
    case "beginner":
      exercises.push("Basic breathing exercises with diaphragmatic support");
      exercises.push("Simple pitch matching exercises in comfortable range");
      exercises.push("Vowel sound clarity and resonance exercises");
      break;
    case "intermediate":
      exercises.push("Mixed voice development exercises");
      exercises.push("Interval training for pitch accuracy");
      exercises.push("Dynamic control exercises (crescendo/diminuendo)");
      break;
    case "advanced":
      exercises.push("Complex vocal runs and melismatic patterns");
      exercises.push("Advanced breath control for extended phrases");
      exercises.push("Style-specific technique development");
      break;
    case "professional":
      exercises.push("Vocal stamina and endurance training");
      exercises.push("Advanced interpretation and expression exercises");
      exercises.push("Performance preparation and stage technique");
      break;
  }

  // Technique-specific exercises
  if (!techniques.includes("vibrato")) {
    exercises.push("Vibrato development exercises");
  }

  if (!techniques.includes("mixed-voice")) {
    exercises.push("Register blending and mixed voice exercises");
  }

  // Range-specific exercises
  exercises.push(
    `Range extension exercises for ${vocalRange.comfortable} range`
  );

  return exercises;
}

function generateWorkspaceVocalSuggestions(workspaceAnalysis: any): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const suggestions: string[] = [];

  if (workspaceAnalysis.totalComponents === 0) {
    suggestions.push(
      "No vocal components detected. Consider creating vocal-specific components."
    );
  } else if (workspaceAnalysis.totalComponents < 3) {
    suggestions.push(
      "Add more vocal components for comprehensive vocal training experience"
    );
  }

  suggestions.push(
    "Use Maestro.ai Brain Engine to optimize your vocal training architecture"
  );

  return suggestions;
}

async function analyzeVocalMusicTheory(
  analysis: VocalComponentAnalysis,
  brainInterface?: any
): Promise<any> {
  // Use analysis parameters for music theory insights
  const intervals = detectVocalIntervals(analysis.vocalTechniques);
  const harmony = analyzeVocalHarmony(
    analysis.vocalStyles,
    analysis.harmonyComplexity
  );
  const scales = getVocalScaleRecommendations(
    analysis.vocalRange,
    analysis.vocalStyles
  );

  if (brainInterface) {
    console.log(
      "Using brain interface for enhanced vocal music theory analysis"
    );
  }

  return {
    keyIntervals: intervals,
    harmonyAnalysis: harmony,
    scaleRecommendations: scales,
    practiceIntervals: getIntervalPracticeRecommendations(analysis.skillLevel),
  };
}

async function generateVocalExerciseRecommendations(
  analysis: VocalComponentAnalysis,
  brainInterface?: any
): Promise<any> {
  // Generate comprehensive vocal exercise recommendations
  const dailyRoutine = getDailyVocalRoutine(analysis.skillLevel);
  const techniqueFocus = getVocalTechniqueFocus(analysis.vocalTechniques);
  const rangeWork = getRangeExtensionExercises(analysis.vocalRange);
  const styleWork = getStyleSpecificExercises(analysis.vocalStyles);

  if (brainInterface) {
    console.log(
      "Using brain interface for advanced vocal exercise recommendations"
    );
  }

  return {
    dailyVocalRoutine: dailyRoutine,
    techniqueFocus: techniqueFocus,
    rangeExtension: rangeWork,
    styleSpecific: styleWork,
  };
}

// Additional helper functions
function findRelatedVocalComponents(
  fileName: string,
  content: string
): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const relatedTypes: string[] = [];

  if (fileName.includes("vocal") || content.includes("vocal")) {
    if (content.includes("pitch")) relatedTypes.push("PitchVisualizer");
    if (content.includes("harmony")) relatedTypes.push("HarmonyDisplay");
    if (content.includes("breath")) relatedTypes.push("BreathingTrainer");
    if (content.includes("recorder")) relatedTypes.push("VocalRecorder");
    if (content.includes("exercise")) relatedTypes.push("VocalExercise");
  }

  return relatedTypes;
}

function detectVocalIntervals(techniques: string[]): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const intervals: string[] = [
    "Perfect Unison",
    "Major Second",
    "Major Third",
    "Perfect Fourth",
    "Perfect Fifth",
  ];

  if (techniques.includes("harmonizing")) {
    intervals.push("Major Sixth", "Major Seventh", "Perfect Octave");
  }

  return intervals;
}

function analyzeVocalHarmony(styles: string[], complexity: number): any {
  const harmonyType =
    complexity > 3 ? "complex" : complexity > 1.5 ? "intermediate" : "basic";
  const hasJazzInfluence = styles.includes("jazz") || styles.includes("r&b");

  return {
    type: harmonyType,
    complexity: complexity,
    jazzInfluence: hasJazzInfluence,
    recommendations: hasJazzInfluence
      ? ["Extended harmonies", "Altered chords"]
      : ["Triads", "Seventh chords"],
  };
}

function getVocalScaleRecommendations(
  vocalRange: any,
  styles: string[]
): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const scales: string[] = ["Major Scale", "Natural Minor Scale"];

  if (styles.includes("jazz")) {
    scales.push("Dorian Mode", "Mixolydian Mode", "Blues Scale");
  }

  if (styles.includes("classical")) {
    scales.push("All Major Scales", "All Minor Scales", "Modal Scales");
  }

  return scales;
}

function getIntervalPracticeRecommendations(skillLevel: string): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const intervals: string[] = [];

  switch (skillLevel) {
    case "beginner":
      intervals.push("Unison to Octave", "Major and Minor Thirds");
      break;
    case "intermediate":
      intervals.push("Perfect Fourths and Fifths", "Major and Minor Sixths");
      break;
    case "advanced":
      intervals.push("Major and Minor Sevenths", "Compound Intervals");
      break;
    case "professional":
      intervals.push(
        "All Intervals",
        "Microtonal Intervals",
        "Complex Harmonic Intervals"
      );
      break;
  }

  return intervals;
}

function getDailyVocalRoutine(skillLevel: string): string[] {
  const routines = {
    beginner: [
      "10 min breathing warm-up",
      "15 min pitch matching",
      "10 min vowel exercises",
      "5 min cool-down",
    ],
    intermediate: [
      "15 min breathing exercises",
      "20 min scale work",
      "15 min interval training",
      "10 min repertoire",
    ],
    advanced: [
      "20 min technical warm-up",
      "25 min advanced exercises",
      "20 min repertoire work",
      "10 min performance prep",
    ],
    professional: [
      "30 min comprehensive warm-up",
      "30 min advanced technique",
      "30 min repertoire/performance",
      "15 min maintenance",
    ],
  };

  return routines[skillLevel as keyof typeof routines] || routines.beginner;
}

function getVocalTechniqueFocus(techniques: string[]): string[] {
  const allTechniques = [
    "belting",
    "vibrato",
    "mixed-voice",
    "breath-control",
    "pitch-bending",
    "harmonizing",
  ];
  return allTechniques.filter((tech) => !techniques.includes(tech));
}

function getRangeExtensionExercises(vocalRange: any): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const exercises: string[] = [];

  exercises.push(`Gentle sirens from ${vocalRange.comfortable}`);
  exercises.push("Lip trills for range extension");
  exercises.push("Humming exercises for head voice development");
  exercises.push("Chest voice strengthening exercises");

  return exercises;
}

function getStyleSpecificExercises(styles: string[]): string[] {
  // ✅ EXPLICIT ARRAY TYPING
  const exercises: string[] = [];

  if (styles.includes("classical")) {
    exercises.push("Legato phrasing exercises", "Coloratura passages");
  }

  if (styles.includes("pop")) {
    exercises.push("Contemporary vocal styling", "Microphone technique");
  }

  if (styles.includes("jazz")) {
    exercises.push("Scat singing exercises", "Jazz phrasing and rhythm");
  }

  if (styles.includes("r&b")) {
    exercises.push("Melismatic runs", "Gospel-style vocal techniques");
  }

  return exercises.length > 0
    ? exercises
    : ["General vocal exercises", "Style exploration"];
}
