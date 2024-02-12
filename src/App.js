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
  const [backupUserPoint , setBackupUserPoint] = useState(userPoint)

  const [coupons , setCoupons] = useState([])
  const [ontops , setOntops] = useState([])
  const [seasonals , setSeasonals] = useState([])

  const [couponSelect , setCouponSelect] = useState(0)
  const [ontopSelect , setOnTopSelect] = useState(0)
  const [seasonalSelect , setSeasonalSelect] = useState(0)

  const [couponDiscount , setCouponDiscount] = useState(0)
  const [ontopDiscount , setOnTopDiscount] = useState(0)
  const [seasonalDiscount , setSeasonalDiscount] = useState(0)

  const findTotolPrice = () =>{
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price;
    });

    return sum
  }

  useEffect(() => {
    setTotalPrice(findTotolPrice());

    const coupon = []
    coupon.push(createCoupon(1 , "Fixed amount" , 50))
    coupon.push(createCoupon(2 , "Percentage discount" , 10))

    const ontop = []
    ontop.push(createOnTop(1 , "Accessories" , 15))
    ontop.push(createOnTop(2 , "Customer points" , 0))

    const seasonal = []
    seasonal.push(createSeasonal(1 , 300 , 40))

    setCoupons(coupon)
    setOntops(ontop)
    setSeasonals(seasonal)

  }, [cart]);

  const selected = "coupon-item-selected"

  const calculateTotalPrice = () => {
    let price = findTotolPrice()

    if(couponSelect !== 0){
      const coupon = coupons.find((item)=>{
        return item.id === couponSelect
      })
      if(coupon.coupon === "Fixed amount"){
        setCouponDiscount(coupon.discount)
        price -= coupon.discount
      }else if(coupon.coupon === "Percentage discount"){
        let discount = (price)*coupon.discount/100
        setCouponDiscount(discount)
        price -= discount
      }
    }

    if(ontopSelect !== 0){
      const ontop = ontops.find((item) => {
        return item.id === ontopSelect
      })
      if(ontop.categoryProduct !== "Customer points"){
        let discount = 0;
        const itemDiscount = cart.filter((item) => {
          return item.category === ontop.categoryProduct
        })
        itemDiscount.map((item) => {
          discount += item.price * ontop.discount/100
        })
        setOnTopDiscount(discount)
        price -= discount
      }else {
        let maxDiscount = price*20/100
        if(userPoint > maxDiscount){
          price -= maxDiscount
          setOnTopDiscount(maxDiscount)
          setUserPoint(userPoint - maxDiscount)
        }else{
          price -= userPoint
          setOnTopDiscount(userPoint)
          setUserPoint(0)
        }
      }
    }

    if(seasonalSelect !== 0){
      const seasonal = seasonals.find((item) => {
        return item.id === seasonalSelect
      })
      let discount = Math.floor(price / seasonal.every) * seasonal.discount
      price -= discount
      setSeasonalDiscount(discount)
    }

    setTotalPrice(price)
  }

  useEffect(() => {
    calculateTotalPrice();
    if(ontopSelect === 0){
      setUserPoint(backupUserPoint);
    }
  } , [couponSelect , ontopSelect , seasonalSelect])

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
          <div className='discount-total'>
            <h5 style={{display: `${couponSelect !== 0 || ontopSelect !== 0 || seasonalSelect !== 0? "block" : "none"}`}}>Discount</h5>
            <h6 style={{display: `${couponSelect !== 0? "block" : "none"}`}}> - {couponDiscount} $</h6>
            <h6 style={{display: `${ontopSelect !== 0? "block" : "none"}`}}> - {ontopDiscount} $</h6>
            <h6 style={{display: `${seasonalSelect !== 0? "block" : "none"}`}}> - {seasonalDiscount} $</h6>
          </div>
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
                <div className={`${couponSelect === coupon.id? selected : "coupon-item"}`} onClick={() => {couponSelect === coupon.id? setCouponSelect(0) : setCouponSelect(coupon.id)}}>
                  <h6>{coupon.coupon} : {coupon.discount} {coupon.coupon === "Percentage discount"? "%" : "$"}</h6>
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
                <div className={`${ontopSelect === coupon.id? selected : "coupon-item"}`} onClick={() => {ontopSelect === coupon.id? setOnTopSelect(0) : setOnTopSelect(coupon.id)}}>
                  <h6>{coupon.categoryProduct} {coupon.categoryProduct !== "Customer points"? `discount : ${coupon.discount}%` : "for discount"}</h6>
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
                <div className={`${seasonalSelect === coupon.id? selected : "coupon-item"}`} onClick={() => {seasonalSelect === coupon.id? setSeasonalSelect(0) : setSeasonalSelect(coupon.id)}}>
                  <h6>Every {coupon.every} $ discount {coupon.discount} $</h6>
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
