const createOnTop = (id ,category , amount) => {
    return {
        id : id,
        category : "On Top",
        categoryProduct : category,
        discount : amount
    }
}

export default createOnTop