import {Routes, Route} from 'react-router-dom';
import GraphTheoryIntro from "./GraphTheoryIntro";
import JaccardSimiliarity from "./JaccardSimiliarity";

const GraphTheoryRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<GraphTheoryIntro/>}/>
                <Route path="/jaccard-similiarity" element={<JaccardSimiliarity/>}/>
            </Routes>
        </>
    )
}

export default GraphTheoryRoutes;