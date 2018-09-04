import React from 'react';

const List = ({ listData }) => {
  return (
    <div>
      {
        listData.map((item, index) => {
          const utcSeconds = item;
          const date = new Date(0);
          date.setUTCSeconds(utcSeconds);

          return (
            <div key={ index }>{ date.toDateString() }</div>
          )
        })
      }
    </div>
  )
}

export default List;