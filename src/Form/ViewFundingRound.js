import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, FormControl, Autocomplete } from '@mui/material';
import axios from 'axios';

function ViewFundingRound() {
    const [startups, setStartups] = useState([]);
    const [selectedStartupId, setSelectedStartupId] = useState('');
    const [fundingType, setFundingType] = useState('');
    const [announcedMonth, setAnnouncedMonth] = useState('');
    const [announcedDay, setAnnouncedDay] = useState('');
    const [announcedYear, setAnnouncedYear] = useState('');
    const [closedMonth, setClosedMonth] = useState('');
    const [closedDay, setClosedDay] = useState('');
    const [closedYear, setClosedYear] = useState('');
    const [moneyRaised, setMoneyRaised] = useState('');
    const [currency, setCurrency] = useState('USD'); // added currency state
    const [targetFunding, setTargetFunding] = useState('');
    const [preMoneyValuation, setPreMoneyValuation] = useState('');
    const [allInvestors, setAllInvestors] = useState([]); // to store all fetched investors
    const [selectedInvestors, setSelectedInvestors] = useState([]); // to store selected investors
    const [editMode, setEditMode] = useState(false); // to toggle edit mode

    const days = [...Array(31).keys()].map(i => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i, 1));
    });
    const years = [...Array(51).keys()].map(i => new Date().getFullYear() - i);

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

        const fetchFundingRound = async (id) => {
            try {
                const response = await axios.get(`http://localhost:3000/funding-rounds/${id}`, {
                });
                const data = response.data;
                setSelectedStartupId(data.startup.id);
                setFundingType(data.fundingType);
                const [annYear, annMonth, annDay] = data.announcedDate.split('-');
                setAnnouncedYear(annYear);
                setAnnouncedMonth(parseInt(annMonth, 10));
                setAnnouncedDay(parseInt(annDay, 10));
                const [cloYear, cloMonth, cloDay] = data.closedDate.split('-');
                setClosedYear(cloYear);
                setClosedMonth(parseInt(cloMonth, 10));
                setClosedDay(parseInt(cloDay, 10));
                setMoneyRaised(data.moneyRaised);
                setCurrency(data.moneyRaisedCurrency); // set currency
                setTargetFunding(data.targetFunding);
                setPreMoneyValuation(data.preMoneyValuation);
                setSelectedInvestors(data.investors);
            } catch (error) {
                console.error('Error fetching funding round:', error);
            }
        };

        fetchStartups();
        fetchInvestors();
        fetchFundingRound(1); // Fetch data for funding round with ID 1 for demonstration
    }, []);

    const handleInvestorChange = (index, newValue) => {
        const updatedInvestors = [...selectedInvestors];
        updatedInvestors[index] = newValue;
        setSelectedInvestors(updatedInvestors);
    };

    const handleAddInvestor = () => {
        setSelectedInvestors([...selectedInvestors, null]);
    };

    const handleSaveFundingRound = async () => {
        const updatedFundingRound = {
            startup: { id: selectedStartupId },
            fundingType,
            announcedDate: `${announcedYear}-${announcedMonth}-${announcedDay}`,
            closedDate: `${closedYear}-${closedMonth}-${closedDay}`,
            moneyRaised,
            moneyRaisedCurrency: currency, // added currency
            targetFunding,
            preMoneyValuation,
            investors: selectedInvestors.map(investor => ({ id: investor.id })),
        };

        try {
            await axios.put(`http://localhost:3000/funding-rounds/1`, updatedFundingRound, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEditMode(false);
        } catch (error) {
            console.error('Error saving funding round:', error);
        }
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
                            <FormControl fullWidth variant="filled">
                                <Select fullWidth variant="filled" value={selectedStartupId} onChange={(e) => setSelectedStartupId(e.target.value)}>
                                    {startups.map((startup) => (
                                        <MenuItem key={startup.id} value={startup.id}>{startup.companyName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                Add Funding Round Details
            </Typography>

            <Grid container spacing={3} sx={{ ml: 2 }}>
                <Grid item xs={12} sm={11}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <label>Funding Type</label>
                            <FormControl fullWidth variant="filled">
                                <Select fullWidth variant="filled" value={fundingType} onChange={(e) => setFundingType(e.target.value)}>
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
                            <FormControl fullWidth variant="filled">
                                <Select labelId="month-label" value={announcedMonth} onChange={(e) => setAnnouncedMonth(e.target.value)}>
                                    {months.map((month, index) => (
                                        <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Day</label>
                            <FormControl fullWidth variant="filled">
                                <Select labelId="day-label" value={announcedDay} onChange={(e) => setAnnouncedDay(e.target.value)}>
                                    {days.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Year</label>
                            <FormControl fullWidth variant="filled">
                                <Select labelId="year-label" value={announcedYear} onChange={(e) => setAnnouncedYear(e.target.value)}>
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><b>Closed on Date</b><br />Month</label>
                            <FormControl fullWidth variant="filled">
                                <Select labelId="month-label" value={closedMonth} onChange={(e) => setClosedMonth(e.target.value)}>
                                    {months.map((month, index) => (
                                        <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Day</label>
                            <FormControl fullWidth variant="filled">
                                <Select labelId="day-label" value={closedDay} onChange={(e) => setClosedDay(e.target.value)}>
                                    {days.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Year</label>
                            <FormControl fullWidth variant="filled">
                                <Select labelId="year-label" value={closedYear} onChange={(e) => setClosedYear(e.target.value)}>
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
                                variant="filled"
                                type='number'
                                value={moneyRaised}
                                onChange={(e) => setMoneyRaised(e.target.value)}
                                disabled={!editMode}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="filled"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                disabled={!editMode}
                            >
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                                <MenuItem value="PESO">PESO</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={8}>
                            <label><b>Target Funding</b><br />Amount</label>
                            <TextField
                                fullWidth
                                variant="filled"
                                type='number'
                                value={targetFunding}
                                onChange={(e) => setTargetFunding(e.target.value)}
                                disabled={!editMode}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="filled"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                disabled={!editMode}
                            >
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                                <MenuItem value="PESO">PESO</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <label>Pre-Money Valuation</label>
                            <TextField
                                fullWidth
                                variant="filled"
                                type='number'
                                value={preMoneyValuation}
                                onChange={(e) => setPreMoneyValuation(e.target.value)}
                                disabled={!editMode}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                Add Investors to this Funding Round
            </Typography>

            <Grid container spacing={3} sx={{ ml: 2 }}>
                {selectedInvestors.map((investor, index) => (
                    <Grid item xs={12} sm={11} key={index}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label>Investor {index + 1}</label>
                                <Autocomplete
                                    options={allInvestors}
                                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                                    value={investor}
                                    onChange={(event, newValue) => handleInvestorChange(index, newValue)}
                                    renderInput={(params) => <TextField {...params} variant="filled" />}
                                    disabled={!editMode}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12} sm={11}>
                    <Button 
                        variant="outlined" 
                        sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)', '&:hover': { color: 'rgba(0, 116, 144, 0.7)', borderColor: 'rgba(0, 116, 144, 0.7)' }}} 
                        onClick={handleAddInvestor}
                        disabled={!editMode}
                    >
                        Add Investor
                    </Button>
                </Grid>
            </Grid>

            <Button 
                variant="contained" 
                sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}}
                style={{ marginLeft: '74%' }} 
                onClick={editMode ? handleSaveFundingRound : () => setEditMode(true)}
            >
                {editMode ? 'Save Funding Round' : 'Edit Funding Round'}
            </Button>
        </Box>
    );
}

export default ViewFundingRound;
