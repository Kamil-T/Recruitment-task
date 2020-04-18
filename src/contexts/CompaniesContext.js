import React, { createContext, useState, useEffect } from 'react'

export const CompaniesContext = createContext()

const CompaniesProvider = (props) => {
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

        let inco = await Promise.all(
          jsonComp.map(async (company) => {
            let resInco = await fetch(
              `https://recruitment.hal.skygate.io/incomes/${company.id}`
            )
            let jsonInco = await resInco.json()
            return jsonInco
          })
        )

        const merge = await Promise.all(
          inco.map((company) => ({
            ...jsonComp.find((incomes) => incomes.id === company.id),
            ...company,
          }))
        )
        setCompaniesWithIncomes(merge)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    fetchCompanies()
  }, [])

  const data = [companiesWithIncomes, loading, error]

  return (
    <CompaniesContext.Provider value={data}>
      {props.children}
    </CompaniesContext.Provider>
  )
}

export default CompaniesProvider
