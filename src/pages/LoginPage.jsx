import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    InputAdornment,
    IconButton,
    GlobalStyles
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
} from '@mui/icons-material';
import { login, reset } from '../features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const globalStyles = (
    <GlobalStyles
        styles={{
            '*': {
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            },
            'html, body': {
                height: '100%',
                overflow: 'hidden',
            },
            '#root': {
                height: '100vh',
            }
        }}
    />
);

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        // Redirect when logged in
        if (isSuccess || user) {
            navigate('/dashboard')
        }
        const timer = setTimeout(() => {
            dispatch(reset());
        }, 3000);

        return () => clearTimeout(timer);
    }, [dispatch, navigate, isError, isSuccess, user, message])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
          }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const userData = {
            email: formData.email,
            password: formData.password,
        }
        dispatch(login(userData))
    };


    return (
        <>
            {globalStyles}
            <Box
                sx={{
                    height: '100vh',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: 1.25, sm: 2.5 },
                    overflow: 'hidden'
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        height: 'auto',
                        maxHeight: 'calc(100vh - 40px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0
                    }}
                >
                    <Paper
                        elevation={10}
                        sx={{
                            padding: { xs: 3, sm: 5 }, 
                            borderRadius: 3,
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            width: '100%',
                            maxWidth: 450,
                            maxHeight: { xs: 'calc(100vh - 20px)', sm: 'calc(100vh - 40px)' },
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 0, 0, 0.1)',
                                borderRadius: '2px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(0, 0, 0, 0.2)',
                            },
                            animation: 'slideUp 0.5s ease-out',
                            '@keyframes slideUp': {
                                from: {
                                    opacity: 0,
                                    transform: 'translateY(30px)',
                                },
                                to: {
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                },
                            },
                        }}
                    >
                        {/* Header */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    mb: 1,
                                    fontSize: { xs: '1.75rem', sm: '2rem' }
                                }}
                            >
                                Welcome Back
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                            >
                                Sign in to your account
                            </Typography>
                        </Box>

                        {/* Error Alert */}
                        {isError && (
                            <Alert
                                severity="error"
                                sx={{
                                    mb: 3,
                                    borderLeft: '4px solid #d32f2f'
                                }}
                            >
                                {message}
                            </Alert>
                        )}

                        {/* Login Form */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email Address"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={!!errors.email}
                                helperText={errors.email}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderWidth: '2px',
                                        },
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleInputChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                margin="normal"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: 'action.active' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderWidth: '2px',
                                        },
                                    },
                                }}
                            />


                            {/* Login Button */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={isLoading}
                                sx={{
                                    mb: 3,
                                    py: 2,
                                    borderRadius: 2,
                                    textTransform: 'uppercase',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.5px',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#ccc',
                                    },
                                }}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Button>

                            {/* Sign Up Link */}
                            <Box sx={{ textAlign: 'center', mt: 3 }}>
                                <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                    <Link
                                         to="/register"
                                        style={{
                                            color: '#1976d2',
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                    >
                                         Sign up here
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    );
}