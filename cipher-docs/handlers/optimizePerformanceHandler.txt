// ⚡ Performance Optimization Handler - Auto-Optimize Code 
// .vscode-extension/cipher-autonomous-dev/src/handlers/performance-handlers/optimizePerformance.ts

import * as path from 'path';
import * as vscode from 'vscode';
import { OptimizationSuggestion } from '../../shared/types';
import { ensureDirectoryExists, findLineNumber } from '../../shared/utils';

/**
 * ⚡ BELOVED FEATURE: Auto-Performance Optimization
 * Extracted from backup - automatically optimizes React components and code
 * Applies React.memo, useCallback, useMemo, and other performance patterns
 */
export async function optimizePerformanceHandler(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('No active editor found');
    return;
  }

  try {
    vscode.window.showInformationMessage('⚡ Analyzing performance optimization opportunities...');

    const optimizations = await analyzePerformanceOptimizations(editor);

    if (optimizations.length === 0) {
      vscode.window.showInformationMessage('⚡ Component is already well-optimized!');
      return;
    }

    const action = await vscode.window.showInformationMessage(
      `⚡ Found ${optimizations.length} optimization opportunities. Apply automatically?`,
      'Yes, Apply All',
      'Show Details',
      'Select Optimizations',
      'Skip'
    );

    if (action === 'Yes, Apply All') {
      await applyOptimizations(editor, optimizations);
      vscode.window.showInformationMessage(`✅ Applied ${optimizations.length} performance optimizations!`);
    } else if (action === 'Show Details') {
      await showOptimizationDetails(optimizations);
    } else if (action === 'Select Optimizations') {
      await selectivelyApplyOptimizations(editor, optimizations);
    }

  } catch (error) {
    vscode.window.showErrorMessage(`Performance optimization failed: ${error}`);
  }
}

/**
 * 🔍 Analyze Performance Optimization Opportunities
 * Comprehensive analysis of performance bottlenecks and optimization opportunities
 */
async function analyzePerformanceOptimizations(editor: vscode.TextEditor): Promise<OptimizationSuggestion[]> {
  const document = editor.document;
  const text = document.getText();
  const fileName = document.fileName;
  const optimizations: OptimizationSuggestion[] = [];

  // React.memo optimization
  if (isReactComponent(text) && !hasReactMemo(text)) {
    optimizations.push({
      type: 'memo',
      description: 'Wrap component with React.memo to prevent unnecessary re-renders',
      lineNumber: findLineNumber(text, 'export default function'),
      originalCode: 'export default function ComponentName',
      optimizedCode: 'export default React.memo(function ComponentName',
      confidence: 85
    });
  }

  // useCallback optimizations
  const callbackOpportunities = findCallbackOptimizations(text);
  optimizations.push(...callbackOpportunities);

  // useMemo optimizations
  const memoOpportunities = findMemoOptimizations(text);
  optimizations.push(...memoOpportunities);

  // Bundle size optimizations
  const bundleOptimizations = findBundleOptimizations(text);
  optimizations.push(...bundleOptimizations);

  // Code splitting opportunities
  const codeSplittingOpts = findCodeSplittingOpportunities(text);
  optimizations.push(...codeSplittingOpts);

  // Performance anti-patterns
  const antiPatterns = findPerformanceAntiPatterns(text);
  optimizations.push(...antiPatterns);

  return optimizations.sort((a, b) => b.confidence - a.confidence);
}

/**
 * 🔍 Find useCallback Optimization Opportunities
 */
function findCallbackOptimizations(text: string): OptimizationSuggestion[] {
  const optimizations: OptimizationSuggestion[] = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    // Find event handlers that could benefit from useCallback
    if (line.includes('onClick=') && !text.includes('useCallback')) {
      const handlerMatch = line.match(/onClick=\{([^}]+)\}/);
      if (handlerMatch) {
        optimizations.push({
          type: 'useCallback',
          description: 'Wrap event handler with useCallback to prevent child re-renders',
          lineNumber: index + 1,
          originalCode: `onClick={${handlerMatch[1]}}`,
          optimizedCode: `onClick={useCallback(${handlerMatch[1]}, [])}`,
          confidence: 75
        });
      }
    }

    // Find onChange handlers
    if (line.includes('onChange=') && !line.includes('useCallback')) {
      const handlerMatch = line.match(/onChange=\{([^}]+)\}/);
      if (handlerMatch) {
        optimizations.push({
          type: 'useCallback',
          description: 'Optimize onChange handler with useCallback',
          lineNumber: index + 1,
          originalCode: `onChange={${handlerMatch[1]}}`,
          optimizedCode: `onChange={useCallback(${handlerMatch[1]}, [])}`,
          confidence: 80
        });
      }
    }

    // Find function definitions that should be wrapped
    if (line.includes('const handle') && line.includes('= (') && !line.includes('useCallback')) {
      optimizations.push({
        type: 'useCallback',
        description: 'Convert handler function to useCallback for better performance',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: line.trim().replace('= (', '= useCallback(('),
        confidence: 70
      });
    }
  });

  return optimizations;
}

/**
 * 🧠 Find useMemo Optimization Opportunities
 */
function findMemoOptimizations(text: string): OptimizationSuggestion[] {
  const optimizations: OptimizationSuggestion[] = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    // Find expensive array operations
    if ((line.includes('.map(') || line.includes('.filter(') || line.includes('.reduce(')) && 
        !text.includes('useMemo')) {
      optimizations.push({
        type: 'useMemo',
        description: 'Wrap expensive array operation with useMemo',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: `useMemo(() => ${line.trim()}, [dependencies])`,
        confidence: 70
      });
    }

    // Find object/array creation in render
    if (line.includes('= {') || line.includes('= [')) {
      const variableMatch = line.match(/const\s+(\w+)\s*=/);
      if (variableMatch && !line.includes('useState') && !line.includes('useMemo')) {
        optimizations.push({
          type: 'useMemo',
          description: 'Memoize object/array creation to prevent unnecessary re-creation',
          lineNumber: index + 1,
          originalCode: line.trim(),
          optimizedCode: `const ${variableMatch[1]} = useMemo(() => ${line.split('=')[1].trim()}, [dependencies])`,
          confidence: 65
        });
      }
    }

    // Find complex calculations
    if (line.includes('Math.') || line.includes('parse') || line.includes('JSON.')) {
      optimizations.push({
        type: 'useMemo',
        description: 'Memoize expensive calculation',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: `useMemo(() => ${line.trim()}, [dependencies])`,
        confidence: 60
      });
    }
  });

  return optimizations;
}

/**
 * 📦 Find Bundle Size Optimizations
 */
function findBundleOptimizations(text: string): OptimizationSuggestion[] {
  const optimizations: OptimizationSuggestion[] = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    // Find wildcard imports
    if (line.includes('import *')) {
      optimizations.push({
        type: 'structure',
        description: 'Replace wildcard import with specific imports for better tree shaking',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: 'import { specific, imports } from \'module\'',
        confidence: 85
      });
    }

    // Find lodash imports
    if (line.includes('import lodash') || line.includes('import _ from \'lodash\'')) {
      optimizations.push({
        type: 'structure',
        description: 'Use specific lodash imports to reduce bundle size',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: 'import { map, filter } from \'lodash\'',
        confidence: 90
      });
    }

    // Find moment.js usage
    if (line.includes('moment')) {
      optimizations.push({
        type: 'structure',
        description: 'Consider replacing moment.js with date-fns or day.js for smaller bundle',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: 'import { format } from \'date-fns\'',
        confidence: 80
      });
    }
  });

  return optimizations;
}

/**
 * ✂️ Find Code Splitting Opportunities
 */
function findCodeSplittingOpportunities(text: string): OptimizationSuggestion[] {
  const optimizations: OptimizationSuggestion[] = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    // Find large component imports
    if (line.includes('import') && line.includes('Component') && !line.includes('lazy')) {
      const componentMatch = line.match(/import\s+(\w+)/);
      if (componentMatch) {
        optimizations.push({
          type: 'structure',
          description: 'Consider lazy loading this component for better initial load performance',
          lineNumber: index + 1,
          originalCode: line.trim(),
          optimizedCode: `const ${componentMatch[1]} = lazy(() => import('./path/to/component'))`,
          confidence: 60
        });
      }
    }

    // Find route components
    if (line.includes('component=') && !line.includes('lazy')) {
      optimizations.push({
        type: 'structure',
        description: 'Implement route-based code splitting',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: 'component={lazy(() => import(\'./Component\'))}',
        confidence: 75
      });
    }
  });

  return optimizations;
}

/**
 * 🚫 Find Performance Anti-patterns
 */
function findPerformanceAntiPatterns(text: string): OptimizationSuggestion[] {
  const optimizations: OptimizationSuggestion[] = [];
  const lines = text.split('\n');

  lines.forEach((line, index) => {
    // Inline object creation in JSX
    if (line.includes('style={{') && !line.includes('useMemo')) {
      optimizations.push({
        type: 'memo',
        description: 'Move inline styles to useMemo or external object to prevent re-creation',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: 'style={memoizedStyles}',
        confidence: 70,
        message: 'Add React.memo for better performance',
    severity: 'info' as const,
    fix: 'Wrap component with React.memo'
      });
    }

    // Inline arrow functions in JSX
    if (line.includes('onClick={() =>') || line.includes('onChange={() =>')) {
      optimizations.push({
        type: 'useCallback',
        description: 'Replace inline arrow function with useCallback',
        lineNumber: index + 1,
        originalCode: line.trim(),
        optimizedCode: 'onClick={handleClick}',
        confidence: 80,
        message: 'Use useCallback for event handlers',
    severity: 'info' as const,
    fix: 'Wrap event handler with useCallback'
      });
    }

    // Index as key in map
    if (line.includes('.map((') && line.includes('index') && line.includes('key={index}')) {
      optimizations.push({
        type: 'structure',
        description: 'Use stable ID as key instead of array index',
        lineNumber: index + 1,
        originalCode: 'key={index}',
        optimizedCode: 'key={item.id}',
        confidence: 85,
        message: 'Improve code structure',
    severity: 'warning' as const,
    fix: 'Refactor for better structure'
      });
    }

    // Multiple useState calls
    const useStateMatches = text.match(/useState/g);
    if (useStateMatches && useStateMatches.length > 5 && line.includes('useState')) {
      optimizations.push({
        type: 'structure',
        description: 'Consider using useReducer for complex state management',
        lineNumber: index + 1,
        originalCode: 'Multiple useState calls',
        optimizedCode: 'useReducer(reducer, initialState)',
        confidence: 60,
        message: 'Optimize performance structure',
    severity: 'info' as const,
    fix: 'Apply performance optimizations'
      });
    }
  });

  return optimizations; // FIX: Added missing return statement
}

/**
 * ✅ Apply Performance Optimizations
 */
async function applyOptimizations(editor: vscode.TextEditor, optimizations: OptimizationSuggestion[]): Promise<void> {
  const document = editor.document;
  let text = document.getText();

  // Sort optimizations by line number (descending) to avoid offset issues
  const sortedOptimizations = optimizations.sort((a, b) => b.lineNumber - a.lineNumber);

  // Apply React.memo optimization first
  const memoOpt = sortedOptimizations.find(opt => opt.type === 'memo' && opt.description.includes('React.memo'));
  if (memoOpt) {
    text = await applyReactMemoOptimization(text);
  }

  // Apply useCallback optimizations
  const callbackOpts = sortedOptimizations.filter(opt => opt.type === 'useCallback');
  for (const opt of callbackOpts) {
    text = await applyCallbackOptimization(text, opt);
  }

  // Apply useMemo optimizations
  const memoOpts = sortedOptimizations.filter(opt => opt.type === 'useMemo');
  for (const opt of memoOpts) {
    text = await applyMemoOptimization(text, opt);
  }

  // Apply structural optimizations
  const structureOpts = sortedOptimizations.filter(opt => opt.type === 'structure');
  for (const opt of structureOpts) {
    text = await applyStructuralOptimization(text, opt);
  }

  // Apply all changes
  await applyFileChanges(editor, text);

  // Generate optimization report
  await generateOptimizationReport(editor, optimizations);
}

/**
 * 🔄 Apply React.memo Optimization
 */
async function applyReactMemoOptimization(text: string): Promise<string> {
  let optimizedText = text;

  // Add React import if not present
  if (!optimizedText.includes('import React')) {
    optimizedText = `import React from 'react';\n${optimizedText}`;
  }

  // Find and wrap the component with memo
  const functionMatch = optimizedText.match(/export default function (\w+)/);
  if (functionMatch) {
    const componentName = functionMatch[1];
    
    // Replace export default function with function declaration
    optimizedText = optimizedText.replace(
      /export default function (\w+)/,
      `function ${componentName}`
    );
    
    // Add memo export at the end
    optimizedText = optimizedText.replace(
      /}(\s*)$/,
      `}\n\nexport default React.memo(${componentName});$1`
    );
  }

  return optimizedText;
}

/**
 * 📞 Apply useCallback Optimization
 */
async function applyCallbackOptimization(text: string, optimization: OptimizationSuggestion): Promise<string> {
  let optimizedText = text;

  // Add useCallback import if not present
  if (!optimizedText.includes('useCallback')) {
    optimizedText = optimizedText.replace(
      /import React[^;]*;/,
      match => match.replace('}', ', useCallback}')
    );
  }

  // Apply the specific optimization
  optimizedText = optimizedText.replace(optimization.originalCode, optimization.optimizedCode);

  return optimizedText;
}

/**
 * 🧠 Apply useMemo Optimization
 */
async function applyMemoOptimization(text: string, optimization: OptimizationSuggestion): Promise<string> {
  let optimizedText = text;

  // Add useMemo import if not present
  if (!optimizedText.includes('useMemo')) {
    optimizedText = optimizedText.replace(
      /import React[^;]*;/,
      match => match.replace('}', ', useMemo}')
    );
  }

  // Apply the specific optimization
  optimizedText = optimizedText.replace(optimization.originalCode, optimization.optimizedCode);

  return optimizedText;
}

/**
 * 🏗️ Apply Structural Optimization
 */
async function applyStructuralOptimization(text: string, optimization: OptimizationSuggestion): Promise<string> {
  // Handle specific structural optimizations
  return text.replace(optimization.originalCode, optimization.optimizedCode);
}

/**
 * 🎯 Selectively Apply Optimizations
 */
async function selectivelyApplyOptimizations(editor: vscode.TextEditor, optimizations: OptimizationSuggestion[]): Promise<void> {
  const selectedOptimizations = await vscode.window.showQuickPick(
    optimizations.map(opt => ({
      label: `${getOptimizationIcon(opt.type)} ${opt.description}`,
      description: `Line ${opt.lineNumber} | Confidence: ${opt.confidence}%`,
      picked: opt.confidence > 75,
      optimization: opt
    })),
    {
      canPickMany: true,
      placeHolder: 'Select optimizations to apply'
    }
  );

  if (selectedOptimizations && selectedOptimizations.length > 0) {
    const selectedOpts = selectedOptimizations.map(item => item.optimization);
    await applyOptimizations(editor, selectedOpts);
    vscode.window.showInformationMessage(`✅ Applied ${selectedOpts.length} selected optimizations!`);
  }
}

/**
 * 📋 Show Optimization Details
 */
async function showOptimizationDetails(optimizations: OptimizationSuggestion[]): Promise<void> {
  const details = optimizations.map((opt, i) =>
    `${i + 1}. **${opt.description}** (${opt.confidence}% confidence)
   📍 Line ${opt.lineNumber}
   🔧 Type: ${opt.type}
   
   **Before:**
   \`${opt.originalCode}\`
   
   **After:**
   \`${opt.optimizedCode}\`
`).join('\n\n');

  const message = `⚡ **Performance Optimization Opportunities:**

${details}

**Summary:**
• ${optimizations.length} optimizations available
• Average confidence: ${Math.round(optimizations.reduce((sum, opt) => sum + opt.confidence, 0) / optimizations.length)}%
• Estimated performance improvement: ${estimatePerformanceImprovement(optimizations)}%`;

  vscode.window.showInformationMessage(message, { modal: true });
}

/**
 * 📊 Generate Optimization Report
 */
async function generateOptimizationReport(editor: vscode.TextEditor, optimizations: OptimizationSuggestion[]): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) return;

  const reportsDir = vscode.Uri.joinPath(workspaceFolder.uri, 'cipher-reports', 'performance');
  await ensureDirectoryExists(reportsDir);

  const fileName = path.basename(editor.document.fileName);
  const reportHtml = generateOptimizationReportHTML(fileName, optimizations);

  const reportFile = vscode.Uri.joinPath(reportsDir, `performance-optimization-${Date.now()}.html`);
  await vscode.workspace.fs.writeFile(reportFile, Buffer.from(reportHtml));

  vscode.env.openExternal(reportFile);
  vscode.window.showInformationMessage('📊 Performance optimization report generated!');
}

/**
 * 🎨 Generate Optimization Report HTML
 */
function generateOptimizationReportHTML(fileName: string, optimizations: OptimizationSuggestion[]): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>⚡ Performance Optimization Report - ${fileName}</title>
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
        .optimization-item {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 10px;
            margin: 15px 0;
            border-left: 4px solid #10b981;
        }
        .confidence-bar {
            background: rgba(255, 255, 255, 0.2);
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 10px;
        }
        .confidence-fill {
            height: 100%;
            background: linear-gradient(90deg, #ef4444, #f59e0b, #10b981);
            transition: width 0.3s ease;
        }
        .code-block {
            background: rgba(0, 0, 0, 0.5);
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            margin: 10px 0;
            border-left: 3px solid #3b82f6;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .metric-card {
            background: rgba(0, 0, 0, 0.4);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .metric-number {
            font-size: 2.5em;
            font-weight: bold;
            margin-bottom: 10px;
            color: #10b981;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚡ Performance Optimization Report</h1>
            <h2>${fileName}</h2>
            <p>Generated: ${new Date().toLocaleString()}</p>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-number">${optimizations.length}</div>
                <div>Optimizations Applied</div>
            </div>
            <div class="metric-card">
                <div class="metric-number">${Math.round(optimizations.reduce((sum, opt) => sum + opt.confidence, 0) / optimizations.length)}%</div>
                <div>Average Confidence</div>
            </div>
            <div class="metric-card">
                <div class="metric-number">${estimatePerformanceImprovement(optimizations)}%</div>
                <div>Est. Performance Gain</div>
            </div>
            <div class="metric-card">
                <div class="metric-number">${optimizations.filter(o => o.type === 'memo').length}</div>
                <div>React.memo Applied</div>
            </div>
        </div>

        <div class="card">
            <h3>📊 Optimization Summary</h3>
            <p>Applied ${optimizations.length} performance optimizations to improve component efficiency and reduce unnecessary re-renders.</p>
            
            <h4>Optimizations by Type:</h4>
            <ul>
                <li><strong>React.memo:</strong> ${optimizations.filter(o => o.type === 'memo').length} optimizations</li>
                <li><strong>useCallback:</strong> ${optimizations.filter(o => o.type === 'useCallback').length} optimizations</li>
                <li><strong>useMemo:</strong> ${optimizations.filter(o => o.type === 'useMemo').length} optimizations</li>
                <li><strong>Structural:</strong> ${optimizations.filter(o => o.type === 'structure').length} optimizations</li>
            </ul>
        </div>

        <div class="card">
            <h3>🔧 Applied Optimizations</h3>
            ${optimizations.map((opt, index) => `
                <div class="optimization-item">
                    <h4>${index + 1}. ${opt.description}</h4>
                    <p><strong>Type:</strong> ${opt.type} | <strong>Line:</strong> ${opt.lineNumber} | <strong>Confidence:</strong> ${opt.confidence}%</p>
                    
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${opt.confidence}%"></div>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <strong>Before:</strong>
                        <div class="code-block">${opt.originalCode}</div>
                        
                        <strong>After:</strong>
                        <div class="code-block">${opt.optimizedCode}</div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="card">
            <h3>📈 Expected Benefits</h3>
            <ul>
                <li>🚀 Reduced component re-renders</li>
                <li>⚡ Faster initial load times</li>
                <li>🧠 Better memory efficiency</li>
                <li>📱 Improved mobile performance</li>
                <li>🎯 Enhanced user experience</li>
            </ul>
        </div>

        <div class="card" style="text-align: center;">
            <p>⚡ Generated by Cipher Performance Optimizer</p>
            <p>Re-run analysis to verify improvements and find additional optimizations</p>
        </div>
    </div>
</body>
</html>`;
}

// Utility functions
function isReactComponent(text: string): boolean {
  return text.includes('export default function') || 
         (text.includes('const ') && text.includes('= () =>') && text.includes('return ('));
}

function hasReactMemo(text: string): boolean {
  return text.includes('React.memo') || text.includes('memo(');
}

function getOptimizationIcon(type: string): string {
  const icons = {
    memo: '🧠',
    useCallback: '📞',
    useMemo: '💭',
    structure: '🏗️'
  };
  return icons[type as keyof typeof icons] || '⚡';
}

function estimatePerformanceImprovement(optimizations: OptimizationSuggestion[]): number {
  const weights = {
    memo: 15,
    useCallback: 10,
    useMemo: 8,
    structure: 5
  };
  
  let totalImprovement = 0;
  optimizations.forEach(opt => {
    const weight = weights[opt.type as keyof typeof weights] || 3;
    totalImprovement += weight * (opt.confidence / 100);
  });
  
  return Math.min(Math.round(totalImprovement), 50); // Cap at 50%
}

async function applyFileChanges(editor: vscode.TextEditor, newContent: string): Promise<void> {
  const edit = new vscode.WorkspaceEdit();
  const fullRange = new vscode.Range(
    0, 0,
    editor.document.lineCount,
    editor.document.lineAt(editor.document.lineCount - 1).text.length
  );
  edit.replace(editor.document.uri, fullRange, newContent);
  await vscode.workspace.applyEdit(edit);
}