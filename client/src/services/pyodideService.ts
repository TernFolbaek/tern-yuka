import {PyodideInstance} from "../types/pyiodideTypes";

let currentAbortController: AbortController | null = null;

export async function loadPyodide(setLoading: (loading: boolean | null) => void, setPyodide: (pyodide: PyodideInstance) => void, abortSignal?: AbortSignal): Promise<void> {
    try {
        if(!abortSignal){
            currentAbortController = new AbortController();
            abortSignal = currentAbortController.signal;
        }

        if(abortSignal.aborted){
            console.log("Pyodide loading was aborted before starting")
            return;
        }

        const pyodideModule = await (window as any).loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });

        if(abortSignal.aborted){
            console.log("Pyodide loading was aborted after loaded")
            return;
        }

        // Load required packages
        await pyodideModule.loadPackage(['numpy', 'matplotlib', 'scikit-learn']);

        if (abortSignal.aborted) {
            console.log('Pyodide loading was aborted after loading packages');
            return;
        }

        // Set up stdout capture and imports
        pyodideModule.runPython(`
                    import sys
                    import numpy as np
                    from io import StringIO
                    from sklearn.linear_model import SGDRegressor
                    from sklearn.preprocessing import StandardScaler 
                    import matplotlib.pyplot as plt
                    import math
                `);

        if (!abortSignal.aborted) {
            setPyodide(pyodideModule);
            setLoading(false);
        }

    } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setLoading(false);
    }
};

export function abortPyodideLoading(){
    if(currentAbortController){
        currentAbortController.abort();
        currentAbortController = null;
    }

}

export async function runCode(pyodide: PyodideInstance | null, code: string, setOutput: (output: string) => void, setIsRunning: (running: boolean) => void) {
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