import React, { Component } from 'react';
import {InputItem,Button} from 'antd-mobile'
// import {CountDownText} from 'react-sk-countdown'
import axios from 'axios'
import './App.css'
class Timer extends Component {
  constructor(props) {
      super(props)
      this.state = {
        btnText: '获取验证码',
        timer: 59,
        discodeBtn: false,
        clearInterval: false
      }
  }
  componentWillMount(){
   let siv = setInterval(() => {
    this.setState({ timer: (this.state.timer-1), btnText: this.state.timer, discodeBtn: true }, () => {
        if (this.state.timer === 0) {
            clearInterval(siv);
            this.setState({ btnText: '重新发送', discodeBtn: false })
        }
    });
  }, 1000);
 }

  render() {
    return (
        <span>
          {this.state.btnText}
        </span>
    )
  }
}

export default Timer
