import React from 'react';

const List = ({ listData, select }) => { 
  return (
    <div>
      {
        listData.map((seconds, index) => {
          const date = new Date(0);
          date.setUTCSeconds(seconds);

          return (
            <div key={index} onClick={select} data-epochdate={seconds}>{ date.toDateString() }</div>
          )
        })
      }
    </div>
  )
}

export default List;