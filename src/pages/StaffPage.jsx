import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  Email,
  Check,
  Close
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, AddUser, updateUser, deleteUser, reset } from '../features/users/userSlice';

const allPermissions = ['create', 'view', 'edit', 'delete'];

export default function StaffPage() {

  const { users, isLoading, isSuccess, addSuccess, updateSuccess, deleteSuccess } = useSelector(
    (state) => state.user
  )
  const dispatch = useDispatch()


  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    permissions: []
  });
  const [alert, setAlert] = useState({
    open: false,
    type: 'success',
    message: ''
  });

  const showAlert = (type, message) => {
    setAlert({
      open: true,
      type,
      message
    });
  };

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  //handling add success
  useEffect(() => {
    if (addSuccess && dialogType === 'add') {
      handleDialogClose();
      dispatch(reset());
      showAlert('success', 'Staff added successfully!');
      dispatch(getUsers());
    }
  }, [addSuccess, dialogType, dispatch]);

  //handling update success
  useEffect(() => {
    if (updateSuccess && dialogType === 'edit') {
      handleDialogClose();
      showAlert('success', 'Staff updated successfully!');
      dispatch(reset());
      dispatch(getUsers());
    }
  }, [updateSuccess, dialogType, dispatch]);
  //handling delete success
  useEffect(() => {
    if (deleteSuccess && dialogType === 'delete') {
      handleDialogClose();
      showAlert('success', 'Staff deleted successfully!');
      dispatch(reset());
      dispatch(getUsers());
    }
  }, [deleteSuccess, dialogType, dispatch]);
  
  // Handle alert close
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(prev => ({ ...prev, open: false }));
  };

  const handleMenuClick = (event, staffMember) => {
    setAnchorEl(event.currentTarget);
    setSelectedStaff(staffMember);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStaff(null);
  };

  const handleDialogOpen = (type, staffMember = null) => {
    setDialogType(type);
    setSelectedStaff(staffMember);

    if (staffMember) {
      setFormData({
        _id: staffMember._id || '',
        name: staffMember.name || '',
        email: staffMember.email || '',
        permissions: staffMember.permissions || []
      });
    } else {
      setFormData({
        _id: '',
        name: '',
        email: '',
        permissions: []
      });
    }

    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedStaff(null);
    setDialogType('');
    setFormData({
      _id: '',
      name: '',
      email: '',
      permissions: []
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSave = () => {
    if (dialogType === 'edit') {
      const updatedStaff = {
        _id: formData._id,
        name: formData.name,
        email: formData.email,
        permissions: formData.permissions,
      }
      dispatch(updateUser(updatedStaff))
    } else if (dialogType === 'add') {
      const newStaff = {
        name: formData.name,
        email: formData.email,
        role: 'staff',
        permissions: formData.permissions,
        password: "123456",
      };
      dispatch(AddUser(newStaff))
    }
  };

  const handleDelete = () => {
    dispatch(deleteUser(formData._id));
  };

  const hasPermission = (staffMember, permission) => {
    return staffMember?.permissions?.includes(permission);
  };

  const PermissionIcon = ({ hasPermission }) => (
    hasPermission ? (
      <Check sx={{ color: 'success.main', fontSize: 20 }} />
    ) : (
      <Close sx={{ color: 'error.main', fontSize: 20 }} />
    )
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Staff Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage staff permissions and access controls
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleDialogOpen('add')}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1.5,
          }}
        >
          Add Staff Member
        </Button>
      </Box>

      {/* Staff Table */}
      {isLoading ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="h6" color="text.secondary">
            Loading staff...
          </Typography>
        </Box>) : users.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No staff members found.
            </Typography>
          </Box>
        ) : (<Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 'bold', py: 2 }}>Staff Member</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Create</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Read</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Update</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Delete</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((staffMember) => (
                  <TableRow
                    key={staffMember?._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                      },
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body1" fontWeight="600">
                          {staffMember?.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email fontSize="small" color="action" />
                          <Typography variant="body2">{staffMember?.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <PermissionIcon hasPermission={hasPermission(staffMember, 'create')} />
                    </TableCell>
                    <TableCell align="center">
                      <PermissionIcon hasPermission={hasPermission(staffMember, 'view')} />
                    </TableCell>
                    <TableCell align="center">
                      <PermissionIcon hasPermission={hasPermission(staffMember, 'edit')} />
                    </TableCell>
                    <TableCell align="center">
                      <PermissionIcon hasPermission={hasPermission(staffMember, 'delete')} />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => handleMenuClick(e, staffMember)}
                        size="small"
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>)

      }


      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleDialogOpen('edit', selectedStaff)}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit Staff
        </MenuItem>
        <MenuItem onClick={() => handleDialogOpen('delete', selectedStaff)}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete Staff
        </MenuItem>
      </Menu>

      {/* Dialog for Add/Edit/View/Delete */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'add' && 'Add New Staff Member'}
          {dialogType === 'edit' && 'Edit Staff Member'}
          {dialogType === 'delete' && 'Delete Staff Member'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'delete' ? (
            <Typography sx={{ pt: 2 }}>
              Are you sure you want to delete? This action cannot be undone.
            </Typography>
          ) : (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={dialogType === 'view'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={dialogType === 'view'}
                  />
                </Grid>

                {/* Permissions Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Permissions
                  </Typography>
                  <FormGroup>
                    <Grid container spacing={2}>
                      {allPermissions.map((permission) => (
                        <Grid item xs={6} key={permission}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.permissions.includes(permission)}
                                onChange={() => handlePermissionChange(permission)}
                                disabled={dialogType === 'view'}
                              />
                            }
                            label={permission.charAt(0).toUpperCase() + permission.slice(1)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleDialogClose} color="inherit">
            Cancel
          </Button>
          {dialogType === 'delete' && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
          {(dialogType === 'add' || dialogType === 'edit') && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!formData.name || !formData.email}
            >
              {dialogType === 'add' ? 'Add Staff Member' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}