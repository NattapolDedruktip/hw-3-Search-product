import { useEffect, useState } from "react"
import ProductList from "./ProductList"
import SearchBar from "./SearchBar"


function App() {
  const [search, setSearch] = useState('')

  const [data, setData] = useState([])

  const [filter, setFilter] = useState([])

  const [skip,setSkip] = useState(0)

  


  const fetchData = async () => {
    // const resp = await fetch('https://dummyjson.com/products')
    const resp = await fetch(`https://dummyjson.com/products?limit=30&skip=${skip}&select=title,price`)
    const result = await resp.json()
    let newData = result.products
    setData(newData)
  }

  useEffect(() => {
    fetchData()
  }, [skip])


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

  const hdlIncSkip = () => {

    if(skip+30 >= 194)  return

    setSkip( (prv) => prv +30)
  }
  const hdlDecSkip = () => {
    if(skip-30 < 0) return

    setSkip( (prv) => prv -30)
  }

  return (
    <div className="flex flex-col w-[400px] justify-center items-center">
      <h1>Product Search</h1>
      <SearchBar search={search} setSearch={setSearch} hdlChange={hdlChange} />
      <ProductList search={search} data={data} filter={filter} />
      <div>

      <button className="px-3 bg-red-400"
       onClick={hdlDecSkip}>-30</button>
      <span> {skip} / 194 </span>
      <button className="px-3 bg-green-400"
       onClick={hdlIncSkip}>+30</button>
      </div>
    </div>
  )
}

export default App
