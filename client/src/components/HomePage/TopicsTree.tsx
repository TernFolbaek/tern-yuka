import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function BasicSimpleTreeView() {
    return (
        <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <SimpleTreeView>
             <TreeItem itemId="Maths" label="Maths">
                 <TreeItem itemId="Calculus" label="Maths">

                 </TreeItem>
                 <TreeItem itemId="LinearAlgebra" label="Linear Algebra">

                 </TreeItem>

             </TreeItem>
            <TreeItem itemId="Programming" label="Programming">

            </TreeItem>
            <TreeItem itemId="Physics" label="Physics">

            </TreeItem>
            <TreeItem itemId="Philosophy" label="Philosophy">

            </TreeItem>
            </SimpleTreeView>
        </Box>
    );
}
