// handlers/music/vocal/createVocalExerciseHandler.ts
import * as vscode from "vscode";

// ✅ UNIFIED ARCHITECTURE IMPORTS
import { generateReactComponentTemplate } from "../../../shared/templateGenerators";
import {
  ensureDirectoryExists,
  isBrainAvailable,
  shareAnalysisData,
} from "../../../shared/utils";

// 🧠 KEEP FOR All HANDLER FILES— Brain Enhanced
import { BrainConnector } from "../../../brain/BrainConnector";


export async function createVocalExerciseHandler(): Promise<void> {
  try {
    // Get exercise type from user
    const exerciseType = await vscode.window.showQuickPick(
      [
        "🎵 Warm-up Scales",
        "🎯 Pitch Accuracy",
        "💨 Breathing Exercises",
        "🎶 Interval Training",
        "🎤 Vocal Agility",
        "🎸 Harmony Practice",
        "📈 Range Extension",
      ],
      {
        placeHolder: "Select vocal exercise type",
      }
    );

    if (!exerciseType) return;

    // Get difficulty level
    const difficulty = await vscode.window.showQuickPick(
      ["Beginner", "Intermediate", "Advanced", "Professional"],
      {
        placeHolder: "Select difficulty level",
      }
    );

    if (!difficulty) return;

    // Get key/range
    const vocalRange = await vscode.window.showInputBox({
      prompt: "Enter vocal range (e.g., C3-C5) or key (e.g., C major)",
      value: "C4-C5",
    });

    if (!vocalRange) return;

    vscode.window.showInformationMessage(
      "🎤 Creating AI-powered vocal exercise..."
    );

    // Generate vocal exercise component using established template system
    const exerciseConfig = {
      type: exerciseType,
      difficulty,
      range: vocalRange,
      timestamp: Date.now(),
    };

    const exerciseCode = await generateVocalExerciseComponent(exerciseConfig);

    // Create file in workspace using established utils
    await createVocalExerciseFile(exerciseCode, exerciseType);

    // Share with brain for learning
    if (isBrainAvailable()) {
      await shareAnalysisData("music-theory", {
        action: "vocal-exercise-creation",
        exerciseType,
        difficulty,
        range: vocalRange,
        success: true,
        timestamp: Date.now(),
      });
    }

    vscode.window.showInformationMessage("✅ Vocal exercise created! 🎤");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("🎤 Vocal exercise creation error:", error);

    await shareAnalysisData("music-theory", {
      action: "vocal-exercise-creation",
      success: false,
      error: errorMessage,
      timestamp: Date.now(),
    });

    vscode.window.showErrorMessage(
      `🎤 Vocal exercise creation failed: ${errorMessage}`
    );
  }
}

async function generateVocalExerciseComponent(config: any): Promise<string> {
  const exerciseTypeName = config.type
    .replace(/[🎵🎯💨🎶🎤🎸📈]/g, "")
    .trim()
    .replace(/\s+/g, "");

  // Use established template generator if available, otherwise fallback
  try {
    return await generateReactComponentTemplate({
      componentName: `${exerciseTypeName}Exercise`,
      componentType: "functional",
      props: [
        { name: "difficulty", type: "string" },
        { name: "range", type: "string" },
        { name: "type", type: "string" },
      ],
    });
  } catch {
    // Fallback template
    return generateFallbackVocalExerciseTemplate(exerciseTypeName, config);
  }
}

function generateFallbackVocalExerciseTemplate(
  exerciseTypeName: string,
  config: any
): string {
  return `import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ${exerciseTypeName}ExerciseProps {
    difficulty: '${config.difficulty}';
    range: '${config.range}';
}

const ${exerciseTypeName}Exercise: React.FC<${exerciseTypeName}ExerciseProps> = ({ difficulty, range }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentNote, setCurrentNote] = useState('C4');
    const [progress, setProgress] = useState(0);

    const startExercise = () => {
        setIsPlaying(true);
        console.log('Starting ${config.type} exercise');
    };

    const stopExercise = () => {
        setIsPlaying(false);
        setProgress(0);
    };

    return (
        <Card className="vocal-exercise">
            <CardHeader>
                <CardTitle>🎤 ${config.type}</CardTitle>
                <p>Difficulty: {difficulty} | Range: {range}</p>
            </CardHeader>
            <CardContent>
                <div className="exercise-controls">
                    <Button onClick={startExercise} disabled={isPlaying}>
                        {isPlaying ? 'Exercising...' : 'Start Exercise'}
                    </Button>
                    <Button onClick={stopExercise} disabled={!isPlaying}>
                        Stop
                    </Button>
                </div>
                
                <div className="exercise-display">
                    <div className="current-note">
                        Current Note: {currentNote}
                    </div>
                    <div className="progress-bar">
                        Progress: {progress}%
                    </div>
                </div>

                <div className="exercise-instructions">
                    <h4>Instructions:</h4>
                    <ul>
                        <li>Follow the visual cues</li>
                        <li>Match the pitch accurately</li>
                        <li>Focus on breath support</li>
                        <li>Practice regularly for best results</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default ${exerciseTypeName}Exercise;`;
}

async function createVocalExerciseFile(
  content: string,
  exerciseType: string
): Promise<void> {
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (!workspaceFolder) {
    throw new Error("No workspace folder found");
  }

  const fileName =
    exerciseType
      .replace(/[🎵🎯💨🎶🎤🎸📈]/g, "")
      .trim()
      .replace(/\s+/g, "") + "Exercise.tsx";
  const componentDir = vscode.Uri.joinPath(
    workspaceFolder.uri,
    "src",
    "components",
    "vocal"
  );

  // Use established directory creation utility
  await ensureDirectoryExists(componentDir);

  const fileUri = vscode.Uri.joinPath(componentDir, fileName);
  await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content));

  // Open the created file
  const doc = await vscode.workspace.openTextDocument(fileUri);
  await vscode.window.showTextDocument(doc);
}
