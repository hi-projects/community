'use client'

import { NOTIFICATION_URL } from "@/app/lib/constants"
import { noticeListEndpoint } from "@/app/lib/endpoints"
import { MessageNavagation } from "@/app/ui/messages/navagation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge, Container } from "react-bootstrap"

export default function Page(){
	const router = useRouter();

	const [data, setData] = useState()

	useEffect(()=>{
		noticeListEndpoint().then(data=>{
			console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx: ", data)
			setData(data);
		})
	}, [])


	// 跳转至通知详情页面
	async function notificationDetail(e:any, type:string){
		e.preventDefault();
		router.push(`${NOTIFICATION_URL}/${type}`);
	}

	if(data != undefined){
		const commentNotice = data.commentNotice;
		const likeNotice = data.likeNotice;
		const followNotice = data.followNotice;
		const totalCountOfUnreadLetter = data.totalCountOfUnreadLetter;
		const totalCountOfUnreadNotice = data.totalCountOfUnreadNotice;

		return (
			<Container>
				<div className="position-relative">
					<MessageNavagation defaultActiveKeyactiveKey={2} total1={totalCountOfUnreadLetter} total2={totalCountOfUnreadNotice}/>
				</div>
				<ul className="list-unstyled">
					<li className="d-flex pb-3 pt-3 mb-3 border-bottom position-relative">
						<Badge bg="danger" className="flex-grow-0 " style={{width:'17px', height:"17px", top:"17px", left:"0px", position:"absolute"}}>{commentNotice.unreadCount != 0 && commentNotice.unreadCount}</Badge>
						<img src="http://static.nowcoder.com/images/head/reply.png" className="mr-4 user-header mt-1" alt="通知图标"/>
						<div className="flex-grow-1 ms-4 mb-2">
							<h6 className="d-flex mt-0 mb-3 justify-content-between">
								<span style={{fontWeight: 'bold'}}>评论</span>
								<span className="text-muted font-size-12">{commentNotice.createTime}</span>
							</h6>
							<div className="d-flex justify-content-between mt-2 mb-2">
								{commentNotice != undefined ? <a onClick={e=>notificationDetail(e, "comment")}>用户 <i style={{fontStyle: "italic"}}>{commentNotice.user.username}</i> 评论了你的<b>帖子</b> ...</a> : "暂无评论消息!"}
								
								<ul className="d-inline font-size-12">
									<li className="d-inline ml-2"><span className="text-primary">共 <i>{commentNotice.count}</i> 条会话</span></li>
								</ul>
							</div>
						</div>
					</li>
					<li className="d-flex pb-3 pt-3 mb-3 border-bottom position-relative">
						<Badge bg="danger" className="flex-grow-0 " style={{width:'17px', height:"17px", top:"17px", left:"0px", position:"absolute"}}>{likeNotice != undefined && likeNotice.unreadCount != 0 && likeNotice.unreadCount}</Badge>
						<img src="http://static.nowcoder.com/images/head/like.png" className="mr-4 user-header" alt="通知图标"/>
						<div className="flex-grow-1 ms-4 mb-2">
							<h6 className="d-flex mt-0 mb-3 justify-content-between">
								<span style={{fontWeight: 'bold'}}>赞</span>
								<span className="text-muted font-size-12">{likeNotice != undefined && likeNotice.createTime}</span>
							</h6>
							<div className="d-flex justify-content-between mt-2 mb-2">
								{likeNotice != undefined ? <a onClick={e=>notificationDetail(e, "like")}>用户 <i style={{fontStyle: "italic"}}>{likeNotice.user.username}</i> 点赞了你的<b>帖子</b> ...</a> : "暂无最新的点赞消息"}
								<ul className="d-inline font-size-12">
									<li className="d-inline ml-2"><span className="text-primary">共 <i>{likeNotice != undefined ? likeNotice.count : 0}</i> 条会话</span></li>
								</ul>
							</div>
						</div>
					</li>
					<li className="d-flex pb-3 pt-3 mb-3 position-relative">
						<Badge bg="danger" className="flex-grow-0 " style={{width:'17px', height:"17px", top:"17px", left:"0px", position:"absolute"}}>{followNotice != undefined && followNotice.unreadCount}</Badge>
						<img src="http://static.nowcoder.com/images/head/follow.png" className="mr-4 user-header mt-1" alt="通知图标"/>
						<div className="flex-grow-1 ms-4 mb-2">
							<h6 className="d-flex mt-0 mb-3 justify-content-between">
								<span style={{fontWeight: 'bold'}}>关注</span>
								<span className="text-muted font-size-12">{followNotice != undefined && followNotice.createTime}</span>
							</h6>
							<div className="d-flex justify-content-between mt-2 mb-2">
								{followNotice != undefined ? <a href="notice-detail.html">用户 <i style={{fontStyle: "italic"}}>{followNotice.user.username}</i> 关注了你 ...</a> : "暂无最新的关注消息"}
								<ul className="d-inline font-size-12">
									<li className="d-inline ml-2"><span className="text-primary">共 <i>{followNotice != undefined ? followNotice.count : 0}</i> 条会话</span></li>
								</ul>
							</div>
						</div>
					</li>		
				</ul>
			</Container>
		)
	}
	else{
		return (
			<Container>
				
			</Container>
		)
	}
    
}