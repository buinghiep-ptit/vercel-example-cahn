import {
  InputAdornment,
  InputBaseComponentProps,
  InputProps,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material'
import * as React from 'react'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const CssTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F7FA',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '& input::placeholder': {
      fontSize: '0.75rem',
    },
  },
  '& .MuiInputAdornment-root': {
    position: 'absolute',
    right: 20,
    paddingBottom: 4,
  },
})

export type IFormInputTextProps = {
  formatType?: 'currency' | 'phone' | 'default'
  inputComponent?: React.ElementType<InputBaseComponentProps> | undefined
  iconStart?: React.ReactElement
  iconEnd?: React.ReactElement
  name: string
  label?: string
  defaultValue?: string
  inputProps?: InputProps
} & TextFieldProps

export const MuiRHFInputText: FC<IFormInputTextProps> = ({
  name,
  label = '',
  formatType = 'default',
  defaultValue,
  inputComponent,
  iconStart,
  iconEnd,
  inputProps,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <CssTextField
          {...field}
          value={formatType !== 'default' ? 0 : field.value}
          {...otherProps}
          //   label={label}
          size="medium"
          variant="outlined"
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ''
          }
          InputLabelProps={{ shrink: true }}
          InputProps={{
            ...inputProps,
            sx: {
              cursor: iconEnd ? 'pointer' : 'default',
              caretColor: '#ED1E24',
            },
            startAdornment: iconStart ? (
              <InputAdornment position="start">{iconStart}</InputAdornment>
            ) : null,
            endAdornment: iconEnd ? (
              <InputAdornment position="end">{iconEnd}</InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  )
}
