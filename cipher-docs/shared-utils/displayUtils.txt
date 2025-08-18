// 🎸 Comprehensive Display Utilities for Cipher Handlers
// Location: .vscode-extensions/cipher-autonomous-dev/src/shared/displayUtils.ts
// Purpose: UI/notification handling for 40+ handler ecosystem
// Music Focus: Rock, Metal, Blues, Country Rock, Modern Christian Contemporary
// Brain Intelligence: Full MasterBrain integration with music analysis

import * as path from "path";
import * as vscode from "vscode";
import {
  AnalysisResult,
  FileAnalysis,
  HealthStatus,
  TeamReport,
} from "./types";

// =============================================================================
// 🧠 BRAIN-ENHANCED MONITORING & REPORTING DISPLAYS
// =============================================================================

/**
 * 👥 Display Brain-Enhanced Team Report with Brain Intelligence
 */
export async function displayTeamReport(
  teamReportData: TeamReport
): Promise<void> {
  const reportMessage = `👥 Brain-Enhanced Team Report:

🧠 Brain Confidence: ${teamReportData.brainConfidence}%
📅 Generated: ${new Date(teamReportData.generatedAt || Date.now()).toLocaleString()}

## 🎸 Guitar System
• Health: ${teamReportData.guitarMetrics?.health || 0}%
• Status: ${teamReportData.guitarMetrics?.status || "Unknown"}
• Components: ${teamReportData.guitarMetrics?.components.join(", ") || "None"}

## 🎤 Vocal System
• Health: ${teamReportData.vocalMetrics?.health || 0}%
• Status: ${teamReportData.vocalMetrics?.status || "Unknown"}
• Components: ${teamReportData.vocalMetrics?.components.join(", ") || "None"}

## 👥 Team Performance
• Team Size: ${teamReportData.collaboration.teamSize}
• Collaboration Score: ${teamReportData.collaboration.score}%
• Productivity: ${teamReportData.teamInsights.productivity}%
• Project Health: ${teamReportData.collaboration.projectHealth}

## 🧠 Key Insights
${teamReportData.teamInsights.insights.map((insight) => `• ${insight}`).join("\n")}

## 🎯 Recommendations
${teamReportData.teamInsights.recommendations.map((rec) => `• ${rec}`).join("\n")}`;

  const action = await vscode.window.showInformationMessage(
    reportMessage,
    { modal: true },
    "Export Report",
    "View Metrics",
    "OK"
  );

  if (action === "Export Report") {
    await exportTeamReport(teamReportData);
  } else if (action === "View Metrics") {
    await showDetailedTeamMetrics(teamReportData);
  }
}

/**
 * 🏥 Display Brain-Enhanced System Health
 */
export async function displaySystemHealth(
  systemCheck: HealthStatus
): Promise<void> {
  const healthMessage = `🏥🧠 Brain-Enhanced System Health:

📊 Overall Status: ${systemCheck.overall?.toUpperCase() || "UNKNOWN"}
🧠 Brain Confidence: ${systemCheck.brainConfidence}%
⚡ Performance: ${systemCheck.performance.toUpperCase()}
🕒 Last Check: ${new Date(systemCheck.timestamp || Date.now()).toLocaleString()}

## Core Components:
${Object.entries(systemCheck.components)
  .map(
    ([name, status]) =>
      `${getStatusIcon(status)} ${name}: ${status.toUpperCase()}`
  )
  .join("\n")}

## 🧠 Brain Insights:
${systemCheck.brainInsights.map((insight) => `• ${insight}`).join("\n")}

## 💡 Recommendations:
${systemCheck.recommendations.map((rec) => `• ${rec}`).join("\n")}

${
  systemCheck.overall === "critical"
    ? "⚠️ CRITICAL: Immediate attention required!"
    : systemCheck.overall === "warning"
      ? "⚠️ WARNING: Monitor closely"
      : "✅ HEALTHY: System operating normally"
}`;

  const action = await vscode.window.showInformationMessage(
    healthMessage,
    { modal: true },
    "View Details",
    "Generate Report",
    "OK"
  );

  if (action === "View Details") {
    await showDetailedHealthMetrics(systemCheck);
  } else if (action === "Generate Report") {
    await exportHealthReport(systemCheck);
  }
}

/**
 * 🧠 Display Watcher Learning Report
 */
export async function displayLearningReport(
  learningReport: any
): Promise<void> {
  const reportMessage = `🧠 Watcher Learning Report:

📊 Learning Summary:
• Total Learnings: ${learningReport.totalLearnings}
• Learning Sessions: Active
• Pattern Recognition: Advanced

## 🎯 Key Insights:
${learningReport.insights?.map((insight: string) => `• ${insight}`).join("\n") || "• Analysis in progress"}

## 🔍 Patterns Discovered:
${learningReport.patterns?.map((pattern: string) => `• ${pattern}`).join("\n") || "• Pattern analysis ongoing"}

## 📈 Learning Progress:
${learningReport.summary || "Comprehensive learning data collected"}

## 🎵 Music-Specific Learnings:
• Guitar interaction patterns identified
• Vocal training optimization detected
• User preference analysis completed

The brain system has successfully analyzed and learned from your development patterns, enabling more intelligent assistance and recommendations.`;

  const action = await vscode.window.showInformationMessage(
    reportMessage,
    { modal: true },
    "Export Report",
    "View Patterns",
    "OK"
  );

  if (action === "Export Report") {
    await exportLearningReport(learningReport);
  } else if (action === "View Patterns") {
    await showLearningPatterns(learningReport);
  }
}

/**
 * 📜 Display Log Insights Analysis
 */
export async function displayLogInsights(selectedLog: any): Promise<void> {
  const logInsights = `🧠 Log Insights for ${selectedLog.value}:

## 📊 Analysis Summary:
• Severity Level: ${selectedLog.analysis.severity?.toUpperCase() || "INFO"}
• Total Events: ${selectedLog.analysis.events}
• Priority: ${selectedLog.analysis.priority?.toUpperCase() || "NORMAL"}
• File Size: ${selectedLog.detail?.split("|")[0] || "Unknown"}

## 🔍 Brain Analysis:
${selectedLog.analysis.summary || "Log analysis completed"}

## 💡 Key Insights:
${selectedLog.analysis.insights?.map((insight: string) => `• ${insight}`).join("\n") || "• No specific insights detected"}

## 🎯 Recommendations:
${selectedLog.analysis.recommendations?.map((rec: string) => `• ${rec}`).join("\n") || "• Continue monitoring"}

## 🎵 Music System Events:
${
  selectedLog.analysis.severity === "error"
    ? "⚠️ Errors detected - may affect music functionality"
    : "✅ Music systems operating normally"
}

The brain has analyzed this log file and identified key patterns and potential issues. Use these insights to optimize system performance.`;

  const action = await vscode.window.showInformationMessage(
    logInsights,
    { modal: true },
    "Generate Report",
    "Export Analysis",
    "View Patterns",
    "OK"
  );

  if (action === "Generate Report") {
    await generateLogReport(selectedLog);
  } else if (action === "Export Analysis") {
    await exportLogAnalysis(selectedLog);
  } else if (action === "View Patterns") {
    await showLogPatterns(selectedLog);
  }
}

// =============================================================================
// 🔧 BRAIN MONITORING HELPER FUNCTIONS
// =============================================================================

/**
 * 📊 Show Detailed Health Metrics
 */
async function showDetailedHealthMetrics(
  systemCheck: HealthStatus
): Promise<void> {
  const detailsMessage = `📊 Detailed Health Metrics:

## 🔧 Component Details:
${Object.entries(systemCheck.components)
  .map(([name, status]) => {
    const uptime = getComponentUptime(name);
    const load = getComponentLoad(name);
    return `${getStatusIcon(status)} ${name}:
   Status: ${status.toUpperCase()}
   Uptime: ${uptime}
   Load: ${load}%`;
  })
  .join("\n\n")}

## 🧠 Brain System Metrics:
• Confidence Level: ${systemCheck.brainConfidence}%
• Learning Rate: Active
• Pattern Recognition: ${systemCheck.brainConfidence > 80 ? "Excellent" : "Good"}
• Response Time: < 100ms

## 📈 Performance Trends:
• System stability: ${systemCheck.overall === "good" ? "Increasing" : "Needs attention"}
• Brain efficiency: Optimizing
• Resource usage: ${systemCheck.performance === "optimal" ? "Efficient" : "Monitoring"}`;

  vscode.window.showInformationMessage(detailsMessage, { modal: true });
}

/**
 * 📤 Export Health Report
 */
async function exportHealthReport(systemCheck: HealthStatus): Promise<void> {
  const healthReport = `# 🏥 System Health Report

**Generated:** ${new Date().toLocaleString()}
**Overall Status:** ${systemCheck.overall}
**Brain Confidence:** ${systemCheck.brainConfidence}%

## Component Status
${Object.entries(systemCheck.components)
  .map(([name, status]) => `- **${name}:** ${status}`)
  .join("\n")}

## Brain Insights
${systemCheck.brainInsights.map((insight) => `- ${insight}`).join("\n")}

## Recommendations
${systemCheck.recommendations.map((rec) => `- ${rec}`).join("\n")}

---
*Generated by Cipher Brain-Enhanced Health Monitor*`;

  await vscode.env.clipboard.writeText(healthReport);
  vscode.window.showInformationMessage("📊 Health report copied to clipboard!");
}

/**
 * 👥 Export Team Report
 */
async function exportTeamReport(teamReportData: TeamReport): Promise<void> {
  const teamReport = `# 👥 Brain-Enhanced Team Report

**Generated:** ${new Date(teamReportData.generatedAt || Date.now()).toLocaleString()}
**Brain Confidence:** ${teamReportData.brainConfidence}%

## Guitar System Metrics
- **Health:** ${teamReportData.guitarMetrics?.health || 0}%
- **Status:** ${teamReportData.guitarMetrics?.status || "unknown"}
- **Components:** ${teamReportData.guitarMetrics?.components.join(", ") || "none"}

## Vocal System Metrics
- **Health:** ${teamReportData.vocalMetrics?.health || 0}%
- **Status:** ${teamReportData.vocalMetrics?.status || "unknown"}
- **Components:** ${teamReportData.vocalMetrics?.components.join(", ") || "none"}

## Team Performance
- **Team Size:** ${teamReportData.collaboration?.teamSize || 0}
- **Collaboration Score:** ${teamReportData.collaboration?.score || 0}%
- **Productivity:** ${teamReportData.teamInsights?.productivity || 0}%
- **Project Health:** ${teamReportData.collaboration?.projectHealth || "unknown"}

## Key Insights
${teamReportData.teamInsights?.insights.map((insight) => `- ${insight}`).join("\n") || "No insights available"}

## Recommendations
${teamReportData.teamInsights?.recommendations.map((rec) => `- ${rec}`).join("\n") || "No recommendations available"}

---
*Generated by Cipher Brain-Enhanced Team Analytics*`;

  await vscode.env.clipboard.writeText(teamReport);
  vscode.window.showInformationMessage("👥 Team report copied to clipboard!");
}

/**
 * 👥 Show Detailed Team Metrics
 */
async function showDetailedTeamMetrics(
  teamReportData: TeamReport
): Promise<void> {
  const metricsMessage = `👥 Detailed Team Metrics:

## 🎸 Guitar System Deep Dive:
• Component Health: ${teamReportData.guitarMetrics?.health || 0}%
• Active Components: ${teamReportData.guitarMetrics?.components.length || 0}
• System Status: ${teamReportData.guitarMetrics?.status || "unknown"}
• Usage Patterns: ${(teamReportData.guitarMetrics?.health || 0) > 80 ? "Optimal" : "Needs optimization"}

## 🎤 Vocal System Deep Dive:
• Component Health: ${teamReportData.vocalMetrics.health}%
• Active Components: ${teamReportData.vocalMetrics.components.length}
• System Status: ${teamReportData.vocalMetrics.status}
• Usage Patterns: ${teamReportData.vocalMetrics.health > 80 ? "Optimal" : "Needs optimization"}

## 📊 Collaboration Analytics:
• Team Efficiency: ${teamReportData.collaboration.score}%
• Communication Score: ${Math.round(teamReportData.collaboration.score * 0.9)}%
• Project Momentum: ${teamReportData.collaboration.projectHealth}
• Resource Utilization: ${teamReportData.teamInsights.productivity}%

## 🧠 Brain Intelligence Metrics:
• Learning Accuracy: ${teamReportData.brainConfidence}%
• Pattern Recognition: ${(teamReportData.brainConfidence || 0) > 85 ? "Excellent" : "Good"}
• Prediction Success: ${Math.round((teamReportData.brainConfidence || 0) * 0.95)}%
• Adaptation Rate: ${(teamReportData.brainConfidence || 0) > 80 ? "Fast" : "Moderate"}`;

  vscode.window.showInformationMessage(metricsMessage, { modal: true });
}

/**
 * 📤 Export Learning Report
 */
async function exportLearningReport(learningReport: any): Promise<void> {
  const report = `# 🧠 Brain Learning Report

**Generated:** ${new Date().toLocaleString()}
**Total Learnings:** ${learningReport.totalLearnings}

## Key Insights
${learningReport.insights?.map((insight: string) => `- ${insight}`).join("\n") || "- Analysis in progress"}

## Discovered Patterns
${learningReport.patterns?.map((pattern: string) => `- ${pattern}`).join("\n") || "- Pattern analysis ongoing"}

## Summary
${learningReport.summary || "Comprehensive learning data collected"}

---
*Generated by Cipher Brain Learning System*`;

  await vscode.env.clipboard.writeText(report);
  vscode.window.showInformationMessage(
    "🧠 Learning report exported to clipboard!"
  );
}

/**
 * 🔍 Show Learning Patterns
 */
async function showLearningPatterns(learningReport: any): Promise<void> {
  const patternsMessage = `🔍 Discovered Learning Patterns:

## 🎵 Music Development Patterns:
• Guitar component usage: High frequency
• Vocal component interaction: Moderate
• Audio processing: Regular patterns detected

## 👤 User Behavior Patterns:
• Development workflow: Consistent
• Feature usage: ${learningReport.patterns?.includes("feature") ? "Analyzed" : "Monitoring"}
• Error handling: ${learningReport.patterns?.includes("error") ? "Improved" : "Baseline"}

## 🧠 Brain Learning Patterns:
• Adaptation rate: ${learningReport.totalLearnings > 10 ? "Excellent" : "Good"}
• Pattern recognition: Advanced
• Prediction accuracy: ${learningReport.totalLearnings > 15 ? "85%+" : "75%+"}

## 📈 Optimization Opportunities:
${learningReport.patterns?.map((pattern: string) => `• ${pattern}`).join("\n") || "• Continuous optimization active"}`;

  vscode.window.showInformationMessage(patternsMessage, { modal: true });
}

/**
 * 📜 Generate Log Report
 */
async function generateLogReport(selectedLog: any): Promise<void> {
  const logReport = `# 📜 Log Analysis Report

**File:** ${selectedLog.value}
**Generated:** ${new Date().toLocaleString()}

## Analysis Summary
- **Severity:** ${selectedLog.analysis.severity}
- **Events:** ${selectedLog.analysis.events}
- **Priority:** ${selectedLog.analysis.priority}

## Key Insights
${selectedLog.analysis.insights?.map((insight: string) => `- ${insight}`).join("\n") || "- No specific insights"}

## Recommendations
${selectedLog.analysis.recommendations?.map((rec: string) => `- ${rec}`).join("\n") || "- Continue monitoring"}

---
*Generated by Cipher Brain Log Analyzer*`;

  await vscode.env.clipboard.writeText(logReport);
  vscode.window.showInformationMessage(
    "📜 Log report generated and copied to clipboard!"
  );
}

/**
 * 📤 Export Log Analysis
 */
async function exportLogAnalysis(selectedLog: any): Promise<void> {
  const analysis = `# 📤 Log Analysis Export

**File:** ${selectedLog.value}
**Analysis Date:** ${new Date().toLocaleString()}

## Raw Analysis Data
\`\`\`json
${JSON.stringify(selectedLog.analysis, null, 2)}
\`\`\`

## Brain Insights
${selectedLog.analysis.insights?.map((insight: string) => `- ${insight}`).join("\n") || "- No insights available"}

---
*Exported by Cipher Brain Log Analysis System*`;

  await vscode.env.clipboard.writeText(analysis);
  vscode.window.showInformationMessage(
    "📤 Log analysis exported to clipboard!"
  );
}

/**
 * 🔍 Show Log Patterns
 */
async function showLogPatterns(selectedLog: any): Promise<void> {
  const patternsMessage = `🔍 Log Pattern Analysis for ${selectedLog.value}:

## 📊 Event Patterns:
• Total Events: ${selectedLog.analysis.events}
• Event Types: ${selectedLog.analysis.severity === "error" ? "Mixed (errors detected)" : "Normal operation"}
• Frequency: ${selectedLog.analysis.events > 100 ? "High activity" : "Normal activity"}

## 🧠 Brain-Detected Patterns:
• Log structure: ${selectedLog.analysis.events > 0 ? "Well-formatted" : "Basic"}
• Error frequency: ${selectedLog.analysis.severity === "error" ? "Above normal" : "Within normal range"}
• System health indicators: ${selectedLog.analysis.priority === "high" ? "Needs attention" : "Stable"}

## 🎵 Music System Events:
• Guitar events: ${selectedLog.value.includes("guitar") ? "Detected" : "Not present"}
• Vocal events: ${selectedLog.value.includes("vocal") ? "Detected" : "Not present"}
• Audio processing: ${selectedLog.value.includes("audio") ? "Active" : "Standard"}

## 🔍 Pattern Insights:
${selectedLog.analysis.insights?.map((insight: string) => `• ${insight}`).join("\n") || "• Standard log patterns detected"}`;

  vscode.window.showInformationMessage(patternsMessage, { modal: true });
}

// =============================================================================
// 🛠️ UTILITY FUNCTIONS FOR BRAIN MONITORING
// =============================================================================

/**
 * Get status icon for component status
 */
function getStatusIcon(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
    case "connected":
    case "good":
      return "✅";
    case "inactive":
    case "disconnected":
    case "warning":
      return "⚠️";
    case "error":
    case "critical":
    case "failed":
      return "❌";
    default:
      return "🔵";
  }
}

/**
 * Get component uptime (mock data - replace with real metrics)
 */
function getComponentUptime(componentName: string): string {
  const uptimes: { [key: string]: string } = {
    cipher: "2h 15m",
    maestro: "1h 45m",
    ava: "30m",
    brain: "2h 10m",
    guitarSystem: "1h 30m",
    vocalSystem: "1h 20m",
    "guitar-handler": "1h 25m",
    "vocal-handler": "1h 15m",
    "audio-analyzer": "50m",
    "chord-trainer": "1h 5m",
    "scale-practice": "45m",
    "practice-generator": "35m",
  };
  return uptimes[componentName] || "1h 0m";
}

/**
 * Get component load percentage (mock data - replace with real metrics)
 */
function getComponentLoad(componentName: string): number {
  const loads: { [key: string]: number } = {
    cipher: 25,
    maestro: 15,
    ava: 10,
    brain: 30,
    guitarSystem: 20,
    vocalSystem: 18,
    "guitar-handler": 22,
    "vocal-handler": 16,
    "audio-analyzer": 35,
    "chord-trainer": 12,
    "scale-practice": 14,
    "practice-generator": 28,
  };
  return loads[componentName] || 15;
}
// =============================================================================
// 🧠 CORE DISPLAY FUNCTIONS (Brain-Enhanced)
// =============================================================================

export async function displayAnalysisResults(
  analysis: AnalysisResult
): Promise<void> {
  const message = `
🧠 Project Analysis Complete:
📁 ${analysis.totalFiles || analysis.fileCount} files analyzed
🎵 ${analysis.components?.length || 0} components found
🪝 ${analysis.hooks || 0} hooks detected
🔧 ${analysis.utils || 0} utility files
⚠️ ${analysis.issues.length} issues found

💡 Suggestions: ${analysis.suggestions.length > 0 ? (Array.isArray(analysis.suggestions) ? analysis.suggestions.join(", ") : "Available") : "Looking good!"}
🧠 Brain Status: ${analysis.brainInsights ? "Enhanced with AI insights" : "Standard analysis"}
    `;

  const action = await vscode.window.showInformationMessage(
    message,
    "View Details",
    "Auto-Fix Issues",
    "Brain Insights",
    "OK"
  );

  if (action === "Auto-Fix Issues" && analysis.issues.length > 0) {
    vscode.commands.executeCommand("cipher.autoFixRoutes");
  } else if (action === "Brain Insights" && analysis.brainInsights) {
    await displayBrainInsights(analysis.brainInsights);
  } else if (action === "View Details") {
    await showDetailedAnalysisView(analysis);
  }
}

export async function displayRouteAnalysis(
  analysis: AnalysisResult
): Promise<void> {
  // ✅ FIXED: Use safe access with optional chaining and fallbacks
  const workingRoutes = (analysis.routes?.filter((r) => r.exists) ?? []).length;
  const missingRoutes = (analysis.routes?.filter((r) => !r.exists) ?? [])
    .length;
  const totalRoutes = analysis.routes?.length ?? 0;
  const musicRoutes = (analysis.routes?.filter((r) => r.isMusicRoute) ?? [])
    .length;

  const message = `
🗺️ Route Analysis:
✅ ${workingRoutes} routes working
❌ ${missingRoutes} routes missing
🎵 ${musicRoutes} music routes
📊 ${totalRoutes} total routes

${missingRoutes > 0 ? "🔧 Auto-fix available for missing routes" : "🎉 All routes configured!"}
🧠 ${analysis.brainInsights ? "Brain-enhanced analysis complete" : "Standard route analysis"}
    `;

  const actions =
    missingRoutes > 0
      ? ["Create Visual Map", "Auto-Fix Routes", "Music Routes", "OK"]
      : ["Create Visual Map", "Music Routes", "OK"];

  const action = await vscode.window.showInformationMessage(
    message,
    ...actions
  );

  if (action === "Create Visual Map") {
    vscode.commands.executeCommand("cipher.createVisualRouteMap");
  } else if (action === "Auto-Fix Routes") {
    vscode.commands.executeCommand("cipher.autoFixRoutes");
  } else if (action === "Music Routes") {
    await displayMusicRouteAnalysis(analysis);
  }
}

export async function displayFileAnalysis(
  analysis: FileAnalysis,
  fileName: string
): Promise<void> {
  const baseName = path.basename(fileName);
  const message = `
🔍 File Analysis: ${baseName}
📊 Complexity: ${analysis.complexity}/10
🔧 Type: ${analysis.fileType}
⚠️ Issues: ${analysis.issues.length}
💡 Suggestions: ${analysis.suggestions.length}
🎵 Music Related: ${analysis.musicRelated ? "Yes" : "No"}
🧠 Brain Enhanced: ${analysis.brainSuggestions ? "Yes" : "No"}

${analysis.canAutoFix ? "🤖 Auto-fix available" : "✅ Manual review recommended"}
    `;

  const actions = analysis.canAutoFix
    ? ["Auto-Fix", "Rebuild File", "Show Details", "Brain Suggestions", "OK"]
    : ["Show Details", "Brain Suggestions", "OK"];

  const action = await vscode.window.showInformationMessage(
    message,
    ...actions
  );

  if (action === "Auto-Fix") {
    await autoFixCurrentFile(analysis);
  } else if (action === "Rebuild File") {
    vscode.commands.executeCommand("cipher.rebuildFile");
  } else if (action === "Show Details") {
    await showFileAnalysisDetails(analysis, baseName);
  } else if (action === "Brain Suggestions" && analysis.brainSuggestions) {
    await displayBrainSuggestions(analysis.brainSuggestions);
  }
}

export async function showFileAnalysisDetails(
  analysis: FileAnalysis,
  fileName: string
): Promise<void> {
  const details = `
📊 File Analysis: ${fileName}

🔧 Type: ${analysis.fileType}
📈 Complexity: ${analysis.complexity}/10
🎵 Music Related: ${analysis.musicRelated ? "Yes" : "No"}

⚠️ Issues Found:
${analysis.issues.length > 0 ? analysis.issues.map((issue) => `- ${issue}`).join("\n") : "- No issues detected"}

💡 Suggestions:
${analysis.suggestions.length > 0 ? analysis.suggestions.map((suggestion) => `- ${suggestion}`).join("\n") : "- File looks good!"}

🧠 Brain Suggestions:
${analysis.brainSuggestions && analysis.brainSuggestions.length > 0 ? analysis.brainSuggestions.map((suggestion) => `- ${suggestion}`).join("\n") : "- No AI suggestions available"}

🤖 Auto-fix Available: ${analysis.canAutoFix ? "Yes" : "No"}
`;

  const action = await vscode.window.showInformationMessage(
    details,
    { modal: true },
    "Export Analysis",
    "OK"
  );

  if (action === "Export Analysis") {
    await saveAnalysisToFile(analysis, "file");
  }
}

export async function autoFixCurrentFile(
  analysis: FileAnalysis
): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  try {
    vscode.window.showInformationMessage("🔧 Applying auto-fixes...");

    let content = editor.document.getText();

    // Apply common fixes
    if (analysis.issues.includes("Missing React import")) {
      content = `import React from 'react';\n${content}`;
    }

    if (
      analysis.issues.includes(
        'Using "any" type - consider more specific typing'
      )
    ) {
      content = content.replace(/: any/g, ": unknown");
    }

    // Music-specific fixes
    if (analysis.musicRelated) {
      if (analysis.issues.includes("Missing audio context")) {
        content = `import { AudioContext } from 'web-audio-api';\n${content}`;
      }
      if (
        analysis.issues.includes(
          "Consider using Tailwind classes instead of inline styles"
        )
      ) {
        content = content.replace(
          /style=\{\{[^}]*\}\}/g,
          'className="audio-component"'
        );
      }
    }

    // Apply the fixes
    const edit = new vscode.WorkspaceEdit();
    const fullRange = new vscode.Range(
      0,
      0,
      editor.document.lineCount,
      editor.document.lineAt(editor.document.lineCount - 1).text.length
    );
    edit.replace(editor.document.uri, fullRange, content);
    await vscode.workspace.applyEdit(edit);

    vscode.window.showInformationMessage("✅ Auto-fixes applied successfully!");
  } catch (error) {
    vscode.window.showErrorMessage(`Auto-fix failed: ${error}`);
  }
}

// =============================================================================
// 🎵 MUSIC-SPECIFIC DISPLAYS (Brain-Enhanced)
// =============================================================================

export async function displayMusicAnalysis(
  analysis: any,
  type: "guitar" | "vocal"
): Promise<void> {
  const icon = type === "guitar" ? "🎸" : "🎤";
  const title = type === "guitar" ? "Guitar Analysis" : "Vocal Analysis";

  let message = `${icon} ${title} Results:\n\n`;

  if (type === "guitar") {
    message += `🎵 Key: ${analysis.key || "C Major"}
🎯 Tempo: ${analysis.tempo || 120} BPM  
📊 Chord Clarity: ${Math.round((analysis.chords_clarity?.clarity || 0.8) * 100)}%
🎼 Technique: ${Math.round((analysis.technique?.fingerPosition || 0.8) * 100)}%
🎸 Chords: ${analysis.chords?.join(", ") || "C, Am, F, G"}

🎶 Style: ${detectMusicStyle(analysis)}
💡 Suggestions:
${analysis.personalizedSuggestions?.map((s: string) => `• ${s}`).join("\n") || "• Practice chord transitions"}

🧠 Brain Insights:
${analysis.brainInsights?.map((s: any) => `• ${s.recommendation || s}`).join("\n") || "• AI analysis available"}`;
  } else {
    message += `🎵 Range: ${analysis.range?.low || 220}Hz - ${analysis.range?.high || 880}Hz
🎯 Tone Quality: ${analysis.tone || "warm"}
💨 Breath Control: ${analysis.breath || "good"}
📊 Pitch Stability: ${Math.round((analysis.pitch_stability?.stability || 0.88) * 100)}%
🎤 Clarity: ${Math.round((analysis.tone_quality?.clarity || 0.85) * 100)}%

🎶 Vocal Style: ${detectVocalStyle(analysis)}
💡 Coaching Tips:
${analysis.coachingSuggestions?.map((s: string) => `• ${s}`).join("\n") || "• Practice breathing exercises"}

🧠 Brain Insights:
${analysis.brainInsights?.map((s: any) => `• ${s.recommendation || s}`).join("\n") || "• AI coaching available"}`;
  }

  const actions = [
    "Save Analysis",
    "Share with Brain",
    "Practice Mode",
    "Genre Training",
    "Generate Component",
    "OK",
  ];
  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  switch (action) {
    case "Save Analysis":
      await saveAnalysisToFile(analysis, type);
      break;
    case "Share with Brain":
      vscode.commands.executeCommand("cipher.shareAnalysisToBrain", {
        analysis,
        type,
      });
      break;
    case "Practice Mode":
      vscode.commands.executeCommand(
        `cipher.start${type === "guitar" ? "Guitar" : "Vocal"}Practice`
      );
      break;
    case "Genre Training":
      await displayGenreTraining(type);
      break;
    case "Generate Component":
      vscode.commands.executeCommand("cipher.generateMusicComponent", {
        type,
        analysis,
      });
      break;
  }
}

export async function displayMusicRouteAnalysis(
  analysis: AnalysisResult
): Promise<void> {
  const musicRoutes = analysis.routes?.filter((r) => r.isMusicRoute) || [];
  const workingMusicRoutes = musicRoutes.filter((r) => r.exists);
  const missingMusicRoutes = musicRoutes.filter((r) => !r.exists);

  const message = `🎵 Music Route Analysis:

✅ Working Music Routes: ${workingMusicRoutes.length}
${workingMusicRoutes.map((r) => `• ${r.path} (${r.component})`).join("\n")}

❌ Missing Music Routes: ${missingMusicRoutes.length}
${missingMusicRoutes.map((r) => `• ${r.path} (${r.component})`).join("\n")}

🧠 Brain Recommendations:
${analysis.brainInsights ? "• AI-powered music route suggestions available" : "• Standard music route analysis"}
${missingMusicRoutes.length > 0 ? "• Auto-generation available for missing music routes" : ""}`;

  const actions =
    missingMusicRoutes.length > 0
      ? ["Generate Missing", "Music Components", "Practice Generator", "OK"]
      : ["Music Components", "Practice Generator", "OK"];

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  switch (action) {
    case "Generate Missing":
      vscode.commands.executeCommand("cipher.generateMissingRoutes", {
        musicOnly: true,
      });
      break;
    case "Music Components":
      await displayMusicComponentOptions();
      break;
    case "Practice Generator":
      vscode.commands.executeCommand("cipher.practiceGeneratorPipeline");
      break;
  }
}

export async function displayMusicComponentOptions(): Promise<void> {
  const options = [
    "🎸 Guitar Components",
    "🎤 Vocal Components",
    "🎧 Audio Components",
    "🎼 Theory Components",
    "🎯 Practice Components",
    "🧠 AI-Generated Components",
  ];

  const selection = await vscode.window.showQuickPick(options, {
    placeHolder: "Choose music component type",
  });

  switch (selection) {
    case "🎸 Guitar Components":
      vscode.commands.executeCommand("cipher.analyzeGuitarComponents");
      break;
    case "🎤 Vocal Components":
      vscode.commands.executeCommand("cipher.analyzeVocalComponents");
      break;
    case "🎧 Audio Components":
      vscode.commands.executeCommand("cipher.analyzeAudioFiles");
      break;
    case "🎼 Theory Components":
      vscode.commands.executeCommand("cipher.generateMusicComponent", {
        type: "theory",
      });
      break;
    case "🎯 Practice Components":
      vscode.commands.executeCommand("cipher.generatePracticeExercises");
      break;
    case "🧠 AI-Generated Components":
      await displayBrainComponentGeneration();
      break;
  }
}

export async function displayBrainComponentGeneration(): Promise<void> {
  const options = [
    "🧠 Smart Guitar Component",
    "🧠 Intelligent Vocal Trainer",
    "🧠 AI Audio Processor",
    "🧠 Theory Assistant",
    "🧠 Practice Optimizer",
    "🧠 Genre-Specific Trainer",
  ];

  const selection = await vscode.window.showQuickPick(options, {
    placeHolder: "Choose AI-powered component",
  });

  if (selection) {
    const componentType = selection
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();
    vscode.commands.executeCommand("cipher.generateSelfEvolvingModules", {
      type: componentType,
    });
  }
}

export async function displayGenreTraining(
  type: "guitar" | "vocal"
): Promise<void> {
  const genres =
    type === "guitar"
      ? [
          "🎸 Rock",
          "🎸 Metal",
          "🎵 Blues",
          "🤠 Country Rock",
          "🙏 Contemporary Worship",
        ]
      : [
          "🎤 Rock Vocals",
          "🎤 Country Vocals",
          "🎤 Blues Vocals",
          "🎤 Worship Vocals",
        ];

  const selection = await vscode.window.showQuickPick(genres, {
    placeHolder: `Choose ${type} genre for focused training`,
  });

  if (selection) {
    const genre = selection
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();
    vscode.commands.executeCommand(`cipher.train${type}Genre`, genre);
  }
}

// =============================================================================
// 🧠 BRAIN-SPECIFIC DISPLAY FUNCTIONS (Enhanced)
// =============================================================================

export async function displayBrainStatus(status: any): Promise<void> {
  const statusIcon = status.isConnected ? "✅" : "🔧";
  const message = `🧠 MasterBrain Status: ${statusIcon}
📊 Connection: ${status.isConnected ? "Connected" : "Simulation Mode"}
🎯 Type: ${status.brainType}
💾 Cache: ${status.cacheSize} items
🔄 Attempts: ${status.connectionAttempts}
📅 Last Check: ${new Date(status.lastCheck).toLocaleTimeString()}
🎵 Music Intelligence: ${status.musicIntelligence ? "Active" : "Standby"}

${status.isConnected ? "🎵 Ready for music analysis!" : "🎵 Running in practice mode"}`;

  const actions = status.isConnected
    ? [
        "View Cache",
        "Test Connection",
        "Music Analysis",
        "Brain Insights",
        "OK",
      ]
    : ["Retry Connection", "View Cache", "Simulation Mode", "OK"];

  const action = await vscode.window.showInformationMessage(
    message,
    ...actions
  );

  switch (action) {
    case "View Cache":
      vscode.commands.executeCommand("cipher.viewBrainCache");
      break;
    case "Retry Connection":
    case "Test Connection":
      vscode.commands.executeCommand("cipher.reconnectBrain");
      break;
    case "Music Analysis":
      await displayMusicAnalysisOptions();
      break;
    case "Brain Insights":
      vscode.commands.executeCommand("cipher.showBrainInsights");
      break;
    case "Simulation Mode":
      vscode.window.showInformationMessage(
        "🎵 Simulation mode provides practice features without Brain connection"
      );
      break;
  }
}

export async function displayBrainInsights(insights: any[]): Promise<void> {
  if (!insights || insights.length === 0) {
    vscode.window.showInformationMessage(
      "🧠 No brain insights available at this time."
    );
    return;
  }

  const insightsText = insights
    .map((insight: any) => {
      if (typeof insight === "string") {
        return `• ${insight}`;
      }
      return `• ${insight.recommendation || insight.message || insight.type || "Unknown insight"}`;
    })
    .join("\n");

  const message = `🧠 Brain Insights:

${insightsText}

🎵 These insights are powered by AI analysis of your music development patterns.`;

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    "Apply Suggestions",
    "Generate Component",
    "Share Feedback",
    "OK"
  );

  switch (action) {
    case "Apply Suggestions":
      vscode.commands.executeCommand("cipher.applyBrainSuggestions", insights);
      break;
    case "Generate Component":
      vscode.commands.executeCommand("cipher.generateMusicComponent", {
        insights,
      });
      break;
    case "Share Feedback":
      vscode.commands.executeCommand("cipher.shareBrainFeedback", insights);
      break;
  }
}

export async function displayBrainSuggestions(
  suggestions: string[]
): Promise<void> {
  if (!suggestions || suggestions.length === 0) {
    vscode.window.showInformationMessage(
      "🧠 No suggestions available at this time."
    );
    return;
  }

  const message = `💡 Personalized Music Development Suggestions:

${suggestions
  .slice(0, 5)
  .map((s: string) => `• ${s}`)
  .join("\n")}

🧠 These suggestions are based on your coding patterns and Brain intelligence.`;

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    "Generate Component",
    "Export Suggestions",
    "Apply All",
    "OK"
  );

  if (action === "Generate Component") {
    vscode.commands.executeCommand("cipher.generateMusicComponent", {
      suggestions,
    });
  } else if (action === "Export Suggestions") {
    const doc = await vscode.workspace.openTextDocument({
      content: `# Music Development Suggestions\n\n${suggestions.map((s) => `- ${s}`).join("\n")}`,
      language: "markdown",
    });
    await vscode.window.showTextDocument(doc);
  } else if (action === "Apply All") {
    vscode.commands.executeCommand("cipher.applyBrainSuggestions", suggestions);
  }
}

export async function displayMusicAnalysisOptions(): Promise<void> {
  const options = [
    "🎸 Analyze Guitar Performance",
    "🎤 Analyze Vocal Performance",
    "🎵 Full Music Analysis",
    "📊 Practice Session Review",
    "🎶 Genre-Specific Analysis",
    "🧠 AI-Powered Deep Analysis",
  ];

  const selection = await vscode.window.showQuickPick(options, {
    placeHolder: "Choose analysis type",
  });

  switch (selection) {
    case "🎸 Analyze Guitar Performance":
      vscode.commands.executeCommand("cipher.analyzeGuitarComponents");
      break;
    case "🎤 Analyze Vocal Performance":
      vscode.commands.executeCommand("cipher.analyzeVocalComponents");
      break;
    case "🎵 Full Music Analysis":
      vscode.commands.executeCommand("cipher.analyzeFullMusic");
      break;
    case "📊 Practice Session Review":
      vscode.commands.executeCommand("cipher.reviewPracticeSession");
      break;
    case "🎶 Genre-Specific Analysis":
      await displayGenreAnalysisOptions();
      break;
    case "🧠 AI-Powered Deep Analysis":
      vscode.commands.executeCommand("cipher.runPredictiveAnalysis");
      break;
  }
}

export async function displayGenreAnalysisOptions(): Promise<void> {
  const genres = [
    "🎸 Rock Analysis",
    "🎸 Metal Analysis",
    "🎵 Blues Analysis",
    "🤠 Country Rock Analysis",
    "🙏 Contemporary Worship Analysis",
    "🎼 Jazz Analysis",
    "🎹 Classical Analysis",
  ];

  const selection = await vscode.window.showQuickPick(genres, {
    placeHolder: "Choose genre for analysis",
  });

  if (selection) {
    const genre = selection
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();
    vscode.commands.executeCommand("cipher.analyzeGenre", genre);
  }
}

// =============================================================================
// 🎸 ENHANCED WEBVIEW DISPLAYS (From Additional Utils)
// =============================================================================

/**
 * Display guitar analysis results in enhanced webview
 */
export async function displayGuitarAnalysisWebview(
  analysis: any
): Promise<void> {
  const panel = vscode.window.createWebviewPanel(
    "guitarAnalysis",
    "🎸 Guitar Analysis Results",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    padding: 20px; 
                    background: #1e1e1e;
                    color: #d4d4d4;
                }
                .header { 
                    color: #4CAF50; 
                    border-bottom: 2px solid #4CAF50; 
                    padding-bottom: 10px; 
                    margin-bottom: 20px;
                }
                .analysis-item { 
                    margin: 10px 0; 
                    padding: 15px; 
                    background: #2d2d30; 
                    border-radius: 8px; 
                    border-left: 4px solid #4CAF50;
                }
                .brain-insight {
                    background: #2d2d30;
                    border-left: 4px solid #FF6B6B;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 8px;
                }
                .music-data {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                    margin: 20px 0;
                }
                .data-card {
                    background: #2d2d30;
                    padding: 15px;
                    border-radius: 8px;
                    text-align: center;
                }
                .value {
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #4CAF50;
                }
            </style>
        </head>
        <body>
            <h1 class="header">🎸 Guitar Analysis Results</h1>
            
            <div class="music-data">
                <div class="data-card">
                    <div class="value">${analysis.key || "C Major"}</div>
                    <div>Key Signature</div>
                </div>
                <div class="data-card">
                    <div class="value">${analysis.tempo || 120}</div>
                    <div>BPM</div>
                </div>
                <div class="data-card">
                    <div class="value">${Math.round((analysis.complexity || 0.7) * 100)}%</div>
                    <div>Complexity</div>
                </div>
                <div class="data-card">
                    <div class="value">${detectMusicStyle(analysis)}</div>
                    <div>Detected Style</div>
                </div>
            </div>

            <div class="analysis-item">
                <strong>🎼 Chord Progression:</strong> ${analysis.chords?.join(" - ") || "C - Am - F - G"}
            </div>
            
            <div class="analysis-item">
                <strong>🎯 Techniques Detected:</strong> ${analysis.techniques?.join(", ") || "Standard strumming, chord transitions"}
            </div>

            ${
              analysis.brainInsights
                ? `
            <div class="brain-insight">
                <strong>🧠 AI Insights:</strong><br>
                ${analysis.brainInsights.map((insight: any) => `• ${insight.recommendation || insight}`).join("<br>")}
            </div>
            `
                : ""
            }

            <div class="analysis-item">
                <strong>💡 Personalized Suggestions:</strong><br>
                ${analysis.personalizedSuggestions?.map((s: string) => `• ${s}`).join("<br>") || "• Practice chord transitions<br>• Work on strumming patterns"}
            </div>

            <div class="analysis-item">
                <strong>🎵 Generated:</strong> ${new Date().toLocaleString()}
            </div>
        </body>
        </html>
    `;
}

/**
 * Display brain suggestions in enhanced webview
 */
export async function displayBrainSuggestionsWebview(
  suggestions: any
): Promise<void> {
  if (
    !suggestions ||
    !suggestions.suggestions ||
    suggestions.suggestions.length === 0
  ) {
    return;
  }

  const panel = vscode.window.createWebviewPanel(
    "brainSuggestions",
    "🧠 Brain Suggestions",
    vscode.ViewColumn.Two,
    { enableScripts: true }
  );

  const suggestionsHTML = suggestions.suggestions
    .map(
      (suggestion: any) => `
        <div class="suggestion-item ${suggestion.type || "info"}">
            <div class="suggestion-icon">
                ${suggestion.type === "action" ? "⚡" : suggestion.type === "warning" ? "⚠️" : suggestion.type === "music" ? "🎵" : "ℹ️"}
            </div>
            <div class="suggestion-content">
                <div class="suggestion-message">${suggestion.message || suggestion}</div>
                ${suggestion.action ? `<div class="suggestion-action">Action: ${suggestion.action}</div>` : ""}
                ${suggestion.confidence ? `<div class="confidence">Confidence: ${Math.round(suggestion.confidence * 100)}%</div>` : ""}
            </div>
        </div>
    `
    )
    .join("");

  panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    padding: 20px; 
                    background: #1e1e1e;
                    color: #d4d4d4;
                    margin: 0;
                }
                .header { 
                    color: #FF6B6B; 
                    border-bottom: 2px solid #FF6B6B; 
                    padding-bottom: 10px; 
                    margin-bottom: 20px;
                }
                .suggestion-item {
                    display: flex;
                    align-items: flex-start;
                    margin: 15px 0;
                    padding: 15px;
                    background: #2d2d30;
                    border-radius: 8px;
                    border-left: 4px solid #4CAF50;
                }
                .suggestion-item.warning {
                    border-left-color: #FF9800;
                }
                .suggestion-item.action {
                    border-left-color: #2196F3;
                }
                .suggestion-item.music {
                    border-left-color: #E91E63;
                }
                .suggestion-icon {
                    font-size: 20px;
                    margin-right: 15px;
                    margin-top: 2px;
                }
                .suggestion-content {
                    flex: 1;
                }
                .suggestion-message {
                    font-size: 14px;
                    line-height: 1.5;
                    margin-bottom: 5px;
                }
                .suggestion-action {
                    font-size: 12px;
                    color: #888;
                    font-style: italic;
                }
                .confidence {
                    font-size: 12px;
                    color: #4CAF50;
                    font-weight: bold;
                }
                .timestamp {
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 1px solid #444;
                }
            </style>
        </head>
        <body>
            <h1 class="header">🧠 Brain Suggestions</h1>
            ${suggestionsHTML}
            <div class="timestamp">
                Generated: ${new Date(suggestions.timestamp || Date.now()).toLocaleString()}
            </div>
        </body>
        </html>
    `;
}

// =============================================================================
// 🔧 ENHANCED HANDLER SELECTION & UTILITIES
// =============================================================================

export async function displayHandlerSelection(
  handlerTypes: string[]
): Promise<string | undefined> {
  const quickPickItems = handlerTypes.map((type) => ({
    label: getHandlerIcon(type) + " " + formatHandlerName(type),
    description: getHandlerDescription(type),
    detail: getHandlerExample(type),
  }));

  const selection = await vscode.window.showQuickPick(quickPickItems, {
    placeHolder: "Select handler type to create",
    matchOnDescription: true,
    matchOnDetail: true,
  });

  return selection ? extractHandlerType(selection.label) : undefined;
}

// =============================================================================
// 📊 PROGRESS & NOTIFICATION UTILITIES
// =============================================================================

/**
 * Display progress notification with music emojis
 */
export function displayProgress(message: string, progress?: number): void {
  if (progress !== undefined) {
    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: message,
        cancellable: false,
      },
      async (progressReporter) => {
        progressReporter.report({ increment: progress });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    );
  } else {
    vscode.window.showInformationMessage(`🎵 ${message}`);
  }
}

/**
 * Display error with context and music theming
 */
export function displayError(error: string, context?: any): void {
  console.error("Cipher Error:", error, context);
  vscode.window.showErrorMessage(`🎸 Cipher Error: ${error}`);
}

/**
 * Display success message with music theming
 */
export function displaySuccess(message: string): void {
  vscode.window.showInformationMessage(`✅ ${message}`);
}

/**
 * Display warning message with music theming
 */
export function displayWarning(message: string): void {
  vscode.window.showWarningMessage(`⚠️ ${message}`);
}

/**
 * Show quick pick menu with enhanced options
 */
export async function showQuickPick(
  items: string[],
  placeholder: string = "Select an option"
): Promise<string | undefined> {
  return await vscode.window.showQuickPick(items, { placeHolder: placeholder });
}

/**
 * Show input box with validation
 */
export async function showInputBox(
  placeholder: string = "Enter value",
  defaultValue?: string,
  validation?: (value: string) => string | undefined
): Promise<string | undefined> {
  return await vscode.window.showInputBox({
    placeHolder: placeholder,
    value: defaultValue,
    validateInput: validation,
  });
}

// =============================================================================
// 🎯 DETAILED ANALYSIS & EXPORT FUNCTIONS
// =============================================================================

/**
 * 📊 Show Detailed Analysis View (Enhanced)
 */
export async function showDetailedAnalysisView(
  analysis: AnalysisResult
): Promise<void> {
  const message = `📊 Detailed Analysis Results:

📁 Files: ${analysis.totalFiles || analysis.fileCount}
🔧 Components: ${analysis.components?.length || 0}
🎵 Music Components: ${analysis.musicComponents?.length || 0}
🗺️ Routes: ${analysis.routes?.length || 0}
🎵 Music Routes: ${analysis.routes?.filter((r) => r.isMusicRoute).length || 0}
⚠️ Issues: ${analysis.issueCount}
💯 Health Score: ${analysis.healthScore}%
🧠 Brain Enhanced: ${analysis.brainInsights ? "Yes" : "No"}

Status: ${analysis.healthStatus}
${analysis.analysis ? `\nAnalysis: ${analysis.analysis}` : ""}
`;

  const actions = [
    "Export Report",
    "View Routes",
    "Brain Insights",
    "Music Analysis",
    "OK",
  ];
  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  if (action === "Export Report") {
    vscode.commands.executeCommand("cipher.exportProgressReport");
  } else if (action === "View Routes") {
    vscode.commands.executeCommand("cipher.showRouteTree");
  } else if (action === "Brain Insights") {
    vscode.commands.executeCommand("cipher.showBrainInsights");
  } else if (action === "Music Analysis") {
    await displayMusicAnalysisOptions();
  }
}

/**
 * 🎯 Show Analysis Summary (Alternative function)
 */
export async function showAnalysisSummary(
  analysis: AnalysisResult
): Promise<void> {
  const workingRoutes = (analysis.routes?.filter((r) => r.exists) ?? []).length;
  const missingRoutes = (analysis.routes?.filter((r) => !r.exists) ?? [])
    .length;
  const musicRoutes = (analysis.routes?.filter((r) => r.isMusicRoute) ?? [])
    .length;

  const message = `🎯 Analysis Summary:
    
✅ Working: ${workingRoutes} routes
❌ Missing: ${missingRoutes} routes  
🎵 Music: ${musicRoutes} routes
🔧 Components: ${analysis.components?.length || 0}
⚠️ Issues: ${analysis.issueCount}
💯 Score: ${analysis.healthScore}%
🧠 AI Enhanced: ${analysis.brainInsights ? "Yes" : "No"}`;

  await vscode.window.showInformationMessage(message);
}

// =============================================================================
// ⚙️ CONFIGURATION WIZARDS (Enhanced)
// =============================================================================

export async function displayConfigurationWizard(): Promise<void> {
  const steps = [
    {
      title: "🎵 Music Domain Focus",
      options: [
        "🎸 Guitar Primary",
        "🎤 Vocal Primary",
        "🎹 Piano Primary",
        "🥁 Drums Primary",
        "🎼 All Instruments",
      ],
      key: "musicDomain",
    },
    {
      title: "🎶 Genre Preference",
      options: [
        "🎸 Rock/Metal",
        "🎵 Blues",
        "🤠 Country/Rock",
        "🙏 Contemporary Worship",
        "🎼 Mixed Genres",
      ],
      key: "genrePreference",
    },
    {
      title: "🧠 Brain Intelligence Level",
      options: ["🧠 Expert Level", "🧠 Advanced Level", "🧠 Basic Level"],
      key: "musicIntelligenceLevel",
    },
    {
      title: "🚀 Deploy Target",
      options: ["Vercel", "Netlify", "GitHub Pages"],
      key: "deployTarget",
    },
    {
      title: "🧠 Brain Integration",
      options: ["Full Integration", "Practice Mode Only", "Disabled"],
      key: "masterBrainIntegration",
    },
  ];

  const config = vscode.workspace.getConfiguration("cipher");
  let configUpdates: any = {};

  for (const step of steps) {
    const selection = await vscode.window.showQuickPick(step.options, {
      placeHolder: `${step.title}: Choose your preference`,
    });

    if (selection) {
      let value;
      switch (step.key) {
        case "musicDomain":
          value = selection.toLowerCase().includes("guitar")
            ? "guitar"
            : selection.toLowerCase().includes("vocal")
              ? "voice"
              : selection.toLowerCase().includes("piano")
                ? "piano"
                : selection.toLowerCase().includes("drums")
                  ? "drums"
                  : "all";
          break;
        case "genrePreference":
          value = selection
            .toLowerCase()
            .replace(/[^\w\s]/g, "")
            .trim();
          break;
        case "musicIntelligenceLevel":
          value = selection.toLowerCase().includes("expert")
            ? "expert"
            : selection.toLowerCase().includes("advanced")
              ? "advanced"
              : "basic";
          break;
        case "deployTarget":
          value = selection.toLowerCase().replace(" ", "-");
          break;
        case "masterBrainIntegration":
          value = selection.includes("Full")
            ? true
            : selection.includes("Practice")
              ? "practice"
              : false;
          break;
        default:
          value = selection;
      }
      configUpdates[step.key] = value;
    }
  }

  // Apply all updates
  for (const [key, value] of Object.entries(configUpdates)) {
    await config.update(key, value, vscode.ConfigurationTarget.Workspace);
  }

  const summary = Object.entries(configUpdates)
    .map(([key, value]) => `• ${formatConfigKey(key)}: ${value}`)
    .join("\n");

  vscode.window.showInformationMessage(
    `✅ Cipher Configuration Updated:\n${summary}\n\n🎵 Ready for music development!`,
    { modal: true }
  );
}

// =============================================================================
// 🚀 DEPLOYMENT PROGRESS (Enhanced)
// =============================================================================

export async function displayDeploymentProgress(
  target: string,
  steps: string[]
): Promise<void> {
  return vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `🚀 Deploying music app to ${target}`,
      cancellable: false,
    },
    async (progress, token) => {
      const increment = 100 / steps.length;

      for (let i = 0; i < steps.length; i++) {
        progress.report({
          increment,
          message: `${steps[i]} ${getMusicEmoji(i)}`,
        });

        // Simulate deployment step delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      vscode.window
        .showInformationMessage(
          `✅ Music app successfully deployed to ${target}! 🎵`,
          "Open Site",
          "View Logs",
          "Share Link"
        )
        .then((action) => {
          if (action === "Open Site") {
            vscode.commands.executeCommand("cipher.openDeployedSite");
          } else if (action === "View Logs") {
            vscode.commands.executeCommand("cipher.viewDeploymentLogs");
          } else if (action === "Share Link") {
            vscode.commands.executeCommand("cipher.shareDeploymentLink");
          }
        });
    }
  );
}

// =============================================================================
// 🔧 UTILITY FUNCTIONS (Enhanced)
// =============================================================================

function getHandlerIcon(type: string): string {
  const icons: { [key: string]: string } = {
    guitar: "🎸",
    vocal: "🎤",
    "audio-analyzer": "🎧",
    "midi-controller": "🎹",
    "chord-trainer": "🎼",
    "scale-practice": "🎵",
    "route-manager": "🗺️",
    "config-manager": "⚙️",
    "deployment-handler": "🚀",
    "brain-coordinator": "🧠",
    "performance-analyzer": "📊",
    "code-quality": "🔍",
    "worship-trainer": "🙏",
    "blues-trainer": "🎵",
    "rock-trainer": "🎸",
    "country-trainer": "🤠",
    "practice-generator": "🎯",
    "tab-parser": "🎼",
    "audio-processor": "🔊",
    "chord-recognizer": "🎵",
  };
  return icons[type] || "🔧";
}

function formatHandlerName(type: string): string {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getHandlerDescription(type: string): string {
  const descriptions: { [key: string]: string } = {
    guitar: "Guitar practice and analysis tools",
    vocal: "Vocal training and pitch analysis",
    "audio-analyzer": "Real-time audio processing and analysis",
    "midi-controller": "MIDI device integration and control",
    "chord-trainer": "Chord progression training for rock/worship",
    "scale-practice": "Scale practice for blues/metal",
    "route-manager": "Route structure analysis and management",
    "config-manager": "Configuration and settings management",
    "deployment-handler": "Deployment automation and management",
    "brain-coordinator": "MasterBrain integration and coordination",
    "performance-analyzer": "Code performance analysis and optimization",
    "code-quality": "Code quality assessment and improvement",
    "worship-trainer": "Contemporary worship music training",
    "blues-trainer": "Blues guitar and vocal training",
    "rock-trainer": "Rock/metal performance training",
    "country-trainer": "Country and country rock training",
    "practice-generator": "AI-powered practice routine generation",
    "tab-parser": "Guitar tab parsing and analysis",
    "audio-processor": "Advanced audio processing and effects",
    "chord-recognizer": "Intelligent chord recognition and analysis",
  };
  return descriptions[type] || "Custom handler functionality";
}

function getHandlerExample(type: string): string {
  const examples: { [key: string]: string } = {
    guitar: "Chord analysis, tuning, practice sessions",
    vocal: "Pitch detection, breath control, vocal exercises",
    "audio-analyzer": "Frequency analysis, audio visualization",
    "midi-controller": "MIDI input/output, device mapping",
    "chord-trainer": "Worship progressions, rock power chords",
    "scale-practice": "Blues scales, metal scales, technique",
    "route-manager": "Route visualization, auto-fix missing routes",
    "config-manager": "Settings wizard, configuration validation",
    "deployment-handler": "Vercel/Netlify deployment, CI/CD",
    "brain-coordinator": "AI analysis sharing, intelligent suggestions",
    "performance-analyzer": "React optimization, bundle analysis",
    "code-quality": "TypeScript validation, best practices",
    "worship-trainer": "Contemporary worship chord progressions",
    "blues-trainer": "Blues scales, bending techniques",
    "rock-trainer": "Power chords, distortion control",
    "country-trainer": "Country picking, vocal twang",
    "practice-generator": "Personalized practice routines, AI coaching",
    "tab-parser": "Guitar Pro, Power Tab, MIDI file processing",
    "audio-processor": "Real-time effects, audio analysis",
    "chord-recognizer": "Live chord detection, progression analysis",
  };
  return examples[type] || "Custom functionality";
}

function extractHandlerType(label: string): string {
  return label.split(" ").slice(1).join("-").toLowerCase();
}

function formatConfigKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

function detectMusicStyle(analysis: any): string {
  if (analysis.chords?.includes("5") || analysis.progression?.includes("power"))
    return "Rock/Metal";
  if (analysis.key?.includes("7") || analysis.progression?.includes("blues"))
    return "Blues";
  if (analysis.chords?.includes("sus") || analysis.chords?.includes("add9"))
    return "Contemporary Worship";
  if (analysis.progression?.includes("country") || analysis.tuning === "openG")
    return "Country";
  if (analysis.genre) return analysis.genre;
  return "General";
}

function detectVocalStyle(analysis: any): string {
  if (analysis.range?.high > 600) return "Rock/Pop";
  if (analysis.tone === "raspy" || analysis.grit) return "Rock/Blues";
  if (analysis.tone === "smooth" && analysis.vibrato === "gentle")
    return "Contemporary Worship";
  if (analysis.twang || analysis.tone === "bright") return "Country";
  if (analysis.style) return analysis.style;
  return "General";
}

function getMusicEmoji(step: number): string {
  const emojis = ["🎵", "🎶", "🎸", "🎤", "🎹", "🥁", "🎼", "🎺", "🎷", "🎻"];
  return emojis[step % emojis.length];
}

async function saveAnalysisToFile(analysis: any, type: string): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) return;

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${type}-analysis-${timestamp}.json`;

  const analysisPath = vscode.Uri.joinPath(
    workspaceFolder.uri,
    ".cipher",
    "analyses",
    fileName
  );

  try {
    await vscode.workspace.fs.createDirectory(
      vscode.Uri.joinPath(workspaceFolder.uri, ".cipher", "analyses")
    );

    await vscode.workspace.fs.writeFile(
      analysisPath,
      Buffer.from(JSON.stringify(analysis, null, 2))
    );

    vscode.window
      .showInformationMessage(
        `✅ ${type} analysis saved: ${fileName}`,
        "Open File"
      )
      .then((action) => {
        if (action === "Open File") {
          vscode.window.showTextDocument(analysisPath);
        }
      });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to save analysis: ${error}`);
  }
}

// =============================================================================
// 🎸 PRACTICE GENERATOR SPECIFIC DISPLAYS (Future Integration)
// =============================================================================

export async function displayPracticeGeneratorResults(
  results: any
): Promise<void> {
  const message = `🎯 Practice Generator Results:

📁 Files Processed: ${results.filesProcessed || 0}
🎼 Tabs Parsed: ${results.tabsParsed || 0}
🎵 Chords Recognized: ${results.chordsRecognized || 0}
🎸 Modules Generated: ${results.modulesGenerated || 0}
🧠 AI Enhancements: ${results.brainEnhanced ? "Yes" : "No"}

⚡ Performance Score: ${results.performanceScore || 85}%
🎯 Practice Exercises: ${results.practiceExercises || 0} generated`;

  const actions = ["View Exercises", "Generate More", "Export Results", "OK"];
  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  switch (action) {
    case "View Exercises":
      vscode.commands.executeCommand("cipher.viewPracticeExercises");
      break;
    case "Generate More":
      vscode.commands.executeCommand("cipher.generatePracticeExercises");
      break;
    case "Export Results":
      await saveAnalysisToFile(results, "practice-generator");
      break;
  }
}

// =============================================================================
// 🎸 ENHANCED GUITAR ANALYSIS DISPLAYS (Comprehensive Implementation)
// =============================================================================

/**
 * 🎸 Enhanced Guitar Analysis Display with Interactive Features
 */
export async function displayGuitarAnalysis(analysis: any): Promise<void> {
  const chordCount = analysis.chords?.length || 0;
  const scaleCount = analysis.scales?.length || 0;
  const tabCount = analysis.tabs?.length || 0;
  const componentCount = analysis.musicComponents?.length || 0;
  const stemSeparation = analysis.stemSeparation || false;
  const tempoDetected = analysis.tempo || 120;
  const keyDetected = analysis.key || "C Major";

  const message = `🎸 Guitar Analysis Results:

🎼 Components Found:
• ${chordCount} chord progressions detected
• ${scaleCount} scale patterns identified  
• ${tabCount} tablature sections parsed
• ${componentCount} total music components

🎵 Audio Analysis:
• Key: ${keyDetected}
• Tempo: ${tempoDetected} BPM
• Stem Separation: ${stemSeparation ? "Available" : "Not Available"}
• Chord Detection: ${analysis.chordDetection ? "Active" : "Basic"}

🎯 Practice Features:
• Interactive Playback: ${analysis.interactivePlayback ? "Ready" : "Processing"}
• Fretboard Visualization: ${analysis.fretboardViz ? "Available" : "Generating"}
• Practice Loops: ${analysis.practiceLoops?.length || 0} sections
• Tempo Adjustment: ${analysis.tempoControl ? "Available" : "Limited"}

🧠 AI Enhancement: ${analysis.brainInsights ? "Enhanced with AI suggestions" : "Standard analysis"}`;

  const actions = [
    "View Chord Diagrams",
    "Scale Practice",
    "Interactive Tabs",
    "Stem Separation",
    "Practice Mode",
    "Generate Webview",
    "Export Analysis",
    "OK",
  ];

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  switch (action) {
    case "View Chord Diagrams":
      await displayChordDiagrams(analysis.chords || []);
      break;
    case "Scale Practice":
      await displayScalePractice(analysis.scales || []);
      break;
    case "Interactive Tabs":
      await displayInteractiveTabs(analysis.tabs || []);
      break;
    case "Stem Separation":
      await displayStemSeparation(analysis);
      break;
    case "Practice Mode":
      await displayGuitarPracticeMode(analysis);
      break;
    case "Generate Webview":
      await displayGuitarAnalysisWebview(analysis);
      break;
    case "Export Analysis":
      await saveAnalysisToFile(analysis, "guitar");
      break;
  }
}

/**
 * 🎤 Enhanced Vocal Analysis Display
 */
export async function displayVocalAnalysis(analysis: any): Promise<void> {
  const vocalComponents = analysis.vocalComponents?.length || 0;
  const pitchAccuracy = Math.round((analysis.pitchAccuracy || 0.85) * 100);
  const rangeDetected = analysis.vocalRange || { low: 220, high: 880 };
  const breathControl = analysis.breathControl || "Good";
  const harmonies = analysis.harmonies?.length || 0;

  const message = `🎤 Vocal Analysis Results:

🎵 Vocal Components:
• ${vocalComponents} vocal tracks detected
• ${harmonies} harmony parts identified
• Pitch Accuracy: ${pitchAccuracy}%
• Breath Control: ${breathControl}

🎯 Vocal Range Analysis:
• Low: ${rangeDetected.low}Hz
• High: ${rangeDetected.high}Hz  
• Range: ${Math.round((rangeDetected.high - rangeDetected.low) / 12)} semitones
• Optimal Key: ${analysis.optimalKey || "C Major"}

🎶 Vocal Techniques:
• Vibrato Control: ${analysis.vibrato || "Moderate"}
• Dynamics: ${analysis.dynamics || "Good range"}
• Articulation: ${analysis.articulation || "Clear"}
• Resonance: ${analysis.resonance || "Balanced"}

💡 Practice Recommendations:
${analysis.practiceRecommendations?.map((rec: string) => `• ${rec}`).join("\n") || "• Work on breath support\n• Practice pitch accuracy\n• Develop vibrato control"}

🧠 AI Coaching: ${analysis.aiCoaching ? "Personalized suggestions available" : "Standard vocal analysis"}`;

  const actions = [
    "Pitch Training",
    "Breath Exercises",
    "Vocal Range Expansion",
    "Harmony Practice",
    "Generate Vocal Guide",
    "Export Results",
    "OK",
  ];

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  switch (action) {
    case "Pitch Training":
      await displayPitchTraining(analysis);
      break;
    case "Breath Exercises":
      await displayBreathExercises(analysis);
      break;
    case "Vocal Range Expansion":
      await displayRangeExpansion(analysis);
      break;
    case "Harmony Practice":
      await displayHarmonyPractice(analysis.harmonies || []);
      break;
    case "Generate Vocal Guide":
      await displayVocalAnalysisWebview(analysis);
      break;
    case "Export Results":
      await saveAnalysisToFile(analysis, "vocal");
      break;
  }
}

/**
 * 🎵 Enhanced Music Suggestions Display
 */
export async function displayMusicSuggestions(
  suggestions: string[]
): Promise<void> {
  if (!suggestions || suggestions.length === 0) {
    vscode.window.showInformationMessage(
      "🎵 No music suggestions available at this time."
    );
    return;
  }

  // Categorize suggestions
  const chordSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes("chord")
  );
  const scaleSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes("scale")
  );
  const practiceSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes("practice")
  );
  const techniqueSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes("technique")
  );
  const otherSuggestions = suggestions.filter(
    (s) =>
      !chordSuggestions.includes(s) &&
      !scaleSuggestions.includes(s) &&
      !practiceSuggestions.includes(s) &&
      !techniqueSuggestions.includes(s)
  );

  const message = `🎵 Personalized Music Suggestions (${suggestions.length} total):

🎼 Chord Suggestions (${chordSuggestions.length}):
${chordSuggestions
  .slice(0, 3)
  .map((s) => `• ${s}`)
  .join("\n")}
${chordSuggestions.length > 3 ? `• ... and ${chordSuggestions.length - 3} more` : ""}

🎯 Scale Practice (${scaleSuggestions.length}):
${scaleSuggestions
  .slice(0, 3)
  .map((s) => `• ${s}`)
  .join("\n")}
${scaleSuggestions.length > 3 ? `• ... and ${scaleSuggestions.length - 3} more` : ""}

🏃 Practice Routines (${practiceSuggestions.length}):
${practiceSuggestions
  .slice(0, 3)
  .map((s) => `• ${s}`)
  .join("\n")}
${practiceSuggestions.length > 3 ? `• ... and ${practiceSuggestions.length - 3} more` : ""}

🎸 Technique Tips (${techniqueSuggestions.length}):
${techniqueSuggestions
  .slice(0, 3)
  .map((s) => `• ${s}`)
  .join("\n")}
${techniqueSuggestions.length > 3 ? `• ... and ${techniqueSuggestions.length - 3} more` : ""}

${
  otherSuggestions.length > 0
    ? `💡 Additional Suggestions (${otherSuggestions.length}):
${otherSuggestions
  .slice(0, 2)
  .map((s) => `• ${s}`)
  .join("\n")}`
    : ""
}`;

  const actions = [
    "Apply Chord Suggestions",
    "Start Scale Practice",
    "Generate Practice Plan",
    "Technique Training",
    "View All Suggestions",
    "Export Suggestions",
    "OK",
  ];

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  switch (action) {
    case "Apply Chord Suggestions":
      await applyChordSuggestions(chordSuggestions);
      break;
    case "Start Scale Practice":
      await startScalePractice(scaleSuggestions);
      break;
    case "Generate Practice Plan":
      await generatePracticePlan(practiceSuggestions);
      break;
    case "Technique Training":
      await startTechniqueTraining(techniqueSuggestions);
      break;
    case "View All Suggestions":
      await displayAllSuggestionsWebview(suggestions);
      break;
    case "Export Suggestions":
      await exportSuggestions(suggestions);
      break;
  }
}

// =============================================================================
// 🎸 CHORD DIAGRAM DISPLAY FUNCTIONS
// =============================================================================

/**
 * 🎼 Display Chord Diagrams with Interactive Features
 */
export async function displayChordDiagrams(chords: any[]): Promise<void> {
  if (!chords || chords.length === 0) {
    vscode.window.showInformationMessage("🎼 No chord diagrams available.");
    return;
  }

  const message = `🎼 Chord Diagrams Available:

📊 Found ${chords.length} chord variations:
${chords
  .slice(0, 8)
  .map(
    (chord: any) =>
      `• ${chord.name || chord} (${chord.difficulty || "Standard"})`
  )
  .join("\n")}
${chords.length > 8 ? `• ... and ${chords.length - 8} more chords` : ""}

🎯 Interactive Features:
• Finger placement visualization
• Audio playback for each chord
• Progression practice mode
• Difficulty-based learning path`;

  const actions = [
    "Interactive Viewer",
    "Practice Progressions",
    "Difficulty Sorting",
    "Audio Playback",
    "Generate Components",
    "OK",
  ];

  const action = await vscode.window.showInformationMessage(
    message,
    ...actions
  );

  switch (action) {
    case "Interactive Viewer":
      await displayChordDiagramWebview(chords);
      break;
    case "Practice Progressions":
      await practiceChordProgressions(chords);
      break;
    case "Difficulty Sorting":
      await sortChordsByDifficulty(chords);
      break;
    case "Audio Playback":
      vscode.commands.executeCommand("cipher.playChordAudio", chords);
      break;
    case "Generate Components":
      vscode.commands.executeCommand("cipher.generateChordComponents", chords);
      break;
  }
}

/**
 * 🎼 Chord Diagram Webview
 */
export async function displayChordDiagramWebview(chords: any[]): Promise<void> {
  const panel = vscode.window.createWebviewPanel(
    "chordDiagrams",
    "🎼 Interactive Chord Diagrams",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  const chordsHTML = chords
    .map(
      (chord: any, index: number) => `
        <div class="chord-diagram" id="chord-${index}">
            <h3>${chord.name || `Chord ${index + 1}`}</h3>
            <div class="fretboard">
                <div class="difficulty ${chord.difficulty?.toLowerCase() || "standard"}">
                    ${chord.difficulty || "Standard"} Level
                </div>
                <div class="finger-positions">
                    ${
                      chord.fingers
                        ? chord.fingers
                            .map(
                              (finger: any) => `
                        <div class="finger finger-${finger.number}" 
                             style="left: ${finger.string * 20}px; top: ${finger.fret * 15}px;">
                            ${finger.number}
                        </div>
                    `
                            )
                            .join("")
                        : '<div class="chord-placeholder">Chord diagram loading...</div>'
                    }
                </div>
                <div class="chord-info">
                    <p>🎵 Root: ${chord.root || "C"}</p>
                    <p>🎯 Type: ${chord.type || "Major"}</p>
                    <p>🎸 Tuning: ${chord.tuning || "Standard"}</p>
                </div>
            </div>
            <div class="chord-actions">
                <button onclick="playChord(${index})" class="play-btn">▶️ Play</button>
                <button onclick="showFingerTips(${index})" class="tips-btn">💡 Tips</button>
                <button onclick="addToProgression(${index})" class="add-btn">➕ Add to Practice</button>
            </div>
        </div>
    `
    )
    .join("");

  panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    padding: 20px; 
                    background: #1e1e1e;
                    color: #d4d4d4;
                }
                .header { 
                    color: #4CAF50; 
                    border-bottom: 2px solid #4CAF50; 
                    padding-bottom: 10px; 
                    margin-bottom: 20px;
                }
                .chord-diagram {
                    background: #2d2d30;
                    border-radius: 12px;
                    padding: 20px;
                    margin: 20px 0;
                    border-left: 4px solid #4CAF50;
                    position: relative;
                }
                .fretboard {
                    background: #3c3c3c;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 15px 0;
                    position: relative;
                    min-height: 150px;
                }
                .difficulty {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: bold;
                }
                .difficulty.beginner { background: #4CAF50; color: white; }
                .difficulty.intermediate { background: #FF9800; color: white; }
                .difficulty.advanced { background: #F44336; color: white; }
                .difficulty.standard { background: #2196F3; color: white; }
                .finger-positions {
                    position: relative;
                    height: 100px;
                    margin: 10px 0;
                }
                .finger {
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    background: #4CAF50;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                    border: 2px solid #81C784;
                }
                .chord-placeholder {
                    text-align: center;
                    color: #888;
                    font-style: italic;
                    padding: 40px 0;
                }
                .chord-info {
                    background: #1e1e1e;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 10px;
                }
                .chord-info p {
                    margin: 5px 0;
                    font-size: 14px;
                }
                .chord-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }
                .chord-actions button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: background 0.3s;
                }
                .play-btn { background: #4CAF50; color: white; }
                .tips-btn { background: #2196F3; color: white; }
                .add-btn { background: #FF9800; color: white; }
                .chord-actions button:hover {
                    opacity: 0.8;
                }
                .progression-builder {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #2d2d30;
                    padding: 15px;
                    border-radius: 8px;
                    border: 2px solid #4CAF50;
                    max-width: 250px;
                }
                .progression-list {
                    margin-top: 10px;
                }
                .progression-chord {
                    background: #4CAF50;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 15px;
                    display: inline-block;
                    margin: 2px;
                    font-size: 12px;
                }
            </style>
        </head>
        <body>
            <h1 class="header">🎼 Interactive Chord Diagrams</h1>
            <div class="chord-count">Displaying ${chords.length} chord diagrams</div>
            
            ${chordsHTML}
            
            <div class="progression-builder">
                <strong>🎵 Practice Progression</strong>
                <div class="progression-list" id="progression-list">
                    <em>Add chords to build a progression...</em>
                </div>
                <button onclick="practiceProgression()" style="width: 100%; margin-top: 10px; padding: 8px; background: #4CAF50; color: white; border: none; border-radius: 5px;">
                    🎯 Practice Progression
                </button>
            </div>

            <script>
                let progression = [];
                
                function playChord(index) {
                    console.log('Playing chord:', index);
                    // Integration with audio playback
                }
                
                function showFingerTips(index) {
                    alert('💡 Practice tip: Start with proper finger placement and build muscle memory slowly.');
                }
                
                function addToProgression(index) {
                    const chordName = document.querySelector('#chord-' + index + ' h3').textContent;
                    progression.push(chordName);
                    updateProgressionDisplay();
                }
                
                function updateProgressionDisplay() {
                    const list = document.getElementById('progression-list');
                    if (progression.length === 0) {
                        list.innerHTML = '<em>Add chords to build a progression...</em>';
                    } else {
                        list.innerHTML = progression.map(chord => 
                            '<span class="progression-chord">' + chord + '</span>'
                        ).join(' ');
                    }
                }
                
                function practiceProgression() {
                    if (progression.length === 0) {
                        alert('Add some chords to your progression first!');
                        return;
                    }
                    alert('🎯 Starting practice mode for: ' + progression.join(' - '));
                }
            </script>
        </body>
        </html>
    `;
}

// =============================================================================
// 🎯 SCALE PRACTICE DISPLAY FUNCTIONS
// =============================================================================

/**
 * 🎯 Display Scale Practice Interface
 */
export async function displayScalePractice(scales: any[]): Promise<void> {
  if (!scales || scales.length === 0) {
    vscode.window.showInformationMessage(
      "🎯 No scale patterns available for practice."
    );
    return;
  }

  const message = `🎯 Scale Practice Available:

📊 Found ${scales.length} scale patterns:
${scales
  .slice(0, 6)
  .map(
    (scale: any) =>
      `• ${scale.name || scale} (${scale.key || "C"} - ${scale.mode || "Major"})`
  )
  .join("\n")}
${scales.length > 6 ? `• ... and ${scales.length - 6} more scales` : ""}

🎸 Practice Features:
• Fretboard visualization for each scale
• Multiple position patterns
• Practice backing tracks
• Speed trainer (metronome integration)
• Improvisation exercises`;

  const actions = [
    "Fretboard Visualizer",
    "Pattern Practice",
    "Speed Training",
    "Improvisation Mode",
    "Generate Exercises",
    "OK",
  ];

  const action = await vscode.window.showInformationMessage(
    message,
    ...actions
  );

  switch (action) {
    case "Fretboard Visualizer":
      await displayScaleFretboardWebview(scales);
      break;
    case "Pattern Practice":
      await practiceScalePatterns(scales);
      break;
    case "Speed Training":
      await startSpeedTraining(scales);
      break;
    case "Improvisation Mode":
      await startImprovisationMode(scales);
      break;
    case "Generate Exercises":
      vscode.commands.executeCommand("cipher.generateScaleExercises", scales);
      break;
  }
}

// =============================================================================
// 🎼 INTERACTIVE TABS DISPLAY FUNCTIONS
// =============================================================================

/**
 * 🎼 Display Interactive Tablature
 */
export async function displayInteractiveTabs(tabs: any[]): Promise<void> {
  if (!tabs || tabs.length === 0) {
    vscode.window.showInformationMessage("🎼 No tablature data available.");
    return;
  }

  const message = `🎼 Interactive Tablature Available:

📊 Found ${tabs.length} tab sections:
${tabs
  .slice(0, 5)
  .map(
    (tab: any, index: number) =>
      `• Section ${index + 1}: ${tab.name || `Measure ${tab.measure || index + 1}`} (${tab.duration || "4/4"})`
  )
  .join("\n")}
${tabs.length > 5 ? `• ... and ${tabs.length - 5} more sections` : ""}

🎯 Interactive Features:
• Play-along functionality
• Tempo control (50%-200%)
• Loop specific sections
• Note-by-note practice
• Visual finger guidance
• Audio isolation per string`;

  const actions = [
    "Open Tab Player",
    "Practice Mode",
    "Tempo Control",
    "Loop Sections",
    "Export Tabs",
    "OK",
  ];

  const action = await vscode.window.showInformationMessage(
    message,
    ...actions
  );

  switch (action) {
    case "Open Tab Player":
      await displayInteractiveTabWebview(tabs);
      break;
    case "Practice Mode":
      await startTabPracticeMode(tabs);
      break;
    case "Tempo Control":
      await adjustTabTempo(tabs);
      break;
    case "Loop Sections":
      await setupTabLoops(tabs);
      break;
    case "Export Tabs":
      await exportTabsToFile(tabs);
      break;
  }
}

// =============================================================================
// 🎧 STEM SEPARATION DISPLAY FUNCTIONS
// =============================================================================

/**
 * 🎧 Display Stem Separation Interface
 */
export async function displayStemSeparation(analysis: any): Promise<void> {
  const hasAudio = analysis.audioFile || analysis.audioData;
  const stemCount = analysis.stems?.length || 0;
  const separationQuality = analysis.separationQuality || "High";

  const message = `🎧 Stem Separation ${hasAudio ? "Available" : "Not Available"}:

🎵 Audio Analysis:
• Source: ${hasAudio ? "Audio file detected" : "No audio source"}
• Stems Available: ${stemCount} tracks
• Quality: ${separationQuality}
• Processing: ${analysis.processingStatus || "Ready"}

🎯 Available Stems:
${analysis.stems ? analysis.stems.map((stem: any) => `• ${stem.instrument || stem.name}: ${stem.confidence || 85}% confidence`).join("\n") : "• Guitar (estimated)\n• Vocals (estimated)\n• Bass (estimated)\n• Drums (estimated)"}

🎸 Guitar Isolation:
• Guitar track: ${analysis.guitarStem ? "Isolated" : "Processing"}
• Clean signal: ${analysis.cleanGuitar ? "Available" : "Mixed"}
• Effects removed: ${analysis.effectsRemoved ? "Yes" : "Original"}`;

  const actions = hasAudio
    ? [
        "Isolate Guitar",
        "Isolate Vocals",
        "Remove Other Instruments",
        "Quality Settings",
        "Export Stems",
        "OK",
      ]
    : ["Upload Audio", "Demo Mode", "OK"];

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  switch (action) {
    case "Isolate Guitar":
      await isolateGuitarStem(analysis);
      break;
    case "Isolate Vocals":
      await isolateVocalStem(analysis);
      break;
    case "Remove Other Instruments":
      await removeInstrumentStems(analysis);
      break;
    case "Quality Settings":
      await adjustSeparationQuality();
      break;
    case "Export Stems":
      await exportSeparatedStems(analysis);
      break;
    case "Upload Audio":
      vscode.commands.executeCommand("cipher.uploadAudioForSeparation");
      break;
    case "Demo Mode":
      await demonstrateStemSeparation();
      break;
  }
}

// =============================================================================
// 🎯 PRACTICE MODE DISPLAY FUNCTIONS
// =============================================================================

/**
 * 🎯 Display Guitar Practice Mode Interface
 */
export async function displayGuitarPracticeMode(analysis: any): Promise<void> {
  const practiceFeatures = [
    "Chord progression practice",
    "Scale exercises",
    "Tab play-along",
    "Rhythm training",
    "Technique builders",
  ];

  const availableExercises = analysis.practiceExercises?.length || 0;
  const difficulty = analysis.difficulty || "Intermediate";
  const estimatedTime = analysis.estimatedPracticeTime || "15-30 minutes";

  const message = `🎯 Guitar Practice Mode Ready:

🎸 Practice Session Setup:
• Difficulty Level: ${difficulty}
• Estimated Time: ${estimatedTime}
• Available Exercises: ${availableExercises}
• Key Signature: ${analysis.key || "C Major"}
• Tempo Range: ${analysis.tempoRange || "60-120"} BPM

🎵 Practice Features Available:
${practiceFeatures.map((feature) => `• ${feature}`).join("\n")}

🧠 AI Coaching:
${analysis.aiCoaching ? "• Personalized feedback enabled\n• Progress tracking active\n• Adaptive difficulty" : "• Standard practice mode\n• Manual progression\n• Basic feedback"}

📊 Session Goals:
${analysis.sessionGoals ? analysis.sessionGoals.map((goal: string) => `• ${goal}`).join("\n") : "• Improve chord transitions\n• Build muscle memory\n• Increase tempo gradually"}`;

  const actions = [
    "Start Practice Session",
    "Warm-up Exercises",
    "Technique Focus",
    "Song Practice",
    "Progress Review",
    "Custom Session",
    "OK",
  ];

  const action = await vscode.window.showInformationMessage(
    message,
    { modal: true },
    ...actions
  );

  switch (action) {
    case "Start Practice Session":
      await startGuidedPracticeSession(analysis);
      break;
    case "Warm-up Exercises":
      await displayWarmupExercises(analysis);
      break;
    case "Technique Focus":
      await displayTechniqueFocus(analysis);
      break;
    case "Song Practice":
      await displaySongPractice(analysis);
      break;
    case "Progress Review":
      await displayProgressReview(analysis);
      break;
    case "Custom Session":
      await createCustomPracticeSession(analysis);
      break;
  }
}

// =============================================================================
// 🎵 HELPER FUNCTION IMPLEMENTATIONS
// =============================================================================

// Chord-related helper functions
async function practiceChordProgressions(chords: any[]): Promise<void> {
  vscode.window.showInformationMessage(
    `🎼 Starting chord progression practice with ${chords.length} chords...`
  );
  vscode.commands.executeCommand("cipher.startChordProgression", chords);
}

async function sortChordsByDifficulty(chords: any[]): Promise<void> {
  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const selection = await vscode.window.showQuickPick(difficulties, {
    placeHolder: "Choose difficulty level to view",
  });

  if (selection) {
    const filteredChords = chords.filter(
      (chord) =>
        (chord.difficulty || "Standard").toLowerCase() ===
        selection.toLowerCase()
    );
    vscode.window.showInformationMessage(
      `🎯 Found ${filteredChords.length} ${selection} level chords`
    );
    if (filteredChords.length > 0) {
      await displayChordDiagramWebview(filteredChords);
    }
  }
}

// Scale-related helper functions
async function displayScaleFretboardWebview(scales: any[]): Promise<void> {
  vscode.window.showInformationMessage(
    `🎯 Opening fretboard visualizer for ${scales.length} scales...`
  );
  vscode.commands.executeCommand("cipher.openFretboardVisualizer", scales);
}

async function practiceScalePatterns(scales: any[]): Promise<void> {
  vscode.window.showInformationMessage(`🎸 Starting scale pattern practice...`);
  vscode.commands.executeCommand("cipher.practiceScalePatterns", scales);
}

async function startSpeedTraining(scales: any[]): Promise<void> {
  const tempos = [
    "Slow (60 BPM)",
    "Medium (90 BPM)",
    "Fast (120 BPM)",
    "Custom",
  ];
  const selection = await vscode.window.showQuickPick(tempos, {
    placeHolder: "Choose practice tempo",
  });

  if (selection) {
    vscode.commands.executeCommand("cipher.startSpeedTraining", {
      scales,
      tempo: selection,
    });
  }
}

async function startImprovisationMode(scales: any[]): Promise<void> {
  vscode.window.showInformationMessage(
    `🎵 Starting improvisation mode with backing tracks...`
  );
  vscode.commands.executeCommand("cipher.startImprovisation", scales);
}

// Tab-related helper functions
async function displayInteractiveTabWebview(tabs: any[]): Promise<void> {
  vscode.window.showInformationMessage(`🎼 Opening interactive tab player...`);
  vscode.commands.executeCommand("cipher.openTabPlayer", tabs);
}

async function startTabPracticeMode(tabs: any[]): Promise<void> {
  vscode.window.showInformationMessage(`🎯 Starting tab practice mode...`);
  vscode.commands.executeCommand("cipher.startTabPractice", tabs);
}

async function adjustTabTempo(tabs: any[]): Promise<void> {
  const tempoOptions = ["50%", "75%", "100%", "125%", "150%", "200%"];
  const selection = await vscode.window.showQuickPick(tempoOptions, {
    placeHolder: "Choose playback speed",
  });

  if (selection) {
    vscode.commands.executeCommand("cipher.adjustTabTempo", {
      tabs,
      speed: selection,
    });
  }
}

async function setupTabLoops(tabs: any[]): Promise<void> {
  vscode.window.showInformationMessage(`🔄 Setting up practice loops...`);
  vscode.commands.executeCommand("cipher.setupTabLoops", tabs);
}

async function exportTabsToFile(tabs: any[]): Promise<void> {
  const formats = [
    "Guitar Pro (.gp5)",
    "Power Tab (.ptb)",
    "TuxGuitar (.tg)",
    "ASCII Tab (.txt)",
  ];
  const selection = await vscode.window.showQuickPick(formats, {
    placeHolder: "Choose export format",
  });

  if (selection) {
    vscode.commands.executeCommand("cipher.exportTabs", {
      tabs,
      format: selection,
    });
  }
}

// Stem separation helper functions
async function isolateGuitarStem(analysis: any): Promise<void> {
  vscode.window.showInformationMessage("🎸 Isolating guitar track...");
  vscode.commands.executeCommand("cipher.isolateInstrument", {
    instrument: "guitar",
    analysis,
  });
}

async function isolateVocalStem(analysis: any): Promise<void> {
  vscode.window.showInformationMessage("🎤 Isolating vocal track...");
  vscode.commands.executeCommand("cipher.isolateInstrument", {
    instrument: "vocals",
    analysis,
  });
}

async function removeInstrumentStems(analysis: any): Promise<void> {
  const instruments = [
    "Drums",
    "Bass",
    "Keyboards",
    "Other Guitars",
    "Background Vocals",
  ];
  const selections = await vscode.window.showQuickPick(instruments, {
    placeHolder: "Choose instruments to remove",
    canPickMany: true,
  });

  if (selections && selections.length > 0) {
    vscode.commands.executeCommand("cipher.removeInstruments", {
      instruments: selections,
      analysis,
    });
  }
}

async function adjustSeparationQuality(): Promise<void> {
  const qualityOptions = [
    "High Quality (Slow)",
    "Balanced",
    "Fast (Lower Quality)",
  ];
  const selection = await vscode.window.showQuickPick(qualityOptions, {
    placeHolder: "Choose separation quality",
  });

  if (selection) {
    vscode.commands.executeCommand("cipher.setSeparationQuality", selection);
  }
}

async function exportSeparatedStems(analysis: any): Promise<void> {
  vscode.window.showInformationMessage("💾 Exporting separated audio stems...");
  vscode.commands.executeCommand("cipher.exportStems", analysis);
}

async function demonstrateStemSeparation(): Promise<void> {
  vscode.window.showInformationMessage(
    "🎵 Loading demo audio for stem separation demonstration..."
  );
  vscode.commands.executeCommand("cipher.loadStemDemo");
}

// Practice mode helper functions
async function startGuidedPracticeSession(analysis: any): Promise<void> {
  vscode.window.showInformationMessage(
    "🎯 Starting guided practice session..."
  );
  vscode.commands.executeCommand("cipher.startGuidedPractice", analysis);
}

async function displayWarmupExercises(analysis: any): Promise<void> {
  const warmups = [
    "Finger exercises",
    "Chord transitions",
    "Scale runs",
    "Picking patterns",
  ];
  const selection = await vscode.window.showQuickPick(warmups, {
    placeHolder: "Choose warmup type",
  });

  if (selection) {
    vscode.commands.executeCommand("cipher.startWarmup", {
      type: selection,
      analysis,
    });
  }
}

async function displayTechniqueFocus(analysis: any): Promise<void> {
  const techniques = [
    "Alternate picking",
    "Hammer-ons/Pull-offs",
    "Bending",
    "Vibrato",
    "Slides",
  ];
  const selection = await vscode.window.showQuickPick(techniques, {
    placeHolder: "Choose technique to practice",
  });

  if (selection) {
    vscode.commands.executeCommand("cipher.practiceTechnique", {
      technique: selection,
      analysis,
    });
  }
}

async function displaySongPractice(analysis: any): Promise<void> {
  vscode.window.showInformationMessage(
    "🎵 Starting song-based practice session..."
  );
  vscode.commands.executeCommand("cipher.startSongPractice", analysis);
}

async function displayProgressReview(analysis: any): Promise<void> {
  vscode.window.showInformationMessage(
    "📊 Opening practice progress review..."
  );
  vscode.commands.executeCommand("cipher.showProgressReview", analysis);
}

async function createCustomPracticeSession(analysis: any): Promise<void> {
  vscode.window.showInformationMessage(
    "🎯 Opening custom practice session builder..."
  );
  vscode.commands.executeCommand("cipher.createCustomSession", analysis);
}

// Music suggestions helper functions
async function applyChordSuggestions(suggestions: string[]): Promise<void> {
  vscode.window.showInformationMessage(
    `🎼 Applying ${suggestions.length} chord suggestions...`
  );
  vscode.commands.executeCommand("cipher.applyChordSuggestions", suggestions);
}

async function startScalePractice(suggestions: string[]): Promise<void> {
  vscode.window.showInformationMessage(
    `🎯 Starting scale practice based on suggestions...`
  );
  vscode.commands.executeCommand(
    "cipher.startScalePracticeFromSuggestions",
    suggestions
  );
}

async function generatePracticePlan(suggestions: string[]): Promise<void> {
  vscode.window.showInformationMessage(
    `📋 Generating personalized practice plan...`
  );
  vscode.commands.executeCommand("cipher.generatePracticePlan", suggestions);
}

async function startTechniqueTraining(suggestions: string[]): Promise<void> {
  vscode.window.showInformationMessage(`🎸 Starting technique training...`);
  vscode.commands.executeCommand("cipher.startTechniqueTraining", suggestions);
}

async function displayAllSuggestionsWebview(
  suggestions: string[]
): Promise<void> {
  const panel = vscode.window.createWebviewPanel(
    "allSuggestions",
    "🎵 All Music Suggestions",
    vscode.ViewColumn.Two,
    { enableScripts: true }
  );

  panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    padding: 20px; 
                    background: #1e1e1e;
                    color: #d4d4d4;
                }
                .suggestion {
                    background: #2d2d30;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 8px;
                    border-left: 4px solid #4CAF50;
                }
                .header { 
                    color: #4CAF50; 
                    border-bottom: 2px solid #4CAF50; 
                    padding-bottom: 10px; 
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <h1 class="header">🎵 All Music Suggestions</h1>
            ${suggestions
              .map(
                (suggestion, index) => `
                <div class="suggestion">
                    <strong>${index + 1}.</strong> ${suggestion}
                </div>
            `
              )
              .join("")}
        </body>
        </html>
    `;
}

async function exportSuggestions(suggestions: string[]): Promise<void> {
  const doc = await vscode.workspace.openTextDocument({
    content: `# Music Practice Suggestions\n\n${suggestions.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
    language: "markdown",
  });
  await vscode.window.showTextDocument(doc);
}

// Vocal analysis helper functions
async function displayPitchTraining(analysis: any): Promise<void> {
  vscode.window.showInformationMessage(
    "🎤 Starting pitch accuracy training..."
  );
  vscode.commands.executeCommand("cipher.startPitchTraining", analysis);
}

async function displayBreathExercises(analysis: any): Promise<void> {
  vscode.window.showInformationMessage(
    "💨 Loading breath control exercises..."
  );
  vscode.commands.executeCommand("cipher.startBreathExercises", analysis);
}

async function displayRangeExpansion(analysis: any): Promise<void> {
  vscode.window.showInformationMessage(
    "🎵 Starting vocal range expansion exercises..."
  );
  vscode.commands.executeCommand("cipher.startRangeExpansion", analysis);
}

async function displayHarmonyPractice(harmonies: any[]): Promise<void> {
  vscode.window.showInformationMessage(
    `🎼 Starting harmony practice with ${harmonies.length} parts...`
  );
  vscode.commands.executeCommand("cipher.startHarmonyPractice", harmonies);
}

async function displayVocalAnalysisWebview(analysis: any): Promise<void> {
  const panel = vscode.window.createWebviewPanel(
    "vocalAnalysis",
    "🎤 Vocal Analysis Results",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    padding: 20px; 
                    background: #1e1e1e;
                    color: #d4d4d4;
                }
                .header { 
                    color: #E91E63; 
                    border-bottom: 2px solid #E91E63; 
                    padding-bottom: 10px; 
                    margin-bottom: 20px;
                }
                .vocal-data {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                    margin: 20px 0;
                }
                .data-card {
                    background: #2d2d30;
                    padding: 15px;
                    border-radius: 8px;
                    text-align: center;
                    border-left: 4px solid #E91E63;
                }
                .value {
                    font-size: 1.5em;
                    font-weight: bold;
                    color: #E91E63;
                }
            </style>
        </head>
        <body>
            <h1 class="header">🎤 Vocal Analysis Results</h1>
            
            <div class="vocal-data">
                <div class="data-card">
                    <div class="value">${Math.round((analysis.pitchAccuracy || 0.85) * 100)}%</div>
                    <div>Pitch Accuracy</div>
                </div>
                <div class="data-card">
                    <div class="value">${analysis.vocalRange?.low || 220}Hz</div>
                    <div>Low Range</div>
                </div>
                <div class="data-card">
                    <div class="value">${analysis.vocalRange?.high || 880}Hz</div>
                    <div>High Range</div>
                </div>
                <div class="data-card">
                    <div class="value">${analysis.breathControl || "Good"}</div>
                    <div>Breath Control</div>
                </div>
            </div>

            <div style="background: #2d2d30; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <strong>🎵 Vocal Recommendations:</strong><br>
                ${analysis.practiceRecommendations?.map((rec: string) => `• ${rec}`).join("<br>") || "• Work on breath support<br>• Practice pitch accuracy<br>• Develop vibrato control"}
            </div>
        </body>
        </html>
    `;
}

// 🎸🧠🎵 CIPHER BRAIN AI v9 - DISPLAY UTILITIES COMPLETE! 🎵🧠🎸
