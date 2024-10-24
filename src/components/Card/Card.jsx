import { useDispatch } from 'react-redux'
import './style.css'
import { agreeProduct } from '../../redux/cartSlice'
import { useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const Card = ({id, title, price, imgUrl}) => {
  const dispatch = useDispatch()
  const [blockedBtn, setBlocekdBtn] = useState(false)

  const addProduct = (e) => {
    const btn = e.target
    dispatch(agreeProduct({id, title, price, imgUrl,quant: 1}))
    if(btn.className.includes("moveCart")){
      btn.classList.remove("moveCart")
      console.log(btn.className)
    }
    btn.classList.add("activeButton")
    setBlocekdBtn(true)
  }

  const removeAnimation = (e) => {
    e.target.classList.remove("activeButton")
    setBlocekdBtn(false)
  }

  const cartAnimation = (e) => {
    const btn = e.target
    if(!btn.className.includes("activeButton")){
      btn.classList.add("moveCart")
    }
  }

  return (
    <div className='productCard'>
        <div className="productImage">
          {
            imgUrl ? <img src={`https://burger-blacksmith.s3.sa-east-1.amazonaws.com/${imgUrl}`} alt="grillBurguer" /> : <img src="./grillburguer.webp" alt="grillBurguer" />
          }
        </div>
        <div className="info">
            <h2>{title}</h2>
            <span>R$ {price}</span>
        </div>
        <div className="btns">
            <button className='orangeBtn' disabled={blockedBtn} onMouseEnter={cartAnimation}  onAnimationEnd={e => removeAnimation(e)} onClick={(e) => addProduct(e)}>{ blockedBtn ? <CheckCircleOutlineRoundedIcon /> : <AddShoppingCartIcon />}</button>
            <button className='iconBtn'><StarBorderIcon /></button>
        </div>
    </div>
  )
}

export default Card