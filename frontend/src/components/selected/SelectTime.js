import DateFnsUtils from '@date-io/date-fns';
import makeStyles from '@material-ui/styles/makeStyles';
import { KeyboardTimePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';

const useStyles = makeStyles(() => ({
  time: { marginRight: '2rem' },
  date: { marginRight: '2rem' },
}));

export default function SelectTime() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleDateChange = (date) => {
    dispatch(itemsActions.updateSelectedDateAction({ date }));
  };
  const handleTimeChange = (time) => {
    dispatch(itemsActions.updateSelectedTimeAction({ time }));
  };
  const { selectedTime, selectedDate } = useSelector(({ items }) => ({
    selectedTime: items.selectedTime,
    selectedDate: items.selectedDate,
  }));
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        className={classes.date}
        id="date-picker-inline"
        label="Date"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
      <KeyboardTimePicker
        classes={classes.time}
        id="time-picker"
        label="Time"
        variant="outlined"
        value={selectedTime}
        onChange={handleTimeChange}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
