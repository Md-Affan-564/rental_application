const getPriceByDate = (days,ppd) => {
    let price = days*ppd
    return price
}

module.exports = getPriceByDate