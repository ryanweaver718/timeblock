import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch } from 'react-redux';
import { itemsActions as ia } from 'store/items/itemsReducer';
import { createDay, deleteDay } from 'store/items/itemsThunks';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SidebarItem from './SidebarItem';
const useStyles = makeStyles(() => ({}));

export default function SidebarContent() {
  const classes = useStyles();
  console.log(classes);
  const dispatch = useDispatch();
  const items = [
    { Icon: RestoreIcon, name: 'Reset Durations', handler: () => void dispatch(ia.resetAllDayTimes()) },
    { Icon: ClearAllIcon, name: 'Reset Items', handler: () => void dispatch(ia.clearDailyScheduleAction()) },
    { Icon: SaveIcon, name: 'Save Day', handler: () => void dispatch(createDay()) },
    { Icon: DeleteIcon, name: 'Erase Day', handler: () => void dispatch(deleteDay()) },
    {
      Icon: AddCircleOutlineIcon,
      name: 'Create Saved Item',
      handler: () => void dispatch(ia.setShowAddItem({ showAddItem: true })),
    },
  ];
  return (
    <>
      <List>
        {items.map((item) => (
          <SidebarItem key={item.name} handler={item.handler} Icon={item.Icon} text={item.name} />
        ))}
      </List>
      <Divider />
      <List>
        {items.map((item) => (
          <SidebarItem key={`${item.name}-1`} ss handler={item.handler} Icon={item.Icon} text={item.name} />
        ))}
      </List>
    </>
  );
}
