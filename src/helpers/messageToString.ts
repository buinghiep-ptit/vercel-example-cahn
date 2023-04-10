enum StatusCode {
  Unauthorized = 401,
  BadRequest = 400,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export const getMessageString = (error: {
  data?: any
  response?: any
  message?: string
  request?: any
  code?: any
}) => {
  let message = ''
  if (error.data) {
    message = error.data.errorDescription ?? error.data.error ?? ''
  } else if (error.code) {
    if (error.code === 'ECONNABORTED')
      message = 'Không có phản hồi phía máy chủ'
  } else if (error.response) {
    const { status } = error.response
    switch (status) {
      case StatusCode.Unauthorized:
        message = 'Phiên đăng nhập đã hết hạn'
        break
      case StatusCode.BadRequest:
        message = 'Yêu cầu không hợp lệ'
        break
      case StatusCode.InternalServerError:
        message = 'Có lỗi xảy ra phía máy chủ'
        break
      default:
        message =
          '[Response Error] Đã có lỗi không mong muốn. Vui lòng thử lại sau'
        break
    }
  } else if (error.message) {
    ;({ message: message } = error)
    if (message === 'Network Error') {
      message = 'Không thể kết nối tới máy chủ'
    }
  } else {
    // error.request
    message = `${error.request}` as string
  }

  return message
}
