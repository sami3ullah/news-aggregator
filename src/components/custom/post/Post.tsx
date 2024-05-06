import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui-library/card'
import { prettifyDate, truncateTextByChars } from '@/utils'
import Image from '../image/Image'

type Props = {
  postUrl: string
  imageUrl: string
  title: string
  description: string
  time: string
  source: string
}

export function Post({
  postUrl,
  imageUrl,
  title,
  description,
  time,
  source,
}: Props) {
  return (
    <Card className="w-full md:w-[calc(50%-11px)] lg:w-[calc(33.3%-11px)] shadow-none group">
      <a href={postUrl} target="_blank">
        <div className="max-h-[210px] h-[210px] overflow-hidden">
          <Image
            src={imageUrl ?? ''}
            loading="lazy"
            className="object-cover object-center h-full w-full group-hover:opacity-90 ease-in-out"
            alt="article image"
          />
        </div>
        <CardHeader className="flex flex-col gap-[12px] justify-between">
          {/* main content */}
          <div className="flex flex-col gap-[12px]">
            <CardTitle className="text-lg group-hover:underline">
              {title}
            </CardTitle>
            <CardDescription className="text-[14px] !mt-0">
              {truncateTextByChars(description)}
            </CardDescription>
          </div>
          {/* time and source */}
          <div>
            <div className="flex gap-4">
              {/* time */}
              <span className="text-[12px] leading-[14px] text-gray-400 border-r border-gray-500 pr-4">
                {time}
              </span>
              {/* source */}
              <span className="text-[12px] leading-[14px] text-gray-400">
                By {source}
              </span>
            </div>
          </div>
        </CardHeader>
      </a>
    </Card>
  )
}

export default Post
