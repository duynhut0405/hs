import React, {useState, useEffect} from 'react';
import Card from './Card'

import NormalCarosel from '../Core/NormalCarosel';


function Html({data,key}) {
  const block = data['0'];

  return (
    <section  className={`block-km bld-${block.identify}`} key={key} style={{padding:block.padding}}>
      <div className="container">
        {
          (block.title) && (
            <div className="ht"><h2>{ block.title }</h2></div>
          )
        }
        {
          block.slide == 2 ? 
            <NormalCarosel 
              arrow={true}
              dot={true}
              loop= {true}
              autoplay={true}
              res={[3,3,2,1]}
            >
              <h1>1</h1>
              <h1>2</h1>
              <h1>3</h1>
              <h1>4</h1>
              <h1>5</h1>
              <h1>6</h1>
              <h1>7</h1>
              {
              block.details.pictures.map(
                (items, index) => (
                  <Card data={items} key={index} />
                )
              )
              } 
            </NormalCarosel>
          : 
          <div className="row list-item">
            {
            block.details.pictures.map(
              (items, index) => (
                <div key={index} className={` col-md-${12/block.columns} `}>
                  <Card data={items} key={index} />
                </div>
              )
            )
            }    
          </div>      
        }
      </div>
    </section>
  );
}
export default Html;
