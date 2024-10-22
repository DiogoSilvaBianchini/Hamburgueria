import { useDispatch } from 'react-redux'
import './style.css'
import { agreeProduct } from '../../redux/cartSlice'
import { useState } from 'react'

const Card = ({id, title, price, imgUrl}) => {
  const dispatch = useDispatch()
  const [blockedBtn, setBlocekdBtn] = useState(false)

  const addProduct = (e) => {
    dispatch(agreeProduct({id, title, price, imgUrl,quant: 1}))
    e.target.classList.add("activeButton")
    setBlocekdBtn(true)
  }

  const removeAnimation = (e) => {
    e.target.classList.remove("activeButton")
    setBlocekdBtn(false)
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
            <button className='orangeBtn' disabled={blockedBtn}  onAnimationEnd={e => removeAnimation(e)} onClick={(e) => addProduct(e)}>{ blockedBtn ? "Adicionado com sucesso!" : "Adicionar ao Carrinho"}</button>
        </div>
    </div>
  )
}

export default Card