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
  const [type, setType] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [time, setTime] = useState("");
  const [money, setMoney] = useState("");
  const [credit, setCredit] = useState([]);

  const timeOption = [
    { type: 1, value: "5", text: "5 Yıl" },
    { type: 1, value: "10", text: "10 Yıl" },
    { type: 2, value: "12", text: "12 Ay" },
    { type: 2, value: "24", text: "24 Ay" },
    { type: 2, value: "36", text: "36 Ay" },
  ];

  const handleChange = (event) => {
    setType(event.target.value);
    const type = event.target.value;
    if (type == 1 || type == 2 || type == 3) {
      setDisabled(false);
    }
  };

  const creditSearch = () => {
    console.log(type, time, money);
    if (time !== "" && money !== "") {
      // const mevduat = {time:time, money:money}
      // console.log("data", mevduat)
      const localStorageGet = localStorage.getItem("data");
      const bank = JSON.parse(localStorageGet);
      let bankMevduat = bank.map((listItem) => {
        const bankName = listItem.bankName;
        listItem.item.map((item) => {
          if (item.type === 1) {
            console.log("başarılı");
            // if(item.time == time){
            const interest = item.interest / 100;
            const time = item.time * 12;
            const cash = parseFloat(money);
            const monthlyPayment = (
              cash *
              ((interest * (1 + interest) ** time) / ((1 + interest) ** time - 1))
            ).toFixed(2);
            const allCredit = (monthlyPayment * time).toFixed(2);
            setCredit([
              ...credit,
              {
                bankName: bankName,
                type: "Konut",
                time: item.time,
                cash: money,
                interest: item.interest,
                monthlyPayment: monthlyPayment,
                allCredit: allCredit,
              },
            ]);
            console.log("sonuc", credit);
            //     return mevduat;
            // }
          }
          if (item.type === 2) {
            console.log("başarılı");
            // if(item.time == time){
            const interest = item.interest / 100;
            const time = item.time;
            const cash = parseFloat(money);
            const monthlyPayment = (
              cash *
              ((interest * (1 + interest) ** time) / ((1 + interest) ** time - 1))
            ).toFixed(2);
            const allCredit = (monthlyPayment * time).toFixed(2);
            setCredit([
              ...credit,
              {
                bankName: bankName,
                type: "Tüketici",
                time: item.time,
                cash: money,
                interest: item.interest,
                monthlyPayment: monthlyPayment,
                allCredit: allCredit,
              },
            ]);
            console.log("sonuc", credit);
            //     return mevduat;
            // }
          }
          return item;
        });
        return listItem;
      });
      console.log("banka", bank);
      console.log("oldu");
    } else {
      console.log("olmadı");
    }
  };

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
                name="type"
                value={type}
                label="Tür"
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
            <FormControl
              required
              disabled={disabled}
              sx={{ m: 1, minWidth: 120 }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Vade</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                name="time"
                value={time}
                label="Age"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              >
                {timeOption
                  .filter((time) => time.type == type)
                  .map((timeOption) => (
                    <MenuItem key={timeOption.value} value={timeOption.value}>
                      {timeOption.text}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ m: 1, minWidth: 120 }}>
            <TextField
              type="number"
              value={money}
              name="money"
              variant="outlined"
              label="Kredi Miktarı"
              id="outlined-size-small"
              size="small"
              onChange={(e) => {
                setMoney(e.target.value);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box sx={{ m: 1 }}>
            <Button variant="contained" onClick={creditSearch}>
              Bul
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container marginTop={3}>
        {credit.length == 0 && (
          <Typography sx={center} marginTop="1rem">
            Herhangi bir mevduat faizi bulunmamaktadır.
          </Typography>
        )}
        <Grid item xs={12}>
        {credit.map((b, i) => (
            <Accordion key={i}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ width: "50%", flexShrink: 0 }}>
                {b.bankName}
              </Typography>
              <Typography>Toplam Geri Ödeme: {b.allCredit}TL</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={center}>
                Hesaba Yatacak Tutar: {b.cash} TL
              </Typography>
              <Typography sx={center}>
                {b.type } Kredisi - {b.time} vade - aylık faiz %{b.interest}
              </Typography>
              <Typography sx={center}>Aylık ödeme {b.monthlyPayment} TL</Typography>
            </AccordionDetails>
          </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
