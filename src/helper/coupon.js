const createCoupon = (id , coupon , amount ) => {
    if(coupon === "Fixed amount"){
        return {
            id : id,
            category : "Coupon",
            coupon : "Fixed amount",
            discount : amount
        }
    }else if (coupon === "Percentage discount"){
        return {
            id : id,
            category : "Coupon",
            coupon : "Percentage discount",
            discount : amount
        }
    }else {
        return {
            id : id,
            category : "Coupon",
            coupon : "Invaild Coupon",
            discount : 0
        }
    }
}

export default createCoupon