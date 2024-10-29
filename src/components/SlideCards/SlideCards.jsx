import './style.css'
import Card from '../Card/Card'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useEffect, useState } from 'react';

const SlideCards = ({titleSlide, listProducts, max, category}) => {

    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        const pages = []
        if(listProducts){
            if(category){
                const filter = listProducts.filter(product => product.Category.name == category)
                filter.map((product,i) => {
                    let isDivide = filter.slice(i * max, (i + 1) * max)
                    if(isDivide.length > 0){
                        pages.push(isDivide)
                    }
                })
            }else{
                listProducts.map((product,i) => {
                    let isDivide = listProducts.slice(i * max, (i + 1) * max)
                    if(isDivide.length > 0){
                    pages.push(isDivide)
                }
            })
            }
            
            

            setProducts({pages, size: pages.length})
        }
    },[listProducts, category, max])
    

    const nextPage = () => {
        let nextPage = page + 1
        if(nextPage < products.size){
            setPage(nextPage)
        }else{
            setPage(0)
        }
    }    


    const backPage = () => {
        let backPage = page - 1
        console.log(backPage)
        if(backPage >= 0){
            setPage(backPage)
        }else{
            setPage(products.size - 1)
        }
    }

  return (
    <div className='slideCards'>
        <h2>{titleSlide}</h2>
        <div className="slide">
            <button className='arrowButton' onClick={backPage}><ArrowBackIosNewRoundedIcon /></button>
            <ul>
                {
                    products.pages ? products.pages[page].map(product => (
                        <li key={product.id}>
                            <Card id={product.id} title={product.title} price={product.price} imgUrl={product.imgs[0]} fav={product.fav}/>
                        </li>
                    )): <h2>Nenhum produto encontrado!</h2>
                }
            </ul>
            <button className='arrowButton' onClick={nextPage}><ArrowForwardIosRoundedIcon /></button>
        </div>
    </div>
  )
}

export default SlideCards