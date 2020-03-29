import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function Pagination(props) {

    let [pageInfo, setPageInfo] = useState({ pageSize: 2, totalCount: 5, currentPage: 1, pagesCount: 0, pages: [], paginationList: [], isPrevious: "", isNext: "" });

    useEffect(
        () => {
            const pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
            const pages = _.range(1, pagesCount + 1);
            let paginationList = [...pageInfo.paginationList];
            if (pagesCount > 2 && pagesCount >= pageInfo.currentPage + 4) {
                paginationList = [pageInfo.currentPage + 1, pageInfo.currentPage + 2, pageInfo.currentPage + 3];
            }
            else if (pagesCount > 2 && pagesCount >= pageInfo.currentPage + 3) {
                paginationList = [pageInfo.currentPage + 1, pageInfo.currentPage + 2];
            }
            else if (pagesCount > 2 && pagesCount >= pageInfo.currentPage + 2) {
                paginationList = [pageInfo.currentPage + 1];
            }

            let isPrevious = pageInfo.currentPage === pagesCount - 1 ? "" : "disabled";
            let isNext = pages.length === pagesCount ? "" : "disabled";

            //console.log("isPrevious",isPrevious,"isNext",isNext,pageInfo.currentPage ,pagesCount);

            setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext });
        }, [pageInfo.currentPage]);

    const pageChange = (pageNumber => {
        setPageInfo({ ...pageInfo, currentPage: pageNumber });
        console.log(pageNumber);
    })
    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mt-3">
                    <li className={`page-item ${pageInfo.isPrevious}`} >
                        <a onClick={() => pageChange(pageInfo.currentPage - 1)} className="page-link px-4" >Previous</a>
                    </li>
                    {
                        pageInfo.paginationList.map((item, index) => {
                            return (<li key={index + 20} className="page-item">
                                <a onClick={() => pageChange(item)} className="page-link px-4">{item}</a>
                            </li>)
                        })
                    }
                    <li className={`page-item ${pageInfo.isNext}`}>
                        <a onClick={() => pageChange(pageInfo.currentPage + 1)} className="page-link px-4" >Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;