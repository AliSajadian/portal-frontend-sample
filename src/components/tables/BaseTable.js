import React, { useMemo } from 'react'
import { Edit2, Trash } from "react-feather";
import { useTable } from 'react-table'
import './table.css'



export const BaseTable = (props) => {
    // const columns = useMemo(() => Columns, [])
    const { dataRecords, columnList, editRecord, removeRecord } = props
    const data = useMemo(() => dataRecords, [dataRecords])
    
    var columnHears = [
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
                className="align-middle "
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
    ]
    const columnsNo = columnHears.length
    if(columnsNo === 2){
        columnList.map(col => columnHears.push(col))
    }

    const columns = React.useMemo(
        () => columnHears,
    [data],
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
