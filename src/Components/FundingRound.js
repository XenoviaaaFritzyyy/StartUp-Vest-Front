import { useState, useEffect, useMemo } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, TextField, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import Navbar from '../Navbar/Navbar';

const drawerWidth = 240;

function createData(id, transactionName, startupName, fundingType, moneyRaised, 
  moneyRaisedCurrency, announcedDate, closedDate, avatar, preMoneyValuation, capTableInvestors ) {
  return {
    id,
    transactionName,
    startupName,
    fundingType,
    moneyRaised,
    moneyRaisedCurrency,
    announcedDate,
    closedDate,
    avatar,
    preMoneyValuation,
    capTableInvestors
  };
}

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
    id: 'startupName',
    numeric: false,
    disablePadding: false,
    label: 'StartUp Name',
    width: '20%',
  },
  {
    id: 'fundingType',
    numeric: false,
    disablePadding: false,
    label: 'Funding Type',
    width: '20%',
  },
  {
    id: 'moneyRaised',
    numeric: true,
    disablePadding: false,
    label: 'Money Raised',
    width: '20%',
  },
  {
    id: 'announcedDate',
    numeric: false,
    disablePadding: false,
    label: 'Announced Date',
    width: '20%',
  },
  {
    id: 'closedDate',
    numeric: false,
    disablePadding: true,
    label: 'Closed Date',
    width: '20%',
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
            style={{ width: headCell.width, fontWeight: 'bold', backgroundColor: '#007490', color: '#ffffff',  }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{ color: '#ffffff' }}>
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
        Search Funding Round
      </Typography>

      <TextField variant="standard"
        placeholder="Search…"
        onChange={handleSearch}
        value={searchText}
        sx={{ width: 350 }}
        InputProps={{
          startAdornment: <SearchIcon />,
        }} />
    </Toolbar>
  );
}

export default function FundingRound() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('transactionName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFundingRounds = async () => {
      try {
        const response = await axios.get('http://localhost:3000/funding-rounds/all');
        const fetchedRows = response.data.map(fundingRound => createData(
          fundingRound.id,
          fundingRound.transactionName,
          fundingRound.startup?.companyName ?? 'N/A',
          fundingRound.fundingType,
          fundingRound.moneyRaised || '---',
          fundingRound.moneyRaisedCurrency || 'USD',
          new Date(fundingRound.announcedDate).toLocaleDateString(),
          new Date(fundingRound.closedDate).toLocaleDateString(),
          fundingRound.avatar || '',
          fundingRound.preMoneyValuation || 'N/A',
          fundingRound.capTableInvestors // Pass capTableInvestors details
        ));
        setRows(fetchedRows);
        setFilteredRows(fetchedRows);
      } catch (error) {
        console.error('Error fetching funding rounds:', error);
      }
    };

    fetchFundingRounds();
  }, []);

  const handleRowClick = (fundinground) => {
    navigate(`/fundingroundview`, { state: { fundinground } });
  };  

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
      (row.startupName.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (row.fundingType?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (row.moneyRaised?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (row.announcedDate?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (row.preMoneyValuation?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (row.moneyRaisedCurrency?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
      (row.closedDate?.toLowerCase() || '').includes(searchText.toLowerCase())
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

      <Paper sx={{ width: '100%', p: 3 }} elevation={0}>
        <EnhancedTableToolbar onRequestSearch={handleSearch} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium">

            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort} />
              <TableBody>
                {visibleRows.map((row, index) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer', height: '75px' }}
                    onClick={() => handleRowClick(row)} 
                  >
                    <TableCell component="th" scope="row" padding="none">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar variant='rounded' sx={{ width: 30, height: 30, mr: 2, ml: 2, border: '2px solid rgba(0, 116, 144, 1)' }}>{row.avatar}</Avatar>
                        {row.startupName}
                      </Box>
                    </TableCell>
                    <TableCell align="left">{row.fundingType}</TableCell>
                    <TableCell align="left">{row.moneyRaisedCurrency} {row.moneyRaised}</TableCell>
                    <TableCell align="left">{row.announcedDate}</TableCell>
                    <TableCell align="left">{row.closedDate}</TableCell>

                    {/* Render capTableInvestors details
                    {row.capTableInvestors && row.capTableInvestors.map((investor, idx) => (
                      <TableRow key={idx}>
                        <TableCell colSpan={6}>
                          <Typography variant="subtitle2">Investor: {investor.investor.firstName} {investor.investor.lastName}</Typography>
                          <Typography variant="body2">Title: {investor.title}, Shares: {investor.shares}</Typography>
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
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