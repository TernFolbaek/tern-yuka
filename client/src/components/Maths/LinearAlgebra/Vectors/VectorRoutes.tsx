import {Routes, Route} from 'react-router-dom';
import VectorIntro from "./VectorIntro";

const LinearAlgebraRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<VectorIntro/>}/>
            </Routes>
        </>
    )
}

export default LinearAlgebraRoutes;