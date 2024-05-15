import { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, FormControl} from '@mui/material';

function CreateFundingRound() {
    const [startupName, setStartupName] = useState('');
    const [fundingType, setFundingType] = useState('');
    const [announcedMonth, setAnnouncedMonth] = useState('');
    const [announcedDay, setAnnouncedDay] = useState('');
    const [announcedYear, setAnnouncedYear] = useState('');
    const [closedMonth, setClosedMonth] = useState('');
    const [closedDay, setClosedDay] = useState('');
    const [closedYear, setClosedYear] = useState('');
    const [moneyRaised, setMoneyRaised] = useState('');
    const [targetFunding, setTargetFunding] = useState('');
    const [preMoneyValuation, setPreMoneyValuation] = useState('');
    const [investors, setInvestors] = useState(['']);

    const days = [...Array(31).keys()].map(i => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, i, 1));
    });    
    const years = [...Array(51).keys()].map(i => new Date().getFullYear() - i);

    const handleAddInvestor = () => {
        setInvestors([...investors, '']);
    };

    const handleInvestorChange = (index, value) => {
        const updatedInvestors = [...investors];
        updatedInvestors[index] = value;
        setInvestors(updatedInvestors);
    };

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, width: '100%', overflowX: 'hidden', maxWidth: '1000px', background: '#F2F2F2' }}>
                <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                    Startup Name
                </Typography>

                <Grid container spacing={3} sx={{ ml: 2 }}>
                    <Grid item xs={12} sm={11}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label>StartUp Name</label>
                                <TextField fullWidth variant="filled" value={startupName} onChange={(e) => setStartupName(e.target.value)} />
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
                                        {months.map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
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
                                        {months.map((month) => (
                                            <MenuItem key={month} value={month}>{month}</MenuItem>
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
                            <TextField fullWidth variant="filled" type='number'/>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="filled"
                                value={moneyRaised}
                                onChange={(e) => setMoneyRaised(e.target.value)}>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                                <MenuItem value="PESO">PESO</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={8}>
                            <label><b>Target Funding</b><br />Amount</label>
                            <TextField fullWidth variant="filled" type='number'/>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="filled"
                                value={targetFunding}
                                onChange={setTargetFunding}>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                                <MenuItem value="PESO">PESO</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={8}>
                            <label><b>Pre-Money Valuation</b><br />Amount</label>
                            <TextField fullWidth variant="filled" type='number'/>
                        </Grid>

                        <Grid item xs={4}>
                            <label><br />Currency</label>
                            <Select
                                fullWidth
                                variant="filled"
                                value={preMoneyValuation}
                                onChange={setPreMoneyValuation}>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="GBP">GBP</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                                <MenuItem value="PESO">PESO</MenuItem>
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
                            <Grid item xs={12}>
                                <label>Investor {index + 1}</label>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    value={investor}
                                    onChange={(e) => handleInvestorChange(index, e.target.value)}/>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12} sm={11}>
                    <Button variant="contained" onClick={handleAddInvestor} sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}}>Add Investor</Button>
                </Grid>
            </Grid>
        </Box>
        </>
    );
}

export default CreateFundingRound;
