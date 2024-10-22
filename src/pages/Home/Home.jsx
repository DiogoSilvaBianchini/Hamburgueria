import "./style.css"
import CategoryCards from "../../components/CategoryCards/CategoryCards"
import SlideCards from "../../components/slideCards/SlideCards"
import useFetch from "../../hooks/useFetch"

const Home = () => {
  
  const {data} = useFetch(`product`, "GET")
  
  return (
    <div className="homeContainer">
      <section className="homeApresentation">
        <div className="textColumn">
          <span>HAMBUGUER</span>
          <span>GRILL</span>
        </div>
        <img src="./hamburguerLogo.webp" alt="Burguer Grill image" />
      </section>
      <section className="homeContent">
        <SlideCards titleSlide={"Mais pedidos"} listProducts={data}/>
        <SlideCards titleSlide={"Mais pedidos"} listProducts={data}/>
        <CategoryCards />
        <SlideCards titleSlide={"Mais pedidos"} listProducts={data}/>
      </section>
    </div>
  )
}

export default Home