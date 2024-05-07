import React, { useState, useEffect } from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  fallbackSrc?: string
  onLoad?: () => void
  onError?: () => void
}

const Image = ({
  src,
  fallbackSrc = './avatar-image.png',
  onLoad,
  onError,
  ...props
}: ImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src)
  const [imageError, setImageError] = useState<boolean>(false)

  useEffect(() => {
    setImageSrc(src)
    setImageError(false)
  }, [src])

  const handleLoad = () => {
    if (onLoad) onLoad()
  }

  const handleError = () => {
    if (!imageError && fallbackSrc) {
      setImageSrc(fallbackSrc)
      setImageError(true)
    }
    if (onError) onError()
  }

  return (
    <img src={imageSrc} onLoad={handleLoad} onError={handleError} {...props} />
  )
}

export default Image
