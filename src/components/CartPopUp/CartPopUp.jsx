import { useEffect, useRef } from 'react'
import './style.css'


const CartPopUp = ({totalPrice, setActivePopUp}) => {
  const popUpRef = useRef("") 

  useEffect(() => {
    const timerAnimation = setInterval(() => {
      popUpRef.current.classList.add("removePopUp")
      clearInterval(timerAnimation)
    }, 4000)
  }, [])

  const removePopUp = () => {
    if(popUpRef.current.className.includes("removePopUp")){
      setActivePopUp(false)
    }
  } 

  return (
    <div className={`add-item-container`} ref={popUpRef} onAnimationEnd={removePopUp}>
        <span className='small-text'>Item adicionado ao carrinho</span>
        <span>Valor total do carrinho: $ {totalPrice.toFixed(2)}</span>
    </div>
  )
}

export default CartPopUp