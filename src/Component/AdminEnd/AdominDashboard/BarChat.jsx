import React, { useState } from 'react'
 import {Doughnut} from "react-chartjs-2"
 import {chart as chartjs} from "chart.js/auto"
 import { Data } from './DataChart'
const BarChat = () => {
    const [userData,setUserData]=useState({
        labels:Data.map((dat)=>dat.year),

        datasets:[{
            label:"user gain",
            data :Data.map((dat)=>dat.userGain),
            backgroundColor:[
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "50AF95",
                "#f3ba2f",
                "#2a71d0"
            ]
            
        }]
    })
  return (<div style={{width:"300px"}}>
      <Doughnut  data={userData}/>
  </div>

  ) 

}

export default BarChat