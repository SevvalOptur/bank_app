"use client";
import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
export default function bankTab() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [bankList, setBankList] = useState([{bank: ""}])
  const [bankName, setBankName] = useState("")
  
  console.log("ww",bankList)
  const handleBankAdd = () => {
    setBankList([...bankList, { bank: bankName}])

    console.log(bankList)

  }
  const handleBankRemove = (index) => {
    const list = [...bankList]
    list.splice(index,1);
    setBankList(list)
    console.log(setBankList(list))
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
                        name="bankName"
                        type="text"
                        id="bankName"
                        onChange={(e) => {
                            setBankName(e.target.value)
                        }}
                    />
                  </Grid>
                </Grid>
                <Box sx={center} marginTop="1rem">
                  <Button variant="contained" color='success' onClick={handleBankAdd}>Ekle</Button>
                </Box>
              </Typography>
            </Box>
          </Modal>
          {bankList.length <= 1 && (
            <Typography sx={center} marginTop="1rem">Herhangi bir banka bulunmamaktadır.</Typography>
          )}
          <Grid container marginTop={3}>
            <Grid item xs={12}>
            {bankList.map((b, i) => (
                <Accordion key={i} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography>{b.bank}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Grid xs={12}>
                            <Button sx={{float:'right'}} variant="contained" color='error' onClick={() => handleBankRemove(i)}>Sil</Button>
                        </Grid>
                            
                        </AccordionDetails>                        
                </Accordion>
            ))}
            </Grid>
          </Grid>

    </>
  );
}