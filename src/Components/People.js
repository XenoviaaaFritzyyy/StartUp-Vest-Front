import { useState, useMemo } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, TextField, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';

import Navbar from '../Navbar/Navbar';
const drawerWidth = 240;

function createData(id, name, location, organization, email, avatar) {
  return {
    id,
    name,
    location,
    organization,
    email,
    avatar,
  };
}

const rows = [
  createData(1, 'Hazelyn Balingcasag', 'Ucma Village Apas Cebu City', 'Facebook', 'hazelynbalingcasag@gmail.com'),
  createData(2, 'Rob Borinaga', 'Talamban', '---', 'robborinaga@gmail.com'),
  createData(3, 'Fritz Abrea', 'Luyo CIT', 'Twitter', 'fritzabrea@gmail.com'),
  createData(4, 'Roxanne Alcordo', 'Sa SM Dapit guro', '---', 'roxannealcordo@gmail.com'),
  createData(5, 'Joshua Biong', 'Naug sa emall daw', '---', 'joshuabiong@gmail.com'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Full Name',
  },
  {
    id: 'location',
    numeric: false,
    disablePadding: false,
    label: 'Location',
  },
  {
    id: 'organization',
    numeric: false,
    disablePadding: false,
    label: 'Organization',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email Address',
  },

];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ width: headCell.width, fontWeight: 'bold' }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar({ onRequestSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    onRequestSearch(event.target.value);
  };

  return (
    <Toolbar sx={{ pt: 5, mb: 3 }}>
      <Typography
        sx={{ flex: '1 1 100%', color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}
        variant="h5"
        id="tableTitle"
        component="div">
        Search People
      </Typography>

      <TextField variant="standard"
        placeholder="Search…"
        onChange={handleSearch}
        value={searchText}
        sx={{width: 350 }}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}/>
    </Toolbar>
  );
}

export default function Companies() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (searchText) => {
    const filtered = rows.filter(row =>
      row.name.toLowerCase().includes(searchText.toLowerCase()) ||
      row.location.toLowerCase().includes(searchText.toLowerCase()) ||
      row.organization.toLowerCase().includes(searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, filteredRows],
  );

  return (
    <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px` }}>
      <Navbar />
      <Toolbar />

      <Paper sx={{ width: '100%', p: 3}}>
        <EnhancedTableToolbar onRequestSearch={handleSearch} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium">

            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}/>
              
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer', height: '75px' }}>

                  <TableCell component="th" scope="row" padding="none">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar variant='rounded'sx={{ width: 30, height: 30, mr: 2, border: '2px solid rgba(0, 116, 144, 1)'}}>{row.avatar}</Avatar>
                      {row.name}
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="left">{row.organization}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>

                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows,}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}/>
      </Paper>
    </Box>
  );
}
