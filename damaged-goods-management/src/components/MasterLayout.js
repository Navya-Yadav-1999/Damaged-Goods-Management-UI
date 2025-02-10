import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function MasterLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check for mobile screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile); // Sidebar state for smaller screens
  const navigate = useNavigate();

  const menuItems = [
    { name: "Incident Report", path: "/incident-report" },
    { name: "Inspection Report", path: "/inspection-report" },
    { name: "Warehouse Incident", path: "/warehouse-incident-report" },
    { name: "Supplier Shipment Confirmation", path: "/supplier-shipment-report" },
    { name: "Shipper Supplier Claim", path: "/shipper-claim-report" },
    { name: "Loading Unloading Incident", path: "/loading-unloading-incident-report" },
  ];

  // Update sidebar state on screen size change
  useEffect(() => {
    setIsSidebarOpen(!isMobile); // Automatically open sidebar for desktop, close for mobile
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    if (isMobile) setIsSidebarOpen(false); // Close sidebar on menu click for mobile
  };

  const logoURL =
  "data:image/png;base64,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";

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <CssBaseline />

        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            {isMobile && (
            <IconButton color="inherit" edge="start" onClick={toggleSidebar} sx={{ mr: 2 }}>
                {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            )}
            {/* Logo */}
           
            {/* Title */}
            <Typography variant="h6" noWrap>
            Damaged Goods Management
            </Typography>
            <img
                src={logoURL} // Variable holding the logo URL
                alt="Logo"
                style={{
                    height: "40px",
                    marginRight: "10px",
                    marginLeft: "auto"
                }}
            />
        </Toolbar>
        </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: isSidebarOpen ? 240 : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            display: isSidebarOpen ? "block" : "none",
          },
        }}
      >
        <List sx={{mt:8}}>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(item.path)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Content */}
      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Offset for header
          ml: isSidebarOpen && !isMobile ? 30 : 0, // Adjust content margin for desktop sidebar
          overflowY: "auto", // Scrollable content
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "primary.main",
        color: "white",
        py: 2,
        textAlign: "center" }}
        component="footer"        
      >
        <Typography variant="body2">© 2025 Miracle Software Systems inc</Typography>
      </Box>
    </Box>
  );
}

export default MasterLayout;