import {PyodideInstance} from "../../types/pyiodideTypes";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const GradientDescent = () => {
    const [pyodide, setPyodide] = useState<PyodideInstance | null>(null);
    const [code1, setCode1] = useState('x = np.array([[100,2,3],[120,3,5],[130,3,6]])\ny = np.array([200,320,400])\nprint("x = ", x)\nprint("y = ", y)');
    const [output1, setOutput1] = useState('');
    const [isRunning1, setIsRunning1] = useState(false);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadPyodide = async () => {
            try {
                const pyodideModule = await (window as any).loadPyodide({
                    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
                });

                // Load required packages
                await pyodideModule.loadPackage(['numpy', 'matplotlib', 'scikit-learn']);

                // Set up stdout capture and imports
                pyodideModule.runPython(`
                    import sys
                    import numpy as np
                    from io import StringIO
                    from sklearn.linear_model import SGDRegressor
                    from sklearn.preprocessing import StandardScaler 
                    
                `);

                setPyodide(pyodideModule);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load Pyodide:', error);
                setLoading(false);
            }
        };

        loadPyodide();
    }, []);

    const resetPythonEnvironment = () => {
        if (!pyodide) return;
        pyodide.runPython(`
            # Clear all user-defined variables
            for var in list(globals().keys()):
                if not var.startswith('_') and var not in ['sys', 'StringIO', 'np', 'plt', 'SGDRegressor', 'StandardScaler']:
                    del globals()[var]
        `);
        setOutput1('');
    };

    const runCode = async (code: string, setOutput: (output: string) => void, setIsRunning: (running: boolean) => void) => {
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

    return (
        <div>
            <p className="tw-header">Gradient Descent</p>
            <p className="tw-subtitle">Gradient Descent is one of the most well known optimization techniques. Meaning,
                it is used to reduce our cost function. This article will assume that you have already familiarized
                yourself with the cost function. The cost function represents how accurate our model is. The higher the
                value of the cost function, the further are we from an accurate model. There is of course however some
                shady areas to this statement. As if a cost function returns a value of 0, it might be an indicator of
                over-fitting. Simply put - our model is too optimized to our training model, and not generalized enough
                for new data. In this article we will run through an example on how to use gradient descent. And the
                notation for it. </p>
            <hr className={"mt-2 mb-2"}/>
            <p className="tw-subtitle">
                I will be extending my example from the Linear Regression page, being house prices. However
                lets add a few more training rows and features.
            </p>
            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative">
                        <div className="w-8 h-8 border-2 border-gray-200 rounded-full"></div>
                        <div
                            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    </div>
                    <p className="text-gray-500 mt-3 text-sm">Loading Python environment</p>
                </div>) : (
                <div className="mt-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Interactive Python Environment</p>
                        <button
                            onClick={resetPythonEnvironment}
                            className="px-3 py-1 bg-purple-100 text-purple-500 text-sm rounded-md hover:bg-purple-200"
                        >
                            Reset Environment
                        </button>
                    </div>
                    <p className="text-md font-semibold">Play around with the values and see the result change</p>

                    <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-blue-800">
                            💡 <strong>Tip:</strong> Variables declared in one code block will be available in the next!
                            Try running the first block, then the second block.
                        </p>
                    </div>
                    {/* First Code Block */}
                    <div className="space-y-3">
                        <h3 className="tw-sub-header">Step 1: Declare features and targets</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">Variable x contains our training rows and their respective features</li>
                            <li className="text-sm text-gray-600">Variable y contains our target values</li>
                        </ul>
                        <textarea
                            value={code1}
                            onChange={(e) => setCode1(e.target.value)}
                            className="w-full h-[180px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your Python code here..."
                        />
                        <button
                            onClick={() => runCode(code1, setOutput1, setIsRunning1)}
                            disabled={isRunning1}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isRunning1 ? 'Running...' : 'Run'}
                        </button>
                        {output1 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-1">Output 1:</h4>
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                    {output1}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Second Code Block */}
                    <div className="space-y-3">
                        <h3 className="tw-sub-header">Step 1: Declare features and targets</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">Variable x contains our training rows and their respective features</li>
                            <li className="text-sm text-gray-600">Variable y contains our target values</li>
                        </ul>
                        <textarea
                            value={code1}
                            onChange={(e) => setCode1(e.target.value)}
                            className="w-full h-[180px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your Python code here..."
                        />
                        <button
                            onClick={() => runCode(code1, setOutput1, setIsRunning1)}
                            disabled={isRunning1}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isRunning1 ? 'Running...' : 'Run'}
                        </button>
                        {output1 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-1">Output 1:</h4>
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                    {output1}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default GradientDescent;