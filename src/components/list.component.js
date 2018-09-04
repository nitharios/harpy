import React from 'react';

const List = ({ listData }) => {
  return (
    <div>
      {
        listData.map((item, index) => {
          const date = new Date(item);

          return (
            <div key={ index }>{ date.toString() }</div>
          )
        })
      }
    </div>
  )
}

export default List;