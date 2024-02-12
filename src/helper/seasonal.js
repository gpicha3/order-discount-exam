const createSeasonal = (id , every , discount) => {
    return  {
        id : id,
        category : "Seasonal",
        every : every,
        discount : discount
    }
}

export default createSeasonal