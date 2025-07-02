import {Route, Routes} from "react-router-dom";
import MathIntroduction from "./MathIntroduction";
import LinearAlgebraRoutes from "./LinearAlgebra/LinearAlgebraRoutes";
import DiscreteMathRoutes from "./DiscreteMaths/DiscreteMathRoutes";

const MathRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MathIntroduction/>}/>
                <Route path="/linear-algebra/*" element={<LinearAlgebraRoutes/>}/>
                <Route path="/discrete-maths/*" element={<DiscreteMathRoutes/>}/>

            </Routes>
        </>
    )
}

export default MathRoutes;