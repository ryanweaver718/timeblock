import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import { createItem } from 'store/items/itemsThunks';
import PropTypes from 'prop-types';

ItemModal.propTypes = {
  isAddModalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default function ItemModal({ isAddModalOpen, handleClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [totalMinutes, setTotalMinutes] = useState('');
  const clearAndClose = () => {
    setName('');
    setDetails('');
    setTotalMinutes('');
    handleClose();
  };
  const handleSaveTemp = () => {
    dispatch(itemsActions.addTemporaryItemAction({ name, details, totalMinutes }));
    clearAndClose();
  };

  const handleSave = () => {
    dispatch(createItem({ name, details, totalMinutes }));
    clearAndClose();
  };

  return (
    <>
      <Dialog
        open={isAddModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Add Available Item'}</DialogTitle>
        <DialogContent>
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

          <DialogContentText id="alert-dialog-description">
            Save will permanently save the item for later use, Save temporary will only be used for today
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex' }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <div sytle={{ flexGrow: 1 }} />
          <Button onClick={handleSaveTemp} color="primary">
            Temporary Save
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
