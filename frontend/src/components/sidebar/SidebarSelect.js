import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import useTheme from '@material-ui/core/styles/useTheme';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import ListAltIcon from '@material-ui/icons/ListAlt';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { priorityKeysHigh } from '../../constants';
import { appActions as aa } from 'store/app/appReducer';
// const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  showSearch: ({ showSearchItems }) => ({
    color: clsx({ [theme.palette.primary.main]: showSearchItems }),
  }),
  pickText: {
    display: 'flex',
    alignItems: 'center',
  },
  visible: ({ showSearchItems }) => ({
    marginLeft: '1rem',
    color: showSearchItems ? theme.palette.primary.main : theme.palette.grey.dark,
  }),
  search: {
    marginBottom: 20,
    marginRight: '1rem',
    marginLeft: '1rem',
  },
  button: {},
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorities: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  priority: {
    paddingLeft: '.25rem',
    paddingRight: '.25rem',
  },
}));

export default function SidebarSelect() {
  const dispatch = useDispatch();
  const { showSearchItems, searchText, searchPriorities } = useSelector(({ items, app }) => ({
    showSearchItems: items.showSearchItems,
    searchText: app.search.text,
    searchPriorities: app.search.priorities,
  }));
  const theme = useTheme();
  const handleToggleSearchItems = () => void dispatch(ia.toggleSearchItems());
  const handleSearchChange = (e) => void dispatch(aa.setSearchText({ text: e.target.value }));
  const updatePriorityList = (priority) => dispatch(aa.setSearchPriorities({ priority }));
  const classes = useStyles({ showSearchItems });
  return (
    <div className={classes.root}>
      <ListItem button onClick={handleToggleSearchItems} className={classes.showSearch}>
        <ListItemIcon>
          <ListAltIcon className={classes.showSearch} />
        </ListItemIcon>
        <ListItemText
          primary={
            <div className={classes.pickText}>
              {`Pick Items`} <Switch color="primary" checked={showSearchItems} className={classes.visible} />
            </div>
          }
          primaryTypographyProps={{ variant: 'p' }}
          className={classes.text}
        />
      </ListItem>
      <ListItem>
        <TextField
          id="standard-full-width"
          label="Search"
          className={classes.search}
          placeholder="Search Items"
          onChange={handleSearchChange}
          value={searchText}
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </ListItem>
      <ListItem>
        <div className={classes.priorities}>
          {priorityKeysHigh.map((priority) => {
            const color = theme.palette.priorities[priority.toString()].main;
            const Icon = searchPriorities.includes(priority) ? TurnedInIcon : TurnedInNotIcon;
            return (
              <IconButton
                className={classes.priority}
                key={`priority-${priority}`}
                onClick={() => updatePriorityList(priority)}
              >
                <Icon style={{ color }} />
              </IconButton>
            );
          })}
        </div>
      </ListItem>
    </div>
  );
}
