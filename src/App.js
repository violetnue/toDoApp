import React, { Component } from "react";
import "./App.scss";
import store from "store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: "",
      tasks: store.get("tasks") || [],
      showTab: "all",
      showIntro: true
    };
  }
  componentDidUpdate(prevProps, prevState) {
    store.set("tasks", prevState.tasks);
  }

  handleNewTask = e => {
    this.setState({
      newTask: e.target.value
    });
  };

  addNewTask = () => {
    const tasks = [
      ...this.state.tasks,
      {
        title: this.state.newTask,
        done: false
      }
    ];
    this.setState({
      tasks,
      newTask: ""
    });
  };

  removeTask = (e, index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({
      tasks: tasks
    });
  };

  handleKeyUp = e => {
    if (e.key === "Enter") {
      this.addNewTask();
    }
  };

  showActiveTask = () => {
    this.setState({
      showTab: "active"
    });
  };

  showFinishedTask = () => {
    this.setState({
      showTab: "finished"
    });
  };
  showAllTask = () => {
    this.setState({
      showTab: "all"
    });
  };
  markAsDone = (e, index) => {
    const tasks = [...this.state.tasks];
    tasks[index] = { ...tasks[index] };
    tasks[index].done = true;
    this.setState({
      tasks: tasks
    });
  };

  markAsUndone = (e, index) => {
    const tasks = [...this.state.tasks];
    tasks[index] = { ...tasks[index] };
    tasks[index].done = false;
    this.setState({
      tasks: tasks
    });
  };
  showingIntro = e => {
    this.setState({
      showIntro: false
    });
  };

  render() {

    if (this.state.showIntro) {
      return (
        <div className="introBox">
          <button className="showIntroButton" onClick={this.showingIntro}>
            Open me
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="borderBackground">
          <div className="transBox">
            <h1>to do list</h1>
            <br />
            <div className="AddTask">
              <div className="form">
                <input
                  onKeyUp={this.handleKeyUp}
                  type="text"
                  name="writeHere"
                  autoComplete="off"
                  required
                  value={this.state.newTask}
                  onChange={this.handleNewTask}
                />
                <label htmlFor="writeHere" className="labelName">
                  <span className="contentName">
                    Write sth here what u want to do
                  </span>
                </label>
                <button onClick={this.addNewTask}></button>
              </div>
            </div>
            <br />
            <div className="showButtons">
              <button onClick={this.showActiveTask}>Show active</button>
              <button onClick={this.showFinishedTask}>Show completed</button>
              <button onClick={this.showAllTask}>Show all</button>
            </div>

            {this.state.showTab === "all" ? (
              <div className="Tasks">
                {this.state.tasks.map((task, index) => {
                  return (
                    <div className="borderTasks">
                      <span>
                        <i className="material-icons">  </i> {task.title}
                      </span>
                      <button onClick={e => this.markAsDone(e, index)}>
                        <i className="material-icons">done_outline</i>
                      </button>
                      <button onClick={e => this.removeTask(e, index)}>
                        <i className="material-icons">cancel</i>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {this.state.showTab === "finished" ? (
              <div className="Tasks-finished">
                {this.state.tasks
                  .filter(task => task.done)
                  .map((task, index) => {
                    return (
                      <div className="borderTasks">
                        <span>
                          <i className="material-icons">  </i> {task.title}
                        </span>
                        <button onClick={e => this.markAsUndone(e, index)}>
                          <i class="material-icons">refreshed</i>
                        </button>
                        <button onClick={e => this.removeTask(e, index)}>
                          <i class="material-icons">cancel</i>
                        </button>
                      </div>
                    );
                  })}
              </div>
            ) : null}

            {this.state.showTab === "active" ? (
              <div className="Tasks-active">
                {this.state.tasks
                  .filter(task => !task.done)
                  .map((task, index) => {
                    return (
                      <div className="borderTasks">
                        <span>
                          <i className="material-icons">  </i> {task.title}
                        </span>
                        <button onClick={e => this.markAsDone(e, index)}>
                          <i class="material-icons">done_outline</i>
                        </button>
                      </div>
                    );
                  })}
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default App;
