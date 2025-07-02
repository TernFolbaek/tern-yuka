import React, {useState} from 'react';
import {ChevronLeft, ChevronRight, Calculator, Atom, Code, Brain} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, onToggle}) => {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
    const [selectedItem, setSelectedItem] = useState<string>('');
    const navigate = useNavigate();

    const toggleGroup = (groupId: string) => {
        navigate(groupId);
        setSelectedItem(groupId);
        setExpandedGroups(prev => {
            const newState = { ...prev };
            const isParentOf = (parentId: string, childId: string) => {
                return childId.startsWith(parentId + '/');
            };
            const isChildOf = (childId: string, parentId: string) => {
                return childId.startsWith(parentId + '/');
            };
            Object.keys(prev).forEach(key => {
                if (key !== groupId &&
                    !isParentOf(key, groupId) &&
                    !isChildOf(key, groupId)) {
                    const keyDepth = key.split('/').length;
                    const groupDepth = groupId.split('/').length;
                    if (keyDepth === groupDepth) {
                        newState[key] = false;
                    }
                }
            });
            newState[groupId] = !prev[groupId];
            return newState;
        });
    };

    const learningAreas = [
        {
            id: 'maths',
            title: 'Maths',
            icon: Calculator,
            items: [
                {
                    id: 'maths/linear-algebra',
                    title: 'Linear Algebra',
                    items: [
                        {
                            id: 'maths/linear-algebra/vectors',
                            title: 'Vectors',
                            items: []
                        }
                    ]
                },
            ]
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
                    items: [
                        {
                            id: 'machine-learning/supervised-learning/linear-regression',
                            title: 'Linear Regression',
                        },
                    ]
                },
                {
                    id: 'machine-learning/unsupervised-learning',
                    title: 'Unsupervised Learning',
                    items: []
                },
                {
                    id: 'machine-learning/reinforced-learning',
                    title: 'Reinforced Learning',
                    items: []
                },
                {
                    id: 'machine-learning/cost-function',
                    title: 'Cost Function',
                    items: [
                        {
                            id: 'machine-learning/cost-function/mean-squared-error',
                            title: 'Mean Squared Error',
                        },
                    ]
                },
                {
                    id: 'machine-learning/gradient-descent',
                    title: 'Gradient Descent',
                },
            ]
        }
    ];

    // Calculate depth based on ID structure
    const getDepth = (id: string) => {
        return id.split('/').length - 1;
    };

    // Get indentation with overflow protection
    const getIndentation = (depth: number) => {
        // Cap maximum indentation to prevent overflow
        const maxDepth = 4;
        const effectiveDepth = Math.min(depth, maxDepth);
        return effectiveDepth * 16; // 16px per level
    };

    const renderItems = (items: any[], parentDepth: number = 0) => {
        return items.map((item, index) => {
            const currentDepth = parentDepth + 1;
            const indentationPx = getIndentation(currentDepth);

            if (!item.items) {
                // Leaf item with indentation
                return (
                    <button
                        key={index}
                        onClick={() => {
                            navigate(item.id);
                            console.log(item.id);
                            setSelectedItem(item.id);
                        }}
                        className={`w-full text-left p-2 rounded-md text-gray-800 hover:bg-gray-200 transition-colors text-sm ${selectedItem === item.id ? 'bg-gray-200' : ''}`}
                        style={{ paddingLeft: `${indentationPx + 8}px` }}
                    >
                        <span className="truncate block">{item.title}</span>
                    </button>
                );
            } else {
                // Folder item with indentation
                const isExpanded = expandedGroups[item.id];
                return (
                    <div key={item.id} className="space-y-1">
                        <button
                            onClick={() => toggleGroup(item.id)}
                            className={`w-full flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-200 transition-colors ${selectedItem === item.id ? 'bg-gray-200' : ''}`}
                            style={{ paddingLeft: `${indentationPx + 8}px` }}
                        >
                            <span className="font-medium text-sm truncate">
                                {item.title}
                            </span>
                            <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                                isExpanded ? 'rotate-90' : ''
                            }`}/>
                        </button>
                        {isExpanded && item.items && (
                            <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                                {renderItems(item.items, currentDepth)}
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
                        <h1 onClick={() => {
                            navigate('/')
                        }} className="hover:cursor-pointer text-lg font-semibold whitespace-nowrap">Tern Yuka</h1>
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
                                {/* Group Header - No indentation for top level */}
                                <button
                                    onClick={() => toggleGroup(area.id)}
                                    className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-gray-200 transition-colors ${selectedItem === area.id ? 'bg-gray-200' : ''}`}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Icon className="w-5 h-5 flex-shrink-0"/>
                                        <span className="font-medium truncate">
                                            {area.title}
                                        </span>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                                        isExpanded ? 'rotate-90' : ''
                                    }`}/>
                                </button>

                                {/* Group Items */}
                                {isExpanded && (
                                    <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                                        {renderItems(area.items, 0)}
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