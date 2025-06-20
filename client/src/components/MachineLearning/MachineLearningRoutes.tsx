import {Routes, Route} from 'react-router-dom';
import GradientDescent from './GradientDescent';
import MachineLearningIntro from "./MachineLearningIntro";
import SupervisedLearningRoutes from "./SupervisedLearning/SupervisedLearningRoutes";
import UnsupervisedLearningRoutes from "./UnsupervisedLearning/UnsupervisedLearningRoutes";
import ReinforcedLearningRoutes from "./ReinforcedLearning/ReinforcedLearningRoutes";

const MachineLearningRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MachineLearningIntro/>}/>
                <Route path="/gradient-descent" element={<GradientDescent/>}/>
                <Route path="/supervised-learning/*" element={<SupervisedLearningRoutes/>}/>
                <Route path="/unsupervised-learning/*" element={<UnsupervisedLearningRoutes/>}/>
                <Route path="/reinforced-learning/*" element={<ReinforcedLearningRoutes/>}/>

            </Routes>
        </>
    )
}

export default MachineLearningRoutes;