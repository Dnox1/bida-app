import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="box mx-auto">
      <div className="row">
        <div className="col-6">
          <h3>What is BIDA?</h3>
          <p>Meet the App</p>
          <Link className="btn btn-green mb-3" to="/register">Sign up</Link>
          <Link className="btn btn-green" to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
