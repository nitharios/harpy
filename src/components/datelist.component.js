import React from 'react';

import List from './list.component';

const DateList = ({ data }) => {    
  return (
    <div id="datelist">
      {
        data
          ? <List
            listData={data.layerDates} />
          : <div>No Data World!</div>
      }
    </div>
  )
}

export default DateList;