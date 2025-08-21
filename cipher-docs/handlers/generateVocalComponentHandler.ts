// src/handlers/music/vocal/generateVocalComponentHandler.ts
import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import { displayBrainSuggestions } from "../../../shared/displayUtils";
import { generateReactComponentTemplate } from "../../../shared/templateGenerators";
import {
  ensureDirectoryExists,
  getBrainInterface,
  isBrainAvailable,
  shareAnalysisData,
} from "../../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../../brain/BrainConnector";


export async function generateVocalComponentHandler(): Promise<void> {
  try {
    vscode.window.showInformationMessage("🎤 Generating vocal component...");

    // Get component details from user
    const componentName = await vscode.window.showInputBox({
      prompt: "Enter component name (e.g., VocalPitchAnalyzer)",
      placeHolder: "VocalPitchAnalyzer",
    });

    if (!componentName) {
      return;
    }

    const componentType = await vscode.window.showQuickPick(
      [
        "Pitch Analyzer",
        "Lyrics Display",
        "Vocal Range Finder",
        "Breath Control Trainer",
        "Vocal Warm-up Guide",
        "Performance Recorder",
        "Custom",
      ],
      { placeHolder: "Select vocal component type" }
    );

    if (!componentType) {
      return;
    }

    // 🧠 Brain-enhanced suggestions
    if (isBrainAvailable()) {
      const brainInterface = getBrainInterface();
      if (brainInterface) {
        try {
          await shareAnalysisData("vocal-component", {
            componentName,
            componentType,
            timestamp: new Date().toISOString(),
            action: "generate",
          });

          // Display brain suggestions
          await displayBrainSuggestions([
            `Generated ${componentType} component: ${componentName}`,
            "Consider adding real-time audio processing capabilities",
            "Include vocal health monitoring features",
            "Add multi-language support for lyrics and instructions",
            "Implement microphone permission handling",
          ]);
        } catch (error) {
          console.log("Brain analysis optional:", error);
        }
      }
    }

    // Generate component based on type
    const componentContent = generateVocalComponentContent(
      componentName,
      componentType
    );

    // Create component file
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      vscode.window.showErrorMessage("No workspace folder found");
      return;
    }

    const componentDir = vscode.Uri.joinPath(
      workspaceFolder.uri,
      "src",
      "components",
      "vocal"
    );
    await ensureDirectoryExists(componentDir);

    const componentFile = vscode.Uri.joinPath(
      componentDir,
      `${componentName}.tsx`
    );
    await vscode.workspace.fs.writeFile(
      componentFile,
      Buffer.from(componentContent, "utf8")
    );

    // Open the generated file
    const document = await vscode.workspace.openTextDocument(componentFile);
    await vscode.window.showTextDocument(document);

    vscode.window.showInformationMessage(
      `🎤✅ Generated ${componentType} component: ${componentName}`
    );
  } catch (error) {
    console.error("Generate Vocal Component Error:", error);
    await shareAnalysisData("vocal-component-error", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    vscode.window.showErrorMessage(
      `Failed to generate vocal component: ${error}`
    );
  }
}

function generateVocalComponentContent(
  componentName: string,
  componentType: string
): string {
  const baseProps: Array<{ name: string; type: string }> = [
    { name: "className", type: "string" },
    { name: "style", type: "React.CSSProperties" },
  ];

  // Add specific props based on component type
  let specificProps: Array<{ name: string; type: string }> = [];
  let componentLogic = "";

  switch (componentType) {
    case "Pitch Analyzer":
      specificProps = [
        { name: "targetPitch", type: "number" },
        { name: "sensitivity", type: "number" },
        { name: "onPitchDetected", type: "(pitch: number) => void" },
        { name: "showVisualFeedback", type: "boolean" },
      ];
      componentLogic = `
  const [currentPitch, setCurrentPitch] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [pitchHistory, setPitchHistory] = useState<number[]>([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const startPitchDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const analyser = context.createAnalyser();
      const microphone = context.createMediaStreamSource(stream);
      
      microphone.connect(analyser);
      analyser.fftSize = 2048;
      
      setAudioContext(context);
      setIsRecording(true);
      
      const detectPitch = () => {
        if (!isRecording) return;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        analyser.getFloatFrequencyData(dataArray);
        
        // Simple pitch detection algorithm
        const pitch = calculatePitch(dataArray);
        setCurrentPitch(pitch);
        setPitchHistory(prev => [...prev.slice(-50), pitch]);
        
        if (onPitchDetected) onPitchDetected(pitch);
        
        requestAnimationFrame(detectPitch);
      };
      
      detectPitch();
    } catch (error) {
      console.error('Microphone access denied:', error);
    }
  };

  const calculatePitch = (dataArray: Float32Array): number => {
    // Basic pitch detection - would use more sophisticated algorithm in production
    let maxIndex = 0;
    let maxValue = dataArray[0];
    
    for (let i = 1; i < dataArray.length; i++) {
      if (dataArray[i] > maxValue) {
        maxValue = dataArray[i];
        maxIndex = i;
      }
    }
    
    return maxIndex * (audioContext?.sampleRate || 44100) / 2048;
  };

  const renderPitchAnalyzer = () => {
    const pitchDifference = Math.abs(currentPitch - targetPitch);
    const isInTune = pitchDifference < sensitivity;
    
    return (
      <div className="pitch-analyzer">
        <div className="pitch-display">
          <div className={\`pitch-indicator \${isInTune ? 'in-tune' : 'out-of-tune'}\`}>
            <div className="current-pitch">{currentPitch.toFixed(1)} Hz</div>
            <div className="target-pitch">Target: {targetPitch} Hz</div>
          </div>
          {showVisualFeedback && (
            <div className="pitch-visualization">
              <svg width="300" height="100" viewBox="0 0 300 100">
                <line x1="150" y1="0" x2="150" y2="100" stroke="#ddd" strokeWidth="2"/>
                <circle 
                  cx={150 + (currentPitch - targetPitch) * 2} 
                  cy="50" 
                  r="8" 
                  fill={isInTune ? '#4CAF50' : '#F44336'}
                />
              </svg>
            </div>
          )}
        </div>
        <button onClick={startPitchDetection} disabled={isRecording}>
          {isRecording ? 'Recording...' : 'Start Pitch Detection'}
        </button>
      </div>
    );
  };`;
      break;

    case "Lyrics Display":
      specificProps = [
        { name: "lyrics", type: "string[]" },
        { name: "currentLine", type: "number" },
        { name: "onLineChange", type: "(line: number) => void" },
        { name: "autoScroll", type: "boolean" },
        { name: "fontSize", type: "number" },
      ];
      componentLogic = `
  const [highlightedLine, setHighlightedLine] = useState(currentLine);
  const [isPlaying, setIsPlaying] = useState(false);
  const lyricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && lyricsRef.current) {
      const lineElement = lyricsRef.current.children[highlightedLine] as HTMLElement;
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedLine, autoScroll]);

  const handleLineClick = (lineIndex: number) => {
    setHighlightedLine(lineIndex);
    if (onLineChange) onLineChange(lineIndex);
  };

  const renderLyricsDisplay = () => {
    return (
      <div className="lyrics-display" style={{ fontSize: \`\${fontSize}px\` }}>
        <div className="lyrics-container" ref={lyricsRef}>
          {lyrics.map((line, index) => (
            <div
              key={index}
              className={\`lyrics-line \${index === highlightedLine ? 'current-line' : ''}\`}
              onClick={() => handleLineClick(index)}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="lyrics-controls">
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <label>
            Font Size:
            <input 
              type="range" 
              min="12" 
              max="24" 
              value={fontSize} 
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    );
  };`;
      break;

    case "Vocal Range Finder":
      specificProps = [
        {
          name: "onRangeDetected",
          type: "(range: { low: number, high: number }) => void",
        },
        { name: "showNoteNames", type: "boolean" },
        { name: "calibrationMode", type: "boolean" },
      ];
      componentLogic = `
  const [lowestNote, setLowestNote] = useState<number>(0);
  const [highestNote, setHighestNote] = useState<number>(0);
  const [currentNote, setCurrentNote] = useState<number>(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [noteHistory, setNoteHistory] = useState<number[]>([]);

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const frequencyToNote = (frequency: number): string => {
    const A4 = 440;
    const C0 = A4 * Math.pow(2, -4.75);
    
    if (frequency === 0) return '--';
    
    const h = Math.round(12 * Math.log2(frequency / C0));
    const octave = Math.floor(h / 12);
    const n = h % 12;
    
    return noteNames[n] + octave;
  };

  const startRangeDetection = async () => {
    setIsCalibrating(true);
    setLowestNote(0);
    setHighestNote(0);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const analyser = context.createAnalyser();
      const microphone = context.createMediaStreamSource(stream);
      
      microphone.connect(analyser);
      analyser.fftSize = 2048;
      
      const detectRange = () => {
        if (!isCalibrating) return;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        analyser.getFloatFrequencyData(dataArray);
        
        const frequency = calculatePitch(dataArray);
        
        if (frequency > 80 && frequency < 2000) { // Valid vocal range
          setCurrentNote(frequency);
          setNoteHistory(prev => [...prev.slice(-10), frequency]);
          
          if (lowestNote === 0 || frequency < lowestNote) {
            setLowestNote(frequency);
          }
          if (frequency > highestNote) {
            setHighestNote(frequency);
          }
          
          if (onRangeDetected && lowestNote && highestNote) {
            onRangeDetected({ low: lowestNote, high: highestNote });
          }
        }
        
        requestAnimationFrame(detectRange);
      };
      
      detectRange();
    } catch (error) {
      console.error('Range detection error:', error);
      setIsCalibrating(false);
    }
  };

  const renderVocalRangeFinder = () => {
    const rangeInSemitones = Math.log2(highestNote / lowestNote) * 12;
    
    return (
      <div className="vocal-range-finder">
        <div className="range-display">
          <h3>Vocal Range Analysis</h3>
          <div className="current-note">
            Current: {showNoteNames ? frequencyToNote(currentNote) : \`\${currentNote.toFixed(1)} Hz\`}
          </div>
          <div className="range-info">
            <div className="low-note">
              Lowest: {showNoteNames ? frequencyToNote(lowestNote) : \`\${lowestNote.toFixed(1)} Hz\`}
            </div>
            <div className="high-note">
              Highest: {showNoteNames ? frequencyToNote(highestNote) : \`\${highestNote.toFixed(1)} Hz\`}
            </div>
            {rangeInSemitones > 0 && (
              <div className="range-span">
                Range: {rangeInSemitones.toFixed(1)} semitones
              </div>
            )}
          </div>
          <div className="range-visualization">
            <div className="frequency-bar">
              <div 
                className="range-indicator" 
                style={{
                  left: \`\${((lowestNote - 80) / (800 - 80)) * 100}%\`,
                  width: \`\${((highestNote - lowestNote) / (800 - 80)) * 100}%\`
                }}
              />
            </div>
          </div>
        </div>
        <button 
          onClick={startRangeDetection} 
          disabled={isCalibrating}
          className={isCalibrating ? 'recording' : ''}
        >
          {isCalibrating ? 'Detecting Range...' : 'Start Range Detection'}
        </button>
      </div>
    );
  };`;
      break;

    case "Breath Control Trainer":
      specificProps = [
        { name: "exerciseType", type: "'inhale' | 'exhale' | 'hold'" },
        { name: "duration", type: "number" },
        { name: "onExerciseComplete", type: "() => void" },
      ];
      componentLogic = `
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [currentPhase, setCurrentPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale' | 'complete'>('ready');
  const [cycleCount, setCycleCount] = useState(0);

  const startExercise = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeRemaining(duration);
    setCycleCount(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 0.1);
      }, 100);
    } else if (timeRemaining <= 0 && isActive) {
      // Move to next phase
      if (currentPhase === 'inhale') {
        setCurrentPhase('hold');
        setTimeRemaining(duration / 2);
      } else if (currentPhase === 'hold') {
        setCurrentPhase('exhale');
        setTimeRemaining(duration);
      } else if (currentPhase === 'exhale') {
        setCycleCount(prev => prev + 1);
        setCurrentPhase('complete');
        setIsActive(false);
        if (onExerciseComplete) onExerciseComplete();
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, currentPhase, duration, onExerciseComplete]);

  const getPhaseInstructions = () => {
    switch (currentPhase) {
      case 'ready': return 'Click start to begin breathing exercise';
      case 'inhale': return 'Breathe in slowly and deeply';
      case 'hold': return 'Hold your breath';
      case 'exhale': return 'Exhale slowly and completely';
      case 'complete': return 'Exercise complete! Great work!';
    }
  };

  const renderBreathTrainer = () => {
    const progress = ((duration - timeRemaining) / duration) * 100;
    
    return (
      <div className="breath-control-trainer">
        <div className="breathing-circle">
          <div 
            className={\`breath-indicator \${currentPhase}\`}
            style={{
              transform: \`scale(\${currentPhase === 'inhale' ? 1.5 : currentPhase === 'hold' ? 1.3 : 1})\`,
              transition: 'transform 0.3s ease'
            }}
          >
            <div className="time-display">{Math.ceil(timeRemaining)}</div>
          </div>
        </div>
        <div className="phase-instructions">
          {getPhaseInstructions()}
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: \`\${progress}%\` }} />
        </div>
        <div className="controls">
          <button onClick={startExercise} disabled={isActive}>
            {isActive ? 'In Progress...' : 'Start Exercise'}
          </button>
          <div className="cycle-counter">Cycles: {cycleCount}</div>
        </div>
      </div>
    );
  };`;
      break;

    default:
      componentLogic = `
  const [isActive, setIsActive] = useState(false);

  const handleInteraction = () => {
    setIsActive(!isActive);
    // Custom vocal interaction logic
  };`;
  }

  const allProps = [...baseProps, ...specificProps];

  return generateReactComponentTemplate({
    componentName,
    componentType: "functional",
    props: allProps,
  }).replace(
    "// Component content",
    `${componentLogic}

  return (
    <div className={className} style={style}>
      {${
        componentType === "Pitch Analyzer"
          ? "renderPitchAnalyzer()"
          : componentType === "Lyrics Display"
            ? "renderLyricsDisplay()"
            : componentType === "Vocal Range Finder"
              ? "renderVocalRangeFinder()"
              : componentType === "Breath Control Trainer"
                ? "renderBreathTrainer()"
                : "/* Custom vocal component logic */"
      }}
    </div>
  );`
  );
}
