import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SelectTime from './SelectTime';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexBasis: '100%',
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
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h4" className={classes.heading}>
          Daily Schedule
        </Typography>
        <SelectTime />
      </div>
    </div>
  );
}
