import {Routes, Route} from 'react-router-dom';
import DiscreteMathIntro from "./DiscreteMathIntro";
import GraphTheoryRoutes from "./GraphTheory/GraphTheoryRoutes";

const DiscreteMathRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<DiscreteMathIntro/>}/>
                <Route path="graph-theory/*" element={<GraphTheoryRoutes/>}/>

            </Routes>
        </>
    )
}

export default DiscreteMathRoutes;