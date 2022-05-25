import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from 'react-router-dom';

import {
  AppBar, Divider, Hidden, List, ListItem, ListItemText, SwipeableDrawer,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import Logo from "../Logo/Logo";

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Archive from "../archive/archive";

const Header = () => {
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false)

  function renderLinks(links) {
    return links.map((link, index) => {
      return (
        <Tab label={link.label} key={index} component={NavLink} to={link.to} color='#000'/>
      )
    })
  }

  const links = [
    {to: '/popular-words', label: 'Топ слова'},
    {to: '/activity', label: 'Активность'},
    {to: '/activity-by-categories', label: 'Активность по категориям'},
  ]

  useEffect(() => {
    switch (pathname) {
      case '/popular-words':
        setValue(0)
        break;
      case '/activity':
        setValue(1)
        break;
      case '/activity-by-categories':
        setValue(2)
        break;
      default:
        setValue(0)
        break;
    }
  })

  return (
    <AppBar position="static" sx={{background: "#fff", borderBottom: 1, borderColor: 'divider', minHeight: '64px'}}>
      <Toolbar>
        <Hidden mdDown>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2 }}
          >
            <Logo/>
          </Typography>
          <Tabs
            sx={{marginRight: "auto", marginTop: 'auto'}}
            indicatorColor="primary"
            aria-label="basic tabs example"
            value={!!value ? value : 0}
            // onChange={(e,value) => setValue(value)}
            aria-label="basic tabs example"
          >
            {renderLinks(links)}
          </Tabs>
          <Archive/>
        </Hidden>
        <Hidden mdUp>
          <Archive/>

          <Logo/>

          <IconButton
            size="large"
            onClick={() => setOpen(true)}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="default"
            sx={{ml: 'auto'}}
          >
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
      <SwipeableDrawer anchor='right' open={open} onOpen={() => setOpen(true)} onClose={() => setOpen(false)}>
        <div>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List
          value={!!value ? value : 0}
          onChange={(e, value) => setValue(value)}
          aria-label="basic tabs example"
        >
          {links.map((link, index) => {
            return (
              <ListItem button key={link.label + index} onClick={() => setOpen(false)} component={NavLink} to={link.to}>
                  <ListItemText primary={link.label}/>
              </ListItem>
            )})
          }
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
};

export default Header;