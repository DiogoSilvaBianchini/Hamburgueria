import "./style.css"
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const ProductInfo = ({addCart, title, describe, img, ingredients, closeWindow}) => {
  
  document.querySelector("body").style.overflowY = "hidden"

  const closeFullScreen = () => {
    document.querySelector("body").style.overflowY = "auto"
    closeWindow(false)
  }

  return (
    <div className="product-info-contaier">
        <div className="product-info">
            <div className="container-img">
                <img src={img ? `https://burger-blacksmith.s3.sa-east-1.amazonaws.com/${img}` : "/logo.webp"} alt={title} />
            </div>
            <div className="content-product">
                <h2>{title ? title:"Produto não encontrado."}</h2>
                <span>{describe ? describe:"Tente contatar o administrador da loja"}</span>
                <div className="column">
                  <h2>Principais ingredients:</h2>
                  <ul>
                    {
                      ingredients ? ingredients.map((ingredient, i) => (
                        <li key={ingredient+i}> - {ingredient}</li>
                      )):<li>
                        <span className="empty">
                          Ingredients não encontrados
                        </span>
                      </li>
                    }
                  </ul>
                </div>
                <div className="row">
                  <button className="orangeBtn" onClick={addCart}><AddShoppingCartRoundedIcon /></button>
                </div>
                <button className="iconBtn" onClick={closeFullScreen}><CloseRoundedIcon /></button>
            </div>
        </div>
    </div>
  )
}

export default ProductInfo