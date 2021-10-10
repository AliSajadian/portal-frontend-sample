import React from 'react'
// import styled from 'styled-components'
// import { useTable, useSortBy, useFilters, useColumnOrder } from 'react-table'
// import { motion, AnimatePresence } from 'framer-motion'
import {matchSorter} from 'match-sorter'
import './table.css'



// Define a default UI for filtering
export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        className={'text-search'}      
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }
  
  // This is a custom filter UI for selecting
  // a unique option from a list
  export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // console.log('SelectColumnFilter.preFilteredRows: ', preFilteredRows)
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        if(row.values[id] !== undefined && 
          row.values[id] !== null && 
          row.values[id] !== ''){
          options.add(row.values[id])
        }
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <select
        className={'selection-search'}
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined || null)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  // This is a custom filter UI that uses a
  // slider to set the filter value between a column's
  // min and max values
//   export function SliderColumnFilter({
//     column: { filterValue, setFilter, preFilteredRows, id },
//   }) {
//     // Calculate the min and max
//     // using the preFilteredRows
  
//     const [min, max] = React.useMemo(() => {
//       let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//       let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//       preFilteredRows.forEach(row => {
//         min = Math.min(row.values[id], min)
//         max = Math.max(row.values[id], max)
//       })
//       return [min, max]
//     }, [id, preFilteredRows])
  
//     return (
//       <>
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={filterValue || min}
//           onChange={e => {
//             setFilter(parseInt(e.target.value, 10))
//           }}
//         />
//         <button onClick={() => setFilter(undefined)}>Off</button>
//       </>
//     )
//   }
  
  // This is a custom UI for our 'between' or number range
  // filter. It uses two number boxes and filters rows to
  // ones that have values between the two
//   export function NumberRangeColumnFilter({
//     column: { filterValue = [], preFilteredRows, setFilter, id },
//   }) {
//     const [min, max] = React.useMemo(() => {
//       let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//       let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
//       preFilteredRows.forEach(row => {
//         min = Math.min(row.values[id], min)
//         max = Math.max(row.values[id], max)
//       })
//       return [min, max]
//     }, [id, preFilteredRows])
  
//     return (
//       <div
//         style={{
//           display: 'flex',
//         }}
//       >
//         <input
//           value={filterValue[0] || ''}
//           type="number"
//           onChange={e => {
//             const val = e.target.value
//             setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
//           }}
//           placeholder={`Min (${min})`}
//           style={{
//             width: '70px',
//             marginRight: '0.5rem',
//           }}
//         />
//         to
//         <input
//           value={filterValue[1] || ''}
//           type="number"
//           onChange={e => {
//             const val = e.target.value
//             setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
//           }}
//           placeholder={`Max (${max})`}
//           style={{
//             width: '70px',
//             marginLeft: '0.5rem',
//           }}
//         />
//       </div>
//     )
//   }
  
  export function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val
  
  export function shuffle(arr) {
    arr = [...arr]
    const shuffled = []
    while (arr.length) {
      const rand = Math.floor(Math.random() * arr.length)
      shuffled.push(arr.splice(rand, 1)[0])
    }
    return shuffled
  }
  