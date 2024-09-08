import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';




export const PaginationControlled = ({page, count, onDismiss}) => {
    const handleChange = (event, value) => {
        onDismiss(value)
    };

    return (
        <Stack spacing={2}>
            <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
    );
}
