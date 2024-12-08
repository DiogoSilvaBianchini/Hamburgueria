import './style.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartCard from '../../components/CartCard/CartCard';
import useRequest from '../../hooks/useRequest';

const Cart = () => {
    const [delivery, setDelivery] = useState(false)
    const [shippingPrice, setShippingPrice] = useState("")
    const [cep, setCep] = useState("")
    const [load, setLoad] = useState(false)
    const { products } = useSelector(state => state.cartSlice)
    const [valueTotal, setValueTotal] = useState(0)
    const {httpRequest} = useRequest()
    
    const checkShippingPrice = async () => {
       if(cep){
            setLoad(true)
            const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/shipping`, {
                headers: {"Content-type":"application/json"},
                method: "POST",
                body: JSON.stringify({cep})
            })
            
            const res = await req.json()
            setLoad(false)
            setShippingPrice(res.results.shippingPrice)
       }
    }

    useEffect(() => {
        let isTotalByProduct = products.map(product => {
            return Number(product.price) * product.quant
        })
        
        const totalValueProducts = isTotalByProduct.reduce((acc, curr) => acc + curr, 0)
        
        if(delivery && shippingPrice){
            setValueTotal((Number(totalValueProducts) + Number(shippingPrice)).toFixed(2))
        }else{
            setValueTotal(totalValueProducts.toFixed(2))
        }
    }, [products, delivery, shippingPrice])


    const createChckOut = async () => {
        const productList = products.map(product => {
            return {id: product.id, quantity: product.quant}
        })
        
        const urlCheckout = await httpRequest("product/payment", "post", {productList})

        window.location.href = urlCheckout
    }

  return (
    <div className='cartContainer'>
        <div className="productsContainer">
            <h2><ShoppingCartIcon /> Produtos do seu carrinho</h2>
            <ul className='productCard'>
                {
                    products.length > 0 ? products.map(product => (
                        <li key={product.id} className='productCart'>
                            <CartCard title={product.title} price={product.price} imgUrl={product.imgUrl} quantity={product.quant}/>
                        </li>
                    )):
                    <li className='emptyList'>
                        <h2>Nenhum produto selecionado</h2>
                    </li>
                }
            </ul>
            <div className="mobile-info">
                <h3>Valor total: R$ {valueTotal}</h3>
                <button className='darkBtn' onClick={createChckOut}>Comprar carrinho</button>
            </div>
        </div>
        <div className="productValue">
            <h2><InfoOutlinedIcon />Infomações da compra</h2>
            <ul className="priceProduct">
                <li>Valor total do carrinho: R$ {valueTotal}</li>
                {
                    delivery && shippingPrice && 
                        <li>Taxa de entrega: R$ {shippingPrice}</li>
                }
            </ul>
            <div className='deliveryContainer'>
                <button onClick={() => setDelivery(false)} className={!delivery ? "active":""}><DirectionsWalkRoundedIcon /> Pegar no local</button>
                <button onClick={() => setDelivery(true)} className={delivery ? "active":""}><DeliveryDiningRoundedIcon />Entrega em casa</button>
            </div>
            {
                delivery && <>
                    <form className="row" onSubmit={e => e.preventDefault()}>
                        <label>
                            <span>CEP</span>
                            <input type="text" maxLength="8" value={cep} onChange={(e) => setCep(e.target.value)}/>
                        </label>
                        
                        {load ? 
                            <button className="loadButton"><AutorenewIcon />Calculando frete...</button>: 
                            <button className='darkBtn' onClick={checkShippingPrice}>Consultar</button>
                        }
                    </form>
                </>
            }
            <div className="columnMenu">
                <h3>Valor total: R$ {valueTotal}</h3>
                <button className='darkBtn' onClick={createChckOut}>Comprar carrinho</button>
            </div>
        </div>
    </div>
  )
}

export default Cart
