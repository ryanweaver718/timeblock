import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import NumberInput from './NumberInput';

const useStyles = makeStyles((theme) => ({
  editDuration: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '.5rem',
    },
  },
}));

Details.propTypes = {
  item: PropTypes.object.isRequired,
  hoursTotal: PropTypes.number.isRequired,
  minutesTotal: PropTypes.number.isRequired,
};
export default function Details({ item, hoursTotal, minutesTotal }) {
  const classes = useStyles({ priority: item.priority });

  return (
    <div>
      <div className={classes.editDuration}>
        <NumberInput hoursTotal={hoursTotal} dayItemId={item.dayItemId} minutesTotal={minutesTotal} type={'hours'} />
        <NumberInput hoursTotal={hoursTotal} dayItemId={item.dayItemId} minutesTotal={minutesTotal} type={'minutes'} />
      </div>
    </div>
  );
}
