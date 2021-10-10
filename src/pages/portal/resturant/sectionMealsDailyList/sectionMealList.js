import React from 'react'
import {
    Table,
    Container,
} from "reactstrap";
import './index.css'


export default function SectionMealList(props) {
  const {mealsDailyList, sectionDayMealsStatistics} = props;
  return (
    <div style={{padding:'auto'}}>
      <Table  hover striped responsive >
      <thead id='tableHeader' style={{fontSize:'1.1em', fontWeight:'bold',color:'black',backgroundColor:'#cfe1f8',borderRadius:'.3em', width:'70%'}}>
        <tr >
          <th style={{ width: "4%" }}>#</th>
          <th style={{ width: "40%", textAlign:'center'  }}>نام و نام خانوادگی</th>
          <th style={{ width: "56%", textAlign:'center'  }}>نام غذا</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody id='tableBody' style={{fontWeight:'bold', color:'rgb(53, 9, 9)'}}>
        {mealsDailyList ? 
        mealsDailyList.map((meal, index) => {                  
            return ( 
              <tr key={index}>
                <td style={{ width: "4%" }}>{index + 1}</td>
                <td style={{ width: "40%", textAlign:'center'  }}>{meal.employee__first_name + ' ' + meal.employee__last_name}</td>
                <td style={{ width: "56%", textAlign:'center'  }}>{meal.resturaunt_day_meal__resturaunt_meal__name}</td>
              </tr>
            );
          }):<div></div>
        }
      </tbody>
      <tfoot >
        <tr >
            <td style={{ width: "4%" }} >
            </td>
            <td style={{ width: "54%" }}>
              <Table  hover striped responsive style={{margin:'auto', marginTop:'1em'}}>
                <tbody id='innerTableBody' style={{fontWeight:'bold', color:'rgb(53, 9, 9)'}}>
                  {sectionDayMealsStatistics ? 
                    sectionDayMealsStatistics.map((sdms, index) => {
                      return(
                        <tr key={index}>
                          <td style={{weight:'20%'}}></td>
                          <td style={{weight:'50%'}}>{sdms.meal_name}</td>
                          <td style={{weight:'10%'}}>{sdms.meal_no}</td>
                          <td style={{weight:'20%'}}></td>
                        </tr> 
                      ); 
                    }) :<div></div>
                  }
                </tbody>
              </Table>   
            </td>
            <td style={{width: "40%"}}></td>
        </tr>
      </tfoot>
    </Table>
    </div>
  )
}

