import React from 'react';

import List from './list.component';

/**
 * Creates a wrapper for list element components
 * @param { object} data
 * @param { function } onSelect
 * @return { HTMLElement }
 */
const DateList = ({ data, onSelect }) => {   
  return (
    <div id="datelist">
      {
        data
          ? <List
            listData={ data }
            onSelect={ onSelect }  />
          : <div>No Data Available!</div>
      }
    </div>
  )
}

export default DateList;