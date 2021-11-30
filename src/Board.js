import { Component } from "react";
import Cell from "./Cell";
import './Board.css'

class Board extends Component{
    static defaultProps = {
        dimension:5
    }
    constructor(props){
        super(props)
        this.state = {
            // grid that represents the board
            // 0 --> OFF
            // 1 --> ON
            grid:[
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1],
                [0, 0, 0, 1, 1],
            ],
            nLit:3
        }
        this.toggle = this.toggle.bind(this)
    }
    initGrid(){
        /** It initializes grid with binary matrix */
        let grid = []

    }
    genGridCells(grid = this.state.grid){
        // It returns the grid with cells by reading binary grid matrix of the state
        function getRow(arr, rowIdx, obj){
            return <tr key={rowIdx}>{arr.map((m, i) => <Cell mode={m} key={`${rowIdx},${i}`} pos={[rowIdx,i]} toggle={obj.toggle}/>)}</tr>
        }
        const gridCells = <tbody>{grid.map((row, idx) => getRow(row, idx, this))}</tbody>

        return gridCells
    }
    countLit(grid){
        // returns no. of lit Cells on the board
        let count=0
        grid.forEach(row => {
            row.forEach(m => {
                if(m) count+=1
            });
        });
        return count
    }
    toggle(pos){
        // It toggles the given grid position using setState
        function duplicate(grid){
            let newGrid = grid.map(row=>{
                return [...row]
            })
            return newGrid
        }

        console.log('toggling :'+pos);
        this.setState(currSt=>{

            let newGrid = duplicate(currSt.grid)
            const [row, col] = pos

            if((row>=0&&row<=newGrid.length-1) && (col>=0&&col<=newGrid.length-1)){
                console.log('checking');
                if(newGrid[row][col]){
                    newGrid[row][col]=0
                }
                else{
                    newGrid[row][col]=1
                }
            }
            return {
                nLit: this.countLit(newGrid),
                grid: newGrid
            }

        })
    }
    
    render() {
        return (
            <table className='Board'>
                {this.genGridCells()}
            </table>
        )
    }
}

export default Board