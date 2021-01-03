import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import BaseMenu from './BaseMenu'
import Search from './Search'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    alignItems: 'center',
    background: theme.palette.background.light,
    padding: `0.25rem `,
    boxShadow: '0px 0.5rem 0.5rem #0004',
    zIndex: '1',
    marginTop: '-1px',
    borderBottom: `1px solid lightblue`,
    // [theme.breakpoints.downWithLandscape('mobile')]: {
    //   paddingTop: 0,
    //   paddingBottom: 0,
    //   fontSize: '0.7rem',
    // },
  },
  filterOn: {
    color: theme.palette.primary.main,
  },
}))

export default function QuestionsMenu({ search, setSearch, sort, setSort, filtered, setFiltered }) {
  const classes = useStyles()
  const sortedMenuItems = ['Default Sort', 'A-Z', 'Z-A']
  const answeredMenuItems = ['Show All', 'Answered', 'Not Answered', 'My Questions']

  return (
    <div className={classes.root}>
      <Search search={search} setSearch={setSearch} />
      <BaseMenu selected={filtered} menuItems={answeredMenuItems} itemClick={setFiltered} />
      <div style={{ flexGrow: 1 }} />
      <BaseMenu selected={sort} menuItems={sortedMenuItems} itemClick={setSort} />
    </div>
  )
}

QuestionsMenu.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  filtered: PropTypes.string.isRequired,
  setFiltered: PropTypes.func.isRequired,
}
