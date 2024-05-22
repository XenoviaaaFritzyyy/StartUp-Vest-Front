import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, FormControl, Autocomplete } from '@mui/material';

function CreateCapTable() {
    const [title, setTitle] = useState('');
    const [totalShares, setTotalShares] = useState('');
    const [investors, setInvestors] = useState([{ name: null, title: '', shares: '' }]);
    const [allInvestors, setAllInvestors] = useState([]);
    const [selectedStartupId, setSelectedStartupId] = useState('');
    const [startups, setStartups] = useState([]);

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await axios.get('http://localhost:3000/startups', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setStartups(response.data);
            } catch (error) {
                console.error('Error fetching startups:', error);
            }
        };

        const fetchInvestors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/investors/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setAllInvestors(response.data);
            } catch (error) {
                console.error('Error fetching investors:', error);
            }
        };

        fetchStartups();
        fetchInvestors();
    }, []);

    const handleCreateCapTable = async () => {
        try {
            // Filter selected investors with valid data and map them to the required format
            const selectedInvestors = investors
                .filter(investor => investor.name && investor.name.id !== null)
                .map(investor => ({
                    id: investor.name.id,
                    title: investor.title,
                    shares: parseInt(investor.shares)
                }));
    
            // Calculate total shares
            const totalShares = selectedInvestors.reduce((acc, investor) => acc + investor.shares, 0);
    
            // Construct formData object
            const formData = {
                title: "Example Cap Table", // Hardcoded as per the provided payload
                totalShares,
                startup: { id: selectedStartupId }, // Hardcoded as per the provided payload
                investors: selectedInvestors,
                shares: selectedInvestors.map(investor => investor.shares),
                titles: selectedInvestors.map(investor => investor.title) // Extract titles from selected investors
            };
    
            // Send POST request to the backend
            const response = await axios.post('http://localhost:3000/cap-table/createcap', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            console.log('Cap Table created successfully:', response.data);
        } catch (error) {
            console.error('Failed to create cap table:', error);
        }
    };
    

    const handleAddInvestor = () => {
        setInvestors([...investors, { name: null, title: '', shares: '' }]);
    };

    const handleInvestorChange = (index, field, value) => {
        const updatedInvestors = [...investors];
        updatedInvestors[index][field] = value;
        setInvestors(updatedInvestors);
    };

    const handleSharesChange = (index, value) => {
        const updatedInvestors = [...investors];
        updatedInvestors[index].shares = value;
        setInvestors(updatedInvestors);

        const totalShares = updatedInvestors.reduce((acc, investor) => acc + (parseInt(investor.shares) || 0), 0);
        setTotalShares(totalShares);
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden', maxWidth: '1000px', background: '#F2F2F2', p: 3 }}>
            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 2, pt: 2, pb: 2 }}>
                Create Cap Table
            </Typography>

            <Grid container spacing={3} sx={{ ml: 2 }}>
                <Grid item xs={12} sm={11}>
                    <FormControl fullWidth variant="filled">
                        <label>StartUp Name</label>
                        <Select value={selectedStartupId} onChange={(e) => setSelectedStartupId(e.target.value)}>
                            {startups.map((startup) => (
                                <MenuItem key={startup.id} value={startup.id}>
                                    {startup.companyName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {investors.map((investor, index) => (
                    <Grid item xs={12} sm={11} key={index}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <label>Shareholder's Name</label>
                                <Autocomplete
                                    options={allInvestors}
                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                    value={investor.name ? allInvestors.find((option) => option.id === investor.name.id) : null}
                                    onChange={(event, newValue) => handleInvestorChange(index, 'name', newValue)}
                                    renderInput={(params) => <TextField {...params} variant="filled" />}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <label>Title</label>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    value={investor.title}
                                    onChange={(e) => handleInvestorChange(index, 'title', e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <label>Shares</label>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    value={investor.shares}
                                    onChange={(e) => handleSharesChange(index, e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                ))}

                <Grid item xs={12} sm={11}>
                    <Button
                        variant="contained"
                        onClick={handleAddInvestor}
                        sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }}
                    >
                        Add Investor
                    </Button>
                </Grid>
            

            <Grid item xs={1} sm={2.5}>
            <Button
                variant="outlined"
                sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { backgroundColor: 'rgba(0, 116, 144, 0.8)' }, color: '#fff', mt: 0, ml:87 }}
                fullWidth
                onClick={handleCreateCapTable}
            >
                Create Cap Table
            </Button>
            </Grid>
        </Grid>
        </Box>
    );
}

export default CreateCapTable;
