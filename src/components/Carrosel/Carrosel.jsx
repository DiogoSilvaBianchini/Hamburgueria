import './style.css'
import { useState } from "react";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Carrosel = () => {
    const [carrosel, setCarrosel] = useState(1)

  const carroselMove = (move) => {
    if(carrosel >= 2){
      setCarrosel(1)
    }else{
      setCarrosel(carrosel + move)
    }
  }

  const carroselBack = (move) => {
    if(carrosel <= 1){
      setCarrosel(2)
    }else{
      setCarrosel(carrosel + move)
    }
  }

  return (
    <div className="carrosel-container">
        <button onClick={() => carroselBack(-1)}><ArrowBackIosNewRoundedIcon /></button>
        <ul>
            <li>
            <img src={`/carrosel/${carrosel}.webp`} alt="" />
            </li>
        </ul>
        <button onClick={() => carroselMove(1)}><ArrowForwardIosRoundedIcon /></button>
    </div>
  )
}

export default Carrosel