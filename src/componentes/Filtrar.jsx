import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterPanel({ onFilterClick }) {
  return (
    <Tooltip title="Filtrar dados">
      <IconButton onClick={onFilterClick}>
        <FilterListIcon />
      </IconButton>
    </Tooltip>
  );
}
