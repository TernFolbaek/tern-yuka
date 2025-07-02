import {PyodideInstance} from "../../types/pyiodideTypes";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BlockMath, InlineMath} from 'react-katex';
import CostFunctionSlope from '../../assets/cost-function-slope.webp'
import {loadPyodide, runCode} from "../../services/pyiodideService";

const GradientDescent = () => {
    const [pyodide, setPyodide] = useState<PyodideInstance | null>(null);
    const [code1, setCode1] = useState('x_train = np.array([[100,2,3],[120,3,5],[130,3,6]])\ny_train = np.array([200,320,400])\nprint("x_train = ", x_train)\nprint("y_train = ", y_train)');
    const [code2, setCode2] = useState(`
def compute_cost(x,y,w,b):
    m = x.shape[0]
    cost = 0
    # we will loop through all training examples, which is the value of m
    for i in range(m):
        f_wb = np.dot(w, x[i]) + b  # Use dot product instead of w * x[i]
        cost = cost + (f_wb - y[i])**2
    total_cost = 1 / (2 * m) * cost
    return total_cost
`);
    const [code3, setCode3] = useState(`
def compute_gradient(x,y,w,b):
    m = x.shape[0]
    n = x.shape[1]
    dj_dw = np.zeros(n)
    dj_db = 0
    for i in range(m):
        f_wb = np.dot(w, x[i]) + b  # Use dot product here too
        dj_dw_i = (f_wb - y[i]) * x[i]
        dj_db_i = f_wb - y[i]
        dj_db += dj_db_i
        dj_dw += dj_dw_i
    dj_dw = dj_dw / m
    dj_db = dj_db / m
    return dj_dw, dj_db
`);
    const [code4, setCode4] = useState(`
def gradient_descent(x,y,w_in,b_in,alpha,n_iters):
    # An array to store cost J and w's at each iteration for graphing
    J_history = []
    p_history = []
    b = b_in
    w = w_in
    
    for i in range(n_iters):
        # Calculate the gradient and update our weights
        
        dj_dw, dj_db = compute_gradient(x,y,w,b)
        w = w - alpha * dj_dw
        b = b - alpha * dj_db
        
        # Save cost at every 100 iterations
        if i < 10000:
            J_history.append(compute_cost(x,y,w,b))
            p_history.append([w,b])
            
        # Print cost at every 10 intervals 
        if i % math.ceil(n_iters / 10) == 0:
            # Convert everything to safe Python types
            cost_val = float(J_history[-1])
            dj_db_val = float(dj_db) if hasattr(dj_db, 'item') else float(dj_db)
            b_val = float(b) if hasattr(b, 'item') else float(b)
            
            # Format the arrays
            w_list = [float(x) for x in w.flatten()]
            dj_dw_list = [float(x) for x in dj_dw.flatten()]
            
            w_formatted = [f"{val:0.3e}" for val in w_list]
            dj_dw_formatted = [f"{val:0.3e}" for val in dj_dw_list]
            
            print(f"Iteration {i:4}: Cost {cost_val:0.2e}")
            print(f"  dj_dw: {dj_dw_formatted}, dj_db: {dj_db_val:0.3e}")
            print(f"  w: {w_formatted}, b: {b_val:0.5e}")
    return w, b, J_history, p_history
`);
    const [code5, setCode5] = useState(`
w_init = np.zeros(x_train.shape[1])
b_init = 0
# some gradient descent settings
iterations = 10000
alpha = 1.0e-4
# run gradient descent
w_final, b_final, J_history, p_history = gradient_descent(x_train,y_train,w_init,b_init,alpha,iterations)
    `)

    const [code6, setCode6] = useState(`
# plot cost versus iteration  
fig, (ax1, ax2) = plt.subplots(1, 2, constrained_layout=True, figsize=(12,4))
ax1.plot(J_history[:100])
ax2.plot(1000 + np.arange(len(J_history[1000:])), J_history[1000:])
ax1.set_title("Cost vs. iteration(start)");  ax2.set_title("Cost vs. iteration (end)")
ax1.set_ylabel('Cost')            ;  ax2.set_ylabel('Cost') 
ax1.set_xlabel('iteration step')  ;  ax2.set_xlabel('iteration step') 
plt.show()
    `)

    const [output1, setOutput1] = useState('');
    const [isRunning1, setIsRunning1] = useState(false);
    const [output2, setOutput2] = useState('');
    const [isRunning2, setIsRunning2] = useState(false);
    const [output3, setOutput3] = useState('');
    const [isRunning3, setIsRunning3] = useState(false);
    const [output4, setOutput4] = useState('');
    const [isRunning4, setIsRunning4] = useState(false);
    const [output5, setOutput5] = useState('');
    const [isRunning5, setIsRunning5] = useState(false);
    const [output6, setOutput6] = useState('');
    const [isRunning6, setIsRunning6] = useState(false);
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean | null>(true);

    useEffect(() => {
        loadPyodide(setLoading, setPyodide)
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
        setOutput4('');
        setOutput5('');
        setOutput6('');
        loadPyodide(setLoading, setPyodide)
    };

    return (
        <div>
            <p className="tw-header sticky top-0 py-2  bg-opacity-70 bg-white">Gradient Descent</p>
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
                lets add a few more training rows and features. Before we move onto the coding example, I will talk you
                through some key functions that are necessary for gradient descent. As we will be implementing it from
                scratch, and not using any external libraries.
            </p>
            <br/>
            <ul className="list-disc list-inside space-y-1">
                <li className="tw-subtitle">Compute Error</li>
                <li className="tw-subtitle">Compute Gradient</li>
                <li className="tw-subtitle">Run Gradient Descent</li>
            </ul>
            <br/>
            <hr className={"mt-2 mb-2"}/>
            <p className="tw-sub-header">Compute Error</p>
            <p className="tw-subtitle">
                The cost function is the function that we want to minimize. The cost function indicates the accuracy of
                our model.
                It looks as follows:
                <BlockMath math="J(w,b) = \frac{1}{2m} \sum_{i=1}^{m} (f_w,_b(x^{(i)}) - y^{(i)})^2"/>
                This is the mean squared error. The mean squared error is called that because it calculates the mean
                (average) of the squared differences between predicted and actual values.
                <br/>
                Below being our model prediction:
                <BlockMath math="f_w,_b(x^{(i)})"/>
                <br/>
                And below being the true value y:
                <BlockMath math="y^{(i)}"/>
                They are superscripted by the index i, because we have multiple training rows. As you can see in our
                cost function, we are iterating through <strong className="font-extrabold">m</strong>. And <strong
                className="font-extrabold">m</strong> is the number of
                training rows we have.
            </p>
            <br/>
            <p className="tw-sub-header">Compute Gradient</p>
            <p className="tw-subtitle">
                Once we have our cost function, we can use it to compute the gradient. Below is an image to illustrate
                what we are doing with gradient descent.
            </p>
            <img className="ml-auto mr-auto" src={CostFunctionSlope} alt="Cost function slope"/>
            <p className="tw-subtitle">
                This image is limited as it can only show us how 2 weights or 1 weight and 1 bias, affects the cost
                function value. In this case being x and y, being our weights, and the vertical axis being the value of
                our cost function.
                As you can see, our weights (x, y) would both be around the value 0 to obtain the most accurate model
                for our training data. This however doesn't necessarily mean they are the best weights, and this is a
                topic of discussion elsewhere in our overfitting section.
            </p>
            <br/>
            <p className="tw-subtitle">
                To compute our gradient, we will simply take the partial derivative of our cost function, with respect
                to <strong className="font-extrabold">w</strong> and with respect to <strong
                className="font-extrabold">b</strong>. This looks as follows:
            </p>
            <BlockMath math="\frac{\delta J(w,b)}{\delta b} = (f_w,_b(x^{(i)}) - y^{(i)})"/>
            <BlockMath math="\frac{\delta J(w,b)}{\delta w_j} = (f_w,_b(x^{(i)}) - y^{(i)})x_j ^{(i)}"/>
            <br/>
            <p className="tw-sub-header">Run Gradient Descent</p>
            <p className="tw-subtitle">
                Now that we have our <strong className="font-extrabold">Compute Gradient</strong> function in place,
                that makes use of our cost function. We can now make use of gradient descent. What gradient descent
                does, it changes our weights and bias values, so that our spot in the <strong
                className="font-extrabold">Cost Function</strong> slope reduces. Meaning we are attempting to step our
                way down, to reach the global minimum.
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
                            <li className="text-sm text-gray-600">Variable x contains our training rows and their
                                respective features
                            </li>
                            <li className="text-sm text-gray-600">Variable y contains our target values</li>
                        </ul>
                        <textarea
                            value={code1}
                            onChange={(e) => setCode1(e.target.value)}
                            className="w-full h-[180px]  p-1  border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                    {output1}
                                </pre>
                            </div>
                        )}
                    </div>
                    <p className="tw-subtitle"></p>

                    {/* Second Code Block */}
                    <div className="space-y-3">
                        <h3 className="tw-sub-header">Step 2: Compute the cost function </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">The cost function is the mean of the loss of each
                                training example.
                            </li>
                            <li className="text-sm text-gray-600">First we calculate our prediction for the current
                                training example: f_wb = np.dot(w, x[i]) + b
                            </li>
                            <li className="text-sm text-gray-600">We then find the cost by subtracting our prediction
                                with the true value y, and squaring it: (f_wb - y[i])**2
                            </li>
                            <li className="text-sm text-gray-600">We accumulate this onto our cost</li>
                            {/* EXPLAIN WHY THIS MAKES THE GRADIENT FUNCTION EASIER, MAYBE CREATE A GENERIC POP UP MODAL COMPONENT WITH INPUT VARIABLES*/}
                            <li className="text-sm text-gray-600">At last we divide our cost by (2 * m), m being our
                                training examples. It is multiplied by 2 to make our gradient computation simpler
                            </li>
                        </ul>
                        <textarea
                            value={code2}
                            onChange={(e) => setCode2(e.target.value)}
                            className="w-full h-[250px]  p-1  border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                    {output2}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Third Code Block */}
                    <div className="space-y-3">
                        <h3 className="tw-sub-header">Step 3: Compute the gradient </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">We now make use of our two gradient functions:
                            </li>
                            <li><InlineMath math="\frac{\delta J(w,b)}{\delta b} = (f_w,_b(x^{(i)}) - y^{(i)})"/></li>
                            <li><InlineMath
                                math="\frac{\delta J(w,b)}{\delta w_j} = (f_w,_b(x^{(i)}) - y^{(i)})x_j ^{(i)}"/></li>
                            <li className="text-sm text-gray-600">As you can see, w is subscripted with j, as we need to
                                find the gradient with respect to each feature
                            </li>
                        </ul>
                        <textarea
                            value={code3}
                            onChange={(e) => setCode3(e.target.value)}
                            className="w-full h-[350px]  p-1  border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                    {output3}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Fourth Code Block */}
                    <div className="space-y-3">
                        <h3 className="tw-sub-header">Step 4: Run Gradient Descent </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">We have two history variables so we can plot and print
                                our progress through the descent
                            </li>
                            <li className="text-sm text-gray-600">Focus on how we are iteratively updating our weights
                                with our newfound gradient values:
                            </li>
                            <li className="text-sm text-gray-600">
                                w = w - alpha * dj_dw
                            </li>
                            <li className="text-sm text-gray-600">
                                b = b - alpha * dj_db
                            </li>
                        </ul>
                        <textarea
                            value={code4}
                            onChange={(e) => setCode4(e.target.value)}
                            className="w-full h-[850px]  p-1  border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your Python code here..."
                        />
                        <button
                            onClick={() => runCode(pyodide, code4, setOutput4, setIsRunning4)}
                            disabled={isRunning4}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isRunning3 ? 'Running...' : 'Run'}
                        </button>
                        {output4 && (
                            <div>
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                    {output4}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Fifth Code Block */}
                    <div className="space-y-3">
                        <h3 className="tw-sub-header">Step 5: Compute the gradient </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">Variable x contains our training rows and their
                                respective features
                            </li>
                            <li className="text-sm text-gray-600">Variable y contains our target values</li>
                        </ul>
                        <textarea
                            value={code5}
                            onChange={(e) => setCode5(e.target.value)}
                            className="w-full h-[230px] p-1 border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your Python code here..."
                        />
                        <button
                            onClick={() => runCode(pyodide, code5, setOutput5, setIsRunning5)}
                            disabled={isRunning5}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isRunning5 ? 'Running...' : 'Run'}
                        </button>
                        {output5 && (
                            <div>
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                    {output5}
                                </pre>
                            </div>
                        )}
                    </div>

                    {/* Sixth Code Block */}
                    <div className="space-y-3">
                        <h3 className="tw-sub-header">Step 6: Plot the descent </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="text-sm text-gray-600">Plot 1: Cost function value and iteration step (start)
                            </li>
                            <li className="text-sm text-gray-600">Plot 2: Cost function value and iteration step (end)
                            </li>
                        </ul>
                        <textarea
                            value={code6}
                            onChange={(e) => setCode6(e.target.value)}
                            className="w-full h-[250px]  p-1  border border-gray-300 rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your Python code here..."
                        />
                        <button
                            onClick={() => runCode(pyodide, code6, setOutput6, setIsRunning6)}
                            disabled={isRunning6}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isRunning6 ? 'Running...' : 'Run'}
                        </button>
                        {output6 && (
                            <div>
                                <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                                    {output6}
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