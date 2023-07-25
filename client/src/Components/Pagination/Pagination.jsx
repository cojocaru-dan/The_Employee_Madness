
export default function Pagination({ 
  totalEmployeesNumber, 
  employeesPerPage, 
  changeToPrev,
  changeToNext,
  currentPage 
}) {

  return (
    <nav>
        <ul className="pagination">
          <li className="change-page" onClick={changeToPrev}>&#10094;</li>
          <li>{currentPage}</li>
          <li className="change-page" onClick={changeToNext}>&#10095;</li>
        </ul>
    </nav>
  )
}
