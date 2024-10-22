import './style.css'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const EmptySearch = ({children}) => {
  return (
    <div className="empty">
        <h2>Nenhum produto encontrado</h2>
        <SentimentVeryDissatisfiedIcon />
        {children}
    </div>
  )
}

export default EmptySearch