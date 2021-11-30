import { Component } from "react";
import Cell from "./Cell";
import './Board.css'

class Board extends Component{
    static defaultProps = {
        nrows:5,
        ncols:5,
        chanceLightsOn:0.25
    }
    constructor(props){
        super(props)
        this.state = {
            // grid that represents the board
            // 0 --> OFF
            // 1 --> ON
            grid:this.initGrid(),
            hasWon:false
        }
        this.toggle = this.toggle.bind(this)
    }
    initGrid(){
        /** It initializes grid with binary matrix */
        let grid = []
        for(let y=0; y<this.props.nrows; y++){
            let row = []
            for(let x=0; x<this.props.ncols; x++){
                if(Math.random() < this.props.chanceLightsOn) row.push(1)
                else row.push(0)
            }
            grid.push(row)
        }
        return grid
    }
    genGridCells(grid = this.state.grid){
        // It returns the grid with cells by reading binary grid matrix of the state
        function getRow(arr, rowIdx, obj){
            return <tr key={rowIdx}>{arr.map((m, i) => <Cell mode={m} key={`${rowIdx},${i}`} pos={[rowIdx,i]} toggle={obj.toggle}/>)}</tr>
        }
        const gridCells = <tbody>{grid.map((row, idx) => getRow(row, idx, this))}</tbody>

        return gridCells
    }
    
    toggle(pos){
        // It toggles the given grid position using setState
        function duplicate(grid){
            let newGrid = grid.map(row=>{
                return [...row]
            })
            return newGrid
        }

        this.setState(currSt=>{

            let newGrid = duplicate(currSt.grid)
            const [row, col] = pos

            if((row>=0&&row<=newGrid.length-1) && (col>=0&&col<=newGrid.length-1)){
                if(newGrid[row][col]){
                    newGrid[row][col]=0
                }
                else{
                    newGrid[row][col]=1
                }
            }

            let hasWon = newGrid.every(row => row.every(cell => !cell))

            return {
                grid: newGrid,
                hasWon: hasWon
            }

        })
    }
    

        
    render() {
        
        return (
            this.state.hasWon
            ? 
            <div className='winner'>
                <div className='neon-orange'>you</div>
                <div className='neon-blue'>win</div>
            </div>
            :
            <div>
                <div className='Board-title'>
                    <div className='neon-orange'>Lights</div>
                    <div className='neon-blue'>Out</div>
                </div>
                <table className='Board'>
                    {this.genGridCells()}
                </table>
                
            </div>
        )
    }
}

export default Board