import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '.25rem',
  },
  input: {
    width: '2rem',
    border: 'none',
    borderBottom: '1px solid black',
    textAlign: 'center',
  },
  icon: {
    fontSize: '.75rem',
  },
  displayWord: {
    fontSize: '90%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'flex-end',
  },
}));

const NumberInput = ({ item, type }) => {
  const classes = useStyles();
  const [displayNumber, setDispalyNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const max = type === 'hours' ? 24 : 60;
  const displayWord = type === 'hours' ? 'hr' : 'min';
  const minutes = parseInt(item.totalMinutes);
  const hoursTotal = Math.floor(minutes / 60);
  const minutesTotal = minutes % 60;
  const value = type === 'hours' ? hoursTotal : minutesTotal;

  useEffect(() => {
    setDispalyNumber(value);
  }, [value]);

  const handleTimeUpdate = (number, setType) => {
    if (!isNaN(number)) {
      if (setType === 'add' || (number >= 0 && number < max)) {
        setShowError(false);
        dispatch(ia.updateSelectedItemTotalTimeAction({ dayItemId: item.dayItemId, type, number, setType }));
      } else {
        setShowError(true);
      }
    } else {
      setDispalyNumber('');
      dispatch(ia.updateSelectedItemTotalTimeAction({ dayItemId: item.dayItemId, type, number: 0, setType }));
    }
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={() => void handleTimeUpdate(-1, 'add')}>
        <RemoveIcon className={classes.icon} />
      </IconButton>
      <input
        className={classes.input}
        value={displayNumber}
        onChange={(e) => void handleTimeUpdate(parseInt(e.target.value), 'set')}
      />
      {showError && <div>Error</div>}
      <div className={classes.displayWord}>{displayWord}</div>
      <IconButton onClick={() => void handleTimeUpdate(1, 'add')}>
        <AddIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

NumberInput.propTypes = {
  type: PropTypes.string.isRequired,

  item: PropTypes.object.isRequired,
};

export default NumberInput;
