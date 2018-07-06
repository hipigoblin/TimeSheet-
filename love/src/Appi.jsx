import React, { Component , Fragment } from 'react'
import'./Appi.css'

export default class Appi extends Component {
    state={
        todos:[],
        ctodo:''
    }
    handleChange= (e)=>{
        this.setState({
            ctodo: e.target.value
           
            
        })
    }
    dispValue = ()=>{
      
            let c = this.state.todos.slice();
            console.log(c);
            c.push(this.state.ctodo);
            this.setState({
                todos: c,
                ctodo:''
            })

         
        
 
    }

    deleteValue = (i)=>{
    let d = this.state.todos.slice()
    d.splice(i,1);
    this.setState({
        todos:d,
        ctodo:''
    })
    }

  
    
 
  render() {
      let b = this.state.todos.map((todo, i) =>{
        return( 
            
      <li key={i}><h2  className="">{todo} <span id="close" onClick={() => this.deleteValue(i)}>x</span></h2></li>
    );
    }); 

    return (
        <Fragment>
    <div className="container" id="cont1">
    <center>
    <div className="row">
    <div className="col-md-10">
    <input className="form-control" 
    value ={this.state.ctodo}
    onChange={this.handleChange}  
    type="text" 
    placeholder="Enter todo" />
    </div>
    <button 
    className="btn btn-light"
    onClick={this.dispValue}
    >Add Todo</button>
    </div>
    
 
    </center>
  

    </div>
      <div className="container">{this.state.todos.length === 0 ? <h6 className="mt-2 ">No Todo's Here</h6> : <ul className="mt-4">{b}</ul>}</div>
      </Fragment>
    )
}
}
