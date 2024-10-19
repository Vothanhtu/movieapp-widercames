import React from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetail from "../hooks/useFetchDetail";
const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetail(
    `/${media_type}/${data?.id}/videos`
  );
  console.log(data);
  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-2xl aspect-video rounded relative">
        <button
          onClick={close}
          className="absolute -top-6 -right-1 text-3xl z-50">
          <IoClose />
        </button>
        <iframe 
            src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
            className="h-full w-full p-2"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        >
        </iframe>
      </div>
    </section>
  );
};

export default VideoPlay;
