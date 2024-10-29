import { useRef } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

const CategoryCard = ({img, title, color, path}) => {
    const cardRef = useRef("")

    const activeCard = () => {
        const imgContainer = cardRef.current.children[0]
        const span = cardRef.current.children[1]
        imgContainer.classList.add("active")
        imgContainer.style.borderColor = color
        span.classList.add("active")
    }

    const desactiveCard = () => {
        const imgContainer = cardRef.current.children[0]
        const span = cardRef.current.children[1]
        imgContainer.classList.remove("active")
        imgContainer.style.borderColor = "#c4c4c4"
        span.classList.remove("active")
    }
    
  return (
    <Link to={path} ref={cardRef} className='category-container' onMouseLeave={desactiveCard} onMouseEnter={activeCard}>
        <div className="img-container">
            <img src={`./${img}`} alt={title} />
        </div>
        <span>{title}</span>
    </Link>
  )
}

export default CategoryCard