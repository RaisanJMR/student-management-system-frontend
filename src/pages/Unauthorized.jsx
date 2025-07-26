
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
  Lock,
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

export default function Unauthorized() {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2);
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
                  backgroundColor: 'error.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      opacity: 1,
                    },
                    '50%': {
                      transform: 'scale(1.05)',
                      opacity: 0.8,
                    },
                    '100%': {
                      transform: 'scale(1)',
                      opacity: 1,
                    },
                  },
                }}
              >
                <Lock
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
                  color: 'error.main',
                  mb: 1,
                  fontSize: { xs: '2rem', sm: '2.5rem' }
                }}
              >
                403
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
                Access Denied
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                You don't have permission to access this resource.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Please contact your administrator if you believe this is an error.
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

