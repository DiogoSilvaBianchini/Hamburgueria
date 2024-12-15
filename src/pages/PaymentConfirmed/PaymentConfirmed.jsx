import './style.css'
import {useEffect} from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PaymentConfirmed = ({socket}) => {
    useEffect(() => {
      const emitOrder = async () => {
        const orderId = localStorage.getItem("OrderId")

        socket.emit("updateOrder", {
            id: orderId,
            status: "Pagamento efetuado."
        })
        localStorage.removeItem("OrderId")
      }
      emitOrder()
    }, [socket])

  return (
    <div className='confirmed-payment'>
      <div className="icon-container">
        <CheckCircleIcon />
      </div>
      <div className="text-container">
        <h3>Pagamento confirmado com sucesso!</h3>
        <p>Seu pedido está sendo preparado, qualquer duvida estámos no whatsapp!</p>
        <button className='orangeBtn' onClick={() => window.location.href = "http://localhost:5173/"}><ArrowBackIosNewIcon /> Voltar para o menu</button>
      </div>
    </div>
  )
}

export default PaymentConfirmed