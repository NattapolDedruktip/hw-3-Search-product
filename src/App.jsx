import { useEffect, useState } from "react"
import ProductList from "./ProductList"
import SearchBar from "./SearchBar"


function App() {
  const [search, setSearch] = useState('')

  const [data, setData] = useState([])

  const [filter, setFilter] = useState([])


  const fetchData = async () => {
    const resp = await fetch('https://dummyjson.com/products')
    const result = await resp.json()
    let newData = result.products
    setData(newData)
  }

  useEffect(() => {
    fetchData()
    console.log(11111)
  }, [])


  useEffect(() => {

    const fetchFromSearch = async () => {
      const respSearch = await fetch(`https://dummyjson.com/products/search?q=${search}`)
      const resultSearch = await respSearch.json()
      setFilter(resultSearch.products)
    }

    let token = setTimeout(() => {
      fetchFromSearch()  
    }, 1000);
  

    return () => {
      clearTimeout(token)
    }
    

  }, [search])

  function hdlChange(e) {
    let newSearch = ((e).target.value)
    setSearch(newSearch)
  }

  return (
    <div className="flex flex-col w-[400px] justify-center items-center">
      <h1>Product Search</h1>
      <SearchBar search={search} setSearch={setSearch} hdlChange={hdlChange} />
      <ProductList search={search} data={data} filter={filter} />
      <button onClick={(e) => console.log(e.target)}>BTN</button>
    </div>
  )
}

export default App
