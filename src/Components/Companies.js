import {useState, useMemo} from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import SortIcon from '@mui/icons-material/Sort';
import { visuallyHidden } from '@mui/utils';

import Navbar from '../Navbar/Navbar';
const drawerWidth = 240;

function createData(id, startup, owner, industry, location, description) {
  return {
    id,
    startup,
    owner,
    industry,
    location,
    description,
  };
}

const rows = [
  createData(1, 'Balingcasag', 'Hazelyn Balingcasag', 'Technology', 'Apas, Cebu City', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
  createData(2, 'Borinaga', 'Rob Borinaga', 'Technology', 'Apas, Cebu City', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
  createData(3, 'Abrea', 'Fritz Abrea', 'Technology', 'Apas, Cebu City', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
  createData(4, 'Biong', 'Joshua Biong', 'Technology', 'Apas, Cebu City', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
  createData(5, 'Alcordo', 'Roxanne Alcordo', 'Technology', 'Apas, Cebu City', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
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
    id: 'startup',
    numeric: false,
    disablePadding: true,
    label: 'StartUp Name',
  },
  {
    id: 'owner',
    numeric: false,
    disablePadding: false,
    label: 'StartUp Owner',
  },
  {
    id: 'industry',
    numeric: false,
    disablePadding: false,
    label: 'Industry',
  },
  {
    id: 'location',
    numeric: false,
    disablePadding: false,
    label: 'Location',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
    width: '45%',
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
            style={{ width: headCell.width }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
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

function EnhancedTableToolbar() {
  return (
    <Toolbar sx={{ pt: 3, mb: 3 }}>
      <Typography
        sx={{ flex: '1 1 100%', color: '#009688', fontWeight: 'bold' }}
        variant="h5"
        id="tableTitle"
        component="div">
        Search Companies
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <SortIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function Companies() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );

  return (
    <Box sx={{ width: '100%', paddingLeft: `${drawerWidth}px` }}>
      <Navbar />
      <Toolbar />

      <Paper sx={{ width: '100%', mb: 2, pl: 5, pr: 5 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: 'pointer' }}>
                    
                  <TableCell component="th" scope="row" padding="none">{row.startup}</TableCell>
                  <TableCell align="left">{row.owner}</TableCell>
                  <TableCell align="left">{row.industry}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
