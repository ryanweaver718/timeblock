import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ItemIcon from './ItemIcon';
import NumberInput from './NumberInput';

const useStyles = makeStyles(() => ({
  paper: { padding: '6px 16px' },

  itemRow: {
    display: 'flex',
  },
  timeInputs: ({ isEven }) => ({
    display: 'flex',
    flexDirection: isEven ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '6rem',
  }),
  inputBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  inputs: {
    width: '3rem',
    border: 'none',
    borderBottom: '1px solid black',
    marginRight: '1rem',
    marginLeft: '1rem',
  },
}));

SelectedItem.propTypes = {
  item: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  snapshot: PropTypes.object.isRequired,
  currentTotalTime: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
export default function SelectedItem({ item, provided, snapshot, currentTotalTime, index }) {
  const [isHovering, setIsHovering] = useState(false);
  const isEven = index === 0 || index % 2 === 0;
  const { startTime } = useSelector(({ items }) => ({ startTime: items.startTime }));
  const classes = useStyles({ isEven });
  const calculatedTime = moment(startTime).add(parseInt(currentTotalTime), 'minutes').format('hh:mm a');
  return (
    <TimelineItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <TimelineOppositeContent>
        <Typography variant="body2" color="textSecondary">
          {calculatedTime}
        </Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <ItemIcon showInverseColor={isHovering || snapshot.isDragging} priority={item.priority} />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent>
        <Paper elevation={4} className={classes.timeInputs} classes={{ root: classes.timeInputs }}>
          <div className={classes.inputBox}>
            <NumberInput item={item} type={'hours'} />
            <NumberInput item={item} type={'minutes'} />
          </div>
          <Typography variant="h6" component="h1" style={{ paddingRight: '1rem', paddingLeft: '1rem' }}>
            {item.name}
          </Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
}
