import React, { useState, useEffect } from 'react';
import _ from 'lodash';

function Pagination(props) {

    useEffect(
        () => {
            let { pageInfo, setPageInfo } = props;
            let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
            let pages = _.range(1, pagesCount + 1);

            let paginationList = [...pageInfo.paginationList];

            if (pages.length < paginationList.length) {
                paginationList = pages
            } else {
                console.log("paginationList", pages, paginationList.length);
                let newPaginationList = [];
                for (let i = 0; i < paginationList.length; i++) {
                    let element = pages[i];

                    console.log("element", element);
                    newPaginationList.push(element);
                }
                paginationList = newPaginationList;
            }
            let isPrevious = pageInfo.currentPage === 1 ? "disabled" : "";
            let isNext = pageInfo.currentPage === pagesCount ? "disabled" : "";
            props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext });

        }, [props.pageInfo.totalCount]
    );

    const pageChangeNext = ((currentPage) => {
        let { pageInfo, setPageInfo } = props
        let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
        let pages = _.range(1, pagesCount + 1);
        let paginationList = [...pageInfo.paginationList];
        let listChangeIndex = Math.ceil(paginationList.length / 2);

        if (pages.length < paginationList.length) {
            paginationList = pages;
        } else if (pages.length > paginationList.length && (currentPage + paginationList.length - listChangeIndex) <= pagesCount) {

            let newPaginationList = [];
            for (let i = 0; i < paginationList.length; i++) {
                if (currentPage <= pageInfo.totalCount && currentPage >= paginationList[listChangeIndex]) {
                    let element = paginationList[i] + 1;
                    newPaginationList.push(element);
                } else {
                    newPaginationList = paginationList
                }
            }
            paginationList = newPaginationList;
        }

        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === pagesCount ? "disabled" : "";
        props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext, currentPage: currentPage });
    });

    const pageChangePrevious = ((currentPage) => {

        console.log("pageStr", currentPage);
        let { pageInfo, setPageInfo } = props
        let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
        let pages = _.range(1, pagesCount + 1);
        let paginationList = [...pageInfo.paginationList];
        let listChangeIndex = Math.ceil(paginationList.length / 2);

        if (pages.length < paginationList.length) {
            paginationList = pages;
        } else if (pages.length > paginationList.length && (currentPage + paginationList.length - listChangeIndex) < pagesCount) {
            let newPaginationList = [];
            for (let i = paginationList.length; i > 0 ; i--) {
                if ( paginationList[i-1] > 1) {
                    let element = paginationList[i-1] - 1;
                    newPaginationList.unshift(element);
                 }
                else {
                    newPaginationList = paginationList
                }
            }
            paginationList = newPaginationList;
        }

        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === pagesCount ? "disabled" : "";
        props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext, currentPage: currentPage });
    });

    const pageChangeFixed=(currentPage)=>{
        console.log("currentPage", currentPage);
        let { pageInfo, setPageInfo } = props
        let pagesCount = Math.ceil(pageInfo.totalCount / pageInfo.pageSize);
        let pages = _.range(1, pagesCount + 1);
        let paginationList = [...pageInfo.paginationList];
        let listChangeIndex = Math.ceil(paginationList.length / 2);

        console.log("pages.length",currentPage - paginationList.length + listChangeIndex, pagesCount,listChangeIndex);
        if (pages.length < paginationList.length) {

            paginationList = pages;
        } else if (pages.length > paginationList.length && (currentPage - paginationList.length + listChangeIndex) < pagesCount && currentPage < pagesCount) {
            let newPaginationList = [];
            let currentPageIndex= paginationList.indexOf(currentPage);
            // console.log("currentPageIndex",currentPageIndex);
            // console.log("listChangeIndex",listChangeIndex);
            for (let i = 0; i < paginationList.length; i++) {

                if ( i > 0 && i <= listChangeIndex && currentPage > listChangeIndex ) {
                    let element = currentPage-i;
                    //console.log("1",element);
                     newPaginationList.unshift(element);  
                }
                else if(listChangeIndex === i && currentPage > listChangeIndex){
                    let element = currentPage+1;
                   // console.log("2",element);
                     newPaginationList.push(element);
                }
                else if( i > 0 && i > listChangeIndex && currentPage > listChangeIndex ){
                    let element = newPaginationList[i-1]+1;
                   // console.log("3",element);
                    if (element <=pagesCount ) {
                        newPaginationList.push(element);
                    }
                    else if(element > pagesCount ){
                        let element = newPaginationList[0]-1;
                        newPaginationList.unshift(element);
                    }
                }
                else if(i === 0 && currentPage > listChangeIndex){
                    let element = currentPage-i;
                   // console.log("4",element);
                     newPaginationList.unshift(element);
                }else{
                    newPaginationList = paginationList
                }

                //  if ( i > 0 && i <= listChangeIndex && currentPage-i >1) {
                //     let element = currentPage-i;
                //     console.log("1",element);
                //      newPaginationList.unshift(element);  
                // }
                // else if(listChangeIndex === i){
                //     let element = currentPage+1;
                //     console.log("2",element);
                //      newPaginationList.push(element);
                // }
                // else if( i > 0 && i > listChangeIndex){
                //     let element = newPaginationList[i-1]+1;
                //     console.log("3",element);
                //     newPaginationList.push(element);
                // }
                // else if(i === 0){
                //     let element = currentPage-i;
                //     console.log("4",element);
                //      newPaginationList.unshift(element);
                // }

            }
        
            console.log(newPaginationList);
            paginationList = newPaginationList;
        }

        let isPrevious = currentPage === 1 ? "disabled" : "";
        let isNext = currentPage === pagesCount ? "disabled" : "";
        props.setPageInfo({ ...pageInfo, pagesCount, pages, paginationList, isPrevious, isNext, currentPage: currentPage });
    }

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mt-3">
                    <li className={`page-item ${props.pageInfo.isPrevious}`} >
                        <a onClick={() => pageChangePrevious(props.pageInfo.currentPage - 1)} className="page-link px-4" >Previous</a>
                    </li>
                    {
                        props.pageInfo.paginationList.map((item, index) => {
                            return (<li key={index + 20} className="page-item">
                                <a onClick={() => pageChangeFixed(item)} className="page-link px-4">{item}</a>
                            </li>)
                        })
                    }
                    <li className={`page-item ${props.pageInfo.isNext}`}>
                        <a onClick={() => pageChangeNext(props.pageInfo.currentPage + 1)} className="page-link px-4" >Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;