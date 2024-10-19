import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import Divider from "../components/Divider";
const UserInformation = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  return (
    <section className=" w-full min-h-screen mx-auto flex items-center justify-center">
      <div className="container bg-[#25252D] rounded-md w-[900px] h-[520px] flex shadow-xl gap-16">
        <div className="mt-20 ml-20 flex flex-col items-center gap-5">
          <div className=" mb-4 w-full">
            <img
              src={selectedImage}
              alt="Avatar user"
              className="object-cover w-48 h-48 rounded-full"
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
            Đổi ảnh đại diện
          </label>
        </div>
        <div className="w-full">
          <form className="space-y-4 mt-10 pr-20">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Tên người dùng
              </label>
              <input
                type="text"
                id="username"
                defaultValue="Nihao"
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue="mail@abc.com"
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gmt+7">GMT+7</option>
                <option value="gmt+8">GMT+8</option>
                <option value="gmt+9">GMT+9</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserInformation;
