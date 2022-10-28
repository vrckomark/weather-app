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
      <div className="flex-col mt-8 mx-8 hidden md:hidden sm:flex">
        <Skeleton height={215} borderRadius={15} />
        <Skeleton height={215} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={80} className="mt-4" borderRadius={15} />
      </div>
      <div className="flex-col mt-8 mx-14 hidden lg:hidden md:flex">
        <Skeleton height={240} borderRadius={15} />
        <Skeleton height={240} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={80} className="mt-4" borderRadius={15} />
      </div>
      <div className="flex-col mt-8 mx-24 hidden xl:hidden lg:flex">
        <Skeleton height={265} borderRadius={15} />
        <Skeleton height={265} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={100} className="mt-4" borderRadius={15} />
      </div>
      <div className="flex-col mt-8 mx-64 hidden 2xl:hidden xl:flex">
        <Skeleton height={265} borderRadius={15} />
        <Skeleton height={265} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={100} className="mt-4" borderRadius={15} />
      </div>
      <div className="hidden flex-col mt-8 mx-80 2xl:flex">
        <Skeleton height={350} borderRadius={15} />
        <Skeleton height={350} borderRadius={15} className="mb-10" />
        <Skeleton count={6} height={100} className="mt-4" borderRadius={15} />
      </div>
    </>
  );
};

export default CardSkeleton;
