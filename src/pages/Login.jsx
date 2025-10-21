import { useState } from "react";
import Input from "../Shared/Input";
import Layout from "../Shared/Layout/Layout";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPass, setIsForgetPass] = useState(false);

  const HandleReg = () => {
    setIsRegister(true);
  };
  const HandlLog = () => {
    setIsRegister(false);
  };
  return (
    <Layout>
      <div className="min-h-screen  bg-primary  flex flexCol w-full px-4 md:px-0 ">
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
            <form className=" rounded-md  p-4 flexCol gap-6 w-full">
              <Input type={"text"} labelFor={"Name"} placehold={"John Doe"} />
              <Input
                type={"email"}
                labelFor={"Email"}
                placehold={"example@gmail.com"}
              />
              <Input
                type={"text"}
                labelFor={"Phone"}
                placehold={"09074639302"}
              />
            </form>
          )}

          {isRegister === false && isForgetPass === false && (
            <form className="rounded-md  p-4 flexCol gap-6 ">
              <Input type={"text"} labelFor={"Email"} placehold={"Email"} />
              <Input
                type={"password"}
                labelFor={"Password"}
                placehold={"Password"}
              />
              <p
                onClick={() => setIsForgetPass(true)}
                className="text-white font-semibold text-lg cursor-pointer"
              >
                Forgot Password
              </p>
            </form>
          )}

          {isForgetPass && (
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
