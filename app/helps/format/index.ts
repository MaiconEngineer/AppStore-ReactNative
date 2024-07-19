export let formatInDollar = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD',
})

export let formatInReais = (price: Number) => {

    return "R$ " + (new Intl.NumberFormat('pr-BR',{
       style: "decimal",
       currency: "BRL",
       minimumFractionDigits: 2
    }).format(Number(price.toFixed(2))))
}  