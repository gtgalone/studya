import React, { Component } from 'react'
import 'isomorphic-unfetch'

export default class extends Component {
  static async getInitialProps ({ query: { id } }) {
    const users = await fetch('http://localhost:5000/api/users').then((res) => res.json())
    console.log(users)
    return { userId: id, users }
  }

  render () {
    return <div>
      <h1>My blog post #{this.props.userId}</h1>
      { this.props.users.map((v) => (
        <React.Fragment>
          <div>이름: {v.name}</div>
          <div>나이: {v.age}</div>
        </React.Fragment>
      ))}
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  }
}
