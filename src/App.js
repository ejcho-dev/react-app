import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import './App.css'

class App extends Component {
  constructor(props) { // 가장 먼저 호출되는 함수 (생성자)
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'create',
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
    
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}/>
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
      _article = <ReadContent title={_title} desc={_desc}/>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id = this.max_content_id + 1;
        // 원본을 수정하면 shouldComponentUpdate()에서 기존 props와 새로운 props가 동일해서
        // 값을 비교하여 render()를 선택적으로 할 수 없게 된다
        // 따라서 원본이 아닌 복사본을 만들어서 setState()를 하는 것이 좋다
        // this.state.contents.push(
        //   {id: this.max_content_id, title: _title, desc: _desc}
        // );
        // this.setState({contents: this.state.contents});
        
        // concat() 사용하기
        // var _contents = this.state.contents.concat(
        //   {id: this.max_content_id, title: _title, desc: _desc}
        // );
        // this.setState({contents: _contents});

        // Array.from() 사용하기 :: 객체인 경우에는 Object.assign() 사용하기
        var newContents = Array.from(this.state.contents);
        newContents.push(
          {id: this.max_content_id, title: _title, desc: _desc}
        );
        this.setState({contents: newContents});
      }.bind(this)}/>
    }

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
        <Control onChangeMode={function(_mode) {
          this.setState({mode: _mode});
        }.bind(this)}/>
        {_article}
      </div>
    );
  }
}

export default App;