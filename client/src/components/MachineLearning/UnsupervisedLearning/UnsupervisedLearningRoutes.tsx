import {Routes, Route} from 'react-router-dom';
import UnsupervisedLearningIntro from "./UnsupervisedLearningIntro";

const MachineLearningRoutes  = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<UnsupervisedLearningIntro/>}/>
            </Routes>
        </>
    )
}

export default MachineLearningRoutes;