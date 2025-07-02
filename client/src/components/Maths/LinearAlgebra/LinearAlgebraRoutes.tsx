import {Routes, Route} from 'react-router-dom';
import LinearAlgebraIntro from "./LinearAlgebraIntro";
import VectorRoutes from "./Vectors/VectorRoutes";

const LinearAlgebraRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LinearAlgebraIntro/>}/>
                <Route path="/vectors/*" element={<VectorRoutes/>}/>
            </Routes>
        </>
    )
}

export default LinearAlgebraRoutes;