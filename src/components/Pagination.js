import React from 'react'
import '../styles/PaginationStyles.css'
import { range } from '../helpers/range'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

const Pagination = ({
  totalRecords,
  pageLimit,
  currentPage,
  setCurrentPage,
}) => {
  const numOfPageNeighbours = 1
  const pageNeighbours = Math.max(0, Math.min(numOfPageNeighbours, 2))
  const totalPages = Math.ceil(totalRecords / pageLimit)

  const fetchPages = () => {
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const lastPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let pages = range(startPage, lastPage)
      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - lastPage > 1
      const spillOffSet = totalNumbers - (pages.length + 1)

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffSet, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(lastPage + 1, lastPage + spillOffSet)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }
      return [1, ...pages, totalPages]
    }
    return range(1, totalPages)
  }

  const handleClick = (page) => {
    setCurrentPage(page)
  }

  const handleMoveLeft = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleMoveRight = () => {
    setCurrentPage(currentPage + 1)
  }

  if (!totalRecords || totalPages === 1) return null
  const pages = fetchPages()

  return (
    <div aria-label='Pagination' className='pagination'>
      <span className='pages'>
        {currentPage}/{totalPages}
      </span>
      <ul className='pages'>
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <ul key={index} className='page-item'>
                <span
                  className='page-link'
                  aria-label='Previous'
                  onClick={() => handleMoveLeft()}>
                  <span aria-hidden='true'> &laquo; </span>
                  <span className='sr-only'> Previous </span>
                </span>
              </ul>
            )

          if (page === RIGHT_PAGE)
            return (
              <ul key={index} className='page-item'>
                <span
                  className='page-link'
                  aria-label='Next'
                  onClick={() => handleMoveRight()}>
                  <span className='sr-only'> Next </span>
                  <span aria-hidden='true'> &raquo; </span>
                </span>
              </ul>
            )
          return (
            <ul
              key={index}
              className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <span className='page-link' onClick={() => handleClick(page)}>
                {page}
              </span>
            </ul>
          )
        })}
      </ul>
    </div>
  )
}

export default Pagination
