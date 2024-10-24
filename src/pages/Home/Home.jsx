import "./style.css"
import CategoryCard from "../../components/CategoryCard/CategoryCard"
import SlideCards from "../../components/slideCards/SlideCards"
import useFetch from "../../hooks/useFetch"
import Carrosel from "../../components/Carrosel/Carrosel"


const Home = () => {
  
  const {data} = useFetch(`product`, "GET")
  

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
        <SlideCards titleSlide={"Mais pedidos"} listProducts={data}/>
      </section>
    </div>
  )
}

export default Home