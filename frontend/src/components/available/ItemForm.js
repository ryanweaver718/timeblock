import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from 'store/items/itemsThunks';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { itemsActions } from 'store/items/itemsReducer';
// const ListEveryIcon = lazy(() => import('./ListEveryIcon'))
const ItemForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [totalMinutes, setTotalMinutes] = useState('');

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <TextField
        variant="outlined"
        placeholder="details"
        value={details}
        onChange={(e) => {
          setDetails(e.target.value);
        }}
      />
      <br />
      <TextField
        variant="outlined"
        placeholder="minutes"
        type="number"
        value={totalMinutes}
        onChange={(e) => {
          setTotalMinutes(e.target.value);
        }}
      />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(createItem({ name, details, totalMinutes }));
          setName('');
          setDetails('');
          setTotalMinutes('');
        }}
      >
        Save
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(itemsActions.addTemporaryItemAction({ name, details, totalMinutes }));
          setName('');
          setDetails('');
          setTotalMinutes('');
        }}
      >
        Just for today
      </Button>
      {/* <Suspense fallback={'Loading Icons...'}>
        <ListEveryIcon />
      </Suspense> */}
    </>
  );
};

export default ItemForm;
