import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, FormControl, FormHelperText, Autocomplete } from '@mui/material';
import axios from 'axios';

import SuccessCreateFundingRoundDialog from '../Dialogs/SuccessCreateFundingRoundDialog';

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
    const [currency, setCurrency] = useState('PESO'); 
    const [targetFunding, setTargetFunding] = useState('');
    const [preMoneyValuation, setPreMoneyValuation] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    // CAP TABLE
    const [allInvestors, setAllInvestors] = useState([]);
    const [investors, setInvestors] = useState([{ name: null, title: '', shares: '' }]);
    const [errors, setErrors] = useState({});

    const days = [...Array(31).keys()].map(i => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i, 1));
    });
    const years = [...Array(51).keys()].map(i => new Date().getFullYear() + i);

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
    }, []);

    const handleInvestorChange = (index, field, value) => {
        const updatedInvestors = [...investors];
        updatedInvestors[index][field] = value;
        setInvestors(updatedInvestors);
    };

    const handleAddInvestor = () => {
        setInvestors([...investors, { name: null, title: '', shares: '' }]);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedStartupId) newErrors.selectedStartupId = 'Startup is required.';
        if (!fundingType) newErrors.fundingType = 'Funding Type is required.';
        if (!announcedMonth || !announcedDay || !announcedYear) newErrors.announcedDate = 'Announced Date is required.';
        if (!closedMonth || !closedDay || !closedYear) newErrors.closedDate = 'Closed Date is required.';
        if (!targetFunding) newErrors.targetFunding = 'Target Funding Amount is required.';
        if (!preMoneyValuation) newErrors.preMoneyValuation = 'Pre-Money Valuation is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateFundingRound = async () => {
        if (!validateForm()) return;

        try {
            const selectedInvestors = investors
                .filter(investor => investor.name && investor.name.id !== null)
                .map(investor => ({
                    id: investor.name.id,
                    title: investor.title,
                    shares: parseInt(investor.shares, 10)
                }));

            const moneyRaised = selectedInvestors.reduce((acc, investor) => acc + investor.shares, 0);
            setMoneyRaised(moneyRaised);

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
            setSuccessDialogOpen(true);
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
                            <label><b>StartUp Name</b></label>
                            <FormControl fullWidth variant="outlined" error={!!errors.selectedStartupId}>
                                <Select fullWidth variant="outlined" value={selectedStartupId} onChange={(e) => setSelectedStartupId(e.target.value)} sx={{ height: '45px' }}>
                                    {startups.map((startup) => (
                                        <MenuItem key={startup.id} value={startup.id}>{startup.companyName}</MenuItem>
                                    ))}
                                </Select>
                                {errors.selectedStartupId && <FormHelperText>{errors.selectedStartupId}</FormHelperText>}
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
                            <label><b>Funding Type</b></label>
                            <FormControl fullWidth variant="outlined" error={!!errors.fundingType}>
                                <Select fullWidth variant="outlined" value={fundingType} onChange={(e) => setFundingType(e.target.value)} sx={{ height: '45px' }}>
                                    <MenuItem value={'Pre-Seed'}>Pre-Seed</MenuItem>
                                    <MenuItem value={'Seed'}>Seed</MenuItem>
                                    <MenuItem value={'Series A'}>Series A</MenuItem>
                                    <MenuItem value={'Series B'}>Series B</MenuItem>
                                    <MenuItem value={'Series C'}>Series C</MenuItem>
                                    <MenuItem value={'Series D'}>Series D</MenuItem>
                                </Select>
                                {errors.fundingType && <FormHelperText>{errors.fundingType}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            
                            <label><b>Announced Date</b><br />Month</label>
                            <FormControl fullWidth variant="outlined" error={!!errors.announcedDate}>
                                <Select labelId="month-label" value={announcedMonth} onChange={(e) => setAnnouncedMonth(e.target.value)} sx={{ height: '45px' }}>
                                    {months.map((month, index) => (
                                        <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                    ))}
                                </Select>
                             {errors.announcedDate && <FormHelperText>{errors.announcedDate}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Day</label>
                            <FormControl fullWidth variant="outlined" error={!!errors.announcedDate}>
                                <Select labelId="day-label" value={announcedDay} onChange={(e) => setAnnouncedDay(e.target.value)} sx={{ height: '45px' }}>
                                    {days.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Year</label>
                            <FormControl fullWidth variant="outlined" error={!!errors.announcedDate}>
                                <Select labelId="year-label" value={announcedYear} onChange={(e) => setAnnouncedYear(e.target.value)} sx={{ height: '45px' }}>
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><b>Closed on Date</b><br />Month</label>
                            <FormControl fullWidth variant="outlined" error={!!errors.closedDate}>
                                <Select labelId="month-label" value={closedMonth} onChange={(e) => setClosedMonth(e.target.value)} sx={{ height: '45px' }}>
                                    {months.map((month, index) => (
                                        <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                                    ))}
                                </Select>
                                {errors.closedDate && <FormHelperText>{errors.closedDate}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Day</label>
                            <FormControl fullWidth variant="outlined" error={!!errors.closedDate}>
                                <Select labelId="day-label" value={closedDay} onChange={(e) => setClosedDay(e.target.value)} sx={{ height: '45px' }}>
                                    {days.map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Year</label>
                            <FormControl fullWidth variant="outlined" error={!!errors.closedDate}>
                                <Select labelId="year-label" value={closedYear} onChange={(e) => setClosedYear(e.target.value)} sx={{ height: '45px' }}>
                                    {years.map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={8}>
                            <label><b>Target Funding</b><br />Amount</label>
                            <FormControl fullWidth variant="outlined" error={!!errors.targetFunding}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type='number'
                                    value={targetFunding}
                                    onChange={(e) => setTargetFunding(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}
                                    error={!!errors.targetFunding}/>
                                {errors.targetFunding && <FormHelperText>{errors.targetFunding}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="outlined"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                sx={{ height: '45px' }}>
                                <MenuItem value="PESO">PESO</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <label><b>Pre-Money Valuation</b></label>
                            <FormControl fullWidth variant="outlined" error={!!errors.preMoneyValuation}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type='number'
                                    value={preMoneyValuation}
                                    onChange={(e) => setPreMoneyValuation(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}
                                    error={!!errors.preMoneyValuation}/>
                                {errors.preMoneyValuation && <FormHelperText>{errors.preMoneyValuation}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography sx={{ color: '#007490'}}>
                                A minimum share is the smallest amount of money you need to invest in a company to become a shareholder. For example, if the minimum share is P10,000, this means you have to spend P10,000 to buy just one share of that company.
                            </Typography>
                        </Grid>

                        <Grid item xs={8}>
                            <label><b>Minimum Share</b></label>
                            <FormControl fullWidth variant="outlined" error={!!errors.preMoneyValuation}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type='number'
                                    value={preMoneyValuation}
                                    onChange={(e) => setPreMoneyValuation(e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}
                                    error={!!errors.preMoneyValuation}/>
                                {errors.preMoneyValuation && <FormHelperText>{errors.preMoneyValuation}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <label>Currency</label>
                            <Select
                                fullWidth
                                variant="outlined"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                sx={{ height: '45px' }}>
                                <MenuItem value="PESO">PESO</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                            </Select>
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
                                    renderInput={(params) => <TextField {...params} variant="outlined" />} 
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Title</label>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={investor.title}
                                    onChange={(e) => handleInvestorChange(index, 'title', e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }}/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Shares</label>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={investor.shares}
                                    onChange={(e) => handleSharesChange(index, e.target.value)}
                                    sx={{ height: '45px', '& .MuiInputBase-root': { height: '45px' } }} />
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

            <Button variant="contained" sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }} style={{ marginLeft: '74%' }} onClick={handleCreateFundingRound}>
                Create Funding Round
            </Button>

            {/* Success Dialog */}
            <SuccessCreateFundingRoundDialog
                open={successDialogOpen}
                onClose={() => setSuccessDialogOpen(false)}
                selectedStartupId={selectedStartupId}/>
        </Box>
    );
}

export default CreateFundingRound;
