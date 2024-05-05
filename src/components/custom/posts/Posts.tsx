import Post from '@/components/custom/post/Post'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getEveryNewsApiPosts } from '@/api/news-api/newsApi'

const Posts = () => {
  const { isLoading, data: response } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getEveryNewsApiPosts('covid'),
  })

  const articles = response?.articles
  return (
    <div className="flex gap-4 flex-wrap mt-16">
      {!!isLoading
        ? 'Loading...'
        : !!articles?.length &&
          articles?.map((article, index) => (
            <React.Fragment key={index}>
              <Post
                postUrl={article.url}
                imageUrl={article.urlToImage}
                title={article.title}
                description={article.description}
                time={article.publishedAt}
                source={article.source.name}
              />
            </React.Fragment>
          ))}
    </div>
  )
}

export default Posts
