import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {PyodideInstance} from "../../../types/pyiodideTypes";
import {runCode, loadPyodide} from "../../../services/pyodideService";

const LinearRegression = () => {
    const [pyodide, setPyodide] = useState<PyodideInstance | null>(null);
    const [code1, setCode1] = useState('# Declare variables \n# y are our targets in 1000$ - while x represents our features,\n# first item in the array being the square meterage, the second value being the number of bedrooms\ny = np.array([300,500]) \nx = np.array([[100,3],[120,5]]) \nprint(f"Original x = {x}, y = {y}")\nprint(f"Feature 1 (sqm) range: {x[:, 0].min()} to {x[:, 0].max()}")\nprint(f"Feature 2 (bedrooms) range: {x[:, 1].min()} to {x[:, 1].max()}")');
    const [code2, setCode2] = useState('# Scale features before training\nscaler = StandardScaler()\nx_scaled = scaler.fit_transform(x)\nprint(f"Scaled x = {x_scaled}")\nprint(f"Scaled feature means: {x_scaled.mean(axis=0)}")\nprint(f"Scaled feature std devs: {x_scaled.std(axis=0)}")\n\n# Train with gradient descent on scaled features\nmodel = SGDRegressor(learning_rate="constant", eta0=0.01, max_iter=1000, random_state=42)\nmodel.fit(x_scaled, y)\n\nprint(f"\\nTraining completed!")\nprint(f"Model coefficients: {model.coef_}")\nprint(f"Model intercept: {model.intercept_}")');
    const [code3, setCode3] = useState('# Make predictions with trained model (remember to scale new data!)\nnew_house = np.array([[110, 4]])  # 110 sqm, 4 bedrooms\nprint(f"New house (original): {new_house[0]}")\n\n# Scale the new house using the same scaler\nnew_house_scaled = scaler.transform(new_house)\nprint(f"New house (scaled): {new_house_scaled[0]}")\n\n# Make prediction on scaled data\nprediction = model.predict(new_house_scaled)\nprint(f"New house prediction: {prediction[0]:.1f}k$")\n\n# Predict on original training data (scaled)\ntraining_predictions = model.predict(x_scaled)\nprint(f"\\nTraining predictions: {training_predictions}")\nprint(f"Actual values: {y}")');
    const [output1, setOutput1] = useState('');
    const [output2, setOutput2] = useState('');
    const [output3, setOutput3] = useState('');
    const [loading, setLoading] = useState<boolean | null>(true);
    const [isRunning1, setIsRunning1] = useState(false);
    const [isRunning2, setIsRunning2] = useState(false);
    const [isRunning3, setIsRunning3] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadPyodide(setLoading, setPyodide);
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
        setOutput2('');
        setOutput3('');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Linear Regression</h1>
            <p className="mb-4 tw-subtitle">
                Linear Regression is a type of Supervised Learning. You might remember it from your school maths. Very
                basic stuff. However Linear regression can be quite powerful in certain scenarios. Especially when you
                want a very performant model, and a model which is easy to backtrace and deconstruct the reasoning
                behind the answer that it has given.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            <strong>Why Feature Scaling?</strong> Our features (square meterage: 100-120 vs bedrooms:
                            3-5) are on very different scales.
                            Without scaling, the model might give too much weight to the larger-valued feature (square
                            meterage).
                            StandardScaler normalizes both features to have mean=0 and standard deviation=1.
                        </p>
                    </div>
                </div>
            </div>

            <hr className="mt-4 mb-4"/>
            <p className="tw-subtitle mb-4">
                Linear regression can be with a singular feature, or multiple features. If we were to give a simple
                example. Let's say we want to predict the pricing of a house. A very simple and obvious feature we could
                pick out, would be the square meterage of the house to predict the price. Typically meaning, the bigger
                the square meterage, the more expensive the house will be.
            </p>
            <br/>
            <p className="tw-subtitle mb-6">
                But of course the square meterage is not the only feature we could use. We could also use the number of
                bedrooms, bathrooms, stories, etc.
                Making our inference (prediction) of the model, more accurate.
            </p>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative">
                        <div className="w-8 h-8 border-2 border-gray-200 rounded-full"></div>
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    </div>
                    <p className="text-gray-500 mt-3 text-sm">Loading Python environment</p>
                </div>            ) : (
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
                            <li className="text-sm text-gray-600">Array x contains our 2 training examples</li>
                            <li className="text-sm text-gray-600">Each training example contains 2 features</li>
                            <li className="text-sm text-gray-600">1st feature: square meterage, 2nd feature: number of
                                bedrooms
                            </li>
                            <li className="text-sm text-gray-600">Array y contains target prices (300k$ and 500k$)</li>
                            <li className="text-sm text-gray-600">Notice the different scales of our features!</li>
                        </ul>
                        <textarea
                            value={code1}
                            onChange={(e) => setCode1(e.target.value)}
                            className="w-full h-[180px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your Python code here..."
                        />
                        <button
                            onClick={() => runCode(pyodide, code1, setOutput1, setIsRunning1)}
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
                        <h3 className="tw-sub-header">Step 2: Scale features and train the model</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">StandardScaler normalizes features to mean=0, std=1
                            </li>
                            <li className="text-sm text-gray-600">We fit the scaler on training data and transform it
                            </li>
                            <li className="text-sm text-gray-600">SGD Regressor trains on the scaled features</li>
                            <li className="text-sm text-gray-600">This prevents features with larger values from
                                dominating
                            </li>
                        </ul>
                        <textarea
                            value={code2}
                            onChange={(e) => setCode2(e.target.value)}
                            className="w-full h-[220px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your Python code here..."
                        />
                        <button
                            onClick={() => runCode(pyodide, code2, setOutput2, setIsRunning2)}
                            disabled={isRunning2}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isRunning2 ? 'Running...' : 'Run'}
                        </button>
                        {output2 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-1">Output 2:</h4>
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                                    {output2}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Third Code Block */}
                    <div className="space-y-3">
                        <h3 className="tw-sub-header">Step 3: Make predictions</h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">⚠️ <strong>Critical:</strong> New data must be scaled
                                using the same scaler
                            </li>
                            <li className="text-sm text-gray-600">We use transform() (not fit_transform()) on new data
                            </li>
                            <li className="text-sm text-gray-600">This ensures consistency with training data scaling
                            </li>
                        </ul>
                        <textarea
                            value={code3}
                            onChange={(e) => setCode3(e.target.value)}
                            className="w-full h-[220px] p-3 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="Enter your Python code here..."
                        />
                        <button
                            onClick={() => runCode(pyodide, code3, setOutput3, setIsRunning3)}
                            disabled={isRunning3}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isRunning3 ? 'Running...' : 'Run'}
                        </button>
                        {output3 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-1">Predictions:</h4>
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                                    {output3}
                                </pre>
                            </div>
                        )}
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-2 mt-4 shadow-sm">
                        <h3 className="pl-4 pt-4 text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => {navigate('/machine-learning/gradient-descent')}}
                                className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 flex items-center justify-between group"
                            >
                                <span className="font-medium">Gradient Descent</span>
                                <svg
                                    className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            <button
                                onClick={() => {/* Add your scaling navigation here */}}
                                className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 flex items-center justify-between group"
                            >
                                <span className="font-medium">Feature Scaling</span>
                                <svg
                                    className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            )}

        </div>
    )
}

export default LinearRegression;

