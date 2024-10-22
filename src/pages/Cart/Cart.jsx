import './style.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartCard from '../../components/CartCard/CartCard';
import useRequest from '../../hooks/useRequest';

const Cart = () => {
    const [delivery, setDelivery] = useState(false)
    const { products } = useSelector(state => state.cartSlice)
    const [valueTotal, setValueTotal] = useState(0)
    const {httpRequest} = useRequest()

    const valorTotal = () => {
        let isTotalByProduct = products.map(product => {
            return Number(product.price) * product.quant
        })
        
        const totalValueProducts = isTotalByProduct.reduce((acc, curr) => acc + curr, 0)
        
        if(delivery){
            setValueTotal((Number(totalValueProducts) + 10).toFixed(2))
        }else{
            setValueTotal(totalValueProducts.toFixed(2))
        }
    }

    useEffect(valorTotal, [products, delivery])


    const createChckOut = async () => {
        const productList = products.map(product => {
            return {id: product.id, quantity: product.quant}
        })
        
        const res = await httpRequest("product/payment", "post", {productList})
        window.location.href = res.results
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
        </div>
        <div className="productValue">
            <h2><InfoOutlinedIcon />Infomações da compra</h2>
            <ul className="priceProduct">
                <li>Valor total do carrinho: R$ {valueTotal}</li>
                {
                    delivery ? 
                        <li>Taxa de entrega: R$ 10,00</li>: 
                        <li className='remove'><s>Taxa de entrega: R$ 10,00</s></li>
                }
            </ul>
            <div className='deliveryContainer'>
                <button onClick={() => setDelivery(false)} className={!delivery ? "active":""}><DirectionsWalkRoundedIcon /> Pegar no local</button>
                <button onClick={() => setDelivery(true)} className={delivery ? "active":""}><DeliveryDiningRoundedIcon />Entrega em casa</button>
            </div>
            <label>
                <span>Código do cupom:</span>
                <input type="text" />
            </label>
            <div className="columnMenu">
                <h3>Valor total: R$ {valueTotal}</h3>
                <button className='darkBtn' onClick={createChckOut}>Comprar carrinho</button>
            </div>
        </div>
    </div>
  )
}

export default Cart