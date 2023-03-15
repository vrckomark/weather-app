import React from "react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <>
      <div className="flex flex-col w-4/5 mt-4 sm:hidden">
        <Skeleton height={200} borderRadius={20} />
        <Skeleton height={75} borderRadius={15} />
        <Skeleton height={60} borderRadius={15} />
        <div className="mt-6">
          <Skeleton height={55} className="mt-2" borderRadius={15} count={6} />
        </div>
      </div>
      <div className="flex-col w-4/5 mt-4 hidden md:hidden sm:flex">
        <Skeleton height={220} borderRadius={20} />
        <Skeleton height={85} borderRadius={15} />
        <Skeleton height={70} borderRadius={15} />
        <div className="mt-6">
          <Skeleton height={65} className="mt-2" borderRadius={15} count={6} />
        </div>
      </div>
      <div className="flex-col w-4/5 mt-4 hidden lg:hidden md:flex">
        <Skeleton height={300} borderRadius={20} />
        <Skeleton height={100} borderRadius={15} />
        <Skeleton height={80} borderRadius={15} />
        <div className="mt-6 md:mt-10">
          <Skeleton height={75} className="mt-2" borderRadius={15} count={6} />
        </div>
      </div>
      <div className="flex-col w-4/5 mt-4 hidden xl:hidden lg:flex">
        <Skeleton height={310} borderRadius={20} />
        <Skeleton height={110} borderRadius={15} />
        <Skeleton height={100} borderRadius={15} />
        <div className="mt-6 md:mt-10">
          <Skeleton
            height={85}
            className="mt-2 lg:mt-4"
            borderRadius={15}
            count={6}
          />
        </div>
      </div>
      <div className="flex-col w-2/3 mt-4 hidden 2xl:hidden xl:flex">
        <Skeleton height={310} borderRadius={20} />
        <Skeleton height={150} borderRadius={15} />
        <Skeleton height={150} borderRadius={15} />
        <div className="mt-6 md:mt-10">
          <Skeleton
            height={100}
            className="mt-2 lg:mt-4"
            borderRadius={15}
            count={6}
          />
        </div>
      </div>
      <div className="flex-col w-2/3 mt-4 hidden 2xl:flex">
        <Skeleton height={310} borderRadius={20} />
        <Skeleton height={150} borderRadius={15} />
        <Skeleton height={150} borderRadius={15} />
        <div className="mt-6 md:mt-10">
          <Skeleton
            height={100}
            className="mt-2 lg:mt-4"
            borderRadius={15}
            count={6}
          />
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;
