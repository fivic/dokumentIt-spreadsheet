import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';


const Spreadsheet = () => {
    const grid = [
        [{value:  5, expr: '1 + 4'}, {value:  6, expr: '6'}, {value: new Date('2008-04-10')}, {}, {}],
        [{value:  5, expr: '1 + 4'}, {value:  5, expr: '1 + 4'}, {value: new Date('2004-05-28')}, {}, {}]
     ]
     const onCellsChanged = (changes) => changes.forEach(({cell, row, col, value}) => console.log(`Value: ${value}, cell: ${cell}, row: ${row}, col: ${col}`))
     
    return (
        <ReactDataSheet
  data={grid}
  valueRenderer={(cell, i, j) => j == 2 ? cell.value.toDateString() : cell.value}
  dataRenderer={(cell, i, j) => j == 2 ? cell.value.toISOString() : cell.expr}
  onCellsChanged={onCellsChanged}
  sheetRenderer={props => (
    <table className={props.className + ' my-awesome-extra-class'}>
        <thead>
            <tr>
                <th className='action-cell' />
                <th>ovo</th>
                <th>je</th>
                <th>jedan</th>
                <th>dan</th>
            </tr>
        </thead>
        <tbody>
            {props.children}
        </tbody>
    </table>
  )}
  rowRenderer={props => (
    <tr>
        <td className='action-cell'>
            aa
        </td>
        <td className='action-cell'>
            b
        </td>
        {props.children}
    </tr>
  )}
/>
    )
}

export default Spreadsheet
