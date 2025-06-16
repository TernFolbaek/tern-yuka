import {useState, } from "react";
import Sidebar from './components/Navbar/Sidebar';
const App: React.FC = () => {

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-white">
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
            {/* Main Content */}
            <div className={`transition-all duration-300 ease-in-out ${
                sidebarOpen ? 'ml-80' : 'ml-16'
            }`}>
                <div className="p-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Learning Hub Dashboard</h1>
                        <p className="text-gray-600">
                            Welcome to your learning hub! Use the sidebar to navigate between different subjects and topics.
                            Click the toggle button to collapse or expand the sidebar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;