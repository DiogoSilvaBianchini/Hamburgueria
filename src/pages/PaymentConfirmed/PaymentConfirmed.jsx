import './style.css'
import io from 'socket.io-client'
import {useEffect} from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {v4} from 'uuid'

const PaymentConfirmed = () => {
    useEffect(() => {
      const itens = JSON.parse(localStorage.getItem("listItens"))
      const emitOrder = async () => {
        itens.id = v4()
        itens.info["status"] = "Pagamento efetuado."
        const socket = await io.connect(import.meta.env.VITE_URL_BACKEND_SOCKET)
        socket.emit("orders", {
            order: itens
        })
        localStorage.removeItem("listItens")
      }
      itens !== null && emitOrder()
    }, [])

  return (
    <div className='confirmed_payment'>
      <CheckCircleIcon />
      <span>Pagamento confirmado com sucesso!</span>
      <button className='orangeBtn' onClick={() => window.location.href = "http://localhost:5173/"}><ArrowBackIosNewIcon /> Voltar para o menu</button>
    </div>
  )
}

export default PaymentConfirmed