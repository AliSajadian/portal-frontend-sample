import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Table,
} from "reactstrap";



export default function SectionMealList(props) {
    const {title, projectCheck, mealsDailyList} = props;
    return (

<Card style={{direction:'rtl'}} className='card3D'>
    <CardHeader >
        <CardTitle tag="h5">  
          { 'لیست غذاهای ' }
          {!projectCheck ?  'واحد ' : ' پروژه '} 
          {title} {' به تاریخ '}  {props.persianDate} 
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Table  hover striped responsive >
        <thead id='th'>
          <tr id='tr'>
            <th style={{ width: "4%" }}>#</th>
            <th style={{ width: "40%", textAlign:'center'  }}>نام و نام خانوادگی</th>
            <th style={{ width: "56%", textAlign:'center'  }}>نام غذا</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody id='tb'>
          {mealsDailyList.map((meal, index) => {                  
              return ( 
                <tr key={index}>
                  <td style={{ width: "4%" }}>{index + 1}</td>
                  <td style={{ width: "40%", textAlign:'center'  }}>{meal.employee__first_name + ' ' + meal.employee__last_name}</td>
                  <td style={{ width: "56%", textAlign:'center'  }}>{meal.resturaunt_day_meal__resturaunt_meal__name}</td>
                </tr>
              );
            })
        }
        </tbody>
        <tfoot id="tf">
              <tr>
              </tr>
            </tfoot>
      </Table>
    </CardBody>
  </Card>


    )
}