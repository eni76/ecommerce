import { useState, useContext } from "react";
import Input from "../Shared/Input";
import Layout from "../Shared/Layout/Layout";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ProductContext } from "../Context/ProductContext";

import { toast } from "react-toastify";
import { loginUser, registerUser } from "../Services/userService";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPass, setIsForgetPass] = useState(false);
  const [isloding, setIsLoading] = useState(false);
  const { cartItems, setCartItems, setUser, setIsAuthentified, setToken } =
    useContext(ProductContext);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmpassword: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleLogChange = (e) => {
    const { name, value } = e.target;

    setLogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleReg = () => {
    setIsRegister(true);
  };
  const HandlLog = () => {
    setIsRegister(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let [key, value] of Object.entries(userData)) {
      if (value) {
        formData.append(key, value);
      }
    }

    if (isRegister === true && isForgetPass === false) {
      //Regist logic
      setIsLoading(true);
      const res = await registerUser(formData);

      if (res.ok) {
        setIsLoading(false);
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message || res.error);
      }
    }

    if (isRegister === false && isForgetPass === false) {
      //Login Logic
      setIsLoading(true);
      const res = await loginUser(logData, cartItems);

      if (res.ok) {
        setIsLoading(false);
        toast.success(res?.data?.message);
        setCartItems([]);
        navigate("/");
        setToken(res.token);
        localStorage.setItem("token", res.token);
        setIsAuthentified(true),
          localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("isAuthentified", true);

        if (res.decoded) {
          localStorage.setItem("user", JSON.stringify(res?.decoded));
        }
        setUser(res?.decoded);
      } else {
        toast.error(res?.data?.message || res.error);
      }
    }
  };

  return (
    <Layout>
      <div className="min-h-screen  bg-primary  flex flexCol w-full px-4 md:px-0 relative ">
        {isloding && (
          <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center z-20 bg-transWhite text-black gap-2">
            <p className="text-2xl font-semibold">Loading</p>
            <PulseLoader />
          </div>
        )}
        <div className="w-full md:w-1/2 border-2 border-white rounded-md overflow-hidden">
          {isForgetPass === false && (
            <div className="flexRow w-full">
              <span
                onClick={() => HandlLog()}
                className={`w-1/2 p-4 cursor-pointer  ${
                  isRegister
                    ? "bg-white text-primary border-primary "
                    : "bg-primary text-white "
                }`}
              >
                Login
              </span>
              <span
                onClick={() => HandleReg()}
                className={` cursor-pointer  w-1/2 p-4   ${
                  isRegister
                    ? "bg-primary text-white "
                    : "bg-white text-primary "
                }`}
              >
                Register
              </span>
            </div>
          )}
          {isRegister === true && isForgetPass === false && (
            <form
              onSubmit={handleSubmit}
              className=" rounded-md  p-4 flexCol gap-6 w-full"
            >
              <Input
                type={"text"}
                labelFor={"First Name"}
                placehold={"John Doe"}
                name={"firstname"}
                value={userData.firstname}
                onChange={handleChange}
              />
              <Input
                type={"text"}
                labelFor={"Last Name"}
                placehold={"Doe"}
                name={"lastname"}
                value={userData.lastname}
                onChange={handleChange}
              />
              <Input
                type={"email"}
                labelFor={"Email"}
                placehold={"example@gmail.com"}
                name={"email"}
                value={userData.email}
                onChange={handleChange}
              />
              <Input
                type={"text"}
                labelFor={"Phone"}
                placehold={"09074639302"}
                name={"phone"}
                value={userData.phone}
                onChange={handleChange}
              />
              <Input
                type={"text"}
                labelFor={"Address"}
                placehold={"123 Main St, City, Country"}
                name={"address"}
                value={userData.address}
                onChange={handleChange}
              />
              <div className="w-full relative flex flex-col justify-center items-center">
                <p
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-4 top-14 text-black cursor-pointer"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </p>
                <Input
                  type={show ? "text" : "password"}
                  labelFor={"Password"}
                  placehold={"Password"}
                  name={"password"}
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full relative flex flex-col justify-center items-center">
                <p
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-4 top-14 text-black cursor-pointer"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </p>
                <Input
                  type={show ? "text" : "password"}
                  labelFor={"Confirm Password"}
                  placehold={"Confirm Password"}
                  name={"confirmpassword"}
                  value={userData.confirmpassword}
                  onChange={handleChange}
                />
              </div>
              <Input
                type="file"
                labelFor="Image"
                name="image"
                onChange={handleChange}
              />
              {userData.image && (
                <div className="mt-4">
                  <img
                    src={URL.createObjectURL(userData.image)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md mt-2"
                  />
                  <p className="text-white">
                    Selected file: {userData.image.name}
                  </p>
                </div>
              )}

              <div className="w-full flex justify-center p-4">
                <button
                  className="bg-white text-black p-2 rounded-md hover:bg-gray-300 transition-all ease-in-out duration-500"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          )}

          {isRegister === false && isForgetPass === false && (
            <form
              onSubmit={handleSubmit}
              className="rounded-md  p-4 flexCol gap-6 "
            >
              <Input
                type={"email"}
                labelFor={"Email"}
                placehold={"example@gmail.com"}
                name={"email"}
                value={logData.email}
                onChange={handleLogChange}
              />

              <div className="w-full relative flex flex-col justify-center items-center">
                <p
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-4 top-14 text-black cursor-pointer"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </p>
                <Input
                  type={show ? "text" : "password"}
                  labelFor={"Password"}
                  placehold={"Password"}
                  name={"password"}
                  value={logData.password}
                  onChange={handleLogChange}
                />
              </div>

              <div className="w-full flex justify-center p-4">
                <button
                  className="bg-white text-black p-2 rounded-md hover:bg-gray-300 transition-all ease-in-out duration-500"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <p
                onClick={() => setIsForgetPass(true)}
                className="text-white font-semibold text-lg cursor-pointer"
              >
                Forgot Password
              </p>
            </form>
          )}

          {isForgetPass && isRegister === false && (
            <form className="rounded-md  p-4 flexCol gap-6 ">
              <Input
                type={"email"}
                labelFor={"Email"}
                placehold={"example@gmail.com"}
              />
              <Input
                type={"password"}
                labelFor={"Password"}
                placehold={"Password"}
              />
              <div className="w-full flex justify-center p-4">
                <button
                  className="bg-white text-black p-2 rounded-md hover:bg-gray-300 transition-all ease-in-out duration-500"
                  type="submit"
                >
                  Account Recovery
                </button>
              </div>
              <p
                onClick={() => setIsForgetPass(false)}
                className="text-white font-semibold text-lg cursor-pointer"
              >
                Back To Login
              </p>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
