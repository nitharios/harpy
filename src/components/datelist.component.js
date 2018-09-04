import React from 'react';

import List from './list.component';

/**
 * Creates a wrapper for list element components
 * @param { object} data
 * @param { function } selectFunc
 * @return { HTMLElement }
 */
const DateList = ({ data, selectFunc }) => {    
  return (
    <div id="datelist">
      {
        data
          ? <List
            listData={ data.layerDates }
            select={ selectFunc }  />
          : <div>No Data Available!</div>
      }
    </div>
  )
}

export default DateList;