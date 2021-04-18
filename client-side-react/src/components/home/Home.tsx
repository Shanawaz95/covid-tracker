import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import moment from "moment";
import "./Home.css"
import Filters from "../filters/Filters";

interface filterLayout {
      location?: string
      gender?: string
      age?: string
      status?: string
      from?: string
      to?: string
}


function Home() {
const[filters, setFilters] = useState<filterLayout>({from:"2020-01-30"})



  const FETCH_ALL = gql`
  query getData(
      $location: String
      $gender: String
      $age: String
      $status: String
      $from: String
      $to: String)
  
  {
      getData(filters: {
        location: $location
        gender: $gender
        age: $age
        status: $status
        from: $from
        to: $to}){

      _id
      active
      recovered
      deceased
      others
    }
  }
    
  `

let {loading, data} = useQuery(FETCH_ALL,{variables: filters});

// loading? data=data: (data.getData.map((ele:any)=>{
//   ele["date"] = moment(new Date(ele._id)).format('YYYY-MM-DD')
// }))


    return loading?(<div className="load"></div>):(
        <div>
            <h1>COVID TRACKER</h1>
            <Filters filters={filters} setFilter={setFilters}></Filters>
            <div>
            <ResponsiveContainer className="chart-container" width="96%" height={500}>
              <BarChart
          data={data.getData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id"
                          tickFormatter = {(_id) => moment(new Date(_id)).format('MM-YY')}
                          type='number'
                          domain={['auto', 'auto']}
                          scale="auto"
          
          />
          <YAxis domain={['dataMin', 'dataMax']} />
          <Tooltip />
          <Legend />
          <Bar dataKey="active" stackId="a" fill="#363491" />
          <Bar dataKey="recovered" stackId="a" fill="#349158" />
          <Bar dataKey="deceased" stackId="a" fill="#913434" />
          <Bar dataKey="others" stackId="a" fill="#d6d6b0" />
        </BarChart>
        </ResponsiveContainer>
        </div>
        </div>
    )
}

export default Home;

