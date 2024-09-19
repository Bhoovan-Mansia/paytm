import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { SignInPath } from "../utils/ApiCalls"

function SignIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, [])

  const submitHandler = async () => {
    console.log(email, password);

    const body = {
      username : email,
      password : password
    }

    const headers = {
      'Content-Type': 'application/json'
    }

    const result =  await axios.post(SignInPath, body, {headers});
    localStorage.setItem("token", result.data.token);

    // Redirect to dashboard
    navigate("/Dashboard");
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign In"}></Heading>
          <SubHeading label={"Enter your credentials to access yout account"}></SubHeading>
          <InputBox placeholder = "abc@gmail.com" label={"Email"} Val={email} setVal={setEmail}></InputBox>
          <InputBox placeholder = "123456" label={"Password"} Val={password} setVal={setPassword}></InputBox>
          <div className="pt-4">
            <Button label={"Sign In"} onClick = {submitHandler}></Button>
          </div>
          <BottomWarning label={"Don't have an account"} buttonText = {"Sign Up"} to = {"/SignUp"}></BottomWarning>
        </div>
      </div>
    </div>
  )
}

export default SignIn