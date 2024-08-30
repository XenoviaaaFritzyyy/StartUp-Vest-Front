import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button, Typography } from '@mui/material';
import ViewStartupProfileDialog from '../Dialogs/ViewStartupProfileDialog';
import ViewInvestorProfileDialog from '../Dialogs/ViewInvestorProfileDialog';
import ConfirmDeleteDialog from '../Dialogs/ConfirmDeleteProfileDialog';

function BusinessProfileTable({
  businessProfiles,
  handleOpenStartUp,
  handleOpenInvestor,
  handleOpenDeleteDialog,
  selectedBusinessProfile,
  openViewStartup,
  openViewInvestor,
  openDeleteDialog,
  handleCloseStartUp,
  handleCloseInvestor,
  handleCloseDeleteDialog,
  handleSoftDelete,
  profileToDelete
}) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component="main" sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box>
        <TableContainer sx={{ borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#007490' }}>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#F2F2F2' }}>Type</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#F2F2F2' }}>Company Name</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#F2F2F2' }}>Industry</Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#F2F2F2' }}>Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {businessProfiles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((profile) => (
                  <TableRow
                    key={`${profile.type}-${profile.id}`}
                    sx={{ backgroundColor: profile.type === 'Investor' ? 'rgba(0, 116, 144, .1)' : 'inherit' }}>
                    <TableCell sx={{ textAlign: 'center' }}>{profile.type}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{profile.companyName || '---'}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{profile.industry || '---'}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {profile.type === 'Investor' ? (
                        <Button
                          variant="contained"
                          sx={{ width: 'calc(50% - 25px)', background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }}
                          onClick={() => handleOpenInvestor(profile)}>
                          View
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            sx={{ background: 'rgba(0, 116, 144, 1)', '&:hover': { boxShadow: '0 0 10px rgba(0,0,0,0.5)', backgroundColor: 'rgba(0, 116, 144, 1)' } }}
                            onClick={() => handleOpenStartUp(profile)}>
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{ marginLeft: '20px', color: 'rgba(0, 116, 144, 1)', borderColor: 'rgba(0, 116, 144, 1)' }}
                            onClick={() => handleOpenDeleteDialog(profile)}>
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={businessProfiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      <ViewStartupProfileDialog open={openViewStartup} profile={selectedBusinessProfile} onClose={handleCloseStartUp} />
      <ViewInvestorProfileDialog open={openViewInvestor} profile={selectedBusinessProfile} onClose={handleCloseInvestor} />

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleSoftDelete}
        companyName={profileToDelete ? profileToDelete.companyName : null} />
    </Box>
  );
}

export default BusinessProfileTable;
