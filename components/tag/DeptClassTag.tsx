interface Props {
  name: string
}

function DeptClassTag({ name }: Props) {
  return (
    <span className='px-1.5 py-1 rounded bg-gray-100 text-center text-base font-semibold text-gray-500'>
      {name}
    </span>
  )
}

export default DeptClassTag