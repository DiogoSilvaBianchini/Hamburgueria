import { useDispatch } from 'react-redux'
import './style.css'
import { agreeProduct } from '../../redux/cartSlice'
import { useEffect, useState } from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ProductInfo from '../ProductInfo/productInfo';

const Card = ({id, title, price, imgUrl, ingredients, describe}) => {
  const dispatch = useDispatch()
  const [blockedBtn, setBlocekdBtn] = useState(false)
  const [infoScreen, setInforScreen] = useState(false)
  const [fav, setFav] = useState(false)
  

  const addProduct = (e) => {
    const btn = e.target
    dispatch(agreeProduct({id, title, price, imgUrl,quant: 1}))
    if(btn.className.includes("moveCart")){
      btn.classList.remove("moveCart")
    }
    btn.classList.add("activeButton")
    setBlocekdBtn(true)
  }

  const removeAnimation = (e) => {
    e.target.classList.remove("activeButton")
    setBlocekdBtn(false)
  }

  const cartAnimation = (e) => {
    const btn = e.target
    if(!btn.className.includes("activeButton")){
      btn.classList.add("moveCart")
    }
  }

  useEffect(() => {
    let isFavority = localStorage.getItem("Fav")
    if(isFavority){
      let favoritys = isFavority.split(",")
      favoritys.map(idFav => {
        if(idFav == id){
          setFav(true)
        }
      })
    }
  },[id, fav])

  const addFav = () => {
    let isFavority = localStorage.getItem("Fav")
    
    if(!isFavority){
      localStorage.setItem("Fav", id)
    }else{
      isFavority = isFavority.split(",")
      let isExist = isFavority.filter(idFav => idFav == id)
      if(isExist.length == 0){
        localStorage.setItem("Fav", `${isFavority},${id}`)
        setFav(true)
      }else{
        let updateList = isFavority.filter(idFav => idFav != id)
        localStorage.setItem("Fav", updateList)
        setFav(false)
      }
    }
  }

  return (
    <div className='productCard'>
        <div className="productImage">
          {
            imgUrl ? <img src={`https://burger-blacksmith.s3.sa-east-1.amazonaws.com/${imgUrl}`} alt="grillBurguer" /> : <img src="./grillburguer.webp" alt="grillBurguer" />
          }
          <button className={`iconBtn infoBtn`} onClick={() => setInforScreen(true)} title={"Remover dos favoritos"}><InfoOutlinedIcon /></button>
        </div>
        <div className="info">
            <h2>{title}</h2>
            <span>R$ {price}</span>
        </div>
        <div className="btns">
            <button className='orangeBtn' disabled={blockedBtn} onMouseEnter={cartAnimation}  onAnimationEnd={e => removeAnimation(e)} onClick={(e) => addProduct(e)}>{ blockedBtn ? <CheckCircleOutlineRoundedIcon /> : <AddShoppingCartIcon />}</button>
            <button onClick={addFav} className={`iconBtn ${fav ? "active": ""}`} title={fav ? "Remover dos favoritos":"Adicionar aos favoritos"}><StarBorderIcon /></button>
        </div>
        {infoScreen && <ProductInfo addCart={addProduct} price={price} title={title} closeWindow={setInforScreen} describe={describe} img={imgUrl} ingredients={ingredients}/>}
    </div>
  )
}

export default Card