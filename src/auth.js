import React, { Component } from 'react';
import './App.css'
class Timer extends Component {
  constructor(props) {
      super(props)
      this.state = {
        btnText: '获取验证码',
        timer: 5,
        discodeBtn: false,
        clearInterval: false
      }
      this.handleClick = this.handleClick.bind(this)
      this.time = this.time.bind(this)
  }
  time(){
    let siv = setInterval(() => {
      this.setState({ timer: (this.state.timer-1), btnText: this.state.timer, discodeBtn: true }, () => {
        this.props.getTimerInfo(this.state.timer) 
         
        if (this.state.timer === 0) {
              clearInterval(siv);
              this.setState({ btnText: '重新发送', discodeBtn: false })
          }
      });
    }, 1000);
  }
 
  componentWillMount(){
    if(!this.props.restart){
      this.time()
    }
  }

 handleClick(){
   if (this.props.restart){
     this.setState({
      timer: 6,
      discodeBtn: false,
      clearInterval: false
     })
   }
 }

 componentDidUpdate(){
   console.log(this.state.timer)
 }
  render() {
    // console.log(this.state.timer,this.props.restart)
    const restart = this.props.restart
    return (
        <span onClick={this.handleClick}>
          {this.state.btnText}
        </span>
    )
  }
}

export default Timer
