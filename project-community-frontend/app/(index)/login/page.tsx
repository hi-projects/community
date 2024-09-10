'use client'

import { kaptchaEndpoint, loginEndpoint, preFetchUserEndpoint } from "@/app/lib/endpoints";
import { LoginFormData, LoginResponseBody } from "@/app/lib/types";
import { UserStateContext } from "@/app/ui/layout-root/header-and-children";
import { useRouter } from "next/navigation";
import { useState, useCallback, useContext } from "react"
import { Col, Container, Form, FormLabel, Row } from "react-bootstrap";

const accountId = "account"
const passwordId = "password"
const codeId = "code"
const rememberMeId = "rememberMe"

const codeSrc = "http://127.0.0.1:8080/kaptcha"

export default function Page(){

	console.log(" ====================================== /login ====================================== ")

	const router = useRouter()

	const userState = useContext(UserStateContext);

	const [accountMsg, setAccountMsg] = useState<string>();
	const [passwordMsg, setPasswordMsg] = useState<string>();
	const [codeMsg, setCodeMsg] = useState<string>();

	const [isInvalid1, setIsInvalid1] = useState(false);
	const [isInvalid2, setIsInvalid2] = useState(false);
	const [isInvalid3, setIsInvalid3] = useState(false);
	const [src, setSrc] = useState<string>(codeSrc);

	const refreshCode = useCallback(async()=>{
		const blob = await kaptchaEndpoint();
		setSrc(URL.createObjectURL(blob));
	}, [])

	async function submit(event: any){
		event.preventDefault();

		const formData = new FormData();

		formData.append("account", event.target[accountId].value)
		formData.append("password", event.target[passwordId].value)
		formData.append("kaptcha", event.target[codeId].value)
		formData.append("rememberMe", event.target[rememberMeId].checked)

		const data = await loginEndpoint(formData);

		console.log(data);
		
		if(data.code == 200){				// 登录成功, 跳转至主页
			console.log("登录成功!")
			userState.setUser(await preFetchUserEndpoint());
			router.push("/home");
		}
		else if(data.code == -1){
			console.log("-1");
			setCodeMsg(data.msg); 
			setIsInvalid3(true);
		}
		else if(data.code == -2){
			console.log("-2");
			setAccountMsg(data.msg); 
			setIsInvalid1(true);
		}
		else if(data.code == -3){
			console.log("-3");
			setPasswordMsg(data.msg); 
			setIsInvalid2(true);
		}
		// if(data.loginMsg != undefined){	// 重复登录
		// 	const index = "5"
		// 	router.push(`/operation-results/${index}`);
		// }
	}


    return (
		<Container className="ps-5 pe-5 pt-3 pb-3 mt-3 mb-3">
			<h3 className="text-center text-info border-bottom pb-3">登&nbsp;&nbsp;录</h3>
			<Form onSubmit={submit}>
				<Form.Group as={Row} className="mt-4" controlId={accountId}>
					<Form.Label xs={2} className="text-end" column>账号:</Form.Label>
					<Col>
						<Form.Control placeholder="请输入您的手机号/邮箱" required autoComplete="off" isInvalid={isInvalid1} onClick={()=>{setIsInvalid1(false)}}/>
						<Form.Control.Feedback type="invalid">
							{accountMsg}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mt-4" controlId={passwordId}>
					<Form.Label xs={2} className="text-end" column>密码:</Form.Label>
					<Col>
						<Form.Control type="password" placeholder="请输入您的密码" required autoComplete="off" isInvalid={isInvalid2} onClick={()=>{setIsInvalid2(false)}}/> 
						<Form.Control.Feedback type="invalid">
							{passwordMsg}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mt-4" controlId={codeId}>
					<FormLabel xs={2} className="text-end" column>验证码:</FormLabel>
					<Col xs={8}>
						<Form.Control placeholder="请输入验证码" isInvalid={isInvalid3} onClick={()=>{setIsInvalid3(false)}}/>
						<Form.Control.Feedback type="invalid">
							{codeMsg}
						</Form.Control.Feedback>
					</Col>
					<Col className="text-end">
						<img src={src} width="100px" height="40px;" className="mr-2" onClick={refreshCode}/>
						{/* <a href="javascript:;" className="font-size-12 align-bottom">刷新验证码</a> */}
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mt-4" controlId={rememberMeId}>
					<Col xs={2}/>
					<Col className="d-flex justify-content-between">
						<Form.Check>
							<Form.Check.Input type="checkbox"/>
							<Form.Check.Label>记住我</Form.Check.Label>
						</Form.Check>
						<a href="forget.html" className="text-danger float-right">忘记密码?</a>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mt-4">
					<Col xs={2}/>
					<Col>
						<Form.Control as={"button"} type="submit" className="btn btn-info text-white">立即登录</Form.Control>
					</Col>
				</Form.Group>
			</Form>
		</Container>

    )
}



