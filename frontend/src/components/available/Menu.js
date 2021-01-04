import BaseMenu from './BaseMenu'
import Search from './Search'

export default function FilterMenu({ search, setSearch, filter, setFilter }) {
  const answeredMenuItems = ['Show All', 'Specific Groups Here']

  return (
    <>
      <BaseMenu selected={filter} menuItems={answeredMenuItems} itemClick={setFilter} />
      <Search search={search} setSearch={setSearch} /> <div style={{ flexGrow: 1 }} />
    </>
  )
}
