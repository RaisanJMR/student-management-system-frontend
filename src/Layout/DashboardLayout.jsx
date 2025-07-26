import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Button,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    Chip,
    GlobalStyles
} from '@mui/material';
import {
    Menu as MenuIcon,
    School,
    People,
    Dashboard as DashboardIcon,
    Logout,
    AccountCircle,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const drawerWidth = 280;

// Global styles to prevent scrolling issues
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

const menuItems = [
    {
        text: 'Students',
        icon: <School />,
        path: '/dashboard',
        color: '#2e7d32'
    },
    {
        text: 'Staff',
        icon: <People />,
        path: '/dashboard/staff',
        color: '#ed6c02'
    }
];

export default function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

      const { user } = useSelector((state) => state.auth);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch(logout());
        dispatch(reset());
        navigate('/');
        handleMenuClose();
    };

    const handleNavigation = (path) => {
        navigate(path);
        setMobileOpen(false); 
    };

    const getCurrentPageTitle = () => {
        const currentPath = location.pathname;
        if (currentPath.includes('/students')) return 'Students Management';
        if (currentPath.includes('/staff')) return 'Staff Management';
        return 'Dashboard';
    };

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    p: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    EduManager
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
                    School Management System
                </Typography>
            </Box>

            <Divider />

            {/* Navigation Menu */}
            <List sx={{ flexGrow: 1, p: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }} key={item.text}>
                            <ListItem disablePadding sx={{ mb: 1 }}>
                                <ListItemButton
                                    onClick={() => handleNavigation(item.path)}
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: isActive ? `${item.color}15` : 'transparent',
                                        color: isActive ? item.color : 'text.primary',
                                        '&:hover': {
                                            backgroundColor: `${item.color}10`,
                                            color: item.color,
                                        },
                                        transition: 'all 0.2s ease-in-out',
                                        py: 1.5,
                                        px: 2,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: 'inherit',
                                            minWidth: 40,
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontWeight: isActive ? 600 : 400,
                                        }}
                                    />
                                    {isActive && (
                                        <Chip
                                            size="small"
                                            label="Active"
                                            sx={{
                                                backgroundColor: item.color,
                                                color: 'white',
                                                fontSize: '0.7rem',
                                                height: 20,
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    );
                })}
            </List>

            <Divider />

            {/* User Info Section */}
            <Box sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                        A
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight="600">
                            {user?.name || 'Guest User'}    
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {user?.email || 'No email provided'}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            {globalStyles}
            <Box sx={{ display: 'flex', height: '100vh' }}>
                {/* Top AppBar */}
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: 'white',
                        color: 'text.primary',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                        borderBottom: '1px solid #e0e0e0'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Page Title */}
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                            {getCurrentPageTitle()}
                        </Typography>

                        {/* User Menu */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                                size="large"
                                onClick={handleMenuClick}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <Divider />
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Sidebar Drawer */}
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {/* Mobile drawer */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better mobile performance
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>

                    {/* Desktop drawer */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                border: 'none',
                                boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        height: '100vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Toolbar /> {/* Spacer for AppBar */}

                    {/* Content Area with scrolling */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            backgroundColor: '#f8f9fa',
                            overflowY: 'auto',
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#c1c1c1',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                background: '#a1a1a1',
                            },
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </>
    );
}