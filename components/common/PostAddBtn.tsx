import { CheckCircle } from 'react-feather'

interface Props {
  btnName: string
  color: string
}

function PostAddBtn({ btnName, color }: Props) {
  return (
    <button className={`px-3 py-1.5 flex items-center space-x-1 rounded-3xl bg-${color}-500`}>
      <CheckCircle className={`w-[1.125rem] h-[1.125rem] text-${color}-200`} />
      <p className='text-sm font-semibold text-gray-50'>{btnName}</p>
    </button>
  )
}

export default PostAddBtn