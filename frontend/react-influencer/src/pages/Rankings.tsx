import { useEffect, useState } from "react";

import Wrapper from "./Wrapper";
import axios from "axios";

export default function Rankings() {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    axios.get('ranking').then(response => {
      console.log("response ranking", response.data)
      setRankings(response.data)
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
                  <th>#</th>
                  <th>Name</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(rankings).map((key: any, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{key}</td>
                      <td>{rankings[key]}</td>
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