import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import makeStyles from '@material-ui/styles/makeStyles';
import 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import { getDay } from 'store/items/itemsThunks';

const useStyles = makeStyles(() => ({
  time: { marginRight: '2rem' },
  date: { marginRight: '2rem' },
}));

export default function SelectTime() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDateChange = (date) => {
    dispatch(getDay({ selectedDate: date }));
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
        autoOk={true}
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        disablePast={true}
        inputVariant="outlined"
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
        // classes={classes.time}
        id="time-picker"
        autoOk={true}
        // label="Time"
        inputVariant="outlined"
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
