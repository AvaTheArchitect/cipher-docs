// 🔧 Master Types.ts - July 14th Foundation + v9 Enhanced Compatibility + Practice Generator Integration - July 14th, 2025
// Location: .vscode-extensions/cipher-autonomous-dev/src/shared/types.ts
// Comprehensive handler-tested types with v9 extension.ts compatibility + Practice Generator audio integration

import * as vscode from 'vscode';

// =============================================================================
// 🔧 CORE CIPHER TYPES (Your July 14th Foundation - Enhanced)
// =============================================================================

export interface CipherConfig {
    autonomousMode: boolean;
    musicDomain: 'guitar' | 'voice' | 'piano' | 'drums' | 'all';
    deployTarget: 'vercel' | 'netlify' | 'github-pages';
    betaTesterNotifications: boolean;
    autoFixEnabled: boolean;
    masterBrainIntegration: boolean;
    realTimeGPTSync: boolean;
    // 🧠 Enhanced brain-specific settings
    brainLearningEnabled?: boolean;
    musicIntelligenceLevel?: 'basic' | 'advanced' | 'expert';
    autoSuggestionsEnabled?: boolean;
    version: string;
    musicGenres: MusicGenre[];
    brainIntegration: {
        enabled: boolean;
        learningMode: boolean;
        musicIntelligence: boolean;
    };
    development: {
        autoGeneration: boolean;
        templateEngine: boolean;
        routeManagement: boolean;
    };
    features: {
        guitarSupport: boolean;
        vocalSupport: boolean;
        audioProcessing: boolean;
        theoryIntegration: boolean;
        songsterrIntegration?: boolean;  // 🎸 ADDED: Songsterr support
        tabParsing?: boolean;            // 🎸 ADDED: Tab parsing support
    };
    // 🎸 ADDED: Songsterr-specific configuration
    songsterr?: SongsterrConfig;
}

export interface ComponentInfo {
    name: string;
    path: string;
    type: 'functional' | 'class' | 'hook' | 'component';
    exports?: string[];
    dependencies: string[];
    issues?: string[];
    musicDomain?: MusicDomain;
    genre?: MusicGenre;
    complexity?: number;
    brainIntegrated?: boolean;
    musicComponent?: boolean;
    // 🎸 ADDED: Songsterr integration properties
    songsterrModule?: boolean;
    audioEngineSupport?: boolean;
    tabParsingCapable?: boolean;
    timestamp?: number;
}

export interface MusicComponentInfo {
    name: string;
    type: 'guitar' | 'vocal' | 'audio' | 'theory';
    complexity: 'basic' | 'intermediate' | 'advanced';
    features: string[];
    suggestions: string[];
    genre?: MusicGenre;
    instruments?: string[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    // 🎸 ADDED: Songsterr integration properties
    songsterrCompatible?: boolean;
    audioTracks?: AudioTrack[];
    tabData?: ParsedTab;
    chordSupport?: ChordInfo[];
    musicDomain?: string;
    optimizedCode?: string;
    path?: string;
    dependencies?: string[];
    timestamp?: Date | number;
}

export interface AnalysisResult {
    file?: string;
    source?: string;
    issues: string[];
    suggestions: OptimizationSuggestion[] | string[];
    lastChecked?: Date;
    fileCount: number;
    issueCount: number;
    healthStatus: string;
    projectName?: string;
    architecture?: string;
    routes: RouteInfo[];          // ✅ FIXED: Non-optional since handlers expect it
    components?: ComponentInfo[];
    componentCount: number; 
    workingRoutes: number; // ✅ FIXED: Non-optional since handlers expect it
    musicRoutes: number; // ✅ FIXED: Non-optional since handlers expect it
    missingRoutes: number; // ✅ FIXED: Non-optional since handlers expect it
    musicComponents?: MusicComponentInfo[];
    brainInsights?: BrainInsight[];
    timestamp?: number;
    healthScore: number;
    totalFiles?: number;
    hooks?: number;
    utils?: number;
    analysis?: string;
    confidence?: number;
    brainAnalysis?: {
        analyzeCurrentFile: string;
        analysisType: string;
        confidence: number;
        missingRoutes: string;
        patterns: string[];
        suggestions: string[];
        learningData: unknown;
        timestamp: Date;
        source?: string;
    };
    
    // ✅ v9 ADDED: Additional properties that extension.ts expects
    brainMusicComponents?: BrainMusicComponentInfo[];  // ✅ ADDED: Brain music component analysis
    learningContext?: LearningContext;                 // ✅ ADDED: Learning context data
    routeHealth?: RouteHealthInfo[];                   // ✅ ADDED: Route health information
    dailyData?: DailyReportData;                       // ✅ ADDED: Daily report data
    predictiveAnalysis?: PredictiveAnalysis;           // ✅ ADDED: Predictive analysis data
    
    // 🎸 ADDED: Songsterr integration analysis
    songsterrAnalysis?: {
        zipFileAnalysis?: ZipFileAnalysis;
        buildProgress?: BuildProgress;
        moduleAnalysis?: SongsterrModuleConfig[];
        audioAnalysis?: AudioEngineAnalysis;
    };
}

// ✅ FIXED: RouteInfo without circular reference but complete properties
export interface RouteInfo {
    path: string;
    component: string;
    exists?: boolean;
    issues?: string[];
    isMusicRoute?: boolean;
    status: "active" | "missing" | "deprecated" | "working" | "warning" | "error";
    warnings?: string[]; // 🎯 Make it optional with ?
    url?: string;
    type?: string;                // ✅ FIXED: Optional to handle undefined cases
    // 🆕 ADD these optional properties for enhanced route tree:
    projectColor?: string;
    routeType?: string;
    fullPath?: string;
    size?: number;
    // 🎸 ADDED: Songsterr integration properties
    songsterrEnabled?: boolean;
    audioSupport?: boolean;
    tabProcessing?: boolean;
}

// ✅ FIXED: Make OptimizationSuggestion properties optional for handlers that don't provide them
export interface OptimizationSuggestion {
    type: 'memo' | 'useCallback' | 'useMemo' | 'structure' | 'performance' | 'audio' | 'songsterr';  // 🎸 ADDED: audio & songsterr types
    description: string;
    message?: string;              // ✅ FIXED: Optional for backward compatibility
    severity?: 'info' | 'warning' | 'error'; // ✅ FIXED: Optional for backward compatibility
    fix?: string;                 // ✅ FIXED: Optional for backward compatibility
    lineNumber: number;
    originalCode: string;
    optimizedCode: string;
    confidence: number;
    musicSpecific?: boolean;
    // 🎸 ADDED: Songsterr optimization properties
    audioOptimization?: boolean;
    songsterrOptimization?: boolean;
    performanceImpact?: 'low' | 'medium' | 'high';
}

export interface FileAnalysis {
    issues: string[];
    suggestions: string[];
    fileType: string;
    complexity: number;
    canAutoFix: boolean;
    musicRelated?: boolean;
    brainSuggestions?: string[];
    optimizations?: OptimizationSuggestion[];
    optimizedCode?: string;
    // 🎸 ADDED: Songsterr file analysis
    songsterrCompatible?: boolean;
    audioFileDetected?: boolean;
    tabDataFound?: boolean;
    zipFileAnalysis?: ZipFileAnalysis;
    confidence?: number;
    originalCode?: string;
    source?: string;
    timestamp?: number;
}

// =============================================================================
// 🎸 SONGSTERR INTEGRATION TYPES (Complete Audio Processing Suite)
// =============================================================================

export interface SongsterrConfig {
    autoProcess: boolean;
    buildPath: string;
    enableBrainLearning: boolean;
    complexityThreshold: 'low' | 'medium' | 'high';
    audioEngine: AudioEngineConfig;
    fileWatcher: FileWatcherConfig;
    // 🧠 Enhanced Brain integration for Songsterr
    brainAnalysis?: boolean;
    intelligentModuleGeneration?: boolean;
    autoTabParsing?: boolean;
    realTimeAudioProcessing?: boolean;
}

export interface AudioEngineConfig {
    sampleRate?: number;
    bufferSize?: number;
    latencyHint?: 'interactive' | 'balanced' | 'playback';
    // 🧠 ADDED: Brain-enhanced audio settings
    intelligentBuffering?: boolean;
    adaptiveLatency?: boolean;
    brainOptimization?: boolean;
}

export interface SongsterrModuleConfig {
    name: string;
    path: string;
    dependencies: string[];
    complexity: 'low' | 'medium' | 'high';
    priority: number;
    hasWebAudio: boolean;
    hasCanvas: boolean;
    description: string;
    // 🧠 ADDED: Brain intelligence properties
    brainGenerated?: boolean;
    intelligenceLevel?: number;
    learningData?: BrainLearningContext;
    musicDomain?: MusicDomain;
}

export interface ZipFileAnalysis {
    totalFiles: number;
    hasSpecs: boolean;
    hasImplementations: boolean;
    missingModules: string[];
    specFiles: string[];
    implementationFiles: string[];
    routeMapFound: boolean;
    suggestedActions: string[];
    // 🧠 ADDED: Brain analysis properties
    brainRecommendations?: string[];
    intelligenceScore?: number;
    optimizedCode?: string;
    autoFixPossible?: boolean;
    musicContentDetected?: {
        tabFiles: number;
        audioFiles: number;
        chordData: number;
        musicTheory: number;
        timestamp?: number;
        source?: string;
    };
}

export interface BuildProgress {
    currentModule: string;
    completedModules: string[];
    totalModules: number;
    progress: number;
    estimatedTimeRemaining: number;
    // 🧠 ADDED: Brain learning integration
    brainInsights?: BrainInsight[];
    intelligenceOptimizations?: string[];
    learningEvents?: BrainLearningContext[];
}

export interface BrainLearningContext {
    action: string;
    result: 'success' | 'failure';
    context?: any;
    timestamp: number;
    moduleType?: string;
    // Enhanced learning properties
    confidence?: number;
    learningValue?: number;
    musicRelevance?: number;
    userFeedback?: 'positive' | 'negative' | 'neutral';
}

// 🎵 Audio Processing Types
export interface AudioTrack {
    id: string;
    name: string;
    instrument: string;
    audioBuffer?: AudioBuffer;
    gain: number;
    muted: boolean;
    solo: boolean;
    // 🧠 ADDED: Brain intelligence properties
    brainAnalyzed?: boolean;
    intelligentEffects?: AudioEffect[];
    musicAI?: {
        detectedChords?: ChordInfo[];
        suggestedImprovements?: string[];
        harmonyAnalysis?: HarmonyAnalysis;
    };
}

export interface TabNote {
    string: number;
    fret: number;
    time: number;
    duration: number;
    velocity?: number;
    // 🧠 ADDED: Brain analysis properties
    technique?: string;
    difficulty?: number;
    musicTheory?: {
        note: string;
        interval?: string;
        chordFunction?: string;
    };
}

export interface TabMeasure {
    number: number;
    notes: TabNote[];
    timeSignature?: [number, number];
    tempo?: number;
    // 🧠 ADDED: Brain music analysis
    complexity?: number;
    chordAnalysis?: ChordAnalysis;
    rhythmPattern?: string;
    brainSuggestions?: string[];
}

export interface ChordInfo {
    name: string;
    frets: number[];
    fingers: number[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    alternateNames?: string[];
    // 🧠 ADDED: Brain intelligence properties
    musicTheory?: {
        root: string;
        quality: string;
        intervals: string[];
        function?: string;
        progression?: string;
    };
    brainRecommendations?: {
        similarChords?: ChordInfo[];
        progressionSuggestions?: string[];
        fingering?: AlternateFingering[];
    };
}

export interface ParsedTab {
    title: string;
    artist: string;
    album?: string;
    tuning: string[];
    tempo: number;
    timeSignature: [number, number];
    tracks: ParsedTrack[];
    measures: TabMeasure[];
    // 🧠 ADDED: Brain analysis properties
    brainAnalysis?: {
        difficulty?: number;
        genre?: MusicGenre;
        keySignature?: string;
        chordProgression?: string[];
        techniques?: string[];
        learningPath?: string[];
    };
    musicAI?: {
        harmonyAnalysis?: HarmonyAnalysis;
        structureAnalysis?: SongStructure;
        performanceHints?: PerformanceHint[];
    };
}

export interface ParsedTrack {
    id: string;
    name: string;
    instrument: string;
    channel: number;
    strings: number;
    tuning: number[];
    // 🧠 ADDED: Brain intelligence for tracks
    brainOptimized?: boolean;
    intelligentEffects?: AudioEffect[];
    musicAnalysis?: {
        role?: 'lead' | 'rhythm' | 'bass' | 'percussion';
        complexity?: number;
        techniques?: string[];
        suggestions?: string[];
    };
}

// 🎵 Enhanced Music Analysis Types
export interface AudioEffect {
    type: 'reverb' | 'delay' | 'chorus' | 'distortion' | 'eq' | 'compressor';
    parameters: Record<string, number>;
    brainOptimized?: boolean;
    musicContext?: string;
}

export interface HarmonyAnalysis {
    keyCenter: string;
    chordProgression: string[];
    harmonicRhythm: number;
    nonChordTones: string[];
    modulations: string[];
    functionalAnalysis: string[];
}

export interface ChordAnalysis {
    primaryChords: ChordInfo[];
    secondaryChords: ChordInfo[];
    progression: string;
    functionalHarmony: string[];
    voiceLeading: VoiceLeadingAnalysis;
}

export interface VoiceLeadingAnalysis {
    smoothness: number;
    parallelMotion: number;
    contraryMotion: number;
    suggestions: string[];
}

export interface SongStructure {
    sections: SongSection[];
    form: string;
    keyChanges: KeyChange[];
    dynamicMap: DynamicMarking[];
}

export interface SongSection {
    name: string;
    measures: [number, number];
    key: string;
    tempo?: number;
    dynamics?: string;
}

export interface KeyChange {
    measure: number;
    fromKey: string;
    toKey: string;
    type: 'modulation' | 'tonicization' | 'chromatic';
}

export interface DynamicMarking {
    measure: number;
    level: string;
    type: 'crescendo' | 'diminuendo' | 'sforzando' | 'accent';
}

export interface PerformanceHint {
    measure: number;
    hint: string;
    priority: 'low' | 'medium' | 'high';
    category: 'technique' | 'interpretation' | 'timing' | 'dynamics';
}

export interface AlternateFingering {
    frets: number[];
    fingers: number[];
    difficulty: number;
    advantages: string[];
}

// Module Generation Types
export interface ModuleTemplate {
    name: string;
    content: string;
    imports: string[];
    exports: string[];
    tests?: string;
    dependencies: string[];
    // 🧠 ADDED: Brain generation properties
    brainGenerated?: boolean;
    intelligenceLevel?: number;
    musicOptimized?: boolean;
    complexityScore?: number;
}

export interface ModuleBuildPlan {
    modules: SongsterrModuleConfig[];
    buildOrder: string[];
    estimatedTime: number;
    dependencies: string[];
    conflicts: string[];
    // 🧠 ADDED: Brain planning properties
    brainOptimized?: boolean;
    intelligenceInsights?: BrainInsight[];
    musicComplexityScore?: number;
    learningOpportunities?: string[];
}

// VS Code Integration Types
export interface CommandContext {
    extensionPath: string;
    workspacePath: string;
    outputChannel: any; // vscode.OutputChannel
    // 🧠 ADDED: Brain context
    brainConnector?: any;
    intelligenceLevel?: number;
    musicPreferences?: UserMusicPreferences;
}

export interface FileWatcherConfig {
    pattern: string;
    enabled: boolean;
    autoProcess: boolean;
    // 🧠 ADDED: Brain learning integration
    brainLearning?: boolean;
    intelligentFiltering?: boolean;
    musicFileDetection?: boolean;
}

// Error & Analysis Types
export interface SongsterrError {
    code: string;
    message: string;
    context?: any;
    timestamp: number;
    recoverable: boolean;
    // 🧠 ADDED: Brain error analysis
    brainAnalyzed?: boolean;
    intelligentSolution?: string;
    learningValue?: number;
}

export interface AudioEngineAnalysis {
    performance: PerformanceMetrics;
    compatibility: CompatibilityCheck;
    optimization: AudioOptimization[];
    brainInsights: BrainInsight[];
}

export interface CompatibilityCheck {
    webAudioSupport: boolean;
    audioContextAvailable: boolean;
    mediaDevicesSupported: boolean;
    recommendedSettings: AudioEngineConfig;
}

export interface UserMusicPreferences {
    instruments: InstrumentType[];
    genres: MusicGenre[];
    skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
    learningGoals: string[];
    preferredComplexity: 'simple' | 'moderate' | 'complex';
}

// =============================================================================
// 🧠 BRAIN INTELLIGENCE TYPES (July 8th Complete Structure)
// =============================================================================

export interface BrainStatus {
    connected: boolean;
    brainPath: string;
    capabilities: {
        musicIntelligence: boolean;
        patternRecognition: boolean;
        personalizedSuggestions: boolean;
        crossSystemLearning: boolean;
        // 🎸 ADDED: Songsterr capabilities
        tabParsing?: boolean;
        audioAnalysis?: boolean;
        chordRecognition?: boolean;
        harmonyGeneration?: boolean;
    };
    lastSync?: Date;
    version?: string;
    initialized: boolean;
    cache: CacheInfo;
    integration: IntegrationStatus;
    lastActivity?: Date;
    // 🎸 ADDED: Songsterr integration status
    songsterrModule?: {
        enabled: boolean;
        version: string;
        audioEngine: string;
        lastActivity: Date;
    };
}

export interface BrainCapabilities {
    guitarAnalysis: boolean;
    vocalAnalysis: boolean;
    patternRecognition: boolean;
    personalizedSuggestions: boolean;
    crossSystemLearning: boolean;
    musicTheoryIntegration: boolean;
    realTimeIntelligence: boolean;
    componentGeneration: boolean;
    // 🎸 ADDED: Songsterr capabilities
    tabParsing?: boolean;
    audioProcessing?: boolean;
    chordGeneration?: boolean;
    harmonyAnalysis?: boolean;
    songStructureAnalysis?: boolean;
    performanceOptimization?: boolean;
}

export interface BrainAnalysisData {
    analyzeCurrentFile: string;
    analysisType: string;
    confidence: number;
    patterns: string[];
    suggestions: string[];
    learningData: unknown;
    timestamp: Date;
    musicContext?: {
        genre: MusicGenre;
        instruments: string[];
        complexity: string;
        // 🎸 ADDED: Songsterr context
        tabData?: ParsedTab;
        audioTracks?: AudioTrack[];
        chordProgression?: string[];
        harmonyAnalysis?: HarmonyAnalysis;
    };
}

export interface CacheInfo {
    size: number;
    lastUpdate: Date | null;
    itemTypes: string[];
    maxSize: number;
    hitRate?: number;
    // 🎸 ADDED: Songsterr cache info
    audioBuffers?: number;
    tabData?: number;
    chordPatterns?: number;
    musicTheoryCache?: number;
}

export interface IntegrationStatus {
    initialized: boolean;
    version: string;
    brainConnected: boolean;
    musicIntelligenceActive: boolean;
    learningActive: boolean;
    lastSync?: Date;
    // 🎸 ADDED: Songsterr integration status
    songsterrActive?: boolean;
    audioEngineStatus?: 'active' | 'inactive' | 'error';
    tabParsingEnabled?: boolean;
    chordRecognitionActive?: boolean;
}

// ✅ v9 Enhanced Learning Context - FIXED for extension.ts compatibility
export interface LearningContext {
    userId: string;                   // ✅ ADDED: Required by extension.ts v9
    sessionId?: string;               // ✅ Optional session ID
    action: string;                   // User action being tracked
    context: any;                     // Context data for learning  
    timestamp: number;                // ✅ FIXED: Use number instead of Date for v9
    environment?: string;             // ✅ ADDED: VS Code version
    metadata?: {                      // ✅ ADDED: Additional metadata
        version?: string;
        workspace?: string;
        // 🎸 ADDED: Songsterr metadata
        songsterrVersion?: string;
        audioEngineType?: string;
        musicComplexity?: string;
    };
    frequency?: number;               // ✅ PRESERVE: Existing property
    patterns?: string[];              // ✅ PRESERVE: Existing property
    musicPreferences?: {              // ✅ PRESERVE: Existing property
        guitarPreference: number;
        vocalPreference: number;
        routeUsage: number;
        // 🎸 ADDED: Songsterr preferences
        tabParsingPreference?: number;
        audioProcessingPreference?: number;
        chordAnalysisPreference?: number;
    };
    recentAnalyses?: CacheEntry[];    // ✅ PRESERVE: Existing property
    cacheSize?: number;               // ✅ PRESERVE: Existing property
    userPreferences?: UserPreferences; // ✅ PRESERVE: Existing property
    sessionData?: SessionData;        // ✅ PRESERVE: Existing property
    // 🎸 ADDED: Songsterr learning context
    songsterrContext?: {
        filesProcessed: number;
        tabsParsed: number;
        audioAnalyzed: number;
        chordsRecognized: number;
        learningEvents: BrainLearningContext[];
    };
}

export interface LearningInsight {
    type: string;
    pattern: string;
    confidence: number;
    frequency: number;
    lastSeen: Date;
    actionable: boolean;
    // 🎸 ADDED: Songsterr learning insights
    musicSpecific?: boolean;
    audioRelated?: boolean;
    tabProcessing?: boolean;
    chordRecognition?: boolean;
    harmonyAnalysis?: boolean;
}

// =============================================================================
// 🏥 ROUTE HEALTH AUDIT TYPES (Complete July 8th Structure)
// =============================================================================

export interface RouteHealthAudit {
    // ✅ FIXED: Add missing properties that handlers expect
    overallHealth: 'healthy' | 'warning' | 'critical';
    routeHealth: RouteHealthInfo[];
    criticalIssues: string[];
    recommendations: string[];
    musicRouteCount: number;
    timestamp: Date;
    
    // Additional properties
    overall: 'healthy' | 'warning' | 'critical';
    score: number;
    issues: string[];
    routes: RouteHealthInfo[];  // ✅ Alias for compatibility
    brainAnalysis?: BrainAnalysisData;
    musicRoutesDetected?: number;
    intelligenceEnhanced?: boolean;
    // 🎸 ADDED: Songsterr route health
    songsterrRoutes?: number;
    audioRoutes?: number;
    tabProcessingRoutes?: number;
}

export interface RouteHealthInfo {
    // ✅ v9 REQUIRED: Properties that extension.ts expects directly
    path: string;                     // Route path (required by extension.ts)
    component: string;                // Component name (required by extension.ts)
    status: "active" | "missing" | "deprecated";  // ✅ FIXED: Match RouteInfo.status exactly
    route: RouteInfo;                 // Full route information (required by extension.ts)
    lastChecked: number;              // ✅ FIXED: Use number timestamp for v9
    issues: string[];                 // Issues found (required by extension.ts)
    musicRoute: boolean;              // ✅ FIXED: Required by extension.ts (not optional)
    
    // ✅ v9 REQUIRED: Additional properties extension.ts expects
    healthScore?: number;             // Health score (0-100)
    recommendations?: string[];       // Recommended actions
    health?: string;                  // Overall health status string
    checks?: {                        // Health check results - FIXED: Remove duplicate performance
        performance?: number;         // ✅ KEEP: Performance score (number)
        accessibility?: number;
        bestPractices?: number;
        exists?: boolean;
        accessible?: boolean;
        hasTests?: boolean;
        hasDocumentation?: boolean;
        performanceRating?: 'excellent' | 'good' | 'poor' | 'unknown';  // ✅ FIXED: Renamed to avoid conflict
        // 🎸 ADDED: Songsterr-specific checks
        audioSupport?: boolean;
        tabProcessing?: boolean;
        chordRecognition?: boolean;
        songsterrCompatibility?: number;
    };
    
    // ✅ PRESERVE: Existing comprehensive properties
    type?: string;
    exists?: boolean;
    isMusicRoute?: boolean;           // ✅ PRESERVE: Legacy alias
    url?: string;
    musicOptimized?: boolean;
    brainSuggestions?: BrainInsight[];
    musicOptimizations?: string[];
    // 🎸 ADDED: Songsterr optimization properties
    songsterrOptimizations?: string[];
    audioOptimizations?: AudioOptimization[];
    tabOptimizations?: string[];
}

// =============================================================================
// 🌅 DAILY SYSTEM REPORTING TYPES (July 8th Complete)
// =============================================================================

export interface DailyReportData {
    date: string;                     // Report date (YYYY-MM-DD)
    
    // ✅ v9 REQUIRED: Properties that extension.ts v9 expects
    analysisCount: number;            // ✅ ADDED: Number of analyses performed (required by extension.ts)
    generatedFiles: number;           // Number of files generated
    brainInteractions: number;        // ✅ ADDED: Brain interaction count (required by extension.ts)
    summary: string;                  // Daily summary
    
    // ✅ PRESERVE: Existing comprehensive properties
    projectHealth: number;
    completedTasks: number;
    codeQuality: number;
    musicComponentsAdded: number;
    brainInsightsCount?: number;      // ✅ PRESERVE: Renamed to avoid duplicate
    issues: {
        critical: number;
        warnings: number;
        resolved: number;
    };
    recommendations: string[];
    overallScore: number;
    dependencies: DependencyMetrics;
    routes: RouteMetrics;
    performance: PerformanceCheckMetrics;
    security: SecurityMetrics;
    gitStatus: GitStatusMetrics;
    timestamp: string;
    brainInsights?: BrainAnalysisData;  // ✅ PRESERVE: Keep this as the data object
    musicDevelopmentScore?: number;
    intelligenceLevel?: number;
    
    // ✅ ADDED: Additional metrics for v9 compatibility  
    totalCommands?: number;           // Total commands executed
    activeHandlers?: number;          // Number of active handlers
    musicComponentsAnalyzed?: number; // Music components processed
    routesProcessed?: number;         // Routes analyzed
    learningEvents?: number;          // Learning events recorded
    performanceMetrics?: ComponentPerformanceMetrics;
}

export interface LearningEvent {
    type: string;
    data: any;
    user: string;
    timestamp: Date;
    context: any;
    importance: number;
    // 🎸 ADDED: Songsterr learning event properties
    songsterrRelated?: boolean;
    audioLearning?: boolean;
    tabLearning?: boolean;
    chordLearning?: boolean;
    harmonyLearning?: boolean;
    musicDomain?: MusicDomain;
}

export interface AnalyticsEvent {
    event: string;
    category: 'analysis' | 'generation' | 'user' | 'system' | 'audio' | 'songsterr';  // 🎸 ADDED: new categories
    properties: Record<string, any>;
    timestamp: Date;
    sessionId: string;
    // 🎸 ADDED: Songsterr analytics properties
    songsterrModule?: string;
    audioEngine?: string;
    tabFormat?: string;
    chordData?: boolean;
    harmonyData?: boolean;
    performanceData?: ComponentPerformanceMetrics;
}

// =============================================================================
// 🎯 UTILITY TYPES (Enhanced)
// =============================================================================

export type AnalysisType = 'project' | 'file' | 'route' | 'performance' | 'guitar' | 'vocal' | 'audio' | 'theory' | 'songsterr' | 'tab' | 'chord' | 'harmony';  // 🎸 ADDED: new types

export type SuggestionPriority = 'low' | 'medium' | 'high' | 'critical';

export type FileCategory = 'component' | 'utility' | 'style' | 'test' | 'config' | 'music' | 'unknown' | 'audio' | 'tab' | 'songsterr';  // 🎸 ADDED: new categories

export type BrainOperation = 'analyze' | 'suggest' | 'generate' | 'learn' | 'optimize' | 'status' | 'parse' | 'recognize' | 'process';  // 🎸 ADDED: new operations

export type MusicOperation = 'guitar-analysis' | 'vocal-analysis' | 'audio-processing' | 'theory-generation' | 'component-creation' | 'tab-parsing' | 'chord-recognition' | 'harmony-analysis';  // 🎸 ADDED: new operations

// 🎸 ADDED: Songsterr-specific utility types
export type SongsterrOperation = 'tab-parse' | 'audio-process' | 'chord-recognize' | 'harmony-analyze' | 'module-generate' | 'performance-optimize';

export type AudioEngineType = 'web-audio' | 'tone-js' | 'custom' | 'native' | 'hybrid';

export type TabFormat = 'gp3' | 'gp4' | 'gp5' | 'gpx' | 'gp' | 'ptb' | 'tg' | 'musicxml' | 'midi';

export type ChordType = 'major' | 'minor' | 'dominant' | 'diminished' | 'augmented' | 'suspended' | 'extended' | 'altered';

export type HarmonyType = 'diatonic' | 'chromatic' | 'modal' | 'atonal' | 'jazz' | 'classical' | 'contemporary';

// =============================================================================
// 🎸 SONGSTERR UTILITY CONSTANTS & TYPE GUARDS
// =============================================================================

// Utility type guards from original Songsterr types
export const isSongsterrModule = (obj: any): obj is SongsterrModuleConfig => {
    return obj && 
           typeof obj.name === 'string' &&
           typeof obj.path === 'string' &&
           Array.isArray(obj.dependencies) &&
           typeof obj.complexity === 'string' &&
           typeof obj.priority === 'number';
};

export const isZipAnalysis = (obj: any): obj is ZipFileAnalysis => {
    return obj && 
           typeof obj.totalFiles === 'number' &&
           typeof obj.hasSpecs === 'boolean' &&
           typeof obj.hasImplementations === 'boolean' &&
           Array.isArray(obj.missingModules);
};

export const isTabNote = (obj: any): obj is TabNote => {
    return obj &&
           typeof obj.string === 'number' &&
           typeof obj.fret === 'number' &&
           typeof obj.time === 'number' &&
           typeof obj.duration === 'number';
};

export const isAudioTrack = (obj: any): obj is AudioTrack => {
    return obj &&
           typeof obj.id === 'string' &&
           typeof obj.name === 'string' &&
           typeof obj.instrument === 'string' &&
           typeof obj.gain === 'number';
};

export const isChordInfo = (obj: any): obj is ChordInfo => {
    return obj &&
           typeof obj.name === 'string' &&
           Array.isArray(obj.frets) &&
           Array.isArray(obj.fingers);
};

export const isParsedTab = (obj: any): obj is ParsedTab => {
    return obj &&
           typeof obj.title === 'string' &&
           typeof obj.artist === 'string' &&
           Array.isArray(obj.tuning) &&
           typeof obj.tempo === 'number' &&
           Array.isArray(obj.tracks) &&
           Array.isArray(obj.measures);
};

// =============================================================================
// 🎸 SONGSTERR CONSTANTS
// =============================================================================

export const SONGSTERR_FILE_EXTENSIONS = ['.gp3', '.gp4', '.gp5', '.gpx', '.gp', '.ptb', '.tg', '.musicxml', '.mid', '.midi'];
export const AUDIO_FILE_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac', '.wma'];
export const SUPPORTED_ZIP_TYPES = ['application/zip', 'application/x-zip-compressed', 'application/x-zip'];

export const DEFAULT_SONGSTERR_CONFIG: SongsterrConfig = {
    autoProcess: true,
    buildPath: 'src/components',
    enableBrainLearning: true,
    complexityThreshold: 'medium',
    audioEngine: {
        sampleRate: 44100,
        latencyHint: 'interactive',
        bufferSize: 256,
        intelligentBuffering: true,
        adaptiveLatency: true,
        brainOptimization: true
    },
    fileWatcher: {
        pattern: 'maestro-ai-input/**/*.zip',
        enabled: true,
        autoProcess: true,
        brainLearning: true,
        intelligentFiltering: true,
        musicFileDetection: true
    },
    brainAnalysis: true,
    intelligentModuleGeneration: true,
    autoTabParsing: true,
    realTimeAudioProcessing: true
};

export const DEFAULT_AUDIO_ENGINE_CONFIG: AudioEngineConfig = {
    sampleRate: 44100,
    bufferSize: 256,
    latencyHint: 'interactive',
    intelligentBuffering: true,
    adaptiveLatency: true,
    brainOptimization: true
};

export const GUITAR_TUNINGS = {
    standard: ['E', 'A', 'D', 'G', 'B', 'E'],
    dropD: ['D', 'A', 'D', 'G', 'B', 'E'],
    openG: ['D', 'G', 'D', 'G', 'B', 'D'],
    dadgad: ['D', 'A', 'D', 'G', 'A', 'D'],
    halfStep: ['Eb', 'Ab', 'Db', 'Gb', 'Bb', 'Eb'],
    wholestep: ['D', 'G', 'C', 'F', 'A', 'D']
} as const;

export const CHORD_QUALITIES = {
    major: ['1', '3', '5'],
    minor: ['1', 'b3', '5'],
    dominant: ['1', '3', '5', 'b7'],
    diminished: ['1', 'b3', 'b5'],
    augmented: ['1', '3', '#5'],
    major7: ['1', '3', '5', '7'],
    minor7: ['1', 'b3', '5', 'b7']
} as const;

export const TIME_SIGNATURES = [
    [4, 4], [3, 4], [2, 4], [6, 8], [9, 8], [12, 8],
    [5, 4], [7, 4], [3, 8], [5, 8], [7, 8]
] as const;

// =============================================================================
// 🎉 EXPORT CONVENIENCE ALIASES
// =============================================================================

export type {
    AnalysisResult as Analysis, ChordInfo as Chord, ComponentInfo as Component, BrainLearningContext as LearningData, MusicComponentInfo as MusicComponent,
    OptimizationSuggestion as Optimization, ComponentPerformanceMetrics as Performance, BuildProgress as Progress,
    // 🎸 ADDED: Songsterr convenience aliases
    SongsterrModuleConfig as SongsterrModule, ParsedTab as Tab, AudioTrack as Track, ZipFileAnalysis as ZipAnalysis
};

// 🆕 ADD THESE TO YOUR EXISTING types.ts FILE
// Just add these interfaces and update the RouteInfo.status line

// =============================================================================
// 🆕 ENHANCED ROUTE TREE TYPES (Add to existing file - Updated for Songsterr)
// =============================================================================

// 🆕 Enhanced Export Types for AI consumption:
export interface ExportOptions {
    format: 'markdown' | 'ascii' | 'json' | 'html' | 'ai-export';
    includeStats: boolean;
    includeDetails: boolean;
    projectFilter?: string[];
    timestamp?: boolean;
    // 🎸 ADDED: Songsterr export options
    includeSongsterrData?: boolean;
    includeAudioData?: boolean;
    includeTabData?: boolean;
    includeChordData?: boolean;
    includePerformanceData?: boolean;
}

export interface ExportResult {
    content: string;
    filename: string;
    mimeType: string;
    size: number;
    timestamp: number;
    // 🎸 ADDED: Songsterr export result properties
    songsterrData?: any;
    audioData?: any;
    tabData?: any;
    performanceData?: ComponentPerformanceMetrics;
}

export interface AIExportData {
    metadata: {
        generated: string;
        version: string;
        exportType: string;
        // 🎸 ADDED: Songsterr metadata
        songsterrVersion?: string;
        audioEngineVersion?: string;
        tabParserVersion?: string;
    };
    ecosystem: {
        overview: EcosystemStats;
        projects: EcosystemProject[];
        // 🎸 ADDED: Songsterr ecosystem data
        songsterrModules?: SongsterrModuleConfig[];
        audioTracks?: AudioTrack[];
        tabCollection?: ParsedTab[];
    };
    analysis: {
        health: string;
        recommendations: string[];
        technicalStack: Record<string, number>;
        // 🎸 ADDED: Songsterr analysis data
        musicStack?: Record<string, number>;
        audioAnalysis?: AudioEngineAnalysis;
        tabAnalysis?: TabAnalysisResult;
        performanceMetrics?: ComponentPerformanceMetrics;
    };
    structure: {
        asciiTree: string;
        markdownTree: string;
        jsonData: any;
        // 🎸 ADDED: Songsterr structure data
        songsterrTree?: string;
        audioTree?: string;
        tabTree?: string;
    };
}

export interface TreeExportOptions {
    includeStats: boolean;
    includeHealth: boolean;
    includePaths: boolean;
    maxDepth: number;
    format: 'ascii' | 'markdown' | 'json' | 'ai-complete';
    // 🎸 ADDED: Songsterr tree export options
    includeSongsterrNodes?: boolean;
    includeAudioNodes?: boolean;
    includeTabNodes?: boolean;
    includePerformanceMetrics?: boolean;
}

// 🆕 Enhanced Handler Types:
export interface HandlerResult {
    success: boolean;
    message: string;
    data?: any;
    timestamp: number;
    duration?: number;
    // 🎸 ADDED: Songsterr handler result properties
    songsterrProcessed?: boolean;
    audioProcessed?: boolean;
    tabParsed?: boolean;
    chordsRecognized?: number;
    performanceMetrics?: ComponentPerformanceMetrics;
}

export interface HandlerContext {
    workspaceFolder?: vscode.WorkspaceFolder;
    activeEditor?: vscode.TextEditor;
    brainEnabled: boolean;
    extensionContext: vscode.ExtensionContext;
    // 🎸 ADDED: Songsterr handler context
    songsterrEnabled?: boolean;
    audioEngineAvailable?: boolean;
    tabParserAvailable?: boolean;
    chordRecognitionAvailable?: boolean;
    songsterrConfig?: SongsterrConfig;
}

// 🆕 Utility Types:
export interface ProcessingOptions {
    timeout?: number;
    retries?: number;
    verbose?: boolean;
    cacheResults?: boolean;
    // 🎸 ADDED: Songsterr processing options
    audioProcessing?: boolean;
    tabParsing?: boolean;
    chordRecognition?: boolean;
    harmonyAnalysis?: boolean;
    performanceOptimization?: boolean;
    brainEnhancement?: boolean;
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    suggestions: string[];
    // 🎸 ADDED: Songsterr validation properties
    songsterrCompatible?: boolean;
    audioSupported?: boolean;
    tabParsingSupported?: boolean;
    chordRecognitionSupported?: boolean;
    performanceScore?: number;
}

// 🎸 ADDED: Songsterr-specific result types
export interface TabAnalysisResult {
    accuracy: number;
    complexity: number;
    recognizedElements: number;
    supportedFeatures: string[];
    unsupportedFeatures: string[];
    recommendations: string[];
    performanceMetrics: ComponentPerformanceMetrics;
    confidence?: number;
}

export interface AudioProcessingResult {
    quality: number;
    latency: number;
    bufferHealth: number;
    processingLoad: number;
    recommendations: string[];
    optimizations: AudioOptimization[];
    performanceMetrics: ComponentPerformanceMetrics;
}

export interface ChordRecognitionResult {
    accuracy: number;
    speed: number;
    recognizedChords: ChordInfo[];
    confidence: number[];
    suggestions: string[];
    performanceMetrics: ComponentPerformanceMetrics;
}

export interface HarmonyAnalysisResult {
    accuracy: number;
    complexity: number;
    harmonyData: HarmonyAnalysis;
    insights: BrainInsight[];
    recommendations: string[];
    performanceMetrics: ComponentPerformanceMetrics;
    confidence?: number;
}

// =============================================================================
// 🆕 Type Guards (Enhanced for Songsterr)
// =============================================================================

export function isRouteInfo(obj: any): obj is RouteInfo {
    return obj && typeof obj.path === 'string' && typeof obj.component === 'string';
}

export function isEcosystemProject(obj: any): obj is EcosystemProject {
    return obj && 
           typeof obj.name === 'string' && 
           typeof obj.color === 'string' && 
           Array.isArray(obj.routes) &&
           obj.stats &&
           typeof obj.stats.total === 'number';
}

export function isMusicComponentInfo(obj: any): obj is MusicComponentInfo {
    return obj &&
           typeof obj.name === 'string' &&
           typeof obj.type === 'string' &&
           typeof obj.complexity === 'string' &&
           Array.isArray(obj.features) &&
           Array.isArray(obj.suggestions);
}

export function isBrainInsight(obj: any): obj is BrainInsight {
    return obj &&
           typeof obj.type === 'string' &&
           typeof obj.confidence === 'number' &&
           typeof obj.recommendation === 'string' &&
           typeof obj.musicSpecific === 'boolean';
}

export function isAudioEngineConfig(obj: any): obj is AudioEngineConfig {
    return obj &&
           (typeof obj.sampleRate === 'number' || obj.sampleRate === undefined) &&
           (typeof obj.bufferSize === 'number' || obj.bufferSize === undefined) &&
           (typeof obj.latencyHint === 'string' || obj.latencyHint === undefined);
}

export function isBuildProgress(obj: any): obj is BuildProgress {
    return obj &&
           typeof obj.currentModule === 'string' &&
           Array.isArray(obj.completedModules) &&
           typeof obj.totalModules === 'number' &&
           typeof obj.progress === 'number';
}

export function isTabAnalysisResult(obj: any): obj is TabAnalysisResult {
    return obj &&
           typeof obj.accuracy === 'number' &&
           typeof obj.complexity === 'number' &&
           typeof obj.recognizedElements === 'number' &&
           Array.isArray(obj.supportedFeatures);
}

// =============================================================================
// 🆕 Constants (Enhanced for Songsterr)
// =============================================================================

export const PROJECT_COLORS = {
    cipher: '#8b5cf6',
    maestro: '#14b8a6', 
    ava: '#ec4899',
    modules: '#f59e0b',
    music: '#f97316',
    // 🎸 ADDED: Songsterr project colors
    songsterr: '#10b981',
    audio: '#3b82f6',
    tabs: '#8b5cf6',
    harmony: '#ec4899'
} as const;

export const ROUTE_STATUS_COLORS = {
    working: '#10b981',
    active: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    missing: '#6b7280',
    deprecated: '#9ca3af',
    // 🎸 ADDED: Songsterr status colors
    processing: '#3b82f6',
    optimizing: '#8b5cf6',
    learning: '#ec4899'
} as const;

export const MUSIC_DOMAIN_COLORS = {
    guitar: '#f97316',
    vocal: '#ec4899',
    audio: '#3b82f6',
    theory: '#8b5cf6',
    composition: '#10b981',
    recording: '#f59e0b',
    performance: '#ef4444',
    education: '#6b7280',
    // 🎸 ADDED: Songsterr domain colors
    tabs: '#14b8a6',
    songsterr: '#f97316'
} as const;

export const COMPLEXITY_COLORS = {
    basic: '#10b981',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
    // 🎸 ADDED: Songsterr complexity colors
    expert: '#8b5cf6',
    professional: '#ec4899'
} as const;

export const PERFORMANCE_THRESHOLDS = {
    excellent: 90,
    good: 70,
    acceptable: 50,
    poor: 30,
    critical: 10
} as const;

// =============================================================================
// 🎸 FINAL SONGSTERR INTEGRATION STATUS
// =============================================================================

export interface SongsterrIntegrationStatus {
    enabled: boolean;
    version: string;
    modules: {
        core: boolean;
        audio: boolean;
        tabs: boolean;
        chords: boolean;
        harmony: boolean;
        brain: boolean;
    };
    performance: {
        overall: number;
        audio: number;
        parsing: number;
        recognition: number;
        analysis: number;
    };
    statistics: {
        tabsParsed: number;
        audioProcessed: number;
        chordsRecognized: number;
        modulesGenerated: number;
        optimizationsApplied: number;
        learningEvents: number;
    };
    lastActivity: Date;
    health: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
}

// =============================================================================
// 🚀 FINAL EXPORT STATEMENT
// =============================================================================

// Export default configuration for easy import
export const DEFAULT_CIPHER_CONFIG: Partial<CipherConfig> = {
    autonomousMode: true,
    autoFixEnabled: true,
    masterBrainIntegration: true,
    brainLearningEnabled: true,
    musicIntelligenceLevel: 'advanced',
    autoSuggestionsEnabled: true,
    brainIntegration: {
        enabled: true,
        learningMode: true,
        musicIntelligence: true
    },
    development: {
        autoGeneration: true,
        templateEngine: true,
        routeManagement: true
    },
    features: {
        guitarSupport: true,
        vocalSupport: true,
        audioProcessing: true,
        theoryIntegration: true,
        songsterrIntegration: true,
        tabParsing: true
    }
};

// 🎯 Complete Type Safety Export for 40+ Handlers
export type CipherHandlerCompatible = 
    | AnalysisResult 
    | ComponentInfo 
    | MusicComponentInfo 
    | RouteInfo 
    | OptimizationSuggestion 
    | FileAnalysis 
    | BrainInsight
    | SongsterrModuleConfig
    | AudioTrack
    | ParsedTab
    | ChordInfo
    | BuildProgress;

// 🎸 System Status Types (Fixed TypeScript compatibility)
export interface CipherSystemStatus {
    types: 'complete';
    handlers: 'compatible';
    brain: 'enhanced';
    music: 'integrated';
    songsterr: 'ready';
    performance: 'optimized';
} 

// 🎸🧠🎵 CIPHER AUTONOMOUS DEVELOPMENT - FULLY LOADED & READY! 🎵🧠🎸
export interface ComponentPerformanceMetrics {
    averageResponseTime?: number;
    successRate?: number;
    brainAccuracy?: number;
    insights?: string[];              // Daily insights
    
    // 🎸 ADDED: Songsterr daily metrics
    songsterrMetrics?: {
        tabsParsed: number;
        audioFilesProcessed: number;
        chordsRecognized: number;
        modulesGenerated: number;
        audioOptimizations: number;
        brainLearningEvents: number;
        performanceScore: number;
        errorCount: number;
    };
}

export interface CodeQualityMetrics {
    score: number;
    issues: number;
    improvements: number;
    totalFiles: number;
    componentsAnalyzed: number;
    suggestions: string[];
    musicFilesAnalyzed?: number;
    brainEnhanced?: boolean;
    // 🎸 ADDED: Songsterr code quality
    songsterrFiles?: number;
    audioCodeQuality?: number;
    tabParsingAccuracy?: number;
}

export interface DependencyMetrics {
    total: number;
    productionDependencies: number;
    devDependencies: number;
    outdated: number;
    vulnerabilities: number;
    recommendations: string[];
    musicLibraries?: string[];
    audioLibraries?: string[];
    // 🎸 ADDED: Songsterr dependencies
    songsterrLibraries?: string[];
    tabParsingLibraries?: string[];
    audioProcessingLibraries?: string[];
}

export interface RouteMetrics {
    total: number;
    working: number;
    broken: number;
    healthScore: number;
    issues: string[];
    recommendations: string[];
    musicRoutes?: number;
    brainOptimized?: number;
    // 🎸 ADDED: Songsterr route metrics
    songsterrRoutes?: number;
    audioEnabledRoutes?: number;
    tabProcessingRoutes?: number;
}

export interface PerformanceCheckMetrics {
    score: number;
    bundleSize: string;
    loadTime: string;
    issues: string[];
    optimizations: string[];
    audioOptimizations?: AudioOptimization[];
    musicPerformanceScore?: number;
    // 🎸 ADDED: Songsterr performance metrics
    songsterrPerformance?: {
        tabParsingSpeed: number;
        audioProcessingLatency: number;
        chordRecognitionSpeed: number;
        memoryUsage: number;
        cacheEfficiency: number;
    };
}

export interface SecurityMetrics {
    score: number;
    vulnerabilities: string[];
    recommendations: string[];
    securePatterns: number;
    totalChecks: number;
    audioSecurityChecks?: number;
    // 🎸 ADDED: Songsterr security metrics
    songsterrSecurityChecks?: number;
    audioStreamSecurity?: number;
    fileUploadSecurity?: number;
}

export interface GitStatusMetrics {
    hasGit: boolean;
    branch: string;
    uncommittedChanges: number;
    lastCommit: string;
    recommendations: string[];
}

// =============================================================================
// 🔮 PREDICTIVE ANALYSIS TYPES (Complete July 8th Structure)
// =============================================================================

export interface PredictiveAnalysis {
    // ✅ v9 REQUIRED: Properties that extension.ts v9 expects
    analysisId?: string;              // ✅ ADDED: Unique analysis identifier
    context?: any;                    // ✅ ADDED: Analysis context
    predictions: PredictivePrediction[]; // Array of predictions (required)
    confidence?: number;              // Overall confidence (0-1) - made optional for v9
    timestamp?: number;               // ✅ FIXED: Use number instead of Date for v9
    metadata?: {                      // ✅ ADDED: Analysis metadata for v9
       generatedBy?: string;
        version?: string;
        dataPoints?: number;
        algorithm?: string;
        accuracy?: number;
        modelVersion?: string;
        // 🎸 ADDED: Songsterr prediction metadata
        songsterrVersion?: string;
        audioAnalysisPoints?: number;
        musicPatterns?: number;
    };
    
    // ✅ PRESERVE: Existing comprehensive properties
    timeframe?: string;               // ✅ PRESERVE: Make optional since handlers don't always provide
    musicTrends?: {                   // ✅ PRESERVE: Make optional since handlers don't always provide
        genre: MusicGenre;
        popularity: number;
        recommendation: string;
        // 🎸 ADDED: Songsterr music trends
        tabComplexity?: number;
        audioQuality?: number;
        chordProgression?: string[];
    }[];
    developmentTrends?: string[];     // ✅ PRESERVE: Make optional since handlers don't always provide
    patterns: string[];               // ✅ PRESERVE: Required by handlers
    complexity: 'low' | 'medium' | 'high'; // ✅ PRESERVE: Required by handlers
    trends: string[];                 // ✅ PRESERVE: Required by handlers
    brainConfidence?: number;         // ✅ PRESERVE: Existing property
    musicPredictions?: MusicPrediction[]; // ✅ PRESERVE: Existing property
    learningSource?: string;          // ✅ PRESERVE: Existing property
    // 🎸 ADDED: Songsterr predictions
    songsterrPredictions?: SongsterrPrediction[];
    audioPredictions?: AudioPrediction[];
    tabAnalysisPredictions?: TabAnalysisPrediction[];
}

export interface PredictivePrediction {
    // ✅ v9 REQUIRED: Properties that extension.ts v9 expects
    message: string;                  // ✅ ADDED: Prediction message (required by extension.ts v9)
    confidence: number;               // Confidence level (0-1) (required)
    type: 'performance' | 'growth' | 'risk' | 'opportunity' | 'maintenance' | 'security' | 'development' | 'system' | 'audio' | 'songsterr';  // ✅ ADDED: audio & songsterr types
    
    // ✅ PRESERVE: Existing comprehensive properties
    description: string;              // ✅ PRESERVE: Existing property
    impact?: 'low' | 'medium' | 'high';  // ✅ PRESERVE: Make optional since handlers don't always provide
    timeframe?: string;               // ✅ PRESERVE: Make optional since handlers don't always provide
    actionable?: boolean;             // ✅ PRESERVE: Make optional since handlers don't always provide
    musicSpecific?: boolean;          // ✅ PRESERVE: Existing property
    severity: 'low' | 'medium' | 'high' | 'critical'; // ✅ PRESERVE: Required by handlers
    suggestedAction?: string;         // ✅ PRESERVE: Existing property
    brainGenerated?: boolean;         // ✅ PRESERVE: Existing property
    musicRelated?: boolean;           // ✅ PRESERVE: Existing property
    learningBased?: boolean;          // ✅ PRESERVE: Existing property
    
    // ✅ ADDED: Additional v9 compatibility properties
    prediction?: string;              // Alternative prediction text
    reasoning?: string;               // Why this prediction was made
    category?: string;                // Prediction category
    
    // 🎸 ADDED: Songsterr prediction properties
    audioRelated?: boolean;
    songsterrSpecific?: boolean;
    tabAnalysis?: boolean;
    chordProgression?: boolean;
    harmonyPrediction?: boolean;
}

export interface MusicPrediction {
    type: 'guitar' | 'vocal' | 'audio' | 'theory';
    description: string;
    confidence: number;
    suggestedFeatures: string[];
    brainInsights: BrainInsight[];
    // 🎸 ADDED: Songsterr music predictions
    songsterrCompatible?: boolean;
    audioFeatures?: string[];
    tabComplexity?: number;
    chordAnalysis?: ChordInfo[];
}

// 🎸 ADDED: Songsterr-specific prediction types
export interface SongsterrPrediction {
    type: 'module' | 'performance' | 'compatibility' | 'optimization';
    description: string;
    confidence: number;
    impact: 'low' | 'medium' | 'high';
    suggestedAction: string;
    moduleAffected?: string;
    audioImpact?: boolean;
    tabProcessing?: boolean;
}

export interface AudioPrediction {
    type: 'latency' | 'quality' | 'performance' | 'compatibility';
    description: string;
    confidence: number;
    audioEngine: string;
    predictedValue: number;
    recommendation: string;
    optimizationSuggestions: string[];
}

export interface TabAnalysisPrediction {
    type: 'complexity' | 'accuracy' | 'performance' | 'learning';
    description: string;
    confidence: number;
    tabFile: string;
    predictedOutcome: string;
    suggestions: string[];
    brainInsights: BrainInsight[];
}

// =============================================================================
// 🔧 FILE REBUILDING TYPES (Complete July 8th Structure)
// =============================================================================

export interface RebuildRecommendation extends vscode.QuickPickItem {
    file?: string;                // ✅ FIXED: Optional since handlers don't always provide
    strategy: RebuildStrategy;
    reason?: string;              // ✅ FIXED: Optional since handlers don't always provide
    confidence?: number;          // ✅ FIXED: Optional since handlers don't always provide
    musicEnhanced?: boolean;
    estimatedTime?: string;       // ✅ FIXED: Optional since handlers don't always provide
    dependencies?: string[];      // ✅ FIXED: Optional since handlers don't always provide
    // 🎸 ADDED: Songsterr rebuild properties
    songsterrEnhanced?: boolean;
    audioOptimized?: boolean;
    tabProcessingEnabled?: boolean;
}

export interface RebuildStrategy {
    type: 'refactor' | 'rewrite' | 'optimize' | 'enhance' | 'smart' | 'full' | 'preserve' | 'songsterr' | 'audio';  // ✅ FIXED: Added missing types + Songsterr
    approach?: string;                // ✅ FIXED: Make optional since handlers don't always provide
    tools?: string[];                 // ✅ FIXED: Make optional since handlers don't always provide
    musicFeatures?: string[];
    brainIntegration?: boolean;
    // ✅ RESTORE: Properties that handlers expect
    preserveComments: boolean;
    enhanceTypes: boolean;
    addPerformanceOptimizations: boolean;
    includeTests: boolean;
    brainEnhanced?: boolean;
    musicOptimizations?: boolean;
    intelligenceLevel?: 'basic' | 'advanced' | 'expert';
    // 🎸 ADDED: Songsterr rebuild strategy
    songsterrIntegration?: boolean;
    audioProcessingOptimizations?: boolean;
    tabParsingEnhancements?: boolean;
    chordRecognitionFeatures?: boolean;
    harmonyAnalysisIntegration?: boolean;
}

// ✅ RESTORE: SupportedFileType as objects, not string unions
export interface SupportedFileType {
    extension: string;
    canAnalyze: boolean;
    canRebuild: boolean;
    parser: 'typescript' | 'javascript' | 'json' | 'markdown' | 'generic' | 'audio' | 'tab';  // 🎸 ADDED: audio & tab parsers
    musicSupport?: boolean;
    audioSupport?: boolean;
    brainSupport?: boolean;
    // 🎸 ADDED: Songsterr file type support
    songsterrSupport?: boolean;
    tabParsing?: boolean;
    audioAnalysis?: boolean;
    chordRecognition?: boolean;
}

// =============================================================================
// 🎵 MUSIC DOMAIN TYPES (July 8th Complete + Songsterr Enhanced)
// =============================================================================

export type MusicDomain = 
    | 'guitar'
    | 'vocal' 
    | 'audio'
    | 'theory'
    | 'composition'
    | 'recording'
    | 'performance'
    | 'education'
    | 'tabs'        // 🎸 ADDED: Tab processing domain
    | 'songsterr';  // 🎸 ADDED: Songsterr-specific domain

export type MusicGenre = 
    | 'rock'
    | 'metal'
    | 'blues'
    | 'country'
    | 'worship'
    | 'folk'
    | 'jazz'
    | 'classical'
    | 'electronic'
    | 'acoustic'    // 🎸 ADDED: Additional genres
    | 'indie'
    | 'alternative'
    | 'progressive';

export type MusicFileType = 'guitar' | 'vocal' | 'audio' | 'theory' | 'general' | 'unknown' | 'tab' | 'songsterr';  // 🎸 ADDED: tab & songsterr types

export type MusicComponentType = 'guitar' | 'vocal' | 'audio' | 'theory' | 'rhythm' | 'harmony' | 'tabs' | 'songsterr';  // 🎸 ADDED: tabs & songsterr types

export type InstrumentType = 'guitar' | 'voice' | 'piano' | 'drums' | 'bass' | 'synthesizer' | 'mixed' | 'electric-guitar' | 'acoustic-guitar';  // 🎸 ADDED: guitar variants

export interface MusicFeatureAnalysis {
    hasGuitarComponents: boolean;
    hasVocalComponents: boolean;
    hasAudioProcessing: boolean;
    detectedGenres: MusicGenre[];
    complexity: 'basic' | 'intermediate' | 'advanced';
    recommendations: string[];
    // 🎸 ADDED: Songsterr feature analysis
    hasTabProcessing?: boolean;
    hasSongsterrIntegration?: boolean;
    hasChordRecognition?: boolean;
    hasHarmonyAnalysis?: boolean;
    audioEngineDetected?: string;
    tabFormatsSupported?: string[];
}

export interface GuitarAnalysis {
    health: number;
    status: string;
    components: string[];
    chordPatterns: string[];
    techniques: string[];
    suggestions: string[];
    issues: string[];
    confidence: number;
    brainInsights: BrainInsight[];
    patterns?: GuitarPattern[];
    // 🎸 ADDED: Songsterr guitar analysis
    tabData?: ParsedTab;
    chordProgression?: ChordInfo[];
    fingerpickingPatterns?: FingerpickingPattern[];
    strummingPatterns?: StrummingPattern[];
    tuningAnalysis?: TuningAnalysis;
}
export interface GuitarAnalysisResult {
    health: number;
    status: string;
    components: string[];
    confidence: number;
    suggestions: string[];
    source?: string;
}

export interface VocalAnalysis {
    health: number;
    status: string;
    components: string[];
    pitchFeatures: string[];
    harmonyComponents: string[];
    suggestions: string[];
    issues: string[];
    confidence: number;
    brainInsights: BrainInsight[];
    patterns?: VocalPattern[];
    // 🎸 ADDED: Songsterr vocal analysis
    pitchRange?: PitchRange;
    harmonyAnalysis?: HarmonyAnalysis;
    vocalTechniques?: VocalTechnique[];
    breathingPatterns?: BreathingPattern[];
}
export interface VocalAnalysisResult {
    health: number;
    status: string;
    components: string[];
    confidence: number;
    suggestions: string[];
    source?: string;
}

export interface AudioAnalysis {
    health: number;
    status: string;
    components: string[];
    audioFeatures: string[];
    processingChain: string[];
    suggestions: string[];
    issues: string[];
    confidence: number;
    brainInsights: BrainInsight[];
    optimizations?: AudioOptimization[];
    // 🎸 ADDED: Songsterr audio analysis
    audioEngine?: AudioEngineAnalysis;
    frequencyAnalysis?: FrequencyAnalysis;
    dynamicsAnalysis?: DynamicsAnalysis;
    spatialAnalysis?: SpatialAnalysis;
    spectralAnalysis?: SpectralAnalysis;
}

export interface MusicTheoryAnalysis {
    health: number;
    status: string;
    scales: string[];
    chordProgressions: string[];
    keySignatures: string[];
    suggestions: string[];
    issues: string[];
    confidence: number;
    brainInsights: BrainInsight[];
    theoreticalPatterns?: TheoryPattern[];
    // 🎸 ADDED: Songsterr theory analysis
    functionalHarmony?: FunctionalHarmony;
    voiceLeading?: VoiceLeadingAnalysis;
    cadenceAnalysis?: CadenceAnalysis;
    modalAnalysis?: ModalAnalysis;
    counterpoint?: CounterpointAnalysis;
}

export interface BrainInsight {
    health: number;
    status: string;
    insights: string[];
    recommendations: string[];
    type: string;
    confidence: number;
    recommendation: string;
    musicSpecific: boolean;
    implementationSteps: string[];
    timestamp: Date;
    message: string;
    actionable: boolean;
    priority: 'low' | 'medium' | 'high';
    category: string;
    source: 'brain' | 'pattern' | 'learning' | 'analysis' | 'songsterr';  // 🎸 ADDED: songsterr source
    // 🎸 ADDED: Songsterr insight properties
    audioRelated?: boolean;
    tabProcessing?: boolean;
    chordAnalysis?: boolean;
    harmonyInsight?: boolean;
    performanceHint?: boolean;
}
export interface BrainInsightsResult {
    confidence: number;
    health: string;
    insights: string[];
    recommendations: string[];
}

// ✅ v9 ADDED: BrainMusicComponentInfo interface for extension.ts compatibility
export interface BrainMusicComponentInfo {
    name: string;                     // Component name (required by extension.ts v9)
    componentName?: string;           // Alternative name field
    type?: MusicComponentType;        // Music component type
    musicType?: 'guitar' | 'vocal' | 'audio' | 'theory' | 'tabs' | 'songsterr'; // Specific music type + Songsterr
    complexity?: 'basic' | 'intermediate' | 'advanced'; // Complexity level
    complexityLevel?: 'basic' | 'intermediate' | 'advanced'; // Alternative complexity field
    features?: string[];             // Component features
    detectedFeatures?: string[];     // Brain-detected features
    suggestions?: string[];          // Regular suggestions
    brainSuggestions?: string[];     // Brain-specific suggestions
    confidence?: number;             // Brain confidence in analysis
    brainGenerated?: boolean;        // Whether this was brain-generated
    timestamp?: Date; number;               // When this was analyzed
    path?: string;                
    metadata?: {                     // Additional metadata
        analysisId?: string;
        version?: string;
        accuracy?: number;
        // 🎸 ADDED: Songsterr metadata
        songsterrCompatible?: boolean;
        audioEngine?: string;
        tabFormat?: string;
        chordComplexity?: number;
    };
    // 🎸 ADDED: Songsterr component properties
    songsterrIntegration?: {
        tabSupport: boolean;
        audioProcessing: boolean;
        chordRecognition: boolean;
        harmonyAnalysis: boolean;
        performanceMetrics: PerformanceMetrics;
    };
}

// =============================================================================
// 🎼 MUSIC PATTERN TYPES (July 8th Complete + Songsterr Enhanced)
// =============================================================================

export interface GuitarPattern {
    name: string;
    type: 'chord' | 'scale' | 'technique' | 'progression' | 'fingerpicking' | 'strumming';  // 🎸 ADDED: new types
    pattern: string;
    difficulty: number;
    frequency: number;
    suggestions: string[];
    // 🎸 ADDED: Songsterr guitar pattern properties
    tabNotation?: string;
    chordDiagram?: ChordDiagram;
    fingering?: Fingering;
    techniques?: GuitarTechnique[];
}

export interface VocalPattern {
    name: string;
    type: 'pitch' | 'harmony' | 'technique' | 'exercise' | 'vibrato' | 'breath';  // 🎸 ADDED: new types
    pattern: string;
    range: string;
    frequency: number;
    suggestions: string[];
    // 🎸 ADDED: Songsterr vocal pattern properties
    pitchContour?: PitchContour;
    harmonicSeries?: number[];
    vocalTechnique?: VocalTechnique;
    breathingPattern?: BreathingPattern;
}

export interface TheoryPattern {
    name: string;
    type: 'scale' | 'chord' | 'progression' | 'mode' | 'cadence' | 'modulation';  // 🎸 ADDED: new types
    pattern: string;
    key: string;
    complexity: number;
    usage: number;
    // 🎸 ADDED: Songsterr theory pattern properties
    functionalAnalysis?: FunctionalAnalysis;
    romanNumerals?: string[];
    voiceLeading?: VoiceLeadingPattern;
    counterpoint?: CounterpointPattern;
}

export interface AudioOptimization {
    type: 'buffer' | 'context' | 'processing' | 'performance' | 'latency' | 'quality';  // 🎸 ADDED: new types
    description: string;
    impact: 'low' | 'medium' | 'high';
    implementation: string;
    confidence: number;
    // 🎸 ADDED: Songsterr audio optimization properties
    audioEngine?: string;
    bufferSize?: number;
    sampleRate?: number;
    latencyImprovement?: number;
    qualityMetrics?: AudioQualityMetrics;
}

// 🎸 ADDED: New Songsterr-specific pattern types
export interface FingerpickingPattern {
    name: string;
    pattern: string;
    fingering: string[];
    tempo: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    techniques: string[];
}

export interface StrummingPattern {
    name: string;
    pattern: string;
    downstrokes: boolean[];
    upstrokes: boolean[];
    tempo: number;
    timeSignature: [number, number];
    accent: boolean[];
}

export interface ChordDiagram {
    frets: number[];
    fingers: number[];
    muted: boolean[];
    open: boolean[];
    capo?: number;
    tuning?: string[];
}

export interface Fingering {
    leftHand: FingerPosition[];
    rightHand: FingerPosition[];
    technique: string;
    difficulty: number;
}

export interface FingerPosition {
    finger: number;
    string: number;
    fret: number;
    technique?: string;
}

export interface GuitarTechnique {
    name: string;
    type: 'picking' | 'fretting' | 'bending' | 'vibrato' | 'slide' | 'hammer' | 'pull';
    description: string;
    difficulty: number;
    application: string[];
}

export interface VocalTechnique {
    name: string;
    type: 'breathing' | 'resonance' | 'articulation' | 'vibrato' | 'belting' | 'falsetto';
    description: string;
    difficulty: number;
    application: string[];
}

export interface PitchRange {
    lowest: string;
    highest: string;
    comfortable: [string, string];
    tessitura: string;
    register: 'bass' | 'baritone' | 'tenor' | 'alto' | 'mezzo-soprano' | 'soprano';
}

export interface PitchContour {
    notes: string[];
    intervals: string[];
    shape: 'ascending' | 'descending' | 'arch' | 'valley' | 'plateau';
    range: number;
}

export interface BreathingPattern {
    inhale: number;
    hold: number;
    exhale: number;
    pause: number;
    technique: string;
}

export interface TuningAnalysis {
    currentTuning: string[];
    standardTuning: string[];
    deviationCents: number[];
    recommendation: string;
    stabilityScore: number;
}

export interface FrequencyAnalysis {
    fundamentalFrequency: number;
    harmonics: number[];
    spectralCentroid: number;
    spectralRolloff: number;
    spectralFlux: number;
}

export interface DynamicsAnalysis {
    averageLevel: number;
    peakLevel: number;
    dynamicRange: number;
    compression: number;
    loudnessLUFS: number;
}

export interface SpatialAnalysis {
    stereoWidth: number;
    centerBalance: number;
    spatialImage: string;
    panningInfo: PanningInfo[];
}

export interface SpectralAnalysis {
    spectralCentroid: number;
    spectralBandwidth: number;
    spectralContrast: number[];
    mfcc: number[];
    chromaVector: number[];
}

export interface PanningInfo {
    track: string;
    position: number;
    width: number;
    automation: PanAutomation[];
}

export interface PanAutomation {
    time: number;
    position: number;
    curve: 'linear' | 'logarithmic' | 'exponential';
}

export interface FunctionalHarmony {
    key: string;
    functions: HarmonicFunction[];
    cadences: Cadence[];
    modulations: Modulation[];
    nonChordTones: NonChordTone[];
}

export interface HarmonicFunction {
    chord: string;
    function: 'tonic' | 'subdominant' | 'dominant' | 'leading-tone' | 'mediant' | 'submediant';
    degree: string;
    inversion: number;
    quality: string;
}

export interface Cadence {
    type: 'authentic' | 'plagal' | 'deceptive' | 'half' | 'phrygian';
    chords: string[];
    strength: 'strong' | 'weak';
    position: number;
}

export interface Modulation {
    fromKey: string;
    toKey: string;
    type: 'pivot-chord' | 'common-tone' | 'chromatic' | 'enharmonic' | 'phrase';
    pivot?: string;
    measure: number;
}

export interface NonChordTone {
    type: 'passing' | 'neighbor' | 'suspension' | 'retardation' | 'anticipation' | 'escape' | 'appoggiatura';
    note: string;
    beat: number;
    resolution: string;
}

export interface CadenceAnalysis {
    cadences: Cadence[];
    frequency: Record<string, number>;
    strength: number;
    conventional: boolean;
}

export interface ModalAnalysis {
    mode: string;
    characteristic: string[];
    flavor: string;
    commonProgressions: string[][];
    relationship: string;
}

export interface CounterpointAnalysis {
    species: number;
    voices: number;
    intervals: string[];
    motion: MotionType[];
    dissonance: DissonanceAnalysis;
}

export interface MotionType {
    voices: [number, number];
    type: 'parallel' | 'similar' | 'contrary' | 'oblique';
    interval: string;
}

export interface DissonanceAnalysis {
    preparation: boolean;
    resolution: boolean;
    type: 'consonant' | 'perfect-consonant' | 'imperfect-consonant' | 'dissonant';
    treatment: string;
}

export interface FunctionalAnalysis {
    romanNumerals: string[];
    functions: string[];
    progressions: string[];
    cadences: string[];
    tonality: string;
}

export interface VoiceLeadingPattern {
    voices: VoiceMovement[];
    smoothness: number;
    independence: number;
    quality: 'excellent' | 'good' | 'acceptable' | 'poor';
}

export interface VoiceMovement {
    voice: string;
    movement: 'ascending' | 'descending' | 'static';
    interval: string;
    leap: boolean;
}

export interface CounterpointPattern {
    species: number;
    cantus: string[];
    counterpoint: string[];
    intervals: string[];
    quality: number;
}

export interface AudioQualityMetrics {
    snr: number;
    thd: number;
    dynamicRange: number;
    frequencyResponse: FrequencyResponse;
    bitDepth: number;
    sampleRate: number;
}

export interface FrequencyResponse {
    low: number;
    mid: number;
    high: number;
    flatness: number;
    rolloff: number;
}

// =============================================================================
// 🔄 LEARNING & ADAPTATION TYPES (July 8th Complete + Songsterr Enhanced)
// =============================================================================

export interface CacheEntry {
    type: string;
    data: any;
    timestamp: Date;
    source: string;
    category?: string;
    importance?: number;
    // 🎸 ADDED: Songsterr cache properties
    songsterrRelated?: boolean;
    audioData?: boolean;
    tabData?: boolean;
    chordData?: boolean;
    compressionLevel?: number;
}

export interface PatternData {
    commonComponents: string[];
    frequentIssues: [string, number][];
    suggestedImprovements: string[];
    musicPatterns: MusicPatternData;
    codePatterns: CodePattern[];
    // 🎸 ADDED: Songsterr pattern data
    songsterrPatterns?: SongsterrPatternData;
    audioPatterns?: AudioPatternData;
    tabPatterns?: TabPatternData;
}

export interface MusicPatternData {
    guitarUsage: number;
    vocalUsage: number;
    audioUsage: number;
    theoryUsage: number;
    preferredInstruments: string[];
    commonTechniques: string[];
    // 🎸 ADDED: Songsterr usage patterns
    tabProcessingUsage?: number;
    chordRecognitionUsage?: number;
    harmonyAnalysisUsage?: number;
    audioEngineUsage?: number;
}

export interface CodePattern {
    pattern: string;
    frequency: number;
    context: string;
    suggestions: string[];
    lastSeen: Date;
    // 🎸 ADDED: Songsterr code pattern properties
    musicRelated?: boolean;
    audioProcessing?: boolean;
    tabParsing?: boolean;
    performanceImpact?: 'low' | 'medium' | 'high';
}

export interface UserPreferences {
    musicDomain: string;
    preferredInstruments: string[];
    skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    focusAreas: string[];
    automationLevel: number;
    feedbackFrequency: 'low' | 'medium' | 'high';
    // 🎸 ADDED: Songsterr user preferences
    songsterrPreferences?: {
        autoTabParsing: boolean;
        audioProcessingQuality: 'low' | 'medium' | 'high';
        chordRecognitionEnabled: boolean;
        harmonyAnalysisEnabled: boolean;
        performanceOptimization: boolean;
        learningMode: boolean;
    };
}

export interface SessionData {
    startTime: Date;
    filesAnalyzed: number;
    componentsCreated: number;
    suggestionsAccepted: number;
    musicFilesWorked: number;
    brainInteractions: number;
    // 🎸 ADDED: Songsterr session data
    songsterrActivity?: {
        tabsParsed: number;
        audioFilesProcessed: number;
        chordsRecognized: number;
        modulesGenerated: number;
        optimizationsApplied: number;
        errorsEncountered: number;
        learningEvents: number;
    };
}

// 🎸 ADDED: Songsterr-specific pattern data types
export interface SongsterrPatternData {
    commonTabFormats: string[];
    frequentChordProgressions: string[];
    popularTechniques: string[];
    audioProcessingPreferences: string[];
    performanceOptimizations: string[];
}

export interface AudioPatternData {
    commonSampleRates: number[];
    preferredBufferSizes: number[];
    frequentEffects: string[];
    qualitySettings: string[];
    latencyPreferences: string[];
}

export interface TabPatternData {
    commonTimeSignatures: [number, number][];
    frequentKeys: string[];
    popularTempos: number[];
    commonTunings: string[][];
    difficultyDistribution: Record<string, number>;
}

// =============================================================================
// 🎯 COMPONENT GENERATION TYPES (July 8th Complete + Songsterr Enhanced)
// =============================================================================

export interface ComponentTemplate {
    name: string;
    type: MusicComponentType;
    code: string;
    dependencies: string[];
    description: string;
    complexity: number;
    customizable: boolean;
    brainGenerated: boolean;
    // 🎸 ADDED: Songsterr template properties
    songsterrCompatible?: boolean;
    audioFeatures?: string[];
    tabSupport?: boolean;
    chordRecognition?: boolean;
    harmonyAnalysis?: boolean;
    performanceOptimized?: boolean;
}

export interface ComponentGenerationRequest {
    type: MusicComponentType;
    instrument?: InstrumentType;
    features?: string[];
    complexity?: number;
    framework?: 'react' | 'vue' | 'angular' | 'vanilla';
    styling?: 'tailwind' | 'css' | 'styled-components';
    brainEnhanced?: boolean;
    // 🎸 ADDED: Songsterr generation request properties
    songsterrIntegration?: boolean;
    audioProcessing?: boolean;
    tabParsing?: boolean;
    chordRecognition?: boolean;
    harmonyFeatures?: boolean;
    performanceOptimization?: boolean;
    audioEngine?: 'web-audio' | 'tone-js' | 'custom';
}

export interface ComponentGenerationResult {
    template: ComponentTemplate;
    additionalFiles: GeneratedFile[];
    suggestions: string[];
    documentation: string;
    brainInsights: BrainInsight[];
    confidence: number;
    // 🎸 ADDED: Songsterr generation result properties
    songsterrFiles?: GeneratedFile[];
    audioFiles?: GeneratedFile[];
    tabFiles?: GeneratedFile[];
    testFiles?: GeneratedFile[];
    performanceMetrics?: ComponentPerformanceMetrics;
}

export interface GeneratedFile {
    name: string;
    path: string;
    content: string;
    type: 'component' | 'utility' | 'style' | 'test' | 'documentation' | 'audio' | 'tab' | 'songsterr';  // 🎸 ADDED: new types
    dependencies: string[];
    // 🎸 ADDED: Songsterr file properties
    musicRelated?: boolean;
    audioProcessing?: boolean;
    tabParsing?: boolean;
    chordData?: boolean;
    performanceOptimized?: boolean;
}

export interface ComponentPerformanceMetrics {
    generationTime: number;
    codeQuality: number;
    testCoverage: number;
    performanceScore: number;
    memoryUsage: number;
    bundleSize: number;
}

// =============================================================================
// 🎯 ROUTE NODE TYPES (For Visual Route Map + Songsterr Enhanced)
// =============================================================================

export interface RouteNode {
    name: string;
    status: "missing" | "working";
    type?: "page" | "module" | "api" | "audio" | "tab" | "songsterr";  // ✅ FIXED: Optional + 🎸 ADDED: new types
    scope: "cipher" | "maestro" | "ava" | "shared" | "songsterr";  // 🎸 ADDED: songsterr scope
    filePath: string;
    musicRelated: boolean;
    children?: RouteNode[];
    dependencies?: string[];
    // 🎸 ADDED: Songsterr route node properties
    audioSupport?: boolean;
    tabProcessing?: boolean;
    chordRecognition?: boolean;
    harmonyAnalysis?: boolean;
    performanceOptimized?: boolean;
}

// 🆕 ENHANCED ROUTE TREE TYPES (Updated for Songsterr)
export interface EcosystemProject {
    name: string;
    symbol: string;
    color: string;
    path: string;
    description: string;
    routes: RouteInfo[];
    stats: ProjectStats;
    // 🎸 ADDED: Songsterr project properties
    songsterrEnabled?: boolean;
    audioFeatures?: string[];
    tabSupport?: boolean;
    musicCapabilities?: string[];
}

export interface ProjectStats {
    total: number;
    working: number;
    missing: number;
    folders: number;
    files: number;
    // 🎸 ADDED: Songsterr project stats
    audioFiles?: number;
    tabFiles?: number;
    songsterrModules?: number;
    musicComponents?: number;
}

export interface ProjectRouteData {
    routes: RouteInfo[];
    stats: ProjectStats;
    // 🎸 ADDED: Songsterr route data
    songsterrData?: {
        modules: SongsterrModuleConfig[];
        audioTracks: AudioTrack[];
        tabData: ParsedTab[];
        performance: ComponentPerformanceMetrics;
    };
}

export interface EcosystemTreeData {
    name: string;
    type: 'root' | 'project' | 'category' | 'route' | 'folder' | 'audio' | 'tab' | 'songsterr';  // 🎸 ADDED: new types
    children: EcosystemTreeData[];
    // ✅ This fixes the "stats" property error:
    stats?: EcosystemStats;
    // Optional enhanced properties:
    symbol?: string;
    color?: string;
    description?: string;
    url?: string;
    exists?: boolean;
    status?: string;
    fullPath?: string;
    routeType?: string;
    size?: number;
    // 🎸 ADDED: Songsterr tree data properties
    musicRelated?: boolean;
    audioSupport?: boolean;
    tabProcessing?: boolean;
    songsterrCompatible?: boolean;
    performanceScore?: number;
}

export interface EcosystemStats {
    totalProjects: number;
    totalRoutes: number;
    totalWorking: number;
    totalMissing: number;
    healthPercentage: number;
    // 🎸 ADDED: Songsterr ecosystem stats
    musicProjects?: number;
    audioRoutes?: number;
    tabRoutes?: number;
    songsterrModules?: number;
    performanceScore?: number;
}

// =============================================================================
// 👥 TEAM REPORTING TYPES (July 8th Complete + Songsterr Enhanced)
// =============================================================================

export interface TeamReportData {
    projectHealth: ProjectHealthMetrics;
    teamMetrics: TeamDevelopmentMetrics;
    recommendations: TeamRecommendation[];
    generated: string;
    brainTeamInsights?: BrainInsight[];
    musicTeamMetrics?: MusicTeamMetrics;
    collaborationScore?: number;
    // 🎸 ADDED: Songsterr team reporting
    songsterrMetrics?: SongsterrTeamMetrics;
    audioTeamMetrics?: AudioTeamMetrics;
    musicProductivity?: MusicProductivityMetrics;
}
export interface TeamReport {
    title: string;
    content: string;
    data: TeamReportData;
    // All additional properties are now properly inside the interface
    brainConfidence?: number;
    generatedAt?: string | number;
    guitarMetrics?: {
        health: number;
        status: string;
        components: string[];
    };
    vocalMetrics: {
        health: number;
        status: string;
        components: string[];
    };
    collaboration: {
        teamSize: number;
        score: number;
        projectHealth: string;
    };
    teamInsights: {
        productivity: number;
        insights: string[];
        recommendations: string[];
    };
} // ← Closing brace is now in the right place!

export interface ProjectHealthMetrics {
    score: number;
    codeQuality: number;
    testCoverage: number;
    dependencies: number;
    routes: number;
    performance: number;
    musicComponentHealth?: number;
    audioPerformance?: number;
    // 🎸 ADDED: Songsterr health metrics
    songsterrHealth?: number;
    tabProcessingHealth?: number;
    chordRecognitionHealth?: number;
    harmonyAnalysisHealth?: number;
}

export interface TeamDevelopmentMetrics {
    productivity: number;
    collaboration: number;
    codeConsistency: number;
    deploymentFrequency: number;
    bugRate: number;
    musicFeatureVelocity?: number;
    instrumentSpecialization?: Record<string, number>;
    // 🎸 ADDED: Songsterr team development metrics
    songsterrVelocity?: number;
    audioProcessingExpertise?: Record<string, number>;
    tabParsingProficiency?: Record<string, number>;
    musicToolUsage?: Record<string, number>;
}

export interface MusicTeamMetrics {
    guitarDevelopers: number;
    vocalDevelopers: number;
    audioDevelopers: number;
    theoryDevelopers: number;
    crossInstrumentCollaboration: number;
    musicFeatureCompletionRate: number;
    // 🎸 ADDED: Songsterr team metrics
    songsterrDevelopers?: number;
    tabParsingExperts?: number;
    audioEngineeringExperts?: number;
    harmonyAnalysisExperts?: number;
}

export interface TeamRecommendation {
    category: 'process' | 'tools' | 'training' | 'architecture' | 'music' | 'songsterr' | 'audio';  // 🎸 ADDED: new categories
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    estimatedImpact: 'low' | 'medium' | 'high';
    estimatedEffort: 'low' | 'medium' | 'high';
    brainGenerated?: boolean;
    musicSpecific?: boolean;
    // 🎸 ADDED: Songsterr recommendation properties
    songsterrSpecific?: boolean;
    audioRelated?: boolean;
    tabProcessingRelated?: boolean;
    performanceImpact?: 'low' | 'medium' | 'high';
}

// 🎸 ADDED: Songsterr-specific team metrics
export interface SongsterrTeamMetrics {
    moduleContributors: number;
    tabParsingContributions: number;
    audioProcessingContributions: number;
    chordRecognitionWork: number;
    harmonyAnalysisWork: number;
    performanceOptimizations: number;
    bugFixRate: number;
    featureCompletionRate: number;
}

export interface AudioTeamMetrics {
    audioEngineers: number;
    signalProcessingExperts: number;
    acousticAnalysts: number;
    performanceOptimizers: number;
    qualityAssuranceSpecialists: number;
    crossDisciplinaryWork: number;
}

export interface MusicProductivityMetrics {
    componentsPerSprint: number;
    featuresPerMonth: number;
    bugFixVelocity: number;
    codeReviewEfficiency: number;
    musicToolAdoption: number;
    knowledgeSharing: number;
}

// =============================================================================
// 🔧 HANDLER COMPATIBILITY TYPES (Songsterr Enhanced)
// =============================================================================

export interface HandlerInfo {
    name: string;
    description: string;
    category: 'music' | 'development' | 'analysis' | 'brain' | 'utility' | 'songsterr' | 'audio';  // 🎸 ADDED: new categories
    musicGenres?: MusicGenre[];
    complexity: 'basic' | 'intermediate' | 'advanced';
    brainIntegrated: boolean;
    status: 'active' | 'inactive' | 'development' | 'planned';
    // 🎸 ADDED: Songsterr handler properties
    songsterrCompatible?: boolean;
    audioSupport?: boolean;
    tabProcessing?: boolean;
    chordRecognition?: boolean;
    harmonyAnalysis?: boolean;
    performanceOptimized?: boolean;
}

export interface TemplateConfig {
    type: 'component' | 'page' | 'handler' | 'route' | 'audio' | 'tab' | 'songsterr';  // 🎸 ADDED: new types
    name: string;
    musicGenre?: MusicGenre;
    complexity: 'basic' | 'intermediate' | 'advanced';
    features: string[];
    brainEnhanced: boolean;
    // 🎸 ADDED: Songsterr template config
    songsterrIntegration?: boolean;
    audioFeatures?: string[];
    tabSupport?: boolean;
    chordRecognition?: boolean;
    harmonyAnalysis?: boolean;
    performanceOptimization?: boolean;
}

export interface ComprehensiveSelfRepair {
    issues: string[];
    fileCount: number;
    issueCount: number;
    healthStatus: string;
    healthScore: number;
    timestamp: number;
    analysis?: string;
    fixes: {
        applied: string[];
        failed: string[];
        skipped: string[];
    };
    recommendations: string[];
    // 🎸 ADDED: Songsterr self repair
    songsterrFixes?: {
        audioOptimizations: string[];
        tabCorrections: string[];
        chordRecognitionFixes: string[];
        performanceImprovements: string[];
    };
}
export interface HealthStatus {
    overall: string;
    details: string;
    score: number;
     brainConfidence: number;
    performance: string;
    timestamp?: number | string;
    components: Record<string, string>;
    brainInsights: string[];
    recommendations: string[];
}


// =============================================================================
// 🌐 SYSTEM INTEGRATION TYPES (July 8th Complete + Songsterr Enhanced)
// =============================================================================

export interface MaestroHealthStatus {
    overall: 'healthy' | 'warning' | 'critical';
    lastCheck: string;
    activeWatchers: number;
    queuedMessages: number;
    components: {
        cipher: 'active' | 'inactive' | 'error';
        maestro: 'active' | 'inactive' | 'error';
        ava: 'active' | 'inactive' | 'standby';
        dropbox: 'connected' | 'disconnected' | 'error';
        brain?: 'active' | 'inactive' | 'learning' | 'error';
        // 🎸 ADDED: Songsterr system components
        songsterr?: 'active' | 'inactive' | 'processing' | 'error';
        audioEngine?: 'active' | 'inactive' | 'buffering' | 'error';
        tabProcessor?: 'active' | 'inactive' | 'parsing' | 'error';
    };
    issues: string[];
    brainHealth?: BrainHealth;
    musicIntelligenceStatus?: string;
    // 🎸 ADDED: Songsterr health status
    songsterrHealth?: SongsterrHealth;
    audioEngineHealth?: AudioEngineHealth;
    tabProcessorHealth?: TabProcessorHealth;
}

export interface MaestroMessage {
    id?: string;
    command: string;
    target: 'cipher' | 'maestro' | 'ava' | 'brain' | 'all' | 'songsterr' | 'audio';  // 🎸 ADDED: new targets
    source?: 'human' | 'system' | 'auto' | 'brain' | 'songsterr';  // 🎸 ADDED: songsterr source
    priority: 'low' | 'medium' | 'high' | 'urgent';
    payload?: any;
    timestamp?: string;
    brainProcessed?: boolean;
    musicRelated?: boolean;
    intelligenceLevel?: number;
    // 🎸 ADDED: Songsterr message properties
    songsterrProcessed?: boolean;
    audioRelated?: boolean;
    tabProcessing?: boolean;
    chordRecognition?: boolean;
    performanceData?: ComponentPerformanceMetrics;
}

export interface SystemHealth {
    brain: BrainHealth;
    cipher: CipherHealth;
    integration: IntegrationHealth;
    performance: PerformanceMetrics;
    timestamp: Date;
    // 🎸 ADDED: Songsterr system health
    songsterr?: SongsterrHealth;
    audioEngine?: AudioEngineHealth;
    tabProcessor?: TabProcessorHealth;
    musicIntelligence?: MusicIntelligenceHealth;
}

export interface BrainHealth {
    status: 'healthy' | 'degraded' | 'critical' | 'offline';
    responseTime: number;
    memoryUsage: number;
    cacheHitRate: number;
    lastError?: Error;
    // 🎸 ADDED: Songsterr brain health
    songsterrIntegration?: boolean;
    musicAnalysisAccuracy?: number;
    audioProcessingCapability?: number;
    tabParsingAccuracy?: number;
}

export interface CipherHealth {
    status: 'healthy' | 'degraded' | 'critical';
    analysisSpeed: number;
    componentGenerationSpeed: number;
    errorRate: number;
    lastError?: Error;
    // 🎸 ADDED: Songsterr cipher health
    songsterrModuleHealth?: number;
    audioProcessingHealth?: number;
    tabParsingHealth?: number;
    musicComponentHealth?: number;
}

export interface IntegrationHealth {
    status: 'healthy' | 'degraded' | 'critical';
    syncLatency: number;
    dataConsistency: number;
    connectionStability: number;
    lastSync: Date;
    // 🎸 ADDED: Songsterr integration health
    songsterrSyncHealth?: number;
    audioStreamHealth?: number;
    tabDataIntegrity?: number;
    chordDataConsistency?: number;
}

export interface PerformanceMetrics {
    averageAnalysisTime: number;
    averageGenerationTime: number;
    cacheEfficiency: number;
    memoryUsage: number;
    cpuUsage: number;
    networkLatency: number;
    // 🎸 ADDED: Songsterr performance metrics
    audioProcessingLatency?: number;
    tabParsingSpeed?: number;
    chordRecognitionSpeed?: number;
    harmonyAnalysisTime?: number;
    bufferUnderruns?: number;
    audioQuality?: number;
}

// 🎸 ADDED: Songsterr-specific health types
export interface SongsterrHealth {
    status: 'healthy' | 'degraded' | 'critical' | 'offline';
    moduleStatus: Record<string, 'active' | 'inactive' | 'error'>;
    processingQueue: number;
    errorRate: number;
    performanceScore: number;
    lastError?: SongsterrError;
    uptime: number;
}

export interface AudioEngineHealth {
    status: 'healthy' | 'degraded' | 'critical' | 'offline';
    latency: number;
    bufferHealth: number;
    sampleRate: number;
    bitDepth: number;
    channelCount: number;
    dropouts: number;
    processingLoad: number;
}

export interface TabProcessorHealth {
    status: 'healthy' | 'degraded' | 'critical' | 'offline';
    parsingAccuracy: number;
    processingSpeed: number;
    memoryUsage: number;
    errorRate: number;
    supportedFormats: string[];
    queueLength: number;
}

export interface MusicIntelligenceHealth {
    status: 'healthy' | 'degraded' | 'critical' | 'offline';
    analysisAccuracy: number;
    recognitionSpeed: number;
    learningRate: number;
    patternDetection: number;
    predictionAccuracy: number;
    memoryEfficiency: number;
}

// =============================================================================
// 🧪 TEST GENERATION TYPES (Songsterr Enhanced)
// =============================================================================

export interface TestGenerationConfig {
    type: 'unit' | 'integration' | 'e2e' | 'all' | 'audio' | 'performance';  // 🎸 ADDED: new types
    coverage: 'basic' | 'comprehensive' | 'full';
    framework: 'jest' | 'vitest' | 'cypress' | 'playwright' | 'web-audio-test';  // 🎸 ADDED: audio testing
    includePerformance: boolean;
    includeMocking: boolean;
    musicTesting?: boolean;
    audioTesting?: boolean;
    brainTesting?: boolean;
    // 🎸 ADDED: Songsterr test generation
    songsterrTesting?: boolean;
    tabParsingTesting?: boolean;
    chordRecognitionTesting?: boolean;
    harmonyAnalysisTesting?: boolean;
    audioEngineTest?: AudioEngineTestConfig;
}

export interface AudioEngineTestConfig {
    testLatency: boolean;
    testQuality: boolean;
    testCompatibility: boolean;
    testPerformance: boolean;
    bufferSizes: number[];
    sampleRates: number[];
    channelConfigurations: number[];
}

// =============================================================================
// 📈 PROGRESS TRACKING TYPES (Songsterr Enhanced)
// =============================================================================

export interface ProgressTracking {
    startTime: string;
    currentPhase: string;
    completedTasks: string[];
    pendingTasks: string[];
    blockers: string[];
    estimatedCompletion: string;
    brainInsights?: BrainInsight[];
    musicProgress?: MusicProgressMetrics;
    intelligenceUtilization?: number;
    // 🎸 ADDED: Songsterr progress tracking
    songsterrProgress?: SongsterrProgressMetrics;
    audioProgress?: AudioProgressMetrics;
    tabProgress?: TabProgressMetrics;
}

export interface MusicProgressMetrics {
    guitarFeaturesCompleted: number;
    vocalFeaturesCompleted: number;
    audioFeaturesCompleted: number;
    theoryFeaturesCompleted: number;
    totalMusicFeatures: number;
    musicCompletionRate: number;
    // 🎸 ADDED: Songsterr music progress
    songsterrFeaturesCompleted?: number;
    tabParsingFeaturesCompleted?: number;
    chordRecognitionFeaturesCompleted?: number;
    harmonyAnalysisFeaturesCompleted?: number;
}

// 🎸 ADDED: Songsterr-specific progress types
export interface SongsterrProgressMetrics {
    modulesCompleted: number;
    totalModules: number;
    completionRate: number;
    errorRate: number;
    performanceScore: number;
    estimatedTimeRemaining: number;
}

export interface AudioProgressMetrics {
    tracksProcessed: number;
    totalTracks: number;
    processingRate: number;
    qualityScore: number;
    errorCount: number;
    optimizationCount: number;
}

export interface TabProgressMetrics {
    tabsParsed: number;
    totalTabs: number;
    parsingAccuracy: number;
    recognitionRate: number;
    errorCount: number;
    complexityHandled: Record<string, number>;
}

// =============================================================================
// 🎯 PROJECT CONTEXT TYPES (Songsterr Enhanced)
// =============================================================================

export interface ProjectContext {
    currentFile?: string;
    activeFiles: string[];
    recentCommands: string[];
    userPreferences: Record<string, any>;
    projectType: 'react' | 'nextjs' | 'vue' | 'angular' | 'node' | 'music' | 'unknown' | 'songsterr';  // 🎸 ADDED: songsterr type
    lastActivity: string;
    brainContext?: BrainAnalysisData;
    musicContext?: MusicProjectContext;
    intelligenceSession?: LearningContext;
    // 🎸 ADDED: Songsterr project context
    songsterrContext?: SongsterrProjectContext;
}

export interface MusicProjectContext {
    primaryInstruments: InstrumentType[];
    musicFrameworks: string[];
    audioLibraries: string[];
    musicTheoryLevel: 'basic' | 'intermediate' | 'advanced';
    compositionFeatures: string[];
    recordingCapabilities: string[];
    // 🎸 ADDED: Songsterr music context
    songsterrEnabled?: boolean;
    tabFormatsSupported?: string[];
    audioEngineType?: string;
    chordRecognitionEnabled?: boolean;
    harmonyAnalysisEnabled?: boolean;
}

// 🎸 ADDED: Songsterr project context
export interface SongsterrProjectContext {
    version: string;
    enabledModules: string[];
    audioEngine: string;
    tabFormats: string[];
    chordDatabase: string;
    harmonyEngine: string;
    performanceOptimizations: string[];
    learningMode: boolean;
    brainIntegration: boolean;
}

// =============================================================================
// 💬 USER FEEDBACK TYPES (Songsterr Enhanced)
// =============================================================================

export interface UserFeedback {
    action: string;
    satisfaction: 1 | 2 | 3 | 4 | 5;
    comments?: string;
    wouldUseAgain: boolean;
    timestamp: string;
    brainRelevant?: boolean;
    musicFeedback?: MusicFeedback;
    improvementSuggestions?: string[];
    // 🎸 ADDED: Songsterr user feedback
    songsterrFeedback?: SongsterrFeedback;
    audioFeedback?: AudioFeedback;
    tabFeedback?: TabFeedback;
}

export interface MusicFeedback {
    instrumentRelevance: number;
    featureUsability: number;
    musicTheoryAccuracy: number;
    audioQuality: number;
    compositionHelpfulness: number;
    overallMusicExperience: number;
    // 🎸 ADDED: Songsterr music feedback
    songsterrIntegration?: number;
    tabParsingAccuracy?: number;
    chordRecognitionAccuracy?: number;
    harmonyAnalysisQuality?: number;
}

// 🎸 ADDED: Songsterr-specific feedback types
export interface SongsterrFeedback {
    moduleUsability: number;
    processingSpeed: number;
    accuracy: number;
    integrationQuality: number;
    learningEffectiveness: number;
    overallExperience: number;
    specificComments?: {
        tabParsing?: string;
        audioProcessing?: string;
        chordRecognition?: string;
        harmonyAnalysis?: string;
        performance?: string;
    };
}

export interface AudioFeedback {
    qualityRating: number;
    latencyRating: number;
    compatibilityRating: number;
    featureRating: number;
    performanceRating: number;
    overallRating: number;
    specificIssues?: string[];
    suggestions?: string[];
}

export interface TabFeedback {
    parsingAccuracy: number;
    recognitionSpeed: number;
    formatSupport: number;
    usabilityRating: number;
    errorHandling: number;
    overallRating: number;
    problematicFiles?: string[];
    suggestions?: string[];
}

// =============================================================================
// 🏆 ACHIEVEMENT TYPES (Songsterr Enhanced)
// =============================================================================

export interface AchievementData {
    id: string;
    title: string;
    description: string;
    unlocked: boolean;
    unlockedAt?: string;
    progress: number;
    maxProgress: number;
    category: 'development' | 'optimization' | 'learning' | 'collaboration' | 'music' | 'songsterr' | 'audio';  // 🎸 ADDED: new categories
    musicCategory?: 'guitar' | 'vocal' | 'audio' | 'theory' | 'composition' | 'tabs' | 'songsterr';  // 🎸 ADDED: new categories
    brainAssisted?: boolean;
    // 🎸 ADDED: Songsterr achievement properties
    songsterrSpecific?: boolean;
    audioRelated?: boolean;
    tabProcessing?: boolean;
    chordRecognition?: boolean;
    harmonyAnalysis?: boolean;
    performanceOptimization?: boolean;
}

// =============================================================================
// 🎛️ CONFIGURATION & SETTINGS TYPES (Songsterr Enhanced)
// =============================================================================

export interface BrainConfig {
    learningEnabled: boolean;
    intelligenceLevel: 'basic' | 'advanced' | 'expert';
    musicFocus: MusicComponentType[];
    autoSuggestions: boolean;
    realTimeAnalysis: boolean;
    cacheSize: number;
    syncInterval: number;
    privacyMode: boolean;
    // 🎸 ADDED: Songsterr brain config
    songsterrIntegration?: boolean;
    audioIntelligence?: boolean;
    tabAnalysisAI?: boolean;
    chordRecognitionAI?: boolean;
    harmonyAnalysisAI?: boolean;
    performanceOptimizationAI?: boolean;
}

export interface MusicIntelligenceConfig {
    guitarEnabled: boolean;
    vocalEnabled: boolean;
    audioEnabled: boolean;
    theoryEnabled: boolean;
    patternRecognition: boolean;
    componentGeneration: boolean;
    realTimeAnalysis: boolean;
    learningFromUser: boolean;
    // 🎸 ADDED: Songsterr intelligence config
    songsterrEnabled?: boolean;
    tabParsingIntelligence?: boolean;
    chordRecognitionIntelligence?: boolean;
    harmonyAnalysisIntelligence?: boolean;
    audioProcessingIntelligence?: boolean;
    performanceOptimizationIntelligence?: boolean;
}

export interface DisplayConfig {
    theme: 'dark' | 'light' | 'auto';
    compactMode: boolean;
    animationsEnabled: boolean;
    soundEnabled: boolean;
    notificationLevel: 'minimal' | 'normal' | 'verbose';
    brainVisualization: boolean;
    musicVisualization: boolean;
    // 🎸 ADDED: Songsterr display config
    songsterrVisualization?: boolean;
    audioVisualization?: boolean;
    tabVisualization?: boolean;
    chordDiagrams?: boolean;
    harmonyCharts?: boolean;
    performanceMetrics?: boolean;
}

// =============================================================================
// 🚀 API & COMMUNICATION TYPES (Songsterr Enhanced)
// =============================================================================

export interface BrainRequest {
    id: string;
    type: string;
    data: any;
    timestamp: Date;
    priority: 'low' | 'medium' | 'high';
    timeout?: number;
    // 🎸 ADDED: Songsterr request properties
    songsterrRelated?: boolean;
    audioProcessing?: boolean;
    tabParsing?: boolean;
    chordRecognition?: boolean;
    harmonyAnalysis?: boolean;
}

export interface BrainResponse {
    id: string;
    success: boolean;
    data?: any;
    error?: string;
    timestamp: Date;
    processingTime: number;
    cached: boolean;
    // 🎸 ADDED: Songsterr response properties
    songsterrProcessed?: boolean;
    audioAnalyzed?: boolean;
    tabParsed?: boolean;
    chordsRecognized?: number;
    harmonyAnalyzed?: boolean;
    performanceMetrics?: ComponentPerformanceMetrics;
}
// Brain interface definition
export interface BrainInterface {
    analyzeGuitar(): Promise<GuitarAnalysisResult>;
    analyzeVocal(): Promise<VocalAnalysisResult>;
    getProjectInsights(): Promise<BrainInsightsResult>;
    learnFromAnalysis(action: string, data: any): Promise<void>;
}
// =============================================================================
// 🆕 MISSING PROPERTIES FOR EXISTING INTERFACES
// =============================================================================



// Extend existing RouteHealthAudit interface (if not already present)
declare module './types' {
    interface RouteHealthAudit {
        routes: RouteHealthInfo[];
        score: number;
        overall: 'healthy' | 'warning' | 'critical';
        issues: string[];
    }
}

// Extend existing SupportedFileType interface (if not already present)
declare module './types' {
    interface SupportedFileType {
        priority: number;
    }
}

// =============================================================================
// 🆕 COMPLETELY NEW INTERFACES (if not already in backup)
// =============================================================================


// Add this interface if it doesn't exist in your backup  
export interface ReadinessCheck {
    ready: boolean;
    issues: string[];
    solutions?: string[];
    confidence: number;
}

// Add this interface if it doesn't exist in your backup
export interface SystemResources {
    usage: number;
    available: number;
    status: 'optimal' | 'moderate' | 'high' | 'critical';
    memory?: number;
    cpu?: number;
}

// Add this interface if it doesn't exist in your backup
export interface WatchRequirements {
    enabled: boolean;
    priority: 'low' | 'medium' | 'high';
    features: string[];
    monitoring?: boolean;
    threshold?: number;
}

// Add this interface if it doesn't exist in your backup
export interface DeploymentAnalysis extends AnalysisResult {
    readyToDeploy: boolean;
    estimatedTime: string;
    target?: string;
}

// =============================================================================
// 🔧 TYPE FIXES FOR COMPATIBILITY
// =============================================================================

// Fix type conflicts
export type RebuildStrategyType = 'full' | 'partial' | 'incremental' | 'smart';

// Fix PredictivePrediction type to include all needed properties
export interface PredictivePredictionFix {
    message: string;
    confidence: number;
    type: 'performance' | 'growth' | 'risk' | 'opportunity' | 'maintenance' | 'security';
    description: string;
    impact?: 'low' | 'medium' | 'high';
    severity: 'low' | 'medium' | 'high' | 'critical';
    actionable?: boolean;
    musicSpecific?: boolean;
    suggestedAction?: string;
}

// =============================================================================
// 🎯 END OF PATCH SECTION
// =============================================================================
