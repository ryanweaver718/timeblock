import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

SidebarItem.propTypes = {
  Icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};
export default function SidebarItem({ Icon, text, handler }) {
  return (
    <ListItem button onClick={handler}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}
