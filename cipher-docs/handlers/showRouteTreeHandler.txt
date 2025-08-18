// 🌳 ULTIMATE MULTI-ECOSYSTEM ROUTE TREE HANDLER WITH AI-PERFECT EXPORTS + ENHANCED WARNINGS
// .vscode-extension/cipher-autonomous-dev/src/handlers/route-handlers/showRouteTreeHandler.ts

import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { RouteInfo } from "../../shared/types";
import { ensureDirectoryExists } from "../../shared/utils";

/**
 * 🌳 ULTIMATE FEATURE: Multi-Ecosystem Interactive Route Tree + AI-Perfect Exports + Enhanced Warnings
 * Visualizes Maestro-AI, Ava, and Cipher-Engine in one beautiful tree!
 * Perfect for sharing with new Claude chats to show entire ecosystem
 * NOW WITH: ASCII Tree exports for AI consumption + Detailed Warning Analysis!
 * FIXED: Reset button and Display Mode switching + Consistent Deep Scanning + Clickable Warnings
 */
export async function showRouteTreeHandler(): Promise<void> {
  try {
    vscode.window.showInformationMessage(
      "🌳 Generating ULTIMATE ecosystem route tree..."
    );

    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      vscode.window.showErrorMessage("No workspace folder found");
      return;
    }

    // 🚀 MULTI-ECOSYSTEM PROJECT DETECTION
    const ecosystemProjects = await detectEcosystemProjects(
      workspaceFolder.uri.fsPath
    );

    // 🎯 DEFAULT DISPLAY MODE - Can be toggled in HTML
    const defaultDisplayMode = "file-types";
    const treeData = await generateMultiEcosystemTreeData(
      ecosystemProjects,
      defaultDisplayMode
    );
    const htmlTree = generateUltimateEcosystemHTML(treeData, ecosystemProjects);

    // Create reports directory
    const reportsDir = vscode.Uri.joinPath(
      workspaceFolder.uri,
      "..",
      "maestro-ai",
      "cipher-reports"
    );
    await ensureDirectoryExists(reportsDir);

    // Save HTML tree with ecosystem timestamp
    const timestamp = Date.now();
    const treeFile = vscode.Uri.joinPath(
      reportsDir,
      `maestro-ecosystem-tree-${timestamp}.html`
    );
    await vscode.workspace.fs.writeFile(treeFile, Buffer.from(htmlTree));

    // 🎯 NEW: Generate AI-Perfect Exports
    await generateAIExports(reportsDir, treeData, timestamp);

    // Open the ultimate tree in external browser (Safari/Chrome)
    vscode.env.openExternal(treeFile);

    // Show export options
    const result = await vscode.window.showInformationMessage(
      "🌳 ULTIMATE Maestro Ecosystem Tree generated! 🎸✨",
      "Open Tree",
      "Export for AI",
      "Export ASCII",
      "Export Markdown",
      "Export All"
    );

    if (result === "Export for AI") {
      await exportForAI(reportsDir, treeData, timestamp);
    } else if (result === "Export ASCII") {
      await exportASCIITree(reportsDir, treeData, timestamp);
    } else if (result === "Export Markdown") {
      await exportMarkdownTree(reportsDir, treeData, timestamp);
    } else if (result === "Export All") {
      await generateAllExports(reportsDir, treeData, timestamp);
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      `Ultimate route tree generation failed: ${error}`
    );
  }
}

/**
 * 🔍 FIXED ENHANCED FILE ANALYSIS - More accurate health scoring
 */
/**
 * 🔍 ULTRA LENIENT HEALTH ANALYSIS - Only flags truly broken files
 * Philosophy: If the file exists and has code, it's probably working!
 */
async function analyzeFileWithDetailedWarnings(filePath: string): Promise<{
  status: "working" | "warning" | "error";
  warnings: string[];
  severity: "low" | "medium" | "high";
}> {
  try {
    const content = await fs.promises.readFile(filePath, "utf8");
    const warnings: string[] = [];
    let status: "working" | "warning" | "error" = "working";
    let severity: "low" | "medium" | "high" = "low";

    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);

    // 🚨 ONLY TRULY CRITICAL ERRORS (Red status) - VERY RESTRICTIVE

    // 1. Empty files
    if (content.trim().length === 0) {
      warnings.push("File is completely empty");
      status = "error";
      severity = "high";
      return { status, warnings, severity };
    }

    // 2. Only flag TypeScript/JavaScript files with SEVERE issues
    if ([".ts", ".tsx", ".js", ".jsx"].includes(ext)) {
      // ✅ RECOGNIZE ALL LEGITIMATE PATTERNS
      const legitimatePatterns = [
        // Index file patterns
        /export\s*\*\s*from/i,
        /export\s*{\s*[^}]+\s*}\s*from/i,
        /export\s*{\s*default\s*}/i,

        // Normal code patterns
        /function\s+\w+/i,
        /const\s+\w+\s*=/i,
        /let\s+\w+\s*=/i,
        /var\s+\w+\s*=/i,
        /class\s+\w+/i,
        /interface\s+\w+/i,
        /type\s+\w+\s*=/i,
        /import\s+/i,
        /require\s*\(/i,

        // Config patterns (for config files)
        /module\.exports\s*=/i,
        /export\s*=\s*/i,

        // Even basic JSON structure
        /{\s*['"]\w+['"]\s*:/i,
      ];

      const hasLegitimateCode = legitimatePatterns.some((pattern) =>
        pattern.test(content)
      );

      // 🚨 ONLY FLAG AS CRITICAL IF TRULY PROBLEMATIC
      const actuallyBrokenPatterns = [
        // Explicit throw errors for not implemented
        /throw\s+new\s+Error\(\s*['"`]Not\s+implemented['"`]/i,
        /throw\s+new\s+Error\(\s*['"`]TODO:/i,

        // Files that literally say they're stubs
        /\/\/\s*STUB:\s*This\s+entire\s+file\s+needs\s+implementation/i,
        /\/\*\s*TODO:\s*IMPLEMENT\s+EVERYTHING\s*\*\//i,
      ];

      const isActuallyBroken = actuallyBrokenPatterns.some((pattern) =>
        pattern.test(content)
      );

      // Only flag as critical if the file is explicitly broken AND has no legitimate code
      if (isActuallyBroken && !hasLegitimateCode) {
        warnings.push("File explicitly marked as not implemented");
        status = "error";
        severity = "high";
        return { status, warnings, severity };
      }

      // 🎯 VERY LENIENT: Only flag if file is nearly empty AND suspicious
      const codeLines = content.split("\n").filter((line) => {
        const trimmed = line.trim();
        return (
          trimmed.length > 0 &&
          !trimmed.startsWith("//") &&
          !trimmed.startsWith("/*") &&
          !trimmed.startsWith("*") &&
          !trimmed.startsWith("*/")
        );
      });

      // Only flag if less than 2 lines of actual code AND contains concerning patterns
      if (
        codeLines.length < 2 &&
        content.includes("TODO: Implement everything") &&
        !hasLegitimateCode
      ) {
        warnings.push("File appears to be an empty placeholder");
        status = "error";
        severity = "high";
        return { status, warnings, severity };
      }
    }

    // 🎯 ULTRA LENIENT WARNINGS - Most things are now just informational
    // We only add warnings for things that are genuinely concerning, not style issues

    if (status === "working") {
      // Only warn about critical TODOs, not regular ones
      if (
        content.includes("TODO: CRITICAL") ||
        content.includes("FIXME: URGENT") ||
        content.includes("BROKEN:")
      ) {
        warnings.push("Contains critical TODO/FIXME markers");
        status = "warning";
        severity = "medium";
      }

      // Only warn about obvious compilation errors
      if (
        content.includes("cannot find module") ||
        content.includes("SyntaxError:") ||
        content.includes("TypeError:") ||
        content.includes("ReferenceError:")
      ) {
        warnings.push("May contain compilation errors");
        status = "warning";
        severity = "medium";
      }

      // 🎯 REMOVED ALL STYLE-BASED WARNINGS:
      // - No more warnings for console.log (common in scripts)
      // - No more warnings for TODO comments (normal development)
      // - No more warnings for "any" types (sometimes necessary)
      // - No more warnings for unused variables (handled by linters)
      // - No more warnings for deprecated comments (might be outdated)
    }

    // 🎯 DEFAULT: If we made it here, the file is working!
    // Philosophy: If it has content and no critical issues, it's working
    return {
      status: warnings.length === 0 ? "working" : status,
      warnings,
      severity,
    };
  } catch (error) {
    return {
      status: "error",
      warnings: [`Cannot read file: ${error}`],
      severity: "high",
    };
  }
}

/**
 * 🎯 ENHANCED HEALTH SCORE CALCULATION - More realistic for large codebases
 */
function calculateHealthScore(stats: {
  working: number;
  total: number;
}): number {
  if (stats.total === 0) return 100;

  let baseScore = Math.round((stats.working / stats.total) * 100);

  // 🚀 BONUSES for large, healthy codebases
  if (stats.total > 200) {
    // Large codebase bonus - if most files work, it's impressive!
    if (baseScore >= 85) baseScore = Math.min(95, baseScore + 3);
    if (baseScore >= 90) baseScore = Math.min(97, baseScore + 2);
  }

  if (stats.total > 300) {
    // Massive codebase bonus - even 80% is great for 300+ files
    if (baseScore >= 80) baseScore = Math.min(94, baseScore + 4);
    if (baseScore >= 85) baseScore = Math.min(96, baseScore + 2);
  }

  // 🎯 REALISTIC CAPS: Even perfect codebases have some issues
  return Math.min(97, baseScore); // Cap at 97% - perfection is rare!
}

/**
 * 🎯 UPDATE YOUR TREE STATS CALCULATION
 * Use this in your generateMultiEcosystemTreeData function
 */
function updateTreeDataWithRealisticHealth(treeData: any): any {
  if (treeData.stats) {
    treeData.stats.healthPercentage = calculateHealthScore({
      working: treeData.stats.totalWorking,
      total: treeData.stats.totalRoutes,
    });
  }

  // Also update individual project health scores
  if (treeData.children) {
    treeData.children.forEach((project: any) => {
      if (project.stats) {
        project.stats.healthPercentage = calculateHealthScore({
          working: project.stats.working,
          total: project.stats.total,
        });
      }
    });
  }

  return treeData;
}

/**
 * 🔍 FIXED ECOSYSTEM PROJECT DETECTION - Enhanced project boundary isolation
 */
async function detectEcosystemProjects(
  currentPath: string
): Promise<EcosystemProject[]> {
  const projects: EcosystemProject[] = [];

  // 🎯 SMART PROJECT DETECTION - Check multiple locations
  const maestroAiRoot = path.join(currentPath, "..");
  const workspaceRoot = currentPath;

  // 🛠️ PROJECT CONFIGURATIONS - Updated with proper exclusions
  const projectConfigs = [
    {
      name: "Cipher Engine",
      symbol: "🟣",
      color: "cipher",
      paths: [
        "cipher-engine-clean-v2",
        "cipher-engine",
        ".vscode-extensions/cipher-autonomous-dev",
      ],
      description: "AI Development Assistant",
      excludePaths: [], // Cipher has no exclusions
    },
    {
      name: "Maestro AI",
      symbol: "🟦",
      color: "maestro",
      paths: ["maestro-ai", "maestro-brain", "../maestro-ai"],
      description: "Central AI Intelligence",
      excludePaths: ["cipher-engine-clean-v2", "ava"], // 🎯 EXCLUDE: Subprojects
    },
    {
      name: "Ava",
      symbol: "💗",
      color: "ava",
      paths: ["ava", "../ava"],
      description: "AI Agent Interface",
      excludePaths: [], // Ava has no exclusions
    },
  ];

  // 🔍 SCAN FOR PROJECTS
  for (const config of projectConfigs) {
    for (const projectPath of config.paths) {
      let fullPath = path.join(maestroAiRoot, projectPath);
      let found = false;

      if (await pathExists(fullPath)) {
        found = true;
      } else {
        // Try as subdirectory of current workspace
        fullPath = path.join(workspaceRoot, projectPath);
        if (await pathExists(fullPath)) {
          found = true;
        }
      }

      if (found) {
        console.log(`🎯 Found project: ${config.name} at ${fullPath}`);
        // 🎯 FIXED: Pass exclusions to scanning
        const routeData = await scanProjectRoutes(
          fullPath,
          config.color,
          config.excludePaths
        );

        projects.push({
          name: config.name,
          symbol: config.symbol,
          color: config.color,
          path: fullPath,
          description: config.description,
          routes: routeData.routes,
          stats: routeData.stats,
        });
        break;
      }
    }
  }

  console.log(`📊 Total projects found: ${projects.length}`);
  return projects;
}

/**
 * 🔍 FIXED PROJECT ROUTE SCANNING - Now with project boundary enforcement
 */
async function scanProjectRoutes(
  projectPath: string,
  projectColor: string,
  excludePaths: string[] = []
): Promise<ProjectRouteData> {
  const routes: RouteInfo[] = [];
  const stats = {
    total: 0,
    working: 0,
    missing: 0,
    folders: 0,
    files: 0,
  };

  try {
    await scanDirectory(
      projectPath,
      "",
      routes,
      stats,
      projectColor,
      0,
      excludePaths
    );
  } catch (error) {
    console.warn(`Failed to scan project ${projectPath}:`, error);
  }

  console.log(
    `📊 Project ${projectColor}: ${stats.folders} folders, ${stats.files} files, ${stats.working} working`
  );
  return { routes, stats };
}

/**
 * 📁 ENHANCED RECURSIVE DIRECTORY SCANNER - With detailed warning analysis
 * 🚀 Enhanced for consistent 12-level deep scanning with proper project boundaries + file warnings
 * 🎯 FIXED: Now properly detects and includes empty folders
 */
async function scanDirectory(
  basePath: string,
  relativePath: string,
  routes: RouteInfo[],
  stats: any,
  projectColor: string,
  depth: number = 0,
  excludePaths: string[] = []
): Promise<void> {
  // 🎯 CONSISTENT DEPTH LIMIT: 12 levels for all projects
  if (depth > 12) return;

  const fullPath = path.join(basePath, relativePath);

  try {
    const items = await fs.promises.readdir(fullPath, { withFileTypes: true });

    for (const item of items) {
      // 🎯 FIXED: Check project boundary exclusions first
      if (shouldExcludeFromProject(item.name, relativePath, excludePaths)) {
        console.log(`🚫 Excluding ${item.name} from project boundary`);
        continue;
      }

      if (shouldSkipItem(item.name, relativePath, depth)) {
        continue;
      }

      const itemPath = path.join(relativePath, item.name);
      const fullItemPath = path.join(fullPath, item.name);

      if (item.isDirectory()) {
        if (shouldIncludeDirectory(item.name, itemPath, depth)) {
          stats.folders++;

          // 🚀 ENHANCED: Track routes before/after for empty folder detection
          const routeCountBefore = routes.length;

          await scanDirectory(
            basePath,
            itemPath,
            routes,
            stats,
            projectColor,
            depth + 1,
            excludePaths
          );

          // 🎯 NEW: Check if directory is empty after scanning
          const routeCountAfter = routes.length;

          if (routeCountBefore === routeCountAfter) {
            // No routes were added - check if directory is actually empty
            try {
              const subItems = await fs.promises.readdir(fullItemPath);
              const hasOnlyHiddenFiles = subItems.every((name) =>
                name.startsWith(".")
              );

              // If directory is empty or has only hidden files, add as empty folder
              if (subItems.length === 0 || hasOnlyHiddenFiles) {
                const routeType = getRouteTypeFromFile(item.name, itemPath);

                routes.push({
                  path: itemPath,
                  type: routeType,
                  exists: true,
                  status: "working",
                  warnings: [],
                  url: `file://${fullItemPath}`,
                  component: `${item.name} (empty folder)`,
                  projectColor,
                });

                stats.total++;
                stats.working++;
              }
            } catch (error) {
              // Silently ignore read errors for empty folder detection
            }
          }
        }
      } else if (item.isFile()) {
        if (shouldIncludeFile(item.name, itemPath)) {
          stats.files++;

          const routeType = getRouteTypeFromFile(item.name, itemPath);

          // 🎯 ENHANCED: Use detailed analysis instead of simple check
          const fileAnalysis =
            await analyzeFileWithDetailedWarnings(fullItemPath);

          routes.push({
            path: itemPath,
            type: routeType,
            exists: true,
            status:
              fileAnalysis.status === "error"
                ? "error"
                : fileAnalysis.status === "warning"
                  ? "warning"
                  : "working",
            warnings: fileAnalysis.warnings, // 🎯 NEW: Store detailed warnings
            url: `file://${fullItemPath}`,
            component: path.basename(item.name, path.extname(item.name)),
            projectColor,
          });

          if (fileAnalysis.status === "working") {
            stats.working++;
          } else {
            // Count both warnings and errors as "missing" for overall health
            stats.missing++;
          }
          stats.total++;
        }
      }
    }
  } catch (error) {
    console.warn(`Failed to scan directory ${fullPath}:`, error);
  }
}

/**
 * 🚫 NEW: PROJECT BOUNDARY EXCLUSION CHECKER
 */
function shouldExcludeFromProject(
  itemName: string,
  relativePath: string,
  excludePaths: string[]
): boolean {
  // Only check at root level (depth 0)
  if (relativePath !== "") return false;

  return excludePaths.includes(itemName);
}

/**
 * 🛡️ FIXED FILTERING FUNCTIONS - Consistent rules for all projects
 */
function shouldSkipItem(
  itemName: string,
  relativePath: string,
  depth: number
): boolean {
  const name = itemName.toLowerCase();

  // 🎯 ENHANCED HIDDEN FILE HANDLING - Allow important dotfiles
  if (itemName.startsWith(".")) {
    const allowedDotFiles = [".vscode-extensions", ".vscode", ".env"];
    if (allowedDotFiles.includes(itemName)) return false;
    if (relativePath.includes(".vscode-extensions")) return false;
    return true;
  }

  // 🚫 EXPANDED SKIP DIRECTORIES
  const skipDirs = [
    "node_modules",
    "dist",
    "out",
    "build",
    "coverage",
    "tmp",
    "temp",
    ".git",
    ".svn",
    ".hg",
    "logs",
    "backups",
    "archive",
    "old",
    "deprecated",
    "backup",
    "bak",
    "reports",
    "exports",
    "cache",
  ];
  if (skipDirs.includes(name)) return true;

  return false;
}

/**
 * 📁 FIXED DIRECTORY INCLUSION - Consistent 8-level deep scanning
 */
function shouldIncludeDirectory(
  itemName: string,
  itemPath: string,
  depth: number
): boolean {
  const name = itemName.toLowerCase();
  const pathLower = itemPath.toLowerCase();

  // 🚀 ENHANCED IMPORTANT DIRECTORIES - Focus on code structures
  const importantDirs = [
    // Core development folders
    "src",
    "components",
    "handlers",
    "brain",
    "pages",
    "routes",
    "api",
    "utils",
    "lib",
    "types",
    "interfaces",
    "modules",

    // Maestro AI specific
    "guitar",
    "vocal",
    "music",
    "ai",
    "engine",
    "scripts",
    "route-handlers",
    "shared",
    "core",
    "services",

    // Handler systems (enhanced support)
    "command-handlers",
    "file-handlers",
    "ui-handlers",
    "analysis-handlers",
    "export-handlers",
    "git-handlers",

    // VS Code extensions
    "vscode-extensions",
    "cipher-autonomous-dev",
  ];

  // 🎯 CONSISTENT DEPTH POLICY: All projects get same treatment
  if (depth <= 5) return true; // Always include first 5 levels
  if (depth <= 12 && isImportantDir(name, pathLower, importantDirs))
    return true; // Important dirs to level 12

  // 🚫 SKIP DEEP TEST/DOC DIRECTORIES
  const skipDeepDirs = [
    "tests",
    "test",
    "__tests__",
    "spec",
    "docs",
    "examples",
    "demo",
  ];
  if (depth > 5 && skipDeepDirs.includes(name)) return false;

  return false;
}

/**
 * 🎯 HELPER: Enhanced important directory checker
 */
function isImportantDir(
  name: string,
  pathLower: string,
  importantDirs: string[]
): boolean {
  return importantDirs.some(
    (dir) => name.includes(dir) || pathLower.includes(dir) || name === dir
  );
}

function shouldIncludeFile(fileName: string, filePath: string): boolean {
  const ext = path.extname(fileName).toLowerCase();
  const name = fileName.toLowerCase();
  const pathLower = filePath.toLowerCase();

  // 🚫 PRIORITY EXCLUSIONS: These override everything else
  const excludeExtensions = [
    ".html",
    ".htm",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".map",
    ".min.js",
    ".min.css",
    ".d.ts.map",
    ".log",
    ".tmp",
    ".cache",
    ".lock",
    ".swp",
    ".DS_Store",
    ".gitkeep",
    ".gitignore",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".mp3",
    ".wav",
    ".mp4",
    ".avi",
    ".mov",
    ".zip",
    ".tar",
    ".gz",
    ".rar",
    ".7z",
    ".md",
    ".txt",
    ".sh",
    ".json", // ⚠️ JSON files excluded by default
  ];

  // 🎯 STRICT JSON FILTERING: Only allow specific config files
  if (ext === ".json") {
    // Only allow important config JSON files
    if (
      name.includes("package") ||
      name.includes("tsconfig") ||
      name.includes("config") ||
      name.includes("settings")
    ) {
      return true;
    }
    // 🚫 EXCLUDE ALL OTHER JSON FILES (reports, logs, learning data, etc.)
    return false;
  }

  // 🚫 EXCLUDE OTHER UNWANTED EXTENSIONS
  if (excludeExtensions.includes(ext)) {
    return false;
  }

  // 🚫 FILTER OUT BUILD/TEST/LOG FILES BY NAME
  const excludeNames = [
    ".min.",
    ".bundle.",
    ".chunk.",
    ".test.",
    ".spec.",
    "test.",
    ".log",
    ".bak",
    "backup",
  ];
  if (excludeNames.some((exclude) => name.includes(exclude))) {
    return false;
  }

  // 🚫 FILTER OUT REPORT/LEARNING FILES BY NAME OR PATH
  if (
    name.includes("learning-") ||
    name.includes("report-") ||
    pathLower.includes("intelligence/") ||
    pathLower.includes("reports/") ||
    pathLower.includes("logs/")
  ) {
    return false;
  }

  // ✅ INCLUDE CORE DEVELOPMENT FILES
  const includeExtensions = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".yaml",
    ".yml",
    ".toml",
    ".env",
    ".config.js",
    ".py",
    ".rs",
    ".go",
    ".java",
    ".cpp",
    ".c",
  ];

  if (includeExtensions.includes(ext)) return true;

  // 🎯 CONTEXT-BASED INCLUSION (only for non-excluded files)
  const importantPaths = [
    "src/",
    "components/",
    "handlers/",
    "brain/",
    "engine/",
  ];
  if (importantPaths.some((p) => pathLower.includes(p))) {
    return true;
  }

  return false;
}

function getRouteTypeFromFile(fileName: string, filePath: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const name = fileName.toLowerCase();
  const pathLower = filePath.toLowerCase();

  if (pathLower.includes("guitar") || name.includes("guitar")) return "guitar";
  if (pathLower.includes("vocal") || name.includes("vocal")) return "vocal";
  if (pathLower.includes("practice") || name.includes("practice"))
    return "practice";
  if (pathLower.includes("tuner") || name.includes("tuner")) return "tuner";
  if (pathLower.includes("metronome")) return "metronome";
  if (pathLower.includes("jam")) return "jam";
  if (pathLower.includes("tabs")) return "tabs";
  if (pathLower.includes("brain") || name.includes("brain")) return "brain";
  if (pathLower.includes("ai") || name.includes("ai")) return "ai";
  if (pathLower.includes("intelligence")) return "intelligence";
  if (pathLower.includes("api")) return "api";
  if (pathLower.includes("handler")) return "handler";
  if (pathLower.includes("component")) return "component";
  if (pathLower.includes("page")) return "page";

  if ([".tsx", ".jsx"].includes(ext)) return "react-component";
  if ([".ts", ".js"].includes(ext)) return "module";
  if (ext === ".json") return "config";
  if (ext === ".md") return "documentation";

  return "file";
}

/**
 * 🌳 MULTI-ECOSYSTEM TREE DATA GENERATOR
 */
async function generateMultiEcosystemTreeData(
  projects: EcosystemProject[],
  displayMode: string = "file-types"
): Promise<any> {
  const treeData = {
    name: "Maestro-AI Ecosystem",
    type: "root",
    children: [] as any[],
    stats: {
      totalProjects: 0,
      totalRoutes: 0,
      totalWorking: 0,
      totalMissing: 0,
      healthPercentage: 0,
    },
  };

  let totalRoutes = 0;
  let totalWorking = 0;
  let totalMissing = 0;

  for (const project of projects) {
    totalRoutes += project.stats.total;
    totalWorking += project.stats.working;
    totalMissing += project.stats.missing;

    const projectNode = {
      name: `${project.symbol} ${project.name}`,
      type: "project",
      color: project.color,
      description: project.description,
      stats: project.stats,
      children: [] as any[],
    };

    if (displayMode === "folder-paths") {
      const folderTree = buildFolderTree(project.routes);
      projectNode.children = convertFolderTreeToNodes(
        folderTree,
        project.color
      );
    } else {
      // 🎯 FIXED FILE TYPES MODE: Categorize by ACTUAL LOCATION, not just content
      const categorizedRoutes = categorizeRoutesByActualLocation(
        project.routes,
        project.color
      );
      projectNode.children = categorizedRoutes;
    }

    treeData.children.push(projectNode);
  }

  treeData.stats = {
    totalProjects: projects.length,
    totalRoutes,
    totalWorking,
    totalMissing,
    healthPercentage:
      totalRoutes > 0 ? Math.round((totalWorking / totalRoutes) * 100) : 0,
  };

  return treeData;
}

/**
 * 🎯 FIXED CATEGORIZATION FUNCTION - Prevents artificial brain folders
 */
function categorizeRoutesByActualLocation(
  routes: RouteInfo[],
  projectColor: string
): any[] {
  const categories = new Map<string, RouteInfo[]>();

  routes.forEach((route) => {
    const pathParts = route.path
      .split(path.sep)
      .filter((part) => part.length > 0);
    let category = "📦 Other";

    // 🎯 CRITICAL FIX: Categorize based on PRIMARY folder location first
    const primaryFolder = pathParts[0] || "";

    if (primaryFolder === "brain" || pathParts.includes("brain")) {
      // This is actually a brain file - keep in brain categories
      if (pathParts.includes("guitar")) category = "🧠 Brain - Guitar";
      else if (pathParts.includes("vocal")) category = "🧠 Brain - Vocal";
      else if (pathParts.includes("learning") || pathParts.includes("practice"))
        category = "🧠 Brain - Learning";
      else if (pathParts.includes("audio")) category = "🧠 Brain - Audio";
      else if (pathParts.includes("composition"))
        category = "🧠 Brain - Composition";
      else category = "🧠 Brain - Core";
    } else if (primaryFolder === "src" || pathParts.includes("src")) {
      // This is a src file (UI components, etc.) - separate from brain
      if (pathParts.includes("components")) {
        if (pathParts.includes("guitar")) category = "🎸 UI - Guitar";
        else if (pathParts.includes("vocal")) category = "🎤 UI - Vocal";
        else if (pathParts.includes("practice")) category = "🎵 UI - Practice";
        else category = "🧩 UI - Components";
      } else if (pathParts.includes("hooks")) {
        category = "🔗 Hooks";
      } else if (pathParts.includes("pages") || pathParts.includes("app")) {
        category = "📄 Pages";
      } else if (pathParts.includes("modules")) {
        category = "📦 Modules";
      } else {
        category = "📦 Source Files";
      }
    } else if (primaryFolder === "handlers" || pathParts.includes("handlers")) {
      category = "⚡ Handlers";
    } else if (primaryFolder === "scripts" || pathParts.includes("scripts")) {
      category = "📜 Scripts";
    } else {
      // Fallback - use existing getTypeIcon function
      const routeType = route.type || "unknown";
      category = `${getTypeIcon(routeType)} ${routeType.charAt(0).toUpperCase() + routeType.slice(1)}`;
    }

    if (!categories.has(category)) {
      categories.set(category, []);
    }
    categories.get(category)!.push(route);
  });

  // Convert to tree structure
  const result: any[] = [];
  categories.forEach((routes, categoryName) => {
    if (routes.length > 0) {
      const maxItems = 100;
      const displayRoutes = routes.slice(0, maxItems);
      const hasMore = routes.length > maxItems;

      const categoryNode = {
        name: `${categoryName} (${routes.length}${hasMore ? ", showing " + maxItems : ""})`,
        type: "category",
        color: projectColor,
        children: [] as any[],
      };

      // 🔧 BUILD HIERARCHICAL FOLDER STRUCTURE FOR THIS CATEGORY
      const categoryFolderTree = buildFolderTree(displayRoutes);
      categoryNode.children = convertFolderTreeToNodes(
        categoryFolderTree,
        projectColor
      );

      if (categoryNode.children.length > 0) {
        result.push(categoryNode);
      }
    }
  });

  return result;
}

function getTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    guitar: "🎸",
    vocal: "🎤",
    practice: "🎵",
    tuner: "🎚️",
    metronome: "⏱️",
    jam: "🎶",
    tabs: "🎼",
    brain: "🧠",
    ai: "🤖",
    intelligence: "💡",
    api: "🔌",
    handler: "⚡",
    component: "🧩",
    page: "📄",
    "react-component": "⚛️",
    module: "📦",
    config: "⚙️",
    documentation: "📚",
    file: "📄",
  };
  return icons[type] || "📄";
}

function buildFolderTree(routes: RouteInfo[]): FolderNode {
  const root: FolderNode = { name: "root", children: {}, files: [] };

  routes.forEach((route) => {
    const parts = route.path.split("/").filter((part) => part.length > 0);
    let current = root;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current.children[part]) {
        current.children[part] = { name: part, children: {}, files: [] };
      }
      current = current.children[part];
    }

    if (parts.length > 0) {
      current.files.push(route);
    }
  });

  return root;
}

function convertFolderTreeToNodes(
  folderNode: FolderNode,
  projectColor: string
): any[] {
  const nodes: any[] = [];

  Object.entries(folderNode.children).forEach(([folderName, childNode]) => {
    const folderDisplayNode = {
      name: `📁 ${folderName} (${getFolderStats(childNode)})`,
      type: "folder-node",
      color: projectColor,
      children: convertFolderTreeToNodes(childNode, projectColor),
    };
    nodes.push(folderDisplayNode);
  });

  if (folderNode.files.length > 0) {
    folderNode.files.forEach((file) => {
      nodes.push({
        name: path.basename(file.path),
        fullPath: file.path,
        type: "route",
        status: file.status,
        exists: file.exists,
        url: file.url,
        color: projectColor,
        routeType: file.type,
        warnings: file.warnings, // 🎯 ENHANCED: Include warnings
      });
    });
  }

  return nodes;
}

function getFolderStats(folderNode: FolderNode): string {
  let totalFiles = folderNode.files.length;
  let totalFolders = Object.keys(folderNode.children).length;

  Object.values(folderNode.children).forEach((child) => {
    const childStats = countNestedItems(child);
    totalFiles += childStats.files;
    totalFolders += childStats.folders;
  });

  // 🎯 ENHANCED: Explicitly handle empty folders
  if (totalFolders === 0 && totalFiles === 0) {
    return "0 files";
  } else if (totalFolders > 0 && totalFiles > 0) {
    return `${totalFolders} folders, ${totalFiles} files`;
  } else if (totalFiles > 0) {
    return `${totalFiles} files`;
  } else if (totalFolders > 0) {
    return `${totalFolders} folders`;
  } else {
    return "0 files"; // Fallback for empty
  }
}

function countNestedItems(folderNode: FolderNode): {
  files: number;
  folders: number;
} {
  let files = folderNode.files.length;
  let folders = Object.keys(folderNode.children).length;

  Object.values(folderNode.children).forEach((child) => {
    const childStats = countNestedItems(child);
    files += childStats.files;
    folders += childStats.folders;
  });

  return { files, folders };
}

interface FolderNode {
  name: string;
  children: Record<string, FolderNode>;
  files: RouteInfo[];
}

/**
 * 🤖 AI EXPORT GENERATORS
 */
async function generateAIExports(
  reportsDir: vscode.Uri,
  treeData: any,
  timestamp: number
): Promise<void> {
  const aiExportContent = generateAIExportContent(treeData);
  const asciiTreeContent = generateASCIITreeContent(treeData);
  const markdownContent = generateMarkdownTreeContent(treeData);

  const aiFile = vscode.Uri.joinPath(
    reportsDir,
    `maestro-ai-export-${timestamp}.md`
  );
  const asciiFile = vscode.Uri.joinPath(
    reportsDir,
    `maestro-ascii-tree-${timestamp}.txt`
  );
  const markdownFile = vscode.Uri.joinPath(
    reportsDir,
    `maestro-markdown-tree-${timestamp}.md`
  );

  await vscode.workspace.fs.writeFile(aiFile, Buffer.from(aiExportContent));
  await vscode.workspace.fs.writeFile(asciiFile, Buffer.from(asciiTreeContent));
  await vscode.workspace.fs.writeFile(
    markdownFile,
    Buffer.from(markdownContent)
  );

  console.log("🤖 AI exports generated successfully!");
}

function generateAIExportContent(treeData: any): string {
  const date = new Date().toLocaleString();

  return `# 🤖 Maestro-AI Ecosystem - Complete AI Export

**Generated for AI Consumption:** ${date}
**Export Type:** Complete Ecosystem Overview
**Perfect for:** Claude, GPT, Gemini, Developer Sharing

---

## 📊 Ecosystem Overview

${
  treeData.stats
    ? `
- **Total Projects:** ${treeData.stats.totalProjects}
- **Total Routes:** ${treeData.stats.totalRoutes}
- **Working Routes:** ${treeData.stats.totalWorking}
- **Issues Found:** ${treeData.stats.totalMissing}
- **Health Score:** ${treeData.stats.healthPercentage}%
`
    : ""
}

---

## 🌳 ASCII Tree Structure

\`\`\`
${generateASCIITree(treeData)}
\`\`\`

---

## 📋 Detailed Project Breakdown

${generateDetailedProjectBreakdown(treeData)}

---

**🚀 This export contains everything needed to understand the complete Maestro-AI ecosystem!**

*Generated by Cipher Extension v9 - Ultimate Ecosystem Manager*`;
}

function generateASCIITree(
  node: any,
  prefix: string = "",
  isLast: boolean = true,
  depth: number = 0
): string {
  if (depth > 12) return "";

  let result = "";
  const connector = isLast ? "└── " : "├── ";
  const childPrefix = isLast ? "    " : "│   ";

  result += prefix + connector + getNodeDisplayName(node) + "\n";

  if (node.children && node.children.length > 0) {
    node.children.forEach((child: any, index: number) => {
      const isLastChild = index === node.children.length - 1;
      result += generateASCIITree(
        child,
        prefix + childPrefix,
        isLastChild,
        depth + 1
      );
    });
  }

  return result;
}

function getNodeDisplayName(node: any): string {
  let name = node.name || "Unknown";

  // 🎯 NEW: Handle empty folders first
  if (node.component && node.component.includes("(empty folder)")) {
    return `📁 ${name.replace(" (empty folder)", "")} (0 files)`;
  }

  if (node.type === "project" && node.stats) {
    name += ` (${node.stats.total} routes, ${node.stats.working} working)`;
  } else if (node.type === "category" && node.children) {
    name += ` [${node.children.length} items]`;
  } else if (node.type === "route") {
    const statusIcon =
      node.status === "working"
        ? "✅"
        : node.status === "warning"
          ? "⚠️"
          : "❌";
    name += ` ${statusIcon}`;
  }

  return name;
}

function generateDetailedProjectBreakdown(treeData: any): string {
  let breakdown = "";

  if (treeData.children) {
    treeData.children.forEach((project: any) => {
      breakdown += `### ${project.name}\n`;
      breakdown += `- **Description:** ${project.description}\n`;

      if (project.stats) {
        breakdown += `- **Statistics:**\n`;
        breakdown += `  - Total Files: ${project.stats.files}\n`;
        breakdown += `  - Folders: ${project.stats.folders}\n`;
        breakdown += `  - Working Routes: ${project.stats.working}\n`;
        breakdown += `  - Issues: ${project.stats.missing}\n`;
      }

      breakdown += "\n";
    });
  }

  return breakdown;
}

function generateASCIITreeContent(treeData: any): string {
  const date = new Date().toLocaleString();

  return `# 🌲 Maestro-AI Ecosystem ASCII Tree

Generated: ${date}

${generateASCIITree(treeData)}

---
Export generated by Cipher Extension v9`;
}

function generateMarkdownTreeContent(treeData: any): string {
  const date = new Date().toLocaleString();

  let content = `# 🌳 Maestro-AI Ecosystem Route Tree

**Generated:** ${date}
${
  treeData.stats
    ? `**Total Projects:** ${treeData.stats.totalProjects}
**Total Routes:** ${treeData.stats.totalRoutes}
**Health Score:** ${treeData.stats.healthPercentage}%`
    : ""
}

---

`;

  const generateMarkdownTree = (node: any, depth: number = 0): string => {
    if (depth > 12) return "";

    let result = "";
    const indent = "  ".repeat(depth);
    const bullet = depth === 0 ? "# " : "- ";

    result += `${indent}${bullet}**${node.name}**`;

    if (node.type === "project" && node.stats) {
      result += ` (${node.stats.total} routes, ${node.stats.working} working, ${node.stats.missing} issues)`;
    } else if (node.type === "route") {
      const statusIcon =
        node.status === "working"
          ? "✅"
          : node.status === "warning"
            ? "⚠️"
            : "❌";
      result += ` ${statusIcon}`;
    }

    result += "\n";

    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => {
        result += generateMarkdownTree(child, depth + 1);
      });
    }

    return result;
  };

  content += generateMarkdownTree(treeData);
  content += "\n---\n*Generated by Cipher Extension v9*";

  return content;
}

async function exportForAI(
  reportsDir: vscode.Uri,
  treeData: any,
  timestamp: number
): Promise<void> {
  const content = generateAIExportContent(treeData);
  const file = vscode.Uri.joinPath(reportsDir, `ai-export-${timestamp}.md`);
  await vscode.workspace.fs.writeFile(file, Buffer.from(content));
  vscode.window.showInformationMessage("🤖 AI Export saved!");
}

async function exportASCIITree(
  reportsDir: vscode.Uri,
  treeData: any,
  timestamp: number
): Promise<void> {
  const content = generateASCIITreeContent(treeData);
  const file = vscode.Uri.joinPath(reportsDir, `ascii-tree-${timestamp}.txt`);
  await vscode.workspace.fs.writeFile(file, Buffer.from(content));
  vscode.window.showInformationMessage("🌲 ASCII Tree exported!");
}

async function exportMarkdownTree(
  reportsDir: vscode.Uri,
  treeData: any,
  timestamp: number
): Promise<void> {
  const content = generateMarkdownTreeContent(treeData);
  const file = vscode.Uri.joinPath(reportsDir, `markdown-tree-${timestamp}.md`);
  await vscode.workspace.fs.writeFile(file, Buffer.from(content));
  vscode.window.showInformationMessage("📝 Markdown Tree exported!");
}

async function generateAllExports(
  reportsDir: vscode.Uri,
  treeData: any,
  timestamp: number
): Promise<void> {
  await generateAIExports(reportsDir, treeData, timestamp);
  vscode.window.showInformationMessage(
    "🚀 All exports generated successfully!"
  );
}

/**
 * 🎨 ULTIMATE ECOSYSTEM HTML GENERATOR - ENHANCED WITH WARNING SYSTEM
 */
function generateUltimateEcosystemHTML(
  treeData: any,
  projects: EcosystemProject[]
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌳 Maestro-AI Ultimate Ecosystem Tree</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
    <style>
        body {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #f093fb 100%);
            color: white;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            overflow-x: auto;
        }
        .container {
            max-width: 1600px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .ecosystem-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            display: block;
        }
        #tree-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            min-height: 800px;
            overflow: auto;
        }
        
        .node.cipher circle { fill: #8b5cf6; stroke: #a78bfa; }
        .node.maestro circle { fill: #14b8a6; stroke: #5eead4; }
        .node.ava circle { fill: #ec4899; stroke: #f9a8d4; }
        
        .node.working circle { stroke-width: 3px; filter: drop-shadow(0 0 6px currentColor); }
        
        /* 🎯 ENHANCED: New warning and error styles */
        .node.warning circle { 
            fill: #f59e0b; 
            stroke: #fbbf24; 
            stroke-width: 3px;
            filter: drop-shadow(0 0 8px #f59e0b);
        }
        
        .node.error circle { 
            fill: #ef4444; 
            stroke: #fca5a5; 
            stroke-width: 3px;
            filter: drop-shadow(0 0 8px #ef4444);
            animation: pulse-error 2s infinite;
        }
        
        @keyframes pulse-error {
            0% { filter: drop-shadow(0 0 8px #ef4444); }
            50% { filter: drop-shadow(0 0 12px #ef4444); }
            100% { filter: drop-shadow(0 0 8px #ef4444); }
        }
        
        /* 🎯 ENHANCED: Clickable cursor for files with warnings */
        .node.warning, .node.error {
            cursor: pointer;
        }
        .node.warning:hover circle, .node.error:hover circle {
            stroke-width: 4px;
            transform: scale(1.1);
        }
        
        .node.missing circle { fill: #6b7280; stroke: #9ca3af; }
        .node.project circle { stroke-width: 4px; filter: drop-shadow(0 0 10px currentColor); }
        .node.category circle { opacity: 0.8; }
        
        .node text {
            font: 12px sans-serif;
            fill: white;
            text-anchor: middle;
            dominant-baseline: central;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
            pointer-events: none;
        }
        .node.project text {
            font-weight: bold;
            font-size: 14px;
        }
        
        .link {
            fill: none;
            stroke: rgba(255, 255, 255, 0.6);
            stroke-width: 2px;
        }
        .link.cipher { stroke: rgba(139, 92, 246, 0.7); }
        .link.maestro { stroke: rgba(20, 184, 166, 0.7); }
        .link.ava { stroke: rgba(236, 72, 153, 0.7); }
        
        .tooltip {
            position: absolute;
            background: rgba(0, 0, 0, 0.95);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 12px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
            max-width: 300px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .legend {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 15px;
            font-size: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 250px;
        }
        .legend-section {
            margin-bottom: 15px;
        }
        .legend-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        .legend-color {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-right: 10px;
            box-shadow: 0 0 6px currentColor;
        }
        
        .controls {
            text-align: center;
            margin-bottom: 20px;
        }
        .btn {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            margin: 0 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        .btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .btn.export {
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-color: rgba(255, 255, 255, 0.5);
        }
        .btn.export:hover {
            background: linear-gradient(45deg, #764ba2, #f093fb);
            transform: translateY(-3px);
        }
        .btn.zoom {
            background: linear-gradient(45deg, #14b8a6, #5eead4);
            border-color: rgba(255, 255, 255, 0.5);
        }
        .btn.zoom:hover {
            background: linear-gradient(45deg, #0d9488, #14b8a6);
            transform: translateY(-3px);
        }
        
        .btn.display-mode {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.3);
            margin: 0 5px;
        }
        .btn.display-mode.active {
            background: linear-gradient(45deg, #8b5cf6, #a78bfa);
            border-color: rgba(255, 255, 255, 0.7);
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
        }
        .btn.display-mode:hover {
            background: linear-gradient(45deg, #7c3aed, #8b5cf6);
        }
        
        .search-box {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            margin: 0 10px;
            outline: none;
        }
        .search-box::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .export-section {
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .export-section h3 {
            margin-bottom: 15px;
            color: #f093fb;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌳 Maestro-AI Ultimate Ecosystem Tree</h1>
            <p>Complete multi-project route visualization | Generated: ${new Date().toLocaleString()}</p>
            
            ${
              treeData.stats
                ? `
            <div class="ecosystem-stats">
                <div class="stat-card">
                    <span class="stat-number">${treeData.stats.totalProjects}</span>
                    <div>Projects</div>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${treeData.stats.totalRoutes}</span>
                    <div>Total Routes</div>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${treeData.stats.totalWorking}</span>
                    <div>Working</div>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${treeData.stats.totalMissing}</span>
                    <div>Issues</div>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${treeData.stats.healthPercentage}%</span>
                    <div>Health Score</div>
                </div>
            </div>
            `
                : ""
            }
        </div>

        <div class="export-section">
            <h3>📤 AI-Perfect Exports</h3>
            <button class="btn export" onclick="exportForAI()">🤖 Export for AI</button>
            <button class="btn export" onclick="exportASCIITree()">🌲 ASCII Tree</button>
            <button class="btn export" onclick="exportMarkdown()">📝 Markdown</button>
            <button class="btn export" onclick="exportJSON()">📊 JSON Data</button>
            <button class="btn export" onclick="exportAll()">🚀 Export All</button>
        </div>

        <div class="controls">
            <div style="margin-bottom: 15px;">
                <strong>🎯 Display Mode:</strong>
                <button class="btn display-mode active" id="file-types-btn" onclick="switchDisplayMode('file-types')">🏷️ File Types</button>
                <button class="btn display-mode" id="folder-paths-btn" onclick="switchDisplayMode('folder-paths')">📁 Folder Paths</button>
            </div>
            
            <button class="btn zoom" onclick="zoomIn()">🔍+ Zoom In</button>
            <button class="btn zoom" onclick="zoomOut()">🔍- Zoom Out</button>
            <button class="btn" onclick="resetView()">🎯 Reset View</button>
            <button class="btn" onclick="expandAll()">🌳 Expand All</button>
            <button class="btn" onclick="collapseAll()">📁 Collapse All</button>
            <button class="btn" onclick="focusProject('cipher')">🟣 Focus Cipher</button>
            <button class="btn" onclick="focusProject('maestro')">🟦 Focus Maestro</button>
            <button class="btn" onclick="focusProject('ava')">💗 Focus Ava</button>
            <input type="text" class="search-box" placeholder="🔍 Search routes..." onkeyup="searchRoutes(this.value)">
        </div>

        <div id="tree-container"></div>

        <div class="legend">
            <h3>🎯 Ecosystem Legend</h3>
            
            <div class="legend-section">
                <h4>Projects</h4>
                <div class="legend-item">
                    <div class="legend-color" style="background: #8b5cf6;"></div>
                    <span>🟣 Cipher Engine</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #14b8a6;"></div>
                    <span>🟦 Maestro AI</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #ec4899;"></div>
                    <span>💗 Ava</span>
                </div>
            </div>
            
            <div class="legend-section">
                <h4>Display Modes</h4>
                <div class="legend-item">
                    <div class="legend-color" style="background: #8b5cf6;"></div>
                    <span>🏷️ File Types</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #a78bfa;"></div>
                    <span>📁 Folder Paths</span>
                </div>
            </div>
            
            <div class="legend-section">
                <h4>Status</h4>
                <div class="legend-item">
                    <div class="legend-color" style="background: #10b981; box-shadow: 0 0 10px #10b981;"></div>
                    <span>✅ Working</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #f59e0b; box-shadow: 0 0 8px #f59e0b;"></div>
                    <span>⚠️ Warnings (clickable)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #ef4444; box-shadow: 0 0 8px #ef4444;"></div>
                    <span>🚨 Errors (clickable)</span>
                </div>
            </div>
        </div>

        <div class="tooltip"></div>
    </div>

    <script>
        // 🎯 FIXED VERSION WITH PROPER SCOPING AND ERROR HANDLING + ENHANCED WARNINGS
        const originalTreeData = ${JSON.stringify(treeData, null, 2)};
        const projectsData = ${JSON.stringify(projects, null, 2)};
        
        let currentDisplayMode = 'file-types';
        let currentTreeData = JSON.parse(JSON.stringify(originalTreeData)); // Deep copy
        
        const margin = {top: 40, right: 120, bottom: 40, left: 120};
        const width = 1400 - margin.left - margin.right;
        const height = 1000 - margin.top - margin.bottom;

        const svg = d3.select("#tree-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // 🎯 ZOOM FUNCTIONALITY - DEFINED EARLY
        const zoom = d3.zoom()
            .scaleExtent([0.1, 5])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);

        const tree = d3.tree().size([height, width]);
        let root = d3.hierarchy(currentTreeData);

        let i = 0;
        const duration = 750;

        root.x0 = height / 2;
        root.y0 = 0;

        function collapse(d) {
            if(d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        // 🎯 INITIAL TREE STATE
        if (root.children) {
            root.children.forEach(function(d) {
                if (d.data.type === 'project') {
                    if (d.children) {
                        d.children.forEach(function(categoryNode) {
                            if (categoryNode.data.type === 'category') {
                                collapse(categoryNode);
                            }
                        });
                    }
                }
            });
        }
        
        update(root);

        // 🎯 FIXED DISPLAY MODE SWITCHING
        async function switchDisplayMode(mode) {
            if (currentDisplayMode === mode) return;
            
            try {
                console.log(\`🔄 Switching display mode from \${currentDisplayMode} to \${mode}\`);
                
                // Update button states
                document.querySelectorAll('.btn.display-mode').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.getElementById(mode + '-btn').classList.add('active');
                
                // Store current display mode
                currentDisplayMode = mode;
                
                // Show loading message
                const loadingTooltip = d3.select('.tooltip');
                loadingTooltip.html('🔄 Switching display mode...')
                    .style('left', '50%')
                    .style('top', '50%')
                    .style('opacity', 1);
                
                // Generate new tree data with the selected display mode
                const newTreeData = await generateNewTreeData(projectsData, mode);
                currentTreeData = newTreeData;
                
                // Clear existing tree
                g.selectAll('*').remove();
                
                // Create new hierarchy
                root = d3.hierarchy(newTreeData);
                root.x0 = height / 2;
                root.y0 = 0;
                
                // Apply initial collapse state
                if (root.children) {
                    root.children.forEach(function(projectNode) {
                        if (projectNode.data.type === 'project') {
                            if (projectNode.children) {
                                projectNode.children.forEach(function(categoryNode) {
                                    if (categoryNode.data.type === 'category' || categoryNode.data.type === 'folder-node') {
                                        collapse(categoryNode);
                                    }
                                });
                            }
                        }
                    });
                }
                
                // Render new tree
                update(root);
                
                // Hide loading message
                hideTooltip();
                
                console.log(\`✅ Successfully switched to \${mode} mode\`);
                
            } catch (error) {
                console.error('❌ Display mode switch failed:', error);
                alert('Display mode switch failed. Using Reset to restore...');
                resetView();
            }
        }

        // 🎯 GENERATE NEW TREE DATA FUNCTION
        async function generateNewTreeData(projects, displayMode) {
            const treeData = {
                name: 'Maestro-AI Ecosystem',
                type: 'root',
                children: [],
                stats: originalTreeData.stats // Preserve original stats
            };

            projects.forEach(project => {
                const projectNode = {
                    name: \`\${project.symbol} \${project.name}\`,
                    type: 'project',
                    color: project.color,
                    description: project.description,
                    stats: project.stats,
                    children: []
                };

                if (displayMode === 'folder-paths') {
                    // 📁 FOLDER PATHS MODE
                    const folderTree = buildFolderTreeFromRoutes(project.routes);
                    projectNode.children = convertFolderTreeToDisplayNodes(folderTree, project.color);
                } else {
                    // 🏷️ FILE TYPES MODE (default)
                    const routesByType = project.routes.reduce((acc, route) => {
                        const type = route.type || 'unknown';
                        if (!acc[type]) acc[type] = [];
                        acc[type].push(route);
                        return acc;
                    }, {});

                    Object.entries(routesByType).forEach(([type, routes]) => {
                        if (routes.length > 0) {
                            // 🚀 ENHANCED DISPLAY LIMITS: Consistent 100 items per category
                            const maxItems = 100;
                            const displayRoutes = routes.slice(0, maxItems);
                            const hasMore = routes.length > maxItems;
                            
                            const typeNode = {
                                name: \`\${getTypeIcon(type)} \${type.charAt(0).toUpperCase() + type.slice(1)} (\${routes.length}\${hasMore ? ', showing ' + maxItems : ''})\`,
                                type: 'category',
                                color: project.color,
                                children: displayRoutes.map(route => ({
                                    name: route.path.split('/').pop() || route.path,
                                    fullPath: route.path,
                                    type: 'route',
                                    status: route.status,
                                    exists: route.exists,
                                    url: route.url,
                                    color: project.color,
                                    routeType: route.type,
                                    warnings: route.warnings // 🎯 ENHANCED: Include warnings
                                }))
                            };
                            
                            if (displayRoutes.length > 0) {
                                projectNode.children.push(typeNode);
                            }
                        }
                    });
                }

                treeData.children.push(projectNode);
            });

            return treeData;
        }

        // 🎯 HELPER FUNCTIONS FOR FOLDER TREE
        function buildFolderTreeFromRoutes(routes) {
            const folderTree = { name: 'root', children: {}, files: [] };
            
            routes.forEach(route => {
                const parts = route.path.split('/').filter(part => part.length > 0);
                let current = folderTree;
                
                for (let i = 0; i < parts.length - 1; i++) {
                    const part = parts[i];
                    if (!current.children[part]) {
                        current.children[part] = { name: part, children: {}, files: [] };
                    }
                    current = current.children[part];
                }
                
                if (parts.length > 0) {
                    current.files.push(route);
                }
            });
            
            return folderTree;
        }

        function convertFolderTreeToDisplayNodes(folderNode, projectColor) {
            const nodes = [];
            
            Object.entries(folderNode.children).forEach(([folderName, childNode]) => {
                const stats = getFolderStatsSimple(childNode);
                const folderDisplayNode = {
                    name: \`📁 \${folderName} (\${stats})\`,
                    type: 'folder-node',
                    color: projectColor,
                    children: convertFolderTreeToDisplayNodes(childNode, projectColor)
                };
                nodes.push(folderDisplayNode);
            });
            
            folderNode.files.forEach(file => {
                nodes.push({
                    name: file.path.split('/').pop() || file.path,
                    fullPath: file.path,
                    type: 'route',
                    status: file.status,
                    exists: file.exists,
                    url: file.url,
                    color: projectColor,
                    routeType: file.type,
                    warnings: file.warnings // 🎯 ENHANCED: Include warnings
                });
            });
            
            return nodes;
        }

        function getFolderStatsSimple(folderNode) {
            let totalFiles = folderNode.files.length;
            let totalFolders = Object.keys(folderNode.children).length;
            
            // Count nested
            Object.values(folderNode.children).forEach(child => {
                const childStats = countItems(child);
                totalFiles += childStats.files;
                totalFolders += childStats.folders;
            });
            
            if (totalFolders > 0 && totalFiles > 0) {
                return \`\${totalFolders} folders, \${totalFiles} files\`;
            } else if (totalFiles > 0) {
                return \`\${totalFiles} files\`;
            } else if (totalFolders > 0) {
                return \`\${totalFolders} folders\`;
            } else {
                return '0 files';
            }
        }

        function countItems(folderNode) {
            let files = folderNode.files.length;
            let folders = Object.keys(folderNode.children).length;
            
            Object.values(folderNode.children).forEach(child => {
                const childStats = countItems(child);
                files += childStats.files;
                folders += childStats.folders;
            });
            
            return { files, folders };
        }

        function getTypeIcon(type) {
            const icons = {
                guitar: '🎸', vocal: '🎤', practice: '🎵', tuner: '🎚️', metronome: '⏱️',
                jam: '🎶', tabs: '🎼', brain: '🧠', ai: '🤖', intelligence: '💡',
                api: '🔌', handler: '⚡', component: '🧩', page: '📄',
                'react-component': '⚛️', module: '📦', config: '⚙️', documentation: '📚', file: '📄'
            };
            return icons[type] || '📄';
        }

        function update(source) {
            const treeData = tree(root);
            const nodes = treeData.descendants();
            const links = treeData.descendants().slice(1);

            nodes.forEach(function(d){ d.y = d.depth * 220});

            const node = g.selectAll('g.node')
                .data(nodes, function(d) {return d.id || (d.id = ++i); });

            const nodeEnter = node.enter().append('g')
                .attr('class', function(d) { 
                    let classes = 'node';
                    if (d.data.color) classes += ' ' + d.data.color;
                    if (d.data.status) classes += ' ' + d.data.status;
                    if (d.data.type) classes += ' ' + d.data.type;
                    return classes;
                })
                .attr("transform", function(d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on('click', handleNodeClick) // 🎯 ENHANCED: Use new click handler
                .on('mouseover', showTooltip)
                .on('mouseout', hideTooltip);

            nodeEnter.append('circle')
                .attr('r', 1e-6);

            nodeEnter.append('text')
                .attr("dy", ".35em")
                .attr("x", function(d) {
                    return d.children || d._children ? -20 : 20;
                })
                .attr("text-anchor", function(d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function(d) { return d.data.name; });

            const nodeUpdate = nodeEnter.merge(node);

            nodeUpdate.transition()
                .duration(duration)
                .attr("transform", function(d) { 
                    return "translate(" + d.y + "," + d.x + ")";
                });

            nodeUpdate.select('circle')
                .attr('r', function(d) {
                    if (d.data.type === 'root') return 15;
                    if (d.data.type === 'project') return 12;
                    if (d.data.type === 'category' || d.data.type === 'folder-node') return 8;
                    return 6;
                });

            const nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            nodeExit.select('circle').attr('r', 1e-6);
            nodeExit.select('text').style('fill-opacity', 1e-6);

            const link = g.selectAll('path.link')
                .data(links, function(d) { return d.id; });

            const linkEnter = link.enter().insert('path', "g")
                .attr("class", function(d) {
                    return "link " + (d.data.color || '');
                })
                .attr('d', function(d){
                    var o = {x: source.x0, y: source.y0}
                    return diagonal(o, o)
                });

            const linkUpdate = linkEnter.merge(link);

            linkUpdate.transition()
                .duration(duration)
                .attr('d', function(d){ return diagonal(d, d.parent) });

            link.exit().transition()
                .duration(duration)
                .attr('d', function(d) {
                    var o = {x: source.x, y: source.y}
                    return diagonal(o, o)
                })
                .remove();

            nodes.forEach(function(d){
                d.x0 = d.x;
                d.y0 = d.y;
            });

            function diagonal(s, d) {
                const path = \`M \${s.y} \${s.x}
                        C \${(s.y + d.y) / 2} \${s.x},
                          \${(s.y + d.y) / 2} \${d.x},
                          \${d.y} \${d.x}\`;
                return path;
            }
        }

        // 🎯 ENHANCED: Show detailed warnings in tooltip and enable clicking
        function showTooltip(event, d) {
            const tooltip = d3.select('.tooltip');
            let content = \`<strong>\${d.data.name}</strong><br/>\`;
            
            if (d.data.type === 'project') {
                content += \`<br/><strong>📊 Project Stats:</strong><br/>\`;
                if (d.data.stats) {
                    content += \`📁 Folders: \${d.data.stats.folders}<br/>\`;
                    content += \`📄 Files: \${d.data.stats.files}<br/>\`;
                    content += \`✅ Working: \${d.data.stats.working}<br/>\`;
                    content += \`⚠️ Issues: \${d.data.stats.missing}<br/>\`;
                }
                content += \`<br/>📝 \${d.data.description}\`;
            } else if (d.data.type === 'route') {
                content += \`<br/>📍 Path: \${d.data.fullPath}<br/>\`;
                content += \`🏷️ Type: \${d.data.routeType}<br/>\`;
                content += \`📊 Status: \${d.data.status}<br/>\`;
                
                // 🎯 ENHANCED: Show warning details in tooltip
                if (d.data.warnings && d.data.warnings.length > 0) {
                    const statusIcon = d.data.status === 'error' ? '🚨' : '⚠️';
                    const statusText = d.data.status === 'error' ? 'ERRORS' : 'WARNINGS';
                    content += \`<br/><strong>\${statusIcon} \${statusText} FOUND:</strong><br/>\`;
                    d.data.warnings.slice(0, 3).forEach(warning => {
                        content += \`• \${warning}<br/>\`;
                    });
                    if (d.data.warnings.length > 3) {
                        content += \`• ... and \${d.data.warnings.length - 3} more<br/>\`;
                    }
                    content += \`<br/>💡 <em>Click for detailed view</em>\`;
                }
                
                content += \`<br/>🔗 URL: \${d.data.url}<br/>\`;
                content += \`✅ Exists: \${d.data.exists ? 'Yes' : 'No'}\`;
            } else if (d.data.type === 'category' || d.data.type === 'folder-node') {
                const childCount = d.children ? d.children.length : (d._children ? d._children.length : 0);
                content += \`<br/>📁 Contains: \${childCount} items\`;
            } else if (d.data.type === 'root') {
                content += \`<br/>🌳 Maestro-AI Ecosystem Overview<br/>\`;
                content += \`📊 \${currentTreeData.stats.totalProjects} projects, \${currentTreeData.stats.totalRoutes} routes<br/>\`;
                content += \`💚 Health: \${currentTreeData.stats.healthPercentage}%\`;
            }
            
            tooltip.html(content)
                .style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 10) + 'px')
                .style('opacity', 1);
        }

        // 🎯 NEW: Enhanced click handler with warning details
        function handleNodeClick(event, d) {
            // Check if this is a file with warnings
            if (d.data.type === 'route' && d.data.warnings && d.data.warnings.length > 0) {
                event.stopPropagation();
                showDetailedWarnings(d.data);
                return;
            }
            
            // Default expand/collapse behavior
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }

        // 🎯 NEW: Detailed warning popup - FIXED VERSION
        function showDetailedWarnings(fileData) {
            // Create overlay first
            const overlay = document.createElement('div');
            overlay.style.cssText = [
                'position: fixed',
                'top: 0',
                'left: 0', 
                'width: 100%',
                'height: 100%',
                'background: rgba(0, 0, 0, 0.4)',
                'z-index: 999',
                'backdrop-filter: blur(3px)'
            ].join('; ');
            
            const popup = document.createElement('div');
            popup.style.cssText = [
                'position: fixed',
                'top: 50%', 
                'left: 50%',
                'transform: translate(-50%, -50%)',
                'background: rgba(0, 0, 0, 0.95)',
                'color: white',
                'padding: 25px',
                'border-radius: 15px',
                'max-width: 600px',
                'z-index: 1000',
                'border: 2px solid ' + (fileData.status === 'error' ? '#ef4444' : '#f59e0b'),
                'box-shadow: 0 25px 50px rgba(0,0,0,0.8)',
                'user-select: text',
                'cursor: default',
                'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', // 🎯 FIXED: Better font
                'font-size: 14px', // 🎯 FIXED: Explicit font size
                '-webkit-font-smoothing: antialiased', // 🎯 FIXED: Font smoothing
                'text-rendering: optimizeLegibility' // 🎯 FIXED: Text rendering
            ].join('; ');
            
            const statusIcon = fileData.status === 'error' ? '🚨' : '⚠️';
            const statusText = fileData.status === 'error' ? 'ERRORS' : 'WARNINGS';
            const statusColor = fileData.status === 'error' ? '#ef4444' : '#f59e0b';
            
            const warningsList = fileData.warnings.map(function(warning) {
                return '<li style="margin: 10px 0; line-height: 1.5; user-select: text; cursor: text; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">' + warning + '</li>';
            }).join('');
            
            popup.innerHTML = 
                '<div style="text-align: center; margin-bottom: 20px; user-select: text;">' +
                    '<h3 style="margin: 0; color: ' + statusColor + '; user-select: text; font-size: 18px; font-weight: 600;">' +
                        statusIcon + ' FILE ' + statusText +
                    '</h3>' +
                    '<p style="margin: 10px 0; font-size: 13px; opacity: 0.8; user-select: text; word-break: break-all; background: rgba(255,255,255,0.1); padding: 8px; border-radius: 6px; font-family: monospace;">' +
                        fileData.fullPath +
                    '</p>' +
                '</div>' +
                
                '<div style="text-align: left; user-select: text; margin: 20px 0;">' +
                    '<strong style="user-select: text; font-size: 15px; display: block; margin-bottom: 12px;">Issues Found:</strong>' +
                    '<ul style="margin: 0; padding-left: 20px; user-select: text; list-style-type: none;">' +
                        warningsList +
                    '</ul>' +
                '</div>' +
                
                '<div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">' +
                    '<button id="closeWarningPopup" ' +
                            'style="background: #6b7280; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 0 10px; font-size: 14px; font-weight: 500;">' +
                        'Close' +
                    '</button>' +
                    '<button id="analyzeWarningFile" ' +
                            'style="background: #059669; color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; margin: 0 10px; font-size: 14px; font-weight: 500;">' +
                        '🔍 Run Full Analysis' +
                    '</button>' +
                '</div>';
            
            // Add overlay first, then popup
            document.body.appendChild(overlay);
            document.body.appendChild(popup);
            
            // 🎯 FIXED: Much better event handling - only close on overlay click or Escape
            overlay.addEventListener('click', function() {
                cleanup();
            });
            
            // 🎯 FIXED: Prevent popup from closing when clicking inside it
            popup.addEventListener('click', function(e) {
                e.stopPropagation(); // This prevents the click from bubbling to overlay
            });
            
            // Button handlers
            document.getElementById('closeWarningPopup').addEventListener('click', function(e) {
                e.stopPropagation();
                cleanup();
            });
            
            document.getElementById('analyzeWarningFile').addEventListener('click', function(e) {
                e.stopPropagation();
                // 🎯 SIMPLIFIED: Just show the file path for manual analysis
                alert('📂 Open this file in VS Code and run:\\n> Cipher: Analyze Current File\\n\\nFile: ' + fileData.fullPath);
                cleanup();
            });
            
            // Close on Escape key
            function handleEscape(e) {
                if (e.key === 'Escape') {
                    cleanup();
                }
            }
            document.addEventListener('keydown', handleEscape);
            
            // 🎯 FIXED: Cleanup function
            function cleanup() {
                if (popup.parentNode) popup.remove();
                if (overlay.parentNode) overlay.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        }
        


        // 🎯 INITIALIZE VS CODE INTEGRATION
        setupVSCodeIntegration();

        function hideTooltip() {
            d3.select('.tooltip').style('opacity', 0);
        }

        function expandAll() {
            function expand(d) {
                if (d._children) {
                    d.children = d._children;
                    d._children = null;
                }
                if (d.children) {
                    d.children.forEach(expand);
                }
            }
            expand(root);
            update(root);
        }

        function collapseAll() {
            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }
            if (root.children) {
                root.children.forEach(collapse);
            }
            update(root);
        }

        // 🎯 FIXED RESET VIEW FUNCTION
        function resetView() {
            console.log('🎯 Resetting view to default state...');
            
            try {
                // 1. Reset display mode to file-types
                currentDisplayMode = 'file-types';
                document.querySelectorAll('.btn.display-mode').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.getElementById('file-types-btn').classList.add('active');
                
                // 2. Reset tree data to original
                currentTreeData = JSON.parse(JSON.stringify(originalTreeData));
                
                // 3. Clear existing tree
                g.selectAll('*').remove();
                
                // 4. Recreate tree hierarchy
                root = d3.hierarchy(currentTreeData);
                root.x0 = height / 2;
                root.y0 = 0;
                
                // 5. Apply original collapse state
                if (root.children) {
                    root.children.forEach(function(projectNode) {
                        if (projectNode.data.type === 'project') {
                            if (projectNode.children) {
                                projectNode.children.forEach(function(categoryNode) {
                                    if (categoryNode.data.type === 'category') {
                                        if (categoryNode.children) {
                                            categoryNode._children = categoryNode.children;
                                            categoryNode.children = null;
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
                
                // 6. Reset zoom transform
                svg.transition().duration(750)
                    .call(zoom.transform, d3.zoomIdentity.translate(margin.left, margin.top));
                
                // 7. Clear search
                const searchBox = document.querySelector('.search-box');
                if (searchBox) {
                    searchBox.value = '';
                    searchRoutes('');
                }
                
                // 8. Render reset tree
                update(root);
                
                console.log('✅ View reset successfully!');
                
            } catch (error) {
                console.error('❌ Reset failed:', error);
                alert('Reset failed. Reloading page...');
                window.location.reload();
            }
        }

        function zoomIn() {
            svg.transition().duration(300)
                .call(zoom.scaleBy, 1.5);
        }

        function zoomOut() {
            svg.transition().duration(300)
                .call(zoom.scaleBy, 1 / 1.5);
        }

        function focusProject(projectColor) {
            collapseAll();
            
            setTimeout(() => {
                if (root.children) {
                    root.children.forEach(function(d) {
                        if (d.data.color === projectColor) {
                            if (d._children) {
                                d.children = d._children;
                                d._children = null;
                            }
                        }
                    });
                }
                update(root);
            }, 400);
        }

        function searchRoutes(searchTerm) {
            if (!searchTerm) {
                d3.selectAll('.node').style('opacity', 1);
                return;
            }
            
            const term = searchTerm.toLowerCase();
            
            d3.selectAll('.node').style('opacity', function() {
                const node = d3.select(this);
                const text = node.select('text').text().toLowerCase();
                return text.includes(term) ? 1 : 0.3;
            });
        }

        function exportForAI() {
            const aiExport = generateAIExport(currentTreeData);
            downloadFile(aiExport, 'maestro-ai-export.md', 'text/markdown');
        }

        function exportASCIITree() {
            const asciiTree = generateASCIITreeExport(currentTreeData);
            downloadFile(asciiTree, 'maestro-ascii-tree.txt', 'text/plain');
        }

        function exportMarkdown() {
            const markdown = generateMarkdownExport(currentTreeData);
            downloadFile(markdown, 'maestro-markdown-tree.md', 'text/markdown');
        }

        function exportJSON() {
            const jsonData = JSON.stringify(currentTreeData, null, 2);
            downloadFile(jsonData, 'maestro-tree-data.json', 'application/json');
        }

        function exportAll() {
            console.log('🚀 Starting all exports...');
            exportForAI();
            setTimeout(() => exportASCIITree(), 300);
            setTimeout(() => exportMarkdown(), 600);
            setTimeout(() => exportJSON(), 900);
            setTimeout(() => {
                alert('🚀 All exports completed!\\n\\n📂 Check downloads folder for all files.');
            }, 1200);
        }

        function generateAIExport(data) {
            const date = new Date().toLocaleString();
            return \`# 🤖 Maestro-AI Ecosystem - Complete AI Export

**Generated:** \${date}

## 📊 Ecosystem Overview

\${data.stats ? \`
- **Total Projects:** \${data.stats.totalProjects}
- **Total Routes:** \${data.stats.totalRoutes}
- **Working Routes:** \${data.stats.totalWorking}
- **Issues Found:** \${data.stats.totalMissing}
- **Health Score:** \${data.stats.healthPercentage}%
\` : ''}

## 🌳 ASCII Tree Structure

\\\`\\\`\\\`
\${generateASCIITreeString(data)}
\\\`\\\`\\\`

*Generated by Cipher Extension v9*\`;
        }

        function generateASCIITreeExport(data) {
            const date = new Date().toLocaleString();
            return \`# 🌲 Maestro-AI Ecosystem ASCII Tree

Generated: \${date}

\${generateASCIITreeString(data)}

---
Export generated by Cipher Extension v9\`;
        }

        function generateMarkdownExport(data) {
            const date = new Date().toLocaleString();
            return \`# 🌳 Maestro-AI Ecosystem Route Tree

**Generated:** \${date}
\${data.stats ? \`**Total Projects:** \${data.stats.totalProjects}
**Total Routes:** \${data.stats.totalRoutes}
**Health Score:** \${data.stats.healthPercentage}%\` : ''}

---

\${generateMarkdownTree(data)}

---
*Generated by Cipher Extension v9*\`;
        }

        function generateASCIITreeString(node, prefix = '', isLast = true, depth = 0) {
            if (depth > 12) return '';
            
            let result = '';
            const connector = isLast ? '└── ' : '├── ';
            const childPrefix = isLast ? '    ' : '│   ';
            
            result += prefix + connector + node.name;
            if (node.type === 'project' && node.stats) {
                result += \` (\${node.stats.total} routes, \${node.stats.working} working)\`;
            }
            result += '\\n';
            
            if (node.children && node.children.length > 0) {
                node.children.forEach((child, index) => {
                    const isLastChild = index === node.children.length - 1;
                    result += generateASCIITreeString(child, prefix + childPrefix, isLastChild, depth + 1);
                });
            }
            
            return result;
        }

        function generateMarkdownTree(node, depth = 0) {
            if (depth > 12) return '';
            
            let result = '';
            const indent = '  '.repeat(depth);
            const bullet = depth === 0 ? '# ' : '- ';
            
            result += \`\${indent}\${bullet}**\${node.name}**\`;
            
            if (node.type === 'project' && node.stats) {
                result += \` (\${node.stats.total} routes, \${node.stats.working} working, \${node.stats.missing} issues)\`;
            } else if (node.type === 'route') {
                const statusIcon = node.status === 'working' ? '✅' : 
                                  node.status === 'warning' ? '⚠️' : '❌';
                result += \` \${statusIcon}\`;
            }
            
            result += '\\n';
            
            if (node.children && node.children.length > 0) {
                node.children.forEach(child => {
                    result += generateMarkdownTree(child, depth + 1);
                });
            }
            
            return result;
        }

        function downloadFile(content, filename, mimeType) {
            try {
                const blob = new Blob([content], { type: mimeType });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            } catch (error) {
                console.error('Download failed:', error);
                alert('Download failed. Check console for details.');
            }
        }

        function setupVSCodeIntegration() {
            // This function would handle VS Code integration if needed
            console.log('🔌 VS Code integration ready');
        }
    </script>
</body>
</html>`;
}

interface EcosystemProject {
  name: string;
  symbol: string;
  color: string;
  path: string;
  description: string;
  routes: RouteInfo[];
  stats: ProjectStats;
}

interface ProjectRouteData {
  routes: RouteInfo[];
  stats: ProjectStats;
}

interface ProjectStats {
  total: number;
  working: number;
  missing: number;
  folders: number;
  files: number;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.promises.access(path);
    return true;
  } catch {
    return false;
  }
}
