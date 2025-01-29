import ReactPaginate from 'react-paginate';

export default function Pagination({ setCurrentPage, totalPages }) {
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };
    return (
        <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName='px-3'
            activeClassName='bg-primary-blue rounded-md text-white px-2'
            className='flex gap-3'
        />
    );
}
