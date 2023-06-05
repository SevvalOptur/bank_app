"use client";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { nanoid } from "nanoid";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export default function bankEkle() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [listBanka, setListBanka] = useState([]);
  const [bankName, setBankName] = useState("");
  const [type, setType] = useState(""); //kredi türü
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState();
  const [time, setTime] = useState(""); //kredi vadesi
  const [interest, setInterest] = useState(""); //kredi faizi
  const [typeOptions, setTypeOptions] = useState([]);
  const bankID = nanoid();
  // const [timeOption, setTimeOption] = useState([]);

  const typeOption = [
    {type:1, value:"1", text: "Konut"},
    {type:2, value:"2", text: "Tüketici"},
    {type:3, value:"3", text: "Mevduat"},
  ];

  // const timeOption = [
  //   { type: 1, value: "5", text: "5 Yıl" },
  //   { type: 1, value: "10", text: "10 Yıl" },
  //   { type: 2, value: "12", text: "12 Ay" },
  //   { type: 2, value: "24", text: "24 Ay" },
  //   { type: 2, value: "36", text: "36 Ay" },
  //   { type: 3, value: "3", text: "3 Ay" },
  //   { type: 3, value: "6", text: "6 Ay" },
  //   { type: 3, value: "12", text: "12 Ay" },
  // ];
  const timeOption = [
    { type: 1, valueT:"1", textT: "Konut", value: "5", text: "5 Yıl" },
    { type: 1, valueT:"1", textT: "Konut", value: "10", text: "10 Yıl" },
    { type: 2, valueT:"2", textT: "Tüketici", value: "12", text: "12 Ay" },
    { type: 2, valueT:"2", textT: "Tüketici", value: "24", text: "24 Ay" },
    { type: 2, valueT:"2", textT: "Tüketici", value: "36", text: "36 Ay" },
    { type: 3, valueT:"3", textT: "Mevduat", value: "3", text: "3 Ay" },
    { type: 3, valueT:"3", textT: "Mevduat", value: "6", text: "6 Ay" },
    { type: 3, valueT:"3", textT: "Mevduat", value: "12", text: "12 Ay" },
  ];
  const uniqueOptions = [];
  const uniqueKeys = [];

  timeOption.forEach((option) => {
    if (!uniqueKeys.includes(option.valueT)) {
      uniqueKeys.push(option.valueT);
      uniqueOptions.push(option);
    }
  });


  const handleBankAdd = () => {
    setListBanka([
      ...listBanka,
      {
        bankName: bankName,
        id: bankID,
        item: [{ type: type, time: time, interest: interest }],
      },
    ]);
    handleClose();
  };
  const handleBankRemove = (index) => {
    const list = [...listBanka];
    list.splice(index, 1);
    setListBanka(list);
  };

  const handleRateAdd = (id) => {
    let listBankItem = listBanka.map((listItem) => {
      if (listItem.id == id) {
        listItem.item.push({ type: type, time: time, interest: interest });
      }
      return listItem;
    });
    setListBanka(listBankItem);
    console.log("listBanka", listBanka);
  };
  const handleRateRemove = (i, id) => {
    let listBankRemove = listBanka.map((listItem) => {
      if (listItem.id == id) {
        listItem.item.splice(i, 1);
      }
      return listItem;
    });
    setListBanka(listBankRemove);
    console.log("listBanka", listBanka);
  };

  const handleRateChange = (e, i, id) => {
    const { name, value } = e.target;
    let bankItem = listBanka.map((listItem) => {
      console.log("deneme", listItem.item);

      // const filteredArray1 = timeOption.filter((item1) => {
      //   return !listItem.item.some((item2) => item1.type == item2.type && item1.value == item2.time);
      // });
    
      // const removedData = timeOption.filter((item1) => !filteredArray1.includes(item1));
      // console.log("Çıkarılan Veri:", removedData);
      
    
      if (listItem.id == id) {
        listItem.item.map((m, index) => {
          if (index == i) {
            if (name == "type") {
              if (value == 1 || value == 2 || value == 3) {
                setDisabled(false);
              }
            }
            if (name == "interest") {
              const regex = /^\d*[0-9](|.\d{2}|,\d{2})?$/;
              if (value === "" || regex.test(value)) {
                setError(false);
              } else {
                setError(true);
              }
            }
            m[name] = value;
            return m;
          }
        });
      }

      return listItem;
    });
    setListBanka(bankItem);
  };

  const rateSubmit = () => {
    let itemFaizOran = listBanka.map((listItem) => {
      listItem.item.map((item) => {
        if (item.type !== "" && item.time !== "" && item.interest !== "") {
          const regex = /^\d*[0-9](|.\d{2}|,\d{2})?$/;
          if (item.interest === "" || regex.test(item.interest)) {
            localStorage.setItem("data", JSON.stringify(listBanka));
            console.log("Kayıt Başarılı");
          } else {
            console.log("Kayıt Başarısız");
          }
        }
      });
      return listItem;
    });
  };
  console.log("bankalar", listBanka)

  return (
    <>
      <Box sx={center}>
        <Button variant="contained" onClick={handleOpen}>
          Banka Ekle
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            align="center"
            variant="h6"
            component="h2"
          >
            Banka Adı
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    sx: {
                      color: "black !important",
                      "&:focus-within fieldset, &:focus-visible fieldset": {
                        border: "1px solid #0099ff!important",
                      },
                    },
                  }}
                  required
                  fullWidth
                  name="bankName"
                  type="text"
                  id="bankName"
                  onChange={(e) => {
                    setBankName(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={center} marginTop="1rem">
              <Button
                variant="contained"
                color="success"
                onClick={handleBankAdd}
              >
                Ekle
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
      {listBanka.length == 0 && (
        <Typography sx={center} marginTop="1rem">
          Herhangi bir banka bulunmamaktadır.
        </Typography>
      )}
      <Grid container marginTop={3}>
        <Grid item xs={12}>
          {listBanka.map((b, i) => (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{b.bankName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid xs={12}>
                  <Button
                    sx={{ float: "right" }}
                    variant="contained"
                    color="error"
                    onClick={() => handleBankRemove(i)}
                  >
                    Sil
                  </Button>
                </Grid>
                <Grid container xs={12}>
                  <Grid item xs={12}>
                    <IconButton
                      sx={{ float: "right" }}
                      aria-label="delete"
                      size="large"
                      onClick={() => handleRateAdd(b.id)}
                    >
                      <AddIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </Grid>
                {b.item.map((a, i) => (
                  <Grid key={i} container spacing={2}>
                    <Grid item xs={3}>
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl
                          required
                          sx={{ m: 1, minWidth: 120 }}
                          size="small"
                        >
                          <InputLabel id="demo-select-small-label">
                            Tür
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            name="type"
                            value={a.type}
                            onChange={(e) => handleRateChange(e, i, b.id)}
                          >
                          {uniqueOptions.map((uniqueOptions) => (
                              <MenuItem
                                key={uniqueOptions.valueT}
                                value={uniqueOptions.valueT}
                              >
                                {uniqueOptions.textT}
                              </MenuItem>
                            ))}
                            {/* <MenuItem value={1}>Konut</MenuItem>
                            <MenuItem value={2}>Tüketici</MenuItem>
                            <MenuItem value={3}>Mevduat</MenuItem> */}
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
                          <InputLabel id="demo-select-small-label">
                            Vade
                          </InputLabel>
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            name="time"
                            value={a.time}
                            onChange={(e) => handleRateChange(e, i, b.id)}
                          >
                            {timeOption.filter((time) => time.type == a.type)
                              .map((timeOption) => (
                                <MenuItem
                                  key={timeOption.value}
                                  value={timeOption.value}
                                >
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
                          value={a.interest}
                          name="interest"
                          variant="outlined"
                          label="Aylık Faiz Oranı"
                          size="small"
                          error={error}
                          helperText="virgülden sonra maks 2 basamak"
                          onChange={(e) => handleRateChange(e, i, b.id)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={2}>
                      <Box sx={{ m: 1 }}>
                        <Button
                          variant="contained"
                          sx={{ marginRight: 1 }}
                          onClick={rateSubmit}
                        >
                          Kaydet
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRateRemove(i, b.id)}
                        >
                          Sil
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
