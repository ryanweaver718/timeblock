import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useState } from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Draggable } from 'react-beautiful-dnd'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  hovering: {},
}))

export default function Item({ item, provided, snapshot }) {
  const [isHovering, setIsHovering] = useState(false)
  const theme = useTheme()
  const { dragHandleProps, draggableProps, innerRef } = provided
  const { isDragging } = snapshot
  let background = 'darkgrey'
  if (isDragging) background = 'lightgreen'
  else if (isHovering) background = 'grey'
  return (
    <ListItem
      button
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        userSelect: 'none',
        padding: 8 * 2,
        margin: `0 0 ${8}px 0`,
        borderRadius: '10px',
        background,
        ...draggableProps.style,
      }}
    >
      {item.name}
    </ListItem>
  )
}
