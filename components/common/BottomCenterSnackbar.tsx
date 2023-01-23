import { Snackbar } from '@mui/material'
import { Check } from 'react-feather'

interface Props {
  isSnackbarOpen: boolean
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
  message: string
}

function BottomCenterSnackbar({ isSnackbarOpen, setIsSnackbarOpen, message }: Props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={isSnackbarOpen}
      onClose={() => setIsSnackbarOpen(false)}
      className='mx-auto w-4/5 !bottom-[3rem] pl-4 pr-2.5 py-2.5 rounded-lg bg-gray-500 lg:!bottom-[10rem] lg:w-2/5'
      key='bottomcenter'
      autoHideDuration={3000}
    >
      <div className='flex items-center space-x-2'>
        <Check className='w-[1.125rem] h-[1.125rem] text-green-300' />
        <p className='text-base font-semibold text-white'>{message}</p>
      </div>
    </Snackbar>
  )
}

export default BottomCenterSnackbar