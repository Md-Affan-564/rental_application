const NOD = (strtDate,endDate) => { 

    let start = new Date(strtDate)
    let end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        return "not a valid date";
    }
    let diff = end - start
    let days = diff/(1000*60*60*24) + 1
    console.log(days)
    return days
}
module.exports = NOD