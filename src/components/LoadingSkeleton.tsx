import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = ({ index }: { index: number }) => {
  return (
    <div
      key={index}
      className="bg-white px-4 py-6 my-6 rounded-md shadow-xl flex justify-between items-center"
    >
      <Skeleton width={512} height={64} />
      <Skeleton width={112} height={64} />
    </div>
  );
};

export default LoadingSkeleton;
