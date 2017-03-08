export default {
  formatDate (time) {
    // return time
    if (!time) { return '-' }
    // 把Date对象的值转换为YYYY-MM-DD日期类型
    let t = new Date(time)
    let y = t.getFullYear()
    let m = t.getMonth() + 1
    let d = t.getDate()
    m = m > 10 ? m : '0' + m
    d = d > 10 ? d : '0' + d
    return y + '-' + m + '-' + d
  }
}
