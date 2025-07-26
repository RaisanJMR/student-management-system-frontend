import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    Add,
    MoreVert,
    Delete,
    Email,
    Phone,
    Edit
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'
import { getStudents, AddStudent, updateStudent, deleteStudent, reset } from '../features/students/studentSlice';
import AddStudentForm from '../component/AddStudentForm';
import EditStudentForm from '../component/EditStudentForm';

export default function StudentPage() {
    const { students, isLoading, isSuccess, addSuccess, updateSuccess, deleteSuccess } = useSelector(
        (state) => state.student
    )
    const { user } = useSelector((state) => state.auth);
    const permissions = user?.permissions || [];

    const canCreate = permissions.includes('create');
    const canView = permissions.includes('view');
    const canEdit = permissions.includes('edit');
    const canDelete = permissions.includes('delete');

    const dispatch = useDispatch()


    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogType, setDialogType] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        grade: '',
        age: '',
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
    // Reset state on unmount if operation was successful
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    // Fetch students 
    useEffect(() => {
        dispatch(getStudents())
    }, [dispatch])

    //handling add success
    useEffect(() => {
        if (addSuccess && dialogType === 'add') {
            handleDialogClose();
            showAlert('success', 'Student added successfully!');
            dispatch(reset());
        }
    }, [addSuccess, dialogType, dispatch]);

    //handling update success
    useEffect(() => {
        if (updateSuccess && dialogType === 'edit') {
            handleDialogClose();
            showAlert('success', 'Student updated successfully!');
            dispatch(reset());
            dispatch(getStudents());
        }
    }, [updateSuccess, dialogType, dispatch]);

    //handling delete success
    useEffect(() => {
        if (deleteSuccess && dialogType === 'delete') {
            handleDialogClose();
            showAlert('success', 'Student deleted successfully!');
            dispatch(reset());
            dispatch(getStudents());
        }
    }, [deleteSuccess, dialogType, dispatch]);

    // Show alert helper function

    // Handle alert close
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(prev => ({ ...prev, open: false }));
    };
    const handleMenuClick = (event, student) => {
        setAnchorEl(event.currentTarget);
        setSelectedStudent(student);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedStudent(null);
    };

    const handleDialogOpen = (type, student = null) => {
        setDialogType(type);
        setSelectedStudent(student);
        setOpenDialog(true);
        if (type === 'add') {
            setFormData({
                name: '',
                email: '',
                contact: '',
                grade: '',
                age: '',
            });
        } else if (student && (type === 'edit' || type === 'view' || type === 'delete')) {
            setFormData({
                _id: student._id || '',
                name: student.name || '',
                email: student.email || '',
                contact: student.contact || '',
                grade: student.grade || '',
                age: student.age || '',
            });
        }
        handleMenuClose();
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSelectedStudent(null);
        setDialogType('');
        setFormData({
            name: '',
            email: '',
            contact: '',
            grade: '',
            age: '',
        });
    };

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleAddStudent = () => {
        const newStudent = {
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            grade: formData.grade,
            age: formData.age,
        };
        dispatch(AddStudent(newStudent))
    };

    const handleUpdateStudent = () => {
        const updatedStudent = {
            _id: formData?._id,
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            grade: formData.grade,
            age: formData.age,
        };
        dispatch(updateStudent(updatedStudent));
    };

    const handleDeleteStudent = () => {
        dispatch(deleteStudent(formData._id));
    };


    const grades = ['9th Grade', '10th Grade', '11th Grade', '12th Grade'];

    if (!canView) {
        return (
            <Box sx={{ p: 5, textAlign: 'center' }}>
                <Typography variant="h5" color="error">
                    You do not have permission to view this page.
                </Typography>
            </Box>
        );
    }


    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Students Management
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage and view all students in your school
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    disabled={!canCreate}
                    onClick={() => handleDialogOpen('add', selectedStudent)}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        px: 3,
                        py: 1.5,
                    }}
                >
                    Add Student
                </Button>
            </Box>

            {/* Students Table */}
            {isLoading ? (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography variant="h6" color="text.secondary">
                        Loading students...
                    </Typography>
                </Box>
            ) : students.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography variant="h6" color="text.secondary">
                        No students found.
                    </Typography>
                </Box>
            ) : (
                <Card>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Student</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Grade</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student?._id} hover>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {student?.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                                    <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                    <Typography variant="body2">{student?.email}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                                                    <Typography variant="body2">{student?.contact}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{student?.age}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{student?.grade}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={(event) => handleMenuClick(event, student)}
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
                </Card>
            )}

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleDialogOpen('edit', selectedStudent)} disabled={!canEdit}
                    sx={{
                        color: canEdit ? 'inherit' : 'text.disabled',
                        pointerEvents: canEdit ? 'auto' : 'none',
                    }}>
                    <Edit sx={{ mr: 1 }} fontSize="small" />
                    Edit Details
                </MenuItem>
                <MenuItem onClick={() => handleDialogOpen('delete', selectedStudent)} disabled={!canDelete}
                    sx={{
                        color: canDelete ? 'inherit' : 'text.disabled',
                        pointerEvents: canDelete ? 'auto' : 'none',
                    }}>
                    <Delete sx={{ mr: 1 }} fontSize="small" />
                    Delete
                </MenuItem>
            </Menu>

            {/* Dialogs */}
            <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {dialogType === 'add' && 'Add New Student'}
                    {dialogType === 'edit' && 'Edit Student Details'}
                    {dialogType === 'delete' && 'Delete Student'}
                </DialogTitle>
                <DialogContent>
                    {dialogType === 'add' && (
                        <AddStudentForm formData={formData} addFormChange={handleFormChange} grades={grades} />
                    )}

                    {dialogType === 'edit' && (
                        <EditStudentForm formData={formData} handleFormChange={handleFormChange} grades={grades} />
                    )}


                    {dialogType === 'delete' && (
                        <Typography sx={{ pt: 2 }}>
                            Are you sure you want to delete? This action cannot be undone.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    {dialogType === 'add' && (
                        <Button
                            variant="contained"
                            onClick={handleAddStudent}
                            disabled={!formData.name || !formData.email || !formData.grade}
                        >
                            Add Student
                        </Button>
                    )}
                    {dialogType === 'edit' && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateStudent}
                            disabled={!formData.name || !formData.email || !formData.grade}
                        >
                            Update Student
                        </Button>
                    )}
                    {dialogType === 'delete' && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteStudent}
                        >
                            Delete
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