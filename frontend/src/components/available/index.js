import propTypes from 'prop-types'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import AvailableList from './AvailableList'
import Menu from './Menu'
Index.propTypes = {
  droppableId: propTypes.string.isRequired,
}

export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId] || [],
  }))
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Default Sort')
  const [filter, setFilter] = useState('Show All')

  return (
    <>
      <Menu
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        filter={filter}
        setFilter={setFilter}
      />
      <AvailableList droppableId={droppableId} list={list} sort={sort} search={search} />
    </>
  )
}
