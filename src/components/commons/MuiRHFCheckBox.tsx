import { Checkbox, FormControlLabel } from '@mui/material'
import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

export interface ICheckBoxProps {
  name: string
  label?: string | 'Checkbox' | React.ReactElement
  defaultValue?: boolean
}

export function MuiRHFCheckBox({
  name,
  label,
  defaultValue,
  ...props
}: ICheckBoxProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
          control={
            <Checkbox
              color="success"
              onChange={field.onChange}
              checked={field.value}
              icon={<CheckBoxOutlineBlankIcon />}
              checkedIcon={<CheckBoxIcon />}
              sx={{
                py: 0,
                color: '#868E96',
                '& .MuiSvgIcon-root': {},
                '&.Mui-checked': {
                  color: '#ED1E24',
                },
              }}
              {...props}
            />
          }
          label={label || 'Label'}
        />
      )}
    />
  )
}
