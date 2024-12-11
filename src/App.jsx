import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import Menu from './pages/Menu/Menu'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadProducts } from './redux/productList'
import PaymentConfirmed from './pages/PaymentConfirmed/PaymentConfirmed'

const App = () => {
  const dispath = useDispatch()

  useEffect(() => {
    dispath(loadProducts())
  }, [dispath])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/PaymentConfirmed' element={<PaymentConfirmed />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App