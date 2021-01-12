import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { createDay, deleteDay, test } from 'store/items/itemsThunks';
import SelectTime from './SelectTime';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  filterOn: {
    color: theme.palette.primary.main,
  },
  header: {
    flexBasis: '100%',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  actionsRow: {
    flexBasis: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonGroup: {},
  heading: {
    paddingRight: '3rem',
  },
  list: {
    flexBasis: '100%',
  },
  speedDial: {
    marginTop: '1.5rem',
    // position: 'absolute',
    zIndex: 3,
    // height: '1rem',
    // width: '1rem',
  },
  fab: {
    width: '',
  },
  speedDialRoot: {
    width: '.5rem',
    height: '.5rem',
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const actions = [
    { Icon: <SaveIcon />, name: 'Save', handler: () => void dispatch(createDay()) },
    { Icon: <ClearIcon />, name: 'Reset Day', handler: () => void dispatch(ia.clearDailyScheduleAction()) },
    { Icon: <DeleteIcon />, name: 'Delete Day', handler: () => void dispatch(deleteDay()) },
    { Icon: <></>, name: 'TEST', handler: () => void dispatch(test()) },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" className={classes.heading}>
          Daily Schedule
        </Typography>
        <SelectTime />
      </div>
      <div className={classes.actionsRow}>
        <ButtonGroup
          className={classes.buttonGroup}
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          {actions.map(({ name, Icon, handler }) => (
            <Button key={name} startIcon={Icon} onClick={() => handler()}>
              {name}
            </Button>
          ))}
        </ButtonGroup>
       
      </div>
    </div>
  );
}
