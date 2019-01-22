import React from 'react';
import './todolist.css';
import { connect } from 'react-redux';


const leftItems = input => {
    const countArray = input.filter(value => value.isCompleted === false)
    return countArray.length === 1 || countArray.length === 0 ? countArray.length+' Item Left': countArray.length+' Items Left';
}

class TodoList extends React.Component {

    constructor(props){   
        super();
        this.state = { 
        inputValue:'',
        status: {
            isAll: true,
            isActive: false,
            isCompleted: false
            }
        }
    }

    handleInputChange = e => {
        this.setState({inputValue: e.target.value});
    }

    handeleKeyDown = e => {
        if(e.keyCode === 13 && this.state.inputValue !== ''){
        this.props.dispatch({type:"ADD_TODO",payload: {input: this.state.inputValue, id: Date.now()}})
        this.setState({inputValue:''})
        }
    }

    handleClearCompleted = () => {
        this.props.dispatch({type: "CLEAR_COMPLETED"})
    }

    handleMarkCompleteTask = value => { 
        this.props.dispatch({type: "COMPLETED-TASK", payload: value.id})
    }

    handleMarkAll = () => {
        this.props.dispatch({type: "SELECT_ALL", payload: this.getAllCompleted()})
    }

    handleDeleteTodo = value => {
        this.props.dispatch({type: "DELETE_TODO", payload: value.id})
    }

    getStatusWiseList= optionId => {
        switch(optionId){
        case "All":
        return this.setState({status:{isAll: true,  isActive: false, isCompleted: false }});
        case "Active":
        return this.setState({status:{isAll: false,  isActive: true, isCompleted: false }});
        case "Completed":
        return this.setState({status:{ isAll: false,  isActive: false, isCompleted: true }});
        default:
        return
        }
    }

    getAllActive = () => {
        return this.props.list.filter(value => value.isCompleted === false )
    }

    getAllCompleted = () => {
        return this.props.list.filter(value => value.isCompleted !== false )
    }
    
    render() { 
        const allActive = this.getAllActive();
        const allCompleted = this.getAllCompleted();
        return ( 
        <React.Fragment>

            <h1 className="Heading">Todo List</h1>
            
           <div className="Input-Container">
                <div className="Input_Section">
                { this.props.list.length >=1 &&
                <div className="Select-All-Checkbox">
                <input className="List-Checkbox" type="checkbox" id="All" onChange={this.handleMarkAll} checked={this.props.list.length === this.getAllCompleted().length ? true : false} /> 
                <label htmlFor="All" className="Todo-List-Value"/> 
                </div>
                }
                    <input className="Todo-Input" value={this.state.inputValue} type="text" placeholder="What needs to be done ?" onKeyDown={this.handeleKeyDown} onChange={this.handleInputChange}/>
                </div>
            </div>

            { 
            this.props.list.length >= 1  && <div className="Content-Description">
                <div className="Content-Description-Inner-Container">
                 <div className="Left-Align-Item">
                    <span className="Left-Item">{leftItems(this.props.list)}</span>
                    <button className={this.state.status.isAll? "List-Btn-Active" :"List-Btn"} onClick={this.getStatusWiseList.bind(null,'All')}>All</button>
                    <button className={this.state.status.isActive? "List-Btn-Active" :"List-Btn"} onClick={this.getStatusWiseList.bind(null,'Active')}>Active</button> 
                    <button className={this.state.status.isCompleted? "List-Btn-Active" :"List-Btn"} onClick={this.getStatusWiseList.bind(null,'Completed')}>Completed</button>
                 </div>
                 <div className="Right-Align-Item">
                   { this.getAllCompleted().length >= 1 && <button className="Clear-Btn" onClick={this.handleClearCompleted}>Clear Completed</button>}
                </div>
                </div>
            </div> 
            }

            <div className="Data-Container-Lower">
                { this.state.status.isAll === true && this.props.list.map((value,index) =>
                <div className="Todo-List-Container" key={index}>
                    <ul className="Todo-List-ul">
                        <li> 
                            <input className="List-Checkbox" type="checkbox" id={index} onChange={this.handleMarkCompleteTask.bind(null,value)} checked={value.isCompleted}/> 
                            <label htmlFor={index} className="Todo-List-Value"/> 
                            <span className={value.isCompleted===false?  "Todo-List-ul" : "Todo-List-li-Completed"}>{value.value}</span> 
                            <span className="Delete-Item-Btn" onClick={this.handleDeleteTodo.bind(null,value)}>&#10005;</span>
                        </li>
                    </ul>
                </div>
                )}
                { this.state.status.isActive === true && allActive.map((value,index) =>
                    <div className="Todo-List-Container" key={index}>
                        <ul className="Todo-List-ul">
                            <li> 
                                <input className="List-Checkbox" type="checkbox" id={index} onChange={this.handleMarkCompleteTask.bind(null, value)} checked={value.isCompleted}/> 
                                <label htmlFor={index} className="Todo-List-Value"/> 
                                <span className={value.isCompleted===false?  "Todo-List-ul" : "Todo-List-li-Completed"}>{value.value}</span> 
                                <span className="Delete-Item-Btn" onClick={this.handleDeleteTodo.bind(null,value)}>&#10005;</span>
                            </li>
                        </ul>
                    </div>
                    )}
                    { this.state.status.isCompleted === true && allCompleted.map((value,index) =>
                <div className="Todo-List-Container" key={index}>
                    <ul className="Todo-List-ul">
                        <li> 
                            <input className="List-Checkbox" type="checkbox" id={index} onChange={this.handleMarkCompleteTask.bind(null, value)} checked={value.isCompleted}/> 
                            <label htmlFor={index} className="Todo-List-Value"/> 
                            <span className={value.isCompleted===false?  "Todo-List-ul" : "Todo-List-li-Completed"}>{value.value}</span> 
                            <span className="Delete-Item-Btn" onClick={this.handleDeleteTodo.bind(null,value)}>&#10005;</span>
                        </li>
                    </ul>
                </div>
                )}
            </div>
 
            </React.Fragment>           
         );
    }
}
 
const mapStateToProps = state => {
return  {
    list: state.todolistReducer.list
    };
}
export default connect(mapStateToProps)(TodoList);