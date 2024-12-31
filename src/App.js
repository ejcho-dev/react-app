import React, { Component } from 'react';
import './App.css'
import Subject from './components/Subject';
import TOC from './components/TOC';
import Content from './components/Content';

class App extends Component {
  constructor(props) { // 가장 먼저 호출되는 함수 (생성자)
    super(props);
    this.state = {
      mode: 'read',
      selected_content_id: 2,
      subject: {title: 'WEB', sub: 'World Wide Web!'},
      welcome: {title: 'Welcome', desc: 'Hello, React!!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is for information'},
        {id: 2, title: 'CSS', desc: 'CSS is for design'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive'}
      ]
    }
  }

  render() { // props or state 값이 바뀌면 자동으로 재호출된다 --> 화면이 다시 그려진다
    console.log("App render");
    
    var _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }

    console.log('render', this);

    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function() {
            // this.state.mode = 'welcome'으로 입력하면 
            // react는 state가 변경된 것을 알 수 없기 때문에 render()가 호출되지 않는다
            this.setState({mode: 'welcome'});
          }.bind(this)}
        />
        <TOC 
          data={this.state.contents}
          onChangePage={function(id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
        />
        <Content title={_title} desc={_desc}/>
      </div>
    );
  }
}

export default App;