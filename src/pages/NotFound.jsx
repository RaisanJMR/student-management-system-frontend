import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Paper,
    Button,
    Typography,
    GlobalStyles
} from '@mui/material';
import {
    SearchOff,
    ArrowBack
} from '@mui/icons-material';

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

export default function NotFoundPage() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
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
                            textAlign: 'center',
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
                        {/* Icon */}
                        <Box
                            sx={{
                                mb: 3,
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    backgroundColor: 'warning.light',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: 'bounce 2s infinite',
                                    '@keyframes bounce': {
                                        '0%, 20%, 50%, 80%, 100%': {
                                            transform: 'translateY(0)',
                                        },
                                        '40%': {
                                            transform: 'translateY(-10px)',
                                        },
                                        '60%': {
                                            transform: 'translateY(-5px)',
                                        },
                                    },
                                }}
                            >
                                <SearchOff
                                    sx={{
                                        fontSize: 40,
                                        color: 'white'
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Header */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h3"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    color: 'warning.main',
                                    mb: 1,
                                    fontSize: { xs: '2rem', sm: '2.5rem' }
                                }}
                            >
                                404
                            </Typography>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 2,
                                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                                }}
                            >
                                Page Not Found
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                The page you're looking for doesn't exist or has been moved.
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Please check the URL or navigate back to continue.
                            </Typography>
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ArrowBack />}
                                onClick={handleGoBack}
                                sx={{
                                    py: 2,
                                    borderRadius: 2,
                                    textTransform: 'uppercase',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.5px',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                    },
                                }}
                            >
                                Go Back
                            </Button>
                        </Box>

                    </Paper>
                </Container>
            </Box>
        </>
    );
}

