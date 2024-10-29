import "./style.css"
import CategoryCard from "../../components/CategoryCard/CategoryCard"
import SlideCards from "../../components/slideCards/SlideCards"
import useFetch from "../../hooks/useFetch"
import Carrosel from "../../components/Carrosel/Carrosel"


const Home = () => {
  
  const {data} = useFetch(`product`, "GET")
  
  const {data: productsOrderTime} = useFetch("product/filter/time", "GET")
  return (
    <div className="homeContainer">
      <Carrosel />
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
        <SlideCards titleSlide={"Novos pratos"} listProducts={productsOrderTime} max={4}/>
        <SlideCards titleSlide={"Lanches da casa"} listProducts={data} max={4} category={"lanches"}/>
        <SlideCards titleSlide={"Aperitivos mais pedidos"} listProducts={data} max={4} category={"aperitivos"}/>
      </section>
    </div>
  )
}

export default Home