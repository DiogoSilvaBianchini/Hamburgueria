import { useEffect, useState } from 'react'
import './style.css'
import Card from '../../components/Card/Card'
import useFetch from '../../hooks/useFetch'
import EmptySearch from '../../components/EmptySearch/EmptySearch'

const Menu = () => {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])

    const {data} = useFetch("product", "GET")
    
    useEffect(() => {
        setProducts(data)
    },[data])

    useEffect(() => {
        if(data){
            const filtread = data.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))

            if(search){
                setProducts(filtread)
            }else{
                setProducts(data)
            }
        }
    }, [data, search])

  return (
    <div className='products-container'>
        <div className="search-container">
            <label htmlFor="search">
                <span>Buscar:</span>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} id='search'/>
            </label>
        </div>
        <ul className="products-list">
            {
                products.length > 0 ? products.map(product => (
                    <li key={product.id}>
                        <Card title={product.title} imgUrl={product.imgs[0]} price={product.price} id={product.id}/>
                    </li>
                )):<EmptySearch />
            }
        </ul>
    </div>
  )
}

export default Menu