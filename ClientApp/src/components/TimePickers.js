import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export const TimePickers=({setTime})=> {

  const [tradeDate,setTradeDate] = React.useState(dayjs('2022-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setTime(JSON.stringify(tradeDate.$d));
   
  };


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
    
        <DateTimePicker
          label="Date&Time picker"
          value={tradeDate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}