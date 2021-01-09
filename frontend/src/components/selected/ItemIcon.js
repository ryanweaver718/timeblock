import Filter1Icon from '@material-ui/icons/Filter1Rounded';
import Filter2Icon from '@material-ui/icons/Filter2Rounded';
import Filter3Icon from '@material-ui/icons/Filter3Rounded';
import Filter4Icon from '@material-ui/icons/Filter4Rounded';
import makeStyles from '@material-ui/styles/makeStyles';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { getItemColor } from '../utils';

ItemIcon.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  isHovering: PropTypes.bool.isRequired,
  priority: PropTypes.string.isRequired,
};

const useStyles = makeStyles(() => ({
  icon: ({ priority, isDragging, isHovering }) => ({
    color: 'white',
    backgroundColor: getItemColor(isDragging, isHovering, priority),
  }),
  dot: ({ priority, isDragging, isHovering }) => ({
    backgroundColor: getItemColor(isDragging, isHovering, priority),
  }),
}));

const iconsObject = { 1: Filter1Icon, 2: Filter2Icon, 3: Filter3Icon, 4: Filter4Icon };

export default function ItemIcon({ priority, isDragging, isHovering }) {
  const classes = useStyles({
    isDragging,
    isHovering,
    priority,
  });
  const PriorityIcon = get(iconsObject, priority, null);
  return (
    <TimelineDot className={classes.dot}>{PriorityIcon ? <PriorityIcon className={classes.icon} /> : null}</TimelineDot>
  );
}
