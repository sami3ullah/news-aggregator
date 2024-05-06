import Post from '@/components/custom/post/Post'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEveryNewsApiPosts } from '@/api/news-api/newsApi'
import { getEverythingGuardianPosts } from '@/api/guardian/guardian'

type Props = {
  searchQuery: string
}

const Posts = ({ searchQuery }: Props) => {
  // const { isLoading, data: articles } = useQuery({
  //   queryKey: ['todos', searchQuery],
  //   queryFn: () => getEveryNewsApiPosts(searchQuery),
  // })

  const { isLoading, data: articles } = useQuery({
    queryKey: ['todos', searchQuery],
    queryFn: () => getEverythingGuardianPosts(searchQuery),
  })

  return (
    <div className="flex gap-4 flex-wrap">
      {!!isLoading
        ? 'Loading...'
        : !!articles?.length &&
          articles?.map((article, index) => (
            <React.Fragment key={index}>
              <Post
                postUrl={article.postUrl}
                imageUrl={article.imageUrl ?? ''}
                title={article.title}
                description={article.description ?? ''}
                time={article.time}
                source={article.source ?? 'Unknown'}
              />
            </React.Fragment>
          ))}
    </div>
  )
}

export default Posts
