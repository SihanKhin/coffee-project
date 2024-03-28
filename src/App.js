import Coffee from "./features/coffees/Coffee";
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home";
import Sidebar from "./pages/Sidebar";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Header from "./pages/Header";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
function App() {
  return (
    <div className="App">
         <Header />
         <Routes>
            <Route path="/" element={<Home />}/> 
            <Route path="/product/:proId" element={<ProductDetails />}/> 
            <Route path="/cart" element={<Cart />}/> 
         </Routes>
           
    </div>
  );
}

export default App;
