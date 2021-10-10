import React from 'react'
import {
    Table,
} from "reactstrap";
import '../pages/portal/resturant/mealsDailyList/index.css'


export default function SectionMealList(props) {
  const {projectCheck, mealsDailyList, departmentDayMealsStatistics, projectDayMealsStatistics} = props;
  return (
    <div style={{padding:'auto'}}>
      <Table  hover  responsive style={{margin:'auto'}} >
        <thead id='tableHeader' style={{fontWeight:'bold',fontSize:'1.1em',color:'black',backgroundColor:'#cfe1f8',borderRadius:'.3em'}}>
          <tr style={{width:'100%'}}>
            <th style={{ width: "4%" }}>#</th>
            <th style={{ width: "40%", textAlign:'center'  }}>نام و نام خانوادگی</th>
            <th style={{ width: "56%", textAlign:'center'  }}>نام غذا</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody id='tableBody' style={{fontWeight:'bold', color:'rgb(53, 9, 9)'}}>
          {mealsDailyList.map((meal, index) => {                  
              return ( 
                <tr key={index} >
                  <td style={{ width: "4%" }}>{index + 1}</td>
                  <td style={{ width: "40%", textAlign:'center'  }}>{meal.employee__first_name + ' ' + meal.employee__last_name}</td>
                  <td style={{ width: "56%", textAlign:'center'  }}>{meal.resturaunt_day_meal__resturaunt_meal__name}</td>
                </tr>
              );
            })
        }
        </tbody>
        <tfoot >
          <tr>
            <td style={{ width: "4%" }} >
            </td>
            <td style={{ width: "54%" }}>
            {!projectCheck ?  
            <Table  hover responsive style={{margin:'auto', marginTop:'1em'}}>
              <tbody id='innerTableBody' style={{fontWeight:'bold', color:'rgb(53, 9, 9)'}}>
              {departmentDayMealsStatistics ? 
              departmentDayMealsStatistics.map((ddms, index) => {
                  return(
                  <tr key={index}>
                      <td style={{weight:'20%'}}></td>
                      <td style={{weight:'50%'}}>{ddms.meal_name}</td>
                      <td style={{weight:'10%'}}>{ddms.meal_no}</td>
                      <td style={{weight:'20%'}}></td>
                  </tr> 
                  ); 
              }) :<div></div>
              }
              </tbody>
            </Table>        
          : 
            <Table  hover responsive style={{margin:'auto', marginTop:'1em'}}>
              <tbody style={{fontWeight:'bold', fontSize:'1.2em', color:'rgb(53, 9, 9)'}}>
              {projectDayMealsStatistics ? 
              projectDayMealsStatistics.map((pdms, index) => {
                  return(
                  <tr key={index}>
                      <td style={{weight:'20%'}}></td>
                      <td style={{weight:'50%'}}>{pdms.meal_name}</td>
                      <td style={{weight:'10%'}}>{pdms.meal_no}</td>
                      <td style={{weight:'20%'}}></td>
                  </tr> 
                  ); 
              }) :<div></div>
              }
              </tbody>
            </Table>        
            }            
            </td>
            <td style={{width: "40%"}}></td>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}