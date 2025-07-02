import {Route, Routes} from "react-router-dom";
import MathIntroduction from "./MathIntroduction";
import LinearAlgebraIntro from "./LinearAlgebra/LinearAlgebraIntro";

const MathRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MathIntroduction/>}/>
                <Route path="/linear-algebra" element={<LinearAlgebraIntro/>}/>
            </Routes>
        </>
    )
}

export default MathRoutes;