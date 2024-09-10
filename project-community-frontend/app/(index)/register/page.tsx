'use client'

import { useRouter } from "next/navigation";
import { useRef, useState, memo, useCallback } from "react";
import { sendEmail } from "@/app/lib/server-actions/sendEmail";
import { RegisterFormData, RegisterResponseBody } from "@/app/lib/types";
import { isEmail, isTel } from "@/app/lib/utils-validation";
import { Col, Container, Form, Row } from "react-bootstrap";
import { registerEndpoint } from "@/app/lib/endpoints";

const accountId = "account"
const passwordId = "password"
const confirmedPwdId = "confirmed-password"

export default function Page(){
	console.log(" ============================== /register ============================== ")

	const router = useRouter();

	const [accountMsg, setAccountMsg] = useState<string>("");
	const [passwordMsg, setPasswordMsg] = useState<string>("");
	const [confirmedPasswordMsg, setConfirmedPasswordMsg] = useState<string>(""); 

	const [isInvalid1, setIsInvalid1] = useState(false);
	const [isInvalid2, setIsInvalid2] = useState(false);
	const [isInvalid3, setIsInvalid3] = useState(false);

	let passwordRef = useRef<HTMLInputElement>(null);

	// 校验"账号"
	const handleBlur1 = useCallback((event:any)=>{
		const account = event.target.value;			// 账号
		const msg = checkAccount(account);
		if(msg != ""){
			setAccountMsg(msg);
			setIsInvalid1(true)
		}
	}, [])

	// 校验"密码"
	const handleBlur2 = useCallback((event:any)=>{
		const password = event.target.value;		// 密码
		const msg = checkPassword(password)
		if(msg != ""){
			setPasswordMsg(msg)
			setIsInvalid2(true)
		}
	}, [])
	// 校验"确认密码"
	const handleBlur3 = useCallback((event:any)=>{
		const pwd1 = passwordRef.current!.value;      // 密码
		const pwd2 = event.target.value;			  // 确认密码
		const msg = checkConfirmedPassword(pwd1, pwd2);
		if(msg != ""){	// 校验没有通过
			setConfirmedPasswordMsg(msg)
			setIsInvalid3(true)
		}
	}, [])

	// 提交注册表单
	const handleSubmit = useCallback(async (event:any) => {
		event.preventDefault();

		const formObj = {
			"account": event.target[accountId].value,
			"password": event.target[passwordId].value,
		} as RegisterFormData

		const formData = JSON.stringify(formObj);

		const data = await registerEndpoint({formData: formData})

		if(data.userId != undefined && data.activateCode != undefined){	// 注册成功
			if(isEmail(formObj.account)){	// 注册账号是邮箱, 发送
				// 发送邮件
				sendEmail(formObj.account, formObj.account, data.userId, data.activateCode);
			}
			else{	// 注册账号是手机号, 发送短信
				console.log("注册账号是手机号, 发送短信, 逻辑待补充")
			}
			const index = "1"
			const url = `/operation-results/${index}`;
			router.push(url);
		}
		else{	// 注册失败
			data.accountMsg != undefined && setAccountMsg(data.accountMsg);
			data.passwordMsg != undefined && setPasswordMsg(data.passwordMsg);
		}
	}, [])

    return (
		<Container className="ps-5 pe-5 pt-3 pb-3 mt-3 mb-3">
			<h3 className="text-center text-info border-bottom pb-3">注&nbsp;&nbsp;册</h3>
			<Form className="mt-5" onSubmit={handleSubmit}>
				<Form.Group as={Row} controlId={accountId}>
					<Form.Label xs={2} className="text-end" column>账号:</Form.Label>
					<Col>
						<Form.Control placeholder="请输入注册的手机号/邮箱!" required autoComplete="off" onBlur={handleBlur1} isInvalid={isInvalid1} onFocus={()=>setIsInvalid1(false)}/>
						<Form.Control.Feedback type="invalid">
							{accountMsg}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mt-4" controlId={passwordId}>
					<Form.Label xs={2} className="text-end" column>密码:</Form.Label>
					<Col>
						<Form.Control type="password" placeholder="请输入您的密码!" required autoComplete="off" onBlur={handleBlur2} isInvalid={isInvalid2} onFocus={()=>setIsInvalid2(false)}/>
						<Form.Control.Feedback type="invalid">
							{passwordMsg}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mt-4" controlId={confirmedPwdId}>
					<Form.Label xs={2} className="text-end" column>确认密码:</Form.Label>
					<Col>
						<Form.Control ref={passwordRef} type="password" placeholder="请再次输入密码!" required autoComplete="off" onBlur={handleBlur3} isInvalid={isInvalid3} onFocus={()=>setIsInvalid3(false)}/>
						<Form.Control.Feedback type="invalid">
							{confirmedPasswordMsg}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group as={Row} className="mt-5 mb-1">
					<Col xs={2}/>
					<Col>
						<Form.Control as={"button"} type="submit" className="btn btn-info text-white">立即注册</Form.Control>
					</Col>
				</Form.Group>
			</Form>

		</Container>
    )
}


function checkAccount(account:string):string{
	let msg = "";
	if(account == ""){
		msg = "邮箱/手机号不能为空";
	}
	else if(!isEmail(account) && !isTel(account)){
		msg = "邮箱/手机号格式不正确";
	}
	return msg;
}

function checkPassword(pwd: string):string{
	let msg = "";
	if(pwd == ""){
		msg = "密码不能为空";
	}
	else if(pwd.length < 8){
		msg = "密码长度不能小于8";
	}
	return msg;
}

function checkConfirmedPassword(pwd1:string, pwd2:string):string{
	let msg = "";
	if(pwd1 != pwd2){
		msg = "两次输入的密码不一致!";
	}
	return msg;
}