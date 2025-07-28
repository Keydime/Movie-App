import React from 'react'
import Search from './Components/Search'
import { useState, useEffect } from 'react'

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main> 
      <div className='pattern'>

        <header className='wrapper'>
          <img src="./hero-img.png" alt="Hero Banner"></img>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        </header>

        <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App