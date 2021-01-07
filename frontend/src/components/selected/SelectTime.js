
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';


export default function SelectTime() {
  const dispatch = useDispatch();
  const handleDateChange = (date) => {
    dispatch(itemsActions.updateSelectedDateAction({ date }));
  };
  const {selectedDate} = useSelector(({items})=>({selectedDate: items.selectedDate}))
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        justify="space-around"
        style={{ marginTop: '2.25rem', marginBottom: '.85rem', marginRight: '1rem', marginLeft: '1rem' }}
      >
        <KeyboardTimePicker
          margin="normal"
          fullWidth={true}
          id="time-picker"
          label="Time picker"
          variant="outlined"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
