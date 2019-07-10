import React from 'react';
import { DatePicker, message, Alert } from 'antd';

class demo extends React.Component {
  state = {
    date: null,
  };

  handleChange = date => {
    message.info(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
    this.setState({ date });
  };

  render() {
    const { date } = this.state;
    return (
      <div style={{ width: 400, margin: '100px auto' }}>
        <DatePicker onChange={this.handleChange} />
        <div style={{ width: 400, marginTop: 20 }}>
          <Alert message={`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`} type="success" />
        </div>
      </div>
    );
  }
}

export default demo;