import BaseMenu from './BaseMenu';
import Search from './Search';
import PropTypes from 'prop-types';

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
      <Search search={search} setSearch={setSearch} /> <div style={{ flexGrow: 1 }} />
    </>
  );
}
