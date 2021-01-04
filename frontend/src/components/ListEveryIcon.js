import SvgIcon from '@material-ui/core/SvgIcon'
import * as icons from '@material-ui/icons'

const ListEveryIcon = () => {
  let removeWords = '(Rounded) | (Outlined) | (TwoTone) | (Sharp)'
  let regex = new RegExp(`^.*(${removeWords})$`)
  console.log(regex)
  return Object.keys(icons)
    .filter(name => !regex.test(name))
    .map(name => (
      <div>
        {name}
        <SvgIcon component={icons[name]} />
      </div>
    ))
}

export default ListEveryIcon
