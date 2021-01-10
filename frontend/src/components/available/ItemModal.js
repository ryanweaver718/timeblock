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
import { createItem } from 'store/items/itemsThunks';

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
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState('');
  const [totalMinutes, setTotalMinutes] = useState('');
  const [nameError, setNameError] = useState(false);

  const clearAndClose = () => {
    setName('');
    setDetails('');
    setTotalMinutes('');
    setPriority('');
    setNameError(false);
    handleClose();
  };

  const validateInput = () => {
    let isValid = true;
    if (name === '') {
      setNameError(true);
      isValid = false;
    }
    return isValid
  };

  const handleSaveTemp = () => {
    const isValid = validateInput()
    if (isValid) {
      dispatch(itemsActions.addTemporaryItemAction({ name, details, totalMinutes, priority }));
      clearAndClose();
    }
  };

  const handleSave = () => {
    dispatch(createItem({ name, details, totalMinutes, priority }));
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
              placeholder="name"
              helperText={nameError ? 'Name Is Required' : ''}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
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
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                label="Priority"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                onChange={(e) => void setPriority(e.target.value)}
              >
                <MenuItem value={'1'}>Critical</MenuItem>
                <MenuItem value={'2'}>High</MenuItem>
                <MenuItem value={'3'}>Medium</MenuItem>
                <MenuItem value={'4'}>Low</MenuItem>
              </Select>
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
