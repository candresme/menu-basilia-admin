import React from 'react';

//Material Components
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

//MAterial Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RecommendIcon from '@mui/icons-material/Recommend';


const AppBar = ({labelActive}) => {
    const [value, setValue] = React.useState(0);

  return (

    
    <div>

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Menú" icon={<RestaurantMenuIcon />} onClick={() =>labelActive("menu")} />
                <BottomNavigationAction label="Favoritos" icon={<FavoriteIcon  />} onClick={() =>labelActive("favoritos")} />
                <BottomNavigationAction label="Recomendados" icon={<RecommendIcon  />}  onClick={() =>labelActive("recomendados")}/>
            </BottomNavigation>
        </Paper>
    </div>
    
    
  )
}

export default AppBar;
