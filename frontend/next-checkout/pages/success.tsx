import Wrapper from "../component/Wrapper";
import axios from "axios";
import constants from "../constants";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function success() {
  const router = useRouter();
  const { source } = router.query;

  useEffect(() => {
    if (source !== undefined) {
      axios.post(`${constants.endpoint}/orders/confirm`, {
        source
      })
    }

  }, [source])
  return (
    <Wrapper>
      <div className="py-5 text-center">
        <h2>Success</h2>
        <p className="lead"> Your purcased have been success</p>
      </div>
    </Wrapper>
  )
}