// 🔧 Enhanced QuickFix Handler - Brain AI + Music Intelligence (CORRECTED VERSION)
// Location: src/handlers/quickFileFixHandler.ts
// Purpose: Intelligent code fixing with multi-selection, Brain AI, and music development focus
// FIXED: Range calculation, selection handling, position math, React import detection

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../brain/BrainConnector";
import { getBrainInterface } from "../../shared/utils";
import {
  displayBrainSuggestions,
  displayError,
  displayProgress,
  displaySuccess,
  displayWarning,
  showQuickPick,
} from "../../shared/displayUtils";
import { BrainInsight } from "../../shared/types";
import {
  calculateComplexity,
  getFileType,
  isBrainAvailable,
  isMusicRelatedFile,
  shareAnalysisData,
} from "../../shared/utils";

// =============================================================================
// 🛡️ SAFE TS-MORPH LAZY LOADING (No Top-Level Imports)
// =============================================================================

let tsMorphModule: any = null;
let tsMorphLoadAttempted = false;

async function getTsMorphSafely(): Promise<any> {
  if (tsMorphLoadAttempted && !tsMorphModule) {
    return null;
  }

  if (!tsMorphModule && !tsMorphLoadAttempted) {
    tsMorphLoadAttempted = true;
    try {
      tsMorphModule = await import("ts-morph");
      console.log("✅ ts-morph loaded successfully");
      return tsMorphModule;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.warn(
        "⚠️ ts-morph not available, using text-based analysis only:",
        errorMessage
      );
      tsMorphModule = null;
      return null;
    }
  }

  return tsMorphModule;
}

async function createSafeProject(
  documentFileName: string
): Promise<{ project: any | null; sourceFile: any | null }> {
  try {
    const tsMorph = await getTsMorphSafely();
    if (!tsMorph) {
      return { project: null, sourceFile: null };
    }

    const { Project } = tsMorph;
    const tsConfigPath = findTsConfig(documentFileName);
    let project: any;

    if (tsConfigPath && fs.existsSync(tsConfigPath)) {
      project = new Project({
        tsConfigFilePath: tsConfigPath,
        useInMemoryFileSystem: true,
      });
    } else {
      project = new Project({
        useInMemoryFileSystem: true,
        compilerOptions: {
          target: 99, // Latest
          module: 99, // ESNext
          jsx: 4, // Preserve
          allowJs: true,
          skipLibCheck: true,
        },
      });
    }

    return { project, sourceFile: null };
  } catch (error) {
    console.warn("ts-morph project creation failed:", error);
    return { project: null, sourceFile: null };
  }
}

// =============================================================================
// 🔧 SAFE BRAIN CONNECTOR WRAPPER (No Prototype Pollution)
// =============================================================================

class SafeBrainConnector {
  private brain: any;

  constructor(brainConnector: any) {
    this.brain = brainConnector;
  }

  async toggleLearning(): Promise<any> {
    try {
      const brainConnector = getBrainInterface();
      return await brainConnector?.toggleLearning();
    } catch (error) {
      console.warn("Brain toggleLearning failed:", error);
      return null;
    }
  }

  async learnFromAction(
    action: string,
    result: "success" | "failure",
    context?: any
  ): Promise<void> {
    try {
      const brainConnector = getBrainInterface();
      await brainConnector?.learnFromAction(action, result, context);
    } catch (error) {
      console.warn("Brain learnFromAction failed:", error);
    }
  }

  async getQuickFixSuggestions(code: string, filePath: string): Promise<any[]> {
    try {
      const brainConnector = getBrainInterface(); // TODO: Implement getQuickFixSuggestions
      return [];
    } catch (error) {
      console.warn("Brain getQuickFixSuggestions failed:", error);
      return [];
    }
  }

  async learnFromQuickFix(
    fix: QuickFix,
    result: "accepted" | "rejected" | "modified"
  ): Promise<void> {
    try {
      const brainConnector = getBrainInterface();
      await brainConnector?.learnFromAction("quickfix", "success", {
        fix,
        result,
      });
    } catch (error) {
      console.warn("Brain learnFromQuickFix failed:", error);
    }
  }

  async getCodeInsights(code: string, filePath: string): Promise<any[]> {
    try {
      const brainConnector = getBrainInterface(); // TODO: Implement getCodeInsights
      return [];
    } catch (error) {
      console.warn("Brain getCodeInsights failed:", error);
      return [];
    }
  }
}

// =============================================================================
// 🔧 QUICK FIX TYPES & INTERFACES
// =============================================================================

interface QuickFix {
  id: string;
  type:
    | "syntax"
    | "import"
    | "type"
    | "performance"
    | "music"
    | "brain"
    | "style"
    | "route";
  description: string;
  originalCode: string;
  fixedCode: string;
  startPos: vscode.Position;
  endPos: vscode.Position;
  severity: "error" | "warning" | "info" | "suggestion";
  musicSpecific: boolean;
  brainGenerated: boolean;
  confidence: number;
  category: string;
  autoApplicable: boolean;
  requiresUserInput: boolean;
  dependencies?: string[];
  testSuggestion?: string;
}

interface QuickFixSession {
  fixes: QuickFix[];
  selections: vscode.Selection[];
  document: vscode.TextDocument;
  brainInsights: BrainInsight[];
  musicContext: boolean;
  complexity: number;
  fileType: string;
  timestamp: Date;
  tsProjectAvailable: boolean;
}

interface BatchFixResult {
  totalFiles: number;
  totalFixes: number;
  appliedFixes: number;
  skippedFixes: number;
  errors: string[];
  musicFilesFixed: number;
  brainEnhancements: number;
}

// =============================================================================
// 🎯 MAIN QUICK FIX HANDLER (Error-Resistant)
// =============================================================================

export async function quickFileFixHandler(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    displayError("No active editor found");
    return;
  }

  try {
    displayProgress("🔍 Analyzing code for quick fixes...");

    const session = await createQuickFixSession(editor);

    if (session.fixes.length === 0) {
      displaySuccess("No issues found to fix - code looks great!");
      return;
    }

    await displayQuickFixOptions(session);
  } catch (error) {
    displayError(`Quick fix failed: ${error}`, { error });
    console.error("QuickFix Handler Error:", error);

    try {
      await runBasicTextFixes(editor);
    } catch (fallbackError) {
      console.error("Fallback fixes also failed:", fallbackError);
    }
  }
}

// =============================================================================
// 🧠 ENHANCED QUICK FIX SESSION CREATION (Safe)
// =============================================================================

async function createQuickFixSession(
  editor: vscode.TextEditor
): Promise<QuickFixSession> {
  const document = editor.document;
  const selections =
    editor.selections.length > 0 && !editor.selection.isEmpty
      ? editor.selections
      : [
          new vscode.Selection(
            0,
            0,
            document.lineCount - 1,
            document.lineAt(document.lineCount - 1).text.length
          ),
        ];

  const session: QuickFixSession = {
    fixes: [],
    selections: [...selections],
    document,
    brainInsights: [],
    musicContext: isMusicRelatedFile(document.fileName, document.getText()),
    complexity: calculateComplexity(document.getText()),
    fileType: getFileType(document.fileName),
    timestamp: new Date(),
    tsProjectAvailable: false,
  };

  const { project } = await createSafeProject(document.fileName);
  session.tsProjectAvailable = project !== null;

  // Analyze each selection
  for (const selection of selections) {
    const selectedText = document.getText(selection);

    // Get text-based fixes (always safe)
    const textFixes = await getTextBasedFixes(
      selectedText,
      selection,
      document
    );
    session.fixes.push(...textFixes);

    // Get AST-based fixes (only if ts-morph is working)
    if (session.tsProjectAvailable && project) {
      try {
        const astFixes = await getASTBasedFixes(
          project,
          selectedText,
          selection,
          document
        );
        session.fixes.push(...astFixes);
      } catch (astError) {
        console.warn(
          "AST analysis failed, continuing with text-based fixes:",
          astError
        );
        session.tsProjectAvailable = false;
      }
    }

    // Get music-specific fixes
    if (session.musicContext) {
      const musicFixes = await getMusicSpecificFixes(
        selectedText,
        selection,
        document
      );
      session.fixes.push(...musicFixes);
    }

    // Get Brain AI suggestions (with error handling)
    if (isBrainAvailable()) {
      try {
        const brainFixes = await getBrainEnhancedFixes(
          selectedText,
          document.fileName,
          selection
        );
        session.fixes.push(...brainFixes);

        const brainInsights = await getBrainInsights(
          selectedText,
          document.fileName
        );
        session.brainInsights.push(...brainInsights);
      } catch (brainError) {
        console.warn("Brain analysis failed:", brainError);
      }
    }

    // Get performance optimizations (text-based, safe)
    const perfFixes = await getPerformanceOptimizations(
      selectedText,
      selection,
      document
    );
    session.fixes.push(...perfFixes);

    // Get route-specific fixes
    if (
      document.fileName.includes("route") ||
      document.fileName.includes("page")
    ) {
      const routeFixes = await getRouteSpecificFixes(
        selectedText,
        selection,
        document
      );
      session.fixes.push(...routeFixes);
    }
  }

  // Clean up project safely
  if (project) {
    try {
      const sourceFiles = project.getSourceFiles();
      if (sourceFiles.length > 0) {
        project.removeSourceFile(sourceFiles[0]);
      }
    } catch (cleanupError) {
      console.warn("Project cleanup failed:", cleanupError);
    }
  }

  session.fixes = removeDuplicateFixes(session.fixes);
  session.fixes.sort((a, b) => {
    const severityOrder = { error: 4, warning: 3, info: 2, suggestion: 1 };
    return (
      severityOrder[b.severity] - severityOrder[a.severity] ||
      b.confidence - a.confidence
    );
  });

  if (isBrainAvailable()) {
    try {
      await shareAnalysisData("quickfix-session", {
        fileType: session.fileType,
        musicContext: session.musicContext,
        complexity: session.complexity,
        fixCount: session.fixes.length,
        brainInsights: session.brainInsights.length,
        tsProjectAvailable: session.tsProjectAvailable,
      });
    } catch (shareError) {
      console.warn("Brain data sharing failed:", shareError);
    }
  }

  return session;
}

// =============================================================================
// 🔧 TEXT-BASED FIXES (CORRECTED - Proper Position Calculation)
// =============================================================================

async function getTextBasedFixes(
  text: string,
  selection: vscode.Selection,
  document: vscode.TextDocument
): Promise<QuickFix[]> {
  const fixes: QuickFix[] = [];
  const documentText = document.getText();

  // Fix common string replacements
  const stringFixes = [
    {
      from: "'working'",
      to: "'active'",
      desc: "Replace 'working' with 'active'",
    },
    {
      from: '"working"',
      to: '"active"',
      desc: "Replace 'working' with 'active'",
    },
    { from: ": any", to: ": unknown", desc: "Replace 'any' with 'unknown'" },
    {
      from: "console.log",
      to: "// console.log",
      desc: "Comment out console.log",
    },
  ];

  stringFixes.forEach((fix) => {
    let index = 0;
    while ((index = text.indexOf(fix.from, index)) !== -1) {
      // 🔧 FIXED: Calculate proper document position
      const selectionStartOffset = document.offsetAt(selection.start);
      const fixStartOffset = selectionStartOffset + index;
      const fixEndOffset = fixStartOffset + fix.from.length;

      const startPos = document.positionAt(fixStartOffset);
      const endPos = document.positionAt(fixEndOffset);

      fixes.push({
        id: `text-fix-${fixStartOffset}`,
        type: "syntax",
        description: fix.desc,
        originalCode: fix.from,
        fixedCode: fix.to,
        startPos,
        endPos,
        severity: "warning",
        musicSpecific: false,
        brainGenerated: false,
        confidence: 0.9,
        category: "Text Replacement",
        autoApplicable: true,
        requiresUserInput: false,
      });

      index += fix.from.length;
    }
  });

  // 🔧 FIXED: Better React import detection + File Extension Check
  const hasJSX =
    text.includes("<") && text.includes(">") && /(<\w+|<\/\w+)/.test(text);
  const hasReactImport =
    documentText.includes("import React") ||
    documentText.includes("import * as React");
  const isTypeScriptFile = document.fileName.endsWith(".ts");
  const isTypeScriptReactFile = document.fileName.endsWith(".tsx");

  // 🚨 CRITICAL: JSX in .ts file instead of .tsx
  if (hasJSX && isTypeScriptFile) {
    fixes.push({
      id: "tsx-extension-fix",
      type: "syntax",
      description: "⚠️ CRITICAL: Rename file to .tsx for JSX support",
      originalCode: "",
      fixedCode: `// 🚨 This file contains JSX but has .ts extension!\n// Please rename to: ${document.fileName.replace(".ts", ".tsx")}\n// This will fix all the TypeScript errors!\n`,
      startPos: new vscode.Position(0, 0),
      endPos: new vscode.Position(0, 0),
      severity: "error",
      musicSpecific: false,
      brainGenerated: false,
      confidence: 0.99,
      category: "File Extension Mismatch",
      autoApplicable: true,
      requiresUserInput: false,
    });
  }

  // Only suggest React import if file extension is correct
  if (hasJSX && !hasReactImport && isTypeScriptReactFile) {
    fixes.push({
      id: "react-import-fix",
      type: "import",
      description: "Add 'import React' for JSX usage",
      originalCode: "",
      fixedCode: "import React from 'react';\n",
      startPos: new vscode.Position(0, 0),
      endPos: new vscode.Position(0, 0),
      severity: "error",
      musicSpecific: false,
      brainGenerated: false,
      confidence: 0.99,
      category: "Missing Imports",
      autoApplicable: true,
      requiresUserInput: false,
    });
  }

  // Fix missing exports
  if (text.includes("function ") && !text.includes("export")) {
    const funcMatch = text.match(/function\s+(\w+)/);
    if (funcMatch) {
      const funcIndex = text.indexOf(funcMatch[0]);
      const selectionStartOffset = document.offsetAt(selection.start);
      const funcStartOffset = selectionStartOffset + funcIndex;
      const funcEndOffset = funcStartOffset + funcMatch[0].length;

      fixes.push({
        id: "export-fix",
        type: "syntax",
        description: `Add export for function ${funcMatch[1]}`,
        originalCode: funcMatch[0],
        fixedCode: `export ${funcMatch[0]}`,
        startPos: document.positionAt(funcStartOffset),
        endPos: document.positionAt(funcEndOffset),
        severity: "warning",
        musicSpecific: false,
        brainGenerated: false,
        confidence: 0.85,
        category: "Missing Exports",
        autoApplicable: true,
        requiresUserInput: false,
      });
    }
  }

  return fixes;
}

// =============================================================================
// 🔧 AST-BASED FIXES (Only When ts-morph Works)
// =============================================================================

async function getASTBasedFixes(
  project: any,
  selectedText: string,
  selection: vscode.Selection,
  document: vscode.TextDocument
): Promise<QuickFix[]> {
  const fixes: QuickFix[] = [];

  try {
    const tsMorph = await getTsMorphSafely();
    if (!tsMorph || !project) {
      return fixes;
    }

    const { SyntaxKind } = tsMorph;
    const sourceFile = project.createSourceFile("temp.tsx", selectedText);

    // Fix string enums with proper position calculation
    sourceFile
      .getDescendantsOfKind(SyntaxKind.StringLiteral)
      .forEach((literal: any) => {
        const literalText = literal.getText();
        if (literalText === "'working'" || literalText === '"working"') {
          const literalStart = literal.getStart();
          const literalEnd = literal.getEnd();

          // Calculate actual document positions
          const selectionStartOffset = document.offsetAt(selection.start);
          const actualStartOffset = selectionStartOffset + literalStart;
          const actualEndOffset = selectionStartOffset + literalEnd;

          fixes.push({
            id: `enum-fix-${actualStartOffset}`,
            type: "syntax",
            description: "Replace 'working' with 'active' for consistency",
            originalCode: literalText,
            fixedCode: "'active'",
            startPos: document.positionAt(actualStartOffset),
            endPos: document.positionAt(actualEndOffset),
            severity: "warning",
            musicSpecific: false,
            brainGenerated: false,
            confidence: 0.95,
            category: "Enum Consistency",
            autoApplicable: true,
            requiresUserInput: false,
          });
        }
      });

    project.removeSourceFile(sourceFile);
  } catch (astError) {
    console.warn("AST-based fix analysis failed:", astError);
  }

  return fixes;
}

// =============================================================================
// 🎵 MUSIC-SPECIFIC FIXES (Text-Based, Safe)
// =============================================================================

async function getMusicSpecificFixes(
  text: string,
  selection: vscode.Selection,
  document: vscode.TextDocument
): Promise<QuickFix[]> {
  const fixes: QuickFix[] = [];

  // Fix missing audio context
  if (
    text.includes("audio") &&
    !text.includes("AudioContext") &&
    !text.includes("new Audio")
  ) {
    fixes.push({
      id: "audio-context-fix",
      type: "music",
      description: "Add AudioContext for audio processing",
      originalCode: "",
      fixedCode: "const audioContext = new AudioContext();\n",
      startPos: selection.start,
      endPos: selection.start,
      severity: "suggestion",
      musicSpecific: true,
      brainGenerated: false,
      confidence: 0.7,
      category: "Audio Setup",
      autoApplicable: false,
      requiresUserInput: true,
    });
  }

  // Fix chord progression typing
  if (
    text.includes("chord") &&
    text.includes("[") &&
    !text.includes("ChordInfo") &&
    !text.includes("string[]")
  ) {
    const chordMatch = text.match(/chords:\s*\[/);
    if (chordMatch) {
      const chordIndex = text.indexOf(chordMatch[0]);
      const selectionStartOffset = document.offsetAt(selection.start);
      const chordStartOffset = selectionStartOffset + chordIndex;
      const chordEndOffset = chordStartOffset + chordMatch[0].length;

      fixes.push({
        id: "chord-typing-fix",
        type: "music",
        description: "Add type annotation for chord arrays",
        originalCode: chordMatch[0],
        fixedCode: "chords: string[] = [",
        startPos: document.positionAt(chordStartOffset),
        endPos: document.positionAt(chordEndOffset),
        severity: "info",
        musicSpecific: true,
        brainGenerated: false,
        confidence: 0.75,
        category: "Music Typing",
        autoApplicable: true,
        requiresUserInput: false,
      });
    }
  }

  return fixes;
}

// =============================================================================
// 🧠 BRAIN-ENHANCED FIXES (Safe with Error Handling)
// =============================================================================

async function getBrainEnhancedFixes(
  code: string,
  filePath: string,
  selection: vscode.Selection
): Promise<QuickFix[]> {
  const fixes: QuickFix[] = [];

  try {
    const brainConnector = getBrainInterface();
    if (!brainConnector) return fixes;

    const safeBrain = new SafeBrainConnector(brainConnector);
    const suggestions = await safeBrain.getQuickFixSuggestions(code, filePath);

    suggestions.forEach((suggestion: any, index: number) => {
      fixes.push({
        id: `brain-fix-${index}`,
        type: "brain",
        description: suggestion.description || "🧠 Brain-generated improvement",
        originalCode: suggestion.originalCode || code,
        fixedCode: suggestion.fixedCode || code,
        startPos: selection.start,
        endPos: selection.end,
        severity: suggestion.severity || "suggestion",
        musicSpecific: suggestion.musicSpecific || false,
        brainGenerated: true,
        confidence: suggestion.confidence || 0.8,
        category: "AI Enhancement",
        autoApplicable: suggestion.autoApplicable || false,
        requiresUserInput: suggestion.requiresUserInput || true,
      });
    });

    if (isMusicRelatedFile(filePath, code)) {
      fixes.push({
        id: "brain-music-enhancement",
        type: "brain",
        description: "🧠 Apply AI music intelligence enhancements",
        originalCode: code,
        fixedCode: code,
        startPos: selection.start,
        endPos: selection.end,
        severity: "suggestion",
        musicSpecific: true,
        brainGenerated: true,
        confidence: 0.85,
        category: "Music Intelligence",
        autoApplicable: false,
        requiresUserInput: true,
      });
    }
  } catch (error) {
    console.warn("Brain-enhanced fixes failed safely:", error);
  }

  return fixes;
}

// =============================================================================
// ⚡ PERFORMANCE OPTIMIZATIONS (Text-Based)
// =============================================================================

async function getPerformanceOptimizations(
  text: string,
  selection: vscode.Selection,
  document: vscode.TextDocument
): Promise<QuickFix[]> {
  const fixes: QuickFix[] = [];

  // useCallback for event handlers
  if (text.includes("onClick=") && !text.includes("useCallback")) {
    const onClickMatch = text.match(/onClick\s*=\s*\{[^}]+\}/);
    if (onClickMatch) {
      const onClickIndex = text.indexOf(onClickMatch[0]);
      const selectionStartOffset = document.offsetAt(selection.start);
      const onClickStartOffset = selectionStartOffset + onClickIndex;

      fixes.push({
        id: "use-callback-fix",
        type: "performance",
        description: "Consider useCallback for event handlers",
        originalCode: "",
        fixedCode:
          "// Consider: const handleClick = useCallback(() => { /* handler */ }, []);\n",
        startPos: document.positionAt(onClickStartOffset),
        endPos: document.positionAt(onClickStartOffset),
        severity: "suggestion",
        musicSpecific: false,
        brainGenerated: false,
        confidence: 0.7,
        category: "Performance",
        autoApplicable: false,
        requiresUserInput: true,
      });
    }
  }

  return fixes;
}

// =============================================================================
// 🗺️ ROUTE-SPECIFIC FIXES
// =============================================================================

async function getRouteSpecificFixes(
  text: string,
  selection: vscode.Selection,
  document: vscode.TextDocument
): Promise<QuickFix[]> {
  const fixes: QuickFix[] = [];

  // Fix missing route exports
  if (text.includes("function") && !text.includes("export default")) {
    const funcMatch = text.match(/function\s+(\w+)/);
    if (funcMatch) {
      const funcIndex = text.indexOf(funcMatch[0]);
      const selectionStartOffset = document.offsetAt(selection.start);
      const funcStartOffset = selectionStartOffset + funcIndex;

      fixes.push({
        id: "route-export-fix",
        type: "route",
        description: `Add default export for route component ${funcMatch[1]}`,
        originalCode: funcMatch[0],
        fixedCode: `export default ${funcMatch[0]}`,
        startPos: document.positionAt(funcStartOffset),
        endPos: document.positionAt(funcStartOffset + funcMatch[0].length),
        severity: "warning",
        musicSpecific: false,
        brainGenerated: false,
        confidence: 0.9,
        category: "Route Structure",
        autoApplicable: true,
        requiresUserInput: false,
      });
    }
  }

  return fixes;
}

// =============================================================================
// 🧠 BRAIN INSIGHTS (Safe & Type-Compliant)
// =============================================================================

async function getBrainInsights(
  code: string,
  filePath: string
): Promise<BrainInsight[]> {
  const insights: BrainInsight[] = [];

  try {
    const brainConnector = getBrainInterface();
    if (!brainConnector) return insights;

    const safeBrain = new SafeBrainConnector(brainConnector);
    const brainInsights = await safeBrain.getCodeInsights(code, filePath);

    brainInsights.forEach((insight: any) => {
      const brainInsight: BrainInsight = {
        health: typeof insight.health === "number" ? insight.health : 100,
        status: insight.status || "processed",
        insights: Array.isArray(insight.insights)
          ? insight.insights.map((i: any) => String(i))
          : [
              insight.message ||
                insight.recommendation ||
                "Brain-generated insight",
            ],
        recommendations: Array.isArray(insight.recommendations)
          ? insight.recommendations.map((r: any) => String(r))
          : [insight.recommendation || "Brain-generated recommendation"],
        type: insight.type || "analysis",
        confidence:
          typeof insight.confidence === "number" ? insight.confidence : 0.8,
        recommendation: insight.recommendation || "Brain-generated insight",
        musicSpecific: Boolean(insight.musicSpecific),
        implementationSteps: Array.isArray(insight.implementationSteps)
          ? insight.implementationSteps.map((step: any) => String(step))
          : [],
        timestamp:
          insight.timestamp instanceof Date ? insight.timestamp : new Date(),
        message: insight.message || insight.recommendation || "Brain insight",
        actionable: Boolean(insight.actionable !== false),
        priority: ["low", "medium", "high"].includes(insight.priority)
          ? (insight.priority as "low" | "medium" | "high")
          : "medium",
        category: insight.category || "Intelligence",
        source: [
          "brain",
          "pattern",
          "learning",
          "analysis",
          "songsterr",
        ].includes(insight.source)
          ? (insight.source as
              | "brain"
              | "pattern"
              | "learning"
              | "analysis"
              | "songsterr")
          : "brain",
        audioRelated: insight.audioRelated,
        tabProcessing: insight.tabProcessing,
        chordAnalysis: insight.chordAnalysis,
        harmonyInsight: insight.harmonyInsight,
        performanceHint: insight.performanceHint,
      };

      insights.push(brainInsight);
    });
  } catch (error) {
    console.warn("Brain insights failed safely:", error);

    insights.push({
      health: 75,
      status: "fallback",
      insights: ["Brain connection unavailable, using fallback analysis"],
      recommendations: [
        "Check Brain connector status",
        "Retry with manual analysis",
      ],
      type: "fallback",
      confidence: 0.5,
      recommendation: "Brain analysis unavailable - using text-based analysis",
      musicSpecific: false,
      implementationSteps: [
        "Verify Brain connector",
        "Check network connectivity",
      ],
      timestamp: new Date(),
      message: "Brain insights failed, fallback mode active",
      actionable: true,
      priority: "low",
      category: "System",
      source: "analysis",
    });
  }

  return insights;
}

// =============================================================================
// 🎯 DISPLAY QUICK FIX OPTIONS (Enhanced)
// =============================================================================

async function displayQuickFixOptions(session: QuickFixSession): Promise<void> {
  const statusIcon = session.tsProjectAvailable ? "🔧" : "📝";
  const analysisType = session.tsProjectAvailable
    ? "AST + Text Analysis"
    : "Text Analysis Only";

  const options = [
    `🚀 Apply All Auto-Fixes (${session.fixes.filter((f) => f.autoApplicable).length})`,
    `🎯 Select Specific Fixes (${session.fixes.length})`,
    `🧠 Apply Brain Suggestions (${session.fixes.filter((f) => f.brainGenerated).length})`,
    `🎵 Apply Music Fixes (${session.fixes.filter((f) => f.musicSpecific).length})`,
    `⚡ Apply Performance Fixes (${session.fixes.filter((f) => f.type === "performance").length})`,
    `🔧 Deep Batch Fix (Entire Workspace)`,
    `📊 Show Analysis Details (${analysisType})`,
    `❌ Cancel`,
  ];

  const selection = await showQuickPick(
    options,
    `${statusIcon} Choose quick fix option`
  );

  if (!selection) return;

  switch (true) {
    case selection.startsWith("🚀"):
      await applyAutoFixes(session);
      break;
    case selection.startsWith("🎯"):
      await selectSpecificFixes(session);
      break;
    case selection.startsWith("🧠"):
      await applyBrainFixes(session);
      break;
    case selection.startsWith("🎵"):
      await applyMusicFixes(session);
      break;
    case selection.startsWith("⚡"):
      await applyPerformanceFixes(session);
      break;
    case selection.startsWith("🔧"):
      await runDeepBatchFix();
      break;
    case selection.startsWith("📊"):
      await showAnalysisDetails(session);
      break;
  }
}

// =============================================================================
// 🔧 APPLY FIXES FUNCTIONS (CORRECTED - Proper Range Handling)
// =============================================================================

async function applyAutoFixes(session: QuickFixSession): Promise<void> {
  const autoFixes = session.fixes.filter((f) => f.autoApplicable);

  if (autoFixes.length === 0) {
    displayWarning("No auto-applicable fixes found");
    return;
  }

  const confirmed = await vscode.window.showWarningMessage(
    `Apply ${autoFixes.length} automatic fixes?`,
    { modal: true },
    "Yes",
    "No"
  );

  if (confirmed === "Yes") {
    await applyFixesToDocument(session.document, autoFixes);
    await learnFromFixes(autoFixes, "accepted");
    displaySuccess(`Applied ${autoFixes.length} automatic fixes!`);
  }
}

async function selectSpecificFixes(session: QuickFixSession): Promise<void> {
  const fixItems = session.fixes.map((fix) => ({
    label: `${getFixIcon(fix)} ${fix.description}`,
    description: `${fix.category} - Confidence: ${Math.round(fix.confidence * 100)}%`,
    detail: fix.brainGenerated
      ? "🧠 Brain-generated"
      : fix.musicSpecific
        ? "🎵 Music-specific"
        : "Standard fix",
    fix,
  }));

  const selectedItems = await vscode.window.showQuickPick(fixItems, {
    placeHolder: "Select fixes to apply",
    canPickMany: true,
    matchOnDescription: true,
    matchOnDetail: true,
  });

  if (selectedItems && selectedItems.length > 0) {
    const selectedFixes = selectedItems.map((item) => item.fix);
    await applyFixesToDocument(session.document, selectedFixes);
    await learnFromFixes(selectedFixes, "accepted");
    displaySuccess(`Applied ${selectedFixes.length} selected fixes!`);
  }
}

async function applyBrainFixes(session: QuickFixSession): Promise<void> {
  const brainFixes = session.fixes.filter((f) => f.brainGenerated);

  if (brainFixes.length === 0) {
    displayWarning("No Brain-generated fixes available");
    return;
  }

  if (session.brainInsights.length > 0) {
    await displayBrainSuggestions(
      session.brainInsights.map((i) => i.recommendation)
    );
  }

  const confirmed = await vscode.window.showInformationMessage(
    `Apply ${brainFixes.length} Brain-enhanced fixes?`,
    { modal: true },
    "Yes",
    "Review First",
    "No"
  );

  if (confirmed === "Yes") {
    await applyFixesToDocument(session.document, brainFixes);
    await learnFromFixes(brainFixes, "accepted");
    displaySuccess(`Applied ${brainFixes.length} Brain-enhanced fixes!`);
  } else if (confirmed === "Review First") {
    await selectSpecificFixes({ ...session, fixes: brainFixes });
  }
}

async function applyMusicFixes(session: QuickFixSession): Promise<void> {
  const musicFixes = session.fixes.filter((f) => f.musicSpecific);

  if (musicFixes.length === 0) {
    displayWarning("No music-specific fixes available");
    return;
  }

  await applyFixesToDocument(session.document, musicFixes);
  await learnFromFixes(musicFixes, "accepted");
  displaySuccess(`Applied ${musicFixes.length} music-specific fixes!`);
}

async function applyPerformanceFixes(session: QuickFixSession): Promise<void> {
  const perfFixes = session.fixes.filter((f) => f.type === "performance");

  if (perfFixes.length === 0) {
    displayWarning("No performance fixes available");
    return;
  }

  await applyFixesToDocument(session.document, perfFixes);
  await learnFromFixes(perfFixes, "accepted");
  displaySuccess(`Applied ${perfFixes.length} performance fixes!`);
}

// =============================================================================
// 🔧 FALLBACK BASIC TEXT FIXES (No Dependencies)
// =============================================================================

async function runBasicTextFixes(editor: vscode.TextEditor): Promise<void> {
  const document = editor.document;
  const text = document.getText();

  displayProgress("Running basic text fixes...");

  const basicFixes = [
    { from: "'working'", to: "'active'" },
    { from: '"working"', to: '"active"' },
    { from: "console.log(", to: "// console.log(" },
  ];

  let fixCount = 0;

  await editor.edit((editBuilder) => {
    basicFixes.forEach((fix) => {
      let index = 0;
      while ((index = text.indexOf(fix.from, index)) !== -1) {
        const startPos = document.positionAt(index);
        const endPos = document.positionAt(index + fix.from.length);
        editBuilder.replace(new vscode.Range(startPos, endPos), fix.to);
        fixCount++;
        index += fix.from.length;
      }
    });
  });

  if (fixCount > 0) {
    displaySuccess(`Applied ${fixCount} basic text fixes!`);
  } else {
    displayWarning("No basic fixes needed");
  }
}

// =============================================================================
// 🔧 UTILITY FUNCTIONS (CORRECTED - Proper Range Application)
// =============================================================================

async function applyFixesToDocument(
  document: vscode.TextDocument,
  fixes: QuickFix[]
): Promise<void> {
  try {
    const editor = await vscode.window.showTextDocument(document);

    // 🔧 FIXED: Sort fixes by position (last to first) to avoid position shifting
    const sortedFixes = [...fixes].sort((a, b) => {
      const aOffset = document.offsetAt(a.startPos);
      const bOffset = document.offsetAt(b.startPos);
      return bOffset - aOffset; // Reverse order
    });

    await editor.edit((editBuilder) => {
      for (const fix of sortedFixes) {
        try {
          // 🔧 FIXED: Use proper startPos and endPos instead of line/column math
          const range = new vscode.Range(fix.startPos, fix.endPos);
          editBuilder.replace(range, fix.fixedCode);
          console.log(
            `✅ Applied fix: ${fix.description} at ${fix.startPos.line}:${fix.startPos.character}`
          );
        } catch (rangeError) {
          console.warn(`Failed to apply fix ${fix.id}:`, rangeError);
        }
      }
    });
  } catch (editError) {
    console.error("Failed to apply fixes to document:", editError);
    throw editError;
  }
}

async function learnFromFixes(
  fixes: QuickFix[],
  result: "accepted" | "rejected" | "modified"
): Promise<void> {
  if (!isBrainAvailable()) return;

  try {
    const brainConnector = getBrainInterface();
    if (!brainConnector) return;

    const safeBrain = new SafeBrainConnector(brainConnector);

    for (const fix of fixes) {
      try {
        await safeBrain.learnFromQuickFix(fix, result);
      } catch (learnError) {
        console.warn(`Failed to learn from fix ${fix.id}:`, learnError);
      }
    }
  } catch (error) {
    console.warn("Learning from fixes failed safely:", error);
  }
}

function removeDuplicateFixes(fixes: QuickFix[]): QuickFix[] {
  const seen = new Set<string>();
  return fixes.filter((fix) => {
    const key = `${fix.startPos.line}-${fix.startPos.character}-${fix.type}-${fix.description}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getFixIcon(fix: QuickFix): string {
  const icons = {
    syntax: "🔧",
    import: "📦",
    type: "🏷️",
    performance: "⚡",
    music: "🎵",
    brain: "🧠",
    style: "🎨",
    route: "🗺️",
  };
  return icons[fix.type] || "🔧";
}

function findTsConfig(filePath: string): string | undefined {
  try {
    let currentDir = path.dirname(filePath);

    while (currentDir !== path.dirname(currentDir)) {
      const tsConfigPath = path.join(currentDir, "tsconfig.json");
      if (fs.existsSync(tsConfigPath)) {
        return tsConfigPath;
      }
      currentDir = path.dirname(currentDir);
    }
  } catch (error) {
    console.warn("Failed to find tsconfig.json:", error);
  }

  return undefined;
}

async function showAnalysisDetails(session: QuickFixSession): Promise<void> {
  const analysisMode = session.tsProjectAvailable
    ? "🔧 Full AST Analysis"
    : "📝 Text Analysis Only";

  const details = `📊 Quick Fix Analysis Details:

📄 File: ${path.basename(session.document.fileName)}
${analysisMode}
🔧 File Type: ${session.fileType}
📊 Complexity: ${session.complexity}/10
🎵 Music Context: ${session.musicContext ? "Yes" : "No"}
🧠 Brain Insights: ${session.brainInsights.length}

🔧 Fixes Found: ${session.fixes.length}
├── Auto-applicable: ${session.fixes.filter((f) => f.autoApplicable).length}
├── Brain-generated: ${session.fixes.filter((f) => f.brainGenerated).length}
├── Music-specific: ${session.fixes.filter((f) => f.musicSpecific).length}
├── Performance: ${session.fixes.filter((f) => f.type === "performance").length}
└── User input needed: ${session.fixes.filter((f) => f.requiresUserInput).length}

🎯 Selections: ${session.selections.length}
📅 Generated: ${session.timestamp.toLocaleString()}

${!session.tsProjectAvailable ? "⚠️ Note: ts-morph AST analysis unavailable, using text-based fixes only" : "✅ Full AST analysis available"}`;

  await vscode.window.showInformationMessage(details, { modal: true });
}

async function runDeepBatchFix(): Promise<void> {
  const confirmed = await vscode.window.showWarningMessage(
    "🔥 Deep Batch Fix will analyze and fix ALL files in your workspace. Continue?",
    { modal: true },
    "Yes, Run Deep Fix",
    "No"
  );

  if (confirmed !== "Yes, Run Deep Fix") return;

  return vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "🔧 Running Deep Batch Fix...",
      cancellable: false,
    },
    async (progress) => {
      const result: BatchFixResult = {
        totalFiles: 0,
        totalFixes: 0,
        appliedFixes: 0,
        skippedFixes: 0,
        errors: [],
        musicFilesFixed: 0,
        brainEnhancements: 0,
      };

      try {
        const files = await vscode.workspace.findFiles(
          "**/*.{ts,tsx,js,jsx}",
          "**/node_modules/**"
        );

        result.totalFiles = files.length;
        const increment = 100 / files.length;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          progress.report({
            increment,
            message: `Processing ${path.basename(file.path)}...`,
          });

          try {
            const document = await vscode.workspace.openTextDocument(file);
            const editor = await vscode.window.showTextDocument(document, {
              preview: true,
            });

            const session = await createQuickFixSession(editor);
            const autoFixes = session.fixes.filter((f) => f.autoApplicable);

            if (autoFixes.length > 0) {
              await applyFixesToDocument(document, autoFixes);
              result.appliedFixes += autoFixes.length;
              result.totalFixes += session.fixes.length;

              if (session.musicContext) result.musicFilesFixed++;
              if (session.brainInsights.length > 0) result.brainEnhancements++;
            }

            await document.save();
          } catch (error) {
            result.errors.push(`${file.path}: ${error}`);
          }
        }

        await displayBatchFixResults(result);
      } catch (error) {
        displayError(`Deep Batch Fix failed: ${error}`);
      }
    }
  );
}

async function displayBatchFixResults(result: BatchFixResult): Promise<void> {
  const message = `🔧 Deep Batch Fix Complete!

📁 Files Processed: ${result.totalFiles}
🔧 Total Fixes Found: ${result.totalFixes}
✅ Fixes Applied: ${result.appliedFixes}
⏭️ Fixes Skipped: ${result.skippedFixes}
🎵 Music Files Fixed: ${result.musicFilesFixed}
🧠 Brain Enhancements: ${result.brainEnhancements}
❌ Errors: ${result.errors.length}

${result.errors.length > 0 ? "⚠️ Some files had errors - check output for details" : "🎉 All files processed successfully!"}`;

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    "View Report",
    "OK"
  );

  if (action === "View Report") {
    const reportDoc = await vscode.workspace.openTextDocument({
      content: `# Deep Batch Fix Report

## Summary
- **Files Processed**: ${result.totalFiles}
- **Total Fixes Found**: ${result.totalFixes}
- **Fixes Applied**: ${result.appliedFixes}
- **Music Files Fixed**: ${result.musicFilesFixed}
- **Brain Enhancements**: ${result.brainEnhancements}

## Errors
${result.errors.length > 0 ? result.errors.join("\n") : "No errors occurred"}`,
      language: "markdown",
    });

    await vscode.window.showTextDocument(reportDoc);
  }
}

// =============================================================================
// 🎸 EXPORT FOR EXTENSION.TS REGISTRATION
// =============================================================================

export { quickFileFixHandler as default };

// 🎸🧠🔧 CIPHER QUICK FIX - CORRECTED & SMARTER! 🔧🧠🎸
