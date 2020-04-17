import React, { useContext } from 'react'
import Incomes from './Incomes'
import { CompaniesContext } from '../contexts/CompaniesContext'

const Company = () => {
  const [companies] = useContext(CompaniesContext)

  return (
    <>
      {companies.map((company) => (
        <p>
          <span>{company.id} </span>
          <span>{company.name} </span>
          <span>{company.city} </span>
          <Incomes id={company.id} />
        </p>
      ))}
    </>
  )
}

export default Company
