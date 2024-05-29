import React, { useState, useEffect } from 'react';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, FormControl, Select, MenuItem, TablePagination } from '@mui/material';
import axios from 'axios';

function CapTable() {
    const [capTableData, setCapTableData] = useState([]);
    const [selectedStartupCapTable, setSelectedStartupCapTable] = useState('All');
    const [filteredCapTables, setFilteredCapTables] = useState([]);
    const [capPage, setCapPage] = useState(0);
    const [capRowsPerPage, setCapRowsPerPage] = useState(3);
    const [fundingRounds, setFundingRounds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/funding-rounds/all');
                setFundingRounds(response.data);
            } catch (error) {
                console.error('Error fetching funding rounds:', error);
            }
        };

        fetchData();
    }, []);

    const calculateCapTable = () => {
        const totalSharesMap = new Map();

        fundingRounds.forEach(round => {
            round.capTableInvestors.forEach(investor => {
                const investorId = investor.investor.id;
                const shares = parseFloat(investor.shares);

                if (totalSharesMap.has(investorId)) {
                    totalSharesMap.set(investorId, totalSharesMap.get(investorId) + shares);
                } else {
                    totalSharesMap.set(investorId, shares);
                }
            });
        });

        const totalMoneyRaised = fundingRounds.reduce((acc, round) => acc + parseFloat(round.moneyRaised), 0);

        const capTableData = [];
        totalSharesMap.forEach((shares, investorId) => {
            const percentageOwnership = (shares / totalMoneyRaised) * 100;
            capTableData.push({
                investorId,
                shares,
                percentageOwnership
            });
        });

        setCapTableData(capTableData);
    };

    const filterCapTableData = () => {
        let filteredData = capTableData;
        if (selectedStartupCapTable !== 'All') {
            filteredData = filteredData.filter(item => item.startupId === selectedStartupCapTable);
        }
        setFilteredCapTables(filteredData);
    };

    useEffect(() => {
        calculateCapTable();
    }, [fundingRounds]);

    useEffect(() => {
        filterCapTableData();
    }, [selectedStartupCapTable, capTableData]);

    const handleCapPageChange = (event, newPage) => {
        setCapPage(newPage);
    };

    const handleCapRowsPerPageChange = (event) => {
        setCapRowsPerPage(parseInt(event.target.value, 10));
        setCapPage(0);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, pr: 7, pb: 5, pl: `${drawerWidth}px`, width: '100%', overflowX: 'hidden', backgroundColor: '#D3D3D3' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 3 }}>
                <Typography variant="h4" sx={{ pl: 4, color: 'rgba(0, 116, 144, 1)', fontWeight: 'bold' }}>
                    My Cap Table
                </Typography>
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ pr: 1 }}>Filter by Company:</Typography>
                    <FormControl sx={{ minWidth: 120 }}>
                        <Select value={selectedStartupCapTable} onChange={(e) => setSelectedStartupCapTable(e.target.value)} variant="outlined" sx={{ minWidth: 150 }}>
                            <MenuItem value="All">All</MenuItem>
                            {businessProfiles.filter(profile => profile.type === 'Startup').map((startup) => (
                                <MenuItem key={startup.id} value={startup.id}>{startup.companyName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <TableContainer component={Box} sx={{ backgroundColor: 'white', borderRadius: 2, ml: 3, mt: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: 'rgba(0, 116, 144, 0.1)' }}>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Shareholder's Name</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Title</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Total Share</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Percentage</TableCell>
                            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCapTables.slice(capPage * capRowsPerPage, capPage * capRowsPerPage + capRowsPerPage).map((table) => (
                            <TableRow key={table.investorId}>
                                <TableCell sx={{ textAlign: 'center' }}>Investor Name</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{table.title}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{table.shares}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{table.percentageOwnership.toFixed(2)}%</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }} onClick={handleOpenCapTable}>
                                        View
                                    </Button>
                                    <Button variant="outlined" sx={{ marginLeft: '20px', color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[3]}
                    component="div"
                    count={filteredCapTables.length}
                    rowsPerPage={capRowsPerPage}
                    page={capPage}
                    onPageChange={handleCapPageChange}
                    onRowsPerPageChange={handleCapRowsPerPageChange}
                />
            </TableContainer>
        </Box>
    );
}

export default CapTable;
