import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function SuccessCreateFundingRoundDialog({ open, onClose }) {
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(open);

    useEffect(() => {
        let timer;
        if (open) {
            setIsSuccessDialogOpen(true);
            timer = setTimeout(() => {
                setIsSuccessDialogOpen(false);
                onClose();
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [open, onClose]);

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ bgcolor: '#4caf50', color: 'white', mb: 3 }}>
                    <Typography variant="h6">Funding Round Created</Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        The funding round has been successfully created.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={() => {
                            setIsSuccessDialogOpen(false);
                            onClose();
                        }} 
                        sx={{ color: '#4caf50', '&:hover': { backgroundColor: '#e8f5e9' } }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default SuccessCreateFundingRoundDialog;
