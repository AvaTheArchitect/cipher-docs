// ⚡ Auto-Fix Routes Handler - Lightning-Fast Route Creation (FIXED VERSION)
// .vscode-extension/cipher-autonomous-dev/src/handlers/route-handlers/autoFixRoutesHandler.ts

import * as path from 'path';
import * as vscode from 'vscode';

interface RouteInfo {
    path: string;
    component: string;
    exists?: boolean;
    status: "active" | "missing" | "deprecated";
    issues?: string[];
    isMusicRoute?: boolean;
}

/**
 * ⚡ FIXED: Lightning Route Fixing that ACTUALLY creates files
 */
export async function autoFixRoutesHandler(): Promise<void> {
    const startTime = Date.now();
    
    try {
        vscode.window.showInformationMessage('⚡ Lightning Route Fixing started!');
        
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        console.log(`🔍 Workspace: ${workspaceFolder.uri.fsPath}`);

        // 🔍 Analyze project structure first
        const projectStructure = await analyzeProjectStructure(workspaceFolder);
        console.log(`📁 Project structure:`, projectStructure);

        // 🔍 Find missing routes based on your actual project
        const missingRoutes = await findActualMissingRoutes(workspaceFolder, projectStructure);
        console.log(`🎯 Found ${missingRoutes.length} missing routes:`, missingRoutes);
        
        if (missingRoutes.length === 0) {
            const duration = ((Date.now() - startTime) / 1000).toFixed(2);
            vscode.window.showInformationMessage(`✅ All routes are properly configured! (${duration}s)`);
            return;
        }

        // 🚀 Show what we'll create
        const routeList = missingRoutes.map(r => `${r.isMusicRoute ? '🎵' : '📄'} ${r.component} (${r.path})`).join('\n');
        const shouldCreate = await vscode.window.showInformationMessage(
            `🔧 Found ${missingRoutes.length} missing routes:\n\n${routeList}\n\nCreate all missing routes?`,
            { modal: true },
            'Create All Routes',
            'Preview Only',
            'Cancel'
        );

        if (shouldCreate === 'Create All Routes') {
            await createAllMissingRoutesFixed(workspaceFolder, missingRoutes, projectStructure);
            const duration = ((Date.now() - startTime) / 1000).toFixed(2);
            vscode.window.showInformationMessage(`⚡ Created ${missingRoutes.length} routes in ${duration}s!`);
        } else if (shouldCreate === 'Preview Only') {
            await previewMissingRoutes(missingRoutes);
        }
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('❌ Route fixing failed:', errorMessage);
        vscode.window.showErrorMessage(`Route fixing failed: ${errorMessage}`);
    }
}

/**
 * 📁 Analyze actual project structure
 */
async function analyzeProjectStructure(workspaceFolder: vscode.WorkspaceFolder): Promise<any> {
    const structure = {
        hasComponents: false,
        hasPages: false,
        hasSrc: false,
        hasApp: false,
        componentsPath: '',
        pagesPath: '',
        rootPath: workspaceFolder.uri.fsPath
    };

    // Check common React/Next.js structures
    const possiblePaths = [
        'src/components',
        'src/pages', 
        'components',
        'pages',
        'app',
        'src/app',
        'src'
    ];

    for (const possiblePath of possiblePaths) {
        try {
            const pathUri = vscode.Uri.joinPath(workspaceFolder.uri, possiblePath);
            await vscode.workspace.fs.stat(pathUri);
            
            console.log(`✅ Found: ${possiblePath}`);
            
            if (possiblePath.includes('components')) {
                structure.hasComponents = true;
                structure.componentsPath = possiblePath;
            }
            if (possiblePath.includes('pages')) {
                structure.hasPages = true;
                structure.pagesPath = possiblePath;
            }
            if (possiblePath === 'src') {
                structure.hasSrc = true;
            }
            if (possiblePath.includes('app')) {
                structure.hasApp = true;
            }
        } catch {
            // Path doesn't exist
            console.log(`❌ Not found: ${possiblePath}`);
        }
    }

    // Set default paths if not found
    if (!structure.componentsPath) {
        structure.componentsPath = structure.hasSrc ? 'src/components' : 'components';
    }

    return structure;
}

/**
 * 🎯 Find routes that are actually missing based on your project
 */
async function findActualMissingRoutes(workspaceFolder: vscode.WorkspaceFolder, structure: any): Promise<RouteInfo[]> {
    const missingRoutes: RouteInfo[] = [];
    
    // Music-specific routes that would be valuable for your project
    const musicRoutes = [
        { path: '/practice', component: 'Practice', description: 'Music practice module' },
        { path: '/tuner', component: 'Tuner', description: 'Guitar tuner' },
        { path: '/metronome', component: 'Metronome', description: 'Metronome tool' },
        { path: '/jam', component: 'Jam', description: 'Jam session interface' },
        { path: '/vocal', component: 'Vocal', description: 'Vocal training module' },
        { path: '/theory', component: 'Theory', description: 'Music theory helper' }
    ];

    // Standard routes that might be missing
    const standardRoutes = [
        { path: '/dashboard', component: 'Dashboard', description: 'Main dashboard' },
        { path: '/settings', component: 'Settings', description: 'User settings' },
        { path: '/profile', component: 'Profile', description: 'User profile' }
    ];

    const allRoutes = [...musicRoutes, ...standardRoutes];

    for (const route of allRoutes) {
        const componentFile = `${route.component}.tsx`;
        const componentPath = path.join(structure.componentsPath, componentFile);
        const componentUri = vscode.Uri.joinPath(workspaceFolder.uri, componentPath);

        try {
            await vscode.workspace.fs.stat(componentUri);
            console.log(`✅ Component exists: ${componentPath}`);
            // Component exists
        } catch {
            console.log(`❌ Component missing: ${componentPath}`);
            // Component missing - add to missing routes
            const isMusicRoute = musicRoutes.some(mr => mr.component === route.component);
            missingRoutes.push({
                path: route.path,
                component: route.component,
                exists: false,
                status: 'missing',
                issues: [`Component file not found: ${componentPath}`],
                isMusicRoute
            });
        }
    }

    return missingRoutes;
}

/**
 * ⚡ Create all missing routes with proper error handling
 */
async function createAllMissingRoutesFixed(
    workspaceFolder: vscode.WorkspaceFolder, 
    routes: RouteInfo[], 
    structure: any
): Promise<void> {
    let createdCount = 0;
    const errors: string[] = [];

    for (const route of routes) {
        try {
            console.log(`🔧 Creating route: ${route.component}`);
            await createRouteFilesFixed(workspaceFolder, route, structure);
            createdCount++;
            console.log(`✅ Created: ${route.component}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            errors.push(`${route.component}: ${errorMessage}`);
            console.error(`❌ Failed to create ${route.component}:`, errorMessage);
        }
    }

    // Report results
    if (createdCount > 0) {
        vscode.window.showInformationMessage(`✅ Successfully created ${createdCount} route components!`);
    }

    if (errors.length > 0) {
        const channel = vscode.window.createOutputChannel('Cipher Route Creation Errors');
        channel.clear();
        channel.appendLine('❌ Route Creation Errors:');
        errors.forEach(error => channel.appendLine(`• ${error}`));
        channel.show();
    }
}

/**
 * 🏗️ Create route files with proper error handling and logging
 */
async function createRouteFilesFixed(
    workspaceFolder: vscode.WorkspaceFolder, 
    route: RouteInfo, 
    structure: any
): Promise<void> {
    const componentName = route.component;
    const isMusicRoute = route.isMusicRoute;

    // Ensure components directory exists
    const componentsDir = vscode.Uri.joinPath(workspaceFolder.uri, structure.componentsPath);
    try {
        await vscode.workspace.fs.createDirectory(componentsDir);
        console.log(`📁 Components directory ready: ${structure.componentsPath}`);
    } catch {
        console.log(`📁 Components directory already exists: ${structure.componentsPath}`);
    }

    // Create component file
    const componentContent = generateComponentContent(componentName, isMusicRoute);
    const componentFile = vscode.Uri.joinPath(componentsDir, `${componentName}.tsx`);
    
    console.log(`📝 Writing component file: ${componentFile.fsPath}`);
    await vscode.workspace.fs.writeFile(componentFile, Buffer.from(componentContent));
    console.log(`✅ Component file created: ${componentName}.tsx`);

    // Create optional hook file if src directory exists
    if (structure.hasSrc) {
        try {
            const hooksDir = vscode.Uri.joinPath(workspaceFolder.uri, 'src', 'hooks');
            await vscode.workspace.fs.createDirectory(hooksDir);
            
            const hookContent = generateHookContent(componentName, isMusicRoute);
            const hookFile = vscode.Uri.joinPath(hooksDir, `use${componentName}.ts`);
            
            await vscode.workspace.fs.writeFile(hookFile, Buffer.from(hookContent));
            console.log(`✅ Hook file created: use${componentName}.ts`);
        } catch (error) {
            console.log(`⚠️ Could not create hook file: ${error}`);
        }
    }
}

/**
 * ⚛️ Generate component content
 */
function generateComponentContent(componentName: string, isMusicRoute?: boolean): string {
    return `// 🎵 ${componentName} Component - Created by Cipher Lightning Route Fix
import React, { useState } from 'react';

interface ${componentName}Props {
  className?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({ className = '' }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={\`min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 \${className}\`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            ${isMusicRoute ? '🎵' : '📄'} ${componentName}
          </h1>
          <p className="text-xl text-purple-100">
            ${isMusicRoute ? 'Music Development Component' : 'Application Component'} - Created by Cipher
          </p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 border border-white border-opacity-20">
          <h2 className="text-2xl font-semibold mb-4">🎯 ${componentName} Features</h2>
          <p className="text-purple-100 mb-6">
            ${isMusicRoute 
              ? 'Enhanced with music development capabilities and Cipher Brain Intelligence.' 
              : 'Built with modern React patterns and Cipher development tools.'}
          </p>
          
          <button 
            onClick={handleToggle}
            className={\`px-6 py-3 rounded-lg font-semibold transition-all duration-300 \${
              isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }\`}
          >
            {isActive ? '⏹️ Stop' : '▶️ Start'} ${componentName}
          </button>

          {isActive && (
            <div className="mt-6 p-4 bg-green-500 bg-opacity-20 rounded-lg border border-green-400">
              <p className="text-green-100">
                ✅ ${componentName} is now active and ready to use!
              </p>
            </div>
          )}

          ${isMusicRoute ? `
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">🎵 Music Features</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-500 bg-opacity-30 p-4 rounded-lg">🎸 Guitar Integration</div>
              <div className="bg-purple-500 bg-opacity-30 p-4 rounded-lg">🎤 Vocal Processing</div>
              <div className="bg-purple-500 bg-opacity-30 p-4 rounded-lg">🎵 Music Theory</div>
              <div className="bg-purple-500 bg-opacity-30 p-4 rounded-lg">🎧 Audio Analysis</div>
            </div>
          </div>` : ''}
        </div>

        <div className="text-center mt-8 text-purple-200">
          🔧 Created by Cipher Lightning Route Fix on {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ${componentName};`;
}

/**
 * 🎣 Generate hook content
 */
function generateHookContent(componentName: string, isMusicRoute?: boolean): string {
    return `// 🎣 use${componentName} Hook - Created by Cipher Lightning Route Fix
import { useState, useEffect, useCallback } from 'react';

interface ${componentName}State {
  isLoaded: boolean;
  isActive: boolean;
  ${isMusicRoute ? 'musicFeatures: string[];' : ''}
  error?: string;
}

export function use${componentName}() {
  const [state, setState] = useState<${componentName}State>({
    isLoaded: false,
    isActive: false,
    ${isMusicRoute ? 'musicFeatures: [],' : ''}
  });

  useEffect(() => {
    // Initialize ${componentName}
    const timer = setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        isLoaded: true,
        ${isMusicRoute ? `musicFeatures: ['guitar', 'vocal', 'audio', 'theory']` : ''}
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      isActive: !prev.isActive 
    }));
  }, []);

  return {
    ...state,
    handleToggle,
  };
}`;
}

/**
 * 📋 Preview missing routes
 */
async function previewMissingRoutes(routes: RouteInfo[]): Promise<void> {
    const channel = vscode.window.createOutputChannel('Cipher Route Preview');
    channel.clear();
    channel.appendLine('⚡ Missing Routes Preview - FIXED VERSION');
    channel.appendLine('='.repeat(60));
    
    routes.forEach((route, index) => {
        channel.appendLine(`\n${index + 1}. ${route.component} ${route.isMusicRoute ? '🎵' : '📄'}`);
        channel.appendLine(`   Path: ${route.path}`);
        channel.appendLine(`   Type: ${route.isMusicRoute ? 'Music Route' : 'Standard Route'}`);
        channel.appendLine(`   Status: ${route.status}`);
        if (route.issues?.length) {
            channel.appendLine(`   Issues: ${route.issues.join(', ')}`);
        }
    });
    
    channel.appendLine(`\n${'='.repeat(60)}`);
    channel.appendLine('These routes will be created when you run Auto-Fix Routes');
    channel.show();
}