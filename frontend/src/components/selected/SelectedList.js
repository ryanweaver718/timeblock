import Timeline from '@material-ui/lab/Timeline';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import SelectedItem from './SelectedItem';
import useTheme from '@material-ui/styles/useTheme';
import Typography from '@material-ui/core/Typography';

SelectedList.propTypes = {
  droppableId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};
SelectedList.defaultProps = {
  list: [],
};

export default function SelectedList({ droppableId, list }) {
  const theme = useTheme();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <Timeline
            align={theme.breakpoints.down('sm') ? 'alternate' : 'alternate'}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? '#f5f5f5' : '	white',
              borderRadius: '10px',
              padding: 8,
              flexGrow: 1,
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
        )}
      </Droppable>
      {list.length === 0 && <div style={{ flexBasis: '100%', flexGrow: 1, }}>
        <Typography variant="h3" id="standard-full-width" label="Search">
          Hello World
        </Typography>
      </div>}
    </div>
  );
}
