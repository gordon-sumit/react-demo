export default function ({totalPages, currentPage, paginate}) {

    return <nav aria-label="Page navigation">
        <ul className="pagination">
            <li className="page-item">
                <a className={`page-link ${currentPage < 2 && 'disabled'}`}
                   onClick={() => paginate(currentPage - 1)}
                   href="#">Previous
                </a>
            </li>
            {Array.from({length: totalPages}, (_, index) => (
                <li key={index + 1} className="page-item">
                    <a className={`page-link ${currentPage === index + 1 && 'disabled'}`} href="#"
                       onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </a>
                </li>
            ))}
            <li className="page-item">
                <a className={`page-link ${currentPage === totalPages && 'disabled'}`}
                   onClick={() => paginate(currentPage + 1)}
                   href="#">Next
                </a></li>
        </ul>
    </nav>
}