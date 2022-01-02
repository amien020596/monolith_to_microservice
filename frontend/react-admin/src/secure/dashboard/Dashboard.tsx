import React, { Component } from 'react';

import Wrapper from '../Wrapper';
import axios from 'axios';
import c3 from 'c3';
import constants from '../../constants';

class Dashboard extends Component {

  componentDidMount = async () => {
    axios.defaults.baseURL = 'http://localhost:8014/api/admin';
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    let chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          ['x'],
          ['Sales']
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    })
    const response = await axios.get(`${constants.BASE_URL}/admin/chart`);
    const records: { date: string, sum: number }[] = response.data.data;

    chart.load({
      columns: [
        ['x', ...records.map(r => r.date)],
        ['Sales', ...records.map(r => r.sum)]
      ]
    })
  }

  render() {
    return (
      <Wrapper>
        <div>
          <h2>Daily Sales </h2>
        </div>
        <div id="chart"></div>
      </Wrapper>
    )
  }
}

export default Dashboard;