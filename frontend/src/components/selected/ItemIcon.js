import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter4Icon from '@material-ui/icons/Filter4';
import makeStyles from '@material-ui/styles/makeStyles';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { getItemColor } from '../utils';

ItemIcon.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  isHovering: PropTypes.bool.isRequired,
  priority: PropTypes.string.isRequired,
};

const useStyles = makeStyles(() => ({
  icon: ({ priority, isDragging, isHovering }) => ({
    backgroundColor: getItemColor(isDragging, isHovering, priority),
  }),
}));

const iconsObject = { 1: Filter1Icon, 2: Filter2Icon, 3: Filter2Icon, 4: Filter4Icon };

export default function ItemIcon({ priority, isDragging, isHovering }) {
  const classes = useStyles({
    isDragging,
    isHovering,
    priority,
  });
  const PriorityIcon = get(iconsObject, priority, null);
  return PriorityIcon ? <PriorityIcon className={classes.icon} /> : null;
}
