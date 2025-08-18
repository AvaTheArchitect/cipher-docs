// src/handlers/music/guitar/generateGuitarComponentHandler.ts
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


export async function generateGuitarComponentHandler(): Promise<void> {
  try {
    vscode.window.showInformationMessage("🎸 Generating guitar component...");

    // Get component details from user
    const componentName = await vscode.window.showInputBox({
      prompt: "Enter component name (e.g., GuitarChordChart)",
      placeHolder: "GuitarChordChart",
    });

    if (!componentName) {
      return;
    }

    const componentType = await vscode.window.showQuickPick(
      [
        "Chord Chart",
        "Tab Display",
        "Fretboard",
        "Scale Visualizer",
        "Tuner",
        "Custom",
      ],
      { placeHolder: "Select guitar component type" }
    );

    if (!componentType) {
      return;
    }

    // 🧠 Brain-enhanced suggestions
    if (isBrainAvailable()) {
      const brainInterface = getBrainInterface();
      if (brainInterface) {
        try {
          await shareAnalysisData("guitar-component", {
            componentName,
            componentType,
            timestamp: new Date().toISOString(),
            action: "generate",
          });

          // Display brain suggestions
          await displayBrainSuggestions([
            `Generated ${componentType} component: ${componentName}`,
            "Consider adding interactive features for better user experience",
            "Include accessibility features for guitar learning",
            "Add responsive design for mobile guitar practice",
          ]);
        } catch (error) {
          console.log("Brain analysis optional:", error);
        }
      }
    }

    // Generate component based on type
    const componentContent = generateGuitarComponentContent(
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
      "guitar"
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
      `🎸✅ Generated ${componentType} component: ${componentName}`
    );
  } catch (error) {
    console.error("Generate Guitar Component Error:", error);
    await shareAnalysisData("guitar-component-error", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    vscode.window.showErrorMessage(
      `Failed to generate guitar component: ${error}`
    );
  }
}

function generateGuitarComponentContent(
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
    case "Chord Chart":
      specificProps = [
        { name: "chord", type: "string" },
        { name: "variation", type: "number" },
        { name: "showFingers", type: "boolean" },
      ];
      componentLogic = `
  const [selectedFret, setSelectedFret] = useState<number | null>(null);
  const [fingering, setFingering] = useState<number[]>([]);

  const renderChordChart = () => {
    // Chord chart rendering logic
    return (
      <div className="chord-chart">
        <div className="chord-name">{chord}</div>
        <svg className="fretboard" viewBox="0 0 120 160">
          {/* Fretboard SVG content */}
          <rect className="nut" x="10" y="10" width="100" height="4" fill="#8B4513"/>
          {[1,2,3,4,5].map(string => (
            <line key={string} x1="10" y1={10 + string * 20} x2="110" y2={10 + string * 20} stroke="#C0C0C0"/>
          ))}
          {[1,2,3,4].map(fret => (
            <line key={fret} x1={10 + fret * 25} y1="10" x2={10 + fret * 25} y2="110" stroke="#8B4513"/>
          ))}
        </svg>
      </div>
    );
  };`;
      break;

    case "Tab Display":
      specificProps = [
        { name: "tabData", type: "string[]" },
        { name: "currentPosition", type: "number" },
        { name: "onPositionChange", type: "(position: number) => void" },
      ];
      componentLogic = `
  const [playbackPosition, setPlaybackPosition] = useState(currentPosition);

  const renderTab = () => {
    return (
      <div className="tab-display">
        <div className="tab-lines">
          {['e','B','G','D','A','E'].map((string, index) => (
            <div key={string} className="tab-line">
              <span className="string-label">{string}</span>
              <div className="tab-content">
                {tabData[index]?.split('').map((fret, pos) => (
                  <span 
                    key={pos} 
                    className={\`tab-note \${pos === playbackPosition ? 'current' : ''}\`}
                  >
                    {fret}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };`;
      break;

    case "Fretboard":
      specificProps = [
        { name: "frets", type: "number" },
        { name: "tuning", type: "string[]" },
        { name: "highlightedNotes", type: "string[]" },
      ];
      componentLogic = `
  const [selectedNotes, setSelectedNotes] = useState<string[]>(highlightedNotes);

  const renderFretboard = () => {
    return (
      <div className="fretboard-container">
        <svg className="fretboard" viewBox="0 0 800 200">
          {/* Strings */}
          {tuning.map((note, string) => (
            <line 
              key={string} 
              x1="50" y1={30 + string * 25} 
              x2="750" y2={30 + string * 25} 
              stroke="#C0C0C0" 
              strokeWidth="2"
            />
          ))}
          {/* Frets */}
          {Array.from({length: frets}, (_, fret) => (
            <line 
              key={fret} 
              x1={50 + fret * 100} y1="30" 
              x2={50 + fret * 100} y2="180" 
              stroke="#8B4513" 
              strokeWidth="3"
            />
          ))}
          {/* Fret markers */}
          {[3,5,7,9,12,15,17,19,21].map(fret => (
            fret <= frets && (
              <circle 
                key={fret} 
                cx={50 + (fret - 0.5) * 100} 
                cy="105" 
                r="8" 
                fill="#DDD"
              />
            )
          ))}
        </svg>
      </div>
    );
  };`;
      break;

    default:
      componentLogic = `
  const [isActive, setIsActive] = useState(false);

  const handleInteraction = () => {
    setIsActive(!isActive);
    // Custom interaction logic
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
      {${
        componentType === "Chord Chart"
          ? "renderChordChart()"
          : componentType === "Tab Display"
            ? "renderTab()"
            : componentType === "Fretboard"
              ? "renderFretboard()"
              : "/* Custom component logic */"
      }}
    `
  );
}
