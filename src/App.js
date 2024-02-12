import { useEffect, useState } from 'react';
import './App.css';
import products from './helper/products';
import createCoupon from './helper/coupon';
import createOnTop from './helper/ontop';
import createSeasonal from './helper/seasonal';

function App() {

  const cart = products;

  const [totalPrice , setTotalPrice] = useState(0)
  const [userPoint , setUserPoint] = useState(100)
  const [coupons , setCoupons] = useState([])
  const [ontops , setOntops] = useState([])
  const [seasonals , setSeasonals] = useState([])

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price;
    });
    setTotalPrice(sum);

    const coupon = []
    coupon.push(createCoupon("Fixed amount" , 50))
    coupon.push(createCoupon("Percentage discount" , 10))

    const ontop = []
    ontop.push(createOnTop("Accessories" , 15))
    ontop.push(createOnTop("Customer points" , 0))

    const seasonal = []
    seasonal.push(createSeasonal(300 , 40))

    setCoupons(coupon)
    setOntops(ontop)
    setSeasonals(seasonal)

  }, [cart]);

  useEffect(() => {
    console.log(coupons);
  }, [coupons])
  return (
    <div className="App">
      <div className="App-header">
        <div className='container'>
          <div className='header'>
            <img src={"https://cdn.iconscout.com/icon/free/png-256/free-shopping-cart-219-729067.png "} alt="My Image" className='icon-product'/>
            <h5>My Cart ( Point : {userPoint})</h5>
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
            <div className='selection-coupon'>
            {coupons.map((coupon) => {
              return (
                <div className='coupon-item'>
                  <h6>{coupon.coupon} : {coupon.discount}</h6>
                </div>
              )
            })}
            </div>
          </div>
          <div className='container-discount-item'>
            <h5>On Top</h5>
            <div className='selection-coupon'>
            {ontops.map((coupon) => {
              return (
                <div className='coupon-item'>
                  <h6>{coupon.categoryProduct} : {coupon.discount}</h6>
                </div>
              )
            })}
            </div>
          </div>
          <div className='container-discount-item'>
            <h5>Seasonal</h5>
            <div className='selection-coupon'>
            {seasonals.map((coupon) => {
              return (
                <div className='coupon-item'>
                  <h6>Every {coupon.every} <br/>discount {coupon.discount}</h6>
                </div>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
