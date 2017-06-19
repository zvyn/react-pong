import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Ball extends Component {
  render() {
    return (
      <img src={logo} className="Ball" alt="logo" style={{
        "top": this.props.y,
        "left": this.props.x
      }} />
    )
  }
}


class Bat extends Component {
  render() {
    return (
      <div className={"Bat Bat-" + this.props.where} style={{"top": this.props.y}} />
    )
  }
}


class Pong extends Component {
  constructor() {
    super();
    this.state = {
      mouseY: null,
      ballY: 0,
      ballX: 35,
      ballYTarget: 0,
      ballXTarget: 0,
      score: 0
    }
    document.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.run()
  }

  onMouseMove(e) {
    this.setState({
      mouseY: e.clientY
    })
  }

  run() {
    setInterval(() => {
      var state = {...this.state};
      // Change target when ball hits boundries
      if (state.ballX <= 35 || state.ballX >= window.innerWidth - 35) {
        if (state.ballX <= 35) {
          state.ballXTarget = window.innerWidth - 35;
        } else {
          state.ballXTarget = 35;
        }
        // Set score
        if (state.mouseY - 100 > state.ballY || state.mouseY + 100 < state.ballY) {
          alert("You missed after " + state.score + " hits!");
          state.score = 0;
        } else {
          state.score += 1;
        }
      }
      if (Math.abs(state.ballY - state.ballYTarget) <= 20) {
        state.ballYTarget = parseInt(Math.random() * window.innerHeight, 10)
      }
      // Move ball towards target
      state.ballX = state.ballX > state.ballXTarget ? state.ballX - 8 : state.ballX + 8
      state.ballY = state.ballY > state.ballYTarget ? state.ballY - 8 : state.ballY + 8
      this.setState(state)
    }, 20)
  }

  renderBat(where) {
    return <Bat where={where} y={this.state.mouseY} />
  }

  renderBall() {
    return <Ball x={this.state.ballX} y={this.state.ballY} />
  }

  render() {
    return (
      <div className="Pong">
        <div className="Pong-horizontal-border" style={{
          "top": this.state.ballYTarget,
        }}/>
        <div className="Pong-score">{ this.state.score }</div>
        {this.renderBall()}
        {this.renderBat("left")}
        {this.renderBat("right")}
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Pong/>
      </div>
    );
  }
}

export default App;
