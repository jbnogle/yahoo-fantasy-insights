import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    appTitle: {
      right: "20px",
      position: "absolute"
    }
  }));

function AppHeader() {
    const classes = useStyles();
    
    return(
        <AppBar style={{backgroundColor: "darkviolet"}} position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.appTitle}>
                Fantasy Insights
              </Typography>
            </Toolbar>
         </AppBar>
    );
}

export default AppHeader;