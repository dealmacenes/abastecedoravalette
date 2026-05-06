import Spinner from './Spinner'

const LoadingView = () => {
  return (
    <div className='fixed inset-0 z-50 place-content-center bg-neutral-800'>
        <div className='flex w-fit h-fit gap-3 mx-auto'>
            <Spinner/>
            <p className='text-2xl font-medium text-neutral-200'>Cargando...</p>
        </div>

    </div>
  )
}

export default LoadingView 