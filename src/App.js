import Navbar from "./components/Navbar";
import CartContainer from "./components/cartContainer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getItems } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Modal from "./components/Modal";
function App() {
  const { Items, isLoading } = useSelector((store)=>store.cart);
  const { isOpen } = useSelector((store)=>store.modal);
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(calculateTotals());
  }, [Items]);

  useEffect(()=>{
    dispatch(getItems())
  }, []);

  if(isLoading){
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    )
  }
  return (
    <main>
      {
      isOpen && <Modal />
      }
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App;
