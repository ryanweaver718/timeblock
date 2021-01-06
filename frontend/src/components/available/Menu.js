import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import BaseMenu from './BaseMenu';

FilterMenu.propTypes = {
  search: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};
export default function FilterMenu({ search, setSearch, filter, setFilter }) {
  const answeredMenuItems = ['Show All', 'Specific Groups Here'];

  return (
    <>
      <BaseMenu selected={filter} menuItems={answeredMenuItems} itemClick={setFilter} />
      <TextField
        id="standard-full-width"
        label="Search"
        style={{ marginBottom: 20, marginRight: '1rem', marginLeft: '1rem' }}
        placeholder="Search Items"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
}
