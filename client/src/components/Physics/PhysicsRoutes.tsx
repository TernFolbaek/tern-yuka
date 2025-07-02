import {Routes, Route} from 'react-router-dom';
import PhysicsIntro from "./PhysicsIntro";

const PhysicsRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<PhysicsIntro/>}/>
            </Routes>
        </>
    )
}

export default PhysicsRoutes;