import { useEffect, useState } from 'react'
import './style.css'
import Card from '../../components/Card/Card'
import useFetch from '../../hooks/useFetch'
import EmptySearch from '../../components/EmptySearch/EmptySearch'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../redux/categorySearchSlice'

const Menu = () => {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])

    const {data} = useFetch("product", "GET")
    const {category} = useSelector(state => state.categorySearch)
    const dispatch = useDispatch()

    useEffect(() => {
        if(data && category){
            const filtread = data.filter(product => product.Category.name == category)
            setProducts(filtread)
        }else if(data){
            setProducts(data)
        }
    }, [category, data])


    useEffect(() => {
        if(data && search){
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
                <input type="text" autoComplete='off' value={search} onChange={(e) => setSearch(e.target.value)} id='search'/>
            </label>
            <label htmlFor="categorySelector">
                <span>Categoria</span>
                <select id='categorySelector' onChange={(e) => dispatch(setCategory({category: e.target.value}))}>
                    <option value="">Buscando por uma categoria...</option>
                    <option value="lanches">Lanches</option>
                    <option value="aperitivos">Aperitivos</option>
                    <option value="bebidas">Bebidas</option>
                </select>
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