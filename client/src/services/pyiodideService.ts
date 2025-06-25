import {PyodideInstance} from "../types/pyiodideTypes";
import {useState} from "react";

// eslint-disable-next-line react-hooks/rules-of-hooks
const [pyodide, setPyodide] = useState<PyodideInstance | null>(null);

export const runCode = async (code: string, setOutput: (output: string) => void, setIsRunning: (running: boolean) => void) => {
    if (!pyodide) return;

    setIsRunning(true);
    try {
        // Create new StringIO for this execution
        pyodide.runPython(`
                sys.stdout = StringIO()
            `);

        // Run user code (variables persist in global scope)
        pyodide.runPython(code);

        // Get output
        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        setOutput(stdout || 'Code executed successfully (no output)');
    } catch (error) {
        setOutput(`Error: ${error}`);
    }
    setIsRunning(false);
};
