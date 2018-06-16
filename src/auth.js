import React, { Component } from 'react';
import {InputItem,Button} from 'antd-mobile'
// import {CountDownText} from 'react-sk-countdown'
import axios from 'axios'
import './App.css'
class Timer extends Component {
  constructor(props) {
      super(props)
      this.state = {
          countingDone:false,
          IdCode:''
      }
      this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    console.log("haha获得验证码")
    axios.get('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/captcha')
      .then(res=>{
        if (res.status === 200){
          console.log(res)
          this.setState({
            IdCode:res.data.data.captcha
          })
        }
      })
  }

  render() {
    return (
        <div>
          <InputItem>
            {this.state.countingDone?<span>hehe</span>:<span onClick={this.handleClick}>获取验证码</span>}
          　<span>{this.state.IdCode}</span>
          </InputItem>
        </div>
    )
  }
}

export default Auth