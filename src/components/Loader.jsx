import { TailSpin } from "react-loader-spinner";

/**
 * Loader Component
 * 
 * Purpose:
 * - Shows a loading spinner while data is being fetched
 * - Used during API calls or page transitions
 */
const Loader = () => (

  //  Full-screen container with center alignment
  <div className="loader-overlay flex justify-center items-center h-screen">

    {/* Spinner from react-loader-spinner library */}
    <TailSpin
      height="50"   // spinner height
      width="50"    // spinner width
      color="blue"  // spinner color
    />

  </div>
);

export default Loader;