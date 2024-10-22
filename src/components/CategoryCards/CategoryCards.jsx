import "./style.css"

const CategoryCards = () => {
  return (
    <div className="categoryCardsContainer">
        <ul>
            <li>
                <h2>Confira nossa promoção do dia!</h2>
                <img src="./promotionalBurguer.webp" alt="Hamburguer"/>
            </li>
            <li>
                <h2>Conheça nossos combos!</h2>
                <img src="./comboBurguer.webp" alt="Hamburguer"/>
            </li>
            <li>
                <h2>Trabalhamos com entregas!</h2>
                <img src="./motoboy.webp" alt="Hamburguer"/>
            </li>
        </ul>
    </div>
  )
}

export default CategoryCards