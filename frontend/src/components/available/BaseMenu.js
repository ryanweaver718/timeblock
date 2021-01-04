import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '90%',
    fontWeight: 'bold',
  },
  moreIcon: {
    '&[data-highlight="1"]': {
      color: theme.palette.primary.main,
    },
  },
  name: {
    textTransform: 'uppercase',
    '&[data-highlight="1"]': {
      color: theme.palette.primary.main,
    },
  },
}));

BaseMenu.propTypes = {
  selected: PropTypes.string.isRequired,
  itemClick: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
  extraHandler: PropTypes.func,
};

BaseMenu.defaultProps = {
  extraHandler: () => {},
};

export default function BaseMenu({ selected, itemClick, menuItems, extraHandler }) {
  const classes = useStyles();
  const [, setOpen] = useState(false);
  // const anchorRef = useRef(null)
  const popupState = usePopupState({ variant: 'popper', popupId: `base-menu-${selected}` });

  const handleToggle = () => {
    setOpen((open) => !open);
  };
  const handleClick = (event) => {
    itemClick(event.currentTarget.innerText);
    extraHandler();
    popupState.close();
  };

  const highlight = selected !== menuItems[0];

  return (
    <>
      <IconButton
        // anchorEl={anchorRef.current}
        edge="end"
        size="small"
        className={classes.root}
        color="inherit"
        aria-label="menu"
        onClick={handleToggle}
        {...bindTrigger(popupState)}
      >
        <div className={classes.name} data-highlight={highlight ? 1 : 0}>
          {selected}
        </div>
        <UnfoldMoreIcon className={classes.moreIcon} data-highlight={highlight ? 1 : 0} />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        {menuItems.map((mi) => (
          <MenuItem key={mi} onClick={handleClick}>
            {mi}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
