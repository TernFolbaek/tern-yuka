import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import FunctionsIcon from '@mui/icons-material/Functions';
import CodeIcon from '@mui/icons-material/Code';
import ScienceIcon from '@mui/icons-material/Science';

// Define interfaces for our components
interface ListItemData {
    name: string;
    icon: React.ReactNode;
    children?: ListItemData[];
}

interface NestedListItemProps {
    item: ListItemData;
    depth?: number;
}

// Recursive component to handle arbitrary nesting
const NestedListItem: React.FC<NestedListItemProps> = ({ item, depth = 0 }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const hasChildren = item.children && item.children.length > 0;

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                sx={{ pl: depth * 4 }}
            >
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {hasChildren && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children!.map((child: ListItemData, index: number) => (
                            <NestedListItem
                                key={`${child.name}-${index}`}
                                item={child}
                                depth={depth + 1}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export default function NestedList(): any {
    // Define your hierarchical data structure
    const listData: ListItemData[] = [
        {
            name: "Programming",
            icon: <CodeIcon />,
            children: [
                {
                    name: "Web Development",
                    icon: <StarBorder />,
                    children: [
                        { name: "Frontend", icon: <StarBorder /> },
                        { name: "Backend", icon: <StarBorder /> }
                    ]
                },
                {
                    name: "Mobile Development",
                    icon: <StarBorder />,
                    children: [
                        { name: "iOS", icon: <StarBorder /> },
                        { name: "Android", icon: <StarBorder /> }
                    ]
                }
            ]
        },
        {
            name: "Mathematics",
            icon: <FunctionsIcon />,
            children: [
                {
                    name: "Algebra",
                    icon: <StarBorder />,
                    children: [
                        { name: "Linear Algebra", icon: <StarBorder /> },
                        { name: "Abstract Algebra", icon: <StarBorder /> }
                    ]
                },
                {
                    name: "Calculus",
                    icon: <StarBorder />,
                    children: [
                        { name: "Differential Calculus", icon: <StarBorder /> },
                        { name: "Integral Calculus", icon: <StarBorder /> }
                    ]
                }
            ]
        },
        {
            name: "Physics",
            icon: <ScienceIcon />,
            children: [
                {
                    name: "Classical Mechanics",
                    icon: <StarBorder />
                },
                {
                    name: "Quantum Physics",
                    icon: <StarBorder />,
                    children: [
                        { name: "Quantum Field Theory", icon: <StarBorder /> },
                        { name: "Quantum Computing", icon: <StarBorder /> }
                    ]
                }
            ]
        }
    ];

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {listData.map((item: ListItemData, index: number) => (
                <NestedListItem key={`${item.name}-${index}`} item={item} />
            ))}
        </List>
    );
}