// handlers/music/generateMusicComponentHandler.ts
// 🎵 LAYER 1: CIPHER HANDLER - Advanced Music Component Generation
// Integrates with Maestro.ai Dual Brain System for Songsterr-level music components

import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import { displayBrainSuggestions } from "../../shared/displayUtils";
import { generateComponentSnippet } from "../../shared/templateGenerators";
import {
  ensureDirectoryExists,
  getBrainInterface,
  isBrainAvailable,
  shareAnalysisData,
} from "../../shared/utils";

// 🧠 DUAL BRAIN SYSTEM INTEGRATION
import { BrainConnector } from "../../brain/BrainConnector";

// 🎼 Advanced Music Component Types
interface MusicComponentSpec {
  type:
    | "tablature"
    | "chord-chart"
    | "fretboard"
    | "audio-player"
    | "practice-tracker"
    | "theory-visualizer"
    | "songbook";
  name: string;
  complexity: "basic" | "intermediate" | "advanced" | "professional";
  features: string[];
  instruments: string[];
  musicTheory: boolean;
  realTimeAudio: boolean;
  interactiveElements: boolean;
  songsterrFeatures: string[];
}

interface ComponentTemplate {
  imports: string;
  stateManagement: string;
  methods: string[];
  jsx: string;
  styling: string;
}

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced

// Helper function to check if brain is connected
function isBrainConnected(): boolean {
  try {
    const brainInterface = getBrainInterface();
    return !!brainInterface && isBrainAvailable();
  } catch {
    return false;
  }
}

export async function generateMusicComponentHandler(): Promise<void> {
  try {
    vscode.window.showInformationMessage(
      "🎵 Initializing Maestro.ai Music Component Generator..."
    );

    // 🧠 Enhanced Brain availability check
    const brainStatus = await checkBrainSystem();

    if (!brainStatus.available) {
      const fallbackChoice = await vscode.window.showWarningMessage(
        `🧠 ${brainStatus.message}. Continue with limited features?`,
        "Yes, continue",
        "Cancel"
      );
      if (fallbackChoice !== "Yes, continue") return;
    }

    // 🎯 Advanced generation method selection
    const generationMethod = await vscode.window.showQuickPick(
      [
        {
          label: "🎸 Songsterr-Style Tab Player",
          value: "songsterr-tab",
          description: "Full interactive tablature player with audio sync",
        },
        {
          label: "🎵 Advanced Music Theory Visualizer",
          value: "theory-viz",
          description: "Interactive chord progressions, scales, and analysis",
        },
        {
          label: "🔊 Multi-Track Audio Player",
          value: "audio-player",
          description: "Professional audio player with instrument isolation",
        },
        {
          label: "🎼 Digital Songbook",
          value: "songbook",
          description: "Complete songbook with lyrics, chords, and tabs",
        },
        {
          label: "🧠 Brain-Powered Custom Component",
          value: "brain-custom",
          description: "AI-generated component based on your specifications",
        },
        {
          label: "⚡ Quick Component Snippet",
          value: "quick-snippet",
          description: "Fast template-based component insertion",
        },
      ],
      {
        placeHolder: "Choose music component generation method",
        ignoreFocusOut: true,
      }
    );

    if (!generationMethod) return;

    // 🎯 Route to appropriate generation method
    switch (generationMethod.value) {
      case "songsterr-tab":
        await generateSongsterrStyleComponent();
        break;
      case "theory-viz":
        await generateMusicTheoryVisualizer();
        break;
      case "audio-player":
        await generateMultiTrackAudioPlayer();
        break;
      case "songbook":
        await generateDigitalSongbook();
        break;
      case "brain-custom":
        await generateBrainPoweredComponent();
        break;
      case "quick-snippet":
        await generateQuickSnippet();
        break;
    }
  } catch (error) {
    console.error("Music Component Generation Error:", error);
    await shareAnalysisData("music-component-error", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    vscode.window.showErrorMessage(`Component generation failed: ${error}`);
  }
}

/**
 * 🧠 Check Brain System Status
 */
async function checkBrainSystem(): Promise<{
  available: boolean;
  message: string;
}> {
  if (!isBrainAvailable()) {
    return { available: false, message: "Brain system offline" };
  }

  if (!isBrainConnected()) {
    return { available: false, message: "Brain system in simulation mode" };
  }

  try {
    const brainInterface = getBrainInterface();
    if (!brainInterface) {
      return { available: false, message: "Brain interface not accessible" };
    }

    return { available: true, message: "Brain System fully operational" };
  } catch (error) {
    return { available: false, message: "Brain system connectivity issues" };
  }
}

/**
 * 🎸 Generate Songsterr-Style Tab Player Component
 */
async function generateSongsterrStyleComponent(): Promise<void> {
  vscode.window.showInformationMessage(
    "🎸 Generating Songsterr-style tablature player..."
  );

  const componentName = await getComponentName("InteractiveTablaturePlayer");
  if (!componentName) return;

  const songsterrFeatures =
    (await vscode.window.showQuickPick(
      [
        { label: "📊 Tab Display", value: "tabDisplay", picked: true },
        { label: "🔄 Audio Synchronization", value: "audioSync", picked: true },
        { label: "🎵 Multi-Track Support", value: "multiTrack", picked: true },
        { label: "🔄 Looping Sections", value: "looping", picked: true },
        { label: "⏯️ Speed Control", value: "speedControl", picked: true },
        { label: "🎸 Instrument Isolation", value: "isolation", picked: true },
        { label: "🎯 Practice Mode", value: "practiceMode", picked: true },
        { label: "🎼 Chord Diagrams", value: "chordDiagrams", picked: true },
        {
          label: "🎸 Fretboard Visualization",
          value: "fretboardViz",
          picked: true,
        },
        { label: "🎹 MIDI Playback", value: "midiPlayback", picked: false },
      ],
      {
        placeHolder: "Select Songsterr features to include",
        canPickMany: true,
      }
    )) || [];

  const instruments = await selectInstruments(["Guitar"]);

  // 🧠 Brain-enhanced component generation
  await logBrainAnalysis("songsterr-component-generation", {
    componentName,
    features: songsterrFeatures.map((f) => f.value),
    instruments,
  });

  const componentContent = generateSongsterrTabComponent(
    componentName,
    songsterrFeatures.map((f) => f.value),
    instruments
  );

  await createComponentFile(componentName, componentContent, "songsterr");
  vscode.window.showInformationMessage(
    `🎸✅ Generated Songsterr-style component: ${componentName}`
  );
}

/**
 * 🎼 Generate Music Theory Visualizer Component
 */
async function generateMusicTheoryVisualizer(): Promise<void> {
  vscode.window.showInformationMessage(
    "🎼 Generating music theory visualizer..."
  );

  const componentName = await getComponentName("MusicTheoryVisualizer");
  if (!componentName) return;

  const theoryFeatures =
    (await vscode.window.showQuickPick(
      [
        {
          label: "🎵 Chord Progression Analysis",
          value: "chordAnalysis",
          picked: true,
        },
        { label: "🎶 Scale Visualization", value: "scaleViz", picked: true },
        { label: "🔄 Circle of Fifths", value: "circleOfFifths", picked: true },
        { label: "🎹 Piano Roll Display", value: "pianoRoll", picked: true },
        { label: "🎸 Fretboard Mapping", value: "fretboardMap", picked: true },
        {
          label: "📊 Harmonic Analysis",
          value: "harmonicAnalysis",
          picked: false,
        },
        { label: "🎼 Voice Leading", value: "voiceLeading", picked: false },
        {
          label: "🔀 Modulation Detection",
          value: "modulation",
          picked: false,
        },
      ],
      {
        placeHolder: "Select music theory features",
        canPickMany: true,
      }
    )) || [];

  const componentContent = generateMusicTheoryComponent(
    componentName,
    theoryFeatures.map((f) => f.value)
  );

  await createComponentFile(componentName, componentContent, "theory");
  vscode.window.showInformationMessage(
    `🎼✅ Generated music theory visualizer: ${componentName}`
  );
}

/**
 * 🔊 Generate Multi-Track Audio Player Component
 */
async function generateMultiTrackAudioPlayer(): Promise<void> {
  vscode.window.showInformationMessage(
    "🔊 Generating multi-track audio player..."
  );

  const componentName = await getComponentName("MultiTrackAudioPlayer");
  if (!componentName) return;

  const audioFeatures =
    (await vscode.window.showQuickPick(
      [
        { label: "🎵 Multi-Track Support", value: "multiTrack", picked: true },
        {
          label: "🔇 Track Muting/Soloing",
          value: "trackControl",
          picked: true,
        },
        { label: "📊 Waveform Display", value: "waveform", picked: true },
        { label: "🎚️ EQ Controls", value: "equalizer", picked: true },
        { label: "🔄 Loop Controls", value: "looping", picked: true },
        { label: "⏯️ Speed/Pitch Control", value: "speedPitch", picked: true },
        { label: "📝 Marker/Cue Points", value: "markers", picked: false },
        { label: "💾 Export Functionality", value: "export", picked: false },
      ],
      {
        placeHolder: "Select audio player features",
        canPickMany: true,
      }
    )) || [];

  const componentContent = generateAudioPlayerComponent(
    componentName,
    audioFeatures.map((f) => f.value)
  );

  await createComponentFile(componentName, componentContent, "audio");
  vscode.window.showInformationMessage(
    `🔊✅ Generated multi-track audio player: ${componentName}`
  );
}

/**
 * 📚 Generate Digital Songbook Component
 */
async function generateDigitalSongbook(): Promise<void> {
  vscode.window.showInformationMessage("📚 Generating digital songbook...");

  const componentName = await getComponentName("DigitalSongbook");
  if (!componentName) return;

  const songbookFeatures =
    (await vscode.window.showQuickPick(
      [
        { label: "🎵 Lyrics Display", value: "lyrics", picked: true },
        { label: "🎸 Chord Charts", value: "chords", picked: true },
        { label: "📊 Tablature Integration", value: "tablature", picked: true },
        { label: "🔍 Search & Filter", value: "search", picked: true },
        { label: "📑 Playlist Management", value: "playlists", picked: true },
        {
          label: "🎹 Transposition Tools",
          value: "transposition",
          picked: true,
        },
        { label: "📱 Mobile Responsive", value: "responsive", picked: true },
        { label: "📤 Export/Share", value: "export", picked: false },
      ],
      {
        placeHolder: "Select songbook features",
        canPickMany: true,
      }
    )) || [];

  const componentContent = generateSongbookComponent(
    componentName,
    songbookFeatures.map((f) => f.value)
  );

  await createComponentFile(componentName, componentContent, "songbook");
  vscode.window.showInformationMessage(
    `📚✅ Generated digital songbook: ${componentName}`
  );
}

/**
 * 🧠 Generate Brain-Powered Custom Component
 */
async function generateBrainPoweredComponent(): Promise<void> {
  if (!isBrainConnected()) {
    const fallbackChoice = await vscode.window.showWarningMessage(
      "🔧 Brain is in simulation mode. Generate anyway?",
      "Yes, use simulation",
      "Use template instead",
      "Cancel"
    );

    if (fallbackChoice === "Use template instead") {
      await generateQuickSnippet();
      return;
    } else if (fallbackChoice !== "Yes, use simulation") {
      return;
    }
  }

  const componentSpec = await gatherCustomComponentSpec();
  if (!componentSpec) return;

  vscode.window.showInformationMessage(
    `🧠 Generating custom ${componentSpec.type} component with Brain intelligence...`
  );

  try {
    const brainInterface = getBrainInterface();

    let componentContent: string;

    if (brainInterface) {
      // 🧠 Brain-powered generation
      try {
        const brainResponse = await (
          brainInterface as any
        ).generateAdvancedMusicComponent?.({
          type: componentSpec.type,
          name: componentSpec.name,
          complexity: componentSpec.complexity,
          features: componentSpec.features,
          instruments: componentSpec.instruments,
          musicTheory: componentSpec.musicTheory,
          realTimeAudio: componentSpec.realTimeAudio,
          interactiveElements: componentSpec.interactiveElements,
        });

        componentContent =
          brainResponse?.code || generateAdvancedMusicComponent(componentSpec);
      } catch (error) {
        console.log("Brain generation fallback:", error);
        componentContent = generateAdvancedMusicComponent(componentSpec);
      }
    } else {
      componentContent = generateAdvancedMusicComponent(componentSpec);
    }

    await createComponentFile(
      componentSpec.name,
      componentContent,
      componentSpec.type
    );

    const brainConnector = new BrainConnector();
    (brainConnector as any).learnFromAction(
      "generate-brain-music-component",
      "success",
      { componentSpec, timestamp: new Date().toISOString() }
    );

    vscode.window.showInformationMessage(
      `🧠✅ Brain-generated ${componentSpec.name} created successfully!`
    );
  } catch (error) {
    console.error("Brain component generation error:", error);

    const brainConnector = new BrainConnector();
    (brainConnector as any).learnFromAction(
      "generate-brain-music-component",
      "failure",
      { error: error instanceof Error ? error.message : String(error) }
    );

    vscode.window.showErrorMessage(
      `Brain component generation failed: ${error}`
    );
  }
}

/**
 * ⚡ Generate Quick Component Snippet
 */
async function generateQuickSnippet(): Promise<void> {
  const componentType = await vscode.window.showQuickPick(
    [
      {
        label: "🎸 Guitar Practice",
        value: "guitar",
        description: "Quick guitar practice component",
      },
      {
        label: "🎤 Voice Training",
        value: "voice",
        description: "Quick voice training component",
      },
      {
        label: "🎼 Music Theory",
        value: "theory",
        description: "Quick music theory component",
      },
      {
        label: "⚡ Generic Music",
        value: "music",
        description: "Generic music component",
      },
    ],
    {
      placeHolder: "Select quick component type",
      ignoreFocusOut: true,
    }
  );

  if (!componentType) return;

  const componentName = await getComponentName(
    componentType.value === "guitar"
      ? "GuitarPractice"
      : componentType.value === "voice"
        ? "VoicePractice"
        : componentType.value === "theory"
          ? "MusicTheory"
          : "MusicComponent"
  );

  if (!componentName) return;

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage(
      "No active editor found. Please open a file to insert the component."
    );
    return;
  }

  try {
    const snippet = generateComponentSnippet(
      componentType.value,
      componentName
    );
    await editor.insertSnippet(new vscode.SnippetString(snippet));
    vscode.window.showInformationMessage(
      `🎵 ${componentName} component snippet inserted successfully!`
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Snippet generation failed: ${error}`);
  }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Get component name with validation
 */
async function getComponentName(defaultName: string): Promise<string | null> {
  const result = await vscode.window.showInputBox({
    prompt: "Enter component name",
    value: defaultName,
    validateInput: validateComponentName,
  });
  return result || null;
}

/**
 * Validate component name
 */
function validateComponentName(value: string): string | null {
  if (!value || value.trim().length === 0) {
    return "Component name cannot be empty";
  }
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
    return "Component name must be PascalCase (e.g., MyComponent)";
  }
  return null;
}

/**
 * Select instruments
 */
async function selectInstruments(
  defaultInstruments: string[] = ["Guitar"]
): Promise<string[]> {
  return (
    (await vscode.window.showQuickPick(
      ["Guitar", "Bass", "Drums", "Piano", "Vocals"],
      {
        placeHolder: "Select supported instruments",
        canPickMany: true,
      }
    )) || defaultInstruments
  );
}

/**
 * Log brain analysis data
 */
async function logBrainAnalysis(action: string, data: any): Promise<void> {
  if (isBrainAvailable()) {
    try {
      const brainInterface = getBrainInterface();
      if (brainInterface) {
        await shareAnalysisData(action, {
          ...data,
          timestamp: new Date().toISOString(),
        });

        await displayBrainSuggestions([
          `🎸 Generating ${data.componentName}`,
          `🎵 Including ${data.features?.length || 0} features`,
          `🎯 Supporting ${data.instruments?.join(", ") || "default"} instruments`,
          "🧠 Brain analysis complete",
        ]);
      }
    } catch (error) {
      console.log("Brain analysis optional:", error);
    }
  }
}

/**
 * Gather custom component specification
 */
async function gatherCustomComponentSpec(): Promise<MusicComponentSpec | null> {
  const type = await vscode.window.showQuickPick(
    [
      { label: "📊 Tablature Display", value: "tablature" },
      { label: "🎸 Chord Chart", value: "chord-chart" },
      { label: "🎹 Fretboard Visualization", value: "fretboard" },
      { label: "🔊 Audio Player", value: "audio-player" },
      { label: "📈 Practice Tracker", value: "practice-tracker" },
      { label: "🎼 Theory Visualizer", value: "theory-visualizer" },
      { label: "📚 Songbook", value: "songbook" },
    ],
    { placeHolder: "Select component type" }
  );

  if (!type) return null;

  const name = await getComponentName("CustomMusicComponent");
  if (!name) return null;

  const complexity = await vscode.window.showQuickPick(
    [
      { label: "🟢 Basic", value: "basic" },
      { label: "🟡 Intermediate", value: "intermediate" },
      { label: "🟠 Advanced", value: "advanced" },
      { label: "🔴 Professional", value: "professional" },
    ],
    { placeHolder: "Select complexity level" }
  );

  if (!complexity) return null;

  const instruments = await selectInstruments();
  const features =
    (await vscode.window.showQuickPick(
      [
        "Interactive Elements",
        "Real-time Audio",
        "Music Theory Integration",
        "Practice Mode",
        "Recording Capability",
        "MIDI Support",
        "Audio Effects",
      ],
      {
        placeHolder: "Select advanced features",
        canPickMany: true,
      }
    )) || [];

  return {
    type: type.value as any,
    name,
    complexity: complexity.value as any,
    features,
    instruments,
    musicTheory: features.includes("Music Theory Integration"),
    realTimeAudio: features.includes("Real-time Audio"),
    interactiveElements: features.includes("Interactive Elements"),
    songsterrFeatures:
      type.value === "tablature"
        ? ["tabDisplay", "audioSync", "multiTrack"]
        : [],
  };
}

/**
 * Create component file in workspace
 */
async function createComponentFile(
  componentName: string,
  content: string,
  category: string
): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    throw new Error("No workspace folder found");
  }

  const componentDir = vscode.Uri.joinPath(
    workspaceFolder.uri,
    "src",
    "components",
    "music",
    category
  );

  await ensureDirectoryExists(componentDir);

  const fileName = `${componentName}.tsx`;
  const componentFile = vscode.Uri.joinPath(componentDir, fileName);

  await vscode.workspace.fs.writeFile(
    componentFile,
    Buffer.from(content, "utf8")
  );

  // Open the created file
  const document = await vscode.workspace.openTextDocument(componentFile);
  await vscode.window.showTextDocument(document);
}

// ===== COMPONENT GENERATORS =====

/**
 * Generate Songsterr-Style Tab Component
 */
function generateSongsterrTabComponent(
  name: string,
  features: string[],
  instruments: string[]
): string {
  return `import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Settings } from 'lucide-react';

interface ${name}Props {
  songData?: any;
  audioUrl?: string;
  className?: string;
}

const ${name}: React.FC<${name}Props> = ({ songData, audioUrl, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [showChords, setShowChords] = useState(true);
  const [showFretboard, setShowFretboard] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  ${
    features.includes("tabDisplay")
      ? `
  const renderTablature = () => (
    <div className="tablature-display">
      <div className="tab-header">
        {['e', 'B', 'G', 'D', 'A', 'E'].map((string, index) => (
          <span key={index} className="string-label">{string}</span>
        ))}
      </div>
      <div className="tab-content">
        <div className="playback-cursor" style={{left: \`\${(currentTime / duration) * 100}%\`}} />
        <div className="tab-measures">
          {/* Dynamic tab content will be rendered here */}
          <div className="measure">
            <div className="tab-line">|---0---2---3---|</div>
            <div className="tab-line">|---1---3---0---|</div>
            <div className="tab-line">|---0---2---0---|</div>
            <div className="tab-line">|---2---0---0---|</div>
            <div className="tab-line">|---3---x---2---|</div>
            <div className="tab-line">|---x---x---3---|</div>
          </div>
        </div>
      </div>
    </div>
  );`
      : ""
  }

  ${
    features.includes("multiTrack")
      ? `
  const renderTrackControls = () => {
    const tracks: string[] = ${JSON.stringify(instruments.map((inst) => `${inst} Track`))};
    return (
      <div className="track-controls">
        {tracks.map((track, index) => (
          <div key={index} className="track-control">
            <button
              className={\`track-button \${selectedTrack === index ? 'active' : ''}\`}
              onClick={() => setSelectedTrack(index)}
            >
              {track}
            </button>
            <Volume2 size={16} />
            <input type="range" min="0" max="100" defaultValue="80" />
          </div>
        ))}
      </div>
    );
  };`
      : ""
  }

  return (
    <div className={\`songsterr-tab-player \${className || ''}\`}>
      <audio ref={audioRef} src={audioUrl} />
      
      ${features.includes("multiTrack") ? "{renderTrackControls()}" : ""}
      
      <div className="main-display">
        ${features.includes("tabDisplay") ? "{renderTablature()}" : ""}
        
        {showChords && (
          <div className="chord-display">
            <div className="chord-diagram">
              <h4>C Major</h4>
              <div className="chord-chart">
                {/* Chord diagram visualization */}
                <div className="fret-marker">0</div>
                <div className="fret-marker">1</div>
                <div className="fret-marker">0</div>
                <div className="fret-marker">2</div>
                <div className="fret-marker">3</div>
                <div className="fret-marker">x</div>
              </div>
            </div>
          </div>
        )}
        
        {showFretboard && (
          <div className="fretboard-display">
            <div className="fretboard">
              {/* Interactive fretboard visualization */}
              <div className="fret-numbers">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className="fret-number">{i + 1}</span>
                ))}
              </div>
              <div className="strings">
                {['E', 'A', 'D', 'G', 'B', 'e'].map((string, index) => (
                  <div key={index} className="string">
                    <span className="string-name">{string}</span>
                    <div className="string-line"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      ${
        features.includes("audioSync")
          ? `
      <div className="audio-controls">
        <button onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}>
          <SkipBack size={20} />
        </button>
        <button onClick={togglePlayback}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}>
          <SkipForward size={20} />
        </button>
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
          className="time-slider"
        />
        <div className="speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
          />
          <span>{playbackSpeed}x</span>
        </div>
      </div>`
          : ""
      }
      
      <div className="practice-controls">
        <label>
          <input
            type="checkbox"
            checked={showChords}
            onChange={(e) => setShowChords(e.target.checked)}
          />
          Show Chords
        </label>
        <label>
          <input
            type="checkbox"
            checked={showFretboard}
            onChange={(e) => setShowFretboard(e.target.checked)}
          />
          Show Fretboard
        </label>
      </div>
    </div>
  );
};

export default ${name};`;
}

/**
 * Generate Music Theory Component
 */
function generateMusicTheoryComponent(
  name: string,
  features: string[]
): string {
  return `import React, { useState } from 'react';

interface ${name}Props {
  scale?: string;
  key?: string;
  className?: string;
}

const ${name}: React.FC<${name}Props> = ({ scale = 'major', key = 'C', className }) => {
  const [selectedScale, setSelectedScale] = useState(scale);
  const [selectedKey, setSelectedKey] = useState(key);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  // ✅ EXPLICIT ARRAY TYPING - Prevents TypeScript never[] inference
  const scales: string[] = ['major', 'minor', 'dorian', 'mixolydian', 'pentatonic'];
  const keys: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  ${
    features.includes("chordAnalysis")
      ? `
  const renderChordAnalysis = () => {
    const chords: string[] = ['C maj', 'F maj', 'G maj', 'C maj'];
    const romanNumerals: string[] = ['I', 'IV', 'V', 'I'];
    
    return (
      <div className="chord-analysis">
        <h3>Chord Progression Analysis</h3>
        <div className="chord-progression">
          {chords.map((chord, index) => (
            <div key={index} className="chord-container">
              <div className="chord">{chord}</div>
              <div className="roman-numeral">{romanNumerals[index]}</div>
            </div>
          ))}
        </div>
        <div className="analysis-info">
          <p>Key: {selectedKey} {selectedScale}</p>
          <p>Function: Tonic - Subdominant - Dominant - Tonic</p>
        </div>
      </div>
    );
  };`
      : ""
  }

  ${
    features.includes("scaleViz")
      ? `
  const renderScaleVisualization = () => {
    const scaleNotes: string[] = getScaleNotes(selectedKey, selectedScale);
    
    return (
      <div className="scale-visualization">
        <h3>Scale: {selectedKey} {selectedScale}</h3>
        <div className="scale-notes">
          {scaleNotes.map((note, index) => (
            <div 
              key={index} 
              className={\`note \${activeNote === note ? 'active' : ''}\`}
              onClick={() => setActiveNote(note)}
            >
              {note}
            </div>
          ))}
        </div>
        <div className="scale-degrees">
          {['1', '2', '3', '4', '5', '6', '7'].map((degree, index) => (
            <div key={index} className="degree">{degree}</div>
          ))}
        </div>
      </div>
    );
  };`
      : ""
  }

  ${
    features.includes("circleOfFifths")
      ? `
  const renderCircleOfFifths = () => (
    <div className="circle-of-fifths">
      <h3>Circle of Fifths</h3>
      <div className="circle">
        {keys.map((k, index) => (
          <div 
            key={k} 
            className={\`key-position \${k === selectedKey ? 'active' : ''}\`}
            style={{
              transform: \`rotate(\${index * 30}deg) translateY(-80px) rotate(\${-index * 30}deg)\`
            }}
            onClick={() => setSelectedKey(k)}
          >
            {k}
          </div>
        ))}
      </div>
    </div>
  );`
      : ""
  }

  ${
    features.includes("pianoRoll")
      ? `
  const renderPianoRoll = () => {
    const scaleNotes: string[] = getScaleNotes(selectedKey, selectedScale);
    const allNotes: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    return (
      <div className="piano-roll">
        <h3>Piano Roll</h3>
        <div className="piano-keys">
          {allNotes.map((note, index) => {
            const isInScale = scaleNotes.includes(note);
            const isBlackKey = note.includes('#');
            
            return (
              <div 
                key={index} 
                className={\`piano-key \${isBlackKey ? 'black' : 'white'} \${isInScale ? 'in-scale' : ''}\`}
                onClick={() => setActiveNote(note)}
              >
                {note}
              </div>
            );
          })}
        </div>
      </div>
    );
  };`
      : ""
  }

  // Helper function to get scale notes
  const getScaleNotes = (rootKey: string, scaleType: string): string[] => {
    const notes: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(rootKey);
    
    const scalePatterns: { [key: string]: number[] } = {
      'major': [0, 2, 4, 5, 7, 9, 11],
      'minor': [0, 2, 3, 5, 7, 8, 10],
      'dorian': [0, 2, 3, 5, 7, 9, 10],
      'mixolydian': [0, 2, 4, 5, 7, 9, 10],
      'pentatonic': [0, 2, 4, 7, 9]
    };
    
    const pattern = scalePatterns[scaleType] || scalePatterns['major'];
    return pattern.map(interval => notes[(rootIndex + interval) % 12]);
  };

  return (
    <div className={\`music-theory-visualizer \${className || ''}\`}>
      <div className="controls">
        <div className="control-group">
          <label>Key:</label>
          <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
            {keys.map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
        
        <div className="control-group">
          <label>Scale:</label>
          <select value={selectedScale} onChange={(e) => setSelectedScale(e.target.value)}>
            {scales.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="visualizations">
        ${features.includes("chordAnalysis") ? "{renderChordAnalysis()}" : ""}
        ${features.includes("scaleViz") ? "{renderScaleVisualization()}" : ""}
        ${features.includes("circleOfFifths") ? "{renderCircleOfFifths()}" : ""}
        ${features.includes("pianoRoll") ? "{renderPianoRoll()}" : ""}
      </div>
    </div>
  );
};

export default ${name};`;
}

/**
 * Generate Audio Player Component
 */
function generateAudioPlayerComponent(
  name: string,
  features: string[]
): string {
  return `import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings } from 'lucide-react';

interface ${name}Props {
  tracks?: { name: string; url: string; volume: number }[];
  className?: string;
}

const ${name}: React.FC<${name}Props> = ({ tracks = [], className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  // ✅ EXPLICIT ARRAY TYPING
  const [trackStates, setTrackStates] = useState<{
    volume: number;
    isMuted: boolean;
    isSoloed: boolean;
  }[]>(tracks.map(() => ({ volume: 80, isMuted: false, isSoloed: false })));

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    audioRefs.current = audioRefs.current.slice(0, tracks.length);
  }, [tracks.length]);

  const togglePlayback = () => {
    audioRefs.current.forEach(audio => {
      if (audio) {
        if (isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      }
    });
    setIsPlaying(!isPlaying);
  };

  const updateTrackState = (index: number, update: Partial<typeof trackStates[0]>) => {
    setTrackStates(prev => prev.map((state, i) => 
      i === index ? { ...state, ...update } : state
    ));
  };

  ${
    features.includes("waveform")
      ? `
  const renderWaveform = () => (
    <div className="waveform-display">
      <canvas 
        width="800" 
        height="100" 
        style={{ width: '100%', height: '100px', background: '#1a1a1a' }}
      />
      <div className="playhead" style={{ left: \`\${(currentTime / duration) * 100}%\` }} />
    </div>
  );`
      : ""
  }

  ${
    features.includes("equalizer")
      ? `
  const renderEqualizer = () => {
    const frequencies: string[] = ['60Hz', '170Hz', '310Hz', '600Hz', '1kHz', '3kHz', '6kHz', '12kHz'];
    
    return (
      <div className="equalizer">
        <h4>Equalizer</h4>
        <div className="eq-bands">
          {frequencies.map((freq, index) => (
            <div key={index} className="eq-band">
              <input
                type="range"
                min="-12"
                max="12"
                defaultValue="0"
                orient="vertical"
                className="eq-slider"
              />
              <label>{freq}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };`
      : ""
  }

  return (
    <div className={\`multi-track-audio-player \${className || ''}\`}>
      {tracks.map((track, index) => (
        <audio
          key={index}
          ref={el => audioRefs.current[index] = el}
          src={track.url}
          onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
          onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
        />
      ))}

      ${features.includes("waveform") ? "{renderWaveform()}" : ""}

      <div className="main-controls">
        <button onClick={togglePlayback} className="play-button">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <div className="time-display">
          {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / 
          {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
        </div>

        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
          className="time-slider"
        />

        <div className="volume-control">
          <button onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
          />
        </div>
      </div>

      ${
        features.includes("multiTrack")
          ? `
      <div className="track-mixer">
        <h3>Track Mixer</h3>
        {tracks.map((track, index) => (
          <div key={index} className="track-strip">
            <div className="track-name">{track.name}</div>
            <div className="track-controls">
              <button
                className={\`solo-button \${trackStates[index]?.isSoloed ? 'active' : ''}\`}
                onClick={() => updateTrackState(index, { isSoloed: !trackStates[index]?.isSoloed })}
              >
                S
              </button>
              <button
                className={\`mute-button \${trackStates[index]?.isMuted ? 'active' : ''}\`}
                onClick={() => updateTrackState(index, { isMuted: !trackStates[index]?.isMuted })}
              >
                M
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={trackStates[index]?.volume || 80}
                onChange={(e) => updateTrackState(index, { volume: parseInt(e.target.value) })}
                className="volume-fader"
                orient="vertical"
              />
            </div>
          </div>
        ))}
      </div>`
          : ""
      }

      ${features.includes("equalizer") ? "{renderEqualizer()}" : ""}
    </div>
  );
};

export default ${name};`;
}

/**
 * Generate Songbook Component
 */
function generateSongbookComponent(name: string, features: string[]): string {
  return `import React, { useState } from 'react';
import { Search, Filter, Heart, Share, Download } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  lyrics?: string;
  chords?: string[];
  tablature?: string;
  tags: string[];
}

interface ${name}Props {
  songs?: Song[];
  className?: string;
}

const ${name}: React.FC<${name}Props> = ({ songs = [], className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [currentKey, setCurrentKey] = useState('C');
  const [showChords, setShowChords] = useState(true);
  const [showTabs, setShowTabs] = useState(false);
  
  // ✅ EXPLICIT ARRAY TYPING
  const [favorites, setFavorites] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<{ name: string; songIds: string[] }[]>([]);

  const keys: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (songId: string) => {
    setFavorites(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  ${
    features.includes("transposition")
      ? `
  const transposeChord = (chord: string, semitones: number): string => {
    // Simple transposition logic
    const notePattern = /([A-G][#b]?)/g;
    return chord.replace(notePattern, (match) => {
      const noteIndex = keys.indexOf(match);
      if (noteIndex === -1) return match;
      const newIndex = (noteIndex + semitones + 12) % 12;
      return keys[newIndex];
    });
  };

  const transposeToKey = (fromKey: string, toKey: string): number => {
    const fromIndex = keys.indexOf(fromKey);
    const toIndex = keys.indexOf(toKey);
    return (toIndex - fromIndex + 12) % 12;
  };`
      : ""
  }

  return (
    <div className={\`digital-songbook \${className || ''}\`}>
      <div className="songbook-header">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        ${
          features.includes("search")
            ? `
        <div className="filters">
          <Filter size={20} />
          <select>
            <option value="">All Genres</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="country">Country</option>
            <option value="jazz">Jazz</option>
          </select>
        </div>`
            : ""
        }
      </div>

      <div className="songbook-content">
        <div className="song-list">
          {filteredSongs.map(song => (
            <div 
              key={song.id} 
              className={\`song-item \${selectedSong?.id === song.id ? 'selected' : ''}\`}
              onClick={() => setSelectedSong(song)}
            >
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <div className="song-meta">
                  <span>Key: {song.key}</span>
                  <span>BPM: {song.tempo}</span>
                </div>
              </div>
              <div className="song-actions">
                <button onClick={() => toggleFavorite(song.id)}>
                  <Heart 
                    size={16} 
                    fill={favorites.includes(song.id) ? 'red' : 'none'}
                    color={favorites.includes(song.id) ? 'red' : 'currentColor'}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedSong && (
          <div className="song-display">
            <div className="song-header">
              <h1>{selectedSong.title}</h1>
              <p>{selectedSong.artist}</p>
              
              ${
                features.includes("transposition")
                  ? `
              <div className="transposition-controls">
                <label>Key:</label>
                <select 
                  value={currentKey} 
                  onChange={(e) => setCurrentKey(e.target.value)}
                >
                  {keys.map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>`
                  : ""
              }

              <div className="view-controls">
                <label>
                  <input
                    type="checkbox"
                    checked={showChords}
                    onChange={(e) => setShowChords(e.target.checked)}
                  />
                  Show Chords
                </label>
                
                ${
                  features.includes("tablature")
                    ? `
                <label>
                  <input
                    type="checkbox"
                    checked={showTabs}
                    onChange={(e) => setShowTabs(e.target.checked)}
                  />
                  Show Tablature
                </label>`
                    : ""
                }
              </div>
            </div>

            <div className="song-content">
              ${
                features.includes("lyrics")
                  ? `
              {selectedSong.lyrics && (
                <div className="lyrics-display">
                  <h3>Lyrics</h3>
                  <pre>{selectedSong.lyrics}</pre>
                </div>
              )}`
                  : ""
              }

              {showChords && selectedSong.chords && (
                <div className="chords-display">
                  <h3>Chords</h3>
                  <div className="chord-progression">
                    {selectedSong.chords.map((chord, index) => {
                      ${
                        features.includes("transposition")
                          ? `
                      const transposedChord = transposeChord(
                        chord, 
                        transposeToKey(selectedSong.key, currentKey)
                      );`
                          : "const transposedChord = chord;"
                      }
                      
                      return (
                        <div key={index} className="chord">
                          {transposedChord}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              ${
                features.includes("tablature")
                  ? `
              {showTabs && selectedSong.tablature && (
                <div className="tablature-display">
                  <h3>Tablature</h3>
                  <pre className="tab-content">{selectedSong.tablature}</pre>
                </div>
              )}`
                  : ""
              }
            </div>

            ${
              features.includes("export")
                ? `
            <div className="song-actions">
              <button className="export-btn">
                <Download size={16} />
                Export
              </button>
              <button className="share-btn">
                <Share size={16} />
                Share
              </button>
            </div>`
                : ""
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default ${name};`;
}

/**
 * Generate Advanced Music Component (for Brain-powered generation)
 */
function generateAdvancedMusicComponent(spec: MusicComponentSpec): string {
  const { name, type, complexity, features, instruments } = spec;

  return `import React, { useState, useEffect, useRef } from 'react';

interface ${name}Props {
  className?: string;
  data?: any;
}

const ${name}: React.FC<${name}Props> = ({ className, data }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentState, setCurrentState] = useState('ready');
  
  // ✅ EXPLICIT ARRAY TYPING
  const [supportedInstruments] = useState<string[]>(${JSON.stringify(instruments)});
  const [enabledFeatures] = useState<string[]>(${JSON.stringify(features)});

  useEffect(() => {
    // Component initialization
    console.log('${name} initialized with ${complexity} complexity');
    console.log('Supporting instruments:', supportedInstruments);
    console.log('Enabled features:', enabledFeatures);
  }, [supportedInstruments, enabledFeatures]);

  const handleActivation = () => {
    setIsActive(!isActive);
    setCurrentState(isActive ? 'ready' : 'active');
  };

  return (
    <div className={\`advanced-music-component \${type} \${complexity} \${className || ''}\`}>
      <div className="component-header">
        <h2>${name}</h2>
        <p>Type: ${type} | Complexity: ${complexity}</p>
      </div>

      <div className="component-controls">
        <button onClick={handleActivation}>
          {isActive ? 'Deactivate' : 'Activate'} Component
        </button>
        <span className="status">Status: {currentState}</span>
      </div>

      <div className="component-content">
        {/* Advanced ${type} functionality will be implemented here */}
        <div className="feature-list">
          <h3>Features:</h3>
          <ul>
            {enabledFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="instrument-support">
          <h3>Supported Instruments:</h3>
          <ul>
            {supportedInstruments.map((instrument, index) => (
              <li key={index}>{instrument}</li>
            ))}
          </ul>
        </div>

        ${
          spec.musicTheory
            ? `
        <div className="music-theory-section">
          <h3>Music Theory Integration</h3>
          <p>Advanced music theory features enabled</p>
        </div>`
            : ""
        }

        ${
          spec.realTimeAudio
            ? `
        <div className="audio-section">
          <h3>Real-time Audio Processing</h3>
          <p>Real-time audio capabilities enabled</p>
        </div>`
            : ""
        }

        ${
          spec.interactiveElements
            ? `
        <div className="interactive-section">
          <h3>Interactive Elements</h3>
          <p>Interactive user interface enabled</p>
        </div>`
            : ""
        }
      </div>
    </div>
  );
};

export default ${name};`;
}
