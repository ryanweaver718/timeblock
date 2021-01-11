import Filter1Icon from '@material-ui/icons/Filter1Rounded';
import Filter2Icon from '@material-ui/icons/Filter2Rounded';
import Filter3Icon from '@material-ui/icons/Filter3Rounded';
import Filter4Icon from '@material-ui/icons/Filter4Rounded';
import TimelineDot from '@material-ui/lab/TimelineDot';
import useTheme from '@material-ui/styles/useTheme';
import get from 'lodash/get';
import PropTypes from 'prop-types';

ItemIcon.propTypes = {
  showInverseColor: PropTypes.bool.isRequired,
  priority: PropTypes.string.isRequired,
};

const iconsObject = { 1: Filter1Icon, 2: Filter2Icon, 3: Filter3Icon, 4: Filter4Icon };

export default function ItemIcon({ priority, showInverseColor }) {
  const theme = useTheme();
  const itemColor = theme.palette.priorities[priority].main;
  const PriorityIcon = get(iconsObject, priority, null);
  return (
    <TimelineDot
      variant={showInverseColor ? 'outlined' : 'default'}
      color="inherit"
      style={{
        color: itemColor,
        backgroundColor: showInverseColor ? 'white' : itemColor,
      }}
    >
      {PriorityIcon ? (
        <PriorityIcon
          style={{
            color: showInverseColor ? itemColor : 'white',
            backgroundColor: showInverseColor ? 'white' : itemColor,
          }}
        />
      ) : null}
    </TimelineDot>
  );
}
