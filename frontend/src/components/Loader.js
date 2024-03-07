import { ThreeDots } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className='flex min-h-screen justify-center items-center bg-gray-100'>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
    </div>
  )
}
