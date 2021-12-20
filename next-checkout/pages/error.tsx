import Wrapper from "../component/Wrapper";
import { useRouter } from "next/router";

export default function error() {
  const router = useRouter();
  const { source } = router.query;

  return (
    <Wrapper>
      <div className="py-5 text-center">
        <h2>Failed Payment</h2>
        <p className="lead">We are sorry for failed payment</p>
      </div>
    </Wrapper>
  )
}