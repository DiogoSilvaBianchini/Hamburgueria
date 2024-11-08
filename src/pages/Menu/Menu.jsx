import { useEffect, useRef, useState } from 'react'
import './style.css'
import Card from '../../components/Card/Card'
import useFetch from '../../hooks/useFetch'
import EmptySearch from '../../components/EmptySearch/EmptySearch'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../redux/categorySearchSlice'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Menu = () => {
    const search = useRef("")
    const highestPriceButton = useRef("")
    const lowestPriceButton = useRef("")
    const alphabeticalOrderButton = useRef("")
    const [products, setProducts] = useState([])
    const [categoryFilter, setCategoryFilter] = useState([])

    const {data} = useFetch("product", "GET")
    const {category} = useSelector(state => state.categorySearch)
    const dispatch = useDispatch()

    useEffect(() => {
        if(data){
            setProducts(data)
        }
    },[data])


    useEffect(() => {
        if(category){
            const filtread = data.filter(product => product.Category.name.toLowerCase().includes(category))
            setCategoryFilter(filtread)
            setProducts(filtread)
        }else{
            setCategoryFilter("")
            setProducts(data)
        }
    },[category, data])


    const filterTitle = (value) => {
        const filtread = products.filter(products => products.title.toLowerCase().includes(value))
        const searchValue = search.current.value
        if(filtread.length > 0 && searchValue){
            setProducts(filtread)
        }else{
            if(categoryFilter.length > 0){
                setProducts(categoryFilter)
            }else{
                setProducts(data)
            }
        }
    }
    
    const lowestPrice = () => {
        const productsFiltread = products.sort((a,b) => Number(a.price) - Number(b.price))
        setProducts([...productsFiltread])
        lowestPriceButton.current.classList.add("active")
        highestPriceButton.current.classList.remove("active")
        alphabeticalOrderButton.current.classList.remove("active")
    }
    
    const highestPrice = () => {
        const productsFiltread = products.sort((a,b) => Number(b.price) - Number(a.price))
        setProducts([...productsFiltread])
        highestPriceButton.current.classList.add("active")
        lowestPriceButton.current.classList.remove("active")
        alphabeticalOrderButton.current.classList.remove("active")
    }

    const alphabeticalOrder = () => {
        const productsFiltread = products.sort((a,b) => {
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
        })
        setProducts([...productsFiltread])
        alphabeticalOrderButton.current.classList.add("active")
        highestPriceButton.current.classList.remove("active")
        lowestPriceButton.current.classList.remove("active")
    }

  return (
    <div className='products-container'>
        <div className="search-container">
            <label htmlFor="search">
                <span>Buscar:</span>
                <input type="text" autoComplete='off' ref={search} onChange={(e) => filterTitle(e.target.value)} id='search'/>
            </label>
            <label htmlFor="categorySelector">
                <span>Categoria</span>
                <select id='categorySelector' value={category} onChange={(e) => dispatch(setCategory({category: e.target.value}))}>
                    <option value="">Buscando por uma categoria...</option>
                    <option value="lanches">Lanches</option>
                    <option value="aperitivos">Aperitivos</option>
                    <option value="sobremesas">Sobremesas</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="combos">Combos</option>
                </select>
            </label>
            <div className='priceButtons'>
                <span>Ordenar por:</span>
                <div className="row">
                    <button className='darkButton active' ref={alphabeticalOrderButton} onClick={alphabeticalOrder}>A-z</button>
                    <button className='darkButton' ref={highestPriceButton} onClick={highestPrice}>Maior preço<KeyboardArrowUpRoundedIcon /></button>
                    <button className='darkButton' ref={lowestPriceButton} onClick={lowestPrice}>Menor preço <KeyboardArrowDownRoundedIcon /></button>
                </div>
            </div>
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