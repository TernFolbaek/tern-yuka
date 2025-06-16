import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, Calculator, Atom, Code, Brain} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, onToggle}) => {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (groupId: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [groupId]: !prev[groupId]
        }));
    };

    const learningAreas = [
        {
            id: 'mathematics',
            title: 'Mathematics',
            icon: Calculator,
            items: [
                'Linear Algebra',
                'Calculus',
                'Statistics',
                'Discrete Mathematics',
                'Number Theory',
                'Differential Equations'
            ]
        },
        {
            id: 'physics',
            title: 'Physics',
            icon: Atom,
            items: [
                'Classical Mechanics',
                'Electromagnetism',
                'Thermodynamics',
                'Quantum Mechanics',
                'Relativity',
                'Statistical Mechanics'
            ]
        },
        {
            id: 'software-engineering',
            title: 'Software Engineering',
            icon: Code,
            items: [
                'Data Structures',
                'Algorithms',
                'System Design',
                'Software Architecture',
                'Testing',
                'DevOps'
            ]
        },
        {
            id: 'machine-learning',
            title: 'Machine Learning',
            icon: Brain,
            items: [
                'Supervised Learning',
                'Unsupervised Learning',
                'Deep Learning',
                'Natural Language Processing',
                'Computer Vision',
                'Reinforcement Learning'
            ]
        }
    ];

    return (
        <>
            {/* Floating Toggle Button - Always Visible */}
            <button
                onClick={onToggle}
                className={`fixed top-4 z-50 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-lg ${
                    isOpen ? 'left-[250px]' : 'left-4'
                }`}
            >
                {!isOpen && (<ChevronRight className="w-5 h-5"/>)}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full bg-black text-white transition-all duration-300 ease-in-out z-40 overflow-hidden ${
                    isOpen ? 'w-80' : 'w-0'
                }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-lg font-semibold whitespace-nowrap">Tern Yuka</h1>
                        {isOpen && (
                            <ChevronLeft onClick={onToggle} className="hover:cursor-pointer w-5 h-5"/>
                        )}
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
                                    className="w-full flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
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
                                        {area.items.map((item, index) => (
                                            <button
                                                key={index}
                                                className="w-full text-left p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors text-sm whitespace-nowrap"
                                            >
                                                {item}
                                            </button>
                                        ))}
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