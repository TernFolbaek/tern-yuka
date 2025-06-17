import {Routes, Route} from 'react-router-dom';
import GradientDescent from './GradientDescent';
import MachineLearningIntro from "./MachineLearningIntro";

const MachineLearning = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MachineLearningIntro/>}/>
                <Route path="/gradient-descent" element={<GradientDescent/>}/>
            </Routes>
        </>
    )
}

export default MachineLearning;