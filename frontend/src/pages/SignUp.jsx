import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"

function SignUp(){
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    console.log(firstName, lastName, email, password);

    // API call to create a new user
    // If successful, redirect to sign in page
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"}></Heading>
          <SubHeading label={"Enter your information to create an acount"}></SubHeading>
          <InputBox placeholder = "John" label={"First Name"} Val={firstName} setVal={setfirstName}></InputBox>
          <InputBox placeholder = "Doe" label={"Last Name"} Val={lastName} setVal={setlastName}></InputBox>
          <InputBox placeholder = "abc@gmail.com" label={"Email"} Val={email} setVal={setEmail}></InputBox>
          <InputBox placeholder = "123456" label={"Password"} Val={password} setVal={setPassword}></InputBox>
          <div className="pt-4">
            <Button label={"Sign Up"} onClick = {submitHandler}></Button>
          </div>
          <BottomWarning label={"Already have an account"} buttonText = {"Sign In"} to = {"/SignIn"}></BottomWarning>
        </div>
      </div>
    </div>
  )
}

export default SignUp