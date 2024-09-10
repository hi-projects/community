'use client'

import { ENTITY_TYPE_USER, USER_FOLLOWEES_URL } from "@/app/lib/constants";
import { followEndpoint, profileEndpoint } from "@/app/lib/endpoints";
import { UserStateContext } from "@/app/ui/layout-root/header-and-children";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody, } from "react-bootstrap";

// 个人信息
export default function Page({params}:{
	params:{
		userId:any	// 主页所属用户的ID
	}
}){
	console.log(" =============================== /profile =============================== ")
	const profileUserId = params.userId;	 				    // 主页所属用户的ID
	const userState = useContext(UserStateContext);				// 
	const loginUser = userState.user;

	const router = useRouter();

	const [data, setData] = useState<any>();
	const [showModal, setShowModal] = useState(false);
	const [modalMsb, setModalMsg] = useState()

	useEffect(()=>{
		profileEndpoint(profileUserId).then(data=>{
			setData(data);
		}) 
	}, [])

	async function follow(followerType: number, followerId: number, followeeType: number, followeeId: number){
		const data = await followEndpoint(followerType, followerId, followeeType, followeeId); 
		console.log("data: ", data);
		if(data.code == 200){
			setShowModal(true)
			setModalMsg(data.msg)
		}
		
	}	

	async function toFolloweesPage(e:any){
		e.preventDefault();
		router.push(USER_FOLLOWEES_URL);
	}

	
	if(data != undefined){
		console.log("data: ", data);

		const profileUser = data.user;				// 主页所属用户
		const followeeCount = data.followeeCount;	// 主页所属用户的关注人数
		const followerCount = data.followerCount;	// 主页所属用户的粉丝人数
		const hasFollowed = data.hasFollowed; 		// 当前登录用户是否已关注该主页所属用户

		
		return (
			<>
				<div className="d-flex mt-5">
					<img src={profileUser.headerUrl} className="align-self-start mr-4 rounded-circle" alt="用户头像" width={50}/>
					<div className="ms-4 flex-grow-1">
						<h5 className="mt-0 text-warning d-flex justify-content-between">
							<span>{profileUser.username}</span>
							{loginUser != undefined && loginUser.id != profileUser.id && <Button variant="info" size="sm" className="me-5 follow-btn" onClick={(e) => follow(ENTITY_TYPE_USER, loginUser.id, ENTITY_TYPE_USER, profileUser.id)}>{hasFollowed ? "已关注": "关注TA"}</Button>}
						</h5>
						<div className="text-muted mt-3">
							<span>注册于 <i className="text-muted">{profileUser.createTime}</i></span>
						</div>
						<div className="text-muted mt-3 mb-5">
							<span>关注了 <a className="text-primary" onClick={(e:any)=>toFolloweesPage(e)}>{followeeCount}</a> 人</span>
							<span className="ms-4">关注者 <a className="text-primary" href="follower.html">{followerCount}</a> 人</span>
							<span className="ms-4">获得了 <i className="text-danger">{data.likeCount}</i> 个赞</span>
						</div>
					</div>
				</div>
				<Modal show={showModal}	onHide={()=>setShowModal(false)}>
					<ModalBody>
						{modalMsb}
					</ModalBody>
				</Modal>
			
			</>

		);
	}
	else{
		return (
			<div className="d-flex mt-5"></div>
		)
	}
    
}