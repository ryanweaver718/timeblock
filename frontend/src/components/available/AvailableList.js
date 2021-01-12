import List from '@material-ui/core/List';
import has from 'lodash/has';
import invert from 'lodash/invert';
import PropTypes from 'prop-types';
import { priorities } from '../../constants';
import Item from './AvailableItem';

const invertedPriorities = invert(priorities);

AvailableList.propTypes = {
  list: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};
AvailableList.defaultProps = {
  list: [],
};

export default function AvailableList({ list, search, filter }) {
  return (
    <List
      style={{
        borderRadius: '10px',
        padding: 8,
        flexGrow: 1,
      }}
    >
      {list
        .filter((item) => {
          let showItem = true;
          if (search) {
            showItem = item.name.toLowerCase().includes(search.toLowerCase());
          }
          if (has(invertedPriorities, filter)) {
            showItem = invertedPriorities[filter] === item.priority;
          }
          return showItem;
        })
        .map((item,index) => (
          <Item item={item} key={`available-${item.id}`} index={index} />
        ))}
    </List>
  );
}
