const fillZeor = (num:number) => {
  return num >= 10 ? num : '0' + num
}

const formatDate = (date:string|number) => {
  const time = new Date(date)
  const year = time.getFullYear()
  const month = fillZeor(time.getMonth() + 1)
  const day = fillZeor(time.getDate())
  return year + '-' + month + '-' + day
}
export { formatDate }
