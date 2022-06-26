import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

//Material Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

//imports react router dom.
import { Link } from 'react-router-dom';


export default function ControlledTreeView() {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const drawerWidth = 240;

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

    const aStyle = {
        textDecoration:'none',
        color:'black',        
    };


  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
                multiSelect
                sx={{textAlign: 'left'}}
            >
                <Link to="/admin" style={aStyle}>
                    <TreeItem nodeId="2" label="Home" icon={<HomeIcon />} />
                </Link>

                <TreeItem className="mt-2" nodeId="1" label="Categorías" >
                    <Link to="/admin/categorias/crear" style={aStyle}>
                        <TreeItem nodeId="2" label="Crear" icon={<AddCircleIcon />} />
                    </Link>

                    <Link to="/admin/categorias/consultar" style={aStyle}>
                        <TreeItem nodeId="3" label="Consultar" icon={<RemoveRedEyeIcon />} />
                    </Link>
                </TreeItem>

                <TreeItem className="mt-2" nodeId="4" label="Productos">
                    <Link to="/admin/productos/crear" style={aStyle}>
                        <TreeItem nodeId="5" label="Crear" icon={<AddCircleIcon />} />
                    </Link>

                    <Link to="/admin/productos/consultar" style={aStyle}>
                        <TreeItem nodeId="6" label="Consultar" icon={<RemoveRedEyeIcon />} />
                    </Link>
                </TreeItem>
            </TreeView>
        </Box>
      </Drawer>
      
    </Box>
  );
}

