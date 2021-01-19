import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';

const getTime = (hr, min) => {
  let time = 'Time: ';
  if (hr) {
    time += `${hr} hr `;
  }
  time += `${min} min`;
  return time;
};

const useStyles = makeStyles((theme) => ({
  priority: ({ priority }) => ({
    color: theme.palette.priorities[priority].main,
  }),
  name: {
    paddingLeft: '.5rem',
    fontSize: theme.typography.pxToRem(15),
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexBasis: '100%',
  },
  titleRow: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  duration: {
    marginLeft: '1rem',
    fontSize: theme.typography.pxToRem(12),
  },
  startTime: {
    paddingLeft: '0rem',
    fontSize: theme.typography.pxToRem(12),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // flexGrow: 1,
  },
  close: {
    marginRight: '.5rem',
  },
}));

Summary.propTypes = {
  item: PropTypes.object.isRequired,
  isDragging: PropTypes.bool.isRequired,
  calculatedTime: PropTypes.any.isRequired,
  hoursTotal: PropTypes.number.isRequired,
  minutesTotal: PropTypes.number.isRequired,
};
export default function Summary({ item, isDragging, calculatedTime, hoursTotal, minutesTotal }) {
  const classes = useStyles({ priority: item.priority });
  const dispatch = useDispatch();
  const removeItem = () => void dispatch(ia.deleteItemAction({ dayItemId: item.dayItemId }));

  return (
    <div className={classes.root}>
      <div className={classes.topRow}>
        <Typography variant="body2" color="textSecondary" className={classes.startTime}>
          {!isDragging && calculatedTime}
        </Typography>
        <IconButton onClick={removeItem} className={classes.close}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className={classes.titleRow}>
        <IconButton className={classes.priority}>
          <TurnedInIcon />
        </IconButton>
        <Typography variant="h6" className={classes.name}>
          {item.name}
        </Typography>
        <Typography className={classes.duration} color="textSecondary">
          {getTime(hoursTotal, minutesTotal)}
        </Typography>
      </div>
      <div className={classes.detailsGrid}>
        <Typography>{item.details}</Typography>
      </div>
    </div>
  );
}
