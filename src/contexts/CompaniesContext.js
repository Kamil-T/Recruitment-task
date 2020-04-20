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
            let valuesOfIncomes = await jsonInco.incomes.flatMap((income) => {
              let numbers = parseFloat(income.value)
              return [numbers]
            })
            let totalIncome = await valuesOfIncomes.reduce((a, b) => a + b, 0)
            let totalIncomeRound = await totalIncome.toFixed(2)
            let averageIncome = await (
              totalIncome / valuesOfIncomes.length
            ).toFixed(2)

            let today = await new Date()
            let lastMonth = await (today.getMonth() - 1)
            let relevantYear = await today.getFullYear()
            if (lastMonth === -1) {
              relevantYear = -1
              lastMonth = 11
            }
            const lastMonthIncome = await jsonInco.incomes
              .filter((i) => {
                const date = new Date(i.date)

                return (
                  date.getFullYear() === relevantYear &&
                  date.getMonth() === lastMonth
                )
              })
              .reduce((prev, curr) => prev + parseFloat(curr.value), 0)
              .toFixed(2)

            return {
              ...jsonInco,
              totalIncome: parseFloat(totalIncomeRound),
              averageIncome: parseFloat(averageIncome),
              lastMonthIncome: parseFloat(lastMonthIncome),
            }
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
