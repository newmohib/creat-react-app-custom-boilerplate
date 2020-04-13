import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { Pagination } from '../index'

let Users = (props) => {
    let [isDesplay, setIsDesplay] = useState(null);
    let [pageInfo, setPageInfo] = useState({ pageSize: 5, totalCount: 0, currentPage: 1, pagesCount: 0, pages: [], paginationList: [1,2,3,4,5,6], isPrevious: "", isNext: "" ,pageSizeList:[5,10,20,30,50]});
    let [data,setData]=useState({dataList:[],fromDataIndex:0,toDataIndex:pageInfo.pageSize});

    let viewDetails = (index) => {
        if (isDesplay === index) {
            setIsDesplay(null);
        } else {
            setIsDesplay(index);
        }
    };

    let getAllData=(fromDataIndex,toDataIndex)=>{
        let dataList = [{ id: 1, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" }, { id: 2, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" }, { id: 3, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" }, 
        { id: 4, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 5, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 6, firstName: "Mohib13", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 7, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 8, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 9, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 10, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 11, firstName: "Mohib", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 12, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 13, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 14, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 15, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 16, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 17, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 18, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 19, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 20, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 21, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 22, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 23, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 24, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 25, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
        { id: 26, firstName: "Mohib12", lastName: "Rahman", email: "mohib@gmail.com" },
    ];
        let newDataList =dataList.slice(fromDataIndex,toDataIndex)

         let responseData={dataList: newDataList,totalCount:dataList.length}
         return responseData;

    }


    useEffect(
        () => {
            let  fromDataIndex= data.fromDataIndex;
            let  toDataIndex= data.toDataIndex;
            let {totalCount}=getAllData(fromDataIndex,toDataIndex);
            //console.log("test",totalCount);

            setPageInfo({...pageInfo,totalCount});
        },[]
    );

    useEffect(
        () => {
           // console.log("test2");
            let  fromDataIndex= pageInfo.currentPage === 1? 0 : (pageInfo.currentPage * pageInfo.pageSize) - pageInfo.pageSize;
            let  toDataIndex=pageInfo.currentPage === 1? pageInfo.pageSize: pageInfo.currentPage * pageInfo.pageSize;
           // console.log(fromDataIndex,toDataIndex);
            let {dataList,totalCount}=getAllData(fromDataIndex,toDataIndex);
           // console.log(dataList,totalCount);
            setData({dataList:dataList,fromDataIndex,toDataIndex})
            setPageInfo({...pageInfo,totalCount});
        },[pageInfo.currentPage,pageInfo.pageSize]
    );

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-12 col-xl-12 col-lg-12 col-sm-12">
                <div className="container custom_form mt-5">
                    <div className="row  mt-0 mr-n4 ml-n4 justify-content-center h3">All Users</div>
                    <div className="row  mt-0 mr-n4 ml-n4">
                        <div className="col-12">
                            <div className="m-2">
                                <div className="container-fluid border ">
                                    <div className="row text-center font-weight-bold border-bottom">
                                        <div className="col">
                                            <div className="border-right">
                                                <div className=" p-2">
                                                    ID
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="border-right">
                                                <div className=" p-2">
                                                    First Name
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="border-right">
                                                <div className=" p-2">
                                                    Last Name
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="border-right">
                                                <div className=" p-2">
                                                    Email
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="">
                                                <div className=" p-2">
                                                    Action
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        data.dataList.map((item, index) => {
                                            let borderClass = data.dataList.length - 1 !== index || index === isDesplay ? "border-bottom" : ""
                                            return (
                                                <div key={index} >
                                                    <div className={`row text-center  ${borderClass}`}>
                                                        <div className="col">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.id}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.firstName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.lastName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="border-right">
                                                                <div className=" p-2">
                                                                    {item.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="">
                                                                <div className="p-1">
                                                                    <button onClick={() => viewDetails(index)} type="button" className="btn btn-primary btn-sm">More Options</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        isDesplay === index &&
                                                        <div className={`row border-bottom`}>
                                                            <div className="col">
                                                                Test
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <Pagination pageInfo={pageInfo} setPageInfo={setPageInfo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = state => ({
    //signinInfo: state.signin,
})

const mapDispatchToProps = dispatch => ({
    // handleSigninChange: (value) => dispatch(handleSigninChange(value)),
    // handleSigninSubmit: (value) => dispatch(handleSigninSubmit(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);