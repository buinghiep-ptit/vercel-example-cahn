import { Box, BoxProps, styled, Typography } from '@mui/material'
import * as React from 'react'

export interface IProps extends BoxProps {
  background?: string
  direction?: 'up' | 'down'
  bordertrapezoid?: string
  borderradiusbefore?: string
  borderradiusafter?: string
  children?: React.ReactElement
}

const TrapezoidContainer = styled(Box)<IProps>(
  ({
    theme,
    background,
    direction,
    bordertrapezoid,
    borderradiusbefore,
    borderradiusafter,
  }) => {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&::before': {
        content: "''",
        position: 'absolute',
        top: '0',
        bottom: '0',
        width: '50%',
        background: background,
        border: bordertrapezoid ? `1px solid ${bordertrapezoid}` : 'none',
        transformOrigin: direction === 'up' ? 'top' : 'bottom',
        borderRadius: borderradiusbefore,
        borderRight: '0',
        left: '0',
        transform: `skew(${28 * (direction === 'up' ? 1 : -1)}deg)`,
      },

      '&::after': {
        content: "''",
        position: 'absolute',
        top: '0',
        bottom: '0',
        width: '50%',
        background: background,
        border: bordertrapezoid ? `1px solid ${bordertrapezoid}` : 'none',
        transformOrigin: direction === 'up' ? 'top' : 'bottom',
        borderRadius: borderradiusafter,
        borderLeft: '0',
        right: '0',
        transform: `skew(${28 * (direction === 'up' ? -1 : 1)}deg)`,
      },
    }
  },
)

export function MuiTrapezoid({
  background,
  direction,
  bordertrapezoid,
  borderradiusbefore,
  borderradiusafter,
  children,
  ...rest
}: IProps) {
  return (
    <>
      <TrapezoidContainer
        {...rest}
        background={background}
        direction={direction}
        bordertrapezoid={bordertrapezoid}
        borderradiusbefore={borderradiusbefore}
        borderradiusafter={borderradiusafter}
      >
        {children}
      </TrapezoidContainer>
    </>
  )
}
