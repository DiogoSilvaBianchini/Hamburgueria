import './style.css'
import CachedIcon from '@mui/icons-material/Cached';

const Loading = () => {
  return (
    <div className='loading'>
        <CachedIcon />
        <span>Buscando produtos</span>
    </div>
  )
}

export default Loading