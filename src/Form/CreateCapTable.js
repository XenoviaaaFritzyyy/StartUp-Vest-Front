import { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Grid, FormControl} from '@mui/material';

function CreateCapTable() {
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
                <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3}}>
                    Startup Name
                </Typography>

                <Grid container spacing={3} sx={{ ml: 2 }}>
                    <Grid item xs={12} sm={11}>
                        <Grid container spacing={2}>
                            <Select fullWidth variant="filled" value={fundingType} onChange={(e) => setFundingType(e.target.value)}>
                                        <MenuItem value={'Pre-Seed'}>Facebook</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>

            <Typography variant="h5" sx={{ color: '#414a4c', fontWeight: '500', pl: 5, pt: 3, pb: 3 }}>
                Create Cap Table
            </Typography>
            
            <Grid container spacing={3} sx={{ ml: 2 }}>
                {investors.map((investor, index) => (
                    <Grid item xs={12} sm={11} key={index}>
                        <Grid container spacing={2}>
                        <Grid item xs={4}>
                                <label>Shareholder's Name</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Title</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>

                            <Grid item xs={4}>
                                <label>Total Shares</label>
                                <TextField fullWidth variant="filled"/>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
                <Grid item xs={12} sm={11}>
                    <Button variant="contained" onClick={handleAddInvestor} sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' }}}>Add</Button>
                </Grid>
            </Grid>
        </Box>
        </>
    );
}

export default CreateCapTable;
