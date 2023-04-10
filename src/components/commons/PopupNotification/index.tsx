import { Backdrop, Stack } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import * as React from 'react'
import { MuiButton } from '../MuiButton'

type Props = {
  title: string
  submitText?: string
  cancelText?: string
  open: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false | string
  onCloseModal: () => void
  children?: React.ReactElement
  onSubmit?: any
  isLoading?: boolean
  hideFooter?: boolean
  disabled?: boolean
}

export function PopupNotification({
  title,
  submitText = 'Xác nhận',
  cancelText = 'Quay lại',
  open,
  maxWidth = 'sm',
  onCloseModal,
  onSubmit,
  children,
  isLoading,
  disabled = false,
}: Props) {
  return (
    <div>
      <Backdrop
        sx={{
          background: 'rgba(31, 33, 36, 0.2)',
          backdropFilter: 'blur(5px)',
          zIndex: 999,
        }}
        open={open}
      >
        <Dialog
          open={open}
          onClose={onCloseModal}
          maxWidth={maxWidth as any}
          fullWidth={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            '& .MuiDialog-container': {
              alignItems: 'flex-start',
            },
            '& .MuiPaper-root': {
              borderRadius: 4,
              py: 3.5,
              px: 7.5,
            },
          }}
        >
          {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Stack
              direction={'row'}
              justifyContent="center"
              width={'100%'}
              gap={2}
            >
              {onSubmit && (
                <MuiButton
                  disabled={isLoading || disabled}
                  title={submitText}
                  variant="contained"
                  sx={{ flex: 1, color: '#FFD200' }}
                  onClick={() => onSubmit()}
                  loading={isLoading}
                />
              )}

              {onCloseModal && (
                <MuiButton
                  disabled={isLoading}
                  title={cancelText}
                  variant="contained"
                  sx={{
                    flex: 1,
                    color: '#FFD200',
                    bgcolor: '#212529',
                  }}
                  onClick={onCloseModal}
                />
              )}
            </Stack>
          </DialogActions>
        </Dialog>
      </Backdrop>
    </div>
  )
}
