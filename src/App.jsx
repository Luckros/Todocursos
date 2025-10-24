import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav/Nav";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { Cart } from "./components/Cart/Cart";
import { CartProvider } from "./context/CartContext/CartProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/detail/:id" element={<ItemDetailContainer />} />
            <Route path="/category/:category" element={<ItemListContainer />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
