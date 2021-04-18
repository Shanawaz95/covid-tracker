import React from 'react';
import SelectBox from "../reuseable/SelectBox";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import "./Filters.css";

interface filters {
        location?: string
        gender?: string
        age?: string
        status?: string
        from?: string
        to?: string
}

interface filterProps{
    filters:filters
        setFilter:React.Dispatch<React.SetStateAction<filters>>
}

function Filters({filters,setFilter}:filterProps) {
    const FETCH_FILTERS = gql `
    query 
    {
      getFilters{
        location
        gender
        age
        status
        dates
      }
    }
    `

    const {loading, data} = useQuery(FETCH_FILTERS)


    return loading?<div className="load2"></div>:(
      <>
        <div className="selectContainer anim">
          <div className="filterText">
          <h2>Filters</h2>
          </div>
          
          <div className="nonDateContainer">
            <SelectBox fieldName="location" filters={filters} setFilter={setFilter} options={data.getFilters.location} defaultOpt="select location"></SelectBox>
            <SelectBox fieldName="gender" filters={filters} setFilter={setFilter} options={data.getFilters.gender} defaultOpt="select gender"></SelectBox>
            <SelectBox fieldName="age" filters={filters} setFilter={setFilter} options={data.getFilters.age} defaultOpt="select age"></SelectBox>
            <SelectBox fieldName="status" filters={filters} setFilter={setFilter} options={data.getFilters.status} defaultOpt="select status"></SelectBox>
            </div>
            <div className="dateContainer">
            <SelectBox fieldName="from" filters={filters} setFilter={setFilter} options={data.getFilters.dates} defaultOpt="from date"></SelectBox>
            <SelectBox fieldName="to" filters={filters} setFilter={setFilter} options={data.getFilters.dates} defaultOpt="to date"></SelectBox>
            </div>
        </div>
        </>
    );
}

export default Filters;