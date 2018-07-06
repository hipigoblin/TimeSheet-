import React, { Component , Fragment } from 'react'
import axios from 'axios';
import "./Timesheet.css";
import loading from './loader.gif'

export default class Timesheet extends Component {
  constructor(props){
    super(props);
    this.state={
    tasks:[],
    data:'',
    type:'',
    time:'#',
    endtime:'#',
    duration:'',
    error: null,
    editing:false,
    editIndex: null,
    declare:false,
    notifi:null,
    loading:true

    }

    this.apiURL = 'https://5b3e9b66c3c3fb00147427f1.mockapi.io';
    
  }




  async componentDidMount(){
    const response = await axios.get(`${this.apiURL}/time`)
    setTimeout(() => {
      this.setState({
        tasks:response.data,
        loading:false
      })      
    }, 2000);

  }
  handleChange= (e)=>{
    this.setState({
        data: e.target.value
       
        
    })
}

alert = (notifi) =>{
this.setState({
  notifi: notifi
})

setTimeout(() => {
  this.setState({
    notifi:null
  })
}, 4000);

}
  selectChange=(b)=>{
 this.setState({
   type: b.target.value
 })
    
  }
  async changeState (){
  if(this.state.data.length > 0 && this.state.type.length > 0 && this.state.time.length > 0 && this.state.endtime.length > 0){
   const response = await axios.post(`${this.apiURL}/time`,{
    data: this.state.data,
    type: this.state.type,
    time: this.state.time,
    endtime: this.state.endtime,
    duration: this.state.duration
   });

    const old = this.state.tasks
    old.push(response.data);
    this.setState({
      tasks: old,
      data:'',
      type:'',
      time:'',
      endtime:'',
      duration:'',
    
    })
    this.alert("Task Added Succcesfully")
   return this.error(null)
  }
   return this.error("Please Fill All The Fields ")
 

  }
  error =(err)=>{
    this.setState({
      error:err
    })

    setTimeout(()=>{
      this.setState({
        error: null
      })
    },4000)
  }


  async deleteData(i) {
    const parse = parseInt(i ,16)
    const tasks = this.state.tasks
    const task = tasks[parse - 1]
    console.log(task)
    await axios.delete(`${this.apiURL}/time/${task.id}`);
    delete tasks[parse - 1]
    this.setState({
    tasks: tasks,
    })
    this.alert('Task Deleted Succcefully')

  }



  duration =(endi) =>{
     
    const begintime = this.state.time
     const endtime = endi
     const total = begintime - endtime
     const finaltotal = Math.abs(total)
     const totalend = parseInt(finaltotal, 16)
    
     isNaN(totalend) || finaltotal === 0 ? this.setState({
       duration: ''
     }):
     finaltotal > 1 ? 
     this.setState({
       duration: finaltotal + " Hours"
     }):this.setState({
       duration: finaltotal + " Hour"
     })
  }

  begintime = (bt) =>{
    const endtime = this.state.endtime
    const begintime = bt.target.value
    const parseBegin = parseInt(begintime, 16)
    const parseEnd = parseInt(endtime, 16) 
    
   if(endtime === "#") {
     this.setState({
       time:begintime,
       
     })
   return   console.log('') 

   }else if(parseBegin >= parseEnd){
    return this.error("Please Put a logical Time")
   }

   this.setState({
      time:begintime,
      
    });
    this.duration(endtime)
    
    
  }
 

  endtime = (et) => {
    const endtime = et.target.value
    const begintime = this.state.time
    const parseBegin = parseInt(begintime, 16)
    const parseEnd = parseInt(endtime, 16) 
    // console.log(endtime, "1")
   if(begintime === "#") {
     this.setState({
       endtime:endtime
     })
   return   console.log('endphase1') 

   }else if( parseBegin >= parseEnd){
    return this.error("Please Put a logical Time")
   }
      this.setState({
      endtime:endtime,
    })
    this.duration(endtime)
  }



  updateData =(ind) =>{
    const taskno= ind -1
const taskn = this.state.tasks[ind -1];

this.setState({
  editing:true,
  data:taskn.data,
  type:taskn.type,
  time:taskn.time,
  endtime:taskn.endtime,
  duration:taskn.duration,
  editIndex:taskno

})
  }
  async editTodo (){
    const task = this.state.tasks[this.state.editIndex]
    const response = await axios.put(`${this.apiURL}/time/${task.id}`,{
      data :this.state.data,
      type : this.state.type,
      time : this.state.time,
      endtime : this.state.endtime,
      duration : this.state.duration
    }); 
    const taskList = this.state.tasks
    taskList[this.state.editIndex] = response.data;
    this.setState({
      taskList, 
      editing:false,
      editIndex:null,
      data:"",
      type:"",
      time:"",
      endtime:"",
      duration:""
    })
    this.alert('Updated Succefully')

  }



  render() {
    
    return (
      <Fragment>
                {
   this.state.notifi &&
   <div id="message" className="alert alert-success">
   <p className="text-center">{this.state.notifi}</p>
   </div>

 }
 {
    this.state.error &&
    <div id="message" className="alert alert-danger">
    <p className="text-center">{this.state.error}</p>
    </div>
 }
        <center>
          <div id="section">
          <h1 className="my-5">Time Sheet</h1>
          <div className="container-fluid">

          <div className="row">
          {/* TASK */}
          <div className="col-md-2">
          <label htmlFor="Task"> Task </label>
          <input id="Task"  
          value ={this.state.data} 
          onChange={this.handleChange}
          type="text" 
          className="form-control" 
          placeholder="Task" />
          </div>
            {/* Company */}
          <div className="col-md-2">
          <label htmlFor="company"> Type</label>
          <select 
          id="company" 
          className="form-control"
          value={this.state.type}
          onChange={this.selectChange}
          >
         <option  defaultValue > Task Type </option>
          <option value="Task">Task</option>
          <option value="Design">Design</option>
            </select></div>
          {/* date begins */}
          <div className="col-md-2">
          <label htmlFor="begin">Begin time</label>
          <select 
          value={this.state.time}
          onChange={this.begintime}
          id="begin"className="form-control">
          <option  defaultValue  > Choose Time </option>
          <option value="1">1 AM</option>
          <option value="2">2 AM</option>
          <option value="3">3 Am</option>
          <option value="4">4 Am</option>
            </select></div>
          {/* === */}
           {/* date ends */}
           <div className="col-md-2">
          <label htmlFor="begin">End Time</label>
          <select 
          value={this.state.endtime}
          onChange={this.endtime}
          id="begin"className="form-control">
          <option  defaultValue  > Choose Time </option>
          <option value="1">1 AM</option>
          <option value="2">2 AM</option>
          <option value="3">3 Am</option>
          <option value="4">4 Am</option>
            </select></div>
          {/* === */}
          {/* Duration */}
          
            <div className="col-md-2">
          <label htmlFor="begin">Duration</label>
          <input  className="form-control text-center" type="text" value={this.state.duration} disabled/>
          </div>
          
         
          <div className="col-md-2">
          {

          !this.state.editing ? <button
           className="btn btn-danger"
           onClick={()=>this.changeState()}
           >Add Task </button> : <button
           className="btn btn-success"
           onClick={()=>this.editTodo()}
           >update </button>
          }
          </div>
           </div>
          </div>
          </div>
          {
            this.state.loading &&
            <img id="loader" src={loading} alt=""/>
          }
          {
            !this.state.loading &&
            !this.state.editing &&
            <div>
          <div className="container mt-5 mb-3">
     
                  <div className="card my-1">
                  <div className="row">
                  <div className="col-md-2"><h6 className="mt-1">Task</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Type</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Begins at</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Ended at</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Duration</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Delete</h6></div>
                  </div>
                  </div>
 
          </div>
          <div className="container">
          {
               this.state.tasks.map((item)=> {
                return (
                  <div  key={item.id} className="card my-1">
                  <div className="row">
                  <div className="col-md-2"><h5 className="mt-1">{item.data}</h5></div>
                  <div className="col-md-2"><h5 className="mt-1">{item.type}</h5></div>
                  <div className="col-md-2"><h5 className="mt-1">{item.time} Am</h5></div>
                  <div className="col-md-2"><h5 className="mt-1">{item.endtime} Am</h5></div>
                  <div className="col-md-2"><h5 className="mt-1">{item.duration}</h5></div>
                  <div className="col-md-2"><button 
                  onClick={()=>this.deleteData(item.id)} 
                  className="btn btn-outline-danger m-0 ml-1">x</button>
                  <button 
                  onClick={()=>this.updateData(item.id)}
                  className="btn btn-outline-primary m-0 ml-1">U</button>
                  </div>
                  </div>
                  </div>
                );
               }
              )


          }
         
          </div>
          </div>
          }

  {
        this.state.errorinput === true ? <h1> Begin Must Be Before End </h1> : null

 }
        </center>
      </Fragment>
    )
  }
}
