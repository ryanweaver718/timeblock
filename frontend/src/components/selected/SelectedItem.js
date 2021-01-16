import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import NumberInput from './NumberInput';

const useStyles = makeStyles((theme) => ({
  itemRow: {
    display: 'flex',
  },
  editDuration: {
    borderRadius: '1rem',
    paddingLeft: '.5rem',
    display: 'flex',
  },
  showDuration: {
    paddingLeft: '.5rem',
  },
  priority: ({ priority }) => ({
    color: theme.palette.priorities[priority].main,
  }),
  editIcon: {
    fontSize: '1rem',
  },
  name: {
    paddingLeft: '.5rem',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexBasis: '100%',
    paddingLeft: '1rem',
  },
  titleRow: {
    display: 'flex',
    flexBasis: '100%',
    alignItems: 'flex-start',
    paddingLeft: '1rem',
  },
  durationRow: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingTop: '.1rem',
    paddingLeft: '3.5rem',
  },
  startTime: {
    paddingLeft: '0rem',
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  inputs: {
    width: '3rem',
    border: 'none',
    borderBottom: '1px solid black',
    marginRight: '1rem',
    marginLeft: '1rem',
  },
  close: {
    marginRight: '.5rem',
  },
}));

SelectedItem.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  currentTotalTime: PropTypes.number.isRequired,
};
export default function SelectedItem({ item, snapshot, provided, currentTotalTime }) {
  const { startTime } = useSelector(({ items }) => ({ startTime: items.startTime }));
  const classes = useStyles({ priority: item.priority });
  const [edit, setEdit] = useState(false);
  const calculatedTime = moment(startTime).add(parseInt(currentTotalTime), 'minutes').format('hh:mm a');
  const dispatch = useDispatch();
  const removeItem = () => void dispatch(ia.deleteItemAction({ dayItemId: item.dayItemId }));
  const hoursTotal = Math.floor(parseInt(item.totalMinutes) / 60);
  const minutesTotal = parseInt(item.totalMinutes) % 60;

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Paper elevation={4} className={classes.root}>
        <div className={classes.topRow}>
          <Typography variant="body2" color="textSecondary" className={classes.startTime}>
            {!snapshot.isDragging && calculatedTime}
          </Typography>
          <IconButton onClick={removeItem} className={classes.close}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className={classes.titleRow}>
          <IconButton className={classes.priority} onClick={() => void setEdit((edit) => !edit)}>
            {edit ? <TurnedInNotIcon /> : <TurnedInIcon />}
          </IconButton>
          <Typography variant="h6" component="h1" className={classes.name}>
            {item.name}
          </Typography>
        </div>
        <div className={classes.durationRow}>
          <Typography variant="body2" color="textSecondary">
            Duration:
          </Typography>
          {edit ? (
            <div className={classes.editDuration}>
              <NumberInput
                hoursTotal={hoursTotal}
                dayItemId={item.dayItemId}
                minutesTotal={minutesTotal}
                type={'hours'}
              />
              <NumberInput
                hoursTotal={hoursTotal}
                dayItemId={item.dayItemId}
                minutesTotal={minutesTotal}
                type={'minutes'}
              />
            </div>
          ) : (
            <Typography variant="body2" color="textSecondary" className={classes.showDuration}>
              {`${hoursTotal} hr ${minutesTotal} min`}
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  );
}
