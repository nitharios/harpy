import React from 'react';

const List = ({ listData }) => {
  return (
    <div>
      {
        listData.map((item, index) => {
          const utcSeconds = item;
          const d = new Date(0);
          d.setUTCSeconds(utcSeconds);

          return (
            <div key={ index }>{ d.toLocaleString() }</div>
          )
        })
      }
    </div>
  )
}

export default List;