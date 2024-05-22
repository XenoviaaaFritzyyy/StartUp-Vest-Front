import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function SuccessCreateBusinessProfileDialog({ open, onClose, companyName }) {
    useEffect(() => {
        let timer;
        if (open) {
            timer = setTimeout(() => {
                onClose();
            }, 2500);
        }

        return () => clearTimeout(timer);
    }, [open, onClose]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                
            <DialogTitle id="alert-dialog-title">Success!</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {`Profile for ${companyName} has been successfully created.`}
                </Typography>
            </DialogContent>
        </Dialog>
    );
}

export default SuccessCreateBusinessProfileDialog;
