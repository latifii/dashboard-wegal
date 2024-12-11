import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { FilterButton } from 'src/components/filter-button/filter-button';

import type { UserTableInfoToolbarProps } from './user.types';

// ----------------------------------------------------------------------

export function UserTableToolbar({ filterName, onFilterName }: UserTableInfoToolbarProps) {
  return (
    <Toolbar
      sx={{
        height: 80,
        display: 'flex',
        justifyContent: 'flex-start',
        gap: 4,
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      <OutlinedInput
        fullWidth
        size="small"
        value={filterName}
        onChange={onFilterName}
        placeholder="جستجو کاربر"
        startAdornment={
          <InputAdornment position="start">
            <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
        sx={{ maxWidth: 320 }}
      />

      <FilterButton
        filterField="role"
        options={[
          { value: 'all', label: 'همه کاربران' },
          { value: 'vegalAdmin', label: 'ادمین' },
          { value: 'vendor', label: 'نمایندگی' },
        ]}
      />
    </Toolbar>
  );
}
