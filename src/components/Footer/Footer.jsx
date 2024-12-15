import { useLocation } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react'

const Footer = () => {
  const location = useLocation()
  const [activeFooter, setActiveFooter] = useState(true)
  const checkIsFooter = () => {
    if(location.pathname == "/cart"){
      setActiveFooter(false)
    }else{
      setActiveFooter(true)
    }
  }
  
  useEffect(checkIsFooter,[location])
  return (
    <footer className={activeFooter ? "":"none"}>
      <span>Creted by Diogo Bianchini</span>
      <img src="./logo.webp" alt="Logo Smith Burguer" />
    </footer>
  )
}

export default Footer