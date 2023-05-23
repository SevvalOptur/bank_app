"use client";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function LabTabs() {
  const [vade, setVade] = useState("");
  const [miktar, setMiktar] = useState("");
  const [mevduat, setMevduat] = useState([]);

  const mevduatBul = () => {
    if (vade !== "" && miktar !== "") {
      const localStorageGet = localStorage.getItem("data");
      const bank = JSON.parse(localStorageGet);
      bank.map((listItem) => {
        const bankName = listItem.bank;
        let result = listItem.item
          .filter((item) => item.tur == 3 && item.vade == vade)
          .map((x) => {
            const faiz = ((miktar / 100) * (x.faiz / 12) * vade).toFixed(2);
            let a = parseFloat(miktar);
            let b = parseFloat(faiz);

            x.bankName = bankName;
            x.vade = vade;
            x.anapara = miktar;
            x.faiz = x.faiz;
            x.faizOran = faiz;
            x.mevduat = a + b;
            return x;
          });
          console.log("result>>", result)
        setMevduat(result);
      });
    } else {
      console.log("olmadı");
    }
  };


  return (
    <>
      <Grid container spacing={2} marginTop={3}>
        <Grid item xs={4}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl required sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Vade</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                name="vade"
                value={vade}
                onChange={(e) => {
                  setVade(e.target.value);
                }}
              >
                <MenuItem value={3}>3 Ay</MenuItem>
                <MenuItem value={6}>6 Ay</MenuItem>
                <MenuItem value={12}>12 Ay</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ m: 1, minWidth: 120 }}>
            <TextField
              type="number"
              value={miktar}
              name="miktar"
              variant="outlined"
              label="Yatırılacak Para"
              id="outlined-size-small"
              size="small"
              onChange={(e) => {
                setMiktar(e.target.value);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ m: 1 }}>
            <Button variant="contained" onClick={mevduatBul}>
              Bul
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container marginTop={3}>
      {mevduat.length == 0 && (
        <Typography sx={center} marginTop="1rem">
          Herhangi bir mevduat faizi bulunmamaktadır.
        </Typography>
      )}
        <Grid item xs={12}>
          {mevduat.map((b, i) => (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  {b.bankName}
                </Typography>
                <Typography>Aylık Faiz Oranı %{b.faiz}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={center}>
                  Mevduat Tutar: {b.anapara} TL
                </Typography>
                <Typography sx={center}>
                  {b.vade} vade sonunda alınacak faiz :{b.faizOran} TL
                </Typography>
                <Typography sx={center}>
                  {b.vade} vade sonunda toplam mevduat: {b.mevduat} TL
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
