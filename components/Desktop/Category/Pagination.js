import Link from 'next/link';
import Pagination from "react-js-pagination"
import {useEffect, useState} from 'react'

function Pagi({ totalCount, currentPage, handlePageChange }) {
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="pages text-center">
      
        <Pagination
          activePage={parseInt(currentPage)}
          itemsCountPerPage={40}
          totalItemsCount={totalCount}
          pageRangeDisplayed={5}
          innerClass={'page-numbers pagination'}
          linkClass={'page-numbers'}
          hideFirstLastPages={true}
          activeLinkClass={'page-numbers current  active'}
          onChange={handlePageChange.bind(this)}
        />
      
    </div>
  )
}

export default Pagi