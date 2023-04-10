import { useCountdown } from '@/hooks/useCountDown'
import { Stack, Typography } from '@mui/material'
import { JustifyBox } from './Matches'

export interface Props {
  targetDate?: number
  callBack?: () => void
}

export function CountdownTimer({ targetDate = 0, callBack }: Props) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate)
  const timer = { Ngày: days, Giờ: hours, Phút: minutes, Giây: seconds }
  return (
    <Stack
      flexDirection={'row'}
      justifyContent="center"
      alignItems={'center'}
      gap={2}
    >
      {Object.keys(timer).map(key => (
        <JustifyBox
          key={key}
          bgcolor={'#FFF5F5'}
          borderRadius="8px"
          gap={0.5}
          pb={1.5}
          px={1.5}
          flexDirection="column"
        >
          <Typography variant="h2" sx={{ color: '#ED1E24' }}>
            {(timer as any)[key]}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{ color: '#ED1E24', textTransform: 'uppercase' }}
          >
            {key}
          </Typography>
        </JustifyBox>
      ))}
    </Stack>
  )
}
