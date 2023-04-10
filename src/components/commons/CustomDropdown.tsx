import { Button, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { IRoute } from '../layouts/header'

export interface Props {
  name?: string
  icon?: React.ReactElement
  fontType?: 'normal' | 'big'
  collapse?: IRoute[]
  href?: string
  route?: string
  children?: React.ReactElement
}

export function CustomDropdown({
  name,
  icon,
  href,
  route,
  collapse,
  children,
  fontType = 'big',
  ...rest
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const router = useRouter()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (callBack?: () => void) => {
    if (callBack) callBack()
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="text"
          onClick={e =>
            Boolean(collapse) ? handleClick(e) : router.push(route ?? '')
          }
          size="small"
        >
          <Stack direction={'row'} alignItems="center" gap={1}>
            {icon && icon}
            {name && (
              <Typography
                variant="h5"
                color={router.pathname === route ? '#FFD200' : 'primary'}
                sx={{
                  letterSpacing: '1px',
                  fontSize: fontType === 'big' ? '1.375rem' : '1.125rem',
                  lineHeight: 1.25,
                }}
              >
                {name}
              </Typography>
            )}

            {Boolean(collapse) ? (
              <Image
                src={
                  anchorEl
                    ? '/assets/images/vuesax/arrow-up.svg'
                    : '/assets/images/vuesax/arrow-down.svg'
                }
                alt="arrow"
                width={16}
                height={16}
              />
            ) : null}
          </Stack>
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="link-menu"
        open={open}
        onClose={() => handleClose()}
        onClick={() => handleClose()}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 'calc(50% - 5px)',
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        {collapse?.map((c, index) => (
          <Link key={index} href={c.route ?? ''} passHref>
            <a>
              <MenuItem onClick={() => handleClose(c.callBack)}>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color={'secondary'}
                >
                  {c.name}
                </Typography>
              </MenuItem>
            </a>
          </Link>
        ))}
      </Menu>
    </React.Fragment>
  )
}
