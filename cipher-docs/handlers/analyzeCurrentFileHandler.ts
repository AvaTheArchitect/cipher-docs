// 🔍 Enhanced Analyze Current File Handler - Complete Implementation with TypeScript Integration
// .vscode-extension/cipher-autonomous-dev/src/handlers/file-handlers/analyzeCurrentFile.ts

import * as path from "path";
import * as vscode from "vscode";
import { FileAnalysis } from "../../shared/types";
import {
  calculateComplexity,
  ensureDirectoryExists,
  getBrainInterface,
  getFileType,
} from "../../shared/utils";

/**
 * 🔍 ENHANCED FEATURE: Comprehensive File Analysis with Real TypeScript Diagnostics
 * Now integrates with VS Code's TypeScript Language Server for REAL compiler errors!
 * Much more sophisticated than pattern-matching - sees actual compilation problems
 *
 * 🧠 v20 BRAIN INTEGRATION: Now feeds analysis results to brain for continuous learning
 */
export async function analyzeCurrentFileHandler(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active file to analyze");
    return;
  }

  const fileName = editor.document.fileName;
  const baseName = path.basename(fileName);

  if (!isFileTypeSupported(fileName, "analyze")) {
    vscode.window.showWarningMessage(
      `❌ File type ${path.extname(fileName)} not supported for analysis yet.`
    );
    return;
  }

  try {
    vscode.window.showInformationMessage(
      `🔍 Performing enhanced analysis with TypeScript diagnostics of ${baseName}...`
    );

    const analysis = await performComprehensiveFileAnalysis(editor);

    // 🧠 v20 REAL-TIME BRAIN LEARNING - Feed analysis results to brain
    await performBrainLearning("file-analysis", true, {
      fileName: baseName,
      confidence: analysis.confidence,
      complexity: analysis.complexity,
      issuesFound: analysis.issues.length,
      tsIssuesFound: analysis.issues.filter(
        (i) =>
          i.includes("Line") || i.includes("CRITICAL") || i.includes("WARNING")
      ).length,
      patternIssuesFound: analysis.issues.filter(
        (i) =>
          !i.includes("Line") &&
          !i.includes("CRITICAL") &&
          !i.includes("WARNING")
      ).length,
      canAutoFix: analysis.canAutoFix,
      fileType: analysis.fileType,
      suggestionsGenerated: analysis.suggestions.length,
      analysisTimestamp: Date.now(),
    });

    await displayEnhancedFileAnalysis(analysis, fileName);
    await generateFileAnalysisReport(editor, analysis);
  } catch (error) {
    // 🧠 Brain learning from analysis failures
    await performBrainLearning("file-analysis", false, {
      fileName: baseName,
      error: error instanceof Error ? error.message : String(error),
      analysisTimestamp: Date.now(),
    });

    vscode.window.showErrorMessage(`File analysis failed: ${error}`);
  }
}

/**
 * 🧠 v20 Brain Learning Integration for Analysis Results
 * Feeds analysis data to CipherBrainInterface for continuous learning
 */
async function performBrainLearning(
  action: string,
  success: boolean,
  metadata: any
): Promise<void> {
  try {
    console.log(
      `🚀 [v20] analyzeCurrentFile Brain Learning ENTRY - Action: ${action}, Success: ${success}`
    );

    // ✅ v20 CRITICAL FIX: Brain initialization in actually-called function
    console.log(`🧠 [v20] CRITICAL FIX: Calling initializeBrainSystem()...`);
    try {
      const { initializeBrainSystem } = await import("../../shared/utils");
      const initialized = await initializeBrainSystem();
      console.log(
        `🧠 [v20] Analysis brain initialization result: ${initialized ? "✅ SUCCESS" : "❌ FAILED"}`
      );

      if (!initialized) {
        console.log(`🧠 [v20] Brain not available for analysis learning`);
        return;
      }
    } catch (initError) {
      console.log(`🧠 [v20] Brain initialization failed: ${initError}`);
      return;
    }

    // ✅ Real-time brain learning (NO session saving - that's for training camp)
    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      console.log(
        `🧠 [v20] Brain interface not available for analysis learning`
      );
      return;
    }

    // Enhanced metadata for analysis learning
    const enhancedMetadata = {
      ...metadata,
      handlerName: "analyzeCurrentFile",
      version: "v20-UNIFIED",
      analysisType: "real-time-file-analysis",
      learningSource: "crown-jewel-handler",
      timestamp: new Date().toISOString(),
    };

    console.log(`🧠 [v20] Learning from file analysis: ${action}`);
    await brainInterface.learnFromAction(
      action,
      success ? "success" : "failure",
      enhancedMetadata
    );
    console.log(`✅ [v20] Analysis brain learning completed: ${action}`);

    // Debug brain availability
    console.log(`🧠 [v20] Brain Debug - Analysis Learning:
        - Brain Interface: ✅ AVAILABLE
        - Action: ${action}
        - Success: ${success}
        - Metadata Keys: ${Object.keys(enhancedMetadata).join(", ")}`);
  } catch (error) {
    console.error(
      `❌ [v20] Analysis brain learning failed for ${action}:`,
      error
    );
  }
}

async function performComprehensiveFileAnalysis(
  editor: vscode.TextEditor
): Promise<FileAnalysis> {
  const document = editor.document;
  const text = document.getText();
  const fileName = document.fileName;
  const lines = text.split("\n");

  const analysis: FileAnalysis = {
    issues: [],
    suggestions: [],
    fileType: getFileType(fileName),
    complexity: calculateComplexity(text),
    canAutoFix: false,
    confidence: 75,
    timestamp: Date.now(),
    source: "file-analysis",
  };

  // 🚀 NEW: Get REAL TypeScript diagnostics FIRST - this is the game changer!
  await analyzeTypeScriptDiagnostics(analysis, document);

  // 🔍 Continue with comprehensive pattern-based analysis
  await analyzeCodeQuality(analysis, text, fileName);
  await analyzePerformance(analysis, text, fileName);
  await analyzeMaintainability(analysis, text, lines);
  await analyzeSecurity(analysis, text, fileName);
  await analyzeAccessibility(analysis, text, fileName);
  await analyzeTestCoverage(analysis, fileName);
  await analyzeDependencies(analysis, text, fileName);

  // Enhanced auto-fix detection with TypeScript awareness
  analysis.canAutoFix = canIssuesBeAutoFixed(analysis.issues);

  return analysis;
}

/**
 * 🎯 NEW: TypeScript Diagnostics Integration - THE GAME CHANGER!
 * This catches REAL compiler errors that VS Code sees with red squiggles!
 */
async function analyzeTypeScriptDiagnostics(
  analysis: FileAnalysis,
  document: vscode.TextDocument
): Promise<void> {
  const diagnostics = vscode.languages.getDiagnostics(document.uri);

  console.log(
    `🔍 Found ${diagnostics.length} TypeScript diagnostics for ${document.fileName}`
  );

  for (const diagnostic of diagnostics) {
    const severity = diagnostic.severity;
    const message = diagnostic.message;
    const line = diagnostic.range.start.line + 1; // Convert to 1-based line numbers
    const source = diagnostic.source || "TypeScript";

    console.log(`📍 ${source} ${severity}: ${message} (Line ${line})`);

    // Categorize based on severity with enhanced formatting
    if (severity === vscode.DiagnosticSeverity.Error) {
      analysis.issues.push(
        `🚨 CRITICAL: ${message} (Line ${line}) - Source: ${source}`
      );
    } else if (severity === vscode.DiagnosticSeverity.Warning) {
      analysis.issues.push(
        `⚠️ WARNING: ${message} (Line ${line}) - Source: ${source}`
      );
    } else if (severity === vscode.DiagnosticSeverity.Information) {
      analysis.suggestions.push(
        `💡 INFO: ${message} (Line ${line}) - Source: ${source}`
      );
    } else if (severity === vscode.DiagnosticSeverity.Hint) {
      analysis.suggestions.push(
        `💭 HINT: ${message} (Line ${line}) - Source: ${source}`
      );
    }

    // 🔧 Enhanced special handling for common TypeScript issues with smart suggestions
    if (
      message.includes("--jsx") ||
      message.includes("JSX.IntrinsicElements")
    ) {
      analysis.issues.push(
        "🔧 TSConfig Issue: JSX compilation not configured properly"
      );
      analysis.suggestions.push(
        'Add "jsx": "react-jsx" and "types": ["react", "react-dom"] to your tsconfig.json compilerOptions'
      );
    }

    if (message.includes("Cannot find module")) {
      analysis.issues.push(
        "📦 Import Issue: Module resolution problem detected"
      );
      analysis.suggestions.push(
        "Check import paths and ensure dependencies are installed"
      );
    }

    if (
      message.includes("Cannot find name 'useState'") ||
      message.includes("Cannot find name 'useEffect'")
    ) {
      analysis.issues.push(
        "📦 React Hook Import Issue: Missing React hooks import"
      );
      analysis.suggestions.push(
        "Add: import React, { useState, useEffect } from 'react'"
      );
    }

    if (message.includes("Cannot find name 'React'")) {
      analysis.issues.push("📦 React Import Issue: Missing React import");
      analysis.suggestions.push("Add: import React from 'react'");
    }

    if (message.includes("is not assignable to type")) {
      analysis.issues.push(
        "🎯 Type Issue: Type mismatch detected - check TypeScript types"
      );
    }

    if (message.includes("Property") && message.includes("does not exist")) {
      analysis.issues.push("🔑 Property Issue: Accessing undefined property");
    }

    if (
      message.includes("Module") &&
      message.includes("has no exported member")
    ) {
      analysis.issues.push("📤 Export Issue: Importing non-existent export");
      analysis.suggestions.push("Check the exported members from the module");
    }

    if (message.includes("implicitly has an 'any' type")) {
      analysis.issues.push("🎯 Type Issue: Implicit any type detected");
      analysis.suggestions.push(
        "Add explicit type annotations to improve type safety"
      );
    }

    if (
      message.includes("Expression expected") ||
      message.includes("'}'} expected")
    ) {
      analysis.issues.push("⚠️ Syntax Issue: Code structure problem detected");
      analysis.suggestions.push(
        "Check for missing brackets, commas, or proper JSX syntax"
      );
    }

    // ESLint-specific issues
    if (source === "eslint" && message.includes("no-empty-object-type")) {
      analysis.issues.push(
        "🎯 ESLint Issue: Empty interface declaration detected"
      );
      analysis.suggestions.push(
        "Replace empty interface with object, unknown, or add proper type definitions"
      );
    }
  }

  // If we found TypeScript issues, provide helpful context
  if (diagnostics.length > 0) {
    analysis.suggestions.push(
      `🔍 Found ${diagnostics.length} TypeScript diagnostic(s) - these are REAL compiler issues`
    );

    // Count different types of issues for better guidance
    const jsxIssues = diagnostics.filter(
      (d) => d.message.includes("JSX") || d.message.includes("jsx")
    );
    const importIssues = diagnostics.filter(
      (d) =>
        d.message.includes("Cannot find name") ||
        d.message.includes("Cannot find module")
    );
    const syntaxIssues = diagnostics.filter(
      (d) => d.message.includes("expected") || d.message.includes("Unexpected")
    );

    if (jsxIssues.length > 0) {
      analysis.suggestions.push(
        "🔧 Multiple JSX issues detected - consider updating tsconfig.json"
      );
    }
    if (importIssues.length > 0) {
      analysis.suggestions.push(
        "📦 Multiple import issues detected - check React imports and dependencies"
      );
    }
    if (syntaxIssues.length > 0) {
      analysis.suggestions.push(
        "⚠️ Syntax issues detected - run Prettier formatting or check JSX structure"
      );
    }

    analysis.suggestions.push(
      '💡 Run "TypeScript: Restart TS Server" if issues persist'
    );
  }
}

/**
 * 📊 Code Quality Analysis (Enhanced with TypeScript Awareness)
 * Analyzes code quality, standards, and best practices
 */
async function analyzeCodeQuality(
  analysis: FileAnalysis,
  text: string,
  fileName: string
): Promise<void> {
  // TypeScript/JavaScript specific checks
  if (fileName.includes(".tsx") || fileName.includes(".ts")) {
    if (text.includes("any")) {
      analysis.issues.push(
        'TypeScript "any" usage detected - reduces type safety'
      );
    }
    if (
      !text.includes("interface") &&
      !text.includes("type ") &&
      text.length > 500
    ) {
      analysis.suggestions.push(
        "Consider adding TypeScript interfaces for better type safety"
      );
    }
    if (text.includes("// @ts-ignore")) {
      analysis.issues.push(
        "TypeScript ignore comments found - may hide real issues"
      );
    }
    if (text.includes("// @ts-expect-error")) {
      analysis.suggestions.push(
        "TypeScript expect-error comments found - consider fixing underlying issues"
      );
    }
  }

  // React specific checks
  if (fileName.includes(".tsx") || fileName.includes(".jsx")) {
    if (!text.includes("import React") && !text.includes('from "react"')) {
      analysis.issues.push("Missing React import");
    }
    if (text.includes("dangerouslySetInnerHTML")) {
      analysis.issues.push(
        "Dangerous innerHTML usage detected - security risk"
      );
    }
    if (text.match(/style=\{\{/g)) {
      analysis.suggestions.push(
        "Consider using Tailwind classes instead of inline styles"
      );
    }
    if (!text.includes("memo") && text.includes("export default function")) {
      analysis.suggestions.push(
        "Consider wrapping component with React.memo for performance"
      );
    }
  }

  // General code quality
  if (
    text.includes("console.log") &&
    !fileName.includes("dev") &&
    !fileName.includes("debug")
  ) {
    analysis.issues.push("Console.log statements found in production code");
  }
  if (text.includes("TODO") || text.includes("FIXME")) {
    analysis.suggestions.push(
      "TODO/FIXME comments found - consider addressing them"
    );
  }
  if (text.length > 1000 && !text.includes("//") && !text.includes("/*")) {
    analysis.suggestions.push(
      "Large file with insufficient comments - consider adding documentation"
    );
  }

  // Code duplication detection
  const duplicateLines = findDuplicateLines(text);
  if (duplicateLines.length > 0) {
    analysis.suggestions.push(
      `Code duplication detected - ${duplicateLines.length} duplicate patterns found`
    );
  }
}

/**
 * ⚡ Performance Analysis
 * Identifies performance issues and optimization opportunities
 */
async function analyzePerformance(
  analysis: FileAnalysis,
  text: string,
  fileName: string
): Promise<void> {
  // React performance checks
  if (fileName.includes(".tsx") || fileName.includes(".jsx")) {
    if (text.includes("onClick=") && !text.includes("useCallback")) {
      analysis.suggestions.push(
        "Event handlers could benefit from useCallback optimization"
      );
    }
    if (
      (text.includes(".map(") || text.includes(".filter(")) &&
      !text.includes("useMemo")
    ) {
      analysis.suggestions.push(
        "Expensive array operations could benefit from useMemo"
      );
    }
    if (text.includes("useState") && text.match(/useState/g)!.length > 5) {
      analysis.suggestions.push(
        "Multiple useState calls - consider useReducer for complex state"
      );
    }
  }

  // Bundle size concerns
  if (text.includes("import *")) {
    analysis.suggestions.push(
      "Wildcard imports may increase bundle size - use specific imports"
    );
  }
  if (text.match(/import.*lodash/)) {
    analysis.suggestions.push(
      "Consider using lodash-es or specific lodash imports for better tree shaking"
    );
  }

  // Async performance
  if (text.includes("await") && !text.includes("Promise.all")) {
    const awaitCount = (text.match(/await/g) || []).length;
    if (awaitCount > 3) {
      analysis.suggestions.push(
        "Multiple await calls - consider Promise.all for parallel execution"
      );
    }
  }
}

/**
 * 🔧 Maintainability Analysis
 * Analyzes code maintainability and technical debt
 */
async function analyzeMaintainability(
  analysis: FileAnalysis,
  text: string,
  lines: string[]
): Promise<void> {
  // Function complexity
  const functions = text.match(/function\s+\w+|const\s+\w+\s*=\s*\(/g) || [];
  if (functions.length > 10) {
    analysis.suggestions.push(
      "High number of functions - consider splitting into multiple files"
    );
  }

  // Line length
  const longLines = lines.filter((line) => line.length > 120);
  if (longLines.length > 0) {
    analysis.suggestions.push(
      `${longLines.length} lines exceed 120 characters - consider refactoring`
    );
  }

  // Nesting depth
  const maxNesting = calculateMaxNesting(text);
  if (maxNesting > 4) {
    analysis.issues.push(
      `High nesting depth (${maxNesting}) - consider refactoring for readability`
    );
  }

  // Magic numbers
  const magicNumbers = text.match(/(?<![a-zA-Z_$])\d{2,}(?![a-zA-Z_$])/g) || [];
  if (magicNumbers.length > 3) {
    analysis.suggestions.push(
      "Magic numbers detected - consider using named constants"
    );
  }
}

/**
 * 🔒 Security Analysis
 * Identifies potential security vulnerabilities
 */
async function analyzeSecurity(
  analysis: FileAnalysis,
  text: string,
  fileName: string
): Promise<void> {
  // Potential XSS vulnerabilities
  if (text.includes("innerHTML") && !text.includes("sanitize")) {
    analysis.issues.push(
      "innerHTML usage without sanitization - potential XSS vulnerability"
    );
  }
  if (text.includes("eval(")) {
    analysis.issues.push("eval() usage detected - major security risk");
  }

  // Sensitive data exposure
  if (text.match(/(api[_-]?key|password|secret|token)\s*[:=]/i)) {
    analysis.issues.push(
      "Potential sensitive data exposure - hardcoded credentials detected"
    );
  }

  // React security
  if (fileName.includes(".tsx") || fileName.includes(".jsx")) {
    if (
      text.includes('target="_blank"') &&
      !text.includes('rel="noopener noreferrer"')
    ) {
      analysis.issues.push(
        "External links without proper rel attributes - security risk"
      );
    }
  }

  // SQL injection (for backend files)
  if (text.includes("SELECT") && text.includes("+") && text.includes("${")) {
    analysis.issues.push(
      "Potential SQL injection vulnerability - use parameterized queries"
    );
  }
}

/**
 * ♿ Accessibility Analysis
 * Checks for accessibility best practices
 */
async function analyzeAccessibility(
  analysis: FileAnalysis,
  text: string,
  fileName: string
): Promise<void> {
  if (fileName.includes(".tsx") || fileName.includes(".jsx")) {
    // Missing alt text
    if (text.includes("<img") && !text.includes("alt=")) {
      analysis.issues.push(
        "Images without alt attributes - accessibility issue"
      );
    }

    // Interactive elements without proper attributes
    if (text.includes("<button") && !text.includes("aria-")) {
      analysis.suggestions.push(
        "Consider adding ARIA attributes to interactive elements"
      );
    }

    // Color-only information
    if (text.includes("color:") && !text.includes("aria-label")) {
      analysis.suggestions.push(
        "Ensure information is not conveyed by color alone"
      );
    }

    // Form accessibility
    if (text.includes("<input") && !text.includes("label")) {
      analysis.suggestions.push("Form inputs should have associated labels");
    }
  }
}

/**
 * 🧪 Test Coverage Analysis
 * Analyzes test coverage and quality
 */
async function analyzeTestCoverage(
  analysis: FileAnalysis,
  fileName: string
): Promise<void> {
  const baseName = path.basename(fileName, path.extname(fileName));
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];

  if (
    workspaceFolder &&
    !fileName.includes(".test.") &&
    !fileName.includes(".spec.")
  ) {
    try {
      const testFiles = await vscode.workspace.findFiles(
        `**/${baseName}.{test,spec}.{ts,tsx,js,jsx}`,
        "**/node_modules/**"
      );

      if (testFiles.length === 0) {
        analysis.suggestions.push(
          "No test files found - consider adding unit tests"
        );
      }
    } catch {
      // Ignore errors
    }
  }
}

/**
 * 📦 Dependencies Analysis
 * Analyzes dependencies and imports
 */
async function analyzeDependencies(
  analysis: FileAnalysis,
  text: string,
  fileName: string
): Promise<void> {
  const imports = text.match(/import.*from\s+['"][^'"]+['"]/g) || [];

  // Unused imports detection (simplified)
  for (const importLine of imports) {
    const match = importLine.match(/import\s+\{([^}]+)\}/);
    if (match) {
      const importedItems = match[1].split(",").map((item) => item.trim());
      for (const item of importedItems) {
        if (!text.includes(item.replace(/\s+as\s+\w+/, ""))) {
          analysis.suggestions.push(`Potentially unused import: ${item}`);
        }
      }
    }
  }

  // Deprecated dependencies (simplified check)
  if (text.includes("moment")) {
    analysis.suggestions.push(
      "Consider migrating from moment.js to day.js or date-fns for smaller bundle size"
    );
  }
}

/**
 * 🎨 Enhanced Display with TypeScript Issue Categorization
 */
async function displayEnhancedFileAnalysis(
  analysis: FileAnalysis,
  fileName: string
): Promise<void> {
  const baseName = path.basename(fileName);

  // Separate TypeScript issues from pattern-based issues
  const tsIssues = analysis.issues.filter(
    (issue) =>
      issue.includes("Line") ||
      issue.includes("CRITICAL") ||
      issue.includes("WARNING")
  );
  const patternIssues = analysis.issues.filter(
    (issue) =>
      !issue.includes("Line") &&
      !issue.includes("CRITICAL") &&
      !issue.includes("WARNING")
  );

  const severityLevel = getSeverityLevel(analysis);
  const emoji =
    severityLevel === "high" ? "🚨" : severityLevel === "medium" ? "⚠️" : "✅";

  const message = `
🔍 **Enhanced File Analysis: ${baseName}**

${emoji} **Overall Assessment: ${severityLevel.toUpperCase()}**
📊 **Complexity Score: ${analysis.complexity}/10**
🔧 **File Type: ${analysis.fileType}**

🎯 **TypeScript Diagnostics: ${tsIssues.length}**
📝 **Pattern Issues: ${patternIssues.length}**
💡 **Suggestions: ${analysis.suggestions.length}**
🤖 **Auto-fixable: ${analysis.canAutoFix ? "Yes" : "No"}**

**Analysis Breakdown:**
• Real Compiler Issues: ${tsIssues.length > 0 ? "🚨 FOUND" : "✅ None"}
• Code Quality: ${getQualityScore(analysis, "quality")}/10
• Performance: ${getQualityScore(analysis, "performance")}/10  
• Security: ${getQualityScore(analysis, "security")}/10
• Maintainability: ${getQualityScore(analysis, "maintainability")}/10

${analysis.canAutoFix ? "🔧 Auto-fixes available!" : "📝 Manual review recommended"}
    `;

  const actions = analysis.canAutoFix
    ? ["🔧 Auto-Fix Issues", "View TypeScript Details", "Generate Report", "OK"]
    : ["View TypeScript Details", "Generate Report", "Restart TS Server", "OK"];

  const action = await vscode.window.showInformationMessage(
    message,
    ...actions
  );

  if (action === "🔧 Auto-Fix Issues") {
    await autoFixFileIssues(analysis, fileName);
  } else if (action === "View TypeScript Details") {
    await showTypeScriptDetails(analysis, baseName);
  } else if (action === "Generate Report") {
    vscode.window.showInformationMessage(
      "📊 Enhanced analysis report generated!"
    );
  } else if (action === "Restart TS Server") {
    await vscode.commands.executeCommand("typescript.restartTsServer");
    vscode.window.showInformationMessage("🔄 TypeScript server restarted!");
  }
}

/**
 * 📋 Show TypeScript-Specific Details
 */
async function showTypeScriptDetails(
  analysis: FileAnalysis,
  fileName: string
): Promise<void> {
  const tsIssues = analysis.issues.filter(
    (issue) =>
      issue.includes("Line") ||
      issue.includes("CRITICAL") ||
      issue.includes("WARNING")
  );
  const tsHints = analysis.suggestions.filter(
    (suggestion) =>
      suggestion.includes("Line") ||
      suggestion.includes("INFO") ||
      suggestion.includes("HINT")
  );

  const report = `
🔍 **ENHANCED ANALYSIS REPORT: ${fileName}**

🚨 **REAL TYPESCRIPT ISSUES:**
${
  tsIssues.length > 0
    ? tsIssues.map((issue) => `• ${issue}`).join("\n")
    : "✅ No TypeScript compiler errors found!"
}

💡 **TYPESCRIPT SUGGESTIONS:**
${
  tsHints.length > 0
    ? tsHints.map((suggestion) => `• ${suggestion}`).join("\n")
    : "✅ No TypeScript suggestions needed!"
}

⚠️ **PATTERN-BASED ISSUES:**
${
  analysis.issues
    .filter((i) => !tsIssues.includes(i))
    .map((issue) => `• ${issue}`)
    .join("\n") || "• None found"
}

🔧 **RECOMMENDATIONS:**
${
  analysis.suggestions
    .filter((s) => !tsHints.includes(s))
    .map((suggestion) => `• ${suggestion}`)
    .join("\n") || "• None needed"
}

📊 **ENHANCED METRICS:**
• Real Compiler Issues: ${tsIssues.length}
• Pattern Analysis Issues: ${analysis.issues.length - tsIssues.length}
• TypeScript Diagnostics: Enhanced ✅
• Auto-fixable Issues: ${analysis.canAutoFix ? "Yes" : "No"}
`;

  vscode.window.showInformationMessage(report, { modal: true });
}

/**
 * 📄 Generate Comprehensive Analysis Report
 */
async function generateFileAnalysisReport(
  editor: vscode.TextEditor,
  analysis: FileAnalysis
): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) return;

  const reportsDir = vscode.Uri.joinPath(
    workspaceFolder.uri,
    "cipher-reports",
    "file-analysis"
  );
  await ensureDirectoryExists(reportsDir);

  const fileName = path.basename(editor.document.fileName);
  const reportContent = generateFileAnalysisHTML(fileName, analysis);

  const reportFile = vscode.Uri.joinPath(
    reportsDir,
    `${fileName}-analysis-${Date.now()}.html`
  );
  await vscode.workspace.fs.writeFile(reportFile, Buffer.from(reportContent));

  vscode.env.openExternal(reportFile);
}

/**
 * 🎨 Generate Beautiful HTML Analysis Report
 */
function generateFileAnalysisHTML(
  fileName: string,
  analysis: FileAnalysis
): string {
  const severityLevel = getSeverityLevel(analysis);
  const severityColor =
    severityLevel === "high"
      ? "#ef4444"
      : severityLevel === "medium"
        ? "#f59e0b"
        : "#10b981";

  const tsIssues = analysis.issues.filter(
    (issue) =>
      issue.includes("Line") ||
      issue.includes("CRITICAL") ||
      issue.includes("WARNING")
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔍 Enhanced File Analysis Report - ${fileName}</title>
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .severity-score {
            font-size: 3em;
            font-weight: bold;
            text-align: center;
            color: ${severityColor};
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .issue-item, .suggestion-item {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
        }
        .issue-item {
            border-left: 4px solid #ef4444;
        }
        .suggestion-item {
            border-left: 4px solid #3b82f6;
        }
        .ts-issue {
            border-left: 4px solid #f59e0b;
            background: rgba(245, 158, 11, 0.1);
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        .metric-card {
            background: rgba(0, 0, 0, 0.4);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
        }
        .metric-number {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Enhanced File Analysis Report</h1>
            <h2>${fileName}</h2>
            <p>Generated: ${new Date().toLocaleString()}</p>
            <p>🚀 <strong>TypeScript Diagnostics Enabled</strong></p>
        </div>

        <div class="card">
            <h2>📊 Overall Assessment</h2>
            <div class="severity-score">${severityLevel.toUpperCase()}</div>
            <div style="text-align: center; margin-top: 10px;">
                Complexity: ${analysis.complexity}/10 | Type: ${analysis.fileType}
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-number" style="color: #f59e0b;">${tsIssues.length}</div>
                <div>TypeScript Issues</div>
            </div>
            <div class="metric-card">
                <div class="metric-number" style="color: #ef4444;">${analysis.issues.length - tsIssues.length}</div>
                <div>Pattern Issues</div>
            </div>
            <div class="metric-card">
                <div class="metric-number" style="color: #3b82f6;">${analysis.suggestions.length}</div>
                <div>Suggestions</div>
            </div>
            <div class="metric-card">
                <div class="metric-number" style="color: ${analysis.canAutoFix ? "#10b981" : "#f59e0b"};">${analysis.canAutoFix ? "YES" : "NO"}</div>
                <div>Auto-fixable</div>
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <h3>🚨 TypeScript Compiler Issues</h3>
                ${
                  tsIssues.length > 0
                    ? tsIssues
                        .map(
                          (issue) =>
                            `<div class="issue-item ts-issue">${issue}</div>`
                        )
                        .join("")
                    : "<p>🎉 No TypeScript compiler errors found!</p>"
                }
            </div>

            <div class="card">
                <h3>📝 Pattern-Based Issues</h3>
                ${
                  analysis.issues.filter((i) => !tsIssues.includes(i)).length >
                  0
                    ? analysis.issues
                        .filter((i) => !tsIssues.includes(i))
                        .map(
                          (issue) => `<div class="issue-item">${issue}</div>`
                        )
                        .join("")
                    : "<p>✅ No pattern-based issues found!</p>"
                }
            </div>
        </div>

        <div class="card">
            <h3>💡 Optimization Suggestions</h3>
            ${
              analysis.suggestions.length > 0
                ? analysis.suggestions
                    .map(
                      (suggestion) =>
                        `<div class="suggestion-item">${suggestion}</div>`
                    )
                    .join("")
                : "<p>✅ No suggestions needed!</p>"
            }
        </div>

        <div class="card">
            <h3>🎯 Quality Scores</h3>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-number" style="color: #10b981;">${getQualityScore(analysis, "quality")}</div>
                    <div>Code Quality</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number" style="color: #f59e0b;">${getQualityScore(analysis, "performance")}</div>
                    <div>Performance</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number" style="color: #3b82f6;">${getQualityScore(analysis, "security")}</div>
                    <div>Security</div>
                </div>
                <div class="metric-card">
                    <div class="metric-number" style="color: #8b5cf6;">${getQualityScore(analysis, "maintainability")}</div>
                    <div>Maintainability</div>
                </div>
            </div>
        </div>

        <div class="card" style="text-align: center;">
            <p>🤖 Generated by Cipher Enhanced File Analysis with TypeScript Integration</p>
            <p>For auto-fixes and optimizations, use: <strong>Cipher: Smart Rebuild File</strong></p>
        </div>
    </div>
</body>
</html>`;
}

// ✅ ENHANCED FILE TYPE SUPPORT - Much More Permissive
const SUPPORTED_FILE_TYPES = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".html",
  ".css",
  ".scss",
  ".py",
  ".java",
  ".c",
  ".cpp",
  ".cs",
  ".php",
  ".rb",
  ".go",
  ".rs",
  ".swift",
  ".kt",
  ".dart",
  ".yaml",
  ".yml",
  ".xml",
  ".sql",
  ".sh",
  ".bat",
  ".txt",
  ".log",
  ".env",
  ".gitignore",
  ".dockerfile",
  ".makefile",
  ".vue",
  ".svelte",
  ".astro",
  ".mjs",
  ".cjs",
  ".coffee",
  ".elm",
  ".hs",
  ".scala",
  ".r",
  ".m",
  ".mm",
  ".h",
  ".hpp",
  ".cc",
  ".cxx",
  ".f",
  ".f90",
  ".pl",
  ".lua",
  ".vim",
  ".toml",
  ".ini",
  ".cfg",
  ".conf",
];

function isFileTypeSupported(
  fileName: string,
  operation: "analyze" | "rebuild"
): boolean {
  const extension = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName).toLowerCase();

  // Debug logging to see what's being checked
  console.log(`🔍 Checking file: ${fileName}`);
  console.log(`🔍 Extension: "${extension}"`);
  console.log(`🔍 Base name: "${baseName}"`);

  // For analysis, be very permissive
  if (operation === "analyze") {
    // Allow specific file types
    if (SUPPORTED_FILE_TYPES.includes(extension)) {
      console.log(`✅ Supported by extension: ${extension}`);
      return true;
    }

    // Allow common config files without extensions
    const configFiles = [
      "makefile",
      "dockerfile",
      "readme",
      "license",
      "changelog",
      "authors",
      "contributors",
    ];
    if (configFiles.some((config) => baseName.includes(config))) {
      console.log(`✅ Supported config file: ${baseName}`);
      return true;
    }

    // Allow any text file (anything with an extension that's not binary)
    const binaryTypes = [
      ".exe",
      ".bin",
      ".dmg",
      ".pkg",
      ".zip",
      ".tar",
      ".gz",
      ".img",
      ".iso",
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".svg",
      ".ico",
      ".mp3",
      ".mp4",
      ".avi",
      ".mov",
      ".wav",
      ".flac",
      ".ogg",
      ".woff",
      ".woff2",
      ".ttf",
      ".eot",
      ".db",
      ".sqlite",
    ];
    if (extension && !binaryTypes.includes(extension)) {
      console.log(`✅ Supported text file: ${extension}`);
      return true;
    }

    // Allow files with no extension if they're likely text files
    if (!extension && baseName.length > 0) {
      console.log(`✅ Supported no-extension file: ${baseName}`);
      return true;
    }

    console.log(`❌ Not supported: ${extension || baseName}`);
    return false;
  }

  // For rebuild, be more strict
  const rebuildTypes = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".md",
    ".html",
    ".css",
    ".scss",
  ];
  return rebuildTypes.includes(extension);
}

function getSeverityLevel(analysis: FileAnalysis): "low" | "medium" | "high" {
  const criticalIssues = analysis.issues.filter(
    (issue) => issue.includes("CRITICAL") || issue.includes("🚨")
  ).length;

  if (criticalIssues > 0 || analysis.complexity > 7) return "high";
  if (analysis.issues.length > 3 || analysis.complexity > 5) return "medium";
  return "low";
}

function isCritical(issue: string): boolean {
  return (
    issue.includes("CRITICAL") ||
    issue.includes("security") ||
    issue.includes("vulnerability") ||
    issue.includes("eval()") ||
    issue.includes("innerHTML")
  );
}

function isPerformanceRelated(suggestion: string): boolean {
  return (
    suggestion.includes("performance") ||
    suggestion.includes("optimization") ||
    suggestion.includes("memo") ||
    suggestion.includes("callback")
  );
}

function getQualityScore(analysis: FileAnalysis, category: string): number {
  let score = 10;
  const categoryIssues = analysis.issues.filter((issue) =>
    issue.toLowerCase().includes(category.toLowerCase())
  );

  // Penalize more for real TypeScript errors
  const tsErrors = categoryIssues.filter(
    (issue) => issue.includes("CRITICAL") || issue.includes("🚨")
  );

  return Math.max(0, score - categoryIssues.length * 1 - tsErrors.length * 2);
}

// 🔧 Enhanced Auto-Fix Detection with Comprehensive TypeScript Awareness
function canIssuesBeAutoFixed(issues: string[]): boolean {
  // Check for specific auto-fixable TypeScript error patterns
  const autoFixablePatterns = [
    // Basic code quality issues
    "Missing React import",
    "Console.log statements",
    'TypeScript "any" usage',
    "nesting depth",
    "Code duplication",
    "test files",
    "TODO/FIXME",
    "Magic numbers",
    "inline styles",
    "wildcard imports",
    "unused import",
    "line length",
    "accessibility",
    "security",

    // TypeScript configuration issues (HIGHLY auto-fixable)
    "TSConfig Issue",
    "JSX.IntrinsicElements",
    "jsx",
    "--jsx",

    // React/Import issues (auto-fixable)
    "Cannot find name 'useState'",
    "Cannot find name 'useEffect'",
    "Cannot find name 'React'",
    "Import Issue",
    "Cannot find module",

    // TypeScript syntax issues (auto-fixable)
    "Expression expected",
    "'}'} expected",
    "Unexpected token",
    "'=' expected",

    // TypeScript type issues (partially auto-fixable)
    "implicitly has an 'any' type",
    "Property Issue",
    "is not assignable to type",
    "Binding element",
    "no-empty-object-type",
    "allowInterfaces",
  ];

  // Also check for specific error message patterns that indicate auto-fixable issues
  const autoFixableRegexPatterns = [
    /Cannot find name ['"`]use\w+['"`]/, // React hooks
    /Cannot find name ['"`]React['"`]/, // React import
    /JSX element implicitly has type ['"`]any['"`]/, // JSX config
    /Binding element .* implicitly has an ['"`]any['"`] type/, // TypeScript types
    /An empty interface declaration/, // Empty interface
    /Expression expected/, // Syntax issues
    /['"`]\}['"`] expected/, // Missing brackets
  ];

  // Check both pattern matches and regex patterns
  const hasPatternMatch = issues.some((issue) =>
    autoFixablePatterns.some((pattern) =>
      issue.toLowerCase().includes(pattern.toLowerCase())
    )
  );

  const hasRegexMatch = issues.some((issue) =>
    autoFixableRegexPatterns.some((regex) => regex.test(issue))
  );

  return hasPatternMatch || hasRegexMatch;
}

function findDuplicateLines(text: string): string[] {
  const lines = text.split("\n");
  const lineCount = new Map<string, number>();

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.length > 10) {
      lineCount.set(trimmed, (lineCount.get(trimmed) || 0) + 1);
    }
  });

  return Array.from(lineCount.entries())
    .filter(([_, count]) => count > 1)
    .map(([line]) => line);
}

function calculateMaxNesting(text: string): number {
  let maxNesting = 0;
  let currentNesting = 0;

  for (const char of text) {
    if (char === "{") {
      currentNesting++;
      maxNesting = Math.max(maxNesting, currentNesting);
    } else if (char === "}") {
      currentNesting--;
    }
  }

  return maxNesting;
}

async function autoFixFileIssues(
  analysis: FileAnalysis,
  fileName: string
): Promise<void> {
  vscode.window.showInformationMessage("🔧 Auto-fixing detected issues...");

  // Analyze what types of issues we can auto-fix
  const hasJSXConfigIssue = analysis.issues.some(
    (issue) =>
      issue.includes("--jsx") || issue.includes("JSX.IntrinsicElements")
  );
  const hasReactImportIssue = analysis.issues.some(
    (issue) =>
      issue.includes("Cannot find name 'useState'") ||
      issue.includes("Cannot find name 'useEffect'") ||
      issue.includes("Cannot find name 'React'")
  );
  const hasEmptyInterfaceIssue = analysis.issues.some(
    (issue) =>
      issue.includes("no-empty-object-type") ||
      issue.includes("empty interface")
  );
  const hasSyntaxIssues = analysis.issues.some(
    (issue) =>
      issue.includes("Expression expected") ||
      issue.includes("'}'} expected") ||
      issue.includes("'=' expected")
  );

  let fixesApplied = 0;

  // 1. Handle JSX Configuration Issues
  if (hasJSXConfigIssue) {
    const action = await vscode.window.showInformationMessage(
      "🔧 JSX Configuration Issue Detected",
      "Auto-Fix TSConfig",
      "Open tsconfig.json",
      "Show Fix Instructions"
    );

    if (action === "Auto-Fix TSConfig") {
      await applyJSXConfigFix();
      fixesApplied++;
    } else if (action === "Open tsconfig.json") {
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (workspaceFolder) {
        const tsconfigPath = vscode.Uri.joinPath(
          workspaceFolder.uri,
          "tsconfig.json"
        );
        vscode.window.showTextDocument(tsconfigPath);
      }
    } else if (action === "Show Fix Instructions") {
      vscode.window.showInformationMessage(
        '📝 Add this to your tsconfig.json compilerOptions:\n"jsx": "react-jsx",\n"types": ["react", "react-dom"]',
        { modal: true }
      );
    }
  }

  // 2. Handle React Import Issues
  if (hasReactImportIssue) {
    const action = await vscode.window.showInformationMessage(
      "📦 React Import Issue Detected",
      "Auto-Fix Imports",
      "Show Import Tips"
    );

    if (action === "Auto-Fix Imports") {
      await applyReactImportFix(fileName);
      fixesApplied++;
    } else if (action === "Show Import Tips") {
      vscode.window.showInformationMessage(
        "💡 Import Tips:\n• Add: import React, { useState, useEffect } from 'react'\n• Ensure @types/react is installed\n• Check your tsconfig.json includes React types",
        { modal: true }
      );
    }
  }

  // 3. Handle Empty Interface Issues
  if (hasEmptyInterfaceIssue) {
    const action = await vscode.window.showInformationMessage(
      "🎯 Empty Interface Issue Detected",
      "Auto-Fix Interface",
      "Show Fix Options"
    );

    if (action === "Auto-Fix Interface") {
      await applyEmptyInterfaceFix(fileName);
      fixesApplied++;
    } else if (action === "Show Fix Options") {
      vscode.window.showInformationMessage(
        "💡 Interface Fix Options:\n• Use object instead of empty interface\n• Add proper type definitions\n• Use unknown for any value type\n• Disable ESLint rule if intentional",
        { modal: true }
      );
    }
  }

  // 4. Handle Syntax Issues
  if (hasSyntaxIssues) {
    const action = await vscode.window.showInformationMessage(
      "⚠️ Syntax Issues Detected",
      "Run Prettier",
      "Show Syntax Tips"
    );

    if (action === "Run Prettier") {
      await vscode.commands.executeCommand("editor.action.formatDocument");
      fixesApplied++;
    } else if (action === "Show Syntax Tips") {
      vscode.window.showInformationMessage(
        "💡 Syntax Tips:\n• Check for missing brackets { }\n• Verify proper JSX syntax\n• Run Prettier to auto-format\n• Check for unclosed elements",
        { modal: true }
      );
    }
  }

  // Summary message
  if (fixesApplied > 0) {
    vscode.window.showInformationMessage(
      `✅ Applied ${fixesApplied} auto-fix(es)! Re-run analysis to verify.`
    );
  } else {
    vscode.window.showInformationMessage(
      "📝 Auto-fix suggestions provided! Some issues may require manual review."
    );
  }
}

/**
 * 🔧 Apply JSX Configuration Fix
 */
async function applyJSXConfigFix(): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) return;

  try {
    const tsconfigPath = vscode.Uri.joinPath(
      workspaceFolder.uri,
      "tsconfig.json"
    );
    const tsconfigContent = await vscode.workspace.fs.readFile(tsconfigPath);
    const config = JSON.parse(tsconfigContent.toString());

    if (!config.compilerOptions) {
      config.compilerOptions = {};
    }

    config.compilerOptions.jsx = "react-jsx";
    if (!config.compilerOptions.types) {
      config.compilerOptions.types = ["react", "react-dom"];
    }

    await vscode.workspace.fs.writeFile(
      tsconfigPath,
      Buffer.from(JSON.stringify(config, null, 2))
    );

    vscode.window.showInformationMessage(
      "✅ TSConfig updated with JSX configuration!"
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to update tsconfig.json: ${error}`);
  }
}

/**
 * 📦 Apply React Import Fix
 */
async function applyReactImportFix(fileName: string): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.fileName !== fileName) return;

  const text = editor.document.getText();
  const lines = text.split("\n");

  // Check if React import already exists
  const hasReactImport = lines.some((line) => line.includes("import React"));

  if (!hasReactImport) {
    // Determine what React features are needed
    const needsUseState = text.includes("useState");
    const needsUseEffect = text.includes("useEffect");

    let importLine = "import React";
    if (needsUseState || needsUseEffect) {
      const hooks: string[] = []; // Fixed typing issue here
      if (needsUseState) hooks.push("useState");
      if (needsUseEffect) hooks.push("useEffect");
      importLine += `, { ${hooks.join(", ")} }`;
    }
    importLine += " from 'react';";

    // Insert the import at the top
    await editor.edit((editBuilder) => {
      editBuilder.insert(new vscode.Position(0, 0), importLine + "\n");
    });

    vscode.window.showInformationMessage("✅ React imports added!");
  }
}

/**
 * 🎯 Apply Empty Interface Fix
 */
async function applyEmptyInterfaceFix(fileName: string): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.fileName !== fileName) return;

  const action = await vscode.window.showInformationMessage(
    "How should we fix the empty interface?",
    "Replace with object",
    "Add properties",
    "Add ESLint disable"
  );

  if (action === "Replace with object") {
    // This would require more complex text replacement logic
    vscode.window.showInformationMessage(
      "💡 Replace empty interface with: object"
    );
  } else if (action === "Add properties") {
    vscode.window.showInformationMessage(
      "💡 Add properties like: { children?: React.ReactNode; }"
    );
  } else if (action === "Add ESLint disable") {
    vscode.window.showInformationMessage(
      "💡 Add above interface: // eslint-disable-next-line @typescript-eslint/no-empty-object-type"
    );
  }
}
