import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Timeline from '@material-ui/lab/Timeline';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import SelectedItem from './SelectedItem';
SelectedList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};
SelectedList.defaultProps = {
  list: [],
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexGrow: 1,
  },
  timeline: {
    borderRadius: '10px',
    padding: 8,
    flexGrow: 1,
    backgroundColor: 'blue',
  },
  list: {},
  noItems: {
    flexBasis: '100%',
    flexGrow: 1,
    marginTop: '3rem',
  },
}));

export default function SelectedList({ droppableId, list }) {
  const classes = useStyles();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <div className={classes.root}>
      <div className={classes.list}>
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) =>
            list.length === 0 ? (
              <div className={classes.noItems}>
                <Typography variant="h4" id="standard-full-width" label="Search">
                  No Items Selected
                </Typography>
              </div>
            ) : (
              <Timeline
                align={smDown ? 'left' : 'alternate'}
                ref={provided.innerRef}
                className={classes.timeline}
                style={{
                  background: snapshot.isDraggingOver ? '#f5f5f5' : '	white',
                }}
              >
                {list.map((item, index) => {
                  let currentTotalTime = list
                    .slice(0, index)
                    .map((itm) => parseInt(itm.totalMinutes))
                    .reduce((accumulater, element) => accumulater + element, 0);
                  return (
                    <Draggable key={item.dayItemId} draggableId={`drag-${item.dayItemId}`} index={index}>
                      {(provided, snapshot) => (
                        <SelectedItem
                          index={index}
                          currentTotalTime={currentTotalTime}
                          item={item}
                          snapshot={snapshot}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Timeline>
            )
          }
        </Droppable>
      </div>
    </div>
  );
}
