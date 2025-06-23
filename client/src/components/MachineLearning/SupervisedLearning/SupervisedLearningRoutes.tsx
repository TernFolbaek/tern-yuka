import {Routes, Route} from 'react-router-dom';
import SupervisedLearningIntro from "./SupervisedLearningIntro";
import LinearRegression from "./LinearRegression";

const MachineLearningRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SupervisedLearningIntro/>}/>
                <Route path="/linear-regression" element={<LinearRegression/>}/>
            </Routes>
        </>
    )
}

export default MachineLearningRoutes;