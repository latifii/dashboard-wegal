import type { AxiosError } from 'axios';
import type { UserInfo } from 'src/types/user.interface';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Alert } from '@mui/material';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useTable } from 'src/hooks/use-table';

import { emptyRows, applyFilter, getComparator } from 'src/utils/utils';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { LinearLoading } from 'src/components/loading';

import { useGetUsers } from '../use-get-users';
import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';

import type { UserProps } from '../user-table.types';

// ----------------------------------------------------------------------

export function UserView() {
  const table = useTable();
  const { data, isLoading, isError } = useGetUsers({
    pageNumber: 1,
    pageSize: 10,
  });
  const [filterName, setFilterName] = useState('');

  const dataFiltered: UserProps[] = applyFilter({
    inputData: _users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  if (isLoading) <LinearLoading />;

  if (isError) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="error">{(isError as unknown as AxiosError)?.message}</Alert>
      </Box>
    );
  }
  const dataUsers = data?.data;
  console.log('data get users:', dataUsers);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          لیست کاربران
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          اضافه کردن کاربر
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'fullName', label: 'نام  و نام خانوداگی' },
                  { id: 'phone', label: 'شماره تلفن' },
                  { id: 'role', label: 'نقش' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'userName', label: 'نام کاربری' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {/* {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))} */}

                {dataUsers?.map((dataUser: UserInfo) => (
                  <UserTableRow
                    key={dataUser.id}
                    row={dataUser}
                    selected={table.selected.includes(dataUser.id)}
                    onSelectRow={() => table.onSelectRow(dataUser.id)}
                  />
                ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------
