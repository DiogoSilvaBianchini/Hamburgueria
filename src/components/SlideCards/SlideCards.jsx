import './style.css'
import Card from '../Card/Card'
import { useEffect, useState } from 'react';

const SlideCards = ({titleSlide, listProducts, category}) => {
    const [updateCard, setUpdateCard] = useState(false)   
    const [product, setProduct] = useState([])

    const categoryFilter = () => {
        if(category && listProducts){
            const isFilterCategory = listProducts.filter(product => product.Category.name == category) 
            setProduct(isFilterCategory)
        }else{
            setProduct(listProducts)
        }
    }

    useEffect(categoryFilter, [category, listProducts])

  return (
    <div className='slideCards'>
        <h2>{titleSlide}</h2>
        <div className="slide">
            <ul>
                {
                    product.length > 0 ? product.map(product => (
                        <li key={product.id}>
                            <Card id={product.id} setUpdateCard={setUpdateCard} updateCard={updateCard} title={product.title} price={product.price} imgUrl={product.imgs[0]} fav={product} ingredients={product.ingredients} describe={product.describe}/>
                        </li>
                    )): <h2 className='empty'>Nenhum produto encontrado!</h2>
                }
            </ul>
        </div>
    </div>
  )
}

export default SlideCards