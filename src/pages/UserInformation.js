import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { auth } from "../store/firebase";
import imageDefault from "../assets/user.svg";
const UserInformation = () => {
  const [selectedImage, setSelectedImage] = useState(imageDefault);
  const [imageUrl, setImageUrl] = useState(null);
  const [showUsername, setShowUsername] = useState("");
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    if (!image) return;
    const imageUrl = URL.createObjectURL(image);
    setSelectedImage(imageUrl);
  };
  const handleSubmitInfomation = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    const userNameDefault = auth.onAuthStateChanged((user) => {
      if (user) {
        setShowUsername(user.displayName || user.email);
      } else {
        setShowUsername("");
      }
    });
    return () => userNameDefault();
  }, [auth]);
  return (
    <section className=" w-full min-h-screen mx-auto flex items-center justify-center">
       <form className="container bg-[#25252D] rounded-md w-[900px] h-[420px] flex flex-col shadow-xl gap-2">
          <div className="flex gap-12 justify-center">
            <div className="w-2/3 flex mt-14 flex-col items-center justify-center gap-5">
              <div className=" mb-4 w-48 h-48">
                <img
                  src={selectedImage}
                  alt="Avatar user"
                  className="rounded-full object-cover w-full h-full "
                />
              </div>
              <input
                type="file"
                id="fileInput"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer rounded-full border px-2 py-1"
              >
                Change avatar
              </label>
            </div>
            <div className="w-full mt-10">
              <div className="space-y-4 pr-10">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Username or Email
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={showUsername}
                    readOnly
                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Ngôn ngữ
                  </label>
                  <select
                    id="language"
                    defaultValue="vi"
                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="vi">Tiếng Việt</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Múi giờ
                  </label>
                  <select
                    id="timezone"
                    defaultValue="gmt+7"
                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="gmt+7">GMT+7</option>
                    <option value="gmt+8">GMT+8</option>
                    <option value="gmt+9">GMT+9</option>
                  </select>
                </div>             
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-1/3"></div>
            <button
                  type="submit"
                  onClick={handleSubmitInfomation}
                  className="w-[350px] ml-10 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Lưu thay đổi
            </button>
          </div>
       </form>
    </section>
  );
};

export default UserInformation;
