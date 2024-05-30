import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, FormControl, Autocomplete } from '@mui/material';
import axios from 'axios';

function CreateFundingRound() {
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
    const [currency, setCurrency] = useState('USD'); // added currency state
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
        setInvestors([...investors, { name: null, title: '', shares: '' }]);
    };

    const handleCreateFundingRound = async () => {
        try {

            const selectedInvestors = investors
                .filter(investor => investor.name && investor.name.id !== null)
                .map(investor => ({
                    id: investor.name.id,
                    title: investor.title,
                    shares: parseInt(investor.shares)
                }));

            // Calculate total shares
            const moneyRaised = selectedInvestors.reduce((acc, investor) => acc + investor.shares, 0);
            setMoneyRaised(moneyRaised);
            console.log('Selected Investors:', selectedInvestors);


            const formData = {
                startup: { id: selectedStartupId },
                fundingType,
                announcedDate: `${announcedYear}-${announcedMonth}-${announcedDay}`,
                closedDate: `${closedYear}-${closedMonth}-${closedDay}`,
                moneyRaised,
                moneyRaisedCurrency: currency,
                targetFunding,
                preMoneyValuation,
                investors: selectedInvestors,
                shares: selectedInvestors.map(investor => investor.shares),
                titles: selectedInvestors.map(investor => investor.title)

            };

            const response = await axios.post('http://localhost:3000/funding-rounds/createfund', formData);

            console.log('Investor IDs:', selectedInvestors);
            console.log('Funding round created successfully:', response.data);
        } catch (error) {
            console.error('Failed to create funding round:', error);
        }
    };

    const handleSharesChange = (index, value) => {
        const updatedInvestors = [...investors];
        updatedInvestors[index].shares = value;
        setInvestors(updatedInvestors);
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
                            <label><b>Target Funding</b><br />Amount</label>
                            <TextField
                                fullWidth
                                variant="filled"
                                type='number'
                                value={targetFunding}
                                onChange={(e) => setTargetFunding(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="filled"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
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
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                Add Investors to this Funding Round
            </Typography>

            <Grid container spacing={3} sx={{ ml: 2 }}>
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
                    <Button variant="outlined" sx={{ color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)', '&:hover': { color: 'rgba(0, 116, 144, 0.7)', borderColor: 'rgba(0, 116, 144, 0.7)' } }} onClick={handleAddInvestor}>
                        Add Investor
                    </Button>
                </Grid>
            </Grid>

            <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }} style={{ marginLeft: '76%' }} onClick={handleCreateFundingRound}>
                Edit Funding Round
            </Button>
        </Box>
    );
}

export default CreateFundingRound;
