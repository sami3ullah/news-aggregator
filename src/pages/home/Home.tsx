import Search from '@/components/custom/search/Search'
import Header from '@/components/custom/header/Header'
import Filters from '@/components/custom/filters/Filters'
import PostsWrapper from '@/components/custom/posts-wrapper/PostsWrapper'

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="container flex flex-col gap-6">
        <Search />
        <Filters />
        <PostsWrapper />
      </div>
    </div>
  )
}

export default Home
