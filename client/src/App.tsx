import {useState} from "react";
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MachineLearning from "./components/MachineLearning/MachineLearning";

const App: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <BrowserRouter>
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar}/>
                <div
                    className={`p-12 flex-1 transition-all duration-300 ease-in-out ${
                        sidebarOpen ? 'ml-80' : 'ml-0'
                    }`}
                >
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/machine-learning/*" element={<MachineLearning/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;