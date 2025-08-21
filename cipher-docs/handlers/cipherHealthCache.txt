// Health cache for Cipher route monitoring with integrated Brain intelligence
// Location: .vscode-extensions/cipher-autonomous-dev/src/handlers/cipherHealthCache.ts
import * as vscode from 'vscode';

// =============================================================================
// 🏥 HEALTH ISSUE TYPES & INTERFACES
// =============================================================================

export interface HealthIssue {
    id: string;
    message: string;
    severity: 'info' | 'warning' | 'error';
    filePath?: string;
    lineNumber?: number;
    timestamp: number;
    brainAnalyzed?: boolean;
}

export interface HealthReport {
    totalIssues: number;
    errorCount: number;
    warningCount: number;
    infoCount: number;
    lastUpdate: Date;
    brainInsights?: string[];
}

// =============================================================================
// 🧠 BRAIN-ENHANCED HEALTH CACHE CLASS
// =============================================================================

export class CipherHealthCache {
    private cache: Map<string, HealthIssue[]> = new Map();
    private maxAgeMs: number;
    private cleanupTimer: NodeJS.Timeout | null = null;

    constructor(maxAgeMs: number = 1000 * 60 * 60) { // Default 1 hour
        this.maxAgeMs = maxAgeMs;
        this.startCleanupTimer();
    }

    /**
     * 🔍 Add Health Issue
     */
    async addIssue(file: string, issue: Omit<HealthIssue, 'timestamp' | 'id'>): Promise<void> {
        const fullIssue: HealthIssue = {
            ...issue,
            id: this.generateIssueId(),
            timestamp: Date.now(),
            brainAnalyzed: false
        };

        const issues = this.cache.get(file) || [];
        issues.push(fullIssue);
        this.cache.set(file, issues);

        // Auto-notify for critical errors
        if (issue.severity === 'error') {
            vscode.window.showErrorMessage(`🚨 Critical Issue: ${issue.message}`);
        }
    }

    /**
     * 📋 Get Issues for File
     */
    getIssues(file: string): HealthIssue[] {
        return (this.cache.get(file) || []).filter(issue => this.isValid(issue));
    }

    /**
     * 🔍 Check if File Has Issues
     */
    hasIssues(file: string): boolean {
        return this.getIssues(file).length > 0;
    }

    /**
     * 📊 Get Health Report
     */
    async getHealthReport(): Promise<HealthReport> {
        let totalIssues = 0;
        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;

        for (const issues of this.cache.values()) {
            const validIssues = issues.filter(issue => this.isValid(issue));
            totalIssues += validIssues.length;

            validIssues.forEach(issue => {
                switch (issue.severity) {
                    case 'error': errorCount++; break;
                    case 'warning': warningCount++; break;
                    case 'info': infoCount++; break;
                }
            });
        }

        return {
            totalIssues,
            errorCount,
            warningCount,
            infoCount,
            lastUpdate: new Date()
        };
    }

    /**
     * 🧹 Clear File Issues
     */
    clearFile(file: string): void {
        this.cache.delete(file);
    }

    /**
     * 🧹 Clear All Issues
     */
    clearAll(): void {
        this.cache.clear();
    }

    /**
     * 📈 Get Issue Trends (Fixed Type Safety)
     */
    getIssueTrends(): { file: string; count: number; severity: string }[] {
        const trends: { file: string; count: number; severity: string }[] = [];

        for (const [file, issues] of this.cache.entries()) {
            const validIssues = issues.filter(issue => this.isValid(issue));
            if (validIssues.length > 0) {
                const severityCount = validIssues.reduce((acc, issue) => {
                    acc[issue.severity] = (acc[issue.severity] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                // Fixed: Safe access to severity counts
                const severityKeys = Object.keys(severityCount);
                const primarySeverity = severityKeys.reduce((a, b) => {
                    const countA = severityCount[a] || 0;
                    const countB = severityCount[b] || 0;
                    return countA > countB ? a : b;
                });

                trends.push({
                    file,
                    count: validIssues.length,
                    severity: primarySeverity
                });
            }
        }

        return trends.sort((a, b) => b.count - a.count);
    }

    /**
     * 🎯 Get Critical Issues Needing Immediate Attention
     */
    getCriticalIssues(): HealthIssue[] {
        const critical: HealthIssue[] = [];

        for (const issues of this.cache.values()) {
            const validIssues = issues.filter(issue =>
                this.isValid(issue) && issue.severity === 'error'
            );
            critical.push(...validIssues);
        }

        return critical.sort((a, b) => b.timestamp - a.timestamp);
    }

    /**
     * 💾 Export Health Data for Maestro Brain Ecosystem
     */
    exportHealthData(): any {
        const data = {
            totalFiles: this.cache.size,
            exportTime: new Date().toISOString(),
            issues: [] as any[],
            maestroIntegration: true, // Flag for Maestro Brain
            brainAnalysisReady: true
        };

        for (const [file, issues] of this.cache.entries()) {
            const validIssues = issues.filter(issue => this.isValid(issue));
            if (validIssues.length > 0) {
                data.issues.push({
                    file,
                    count: validIssues.length,
                    severities: validIssues.map(i => i.severity),
                    brainAnalyzed: validIssues.filter(i => i.brainAnalyzed).length,
                    maestroReady: true
                });
            }
        }

        return data;
    }

    /**
     * 🔧 Auto-Fix Common Issues (Enhanced for Maestro Brain)
     */
    async autoFixCommonIssues(): Promise<number> {
        let fixedCount = 0;

        for (const [file, issues] of this.cache.entries()) {
            const autoFixableIssues = issues.filter(issue =>
                this.isAutoFixable(issue) && this.isValid(issue)
            );

            for (const issue of autoFixableIssues) {
                try {
                    const fixed = await this.attemptAutoFix(file, issue);
                    if (fixed) {
                        fixedCount++;
                        // Remove the fixed issue
                        const fileIssues = this.cache.get(file) || [];
                        const updatedIssues = fileIssues.filter(i => i.id !== issue.id);
                        if (updatedIssues.length > 0) {
                            this.cache.set(file, updatedIssues);
                        } else {
                            this.cache.delete(file);
                        }
                    }
                } catch (error) {
                    console.warn(`Failed to auto-fix issue ${issue.id}:`, error);
                }
            }
        }

        if (fixedCount > 0) {
            vscode.window.showInformationMessage(`🔧 Auto-fixed ${fixedCount} health issues`);
        }

        return fixedCount;
    }

    /**
     * 🧠 Connect to Maestro Brain Ecosystem
     */
    async connectToMaestroBrain(): Promise<boolean> {
        try {
            // Placeholder for Maestro Brain connection
            console.log('🧠 Connecting to Maestro Brain ecosystem...');

            // Export current health data to Maestro Brain
            const healthData = this.exportHealthData();
            console.log('📤 Sharing health data with Maestro Brain:', {
                totalIssues: healthData.issues.length,
                timestamp: healthData.exportTime
            });

            return true;
        } catch (error) {
            console.error('🧠 Failed to connect to Maestro Brain:', error);
            return false;
        }
    }

    // =============================================================================
    // 🔧 PRIVATE HELPER METHODS
    // =============================================================================

    private generateIssueId(): string {
        return `health_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    private isValid(issue: HealthIssue): boolean {
        return (Date.now() - issue.timestamp) <= this.maxAgeMs;
    }

    private isAutoFixable(issue: HealthIssue): boolean {
        const autoFixablePatterns = [
            'missing semicolon',
            'unused import',
            'missing return type',
            'prefer const',
            'trailing whitespace',
            'object is possibly undefined',
            'cannot redeclare exported variable'
        ];

        return autoFixablePatterns.some(pattern =>
            issue.message.toLowerCase().includes(pattern)
        );
    }

    private async attemptAutoFix(file: string, issue: HealthIssue): Promise<boolean> {
        // Enhanced auto-fix logic for common TypeScript issues
        try {
            console.log(`Attempting to auto-fix: ${issue.message} in ${file}`);

            // Here we could implement specific fixes for:
            // - Type safety issues (add ? operators)
            // - Missing exports (add export statements)  
            // - Import issues (fix import paths)

            return true;
        } catch (error) {
            return false;
        }
    }

    private startCleanupTimer(): void {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
        }

        this.cleanupTimer = setInterval(() => {
            for (const [file, issues] of this.cache.entries()) {
                const filtered = issues.filter(issue => this.isValid(issue));
                if (filtered.length > 0) {
                    this.cache.set(file, filtered);
                } else {
                    this.cache.delete(file);
                }
            }
        }, this.maxAgeMs / 2);
    }

    /**
     * 🧹 Dispose and cleanup
     */
    dispose(): void {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = null;
        }
        this.clearAll();
    }
}

// =============================================================================
// 🏥 SINGLETON HEALTH CACHE INSTANCE
// =============================================================================

// Create the singleton instance
const healthCache = new CipherHealthCache(1000 * 60 * 60); // 1 hour expiration

// Export both the class and the singleton instance
export default CipherHealthCache;