import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, FormControl, Autocomplete } from '@mui/material';
import axios from 'axios';

function ViewFundingRound({ fundingRoundDetails }) {
    const [startups, setStartups] = useState([]);
    const [selectedStartupId, setSelectedStartupId] = useState('');
    const [fundingType, setFundingType] = useState('');
    const [announcedMonth, setAnnouncedMonth] = useState('');
    const [announcedDay, setAnnouncedDay] = useState('');
    const [announcedYear, setAnnouncedYear] = useState('');
    const [closedMonth, setClosedMonth] = useState('');
    const [closedDay, setClosedDay] = useState('');
    const [closedYear, setClosedYear] = useState('');
    const [moneyRaised, setMoneyRaised] = useState(0);
    const [currency, setCurrency] = useState(''); // added currency state
    const [targetFunding, setTargetFunding] = useState('');
    const [preMoneyValuation, setPreMoneyValuation] = useState('');

    //CAP TABLE
    const [totalShares, setTotalShares] = useState(0);
    const [allInvestors, setAllInvestors] = useState([]); // to store all fetched investors
    const [investors, setInvestors] = useState([{ name: null, title: '', shares: '' }]);
    // to store selected investors

    const days = [...Array(31).keys()].map(i => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i, 1));
    });
    const years = [...Array(51).keys()].map(i => new Date().getFullYear() - i);

    const announcedDate = new Date(fundingRoundDetails?.announcedDate);
    const closedDate = new Date(fundingRoundDetails?.closedDate);

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        console.log('Received Funding Round Details:', fundingRoundDetails); // Check the received data
    }, [fundingRoundDetails]);

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
                const response = await axios.get('http://localhost:3000/investors/All', {
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
        console.log(allInvestors)
    }, []);

    const handleInvestorChange = (index, field, value) => {
        const updatedInvestors = [...investors];
        updatedInvestors[index][field] = value;
        setInvestors(updatedInvestors);
    };


    const handleAddInvestor = () => {
        // Add a new investor object with empty fields to the investors array
        setInvestors([...investors, { name: '', title: '', shares: '' }]);
    };
    

    // Initialize the investors state with existing investors
    useEffect(() => {
        if (fundingRoundDetails) {
            setSelectedStartupId(fundingRoundDetails.startup.id);
            setFundingType(fundingRoundDetails.fundingType);
            setTargetFunding(fundingRoundDetails.targetFunding);
            setPreMoneyValuation(fundingRoundDetails.preMoneyValuation);
            setCurrency(fundingRoundDetails.moneyRaisedCurrency);
            setMoneyRaised(fundingRoundDetails.moneyRaised);

            const announcedDate = new Date(fundingRoundDetails.announcedDate);
            setAnnouncedDay(announcedDate.getDate());
            setAnnouncedMonth(announcedDate.getMonth() + 1); // getMonth() is zero-based
            setAnnouncedYear(announcedDate.getFullYear());
    
            // Initialize closedDate state variables
            const closedDate = new Date(fundingRoundDetails.closedDate);
            setClosedDay(closedDate.getDate());
            setClosedMonth(closedDate.getMonth() + 1); // getMonth() is zero-based
            setClosedYear(closedDate.getFullYear());
            // ... Set other state variables similarly
        }

        if (fundingRoundDetails?.capTableInvestors) {
            const existingInvestors = fundingRoundDetails.capTableInvestors.map(investor => ({
                name: investor.investor.id, // Assuming this is the investor ID
                title: investor.title,
                shares: investor.shares
            }));
            setInvestors(existingInvestors);
        }
    }, [fundingRoundDetails]);

    const handleUpdateFundingRound = async () => {
        try {
            const updatedInvestors = investors.map(investor => ({
                id: investor.name, // Assuming this is the investor ID
                title: investor.title,
                shares: parseInt(investor.shares)
            }));
    
            const updatePayload = {
                updateData: {
                    startup: { id: selectedStartupId },
                    fundingType,
                    announcedDate: `${announcedYear}-${String(announcedMonth).padStart(2, '0')}-${String(announcedDay).padStart(2, '0')}`,
                    closedDate: `${closedYear}-${String(closedMonth).padStart(2, '0')}-${String(closedDay).padStart(2, '0')}`,
                    moneyRaised,
                    moneyRaisedCurrency: currency,
                    targetFunding,
                    preMoneyValuation,
                },
                investors: updatedInvestors
            };
    
            const response = await axios.put(`http://localhost:3000/funding-rounds/${fundingRoundDetails.id}`, updatePayload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            console.log('Funding round updated successfully:', response.data);
            // Optionally, update the state or re-fetch the funding round details to reflect changes
        } catch (error) {
            console.error('Failed to update funding round:', error);
            // Handle the error, possibly by setting an error state and displaying a message to the user
        }
        // After updating, toggle edit mode off
        setIsEditMode(false);
    };
    

    const handleSharesChange = (index, value) => {
        const updatedInvestors = [...investors];
        updatedInvestors[index].shares = value;
        setInvestors(updatedInvestors);
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden', maxWidth: '1000px', background: '#F2F2F2' }}>
            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                Organization
            </Typography>

            <Grid container spacing={3} sx={{ ml: 2 }}>
                <Grid item xs={12} sm={11}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <label>StartUp Name</label>    
                        <FormControl fullWidth variant="outlined">
                            <Select
                                fullWidth
                                variant="outlined"
                                value={fundingRoundDetails ? fundingRoundDetails.startup.id : selectedStartupId}
                                onChange={(e) => setSelectedStartupId(e.target.value)}
                                disabled={!!fundingRoundDetails}
                                sx={{ height: '45px' }}>
                                {startups.map((startup) => (
                                    <MenuItem key={startup.id} value={startup.id}>{startup.companyName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 1 }}>
                Funding Round Details
            </Typography>

            <Grid container spacing={3} sx={{ ml: 2 }}>
                <Grid item xs={12} sm={11}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <label>Funding Type</label> 
                            <FormControl fullWidth variant="outlined">
                                <Select fullWidth variant="outlined" value={fundingType} onChange={(e) => setFundingType(e.target.value)} disabled={!!fundingRoundDetails} sx={{ height: '45px' }}>
                                    <MenuItem value={'Pre-Seed'}>Pre-Seed</MenuItem>
                                    <MenuItem value={'Seed'}>Seed</MenuItem>
                                    <MenuItem value={'Series A'}>Series A</MenuItem>
                                    <MenuItem value={'Series B'}>Series B</MenuItem>
                                    <MenuItem value={'Series C'}>Series C</MenuItem>
                                    <MenuItem value={'Series D'}>Series D</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><b>Announced Date</b><br />Month</label>
                            <FormControl fullWidth variant="outlined">
                                <Select labelId="month-label" value={announcedMonth} onChange={(e) => setAnnouncedMonth(e.target.value)} disabled={!isEditMode} sx={{ height: '45px' }}>
                                    {months.map((month, index) => (
                                        <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Day</label>
                            <FormControl fullWidth variant="outlined">
                                <Select labelId="day-label" value={announcedDay} onChange={(e) => setAnnouncedDay(e.target.value)} disabled={!isEditMode} sx={{ height: '45px' }}>
                                    {days.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Year</label>
                            <FormControl fullWidth variant="outlined">
                                <Select labelId="year-label" value={announcedYear} onChange={(e) => setAnnouncedYear(e.target.value)} disabled={!isEditMode} sx={{ height: '45px' }}>
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><b>Closed on Date</b><br />Month</label>
                            <FormControl fullWidth variant="outlined">
                                <Select labelId="month-label" value={closedMonth} onChange={(e) => setClosedMonth(e.target.value)} disabled={!isEditMode} sx={{ height: '45px' }}>
                                    {months.map((month, index) => (
                                        <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Day</label>
                            <FormControl fullWidth variant="outlined">
                                <Select labelId="day-label" value={closedDay} onChange={(e) => setClosedDay(e.target.value)} disabled={!isEditMode} sx={{ height: '45px' }}>
                                    {days.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Year</label>
                            <FormControl fullWidth variant="outlined">
                                <Select labelId="year-label" value={closedYear} onChange={(e) => setClosedYear(e.target.value)} disabled={!isEditMode} sx={{ height: '45px' }}>
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8}>
                            <label><b>Money Raised</b><br />Amount</label>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type='number'
                                value={moneyRaised}
                                onChange={(e) => setMoneyRaised(e.target.value)}
                                disabled
                                sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }} 
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="outlined"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                disabled
                                sx={{ height: '45px' }}>
                                <MenuItem value="PESO">PESO</MenuItem>                                    
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={8}>
                            <label><b>Target Funding</b><br />Amount</label>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type='number'
                                value={targetFunding}
                                onChange={(e) => setTargetFunding(e.target.value)}
                                disabled={!isEditMode}
                                sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }} 
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="outlined"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                disabled={!isEditMode}
                                sx={{ height: '45px' }}>
                                <MenuItem value="PESO">PESO</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <label>Pre-Money Valuation</label>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type='number'
                                value={preMoneyValuation}
                                onChange={(e) => setPreMoneyValuation(e.target.value)}
                                disabled={!isEditMode}
                                sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                Investors to this Funding Round
            </Typography>

            <Grid container spacing={3} sx={{ ml: 2 }}>
                {investors.map((investor, index) => (
                    <Grid item xs={12} sm={11} key={index}>
                        <Grid container spacing={2}>
                            
                            <Grid item xs={4}>
                                <label>Shareholder Name</label>
                                <FormControl fullWidth variant="outlined">
                                    <Select
                                        sx={{ height: '45px'}}
                                        displayEmpty
                                        value={investor.name}
                                        onChange={(event) => handleInvestorChange(index, 'name', event.target.value)}
                                        disabled={!isEditMode}
                                        renderValue={selected => {
                                            if (selected === '') {
                                                return <em>Shareholder's Name</em>;
                                            }
                                            const selectedInvestor = allInvestors.find(inv => inv.id === selected);
                                            return selectedInvestor ? `${selectedInvestor.firstName} ${selectedInvestor.lastName}` : <em>Shareholder's Name</em>;
                                        }}>
                                        {allInvestors.map((inv) => (
                                            <MenuItem key={inv.id} value={inv.id}>{inv.firstName} {inv.lastName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={4}>
                                <label>Title</label>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={investor.title}
                                    onChange={(e) => handleInvestorChange(index, 'title', e.target.value)}
                                    disabled={!isEditMode}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }} 
                                />
                            </Grid>
                            
                            <Grid item xs={4}>
                                <label>Shares</label>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={investor.shares}
                                    onChange={(e) => handleSharesChange(index, e.target.value)}
                                    disabled={!isEditMode}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }} 
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12} sm={11}>
                    <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)', '&:hover': { color: 'rgba(0, 116, 144, 0.7)', borderColor: 'rgba(0, 116, 144, 0.7)' } }} onClick={handleAddInvestor} disabled={!isEditMode}>
                        Add Investor
                    </Button>
                </Grid>
            </Grid>

            <Button
                variant="contained"
                sx={{ width: 150, background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }} style={{marginLeft: '80%'}}
                onClick={isEditMode ? handleUpdateFundingRound : toggleEditMode}
            >
                {isEditMode ? 'Save Changes' : 'Edit Funding'}
            </Button>
        </Box>
    );
}

export default ViewFundingRound;
