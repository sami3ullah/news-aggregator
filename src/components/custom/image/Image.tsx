import React, { useState } from 'react'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  fallbackSrc?: string
}

const Image = ({
  src,
  fallbackSrc = './avatar-image.png',
  ...props
}: ImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(src)
  const [imageError, setImageError] = useState<boolean>(false)

  const onError = () => {
    if (!imageError && fallbackSrc) {
      setImageSrc(fallbackSrc)
      setImageError(true)
    }
  }

  return <img src={imageSrc} onError={onError} {...props} />
}

export default Image
