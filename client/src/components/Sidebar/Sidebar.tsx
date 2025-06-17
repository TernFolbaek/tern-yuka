import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, Calculator, Atom, Code, Brain} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, onToggle}) => {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
    const navigate = useNavigate();

    const toggleGroup = (groupId: string) => {
        navigate(groupId);
        setExpandedGroups(prev => ({
            ...prev,
            [groupId]: !prev[groupId]
        }));
    };

    const learningAreas = [
        {
            id: 'maths',
            title: 'Maths',
            icon: Calculator,
            items: []
        },
        {
            id: 'physics',
            title: 'Physics',
            icon: Atom,
            items: []
        },
        {
            id: 'software-engineering',
            title: 'Software Engineering',
            icon: Code,
            items: []
        },
        {
            id: 'machine-learning',
            title: 'Machine Learning',
            icon: Brain,
            items: [
                {
                    id: 'machine-learning/supervised-learning',
                    title: 'Supervised Learning',
                    items: []
                },
                {
                    id: 'machine-learning/unsupervised-learning',
                    title: 'Unsupervised Learning',
                    items: []
                },
                {
                    id: 'machine-learning/gradient-descent',
                    title: 'Gradient descent',
                },
            ]
        }
    ];

    const renderItems = (items: any[], level: number = 0) => {
        return items.map((item, index) => {
            if (!item.items) {
                // Leaf item
                return (
                    <button
                        key={index}
                        onClick={() => {navigate(item.id)}}
                        className={`w-full text-left p-2 rounded-md text-gray-800 hover:bg-gray-200 transition-colors text-sm whitespace-nowrap`}
                        style={{marginLeft: `${level * 20}px`}}
                    >
                        {item.title}
                    </button>
                );
            } else {
                // Folder item
                const isExpanded = expandedGroups[item.id];
                return (
                    <div key={item.id} className="space-y-1">
                        <button
                            onClick={() => toggleGroup(item.id)}
                            className={`w-full flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-gray-200 transition-colors`}
                            style={{marginLeft: `${level * 20}px`}}
                        >
                            <span className="font-medium whitespace-nowrap text-sm">
                                {item.title}
                            </span>
                            <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-90' : ''
                            }`}/>
                        </button>
                        {isExpanded && item.items && (
                            <div onClick={() => {
                                navigate(item.id)
                            }} className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                                {renderItems(item.items, level + 1)}
                            </div>
                        )}
                    </div>
                );
            }
        });
    };

    return (
        <>
            {/* Floating Toggle Button - Always Visible */}
                {!isOpen && (
                    <button
                        onClick={onToggle}
                        className={`fixed top-4 z-50 p-3 rounded-lg hover:bg-gray-200 bg-white transition-all duration-300 ease-in-out shadow-lg left-[-5px]`}
                    >
                        <ChevronRight className="w-5 h-5"/>
                    </button>
                )}

                {/* Sidebar */}
                <div
                    className={`fixed left-0 top-0 h-full transition-all duration-300 ease-in-out z-40 overflow-hidden ${
                        isOpen ? 'w-80' : 'w-0'
                    }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-800">
                        <div className="w-full flex items-center justify-between">
                            <h1 onClick={()=>{navigate('/')}} className="hover:cursor-pointer text-lg font-semibold whitespace-nowrap">Tern Yuka</h1>
                            <button
                                onClick={onToggle}
                                className={`p-3 rounded-lg hover:bg-gray-200 `}
                            >
                                <ChevronLeft className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-2 overflow-y-auto h-full pb-20">
                        {learningAreas.map((area) => {
                            const Icon = area.icon;
                            const isExpanded = expandedGroups[area.id];

                            return (
                                <div key={area.id} className="space-y-1">
                                    {/* Group Header */}
                                    <button
                                        onClick={() => toggleGroup(area.id)}
                                        className="w-full flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-5 h-5 flex-shrink-0"/>
                                            <span className="font-medium whitespace-nowrap">
                                        {area.title}
                                    </span>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                                            isExpanded ? 'rotate-90' : ''
                                        }`}/>
                                    </button>

                                    {/* Group Items */}
                                    {isExpanded && (
                                        <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                            {renderItems(area.items)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
        </>
    );
};

export default Sidebar;