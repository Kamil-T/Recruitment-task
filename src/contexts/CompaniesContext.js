import React, { createContext, useState, useEffect } from 'react'

export const CompaniesContext = createContext()

const CompaniesProvider = (props) => {
  const [companies, setCompanies] = useState(null)
  const [incomes, setIncomes] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [companiesWithIncomes, setCompaniesWithIncomes] = useState(null)

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)
      try {
        const resComp = await fetch(
          'https://recruitment.hal.skygate.io/companies'
        )
        const jsonComp = await resComp.json()
        setCompanies(jsonComp)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  console.log(companies)
  console.log(companiesWithIncomes)
  const data = [companies, loading, error]

  return (
    <CompaniesContext.Provider value={data}>
      {props.children}
    </CompaniesContext.Provider>
  )
}

export default CompaniesProvider
