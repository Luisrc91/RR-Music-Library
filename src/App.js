import './App.css';
import { useEffect, useState, useRef } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext';


function App() {
  let [search, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')
  let searchInput = useRef('')

 useEffect(() => {
    if (search) {
        const fetchData = async () => {
            document.title = `${search} Music`
            const response = await fetch(`https://itunes.apple.com/search?term=${search}`)
            const resData = await response.json()
            if(resData.results.length > 0) {
                return setData(resData.results)
            } else {
                return setMessage('Not Found.')
            }
        }
        fetchData()
    }
}, [search]
)



 
const handleSearch = (e, term) => {
  e.preventDefault()
  const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch(`https://itunes.apple.com/search?term=${term}`)
      const resData = await response.json()
      if (resData.results.length > 0) {
          return setData(resData.results)
      } else {
          return setMessage('Not Found.')
      }
  }
  fetchData()
}

  return (
    <div className="App">
      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch,
      }}>
        <SearchBar />
      </SearchContext.Provider>
           {/* <SearchBar handleSearch={handleSearch} /> */}
      {message}
      <DataContext.Provider value={{ data}}>
      <Gallery data={data} />
      </DataContext.Provider>
    </div>
  );
}

export default App;