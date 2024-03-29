import React, { useMemo } from 'react'
import { Edit2, Trash } from "react-feather";
import { useTable } from 'react-table'
import './table.css'



export const DoctorTypeChildBaseTable = (props) => {
    const { parentRecords, childRecords, childName, header, editRecord, removeRecord } = props
    const data = useMemo(() => childRecords, [childRecords])

    const columns = React.useMemo(
        () => [
            {
                Header: '',
                maxWidth: '10%',
                minWidth: '5%',
                width: '5%',            
                id: 'delete',
                accessor: (str) => 'delete',
        
                Cell: (tableProps) => (
                    <Trash style={{cursor:'pointer'}}
                    onClick={() =>
                        data.map((d, index) => index === tableProps.row.index ? removeRecord(d.id) : '')
                    }
                    className="align-middle"
                    size={18}
                    />
                ),
            },
            {
                Header: '',
                maxWidth: '10%',
                minWidth: '5%',
                width: '5%',
                id: 'edit',
                accessor: (str) => 'edit',
        
                Cell: (tableProps) => (
                    <Edit2 style={{cursor:'pointer'}}
                    onClick={() =>
                        data.map((d, index) => index === tableProps.row.index ? editRecord(d.id) : '')
                    }
                    className="align-middle"
                    size={18}
                    />
                ),
            },
            {
                Header: header,
                maxWidth: '90%',
                minWidth: '80%',
                width: '85%',
                Cell: (tableProps) => (
                    <span style={{cursor:'pointer'}}>{console.log('childName: ', childName)}
                        {data.map((child, index) => index === tableProps.row.index ? 
                        (childName && childName.length > 0 && 
                         childName.filter(parent => parent.id === child.employee) &&
                         childName.filter(parent => parent.id === child.employee).length > 0 ? 
                         childName.filter(parent => parent.id === child.employee)[0]['first_name'] + ' ' +
                         childName.filter(parent => parent.id === child.employee)[0]['last_name']
                         : '')
                          : '')}
                    </span>
                ),                
            },
            {
                Header: 'شرکت',
                maxWidth: '10%',
                minWidth: '5%',
                width: '5%',
                Cell: (tableProps) => (
                    <span style={{cursor:'pointer'}}>
                        {data.map((child, index) => index === tableProps.row.index ? 
                        (parentRecords && parentRecords.length > 0 && 
                         parentRecords.filter(parent => parent.id === child.doctorType) &&
                         parentRecords.filter(parent => parent.id === child.doctorType).length > 0 ? 
                         parentRecords.filter(parent => parent.id === child.doctorType)[0]['name'] : '') : '')}
                    </span>
                ),
            }
        ],
    [data, childName, parentRecords],
    );
 
    const tableInstance = useTable({
        columns,
        data,
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return(
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup, indx) => (
                        <tr key={indx} {...headerGroup.getHeaderGroupProps}>
                            {
                                headerGroup.headers.map((column, index) => (
                                    <th key={index} {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map((row, indx) => {
                        prepareRow(row)
                        return (
                            <tr key={indx} {...row.getRowProps()}>
                            {row.cells.map((cell, index) => {
                                return (
                                    <td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                )
                                })
                            }
                            </tr>                            
                        )
                    })
                }
            </tbody>
        </table>
    );
}
