import './style.css'
import { NavLink } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

const Header = () => {
  return (
    <header>
        <img src='/logo48x48.webp' alt='"Logo Burguer Smith'/>
        <ul className='linkList'>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "active": ""}><HomeRoundedIcon /> Home</NavLink>
          </li>
          <li>
            <NavLink to="/menu" className={({isActive}) => isActive ? "active": ""}><LunchDiningRoundedIcon /> Lanches</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({isActive}) => isActive ? "active": ""}><ShoppingCartRoundedIcon /> Carrihno</NavLink>
          </li>
        </ul>
    </header>
  )
}

export default Header