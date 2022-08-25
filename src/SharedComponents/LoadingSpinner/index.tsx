import './style.css';
import { CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";


const override: CSSProperties = {
    borderColor: "090943",
  };


const LoadingSpinner:React.FC<{loading:boolean}> = ({loading}) => {

  return (
    <div className="sweet-loading">
      <BounceLoader color={'#090943'} loading={loading} cssOverride={override} size={150} speedMultiplier={1} />
    </div>
  )

}



export default LoadingSpinner;