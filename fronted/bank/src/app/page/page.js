"use client";
import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import UygunKredi from './uygunKredi.js'
import MevduatFaizi from './mevduatFaiz.js'
import BankaEkle from './bankEkle.js'


const style = {
    width: '50%',
    typography: 'body1', 
    margin: 'auto', 
    marginTop: '5%', 
    border: '1px solid #000',
    borderRadius: '5px',
    padding: '20px'

};

const center = { 
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}
export default function LabTabs() {
   // tabpane
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // tabpane

  const [value1, setValue1] = useState('4');
  const handleChange1 = (event, newValue1) => {
    setValue1(newValue1);
  };
  return (
    <Box sx={style}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Hesaplama" value="1" />
            <Tab label="Banka EKle" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <TabContext value={value1}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange1} aria-label="lab API tabs example">
                  <Tab label="Kredi Faizi" value="4" />
                  <Tab label="Mevduat Faizi" value="5" />
              </TabList>
              </Box>
              <TabPanel value="4">
                <Typography sx={center}>
                  Uygun Kredi Faizi Bul
                </Typography>
                <Grid container spacing={2}>
                  <UygunKredi/>
                </Grid>
              </TabPanel>
              <TabPanel value="5">
                <Typography sx={center}>
                  Mevduat Faizi Bul
                </Typography>
                <Grid container spacing={2}>
                  <MevduatFaizi/>
                </Grid>
              </TabPanel>
          </TabContext>
        </TabPanel>
        <TabPanel value="2"> 
          <BankaEkle/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}