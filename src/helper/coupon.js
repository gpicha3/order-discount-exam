const createCoupon = (coupon , amount) => {
    if(coupon === "Fixed amount"){
        return {
            category : "Coupon",
            coupon : "Fixed amount",
            discount : amount
        }
    }else if (coupon === "Percentage discount"){
        return {
            category : "Coupon",
            coupon : "Percentage discount",
            discount : amount
        }
    }else {
        return {
            category : "Coupon",
            coupon : "Invaild Coupon",
            discount : 0
        }
    }
}

export default createCoupon