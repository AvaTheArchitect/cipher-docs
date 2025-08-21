import * as vscode from 'vscode';
import { displayLogInsights } from '../../shared/displayUtils';
import { ensureDirectoryExists, getBrainInterface } from '../../shared/utils';

export async function viewWatcherLogsHandler(): Promise<void> {
    try {
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            // Fallback log viewing without brain interface
            await runFallbackLogViewing();
            return;
        }
        
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        const logsDir = vscode.Uri.joinPath(workspaceFolder.uri, 'maestro-logs');

        try {
            const logFiles = await vscode.workspace.fs.readDirectory(logsDir);

            if (logFiles.length === 0) {
                await handleNoLogFiles();
                return;
            }

            // 🧠 Brain-enhanced log file analysis
            const brainAnalyzedLogs = await Promise.all(
                logFiles
                    .filter(([name, type]) => type === vscode.FileType.File && name.endsWith('.log'))
                    .map(async ([name]) => {
                        const logPath = vscode.Uri.joinPath(logsDir, name);
                        const logContent = await vscode.workspace.fs.readFile(logPath);
                        const contentString = logContent.toString();
                        
                        const logAnalysis = await brainInterface.analyzeLogFile?.(contentString) || analyzeLogFileFallback(contentString, name);
                        
                        return {
                            label: `${getSeverityIcon(logAnalysis.severity)} ${name}`,
                            description: `🧠 ${logAnalysis.summary} | ${logAnalysis.events} events | ${logAnalysis.insights?.length || 0} insights`,
                            detail: `Size: ${Math.round(contentString.length / 1024)}KB | Priority: ${logAnalysis.priority || 'normal'}`,
                            value: name,
                            analysis: logAnalysis
                        };
                    })
            );

            // Enhanced sorting by brain priority, severity, and recency
            brainAnalyzedLogs.sort((a, b) => {
                const priorityA = a.analysis.priority === 'high' ? 3 : a.analysis.priority === 'medium' ? 2 : 1;
                const priorityB = b.analysis.priority === 'high' ? 3 : b.analysis.priority === 'medium' ? 2 : 1;
                
                if (priorityA !== priorityB) return priorityB - priorityA;
                
                const severityA = getSeverityScore(a.analysis.severity);
                const severityB = getSeverityScore(b.analysis.severity);
                
                if (severityA !== severityB) return severityB - severityA;
                
                return b.value.localeCompare(a.value); // Most recent first
            });

            const selectedLog = await vscode.window.showQuickPick(brainAnalyzedLogs, {
                placeHolder: '🧠 Select log file to view (Brain-analyzed with insights)',
                matchOnDescription: true,
                matchOnDetail: true
            });

            if (!selectedLog) return;

            // Open log file with brain insights
            const logFile = vscode.Uri.joinPath(logsDir, selectedLog.value);
            const doc = await vscode.workspace.openTextDocument(logFile);
            await vscode.window.showTextDocument(doc);

            // 🧠 Enhanced learning from log viewing
            await brainInterface.learnFromAnalysis('log-viewing', {
                success: true,
                logFile: selectedLog.value,
                severity: selectedLog.analysis.severity,
                events: selectedLog.analysis.events,
                priority: selectedLog.analysis.priority,
                insights: selectedLog.analysis.insights?.length || 0,
                timestamp: new Date().toISOString()
            });

            // Enhanced brain insights display
            if (selectedLog.analysis.insights && selectedLog.analysis.insights.length > 0) {
                const showInsights = await vscode.window.showInformationMessage(
                    `🧠 Brain found ${selectedLog.analysis.insights.length} insights in this log!\n\nWould you like to view the detailed analysis?`,
                    'View Insights',
                    'Generate Report',
                    'Export Analysis',
                    'Skip'
                );
                
                if (showInsights === 'View Insights') {
                    await displayLogInsights(selectedLog);
                } else if (showInsights === 'Generate Report') {
                    await generateLogAnalysisReport(selectedLog);
                } else if (showInsights === 'Export Analysis') {
                    await exportLogAnalysis(selectedLog);
                }
            }

        } catch (error) {
            await handleLogDirectoryError(logsDir);
        }
        
    } catch (error) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
            await brainInterface.learnFromAnalysis('log-viewing', {
                success: false,
                error: error?.toString(),
                timestamp: new Date().toISOString()
            });
        }
        vscode.window.showErrorMessage(`🧠 Brain log viewing failed: ${error}`);
    }
}

// Helper functions
async function runFallbackLogViewing(): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
    }

    const logsDir = vscode.Uri.joinPath(workspaceFolder.uri, 'maestro-logs');

    try {
        const logFiles = await vscode.workspace.fs.readDirectory(logsDir);

        if (logFiles.length === 0) {
            vscode.window.showInformationMessage('No log files found - start the watcher to generate logs');
            return;
        }

        // Basic log file listing without brain analysis
        const basicLogs = logFiles
            .filter(([name, type]) => type === vscode.FileType.File && name.endsWith('.log'))
            .map(([name]) => ({
                label: `📄 ${name}`,
                description: 'Basic log file (no brain analysis available)',
                value: name
            }));

        const selectedLog = await vscode.window.showQuickPick(basicLogs, {
            placeHolder: 'Select log file to view (fallback mode)'
        });

        if (!selectedLog) return;

        // Open log file
        const logFile = vscode.Uri.joinPath(logsDir, selectedLog.value);
        const doc = await vscode.workspace.openTextDocument(logFile);
        await vscode.window.showTextDocument(doc);

        vscode.window.showInformationMessage('📄 Log file opened! (Brain analysis unavailable in fallback mode)');

    } catch (error) {
        vscode.window.showInformationMessage('🧠 No logs directory found yet. Start the watcher to generate logs.');
    }
}

async function handleNoLogFiles(): Promise<void> {
    const createAction = await vscode.window.showInformationMessage(
        '📭 No log files found yet.\n\n🧠 Brain suggests starting the watcher to generate comprehensive logs with learning insights.',
        'Start Watcher',
        'Create Sample Logs',
        'OK'
    );
    
    if (createAction === 'Start Watcher') {
        vscode.commands.executeCommand('cipher.startMaestroWatcher');
    } else if (createAction === 'Create Sample Logs') {
        await createSampleLogs();
    }
}

async function handleLogDirectoryError(logsDir: vscode.Uri): Promise<void> {
    const createAction = await vscode.window.showInformationMessage(
        '🧠 No logs directory found yet. Brain recommends starting the watcher to generate comprehensive logs with learning insights.',
        'Start Watcher',
        'Create Logs Directory',
        'Manual Setup',
        'OK'
    );
    
    if (createAction === 'Start Watcher') {
        vscode.commands.executeCommand('cipher.startMaestroWatcher');
    } else if (createAction === 'Create Logs Directory') {
        await ensureDirectoryExists(logsDir);
        await createSampleLogs();
    } else if (createAction === 'Manual Setup') {
        await showLogSetupInstructions();
    }
}

async function createSampleLogs(): Promise<void> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) return;

    const logsDir = vscode.Uri.joinPath(workspaceFolder.uri, 'maestro-logs');
    await ensureDirectoryExists(logsDir);

    const sampleLog = `# 🎵 Cipher Maestro Watcher Log
# Generated: ${new Date().toISOString()}

[${new Date().toISOString()}] INFO: Maestro Watcher started
[${new Date().toISOString()}] INFO: Guitar monitoring initialized
[${new Date().toISOString()}] INFO: Vocal monitoring initialized
[${new Date().toISOString()}] INFO: Brain learning system active
[${new Date().toISOString()}] DEBUG: System health check passed
[${new Date().toISOString()}] INFO: Watcher ready for monitoring

# This is a sample log file for demonstration
# Real logs will be generated when the watcher is active`;

    const sampleLogFile = vscode.Uri.joinPath(logsDir, `sample-log-${Date.now()}.log`);
    await vscode.workspace.fs.writeFile(sampleLogFile, Buffer.from(sampleLog));

    vscode.window.showInformationMessage('📝 Sample log file created! Run the handler again to view it.');
}

async function showLogSetupInstructions(): Promise<void> {
    const instructions = `📚 Log Setup Instructions:\n\n## 🎯 How to Generate Logs\n1. Start the Maestro Watcher system\n2. Let it run for a few minutes to collect data\n3. Logs will be automatically generated in the maestro-logs directory\n\n## 📁 Log File Locations\n- **Directory:** workspace/maestro-logs/\n- **Format:** .log files with timestamps\n- **Types:** System, Guitar, Vocal, Brain learning logs\n\n## 🧠 Brain Analysis Features\n- Automatic log pattern recognition\n- Severity level detection\n- Event counting and categorization\n- Insight generation from log patterns\n\n## 🔧 Troubleshooting\n- Ensure workspace folder is available\n- Verify watcher permissions\n- Check disk space for log storage`;

    vscode.window.showInformationMessage(instructions, { modal: true });
}

async function generateLogAnalysisReport(selectedLog: any): Promise<void> {
    const report = `# 📊 Log Analysis Report\n\n**File:** ${selectedLog.value}\n**Generated:** ${new Date().toLocaleString()}\n\n## 🧠 Brain Analysis Summary\n- **Severity:** ${selectedLog.analysis.severity}\n- **Total Events:** ${selectedLog.analysis.events}\n- **Priority Level:** ${selectedLog.analysis.priority}\n- **Insights Found:** ${selectedLog.analysis.insights?.length || 0}\n\n## 📋 Key Insights\n${selectedLog.analysis.insights?.map((insight: string) => `- ${insight}`).join('\n') || '- No specific insights available'}\n\n## 📈 Event Analysis\n- **Log Summary:** ${selectedLog.analysis.summary}\n- **Pattern Recognition:** Active\n- **Anomaly Detection:** ${selectedLog.analysis.severity === 'error' ? 'Issues detected' : 'Normal operation'}\n\n## 🎯 Recommendations\n${selectedLog.analysis.recommendations?.map((rec: string) => `- ${rec}`).join('\n') || '- Continue monitoring'}\n\n---\n*Generated by Cipher Brain-Enhanced Log Analysis*`;

    await vscode.env.clipboard.writeText(report);
    vscode.window.showInformationMessage('📊 Log analysis report copied to clipboard!');
}

async function exportLogAnalysis(selectedLog: any): Promise<void> {
    const analysis = `# 📤 Log Analysis Export\n\n**File:** ${selectedLog.value}\n**Export Date:** ${new Date().toLocaleString()}\n\n## Raw Analysis Data\n\`\`\`json\n${JSON.stringify(selectedLog.analysis, null, 2)}\n\`\`\`\n\n## Brain Insights\n${selectedLog.analysis.insights?.map((insight: string) => `- ${insight}`).join('\n') || '- No insights available'}\n\n## Usage Notes\n- This export contains the complete brain analysis\n- Use this data for further processing or reporting\n- Insights are generated by the Cipher Brain system`;

    await vscode.env.clipboard.writeText(analysis);
    vscode.window.showInformationMessage('📤 Complete log analysis exported to clipboard!');
}

function analyzeLogFileFallback(content: string, fileName: string): any {
    const lines = content.split('\n');
    const events = lines.filter(line => line.includes('[') && line.includes(']')).length;
    
    const hasErrors = content.toLowerCase().includes('error');
    const hasWarnings = content.toLowerCase().includes('warn');
    
    const severity = hasErrors ? 'error' : hasWarnings ? 'warning' : 'info';
    const priority = hasErrors ? 'high' : hasWarnings ? 'medium' : 'normal';
    
    const insights: string[] = [];
    if (hasErrors) insights.push('Error conditions detected in log');
    if (hasWarnings) insights.push('Warning conditions found');
    if (events > 100) insights.push('High activity log with many events');
    
    return {
        severity,
        priority,
        events,
        summary: `${events} events logged with ${severity} level activity`,
        insights,
        recommendations: hasErrors ? ['Review error conditions', 'Check system health'] : ['Log appears normal']
    };
}

function getSeverityIcon(severity: string): string {
    switch (severity) {
        case 'error': return '🔴';
        case 'warning': return '🟡';
        case 'info': return '🟢';
        default: return '📄';
    }
}

function getSeverityScore(severity: string): number {
    switch (severity) {
        case 'error': return 3;
        case 'warning': return 2;
        case 'info': return 1;
        default: return 0;
    }
}