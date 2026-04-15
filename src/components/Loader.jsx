import { TailSpin } from "react-loader-spinner";

const Loader = () => (
  <div className="loader-overlay flex justify-center items-center h-screen">
    <TailSpin height="50" width="50" color="blue" />
  </div>
);
export default Loader