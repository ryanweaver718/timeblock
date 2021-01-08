
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { KeyboardTimePicker,KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';


export default function SelectTime() {
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    dispatch(itemsActions.updateSelectedDateAction({ date }));
  };
  const handleTimeChange = (time) => {
    dispatch(itemsActions.updateSelectedTimeAction({ time }));
  };
  //save it
  const {selectedTime, selectedDate} = useSelector(({items})=>({selectedTime: items.selectedTime, selectedDate: items.selectedDate}));
  //what now
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        justify="space-around"
        style={{ marginTop: '2.25rem', marginBottom: '.85rem', marginRight: '1rem', marginLeft: '1rem' }}
      >
         <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          style={{flexGrow:"1",margin:'2rem'}}
          id="date-picker-inline"
          label="Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          style={{flexGrow:"1", margin:'2rem'}}
          id="time-picker"
          label="Time"
          variant="outlined"
          value={selectedTime}
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
