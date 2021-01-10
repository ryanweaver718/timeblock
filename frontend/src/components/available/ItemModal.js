import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { itemsActions } from 'store/items/itemsReducer';
import { createUserItem } from 'store/items/itemsThunks';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(() => ({
  formControl: { margin: '1rem' },
}));

ItemModal.propTypes = {
  isAddModalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default function ItemModal({ isAddModalOpen, handleClose }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('');
  const [totalMinutes, setTotalMinutes] = useState('');
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
    dispatch(createUserItem({ name, totalMinutes, priority }));
    clearAndClose();
  };

  return (
    <>
      <Dialog
        open={isAddModalOpen}
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
            Save will permanently save the item for later use, Save temporary will only be used for today
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex' }}>
          <Button onClick={clearAndClose} color="secondary">
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
