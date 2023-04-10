export const weekday = (index: number) => {
  const weekdays = [
    'Chủ nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ]
  const dayOfWeek = weekdays[index]
  return dayOfWeek
}

export const TypeCardToLabel = (type: number) => {
  switch (type) {
    case 1:
      return 'Trận đấu'
    case 2:
      return 'Đội bóng'
    case 3:
      return 'Phỏng vấn'
    case 4:
      return 'Sản phẩm'
    case 5:
      return 'Cổ động viên'
    case 6:
      return 'Khác'
    default:
      return ''
  }
}
export const CurrencyFormatter = (amount: number, x = 1) => {
  // const formattedNumber = amount.toLocaleString('en-US', {
  //   maximumFractionDigits: 0,
  // })
  return amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
