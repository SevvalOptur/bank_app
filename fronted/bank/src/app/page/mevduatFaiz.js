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
  const [time, setTime] = useState("");
  const [money, setMoney] = useState("");
  const [deposit, setDeposit] = useState([]);

  const depositSearch = () => {
    if (time !== "" && money !== "") {
      const localStorageGet = localStorage.getItem("data");
      const bank = JSON.parse(localStorageGet);
      bank.map((listItem) => {
        const bankName = listItem.bankName;
        let result = listItem.item
          .filter((item) => item.type == 3 && item.time == time)
          .map((x) => {
            const interest = ((money / 100) * (x.interest / 12) * time).toFixed(2);
            let a = parseFloat(money);
            let b = parseFloat(interest);

            x.bankName = bankName;
            x.time = time;
            x.money = money;
            x.interest = x.interest;
            x.interestAmount = interest;
            x.deposit = a + b;
            return x;
          });
          console.log("result>>", result)
        setDeposit(result);
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
                name="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
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
              value={money}
              name="money"
              variant="outlined"
              label="Yatırılacak Para"
              id="outlined-size-small"
              size="small"
              onChange={(e) => {
                setMoney(e.target.value);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ m: 1 }}>
            <Button variant="contained" onClick={depositSearch}>
              Bul
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container marginTop={3}>
      {deposit.length == 0 && (
        <Typography sx={center} marginTop="1rem">
          Herhangi bir mevduat faizi bulunmamaktadır.
        </Typography>
      )}
        <Grid item xs={12}>
          {deposit.map((b, i) => (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ width: "50%", flexShrink: 0 }}>
                  {b.bankName}
                </Typography>
                <Typography>Aylık Faiz Oranı %{b.interest}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={center}>
                  Mevduat Tutar: {b.money} TL
                </Typography>
                <Typography sx={center}>
                  {b.time} ay vade sonunda alınacak faiz :{b.interestAmount} TL
                </Typography>
                <Typography sx={center}>
                  {b.time} ay vade sonunda toplam mevduat: {b.deposit} TL
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
