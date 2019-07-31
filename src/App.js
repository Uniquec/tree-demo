import React, { Component } from 'react';
import { Tree } from 'antd';
import * as data from './data/data';
import './App.css';

const { TreeNode } = Tree

export default class App extends Component {
  state = {
    checkedKeys: [],
    defaultKeys: []
  }

  componentDidMount() {
    this.setState({
      defaultKeys: this.getCheckedKeys(data.treeData)
    })
  }

  // 组件树形控件 子节点渲染
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
      );
    }
    return <TreeNode title={item.title} key={item.key}></TreeNode>;
  });

  // 权限树获取已勾选的节点的key值（value为true）
  getCheckedKeys = (data) => {
    let arr = [];
    for (let i = 0;i < data.length;i++) {
      if (data[i].value) {
        arr.push(data[i].key)
      }
      if (data[i].children) {
        let res = this.getCheckedKeys(data[i].children)
        arr = [...arr, ...res]
      }
    }
    return arr;
  }

  onCheck1 = (checkedKeys) => {
    this.setState({
      defaultCheckedKeys: checkedKeys
    })
  }

  onCheck2 = (checkedKeys) => {
    this.setState({
      defaultKeys: checkedKeys
    })
  }

  render(){
    let defaultCheckedKeys = this.getCheckedKeys(data.treeData);

    return (
      <div>
        <div>
          <div>非受控组件</div>
          <Tree
            checkable
            onCheck={this.onCheck1}
            defaultCheckedKeys={defaultCheckedKeys}
          >
            {this.renderTreeNodes(data.treeData)}
          </Tree>
        </div>
        <div>
          <div>受控组件</div>
          <Tree
            checkable
            onCheck={this.onCheck2}
            checkedKeys={this.state.defaultKeys}
          >
            {this.renderTreeNodes(data.treeData)}
          </Tree>
        </div>
      </div>
    );
  }
}