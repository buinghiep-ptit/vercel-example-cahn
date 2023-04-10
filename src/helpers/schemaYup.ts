import { messages } from '@/utils/messages'
import * as Yup from 'yup'

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const phoneNumberSchema = (isRequired?: boolean) => ({
  phoneNumber: isRequired
    ? Yup.string()
        .matches(phoneRegExp, {
          message: messages.MSG0,
          excludeEmptyString: true,
        })
        .test('len', 'Số điện thoại yêu cầu 10 ký tự', val => {
          if (val == undefined) {
            return true
          }
          return val.length == 0 || val.length === 10
        })
        .required(messages.MSG1)
    : Yup.string().notRequired(),
})

export const emailSchema = (isRequired?: boolean) => ({
  email: isRequired
    ? Yup.string()
        .email(messages.MSG12)
        .required(messages.MSG1)
        .test(
          'validate email',
          'Số ký tự trước @ không thể vượt quá 64',
          email => {
            if (!email?.includes('@')) return true
            return email.split('@')[0].length <= 64
          },
        )
        .max(255, 'Nội dung không được vượt quá 255 ký tự')
    : Yup.string().notRequired(),
})

export const passwordSchema = (isRequired?: boolean) => ({
  password: isRequired
    ? Yup.string()
        .required(messages.MSG1)
        .test('latinChars', messages.MSG18, value => {
          const regexStr = /^[\x20-\x7E]+$/
          if (value) {
            return regexStr.test(value)
          } else return false
        })
        .matches(/^\S*$/, messages.MSG18)
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!~*@^&])[A-Za-z0-9!~*@^&]{8,32}$/g,
          messages.MSG18,
        )
    : Yup.string().notRequired(),
  passwordConfirmation: isRequired
    ? Yup.string()
        .oneOf([Yup.ref('password'), null], messages.MSG11)
        .required(messages.MSG1)
    : Yup.string().notRequired(),
})
