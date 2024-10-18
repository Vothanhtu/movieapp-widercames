import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetail from "../hooks/useFetchDetail";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScrollCard from '../components/HorizontalScrollCard'
const DetailPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data } = useFetchDetail(`/${params.explore}/${params?.id}`);
  const { data: castData } = useFetchDetail(
    `/${params.explore}/${params?.id}/credits`
  );
  const {data: similarData }= useFetch(`/${params.explore}/${params?.id}/similar`)
  const {data: recommendationData }= useFetch(`/${params.explore}/${params?.id}/recommendations`)
  // console.log(data);
  // console.log(castData);
  const duration = (data?.runtime / 60).toFixed(1).split(".");
  const writer = castData?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name).join(", ")
  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block ">
        <div className="w-full h-full  ">
          <img
            src={imageURL + data?.backdrop_path}
            alt="Image Detail Movie"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-b from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className=" relative mx-auto lg:-mt-28 lg:mx-0 w-fit">
          <img
            src={imageURL + data?.poster_path}
            alt="Image Detail Movie"
            className="w-60 h-60 object-cover rounded"
          />
        </div>

        <div>
          <h2 className="text-2xl mt-2 lg:text-4xl font-bold text-white">
            {data?.original_name || data?.title || data?.name}
          </h2>
          <p className="text-neutral-300">{data?.tagline}</p>

          <Divider />
          <div className="flex items-center my-3 gap-3">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}</p>
            <span>|</span>
            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p className="">
              {" "}
              Duration : {duration[0]}h {duration[1]}m{" "}
            </p>
          </div>
          <Divider />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />

            <div className="flex items-center gap-4 my-3 text-center">
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {moment(data?.release_data).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>Revenue : {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>
          


          <div>
            <p>
              <span className="text-white">Director</span>: {castData?.crew[0]?.name}
            </p>
            <Divider />
            <p>
              <span className="text-white">Writer: {writer} </span>
            </p>
          </div>

          <Divider />
          <h2 className="font-bold text-lg ">
            Cast :
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {
              castData?.cast?.filter(el => el?.profile_path).map((starCast, index)=>{
                return (
                  <div>
                    <div >
                      <img 
                        src={imageURL+starCast?.profile_path}
                        alt="Image profile cast"
                        className="w-24 h-24 rounded-full object-cover" />
                    </div>
                    <p className="font-bold text-center text-sm text-neutral-200">{starCast?.name}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      
        <div>
          <HorizontalScrollCard 
            data={similarData} 
            heading={"Similar "+params?.explore}
            media_type={params?.explore}
            />
            <HorizontalScrollCard 
            data={recommendationData} 
            heading={"Recommendation "+params?.explore}
            media_type={params?.explore}
            />
        </div>
    </div>
  );
};

export default DetailPage;