import React from 'react'

const Incomes = (incomes) => {
  let valuesOfIncomes = incomes.incomes.flatMap((income) => {
    return [parseFloat(income.value)]
  })

  let sumOfIncomes = valuesOfIncomes.reduce((a, b) => a + b, 0)
  let sumOfIncomesRound = sumOfIncomes.toFixed(2)
  let averageOfIncomes = (sumOfIncomes / valuesOfIncomes.length).toFixed(2)

  return (
    <>
      <span>{sumOfIncomesRound} </span>
      <span>{averageOfIncomes} </span>
    </>
  )
}

export default Incomes
