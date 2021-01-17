import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import RestoreIcon from '@material-ui/icons/Restore';
import SaveIcon from '@material-ui/icons/Save';
import TodayIcon from '@material-ui/icons/Today';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { createDay, deleteDay } from 'store/items/itemsThunks';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  actionsRow: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    color: theme.palette.primary.main,
  },
  buttonGroup: {},
  viewSelect: {
    display: 'flex',
  },
  item: {
    display: 'flex',
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSmDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const actions = [
    { Icon: SaveIcon, name: 'Save', handler: () => void dispatch(createDay()) },
    { Icon: ClearIcon, name: 'Reset', handler: () => void dispatch(ia.clearDailyScheduleAction()) },
    { Icon: DeleteIcon, name: 'Erase Day', handler: () => void dispatch(deleteDay()) },
    { Icon: RestoreIcon, name: 'Reset Time', handler: () => void dispatch(ia.resetAllDayTimes()) },
  ];

  return (
    <div className={classes.actionsRow}>
      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <div className={classes.viewSelect}>
          <IconButton>
            <ListIcon />
          </IconButton>
          <div>List</div>
        </div>
        <div className={classes.viewSelect}>
          <IconButton>
            <TodayIcon />
          </IconButton>
          <div>List</div>
        </div>
      </ButtonGroup>

      {actions.map(({ name, Icon, handler }) => (
        <div key={`btn-${name}`} className={classes.item}>
          <IconButton className={classes.icon} onClick={() => handler()}>
            <Icon /> {!isSmDown && <Typography>{name}</Typography>}
          </IconButton>
        </div>
      ))}
    </div>
  );
}
