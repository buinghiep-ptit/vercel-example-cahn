import { styled, Typography, TypographyProps } from '@mui/material'
import clsx from 'clsx'
import { ReactNode } from 'react'

type TypoProps = {
  children?: ReactNode
  className?: any
  ellipsis?: string
  lineclamp?: number
} & TypographyProps

const StyledTypography = styled(Typography)<TypoProps>(
  ({ theme, ellipsis, lineclamp }) => ({
    overflow: ellipsis ? 'hidden' : '',
    textOverflow: ellipsis ? 'ellipsis' : '',
    display: ellipsis ? '-webkit-box' : '',
    WebkitLineClamp: ellipsis && lineclamp ? `${lineclamp.toString()}` : '',
    WebkitBoxOrient: ellipsis ? 'vertical' : 'unset',
  }),
)

export const MuiTypography = ({
  children,
  className,
  ellipsis = '',
  lineclamp = 2,
  ...props
}: TypoProps) => {
  return (
    <StyledTypography
      ellipsis={ellipsis}
      lineclamp={lineclamp}
      className={clsx({ [className || '']: true })}
      {...props}
    >
      {children}
    </StyledTypography>
  )
}
