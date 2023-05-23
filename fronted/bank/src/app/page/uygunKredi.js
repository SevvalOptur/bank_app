"use client";
import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const center = { 
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}
export default function LabTabs() {

  const [tur, setTur] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [vade, setVade] = useState('');
  const [miktar, setMiktar] = useState('');

  const turVade = [
    {tur:1, value:'5', text: '5 Yıl'},
    {tur:1, value:'10', text: '10 Yıl'},
    {tur:2, value:'12', text: '12 Ay'},
    {tur:2, value:'24', text: '24 Ay'},
    {tur:2, value:'36', text: '36 Ay'}
  ];

  const handleChange = (event) => {
    setTur(event.target.value);
    console.log("Tür: ",event.target.value);
    const tur = event.target.value;
    if(tur == 1 || tur == 2 || tur == 3){
      setDisabled(false);
    }

  };

  const krediBul = () => {
    console.log(tur, vade, miktar)
    if(vade !== '' && miktar !== ''){
        // const mevduat = {vade:vade, miktar:miktar}
        // console.log("data", mevduat)
        const localStorageGet = localStorage.getItem('data');
        const bank = JSON.parse(localStorageGet);
        let bankMevduat = bank.map(listItem => {
            const bankName = listItem.bank;
            listItem.item.map(item => {
                if(item.tur === 1){
                    console.log("başarılı")
                    // if(item.vade == vade){
                        console.log("vvvv", item)
                        const faiz = item.faiz / 100;
                        const vade = item.vade * 12;
                        const anapara = parseFloat(miktar);
                        const aylikKredi = (anapara * (faiz * (1+faiz) ** vade / ((1+faiz) ** vade - 1))).toFixed(2);
                        console.log("vvvvaa", aylikKredi)
                    //     setMevduat([...mevduat, {bankName: bankName, vade: vade, anapara: miktar,faiz: item.faiz, faizOran: faizOran, mevduat: value}])
                    //     console.log("sonuc", mevduat)
                    //     return mevduat;
                    // }
                }
                return item;
            })
            return listItem;
        })
        console.log("banka", bank)
        console.log("oldu")
    }
    else{
        console.log("olmadı")
    }
  }


  return ( 
    <>
        <Grid container spacing={2} marginTop={3}>
            <Grid item xs={3}>
                <Box sx={{ minWidth: 120 }}>
                <FormControl required sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Kredi Türü</InputLabel>
                    <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name='tur'
                    value={tur}
                    label="Age"
                    onChange={handleChange}
                    >
                        <MenuItem value={1}>Konut</MenuItem>
                        <MenuItem value={2}>Tüketici</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ minWidth: 120 }}>
                <FormControl required disabled={disabled} sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Vade</InputLabel>
                    <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name='vade'
                    value={vade}
                    label="Age"
                    onChange={(e) => {setVade(e.target.value)} }
                    >
                    {turVade.filter(vade=>vade.tur == tur).map(turVade=>(
                        <MenuItem key={turVade.value} value={turVade.value}>{turVade.text}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ m: 1, minWidth: 120 }}>
                <TextField 
                    type="number" 
                    value={miktar} 
                    name='miktar'
                    variant="outlined" 
                    label="Kredi Miktarı" 
                    id="outlined-size-small" 
                    size="small" 
                    onChange={(e) => {
                        setMiktar(e.target.value)
                    }}/>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Box sx={{ m: 1 }}>
                    <Button variant="contained" onClick={krediBul}>Bul</Button>
                </Box>
            </Grid>
        </Grid>  
        <Grid container marginTop={3}>
            <Grid item xs={12}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography sx={{ width: '50%', flexShrink: 0 }}>Banka Adı1</Typography>
                    <Typography>
                            Toplam Geri Ödeme: 24000TL
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography sx={center}>
                            Hesaba Yatacak Tutar: 20.000 TL
                        </Typography>
                        <Typography sx={center}>
                            Tüketici Kredisi - 36 ay vade - aylık faiz %1,29
                        </Typography>
                        <Typography sx={center}>
                            Aylık ödeme 666,66 TL
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>

  
    </>
    );
}