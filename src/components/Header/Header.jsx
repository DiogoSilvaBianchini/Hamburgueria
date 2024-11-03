import './style.css'
import { NavLink } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {useDispatch, useSelector} from 'react-redux'
import { setCategory } from '../../redux/categorySearchSlice';
const Header = () => {

  const {category} = useSelector(state => state.categorySearch)
  const dispatch = useDispatch()

  const cleanSearch = () => {
    if(category){
      dispatch(setCategory({category: ""}))
    }
  }

  return (
    <header>
        <img src='/logo48x48.webp' alt='"Logo Burguer Smith'/>
        <ul className='linkList'>
          <li>
            <NavLink onClick={cleanSearch} to="/" className={({isActive}) => isActive ? "active": ""}><HomeRoundedIcon /> Home</NavLink>
          </li>
          <li>
            <NavLink onClick={cleanSearch} to="/menu" className={({isActive}) => isActive ? "active": ""}><LunchDiningRoundedIcon /> Cardápio</NavLink>
          </li>
          <li>
            <NavLink onClick={cleanSearch} to="/cart" className={({isActive}) => isActive ? "active": ""}><ShoppingCartRoundedIcon /> Carrihno</NavLink>
          </li>
        </ul>
    </header>
  )
}

export default Header