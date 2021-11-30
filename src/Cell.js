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
        const [row, col] = this.props.pos
        this.props.toggle(this.props.pos)
        this.props.toggle([row, col+1])
        this.props.toggle([row, col-1])
        this.props.toggle([row+1, col])
        this.props.toggle([row-1, col])
    }
    render() {
        let classes = 'Cell' + (this.props.mode ? ' Cell-Lit' : '')

        return (
            <td className={classes} onClick={this.handleToggle}></td>
        )
    }
}

export default Cell