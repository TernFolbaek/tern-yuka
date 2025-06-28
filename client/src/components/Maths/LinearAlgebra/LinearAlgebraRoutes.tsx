import {Routes, Route} from 'react-router-dom';
import LinearAlgebraIntro from "./LinearAlgebraIntro";
import Vectorization from "./Vectors/Vectorization";

const LinearAlgebraRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LinearAlgebraIntro/>}/>
                <Route path="/vectors/vectorization" element={<Vectorization/>}/>
            </Routes>
        </>
    )
}

export default LinearAlgebraRoutes;