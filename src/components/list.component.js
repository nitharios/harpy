import React from 'react';

/**
 * 
 * Maps over an array to return the list of available epoch times for rendering
 * @param { array } listData
 * @param { function } onSelect
 * @return { HTMLElement }  
 */
const List = ({ listData, onSelect }) => {   
  return (
    <div>
      {
        listData.map((seconds, index) => {
          const date = new Date(0);
          date.setUTCSeconds(seconds);

          return (
            <div key={index} onClick={onSelect} data-epochdate={seconds}>{ date.toDateString() }</div>
          )
        })
      }
    </div>
  )
}

export default List;