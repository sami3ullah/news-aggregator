import Search from '@/components/custom/search/Search'
import Header from '@/components/custom/header/Header'
import Posts from '@/components/custom/posts/Posts'
import React from 'react'
import Filters from '@/components/custom/filters/Filters'

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('covid')
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="container flex flex-col gap-6">
        <Search setSearchQuery={setSearchQuery} />
        <Filters />
        <Posts searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default Home
