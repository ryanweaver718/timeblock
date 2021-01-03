import propTypes from 'prop-types'
import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import Item from './AvailableItem'
import TextField from '@material-ui/core/TextField'
import AvailableList from './AvailableList'

Index.propTypes = {
  droppableId: propTypes.string.isRequired,
}

export default function Index({ droppableId }) {
  const { list } = useSelector(({ items }) => ({
    list: items[droppableId],
  }))
  const [search, setSearch] = useState('')

  const filteredList = search
    ? list.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    : list

  return (
    <>
      <TextField
        id="standard-full-width"
        label="Search"
        style={{ marginBottom: 20 }}
        placeholder="Search Items"
        fullWidth
        onChange={e => setSearch(e.target.value)}
        value={search}
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <AvailableList droppableId={droppableId} list={filteredList} />
    </>
  )
}
