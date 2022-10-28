import React from "react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <>
      <div className="flex flex-col mt-8 mx-4 sm:hidden">
        <Skeleton height={195} borderRadius={15} />
        <Skeleton height={195} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={50} className="mt-4" borderRadius={15} />
      </div>
      <div className="flex flex-col mt-8 mx-8 sm:flex md:hidden">
        <Skeleton height={215} borderRadius={15} />
        <Skeleton height={215} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={80} className="mt-4" borderRadius={15} />
      </div>
      <div className="flex flex-col mt-8 mx-14 md:flex lg:hidden">
        <Skeleton height={240} borderRadius={15} />
        <Skeleton height={240} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={80} className="mt-4" borderRadius={15} />
      </div>
      <div className="flex flex-col mt-8 mx-24 lg:flex xl:hidden">
        <Skeleton height={265} borderRadius={15} />
        <Skeleton height={265} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={100} className="mt-4" borderRadius={15} />
      </div>
      <div className="flex flex-col mt-8 mx-64 xl:flex 2xl:hidden">
        <Skeleton height={265} borderRadius={15} />
        <Skeleton height={265} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={100} className="mt-4" borderRadius={15} />
      </div>
      <div className="flex flex-col mt-8 mx-80 2xl:flex">
        <Skeleton height={350} borderRadius={15} />
        <Skeleton height={350} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={100} className="mt-4" borderRadius={15} />
      </div>
    </>
  );
};

export default CardSkeleton;
