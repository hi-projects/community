'use client'


import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { Nav } from "react-bootstrap";
import { UserStateContext } from "../layout-root/header-and-children";
import { USER_MY_POST, USER_MY_REPLY, USER_PROFILE_URL } from "@/app/lib/constants";


function Navigation(){
	console.log(" ====================== ")
	const router = useRouter();

	const userState = useContext(UserStateContext);
	const loginUser = userState.user; 

	console.log("用户主页的用户是: ", loginUser)

    const [activateKey, setActivateKey] = useState(1);



	function handleClick(e, activateKey, url){
		e.preventDefault();
		setActivateKey(activateKey);
		router.push(url)
	}

    return (
        <div className="position-relative">
			<Nav variant="tabs" activeKey={activateKey}>
				<Nav.Item>
					<Nav.Link eventKey={1} onClick={(e)=> handleClick(e, 1, `${USER_PROFILE_URL}/${loginUser.id}`)}>个人信息</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey={2} href="/my-post" onClick={(e)=> handleClick(e, 2, `${USER_MY_POST}`)}>我的帖子</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey={3} href="/my-reply" onClick={(e)=> handleClick(e, 3, `${USER_MY_REPLY}`)}>我的回复</Nav.Link>
				</Nav.Item>
			</Nav>
		</div>
    )
} 

export { Navigation }