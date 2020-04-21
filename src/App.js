import React, { useContext } from 'react'
import './App.css'
import { CompaniesContext } from './contexts/CompaniesContext'
import Table from './components/Table'

function App() {
  const [companies, loading, error] = useContext(CompaniesContext)

  return (
    <div className='App'>
      <header className='App-header'>
        {loading && <p className='initial-message'>Loading...</p>}
        {error && <p className='initial-message'>Something went wrong...</p>}
        {companies && <Table />}
      </header>
    </div>
  )
}

export default App
