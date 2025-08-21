import * as vscode from 'vscode';
import { displayTeamReport } from '../../shared/displayUtils';
import { generateTeamReportHTML } from '../../shared/templateGenerators';
import { ensureDirectoryExists, getBrainInterface } from '../../shared/utils';

export async function generateTeamReportHandler(): Promise<void> {
    try {
        const brainInterface = getBrainInterface();
        if (!brainInterface) {
            vscode.window.showErrorMessage('🧠 Brain interface not available');
            return;
        }
        
        vscode.window.showInformationMessage('👥🧠 Brain generating comprehensive team report...');

        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            vscode.window.showErrorMessage('No workspace folder found');
            return;
        }

        // 🧠 Brain-powered team analysis
        const [guitarTeamData, vocalTeamData, teamInsights, collaborationMetrics] = await Promise.all([
            brainInterface.analyzeGuitar(),
            brainInterface.analyzeVocal(),
            brainInterface.analyzeTeamPerformance?.() || getDefaultTeamInsights(),
            brainInterface.getCollaborationMetrics?.() || getDefaultCollaborationMetrics()
        ]);

        const teamReportData = {
            guitarMetrics: guitarTeamData,
            vocalMetrics: vocalTeamData,
            teamInsights: teamInsights,
            collaboration: collaborationMetrics,
            brainConfidence: 85,
            generatedAt: new Date().toISOString()
        };

       const teamReport = await generateTeamReportHTML();

        // Create team reports directory
        const reportsDir = vscode.Uri.joinPath(workspaceFolder.uri, 'cipher-reports', 'team');
        await ensureDirectoryExists(reportsDir);

        // Save brain-enhanced team report
        const reportFile = vscode.Uri.joinPath(reportsDir, `brain-team-report-${Date.now()}.html`);
        await vscode.workspace.fs.writeFile(reportFile, Buffer.from(teamReport));

        // 🧠 Learn from report generation
        await brainInterface.learnFromAnalysis('team-report-generation', {
            success: true,
            reportSize: teamReport.length,
            teamSize: collaborationMetrics.teamSize,
            confidence: teamInsights.confidence
        });
        // Open the report and display insights
vscode.env.openExternal(reportFile);
await displayTeamReport({
    title: "Team Report",
    content: teamReport,
    data: {} as any,
    brainConfidence: 85,
    generatedAt: Date.now(),
    guitarMetrics: { health: 80, status: "good", components: [] },
    vocalMetrics: { health: 80, status: "good", components: [] },
    collaboration: { teamSize: 1, score: 80, projectHealth: "good" },
    teamInsights: { productivity: 80, insights: [], recommendations: [] }
});

vscode.window.showInformationMessage(
    `👥 Brain-enhanced team report generated!\n🧠 Team Confidence: ${teamInsights.confidence}%`
);
    } catch (error) {
        const brainInterface = getBrainInterface();
        if (brainInterface) {
            await brainInterface.learnFromAnalysis('team-report-generation', {
                success: false,
                error: error?.toString()
            });
        }
        vscode.window.showErrorMessage(`🧠 Brain team report failed: ${error}`);
    }
}

// Helper functions for default data
function getDefaultTeamInsights(): any {
    return {
        confidence: 80,
        productivity: 85,
        collaboration: 78,
        insights: ['Team coordination is effective', 'Good knowledge sharing'],
        recommendations: ['Continue current practices', 'Add more documentation']
    };
}

function getDefaultCollaborationMetrics(): any {
    return {
        teamSize: 1,
        activeContributors: 1,
        communicationFrequency: 'moderate',
        projectHealth: 'good',
        collaborationTools: ['vscode', 'git'],
        score: 75
    };
}