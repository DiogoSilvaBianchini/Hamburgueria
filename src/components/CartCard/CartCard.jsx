import "./style.css"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {deleteProduct, updateProduct} from '../../redux/cartSlice'

const CartCard = ({title, price, imgUrl, quantity}) => {
    const dispath = useDispatch()
    const [quant, setQuant] = useState(quantity)

    const updateQuantity = (qtd) => {
        setQuant(qtd)
        if(qtd) dispath(updateProduct({title, quant: Number(qtd)}))
    }

    const removeProductByTitle = () => {
        dispath(deleteProduct({title}))
    }

  return (
    <>
        <div className="rowTitle">
            <div className="productImage">
                <img src={`https://burger-blacksmith.s3.sa-east-1.amazonaws.com/${imgUrl}`} alt="lanche" />
            </div>
            <h2>{title}</h2>
        </div>
        <input type="number" value={quant} onChange={(e) => updateQuantity(e.target.value)}/>
        <span>R$ {price}</span>
        <button onClick={removeProductByTitle}><DeleteForeverIcon /></button>
    </>
  )
}

export default CartCard