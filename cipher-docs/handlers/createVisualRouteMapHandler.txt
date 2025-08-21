// 🗺️ createVisualRouteMapHandler - RESTORED GLASSMORPHIC BOXES VERSION
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/createVisualRouteMapHandler.ts
// Fixed: Restored beautiful glassmorphic boxes + markdown reports + proper localhost URLs
// 
// 🎯 UNIFIED REPORTING: Reports now go ONLY to main maestro-ai/cipher-reports
//    - Beautiful glassmorphic boxes restored
//    - Markdown reports with command generation restored
//    - Original localhost URL display restored

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

// ===== ✅ UNIFIED ARCHITECTURE IMPORTS + BRAIN LEARNING =====
import CipherBrainInterface from '../../brain/CipherBrainInterface';
import { AnalysisResult } from '../../shared/types';
import {
    analyzeRouteStructure,
    getBrainInterface,
    isBrainAvailable,
    shareAnalysisData
} from '../../shared/utils';

// =============================================================================
// 🎯 ROUTE MAP TYPES
// =============================================================================

interface RouteNode {
    name: string;
    status: 'working' | 'partial' | 'missing';
    type: 'page' | 'module' | 'api';
    scope: 'maestro' | 'cipher' | 'ava' | 'shared';
    filePath: string;
    brainSuggestions?: string[];
    musicRelated?: boolean;
    url?: string;  
    exists?: boolean;
}

interface RouteMapAnalysis {
    totalRoutes: number;
    workingRoutes: number;
    missingRoutes: number;
    partialRoutes: number;
    musicRoutes: number;
    scopes: string[];
    suggestions: string[];
}

// 🔥 GLOBAL PROVIDER STORAGE - FIX FOR SIDEBAR REFRESH
let globalRouteProvider: RouteTreeProvider | null = null;
let globalTreeView: vscode.TreeView<RouteItem> | null = null;

export async function createVisualRouteMapHandler(): Promise<void> {
    const startTime = Date.now();
    
    try {
        // 🧠 ENHANCED BRAIN LEARNING INTEGRATION
        const brainInterface = getBrainInterface();
        const cipherBrainInterface = CipherBrainInterface.getInstance();
        const hasBrain = !!brainInterface && isBrainAvailable();

        const message = hasBrain ?
            '🗺️ Creating fresh route map with Brain intelligence...' :
            '🗺️ Creating fresh route map...';

        vscode.window.showInformationMessage(message);

        const workspace = vscode.workspace.workspaceFolders?.[0];
        if (!workspace) {
            vscode.window.showErrorMessage('No workspace folder found. Please open a folder in VS Code.');
            
            // 🧠 ENHANCED ERROR LEARNING
            const cipherBrainInterface = CipherBrainInterface.getInstance();
            await cipherBrainInterface.learnFromHandlerAction(
                'createVisualRouteMap',
                'route-map-creation',
                'failure',
                { error: 'No workspace folder found', timestamp: Date.now() }
            );
            
            // 🧠 SHARE WORKSPACE ERROR DATA
            if (isBrainAvailable()) {
                await shareAnalysisData('workspace-error', {
                    error: 'No workspace folder found',
                    handler: 'createVisualRouteMap',
                    timestamp: Date.now()
                });
            }
            return;
        }

        // =================================================================
        // 🔧 UNIFIED PATH DETECTION - Use Main Maestro-AI (Not Engine Clean)
        // =================================================================
        
        const maestroPath = findMainMaestroPath(workspace.uri.fsPath);
        if (!maestroPath) {
            vscode.window.showErrorMessage('❌ Could not locate main maestro-ai folder structure');
            return;
        }

        console.log(`🎯 Using MAIN maestro path: ${maestroPath}`);
        
        // Clean up duplicate report paths from old system
        await cleanupDuplicateReportPaths(maestroPath);

        // =================================================================
        // 🧹 STEP 1: SMART CACHE CLEANING (FIXED - No more archive issues)
        // =================================================================
        
        await smartCacheClean(maestroPath);

        // =================================================================
        // 📊 STEP 2: FRESH ROUTE ANALYSIS
        // =================================================================

        let routes: RouteNode[] = [];
        let analysis: RouteMapAnalysis;

        try {
            console.log('🔍 Performing REAL route analysis (ignoring stale shared utils)...');
            
            // 🔥 PRIMARY: Use our enhanced real route scanner (bypass faulty shared utils)
            routes = await getRealWorkingRoutes(maestroPath);
            console.log(`✅ Real route scanner found: ${routes.length} actual routes`);
            
            // 🔄 SECONDARY: Try shared utils but don't trust it if it gives bad data
            try {
                const routeAnalysis = await analyzeRouteStructure(vscode.Uri.file(maestroPath), hasBrain);
                const sharedUtilsRoutes = convertAnalysisToRouteNodes(routeAnalysis);
                
                console.log(`⚠️ Shared utils found: ${sharedUtilsRoutes.length} routes`);
                console.log(`⚠️ Shared utils routes:`, sharedUtilsRoutes.map(r => `${r.name} (${r.status})`));
                
                // Only use shared utils data if it found working routes, otherwise stick with our scanner
                if (sharedUtilsRoutes.some(r => r.status === 'working')) {
                    console.log('✅ Shared utils found working routes - merging data');
                    routes = mergeRouteData(routes, sharedUtilsRoutes);
                } else {
                    console.log('⚠️ Shared utils found no working routes - using our real scanner only');
                }
                
            } catch (sharedUtilsError) {
                console.warn('⚠️ Shared utils analysis failed, using real scanner:', sharedUtilsError);
            }
            
            vscode.window.showInformationMessage(`🔍 Enhanced scan complete: found ${routes.length} routes (${routes.filter(r => r.status === 'working').length} working)`);

            // 🧠 Enhance routes with brain intelligence
            if (hasBrain) {
                routes = await enhanceRoutesWithBrain(routes);
                
                // 🧠 SHARE ANALYSIS DATA with Brain System
                await shareAnalysisData('route-analysis', {
                    totalRoutes: routes.length,
                    workingRoutes: routes.filter(r => r.status === 'working').length,
                    missingRoutes: routes.filter(r => r.status === 'missing').length,
                    musicRoutes: routes.filter(r => r.musicRelated).length,
                    scopes: [...new Set(routes.map(r => r.scope))],
                    timestamp: Date.now(),
                    maestroPath
                });
            }

            // Create analysis summary
            analysis = analyzeRouteMap(routes);

        } catch (error) {
            console.warn('Route analysis failed:', error);
            
            await cipherBrainInterface.learnFromHandlerAction(
                'createVisualRouteMap',
                'route-analysis',
                'failure',
                { error: String(error), timestamp: Date.now() }
            );
            
            // 🧠 SHARE ANALYSIS ERROR DATA
            if (isBrainAvailable()) {
                await shareAnalysisData('route-analysis-error', {
                    error: String(error),
                    timestamp: Date.now(),
                    maestroPath,
                    context: 'route-structure-analysis'
                });
            }
            
            // Use real working routes as fallback
            routes = await getRealWorkingRoutes(maestroPath);
            analysis = analyzeRouteMap(routes);
        }

        // =================================================================
        // 🎨 STEP 3: UPDATE SIDEBAR WITH FRESH DATA (FIXED)
        // =================================================================

        await updateSidebarWithFreshData(routes, analysis);

        // =================================================================
        // 🌐 STEP 4: GENERATE GLASSMORPHIC HTML + MARKDOWN REPORTS (RESTORED)
        // =================================================================

        const { htmlPath, markdownPath } = await generateGlassmorphicReports(routes, analysis, maestroPath);

        // =================================================================
        // 📊 STEP 5: DISPLAY ANALYSIS RESULTS
        // =================================================================

        if (hasBrain) {
            await displayRouteAnalysisWithBrain(analysis, routes);
        } else {
            await displayBasicRouteAnalysis(analysis, routes);
        }

        // 🔍 DEBUG: Show what we actually found
        await showRouteDebugInfo(routes, maestroPath);

        // =================================================================
        // 🧠 STEP 6: ENHANCED BRAIN LEARNING & DATA SHARING
        // =================================================================

        const duration = Date.now() - startTime;
        
        // 🧠 LEARN FROM ROUTE MAP CREATION
        await cipherBrainInterface.learnFromHandlerAction(
            'createVisualRouteMap',
            'route-map-creation',
            'success',
            {
                totalRoutes: analysis.totalRoutes,
                workingRoutes: analysis.workingRoutes,
                missingRoutes: analysis.missingRoutes,
                musicRoutes: analysis.musicRoutes,
                duration,
                htmlGenerated: !!htmlPath,
                markdownGenerated: !!markdownPath,
                brainEnhanced: hasBrain,
                sidebarRefreshed: true,
                insights: [
                    'Fresh route scan completed',
                    'Glassmorphic boxes restored',
                    'Markdown reports with commands generated',
                    'Sidebar updated with live data',
                    'HTML visualization generated and opened',
                    `${analysis.musicRoutes} music routes detected`,
                    'Reports unified to main maestro-ai path',
                    'Duplicate report paths cleaned up'
                ]
            }
        );

        // 🧠 SHARE COMPREHENSIVE ANALYSIS DATA
        if (hasBrain && isBrainAvailable()) {
            await shareAnalysisData('route-map-success', {
                handler: 'createVisualRouteMap',
                analysis,
                routes: routes.map(r => ({
                    name: r.name,
                    status: r.status,
                    type: r.type,
                    scope: r.scope,
                    musicRelated: r.musicRelated,
                    exists: r.exists
                })),
                performance: {
                    duration,
                    timestamp: Date.now()
                },
                paths: {
                    maestroPath,
                    htmlPath,
                    markdownPath,
                    reportsUnified: true
                }
            });
        }

        // Show completion message
        await showRouteMapComplete(analysis, htmlPath, markdownPath);

    } catch (error) {
        const duration = Date.now() - startTime;
        
        vscode.window.showErrorMessage(`Route map creation failed: ${error}`);

        // 🧠 ENHANCED ERROR LEARNING & DATA SHARING
        const cipherBrainInterface = CipherBrainInterface.getInstance();
        await cipherBrainInterface.learnFromHandlerAction(
            'createVisualRouteMap',
            'route-map-creation',
            'failure',
            {
                error: String(error),
                duration,
                timestamp: Date.now()
            }
        );

        // 🧠 SHARE ERROR DATA with Brain System
        if (isBrainAvailable()) {
            await shareAnalysisData('route-map-error', {
                handler: 'createVisualRouteMap',
                error: String(error),
                duration,
                timestamp: Date.now(),
                context: 'main-handler-execution'
            });
        }
    }
}

// =============================================================================
// 🔧 UNIFIED PATH DETECTION - Main Maestro-AI Only (No Engine Clean)
// =============================================================================

function findMainMaestroPath(currentWorkspacePath: string): string | null {
    // Always use the main maestro-ai path (not cipher-engine-clean-v2)
    const mainMaestroPath = '/Users/brettbolzenthal/Desktop/maestro-ai';
    
    if (fs.existsSync(mainMaestroPath)) {
        console.log('✅ Using MAIN maestro-ai path (unified reports)');
        return mainMaestroPath;
    }
    
    // Fallback: Dynamic detection but ensure we get the main folder
    let searchPath = currentWorkspacePath;
    for (let i = 0; i < 5; i++) {
        const parentPath = path.dirname(searchPath);
        const maestroPath = path.join(parentPath, 'maestro-ai');
        
        // Ensure this is the main maestro-ai, not cipher-engine-clean-v2 
        if (fs.existsSync(maestroPath) && !maestroPath.includes('cipher-engine-clean')) {
            console.log(`✅ Found main maestro-ai at: ${maestroPath}`);
            return maestroPath;
        }
        
        searchPath = parentPath;
        if (parentPath === path.dirname(parentPath)) break; // Reached root
    }
    
    // If we're in cipher-autonomous-dev, navigate to main maestro-ai
    if (currentWorkspacePath.includes('cipher-autonomous-dev')) {
        const parts = currentWorkspacePath.split(path.sep);
        const desktopIndex = parts.findIndex(part => part === 'Desktop');
        
        if (desktopIndex !== -1) {
            const mainPath = path.join(...parts.slice(0, desktopIndex + 1), 'maestro-ai');
            const resolvedPath = path.resolve(mainPath);
            
            if (fs.existsSync(resolvedPath)) {
                console.log(`✅ Found main maestro-ai from extension: ${resolvedPath}`);
                return resolvedPath;
            }
        }
    }
    
    console.warn('❌ Could not locate main maestro-ai folder');
    return null;
}

// =============================================================================
// 🧹 CLEANUP DUPLICATE REPORT PATHS (NEW)
// =============================================================================

async function cleanupDuplicateReportPaths(mainMaestroPath: string): Promise<void> {
    try {
        console.log('🧹 Cleaning up duplicate report paths...');
        
        // List of old/duplicate report paths to clean up
        const duplicatePaths = [
            // Old cipher-engine-clean-v2 reports
            path.join(mainMaestroPath, 'cipher-engine-clean-v2', 'cipher-reports'),
            
            // Old team-reports (unused since 6-27-25)
            path.join(mainMaestroPath, 'team-reports'),
            
            // Scattered log directories
            path.join(mainMaestroPath, 'logs'),
            
            // Old intelligence data paths
            path.join(mainMaestroPath, 'maestro-brain', 'data', 'intelligence', 'cipher-reports')
        ];

        let cleanedCount = 0;
        
        for (const duplicatePath of duplicatePaths) {
            if (fs.existsSync(duplicatePath)) {
                try {
                    // Create archive backup before cleanup
                    const archiveDir = path.join(mainMaestroPath, 'archive', 'old-reports');
                    if (!fs.existsSync(archiveDir)) {
                        fs.mkdirSync(archiveDir, { recursive: true });
                    }
                    
                    const timestamp = Date.now();
                    const backupName = `${path.basename(duplicatePath)}-backup-${timestamp}`;
                    const backupPath = path.join(archiveDir, backupName);
                    
                    // Move to archive instead of deleting
                    if (fs.statSync(duplicatePath).isDirectory()) {
                        fs.renameSync(duplicatePath, backupPath);
                        console.log(`📦 Archived duplicate path: ${duplicatePath} → ${backupPath}`);
                        cleanedCount++;
                    }
                    
                } catch (cleanupError) {
                    console.warn(`Failed to cleanup ${duplicatePath}:`, cleanupError);
                }
            }
        }
        
        // Ensure unified reports directory exists
        const unifiedReportsDir = path.join(mainMaestroPath, 'cipher-reports');
        if (!fs.existsSync(unifiedReportsDir)) {
            fs.mkdirSync(unifiedReportsDir, { recursive: true });
            console.log('📁 Created unified cipher-reports directory');
        }
        
        if (cleanedCount > 0) {
            console.log(`✅ Cleaned up ${cleanedCount} duplicate report paths`);
        } else {
            console.log('✅ No duplicate paths found - reports already unified');
        }
        
    } catch (error) {
        console.warn('Cleanup failed:', error);
    }
}

// =============================================================================
// 🧹 UNIFIED CACHE CLEANING (Main Maestro-AI Only)
// =============================================================================

async function smartCacheClean(maestroPath: string): Promise<void> {
    try {
        console.log('🧹 Smart cache cleaning (unified main maestro-ai only)...');
        
        // Clean cache from MAIN maestro-ai path only
        const unifiedReportsDir = path.join(maestroPath, 'cipher-reports');
        
        // Only clean specific old cache files, not entire directories
        const filesToClean = [
            path.join(unifiedReportsDir, 'route-cache.json'),
            path.join(maestroPath, 'maestro-reports', 'health-latest.json'),
            // Clean any stale health reports older than 24 hours
            path.join(maestroPath, 'maestro-reports', 'route-health-cache.json')
        ];

        for (const filePath of filesToClean) {
            if (fs.existsSync(filePath)) {
                // Check if file is older than 1 hour before cleaning
                const stats = fs.statSync(filePath);
                const oneHourAgo = Date.now() - (60 * 60 * 1000);
                
                if (stats.mtime.getTime() < oneHourAgo) {
                    fs.unlinkSync(filePath);
                    console.log(`🗑️ Cleaned old cache: ${path.basename(filePath)}`);
                }
            }
        }
        
        // Ensure UNIFIED cipher-reports directory exists (main maestro-ai only)
        if (!fs.existsSync(unifiedReportsDir)) {
            fs.mkdirSync(unifiedReportsDir, { recursive: true });
            console.log('📁 Created unified cipher-reports directory');
        }
        
        console.log('✅ Unified cache cleaning completed - reports centralized');
        
    } catch (error) {
        console.warn('Cache cleaning failed:', error);
    }
}

// =============================================================================
// 🎨 SIDEBAR UPDATE WITH FRESH DATA (FIXED)
// =============================================================================

async function updateSidebarWithFreshData(routes: RouteNode[], analysis: RouteMapAnalysis): Promise<void> {
    try {
        if (globalRouteProvider && globalTreeView) {
            // Update existing provider with fresh data
            console.log('🔄 Updating existing sidebar with fresh data...');
            globalRouteProvider.updateData(routes, analysis);
            globalRouteProvider.refresh();
            
            // Update tree view title to show it's refreshed
            globalTreeView.title = `🗺️ Route Map (${routes.length} routes) - Updated ${new Date().toLocaleTimeString()}`;
            
        } else {
            // Create new provider and tree view
            console.log('🆕 Creating new sidebar tree view...');
            globalRouteProvider = new RouteTreeProvider(routes, analysis);
            
            globalTreeView = vscode.window.createTreeView('cipherRouteMap', {
                treeDataProvider: globalRouteProvider,
                showCollapseAll: true,
                canSelectMany: false
            });

            globalTreeView.title = `🗺️ Route Map (${routes.length} routes)`;

            // Register commands for the tree view (with duplicate check)
            const existingCommands = await vscode.commands.getCommands(true);
            
            if (!existingCommands.includes('cipherRouteMap.refresh')) {
                vscode.commands.registerCommand('cipherRouteMap.refresh', async () => {
                    if (globalRouteProvider) {
                        // Re-run full analysis on manual refresh
                        await createVisualRouteMapHandler();
                    }
                });
                console.log('✅ Registered cipherRouteMap.refresh command');
            } else {
                console.log('⚠️ cipherRouteMap.refresh command already exists - skipping registration');
            }
            
            if (!existingCommands.includes('cipherRouteMap.openFile')) {
                vscode.commands.registerCommand('cipherRouteMap.openFile', (route: RouteNode) => openRouteFile(route));
                console.log('✅ Registered cipherRouteMap.openFile command');
            }
            
            if (!existingCommands.includes('cipherRouteMap.createMissing')) {
                vscode.commands.registerCommand('cipherRouteMap.createMissing', (route: RouteNode) => createMissingRoute(route));
                console.log('✅ Registered cipherRouteMap.createMissing command');
            }
        }

        vscode.window.showInformationMessage(`🗺️ Sidebar updated with ${routes.length} routes (${analysis.workingRoutes} working)`);
        
    } catch (error) {
        console.error('Failed to update sidebar:', error);
        vscode.window.showErrorMessage(`Failed to update route map sidebar: ${error}`);
    }
}

// =============================================================================
// 🌟 GENERATE GLASSMORPHIC REPORTS (RESTORED ORIGINAL DESIGN)
// =============================================================================

async function generateGlassmorphicReports(routes: RouteNode[], analysis: RouteMapAnalysis, maestroPath: string): Promise<{ htmlPath: string | null, markdownPath: string | null }> {
    try {
        console.log('🎨 Generating beautiful glassmorphic route map + markdown reports...');
        
        const timestamp = Date.now();
        const unifiedReportsDir = path.join(maestroPath, 'cipher-reports');
        
        // Ensure UNIFIED directory exists
        if (!fs.existsSync(unifiedReportsDir)) {
            fs.mkdirSync(unifiedReportsDir, { recursive: true });
            console.log('📁 Created unified cipher-reports directory (watcher-compatible)');
        }

        // =================================================================
        // 🌟 GENERATE GLASSMORPHIC HTML (RESTORED ORIGINAL BOXES)
        // =================================================================
        
        const htmlContent = generateOriginalGlassmorphicHTML(routes, analysis);
        const htmlPath = path.join(unifiedReportsDir, `route-map-${timestamp}.html`);
        
        fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
        console.log(`📄 Glassmorphic HTML route map saved: ${htmlPath}`);

        // =================================================================
        // 📝 GENERATE MARKDOWN REPORT WITH COMMANDS (RESTORED)
        // =================================================================
        
        const markdownContent = generateMarkdownReportWithCommands(routes, analysis);
        const markdownPath = path.join(unifiedReportsDir, `route-analysis-${timestamp}.md`);
        
        fs.writeFileSync(markdownPath, markdownContent, 'utf-8');
        console.log(`📝 Markdown report with commands saved: ${markdownPath}`);

        // =================================================================
        // 🌐 FORCE OPEN HTML IN BROWSER
        // =================================================================
        
        const uri = vscode.Uri.file(htmlPath);
        
        try {
            const opened = await vscode.env.openExternal(uri);
            
            if (opened) {
                console.log('✅ Glassmorphic route map opened in browser successfully');
                vscode.window.showInformationMessage(`🌐 Beautiful route map opened! (${routes.length} routes with glassmorphic boxes)`);
            }
        } catch (openError) {
            console.warn('Direct browser open failed:', openError);
            
            // Show user prompt to open manually
            const action = await vscode.window.showInformationMessage(
                `📄 Glassmorphic route map generated! Click to open in browser.\nPath: ${htmlPath}`,
                'Open in Browser',
                'Copy Path',
                'Show in Finder'
            );

            if (action === 'Open in Browser') {
                await vscode.env.openExternal(uri);
            } else if (action === 'Copy Path') {
                await vscode.env.clipboard.writeText(htmlPath);
                vscode.window.showInformationMessage('📋 Path copied to clipboard');
            } else if (action === 'Show in Finder') {
                await vscode.env.openExternal(vscode.Uri.file(unifiedReportsDir));
            }
        }

        return { htmlPath, markdownPath };

    } catch (error) {
        console.error('Failed to generate glassmorphic reports:', error);
        vscode.window.showErrorMessage(`Failed to generate reports: ${error}`);
        return { htmlPath: null, markdownPath: null };
    }
}

// =============================================================================
// 🌟 ORIGINAL GLASSMORPHIC HTML GENERATOR (RESTORED)
// =============================================================================

function generateOriginalGlassmorphicHTML(routes: RouteNode[], analysis: RouteMapAnalysis): string {
    const timestamp = new Date().toLocaleString();
    
    // Separate working and missing routes
    const workingRoutes = routes.filter(r => r.status === 'working');
    const missingRoutes = routes.filter(r => r.status === 'missing');
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🌟 Cipher Route Map - Glassmorphic Boxes</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: white;
            padding: 40px 20px;
            overflow-x: auto;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .header {
            text-align: center;
            margin-bottom: 50px;
        }
        
        .header h1 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .stats-bar {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 60px;
        }
        
        .stat-box {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .stat-box:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .stat-number.working { color: #00ff88; }
        .stat-number.missing { color: #ff4757; }
        .stat-number.total { color: #3742fa; }
        .stat-number.music { color: #ffa502; }
        
        .stat-label {
            font-size: 1.1rem;
            font-weight: 600;
            opacity: 0.9;
        }
        
        .section {
            margin-bottom: 60px;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 30px;
            text-align: center;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .section-title.working { color: #00ff88; }
        .section-title.missing { color: #ff4757; }
        
        .routes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
        }
        
        .route-box {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .route-box:hover {
            transform: translateY(-8px) scale(1.02);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
        }
        
        .route-box.working {
            border-left: 6px solid #00ff88;
        }
        
        .route-box.missing {
            border-left: 6px solid #ff4757;
        }
        
        .route-box.music::before {
            content: '🎵';
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 1.5rem;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .route-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .route-url {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 20px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 1rem;
            font-weight: 500;
        }
        
        .route-url a {
            color: #74b9ff;
            text-decoration: none;
            transition: all 0.3s ease;
            display: block;
            word-break: break-all;
        }
        
        .route-url a:hover {
            color: #0984e3;
            text-shadow: 0 0 10px rgba(116, 185, 255, 0.5);
        }
        
        .route-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .route-detail {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 12px;
            text-align: center;
            font-weight: 600;
        }
        
        .route-detail .label {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-bottom: 5px;
        }
        
        .route-detail .value {
            font-size: 1.1rem;
            font-weight: 700;
        }
        
        .status-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .status-badge.working {
            background: linear-gradient(135deg, #00ff88, #00b894);
            color: white;
            box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
        }
        
        .status-badge.working::before {
            content: '✓';
            font-size: 1.1rem;
            font-weight: 900;
        }
        
        .status-badge.missing {
            background: linear-gradient(135deg, #ff4757, #e84393);
            color: white;
            box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
        }
        
        .status-badge.missing::before {
            content: '✕';
            font-size: 1.1rem;
            font-weight: 900;
        }
        
        .missing-hint {
            background: rgba(255, 71, 87, 0.1);
            border: 1px solid rgba(255, 71, 87, 0.3);
            border-radius: 12px;
            padding: 15px;
            margin-top: 15px;
            font-size: 0.95rem;
            line-height: 1.5;
        }
        
        .footer {
            text-align: center;
            margin-top: 60px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 768px) {
            .stats-bar {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .routes-grid {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .route-name {
                font-size: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌟 Cipher Route Map</h1>
            <p>Beautiful Glassmorphic Route Visualization • Generated: ${timestamp}</p>
        </div>

        <div class="stats-bar">
            <div class="stat-box">
                <div class="stat-number working">${analysis.workingRoutes}</div>
                <div class="stat-label">✅ Working Routes</div>
            </div>
            <div class="stat-box">
                <div class="stat-number missing">${analysis.missingRoutes}</div>
                <div class="stat-label">❌ Missing Routes</div>
            </div>
            <div class="stat-box">
                <div class="stat-number total">${analysis.totalRoutes}</div>
                <div class="stat-label">📊 Total Routes</div>
            </div>
            <div class="stat-box">
                <div class="stat-number music">${analysis.musicRoutes}</div>
                <div class="stat-label">🎵 Music Routes</div>
            </div>
        </div>

        ${workingRoutes.length > 0 ? `
        <div class="section">
            <h2 class="section-title working">✅ Working Routes (${workingRoutes.length})</h2>
            <div class="routes-grid">
                ${workingRoutes.map(route => `
                    <div class="route-box working ${route.musicRelated ? 'music' : ''}">
                        <div class="status-badge working">Working</div>
                        <div class="route-name">${route.name}</div>
                        <div class="route-url">
                            <a href="http://localhost:3000${route.name}" target="_blank">
                                localhost:3000${route.name}
                            </a>
                        </div>
                        <div class="route-details">
                            <div class="route-detail">
                                <div class="label">Type</div>
                                <div class="value">${route.type}</div>
                            </div>
                            <div class="route-detail">
                                <div class="label">Scope</div>
                                <div class="value">${route.scope}</div>
                            </div>
                        </div>
                        ${route.musicRelated ? '<div style="text-align: center; opacity: 0.8;">🎵 Music-Related Route</div>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        ${missingRoutes.length > 0 ? `
        <div class="section">
            <h2 class="section-title missing">❌ Missing Routes (${missingRoutes.length})</h2>
            <div class="routes-grid">
                ${missingRoutes.map(route => `
                    <div class="route-box missing ${route.musicRelated ? 'music' : ''}">
                        <div class="status-badge missing">Missing</div>
                        <div class="route-name">${route.name}</div>
                        <div class="route-url">
                            <span style="opacity: 0.7;">Would be: localhost:3000${route.name}</span>
                        </div>
                        <div class="route-details">
                            <div class="route-detail">
                                <div class="label">Type</div>
                                <div class="value">${route.type}</div>
                            </div>
                            <div class="route-detail">
                                <div class="label">Scope</div>
                                <div class="value">${route.scope}</div>
                            </div>
                        </div>
                        ${route.musicRelated ? '<div style="text-align: center; opacity: 0.8;">🎵 Music-Related Route</div>' : ''}
                        <div class="missing-hint">
                            💡 This route needs to be created. Run: <strong>Cipher: Create Module Structure → ${route.name.substring(1)}</strong>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}

        <div class="footer">
            <h3>🔄 Live Route Data</h3>
            <p>This beautiful glassmorphic visualization shows real-time route data from your Cipher project.</p>
            <p><strong>Last Updated:</strong> ${timestamp}</p>
            <p>Run the <em>Cipher Route Map</em> command in VS Code to refresh this data.</p>
        </div>
    </div>
</body>
</html>`;
}

// =============================================================================
// 📝 MARKDOWN REPORT GENERATOR WITH COMMANDS (RESTORED)
// =============================================================================

function generateMarkdownReportWithCommands(routes: RouteNode[], analysis: RouteMapAnalysis): string {
    const timestamp = new Date().toISOString();
    const workingRoutes = routes.filter(r => r.status === 'working');
    const missingRoutes = routes.filter(r => r.status === 'missing');
    
    return `---
*Generated by Cipher Route Analysis System*

# 🗺️ CIPHER ROUTE ANALYSIS REPORT

## 📅 Generated: ${timestamp}

### 🛣️ CURRENT ROUTE STRUCTURE:
${workingRoutes.map(route => `- ✅ ${route.name} → ${route.url || `localhost:3000${route.name}`}${route.musicRelated ? ' 🎵' : ''}`).join('\n')}

### ⚠️ ROUTE ISSUES IDENTIFIED:
${missingRoutes.map(route => `- ❌ Missing ${route.type} route: ${route.name}${route.musicRelated ? ' 🎵' : ''}`).join('\n')}

### 🎯 RECOMMENDED ROUTE STRUCTURE:
- ✅ / → localhost:3000 (Main platform)
${routes.map(route => {
    const emoji = route.musicRelated ? '🎵' : '🔧';
    const description = getRouteDescription(route.name);
    return `- ${route.status === 'working' ? '✅' : '🎸'} ${route.name} → localhost:3000${route.name} (${description})`;
}).join('\n')}

### 🚀 AUTO-CREATION RECOMMENDATIONS:
${missingRoutes.map(route => `- Run: **Cipher: Create Module Structure → ${route.name.substring(1)}**`).join('\n')}

### 📊 ANALYSIS SUMMARY:
- **Total Routes Analyzed:** ${analysis.totalRoutes}
- **Working Routes:** ${analysis.workingRoutes} ✅
- **Missing Routes:** ${analysis.missingRoutes} ❌
- **Music Routes:** ${analysis.musicRoutes} 🎵
- **Scopes:** ${analysis.scopes.join(', ')}

### 🧠 BRAIN INSIGHTS:
${analysis.suggestions.map(suggestion => `- 💡 ${suggestion}`).join('\n')}

### 🎯 NEXT ACTIONS:
1. **Fix Missing Routes:** Run the auto-creation commands above
2. **Test Working Routes:** Verify all working routes are accessible
3. **Optimize Music Routes:** Consider consolidating music functionality
4. **Update Documentation:** Reflect current route structure in docs

---
*Generated by Cipher Route Analysis System*
*Last Updated: ${timestamp}*
`;
}

function getRouteDescription(routeName: string): string {
    const descriptions: { [key: string]: string } = {
        '/practice': 'Practice Generator',
        '/jam': 'JamZone',
        '/tuner': 'TE Tuner',
        '/vocal': 'Singers Corner',
        '/metronome': 'Smart Metronome',
        '/tabs': 'Songsterr Clone',
        '/api': 'API Endpoints',
        '/cipher': 'Cipher Main',
        '/_app': 'Next.js App Root'
    };
    
    return descriptions[routeName] || 'Custom Route';
}

// =============================================================================
// 🛠️ UTILITY FUNCTIONS (ALL INCLUDED - SAME AS BEFORE)
// =============================================================================

async function getRealWorkingRoutes(maestroPath: string): Promise<RouteNode[]> {
    // Enhanced route scanner - finds ACTUAL working routes in the project
    const workingRoutes: RouteNode[] = [];
    
    try {
        console.log(`🔍 Scanning for REAL routes in: ${maestroPath}`);
        
        // Updated to check new path structure: /Users/brettbolzenthal/Desktop/maestro-ai/src/app/tuner
        const possiblePageDirs = [
            path.join(maestroPath, 'src', 'app'),  // New Next.js App Router structure
            path.join(maestroPath, 'src', 'pages'),
            path.join(maestroPath, 'pages'),
            path.join(maestroPath, 'app')
        ];

        for (const pagesDir of possiblePageDirs) {
            if (fs.existsSync(pagesDir)) {
                console.log(`✅ Found pages directory: ${pagesDir}`);
                const pages = fs.readdirSync(pagesDir, { withFileTypes: true });
                
                for (const page of pages) {
                    if (page.isDirectory() || page.name.endsWith('.tsx') || page.name.endsWith('.ts') || page.name.endsWith('.js')) {
                        const routeName = page.isDirectory() ? `/${page.name}` : `/${page.name.replace(/\.(tsx?|js)$/, '')}`;
                        
                        // Skip Next.js internal files
                        if (routeName.startsWith('/_') && routeName !== '/_app') continue;
                        
                        const isWorking = await checkRouteExists(maestroPath, routeName);
                        const status = isWorking ? 'working' : 'missing';
                        
                        console.log(`${isWorking ? '✅' : '❌'} Route ${routeName}: ${status}`);
                        
                        workingRoutes.push({
                            name: routeName,
                            status,
                            type: routeName.includes('api') ? 'api' : 'page',
                            scope: detectRouteScope(routeName),
                            filePath: path.relative(maestroPath, path.join(pagesDir, page.name)),
                            musicRelated: isMusicRoute(routeName),
                            exists: isWorking,
                            url: `localhost:3000${routeName}`
                        });
                    }
                }
                break; // Use first found pages directory
            }
        }
        
        // Add common API routes if they exist
        const apiPaths = [
            path.join(maestroPath, 'src', 'app', 'api'),
            path.join(maestroPath, 'src', 'pages', 'api'),
            path.join(maestroPath, 'pages', 'api'),
        ];
        
        for (const apiPath of apiPaths) {
            if (fs.existsSync(apiPath)) {
                console.log(`✅ Found API directory: ${apiPath}`);
                workingRoutes.push({
                    name: '/api',
                    status: 'working',
                    type: 'api',
                    scope: 'maestro',
                    filePath: path.relative(maestroPath, apiPath),
                    musicRelated: false,
                    exists: true,
                    url: 'localhost:3000/api'
                });
                break;
            }
        }
        
        // Check for the specific music routes that keep showing as "missing"
        const musicRoutes = ['/practice', '/tuner', '/metronome', '/jam', '/vocal', '/tabs'];
        
        for (const musicRoute of musicRoutes) {
            const exists = await checkRouteExists(maestroPath, musicRoute);
            const existingRoute = workingRoutes.find(r => r.name === musicRoute);
            
            if (!existingRoute) {
                console.log(`🎵 Music route ${musicRoute}: ${exists ? 'EXISTS but not detected' : 'missing'}`);
                workingRoutes.push({
                    name: musicRoute,
                    status: exists ? 'working' : 'missing',
                    type: 'page',
                    scope: detectRouteScope(musicRoute),
                    filePath: `src/app${musicRoute}`,  // Updated path structure
                    musicRelated: true,
                    exists,
                    url: `localhost:3000${musicRoute}`
                });
            }
        }
        
        console.log(`📊 Real scanner found ${workingRoutes.length} total routes, ${workingRoutes.filter(r => r.status === 'working').length} working`);
        
    } catch (error) {
        console.warn('Failed to scan for real routes:', error);
    }
    
    // Ensure we always return at least _app if nothing else found
    if (workingRoutes.length === 0) {
        workingRoutes.push({
            name: '/_app',
            status: 'working',
            type: 'page',
            scope: 'shared',
            filePath: 'src/app/_app.tsx',
            musicRelated: false,
            exists: true,
            url: 'localhost:3000/_app'
        });
    }
    
    return workingRoutes;
}

// =============================================================================
// 🔍 ROUTE EXISTENCE CHECKER (UPDATED FOR NEW PATH STRUCTURE)
// =============================================================================

async function checkRouteExists(maestroPath: string, routeName: string): Promise<boolean> {
    // Check multiple possible locations for the route
    const routePath = routeName === '/' ? '/index' : routeName;
    
    // Updated for new structure: /Users/brettbolzenthal/Desktop/maestro-ai/src/app/tuner
    const possiblePaths = [
        // Next.js App Router (new structure)
        path.join(maestroPath, 'src', 'app', routePath.substring(1), 'page.tsx'),
        path.join(maestroPath, 'src', 'app', routePath.substring(1), 'page.ts'),
        path.join(maestroPath, 'src', 'app', routePath.substring(1), 'layout.tsx'),
        path.join(maestroPath, 'app', routePath.substring(1), 'page.tsx'),
        
        // Directory exists (for app router)
        path.join(maestroPath, 'src', 'app', routePath.substring(1)),
        path.join(maestroPath, 'app', routePath.substring(1)),
        
        // Next.js Pages Router (legacy)
        path.join(maestroPath, 'src', 'pages', `${routePath}.tsx`),
        path.join(maestroPath, 'src', 'pages', `${routePath}.ts`),
        path.join(maestroPath, 'src', 'pages', `${routePath}.js`),
        path.join(maestroPath, 'pages', `${routePath}.tsx`),
        path.join(maestroPath, 'pages', `${routePath}.ts`),
        
        // Directory with index file
        path.join(maestroPath, 'src', 'pages', routePath.substring(1), 'index.tsx'),
        path.join(maestroPath, 'src', 'pages', routePath.substring(1), 'index.ts'),
        path.join(maestroPath, 'pages', routePath.substring(1), 'index.tsx'),
        
        // Component directories (for routes like /practice, /tuner, etc.)
        path.join(maestroPath, 'src', 'components', routePath.substring(1)),
        path.join(maestroPath, 'components', routePath.substring(1)),
    ];

    for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
            console.log(`✅ Found route ${routeName} at: ${possiblePath}`);
            return true;
        }
    }
    
    // Additional check: Look for any file/folder containing the route name
    try {
        const searchDirs = [
            path.join(maestroPath, 'src'),
            path.join(maestroPath, 'components'),
            maestroPath
        ];
        
        for (const searchDir of searchDirs) {
            if (fs.existsSync(searchDir)) {
                const found = await findRouteInDirectory(searchDir, routeName.substring(1));
                if (found) {
                    console.log(`✅ Found route ${routeName} via search in: ${found}`);
                    return true;
                }
            }
        }
    } catch (searchError) {
        console.warn(`Search failed for ${routeName}:`, searchError);
    }
    
    console.log(`❌ Route ${routeName} not found in any expected location`);
    return false;
}

async function findRouteInDirectory(dir: string, routeName: string): Promise<string | null> {
    try {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        
        for (const item of items) {
            const itemPath = path.join(dir, item.name);
            
            if (item.isDirectory()) {
                // Check if directory name matches route
                if (item.name.toLowerCase() === routeName.toLowerCase()) {
                    return itemPath;
                }
                
                // Recursively search subdirectories (limit depth)
                if (!item.name.startsWith('.') && !item.name.includes('node_modules')) {
                    const found = await findRouteInDirectory(itemPath, routeName);
                    if (found) return found;
                }
            } else if (item.isFile()) {
                // Check if file name matches route (without extension)
                const nameWithoutExt = path.parse(item.name).name;
                if (nameWithoutExt.toLowerCase() === routeName.toLowerCase()) {
                    return itemPath;
                }
            }
        }
    } catch (error) {
        // Ignore permission errors etc.
    }
    
    return null;
}

// =============================================================================
// 🔄 ROUTE DATA MERGER (SAME AS BEFORE)
// =============================================================================

function mergeRouteData(realRoutes: RouteNode[], sharedUtilsRoutes: RouteNode[]): RouteNode[] {
    const merged = [...realRoutes];
    
    // Add any additional routes from shared utils that we didn't find
    for (const sharedRoute of sharedUtilsRoutes) {
        const existingRoute = merged.find(r => r.name === sharedRoute.name);
        
        if (!existingRoute) {
            // Add new route from shared utils
            merged.push(sharedRoute);
        } else if (existingRoute.status === 'missing' && sharedRoute.status === 'working') {
            // Update status if shared utils found it working
            existingRoute.status = 'working';
            existingRoute.exists = true;
        }
    }
    
    return merged;
}

function convertAnalysisToRouteNodes(analysis: AnalysisResult): RouteNode[] {
    return analysis.routes.map(route => ({
        name: route.path,
        status: route.exists ? 'working' : 'missing',
        type: (route.type as "page" | "module" | "api") || "module",
        scope: detectRouteScope(route.path) as "cipher" | "maestro" | "ava" | "shared",
        filePath: route.path,
        musicRelated: isMusicRoute(route.path),
        exists: route.exists
    }));
}

function detectRouteScope(routePath: string): 'maestro' | 'cipher' | 'ava' | 'shared' {
    // More precise scope detection
    if (routePath.startsWith('/api') || routePath.includes('/brain')) return 'maestro';
    if (routePath.startsWith('/practice') || routePath.startsWith('/analysis') || routePath.startsWith('/tuner')) return 'cipher';
    if (routePath.startsWith('/ui') || routePath.startsWith('/components') || routePath.startsWith('/tabs')) return 'ava';
    if (routePath.startsWith('/_') || routePath.startsWith('/shared')) return 'shared';
    
    // Music routes default to cipher
    if (isMusicRoute(routePath)) return 'cipher';
    
    return 'shared';
}

function isMusicRoute(routeName: string): boolean {
    const musicKeywords = ['practice', 'tuner', 'metronome', 'jam', 'vocal', 'tabs', 'guitar', 'chord', 'lyrics', 'song', 'audio', 'music'];
    return musicKeywords.some(keyword => routeName.toLowerCase().includes(keyword));
}

function analyzeRouteMap(routes: RouteNode[]): RouteMapAnalysis {
    return {
        totalRoutes: routes.length,
        workingRoutes: routes.filter(r => r.status === 'working').length,
        missingRoutes: routes.filter(r => r.status === 'missing').length,
        partialRoutes: routes.filter(r => r.status === 'partial').length,
        musicRoutes: routes.filter(r => r.musicRelated).length,
        scopes: [...new Set(routes.map(r => r.scope))],
        suggestions: generateRouteMapSuggestions(routes)
    };
}

function generateRouteMapSuggestions(routes: RouteNode[]): string[] {
    const suggestions: string[] = [];

    const missingRoutes = routes.filter(r => r.status === 'missing');
    const musicRoutes = routes.filter(r => r.musicRelated);

    if (missingRoutes.length > 0) {
        suggestions.push(`Create ${missingRoutes.length} missing routes`);
    }

    if (musicRoutes.length > 5) {
        suggestions.push('Consider organizing music routes into modules');
    }

    if (routes.filter(r => r.scope === 'shared').length === 0) {
        suggestions.push('Add shared utilities for route management');
    }

    return suggestions;
}

// =============================================================================
// 🧠 BRAIN ENHANCEMENT FUNCTIONS (SAME AS BEFORE)
// =============================================================================

async function enhanceRoutesWithBrain(routes: RouteNode[]): Promise<RouteNode[]> {
    if (!routes || routes.length === 0) {
        return [];
    }

    try {
        const brainInterface = getBrainInterface();
        const cipherBrainInterface = CipherBrainInterface.getInstance();
        
        if (!brainInterface) {
            console.warn('Brain interface not available for route enhancement');
            return routes;
        }

        // Get brain suggestions
        const suggestions = await brainInterface.getPersonalizedSuggestions?.() || [];
        
        const enhancedRoutes = routes.map(route => {
            const enhanced: RouteNode = { ...route };

            // Add music detection
            enhanced.musicRelated = isMusicRoute(route.name);
            
            // Add URL for working routes
            if (route.status === 'working') {
                enhanced.url = `localhost:3000${route.name}`;
                enhanced.exists = true;
            } else {
                enhanced.exists = false;
            }

            // Add brain-powered route type detection
            if (!enhanced.type || enhanced.type === 'module') {
                if (route.name.includes('api')) {
                    enhanced.type = 'api';
                } else if (route.name.includes('component') || route.name.includes('practice')) {
                    enhanced.type = 'module';
                } else {
                    enhanced.type = 'page';
                }
            }

            // Add brain suggestions for music routes
            if (enhanced.musicRelated) {
                const musicSuggestions = suggestions.filter(s =>
                    s.toLowerCase().includes(route.name.toLowerCase().substring(1)) ||
                    s.includes('🎵') || s.includes('🎸') || s.includes('🎤')
                );

                if (musicSuggestions.length > 0) {
                    enhanced.brainSuggestions = musicSuggestions;
                }

                // Add default music suggestions for missing routes
                if (route.status === 'missing') {
                    enhanced.brainSuggestions = [
                        ...(enhanced.brainSuggestions || []),
                        `🎵 Consider implementing ${route.name} for enhanced music functionality`,
                        `🧠 Brain can auto-generate ${route.name} component with music intelligence`
                    ];
                }
            }

            // Improve scope detection
            enhanced.scope = detectRouteScope(route.name);

            return enhanced;
        });

        // 🧠 LEARN FROM ROUTE ENHANCEMENT
        await cipherBrainInterface.learnFromHandlerAction(
            'routeEnhancement',
            'route-analysis',
            'success',
            {
                routesEnhanced: enhancedRoutes.length,
                musicRoutesFound: enhancedRoutes.filter(r => r.musicRelated).length,
                brainSuggestionsAdded: enhancedRoutes.filter(r => r.brainSuggestions?.length).length
            }
        );

        return enhancedRoutes;

    } catch (error) {
        console.warn('Brain enhancement failed:', error);
        return routes;
    }
}

// =============================================================================
// 🌳 ENHANCED ROUTE TREE PROVIDER (SAME AS BEFORE)
// =============================================================================

class RouteTreeProvider implements vscode.TreeDataProvider<RouteItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<RouteItem | undefined | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData: vscode.Event<RouteItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor(
        private routes: RouteNode[],
        private analysis: RouteMapAnalysis
    ) { }

    // 🔥 NEW METHOD: Update data and refresh
    updateData(routes: RouteNode[], analysis: RouteMapAnalysis): void {
        this.routes = routes;
        this.analysis = analysis;
        console.log(`🔄 Provider data updated: ${routes.length} routes, ${analysis.workingRoutes} working`);
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
        console.log('🔄 Tree view refreshed with fresh data');
    }

    getTreeItem(element: RouteItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: RouteItem): Thenable<RouteItem[]> {
        if (!element) {
            // Top level: Show live summary + working/missing routes
            const summaryItem = new RouteItem(
                `📊 LIVE Route Summary (${this.analysis.totalRoutes} total, ${this.analysis.workingRoutes} working)`,
                vscode.TreeItemCollapsibleState.Collapsed,
                'summary',
                undefined,
                undefined,
                this.analysis
            );

            const workingItem = new RouteItem(
                `✅ Working Routes (${this.analysis.workingRoutes})`,
                vscode.TreeItemCollapsibleState.Collapsed,
                'working-category'
            );

            const missingItem = new RouteItem(
                `❌ Missing Routes (${this.analysis.missingRoutes})`,
                vscode.TreeItemCollapsibleState.Collapsed,
                'missing-category'
            );

            return Promise.resolve([summaryItem, workingItem, missingItem]);

        } else if (element.type === 'summary') {
            // Summary children: Show live statistics
            return Promise.resolve([
                new RouteItem(`✅ Working: ${this.analysis.workingRoutes}`, vscode.TreeItemCollapsibleState.None, 'stat'),
                new RouteItem(`❌ Missing: ${this.analysis.missingRoutes}`, vscode.TreeItemCollapsibleState.None, 'stat'),
                new RouteItem(`🎵 Music Routes: ${this.analysis.musicRoutes}`, vscode.TreeItemCollapsibleState.None, 'stat'),
                new RouteItem(`📊 Total Analyzed: ${this.analysis.totalRoutes}`, vscode.TreeItemCollapsibleState.None, 'stat'),
                new RouteItem(`🎯 Scopes: ${this.analysis.scopes.join(', ')}`, vscode.TreeItemCollapsibleState.None, 'stat')
            ]);

        } else if (element.type === 'working-category') {
            // Working routes
            const workingRoutes = this.routes.filter(r => r.status === 'working');
            return Promise.resolve(
                workingRoutes.map(route =>
                    new RouteItem(
                        route.name,
                        vscode.TreeItemCollapsibleState.None,
                        'route',
                        route.scope,
                        route
                    )
                )
            );

        } else if (element.type === 'missing-category') {
            // Missing routes
            const missingRoutes = this.routes.filter(r => r.status === 'missing');
            return Promise.resolve(
                missingRoutes.map(route =>
                    new RouteItem(
                        route.name,
                        vscode.TreeItemCollapsibleState.None,
                        'route',
                        route.scope,
                        route
                    )
                )
            );

        } else {
            return Promise.resolve([]);
        }
    }
}

class RouteItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly type: 'summary' | 'working-category' | 'missing-category' | 'route' | 'stat',
        public readonly scope?: string,
        public readonly route?: RouteNode,
        public readonly analysis?: RouteMapAnalysis
    ) {
        super(label, collapsibleState);

        this.contextValue = type;

        if (type === 'route' && route) {
            // Set icon based on status
            switch (route.status) {
                case 'working':
                    this.iconPath = new vscode.ThemeIcon('check', new vscode.ThemeColor('testing.iconPassed'));
                    break;
                case 'missing':
                    this.iconPath = new vscode.ThemeIcon('error', new vscode.ThemeColor('testing.iconFailed'));
                    break;
            }

            // Add music indicator
            if (route.musicRelated) {
                this.label = `🎵 ${this.label}`;
            }

            // Set tooltip with live data
            this.tooltip = `${route.name}
Type: ${route.type}
Scope: ${route.scope}
Status: ${route.status}
URL: ${route.url || 'Not available'}
${route.musicRelated ? 'Music-related route 🎵' : ''}
${route.brainSuggestions ? `Brain Suggestions: ${route.brainSuggestions.length}` : ''}
Last Updated: ${new Date().toLocaleTimeString()}`;
        }
    }
}

// =============================================================================
// 🛠️ COMMAND HANDLERS (SAME AS BEFORE)
// =============================================================================

async function openRouteFile(route: RouteNode): Promise<void> {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) return;

    const maestroPath = findMainMaestroPath(workspace.uri.fsPath);
    if (!maestroPath) {
        vscode.window.showErrorMessage('❌ Could not locate main maestro-ai folder structure');
        return;
    }

    try {
        const filePath = path.join(maestroPath, route.filePath);

        if (fs.existsSync(filePath)) {
            const document = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(document);
        } else {
            vscode.window.showWarningMessage(`File not found: ${route.filePath}. Create missing route?`, 'Create')
                .then(action => {
                    if (action === 'Create') {
                        createMissingRoute(route);
                    }
                });
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to open route file: ${error}`);
    }
}

async function createMissingRoute(route: RouteNode): Promise<void> {
    vscode.window.showInformationMessage(`Create route: ${route.name}?`, 'Create', 'Cancel')
        .then(action => {
            if (action === 'Create') {
                // Trigger route creation commands
                if (route.musicRelated) {
                    vscode.commands.executeCommand('cipher.createLyricsComponent');
                } else {
                    vscode.commands.executeCommand('cipher.autoFixRoutes');
                }
            }
        });
}

// =============================================================================
// 📊 ANALYSIS DISPLAY FUNCTIONS (SAME AS BEFORE)
// =============================================================================

async function displayRouteAnalysisWithBrain(analysis: RouteMapAnalysis, routes: RouteNode[]): Promise<void> {
    const brainInterface = getBrainInterface();
    if (!brainInterface) {
        return displayBasicRouteAnalysis(analysis, routes);
    }

    try {
        const suggestions = await brainInterface.getPersonalizedSuggestions?.() || [];
        const musicRoutes = routes.filter(r => r.musicRelated);

        const message = `🗺️ Live Route Map Analysis (🧠 Brain Enhanced):

📊 Routes: ${analysis.totalRoutes} total
✅ Working: ${analysis.workingRoutes}
❌ Missing: ${analysis.missingRoutes}
🎵 Music Routes: ${analysis.musicRoutes}

🧠 Brain Insights:
${suggestions.slice(0, 3).map(s => `• ${s}`).join('\n') || '• All routes optimally configured'}

🎯 Scopes: ${analysis.scopes.join(', ')}`;

        const actions: string[] = ['View Glassmorphic Map', 'Refresh Data'];
        if (analysis.missingRoutes > 0) actions.push('Generate Missing');
        if (analysis.musicRoutes > 0) actions.push('Music Routes');

        const action = await vscode.window.showInformationMessage(message, ...actions);

        if (action === 'Generate Missing') {
            vscode.commands.executeCommand('cipher.autoFixRoutes');
        } else if (action === 'Music Routes') {
            showMusicRoutesAnalysis(musicRoutes);
        } else if (action === 'Refresh Data') {
            await createVisualRouteMapHandler();
        }

    } catch (error) {
        console.warn('Brain-enhanced display failed:', error);
        await displayBasicRouteAnalysis(analysis, routes);
    }
}

async function displayBasicRouteAnalysis(analysis: RouteMapAnalysis, _routes: RouteNode[]): Promise<void> {
    const message = `🗺️ Live Route Map Analysis:

📊 Routes: ${analysis.totalRoutes} total
✅ Working: ${analysis.workingRoutes}
❌ Missing: ${analysis.missingRoutes}
🎵 Music Routes: ${analysis.musicRoutes}

🎯 Scopes: ${analysis.scopes.join(', ')}
🔄 Data refreshed: ${new Date().toLocaleTimeString()}`;

    const actions: string[] = ['View Glassmorphic Map', 'Refresh Data'];
    if (analysis.missingRoutes > 0) actions.push('Generate Missing');

    const action = await vscode.window.showInformationMessage(message, ...actions);
    
    if (action === 'Generate Missing') {
        vscode.commands.executeCommand('cipher.autoFixRoutes');
    } else if (action === 'Refresh Data') {
        await createVisualRouteMapHandler();
    }
}

async function showMusicRoutesAnalysis(musicRoutes: RouteNode[]): Promise<void> {
    if (musicRoutes.length === 0) {
        vscode.window.showInformationMessage('🎵 No music routes detected');
        return;
    }

    const working = musicRoutes.filter(r => r.status === 'working').length;
    const missing = musicRoutes.filter(r => r.status === 'missing').length;

    const message = `🎵 Music Routes Analysis:

📊 Total: ${musicRoutes.length}
✅ Working: ${working}
❌ Missing: ${missing}

Routes: ${musicRoutes.map(r => `${r.status === 'working' ? '✅' : '❌'} ${r.name}`).join(', ')}`;

    vscode.window.showInformationMessage(message);
}

async function showRouteDebugInfo(routes: RouteNode[], maestroPath: string): Promise<void> {
    console.log('\n🔍 === ROUTE DEBUG INFO ===');
    console.log(`📁 Maestro path: ${maestroPath}`);
    console.log(`📊 Total routes found: ${routes.length}`);
    
    const working = routes.filter(r => r.status === 'working');
    const missing = routes.filter(r => r.status === 'missing');
    
    console.log(`✅ Working routes (${working.length}):`);
    working.forEach(route => {
        console.log(`   ✅ ${route.name} -> ${route.filePath} (${route.type}, ${route.scope})`);
    });
    
    console.log(`❌ Missing routes (${missing.length}):`);
    missing.forEach(route => {
        console.log(`   ❌ ${route.name} -> ${route.filePath} (${route.type}, ${route.scope})`);
    });
    
    // Check what directories actually exist - updated for new structure
    const checkDirs = [
        'src/app',        // New Next.js App Router
        'src/pages',
        'pages', 
        'app',
        'src/components',
        'components'
    ];
    
    console.log('\n📁 Directory existence check:');
    checkDirs.forEach(dir => {
        const fullPath = path.join(maestroPath, dir);
        const exists = fs.existsSync(fullPath);
        console.log(`   ${exists ? '✅' : '❌'} ${dir} -> ${fullPath}`);
        
        if (exists) {
            try {
                const contents = fs.readdirSync(fullPath);
                console.log(`      Contents: ${contents.slice(0, 5).join(', ')}${contents.length > 5 ? '...' : ''}`);
            } catch (e) {
                console.log(`      Error reading contents: ${e}`);
            }
        }
    });
    
    console.log('🔍 === END DEBUG INFO ===\n');
    
    // Show user a summary popup if there are issues
    if (missing.length > 0) {
        const message = `🔍 Route Analysis Debug:
        
Found ${routes.length} routes total:
✅ ${working.length} working
❌ ${missing.length} missing

Missing routes: ${missing.map(r => r.name).join(', ')}

Check the VS Code console for detailed debug info about what directories were scanned.`;

        vscode.window.showWarningMessage(message, 'Check Console', 'OK')
            .then(action => {
                if (action === 'Check Console') {
                    vscode.commands.executeCommand('workbench.action.toggleDevTools');
                }
            });
    }
}

// =============================================================================
// 🎯 ROUTE MAP COMPLETION MESSAGE (UPDATED)
// =============================================================================

async function showRouteMapComplete(analysis: RouteMapAnalysis, htmlPath: string | null, markdownPath: string | null): Promise<void> {
    const statusIcon = analysis.missingRoutes === 0 ? '✅' : '🟡';

    const message = `${statusIcon} Glassmorphic Route Map Complete & Live!

📊 Analyzed ${analysis.totalRoutes} routes
✅ ${analysis.workingRoutes} working routes
❌ ${analysis.missingRoutes} missing routes  
🎵 ${analysis.musicRoutes} music routes detected
🗺️ Sidebar refreshed with live data
${htmlPath ? '🌟 Beautiful glassmorphic boxes opened in browser' : '📄 Glassmorphic HTML map generated'}
${markdownPath ? '📝 Markdown report with commands generated' : ''}

🧠 Brain learning from route patterns active`;

    const actions: string[] = [];
    if (htmlPath) actions.push('Re-open Glassmorphic Map');
    if (markdownPath) actions.push('View Markdown Report');
    if (analysis.missingRoutes > 0) actions.push('Fix Missing Routes');
    actions.push('OK');

    const action = await vscode.window.showInformationMessage(message, ...actions);

    if (action === 'Re-open Glassmorphic Map' && htmlPath) {
        await vscode.env.openExternal(vscode.Uri.file(htmlPath));
    } else if (action === 'View Markdown Report' && markdownPath) {
        const document = await vscode.workspace.openTextDocument(markdownPath);
        await vscode.window.showTextDocument(document);
    } else if (action === 'Fix Missing Routes') {
        vscode.commands.executeCommand('cipher.autoFixRoutes');
    }
}