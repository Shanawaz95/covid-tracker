import React from 'react';
import moment from "moment";
import "./SelectBox.css";


interface filters {
    location?: string
    gender?: string
    age?: string
    status?: string
    from?: string
    to?: string
}

interface selectBoxProps  {
    fieldName:keyof filters
    filters:filters
    setFilter:React.Dispatch<React.SetStateAction<filters>>
    options: Array<string>;
    defaultOpt: string;
}

function SelectBox({fieldName,filters, setFilter, options, defaultOpt}:selectBoxProps) {

    function changeHandler(event:React.ChangeEvent<HTMLSelectElement>) {
        setFilter({...filters,[fieldName]:event.target.value})
      }

      let isDate = false;
      if (fieldName=="from" || fieldName=="to") {
        isDate=true
      }


    return (
        <div>
            <select className={isDate?"selectBox dateBox":"selectBox"}
            value={filters[fieldName]}
            onChange={changeHandler}>
                <option value="" hidden>
                    {defaultOpt}
                </option>
                {options.map((val,id)=>(
                    <option key={id.toString()}>{isDate? moment(new Date(Number(val))).format("YYYY-MM-DD"):val}</option>
                ))}
            </select>
        </div>
    );
}

{/* <select
            className="form-item"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option value="" hidden>
              Select a Breed
            </option>
            {Object.keys(data).map((val, key) => (
              <option key={key} value={val}>
                {val}
              </option>
            ))}
          </select> */}


export default SelectBox;