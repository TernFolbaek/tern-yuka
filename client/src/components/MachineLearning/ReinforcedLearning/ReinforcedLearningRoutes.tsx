import {Routes, Route} from 'react-router-dom';
import ReinforcedLearningIntro from "./ReinforcedLearningIntro";

const MachineLearningRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ReinforcedLearningIntro/>}/>
            </Routes>
        </>
    )
}

export default MachineLearningRoutes;