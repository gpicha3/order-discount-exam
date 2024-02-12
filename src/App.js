import { useEffect, useState } from 'react';
import './App.css';
import products from './helper/products';

function App() {

  const cart = products;

  const [totalPrice , setTotalPrice] = useState(0)

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price;
    });
    setTotalPrice(sum);
  }, [cart]);

  return (
    <div className="App">
      <div className="App-header">
        <div className='container'>
          <div className='header'>
            <img src={"https://cdn.iconscout.com/icon/free/png-256/free-shopping-cart-219-729067.png "} alt="My Image" className='icon-product'/>
            <h5>My Cart</h5>
          </div>
          <table className='cart-item'>
            {cart.map((item) => {
              return (
                <tr>
                  <td><img src={"https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png"} alt="My Image" className='icon-product'/></td>
                  <td><h5>{item.name} ({item.quantity})</h5></td>
                  <td><h5>$ {item.price}</h5></td>
                </tr>
              )
            })}
          </table>
          <div className='container-total'>
            <h5>Total : ${totalPrice}</h5>
          </div>
        </div>
        <div className='container-discount'>
        <div className='header'>
          <img src={"https://cdn-icons-png.flaticon.com/512/290/290919.png"} alt="My Image" className='icon-product'/>
          <h5 style={{marginLeft:"20px"}}>Discount</h5>
        </div>
          <div className='container-discount-item'>
            <h5>Coupon</h5>
          </div>
          <div className='container-discount-item'>
            <h5>On Top</h5>
          </div>
          <div className='container-discount-item'>
            <h5>Seasonal</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
