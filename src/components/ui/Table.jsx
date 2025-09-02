'use client'

import React from 'react'

const Table = ({data, 
    columns, 
    onRowClick, 
    tableStyle,
    rowStyle,
    cellStyle,
    headerStyle,}) => {

  return (
    <div className='w-full overflow-x-auto'>
        <table className={`w-full ${tableStyle}`}>
            <thead>
                <tr className={`text-xs text-gray-700 uppercase 
                bg-gray-50 border-b border-gray ${headerStyle}`}>
                    {
                        columns.map((column, index) => (
                            <th key={index} className='py-3 px-6 text-left'>
                                {column.title}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            
            <tbody>
                {
                    data?.map((row, i)=>(
                        <tr key={i} id={`invoice-row-${i + 1}`} 
                        className={`text-xs text-black border-b border-gray-300 ${rowStyle}`}
                        onClick={() => onRowClick && onRowClick(row)}>
                            {
                                columns?.map((col, colIndex)=>(
                                    <td className={`py-4 px-6 capitalize ${cellStyle}`} 
                                    key={colIndex + 1}>
                                        {col?.render ? col?.render(row[col.accessor], row, i) : row[col.accessor]}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

Table.defaultProps = {
    data: [],
    columns: [],
    onRowClick: null,
    tableStyle: '',  
    rowStyle: '',    
    cellStyle: '',   
    headerStyle: '',
}

export default Table