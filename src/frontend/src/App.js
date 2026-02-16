import { useEffect, useState } from "react";
import {
  fetchPrices,
  fetchEvents,
  fetchChangePoints,
  fetchMetrics,
} from "./api";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PriceChart from "./components/PriceChart";
import EventTimeline from "./components/EventTimeline";
import Filters from "./components/Filters";
import MetricsCards from "./components/MetricsCards";

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [changePoints, setChangePoints] = useState([]);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    fetchPrices().then(setPrices);
    fetchEvents().then(setEvents);
    fetchChangePoints().then(setChangePoints);
    fetchMetrics().then(setMetrics);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Brent Oil Market Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="container">
        <MetricsCards metrics={metrics} />
        <br />
        <Filters onFilter={setPrices} />
        <PriceChart
          prices={prices}
          events={events}
          changePoints={changePoints}
        />
        <EventTimeline events={events} />
      </div>
    </Box>
  );
}

export default App;
