import './style.css'
import { NavLink, useLocation } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LunchDiningRoundedIcon from '@mui/icons-material/LunchDiningRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {useDispatch, useSelector} from 'react-redux'
import { setCategory } from '../../redux/categorySearchSlice';
import CartPopUp from '../CartPopUp/CartPopUp';
import { useEffect, useState } from 'react';

const Header = () => {
  const [totalValue, setTotalValue] = useState(0)
  const [activePopUp, setactivePopUp] = useState(false)
  const {category} = useSelector(state => state.categorySearch)
  const {products} = useSelector(state => state.cartSlice)

  const dispatch = useDispatch()
  const location = useLocation()

  const cleanSearch = () => {
    if(category){
      dispatch(setCategory({category: ""}))
    }
  }

  useEffect(() => {
    let isTotalByProduct = products.map(product => {
      return Number(product.price) * product.quant
    })
  
    const totalValueProducts = isTotalByProduct.reduce((acc, curr) => acc + curr, 0)
    setTotalValue(totalValueProducts)
    totalValueProducts > 0 && location.pathname !== "/cart" && setactivePopUp(true)
  }, [products, location])

  return (
    <header>
        <img src='/logo48x48.webp' alt='"Logo Burguer Smith'/>
        <ul className='linkList'>
          <li>
            <NavLink onClick={cleanSearch} to="/" className={({isActive}) => isActive ? "home active": "home"}><HomeRoundedIcon /> Home</NavLink>
          </li>
          <li>
            <NavLink onClick={cleanSearch} to="/menu" className={({isActive}) => isActive ? "active": ""}><LunchDiningRoundedIcon /> Cardápio</NavLink>
          </li>
          <li>
            <NavLink onClick={cleanSearch} to="/cart" className={({isActive}) => isActive ? "cart active": ""}><ShoppingCartRoundedIcon /> Carrinhno</NavLink>
          </li>
        </ul>
        {
          activePopUp && <CartPopUp totalPrice={totalValue} setActivePopUp={setactivePopUp}/>
        }
    </header>
  )
}

export default Header