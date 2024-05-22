import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmDeleteDialog = ({ open, onClose, onConfirm, companyName, profile }) => {
  const [deleteSuccessDialogOpen, setDeleteSuccessDialogOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (deleteSuccessDialogOpen) {
      timer = setTimeout(() => {
        setDeleteSuccessDialogOpen(false);
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [deleteSuccessDialogOpen]);

  const handleConfirmDelete = async () => {
    await onConfirm(profile);
    setDeleteSuccessDialogOpen(true);
    onClose(); 
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {companyName} profile? <br /> This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ color: 'red' }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: 'green' }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={deleteSuccessDialogOpen} onClose={() => setDeleteSuccessDialogOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The profile for {companyName} has been successfully deleted.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteDialog;
