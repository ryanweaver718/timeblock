import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from 'store/items/itemsThunks';
// const ListEveryIcon = lazy(() => import('./ListEveryIcon'))
const ItemForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [totalMinutes, setTotalMinutes] = useState('');

  return (
    <>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="details"
        value={details}
        onChange={(e) => {
          setDetails(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="minutes"
        type="number"
        value={totalMinutes}
        onChange={(e) => {
          setTotalMinutes(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          dispatch(createItem({ name, details, totalMinutes }));
          setName('');
          setDetails('');
          setTotalMinutes('');
        }}
      >
        Save
      </button>
      {/* <Suspense fallback={'Loading Icons...'}>
        <ListEveryIcon />
      </Suspense> */}
    </>
  );
};

export default ItemForm;
