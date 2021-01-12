import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import { createUserItem, deleteUserItem, updateUserItem } from 'store/items/itemsThunks';

const useStyles = makeStyles(() => ({
  formControl: { margin: '1rem' },
}));

ItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  isEditingItem: PropTypes.bool.isRequired,
};
ItemModal.defaultProps = {
  item: { priority: '', totalMinutes: '', name: '', id: '' },
  isEditingItem: false,
};

export default function ItemModal({ isOpen, handleClose, item, isEditingItem }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState(item.name);
  const [priority, setPriority] = useState(item.priority);
  const [totalMinutes, setTotalMinutes] = useState(item.totalMinutes);
  const [nameError, setNameError] = useState(false);
  const [minuteError, setMinuteError] = useState(false);
  const [priorityError, setPriorityError] = useState(false);

  const clearAndClose = () => {
    setName('');
    setTotalMinutes('');
    setPriority('');
    setNameError(false);
    setMinuteError(false);
    setPriorityError(false);
    handleClose();
  };

  const validateInput = () => {
    let isValid = true;
    if (name === '') {
      setNameError(true);
      isValid = false;
    }
    if (totalMinutes === '' || totalMinutes === '0') {
      setMinuteError(true);
      isValid = false;
    }
    if (priority === '') {
      setPriorityError(true);
      isValid = false;
    }
    return isValid;
  };
  const handleSaveTemp = () => {
    const isValid = validateInput();
    if (isValid) {
      dispatch(itemsActions.addTemporaryItemAction({ name, totalMinutes, priority }));
      clearAndClose();
    }
  };

  const handleSave = () => {
    const isValid = validateInput();

    if (isValid) {
      dispatch(createUserItem({ name, totalMinutes, priority }));
      clearAndClose();
    }
  };

  const handleUpdate = () => {
    const isValid = validateInput();

    if (isValid) {
      dispatch(updateUserItem({ item: { id: item.id, name, totalMinutes, priority } }));
      clearAndClose();
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={clearAndClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Add Available Item'}</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl} variant="outlined">
            <TextField
              variant="outlined"
              error={nameError}
              helperText={nameError ? 'Name Is Required' : ''}
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
            />
            <br />
            <TextField
              error={minuteError}
              variant="outlined"
              helperText={minuteError ? 'Selected Minutes Is Required' : ''}
              placeholder="Default Minutes"
              type="number"
              value={totalMinutes}
              onChange={(e) => {
                setTotalMinutes(e.target.value);
                setMinuteError(false);
              }}
            />
            <br />
            <FormControl variant="outlined" error={priorityError}>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                label="Priority"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                error={priorityError}
                onChange={(e) => {
                  void setPriority(e.target.value);
                  setPriorityError(false);
                }}
              >
                <MenuItem value={'1'}>Critical</MenuItem>
                <MenuItem value={'2'}>High</MenuItem>
                <MenuItem value={'3'}>Medium</MenuItem>
                <MenuItem value={'4'}>Low</MenuItem>
              </Select>
              <FormHelperText>{priorityError ? 'Selected Priority Is Required' : ''}</FormHelperText>
            </FormControl>
          </FormControl>

          <DialogContentText id="alert-dialog-description">
            {isEditingItem
              ? `Deleting this item will remove any historical analytics tracking`
              : `Save will permanently save the item for later use, Today only will only be used for today`}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex' }}>
          <div>
            <Button onClick={clearAndClose} color="secondary">
              Cancel
            </Button>
          </div>
          <div style={{ flexGrow: 1 }} />
          <div>
            {isEditingItem && (
              <Button onClick={() => void dispatch(deleteUserItem({ id: item.id }))}>Delete Item</Button>
            )}

            {!isEditingItem && (
              <Button onClick={handleSaveTemp} color="primary">
                Today Only
              </Button>
            )}

            {isEditingItem ? (
              <Button onClick={handleUpdate} color="primary" autoFocus>
                Update Item
              </Button>
            ) : (
              <Button onClick={handleSave} color="primary" autoFocus>
                Save
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
