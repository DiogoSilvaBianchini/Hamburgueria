import { useEffect, useRef } from 'react'
import './style.css'


const CartPopUp = ({totalPrice, setActivePopUp}) => {
  const popUpRef = useRef("") 

  useEffect(() => {
    const timerAnimation = setTimeout(() => {
      if(popUpRef.current){
        popUpRef.current.classList.add("removePopUp")
      }
      clearTimeout(timerAnimation)
    }, 4000)
  }, [])

  const removePopUp = () => {
    if(popUpRef.current.className.includes("removePopUp")){
      setActivePopUp(false)
    }
  } 

  const tapRemove = () => {
    popUpRef.current.classList.add("removePopUp")
  }

  return (
    <div className={`add-item-container`} onClick={tapRemove} ref={popUpRef} onAnimationEnd={removePopUp}>
        <span className='small-text'>Item adicionado ao carrinho</span>
        <span>Valor total do carrinho: $ {totalPrice.toFixed(2)}</span>
    </div>
  )
}

export default CartPopUp