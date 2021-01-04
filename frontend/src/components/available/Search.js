import TextField from '@material-ui/core/TextField'
import propTypes from 'prop-types'

Search.propTypes = {
  search: propTypes.string.isRequired,
  setSearch: propTypes.func.isRequired,
}

export default function Search({ search, setSearch }) {
  return (
    <TextField
      id="standard-full-width"
      label="Search"
      style={{ marginBottom: 20 }}
      placeholder="Search Items"
      fullWidth
      onChange={e => setSearch(e.target.value)}
      value={search}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}
