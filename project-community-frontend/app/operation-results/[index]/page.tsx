'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";



export default function OperationResults({params}:{
	params:{
		index: string,
	}
}){
	console.log(params)
	const router = useRouter();

	let msg = null;
	let href = null;

	const [time, setTime] = useState(8)

	const intervalRef = useRef() as any;
	
	useEffect(()=>{
		intervalRef.current = setInterval(()=>{setTime(time=>time-1)}, 1000);
		console.log("Set setInterval.")
	}, [])

	

	switch(params.index) {
		case "1":
			msg = "注册成功,我们已经向您的邮箱发送了一封激活邮件,请尽快激活!";
			href = "/login";
			break;
		case "2":
			msg = "账号已成功激活!";
			href = "/login";
			break;
		case "3":
			msg = "激活失败, 账号已经被激活过了!";
			href = "/home";	
			break;
		case "4":
			msg = "激活失败, 激活码与提供的激活码不符!";
			href = "/home"
			break;
		case "5":
			msg = "当前账号已登录, 请勿重复登录!"
			href = "/home"
			break;
		default:
			msg = "未知错误, 即将跳转到主页!";
			href = "/home";
	}

	if(time == 0){
		clearInterval(intervalRef.current);
		router.push(href)
		console.log("Cleared interval.")
	}

    return (
        <div className="main">
			<div className="container mt-5">
				<div className="jumbotron">
					<p className="lead">{msg}</p>
					<hr className="my-4"/>
					<p>
						系统会在 <span id="seconds" className="text-danger">{time}</span> 秒后自动跳转,
						您也可以点此 <a id="target" href={href} className="text-primary">链接</a>, 手动跳转!
					</p>
				</div>
			</div>
		</div>
    )
}