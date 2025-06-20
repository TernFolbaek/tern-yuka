import {Routes, Route} from 'react-router-dom';
import SupervisedLearningIntro from "./SupervisedLearningIntro";

const MachineLearningRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SupervisedLearningIntro/>}/>
            </Routes>
        </>
    )
}

export default MachineLearningRoutes;