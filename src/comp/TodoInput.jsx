import React, { Component } from 'react'

export default class TodoInput extends Component {
  constructor(props){
      super(props)
      this.state = {
          value:""
      };
 
      this.addTodo = this.addTodo.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
      this.setState({value: e.target.value})
    //   console.log(e.target.value)
  }
  addTodo(todo){
      if(todo.length > 0){
      this.props.addTodo(todo);
      this.setState({value:''})
      }
  }


    render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <button className="btn btn-primary" onClick={() => this.addTodo(this.state.value)}>Click</button>
      </div>
    )
  }
}
