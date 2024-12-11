import { useSearchParams } from 'react-router-dom';

import { Button, ButtonGroup } from '@mui/material';

import type { FilterButtonProps } from './filter-button.types';

export const FilterButton: React.FC<FilterButtonProps> = ({
  filterField,
  options,
}: FilterButtonProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0)?.value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      {options.map(({ label, value }) => (
        <Button
          onClick={() => handleClick(value)}
          //   color={value === currentFilter ? 'info' : 'primary'}
          disabled={value === currentFilter}
          key={value}
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
