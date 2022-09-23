import React from "react";
import {Box, Collapse, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography} from "@mui/material"
import { useTheme } from '@mui/material/styles';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Outlet } from "react-router-dom";
import {Drawer, AppBar, DrawerHeader} from "../components/layout"

const Layout = () => {
    const theme = useTheme();
    const [openMenu, setOpenMenu] = React.useState(true);
    const [selectedItem, setSelectedItem] = React.useState('');
    const [openAccount, setOpenAccount] = React.useState(false);
    const handleAccountClick = () => {
        handleDrawerOpen();
        setOpenAccount(!openAccount);
    };

    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };
  
    const handleDrawerClose = () => {
        setOpenMenu(false);
        setOpenAccount(false);
    };
    const handleSelectedItem = data => {
        setSelectedItem(data)
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={openMenu}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                    marginRight: 5,
                    ...(openMenu && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Tecos Web Service
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={openMenu}>
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding selected={selectedItem === 'dossiers'} onClick={() => handleSelectedItem('dossiers')} sx={{ display: 'block' }}>
                        <ListItemButton to="/dossiers" component={Link}
                            sx={{
                            minHeight: 48,
                            justifyContent: openMenu ? 'initial' : 'center',
                            px: 2.5,
                            }}
                        >
                            <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: openMenu ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                            >
                            <FolderSharedIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Dossiers" sx={{ opacity: openMenu ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding sx={{ display: 'block' }}>
                    <ListItemButton to="/competences" component={Link} selected={selectedItem === 'competences'} onClick={() => handleSelectedItem('competences')}
                        sx={{
                        minHeight: 48,
                        justifyContent: openMenu ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: openMenu ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <EmojiObjectsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Competences" sx={{ opacity: openMenu ? 1 : 0 }} />
                    </ListItemButton>
                    </ListItem>
                    
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton selected={selectedItem === 'compte'} onClick={() => {handleSelectedItem('compte'); handleAccountClick()}}
                        sx={{
                        minHeight: 48,
                        justifyContent: openMenu ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: openMenu ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <AccountBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Compte" sx={{ opacity: openMenu ? 1 : 0 }} />
                        {openMenu && (openAccount ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                    </ListItem>
                    <Collapse in={openAccount} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Déconnecter" />
                        </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, py: 5 }}>
                
                <Outlet/>
            </Box>
        </Box>
    )
}
export default Layout;