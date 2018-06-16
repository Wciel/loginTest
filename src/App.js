import React, { Component } from 'react';
import {List, InputItem,NavBar, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import logo from './logo.svg';
// import Timer from './auth'
import './App.css';
import axios from 'axios'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tel:'',
      pwd:'',
      telReady:fase,
      msg:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSumit = this.handleSumit.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }

  //对手机号进行验证，获取验证码
  handleClick(){
      const re = /^[1][3,4,5,7,8][0-9]{9}$/
      //验证手机格式是否符合，符合则获取验证码，不符合返回错误信息
      if (re.test(this.state.tel)){
        this.setState({
          telReady:true,
          msg:""
        })
        axios.get('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/captcha')
        .then(res=>{
          if (res.status === 200){
            console.log(res)
            this.setState({
              captcha:res.data.data.captcha
            })
          }
        })
      }else{
        this.setState({
          telReady:false,
          msg:"手机格式错误"
        })
      } 
  }
  
  //将验证码和手机号提交到api
  handleSumit(){
    const reg = /^.{6,}$/
    if (reg.test(this.state.pwd)&&this.state.telReady){
      this.setState({
        msg:""
      })
      console.log("???成功")
      axios.post('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/submit',{phone:this.state.tel,captcha:this.state.captcha})
      .then(res=>{
        if(res.status === 200) {
          console.log("登录成功")
          console.log(res)
        }
      })
    }else{
      if (this.state.telReady){
        this.setState({
          msg:"密码输入格式错误"
        })
      }else{
        this.setState({
          msg:"手机格式错误"
        })
      }
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar mode="dark">登录</NavBar>

        {this.state.msg&&this.state.msg?<p style={{color:'red'}}>{this.state.msg}</p>:null}

        <InputItem　 placeholder="手机号" 
        pattern="^((1[0-9]))\\d{9}$"　
        onChange={(v)=>this.handleChange('tel',v)}>
        </InputItem>

        <Button  type="ghost" size="small" style={{width:150}} onClick={this.handleClick}>
        {
          this.state.getCode?null:"获得验证码"
        }
        </Button>

        <InputItem placeholder="验证码">
        {this.state.captcha}
				</InputItem>
        
        <InputItem　
          placeholder="密码(不少于６位)" 
          type = "password"
          onChange={(v)=>this.handleChange('pwd',v)}
        >    
        </InputItem>
        <Button　type='primary'　onClick={this.handleSumit}>注册</Button>

      </div>
    );
  }
}

export default App;
