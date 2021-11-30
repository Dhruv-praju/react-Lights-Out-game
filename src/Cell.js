import { Component } from "react";
import './Cell.css'

class Cell extends Component{
    // 0 --> OFF
    // 1 --> ON
    static defaultProps = {
        mode:0
    }
    constructor(props){
        super(props)
        this.handleToggle = this.handleToggle.bind(this)
    }
    handleToggle(){
        // toggles cells above, below, right and to left
        console.log(this.props.pos)
        const [row, col] = this.props.pos
        this.props.toggle(this.props.pos)
        this.props.toggle([row, col+1])
        this.props.toggle([row, col-1])
        this.props.toggle([row+1, col])
        this.props.toggle([row-1, col])
    }
    render() {
        const {mode} = this.props
        let color=''
        if(mode) color='#11a6a6'
        else color='#303a3a'

        return (
            <td className='Cell' onClick={this.handleToggle} style={{backgroundColor: color}}>
                
            </td>
        )
    }
}

export default Cell