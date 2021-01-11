import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { test, createDay, deleteDay } from 'store/items/itemsThunks';
import SelectTime from './SelectTime';
import DeleteIcon from '@material-ui/icons/Delete';
import { itemsActions as ia } from 'store/items/itemsReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
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
  const [open, setOpen] = useState(false);

  const handleClose = () => void setOpen(false);
  const handleOpen = () => void setOpen(true);

  const actions = [
    { icon: <SaveIcon />, name: 'Save', handler: () => void dispatch(createDay()) },
    { icon: <ClearIcon />, name: 'Reset Day', handler: () => void dispatch(ia.clearDailyScheduleAction()) },
    { icon: <DeleteIcon />, name: 'Delete Day', handler: () => void dispatch(deleteDay()) },
    { icon: <div>TEST</div>, name: 'TEST', handler: () => void dispatch(test()) },
  ];

  const speedDialHandler = (callback) => {
    callback();
    handleClose();
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" className={classes.heading}>
          Daily Schedule
        </Typography>
        <SelectTime />
      </div>
      <div>
        <SpeedDial
          classes={{ fab: classes.fab }}
          ariaLabel="Selected Menu"
          className={classes.speedDial}
          hidden={false}
          icon={open ? <CloseIcon /> : <MoreVertIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={'down'}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              tooltipOpen
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => speedDialHandler(action.handler)}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}
