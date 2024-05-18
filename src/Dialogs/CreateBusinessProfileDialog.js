import React from 'react';
import { Box, Button, DialogActions } from '@mui/material';
import CreateBusinessProfile from '../Form/CreateBusinessProfile';

function CreateBusinessProfileDialog({ open, onClose }) {
    return (
        open && (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1300,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                <Box
                    sx={{
                        background: '#F2F2F2',
                        maxWidth: '100%',
                        maxHeight: '90%',
                        overflowY: 'auto',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                    }}>
                    <CreateBusinessProfile />
                    <DialogActions>
                        <Box sx={{ display: 'flex', mt: 1, mb: 1, mr: 5 }}>
                            <Button variant="text" sx={{ mr: 2, color: 'rgba(0, 116, 144, 1)' }} onClick={onClose}>
                                Cancel
                            </Button>
                        </Box>
                    </DialogActions>
                </Box>
            </Box>
        )
    );
}

export default CreateBusinessProfileDialog;
