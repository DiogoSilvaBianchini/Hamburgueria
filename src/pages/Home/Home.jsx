import "./style.css"
import CategoryCard from "../../components/CategoryCard/CategoryCard"
import SlideCards from "../../components/slideCards/SlideCards"
import useFetch from "../../hooks/useFetch"
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Home = () => {
  
  const {data} = useFetch(`product`, "GET")
  
  return (
    <div className="homeContainer">
      <div className="carrosel-container">
        <button><ArrowBackIosNewRoundedIcon /></button>
        <ul>
          <li>
            <img src="/grill_baguer_banner.webp" alt="" />
          </li>
        </ul>
        <button><ArrowForwardIosRoundedIcon /></button>
      </div>
      <section className="categorys">
        <ul>
          <li className="card-category">
            <CategoryCard title={"Lanches"} img={"./grillburguer.webp"} path={"/menu"} color={"#ff5b0fc7"}/>
          </li>
          <li className="card-category">
            <CategoryCard title={"Aperitivos"} img={"./batataFrita.webp"} path={"/menu"} color={"#ffc300"}/>
          </li>
          <li className="card-category">
            <CategoryCard title={"Sobremesas"} img={"./sorvete.webp"} path={"/menu"} color={"#c36f09"}/>
          </li>
          <li className="card-category">
            <CategoryCard title={"Bebidas"} img={"./sodaCup.webp"} path={"/menu"} color={"#a63c06"}/>
          </li>
          <li className="card-category">
            <CategoryCard title={"Combos"} img={"./comboBurguer.webp"} path={"/menu"} color={"#ff792e"}/>
          </li>
        </ul>
      </section>
      <section className="homeContent">
        <SlideCards titleSlide={"Mais pedidos"} listProducts={data}/>
      </section>
    </div>
  )
}

export default Home