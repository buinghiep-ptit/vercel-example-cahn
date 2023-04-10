import { Box, Stack, Typography } from '@mui/material'
import { LazyNextImage } from '../commons/LazyNextImage'
import { ICategory } from './category'

export interface IProps {
  categories?: ICategory[]
}

export function Categories({ categories }: IProps) {
  return (
    <div>
      <Stack
        direction={'row'}
        sx={{
          position: 'relative',
          aspectRatio: `calc(${categories?.length ?? 0 / 1})`,
          bgcolor: '#FFFFFF',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        {categories?.length &&
          categories.map((item, index) => {
            return (
              <Box
                key={index}
                flex={1}
                position="relative"
                sx={{ cursor: 'pointer' }}
              >
                <LazyNextImage
                  imgUrl={item.imgUrl}
                  defaultOverlay
                  canHover={false}
                />

                <Typography
                  variant="h5"
                  letterSpacing={'1px'}
                  textAlign="center"
                  position={'absolute'}
                  sx={{ bottom: 40, left: 0, right: 0 }}
                >
                  {item.name}
                </Typography>
              </Box>
            )
          })}
      </Stack>
    </div>
  )
}
