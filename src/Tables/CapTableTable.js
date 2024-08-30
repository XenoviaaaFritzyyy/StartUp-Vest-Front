import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Typography, FormControl, Select, MenuItem } from '@mui/material';

function CapTable({
  filteredCapTables = [],
  capRowsPerPage = 5,
  capPage = 0,
  businessProfiles = [],
  selectedStartupCapTable,
  handleStartupChangeCapTable,
}) {
  // Local state for pagination
  const [localCapPage, setLocalCapPage] = useState(capPage);
  const [localCapRowsPerPage, setLocalCapRowsPerPage] = useState(capRowsPerPage);

  // State to manage local filter value
  const [filterValue, setFilterValue] = useState(selectedStartupCapTable);

  useEffect(() => {
    setFilterValue(selectedStartupCapTable);
  }, [selectedStartupCapTable]);

  // Handler for filter change
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    handleStartupChangeCapTable(event);
  };

  // Handle page change
  const handleCapPageChange = (event, newPage) => {
    setLocalCapPage(newPage);
  };

  // Handle rows per page change
  const handleCapRowsPerPageChange = (event) => {
    setLocalCapRowsPerPage(parseInt(event.target.value, 10));
    setLocalCapPage(0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ pr: 1 }}>By Company:</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <Select 
            value={filterValue} 
            onChange={handleFilterChange} 
            variant="outlined" 
            sx={{ minWidth: 150, height: '45px' }}>
            <MenuItem value="All">All</MenuItem>
            {businessProfiles.filter(profile => profile.type === 'Startup').map((startup) => (
              <MenuItem key={startup.id} value={startup.id}>{startup.companyName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer sx={{borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
        <Table>
          <TableHead sx={{ backgroundColor: '#007490' }}>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#F2F2F2' }}>Shareholder's Name</Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#F2F2F2' }}>Title</Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#F2F2F2' }}>Total Share</Typography>
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#F2F2F2' }}>Percentage</Typography>
              </TableCell>  
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCapTables.slice(
              localCapPage * localCapRowsPerPage,
              localCapPage * localCapRowsPerPage + localCapRowsPerPage
            ).map((table) => (
              <TableRow key={table.id}>
                <TableCell sx={{ textAlign: 'center' }}>{table.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{table.title}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{table.totalShares}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{table.percentage.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={filteredCapTables.length}
          rowsPerPage={localCapRowsPerPage}
          page={localCapPage}
          onPageChange={handleCapPageChange}
          onRowsPerPageChange={handleCapRowsPerPageChange}
        />
      </TableContainer>
    </Box>
  );
}

export default CapTable;
