import { useTheme, makeStyles } from '@material-ui/core/styles'
import { Draggable } from 'react-beautiful-dnd'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))
export default function Item({ item, index }) {
  const theme = useTheme()
  return (
    <ListItem button>
      <Draggable draggableId={`drag-${item.id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              padding: 8 * 2,
              margin: `0 0 ${8}px 0`,
              // change background colour if dragging
              // background: snapshot.isDragging ? 'lightgreen' : 'grey',
              // styles we need to apply on draggables
              ...provided.draggableProps.style,
            }}
          >
            {item.name}
          </div>
        )}
      </Draggable>
    </ListItem>
  )
}
