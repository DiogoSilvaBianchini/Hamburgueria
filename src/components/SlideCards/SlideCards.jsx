import './style.css'
import Card from '../Card/Card'

const SlideCards = ({titleSlide, listProducts}) => {
  return (
    <div className='slideCards'>
        <h2>{titleSlide}</h2>
        <div className="slide">
            <ul>
                {
                    listProducts ? listProducts.map(product => (
                        <li key={product.id}>
                            <Card id={product.id} title={product.title} price={product.price} imgUrl={product.imgs[0]}/>
                        </li>
                    )): <h2>Nenhum produto encontrado!</h2>
                }
            </ul>
        </div>
    </div>
  )
}

export default SlideCards