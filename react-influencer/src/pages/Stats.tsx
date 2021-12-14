import { useEffect, useState } from "react";

import Wrapper from "./Wrapper";
import axios from "axios";
import { constants } from "../constants";

export default function Stats() {
  const [stats, setstats] = useState([]);

  useEffect(() => {
    axios.get('stats').then(response => {
      setstats(response.data)
    }).catch(error => {

    })


  }, [])

  return (
    <Wrapper>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>path</th>
                  <th>Count</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>

                {stats.map((stat: { code: string, count: number, revenue: number }) => {
                  return (
                    <tr>
                      <td>{constants.CHECKOUT_URL + "/" + stat.code}</td>
                      <td>{stat.count}</td>
                      <td>{stat.revenue}</td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}