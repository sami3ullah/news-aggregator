import { Loader as LoadingIcon } from 'lucide-react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <LoadingIcon size={40} className="animate-spin w-12" />
    </div>
  )
}

export default Loader
