import React, { useState, useMemo } from 'react'
import { Edit2 } from "react-feather";
import { 
    useTable, 
    useSortBy, 
    useFilters,
    useColumnOrder,
} from 'react-table'
// import ColumnFilter from './ColumnFilter'
import { DefaultColumnFilter, SelectColumnFilter, shuffle, fuzzyTextFilterFn} from "./ColumnFilter";
import './table.css'



export const EmployeeBaseTable = (props) => {
    const { employees, editEmployee } = props

    const data = useMemo(() => employees, [employees])
    const columns = React.useMemo(
        () => [
            {
                Header: '',
                maxWidth: '8%',
                minWidth: '5%',
                width: '6%',
                id: 'edit',
                disableFilters: true,
                disableSortBy: true,
                accessor: (str) => 'edit',
        
                Cell: (tableProps) => (
                    <Edit2 style={{cursor:'pointer'}}
                    onClick={() =>
                        data.map((d, index) => index === tableProps.row.index ? editEmployee(d.id) : '')
                    }
                    className="align-middle"
                    size={18}
                    />
                ),
            }, 
            {
                Header: 'اطلاعات تماس',
                columns: [
                    {
                        Header: 'پست الکترونیکی',
                        accessor: 'email',
                        maxWidth: '10%',
                        minWidth: '8%',
                        width: '9%',
                        disableFilters: true,
                        disableSortBy: true,
                    },    
                    {
                        Header: 'تلفن',
                        accessor: 'phone',
                        maxWidth: '5%',
                        minWidth: '3%',
                        width: '4%',
                        disableFilters: true,
                        disableSortBy: true,
                    },
                ], 
                maxWidth: '15%',
                minWidth: '11%',
                width: '13%',
            },
            {
                Header: 'اطلاعات سازمانی',
                columns: [
                    {
                        Header: 'عنوان شغلی',
                        accessor: 'jobPosition_name',
                        maxWidth: '10%',
                        minWidth: '8%',
                        width: '9%',
                        Filter: SelectColumnFilter,
                        filter: "includes",  
                    
                        // Cell: (props) => (
                        //     <span >
                        //         {(jobPositions && jobPositions.length > 0 && 
                        //             jobPositions.filter(jps => jps.id === props.row.original.jobPosition) &&
                        //             jobPositions.filter(jps => jps.id === props.row.original.jobPosition).length > 0 ? 
                        //             jobPositions.filter(jps => jps.id === props.row.original.jobPosition)[0]['name'] : '')}
                        //     </span>
                        // ),                
                    },  
                    {
                        Header: 'پروژه',
                        accessor: 'project_name',
                        maxWidth: '12%',
                        minWidth: '8%',
                        width: '10%',
                        Filter: SelectColumnFilter,
                        filter: "includes",  
                        // Cell: (props) => (
                        //     <span >
                        //         {(projects && projects.length > 0 && 
                        //             projects.filter(prj => prj.id === props.row.original.project) &&
                        //             projects.filter(prj => prj.id === props.row.original.project).length > 0 ? 
                        //             projects.filter(prj => prj.id === props.row.original.project)[0]['name'] : '')}
                        //     </span>
                        // ),                
                    },            
                    {
                        Header: 'دپارتمان',
                        accessor: 'department_name',
                        maxWidth: '12%',
                        minWidth: '8%',
                        width: '10%',
                        Filter: SelectColumnFilter,
                        filter: "includes",                         
                        // Cell: (props) => (
                        //     <span >
                        //         {(departments && departments.length > 0 && 
                        //             departments.filter(dep => dep.id === props.row.original.department) &&
                        //             departments.filter(dep => dep.id === props.row.original.department).length > 0 ? 
                        //             departments.filter(dep => dep.id === props.row.original.department)[0]['name'] : '')}
                        //     </span>
                        // ),                
                    },
                    // {
                    //     Header: 'شرکت',
                    //     maxWidth: '10%',
                    //     minWidth: '8%',
                    //     width: '9%',
                    //     disableFilters: true,
                    //     Cell: (props) => (
                    //         <span >
                    //             {(departments && departments.length > 0 && companys && companys.length > 0 &&
                    //                 departments.filter(dep => dep.id === props.row.original.department) &&
                    //                 departments.filter(dep => dep.id === props.row.original.department).length > 0 && 
                    //                 companys.filter(com => com.id === departments.filter(dep => dep.id === props.row.original.department)[0]['company']) &&
                    //                 companys.filter(com => com.id === departments.filter(dep => dep.id === props.row.original.department)[0]['company']).length > 0 ? 
                    //                 companys.filter(com => com.id === departments.filter(dep => dep.id === props.row.original.department)[0]['company'])[0]['name'] : '')}
                    //         </span>
                    //     ),
                    // },
                ],
                maxWidth: '44%',
                minWidth: '32%',
                width: '38%',                
            },
            {
                Header: 'اطلاعات شخصی',
                columns:[
                    {
                        Header: 'عکس',
                        accessor: 'picture',
                        maxWidth: '15%',
                        minWidth: '12%',
                        width: '13%',
                        disableFilters: true,
                        disableSortBy: true,
                        Cell: (props) => (
                            <div>
                                <img 
                                src={props.row.original.picture && props.row.original.picture !== '' ? props.row.original.picture : ''} 
                                alt={''}
                                width='60px' 
                                height='70px'>
                                </img>
                            </div>                    
                        ),                 
                    },
                    {
                        Header: 'جنسیت',
                        maxWidth: '5%',
                        minWidth: '3%',
                        width: '4%',
                        disableFilters: true,
                        disableSortBy: true,
                        Cell: (props) => (
                            <span>
                            {props.row.original.gender ? 'خانم' : 'آقا'}
                            </span>
                        ),                
                    },  
                    {
                        Header: 'نام خانوادگی',
                        accessor: 'last_name',
                        maxWidth: '10%',
                        minWidth: '8%',
                        width: '9%',
                        filter: 'fuzzyText',
                        // disableFilters: true,
                    },
                    {
                        Header: 'نام',
                        accessor: 'first_name',
                        maxWidth: '8%',
                        minWidth: '6%',
                        width: '7%',
                        disableFilters: true,
                    },            
                ],
                maxWidth: '44%',
                minWidth: '33%',
                width: '38%',                
            },
            {
                Header: 'کد پرسنلی',
                accessor: 'personel_code',
                maxWidth: '6%',
                minWidth: '4%',
                width: '5%',
                disableFilters: true,
            },            
            {
                Header: '#',
                maxWidth: '3%',
                minWidth: '2%',
                width: '2%',
                disableFilters: true,
                disableSortBy: true,
                Cell: (tableProps) => (
                    <span>
                        {employees.map((emp, index) => index === tableProps.row.index ? index + 1 : '')}
                    </span>
                )
            },
        ],
    [data],
    );

    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
            return rows.filter(row => {
                const rowValue = row.values[id]
                return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
            },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        visibleColumns,
        prepareRow,
        setColumnOrder,
        state,
    } = useTable(
    {
        columns,
        data,
        defaultColumn,
        filterTypes,        
    },
        useColumnOrder,
        useFilters,
        useSortBy
    )

    // const spring = React.useMemo(
    // () => ({
    //     type: 'spring',
    //     damping: 50,
    //     stiffness: 100,
    // }),
    // []
    // )

    // const randomizeColumns = () => {
    //     setColumnOrder(shuffle(visibleColumns.map(d => d.id)))
    // }

    return(                                 
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup, indx) => (
                        <tr key={indx} {...headerGroup.getHeaderGroupProps}>
                            {
                                headerGroup.headers.map((column, index) => (
                                    <th key={index} {...column.getHeaderProps()}>
                                        <div>
                                            <span {...column.getSortByToggleProps()}>
                                                {column.render('Header')}
                                                {/* Add a sort direction indicator */}
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                    : ''}
                                            </span>
                                        </div>
                                        <div>
                                            {column.canFilter ? column.render("Filter") : null}
                                        </div>
                                    </th>
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
