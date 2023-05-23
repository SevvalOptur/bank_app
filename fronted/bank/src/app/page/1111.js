"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';  
import UygunKredi from './uygunKredi.js'
import MevduatFaizi from './mevduatFaiz.js'

const style = {
    width: '50%',
    typography: 'body1', 
    margin: 'auto', 
    marginTop: '5%', 
    border: '1px solid #000',
    borderRadius: '5px',
    padding: '20px'

};
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const center = { 
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}
export default function LabTabs() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [tur, setTur] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const [vade, setVade] = React.useState('');
  const [num, setNum] = React.useState();
  const [list, setList] = React.useState([{tur:"", vade:"", faiz:""}])
  const turVade = [
    {tur:1, value:'5', text: '5 Yıl'},
    {tur:1, value:'10', text: '10 Yıl'},
    {tur:2, value:'12', text: '12 Ay'},
    {tur:2, value:'24', text: '24 Ay'},
    {tur:2, value:'36', text: '36 Ay'},
    {tur:3, value:'3', text: '3 Ay'},
    {tur:3, value:'6', text: '6 Ay'},
    {tur:3, value:'12', text: '12 Ay'},
  ];

  const newBank ={
    tur: tur,
    vade:vade,
    faiz: num
  }
  const handleListAdd = () => {
    setList([...list, {tur:"", vade:"", faiz:""}])
  }
  const handleListRemove = (i) => {
    const listRow = [...list];
    listRow.splice(i, 1);
    setList(listRow);
  }
  const handleChange3 = (event) => {
    setVade(event.target.value);
    console.log("vade: ",event.target.value);
  };
      // const listFaiz = [...faizList]
    // console.log("aaa",listFaiz)
    // listFaiz.splice(index,1);
    // setFaizList(listFaiz)
    // console.log(setFaizList(listFaiz))


  const handleChange4 = (event) => {
    const regex = /^\d*[0-9](|.\d{2}|,\d{2})?$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setNum(event.target.value);
    }
    //hepsini aynı change bagla
  };
  const handleListChange = (e,i) => {
    const {name, value} = e.target
    const listRow = [...list];
    listRow[i][name] = value;
    setList(listRow)
    console.log("name",listRow)

    if(name == 'tur'){
      if(value == 1 || value==2 || value==3){
        setDisabled(false);
        setTur(value)
      }
      else{
        setVade("");
      }
    }
  }
  console.log("ne çıkacak", list)
  const deneme = () => {
    console.log("submit", newBank)
  }
  return (
    <>
          <Box sx={center}>
            <Button variant="contained"  onClick={handleOpen}>Banka Ekle</Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" align="center" variant="h6" component="h2">
                Banka Adı
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                        InputProps={{
                            sx: {
                                color: 'black !important',
                                '&:focus-within fieldset, &:focus-visible fieldset': {
                                border: '1px solid #0099ff!important',
                                },
                            },
                        }}
                        required
                        fullWidth
                        name="text"
                        type="text"
                        id="text"
                    />
                  </Grid>
                </Grid>
                <Box sx={center} marginTop="1rem">
                  <Button variant="contained" color='success'>Ekle</Button>
                </Box>
              </Typography>
            </Box>
          </Modal>
          <Typography sx={center} marginTop="1rem">Herhangi bir banka bulunmamaktadır.</Typography>
          <Box sx={{marginTop:'2rem'}}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>Banka Adı</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid xs={12}>
                  <Button sx={{float:'right'}} variant="contained" color='error'>Sil</Button>
                </Grid>
                
                <Grid container xs={12}>
                  <Grid item xs={12}>
                    <IconButton sx={{float:'right'}} aria-label="delete" size="large" onClick={handleListAdd}>
                      <AddIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </Grid>
                {list.map((a,i) => (
                  <Grid key={i} container spacing={2}>
                    <Grid item xs={3}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl required sx={{ m: 1, minWidth: 120 }} size="small">
                          <InputLabel id="demo-select-small-label">Tür</InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            name='tur'
                            value={a.tur}
                            label="Age"
                            onChange={(e) => handleListChange(e,i)}
                          >
                            <MenuItem value={1}>Konut</MenuItem>
                            <MenuItem value={2}>Tüketici</MenuItem>
                            <MenuItem value={3}>Mevduat</MenuItem>
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
                            value={a.vade}
                            label="Age"
                            onChange={(e) => {handleListChange(e,i);handleChange3} }
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
                        <TextField type="number" value={a.faiz} name='faiz' variant="outlined" label="Aylık Faiz Oranı" id="outlined-size-small" size="small" onChange={(e) => {handleChange4(e); handleListChange(e,i)}}/>
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box sx={{ m: 1 }}>
                        <Button variant="contained" sx={{ marginRight: 1 }} onClick={deneme}>Kaydet</Button>
                        <Button variant="contained" color='error' onClick={() => handleListRemove(i)}>Sil</Button>
                      </Box>
                    </Grid>
                  </Grid>                  
                ))}


              </AccordionDetails>
            </Accordion>

          </Box>
    </>
  );
}