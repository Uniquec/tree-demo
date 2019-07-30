import React, { Component } from 'react';
import { Tree } from 'antd';
import './App.css';

const { TreeNode } = Tree

const treeData1 = [
  {
    title: 'parent 1',
    key: '0-0',
    value: false,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        value: true,
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        value: false,
      }
    ]
  }
]

const treeData2 = [
  {
    title: 'parent 1',
    key: '0-0',
    value: false,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        value: false,
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        value: true,
      }
    ]
  }
]

export default class App extends Component {
  state = {
    checkedKeys: [],
    defaultKeys: []
  }

  componentDidMount() {
    this.setState({
      defaultKeys: this.getCheckedKeys(treeData2)
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
    let defaultCheckedKeys = this.getCheckedKeys(treeData1);

    return (
      <div>
        <div>
          <div>非受控组件</div>
          <Tree
            checkable
            onCheck={this.onCheck1}
            defaultCheckedKeys={defaultCheckedKeys}
          >
            {this.renderTreeNodes(treeData1)}
          </Tree>
        </div>
        <div>
          <div>受控组件</div>
          <Tree
            checkable
            onCheck={this.onCheck2}
            checkedKeys={this.state.defaultKeys}
          >
            {this.renderTreeNodes(treeData2)}
          </Tree>
        </div>
      </div>
    );
  }
}