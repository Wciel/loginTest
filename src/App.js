import React, { Component } from 'react';
import {InputItem,NavBar, Button} from 'antd-mobile'
// import logo from './logo.svg';
// import Timer from './auth'
import './App.css';
import axios from 'axios'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tel:'',
      pwd:'',
      telReady:false,
      msg:'',
      captcha:'验证码',
      fistTimer:true,
      restart:false,
      btnText: '获取验证码',
      timer: 4,
      discodeBtn: false,
      clearInterval: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSumit = this.handleSumit.bind(this)
    this.time = this.time.bind(this)
  }


  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  
  //对手机号进行验证，获取验证码
  handleClick(){
      //验证手机格式是否符合，符合则获取验证码，不符合返回错误信息
      const re = /^[1][3,4,5,7,8][0-9]{9}$/
      if (re.test(this.state.tel)){

        //如果手机格式正确，
        this.setState({
          telReady:true,
          msg:""
        })

        //这里是在一分钟之内不能再次点击,firstTimer变为true才能点击
        console.log(this.state.timer,this.state.fistTimer,this.state.restart)
        if(this.state.fistTimer) {
          this.time()
          axios.get('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/captcha')
          .then(res=>{
            if (res.status === 200){
              console.log(res)
              this.setState({
                captcha:res.data.data.captcha
              })
            }
          })
          this.setState({
            fistTimer:false
          })
        }
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
    //判断密码和手机号是否正确
    if (reg.test(this.state.pwd)&&this.state.telReady){
      this.setState({
        msg:""
      })
      axios.post('https://easy-mock.com/mock/5b2385e3debe3c5977248a16/wscn/submit',{phone:this.state.tel,captcha:this.state.captcha})
      .then(res=>{
        if(res.status === 200) {
          console.log("登录成功")
          console.log(res)

        }
      })
    }else{
      if (this.state.telReady){　//判断是因为密码错误还是手机错误
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
  
  time(){
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
    //这里来判断是否重新发送
    if(this.state.timer === 0 && !this.state.fistTimer){
      this.setState({
        fistTimer:true,
        timer:5
      })
    }
    return (
      <div className="App">
        <NavBar mode="dark">登录</NavBar>

        {this.state.msg&&this.state.msg?<p style={{color:'red'}}>{this.state.msg}</p>:null}

        <InputItem　 placeholder="手机号" 
        pattern="^((1[0-9]))\\d{9}$"　
        onChange={(v)=>this.handleChange('tel',v)}>
        </InputItem>
        
        <Button 
          type="ghost"
          size="small" 
          style={{width:150}} 
          onClick={this.handleClick}>
          {this.state.telReady?<span>{this.state.btnText}</span>:"获取验证码"}
        </Button>
        
        <InputItem placeholder={this.state.captcha}>
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
