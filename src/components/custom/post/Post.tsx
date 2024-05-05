import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui-library/card'
import { prettifyDate, truncateTextByChars } from '@/utils'

type Props = {
  imageUrl: string
  title: string
  description: string
  time: string
  source: string
}

export function Post({ imageUrl, title, description, time, source }: Props) {
  return (
    <Card className="w-full md:w-[calc(50%-11px)] lg:w-[calc(33.3%-11px)] border-0">
      <CardHeader className="flex flex-col gap-[12px] justify-between">
        <div className="max-h-[210px] h-[210px] overflow-hidden">
          <img
            src={imageUrl}
            className="object-cover object-center h-full w-full"
            alt="article image"
          />
        </div>
        {/* main content */}
        <div className="flex flex-col gap-[12px]">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-[14px] !mt-0">
            {truncateTextByChars(description)}
          </CardDescription>
        </div>
        {/* time and source */}
        <div>
          <div className="flex gap-4">
            {/* time */}
            <span className="text-[12px] leading-[14px] text-gray-400 border-r border-gray-500 pr-4">
              {prettifyDate(time)}
            </span>
            {/* source */}
            <span className="text-[12px] leading-[14px] text-gray-400">
              By {source}
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default Post
