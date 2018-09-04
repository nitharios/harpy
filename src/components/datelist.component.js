import React from 'react';

import List from './list.component';

const DateList = ({ data, selectFunc }) => {    
  return (
    <div id="datelist">
      {
        data
          ? <List
            listData={ data.layerDates }
            select={ selectFunc }  />
          : <div>No Data World!</div>
      }
    </div>
  )
}

export default DateList;