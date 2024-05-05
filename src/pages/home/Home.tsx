import Search from '@/components/custom/search/Search'
import Header from '@/components/custom/header/Header'
import Posts from '@/components/custom/posts/Posts'

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="container flex flex-col">
        <Search />
        <Posts />
      </div>
    </div>
  )
}

export default Home