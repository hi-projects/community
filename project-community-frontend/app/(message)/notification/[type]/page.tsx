'use client'

import { limitDefault, POST_DETAIL_URL } from "@/app/lib/constants";
import { notificationDetailEndpoint } from "@/app/lib/endpoints";
import { PaginationData } from "@/app/lib/types";
import { CommonPagination } from "@/app/ui/common-pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Toast } from "react-bootstrap";

export default function Page({params}:{
	params: {
		type: string
	}
}){
	const type = params.type;

	// ===========================
    const router = useRouter();
	const [data, setData] = useState();
	const [paginationData, setPaginationData] = useState<PaginationData>();

	// 获取初始数据
	useEffect(()=>{
		notificationDetailEndpoint({pathParams: [type, 0, limitDefault]}).then(data=>{
			data != undefined && setData(data)
			setPaginationData({
				current: 1,
				limit: limitDefault,
				count: data.countOfNotification
			})
		})
	}, [])

	// 用于分页组件
	async function paginationClickFunction(paginationInternal: PaginationData){
		const newData = await notificationDetailEndpoint({pathParams: [type, (paginationInternal.current - 1) * paginationInternal.limit, paginationInternal.limit]})
		newData != undefined && setData(newData);
		setPaginationData(paginationInternal) 
	}

	// 跳转至帖子详情页面
	async function toConversationDetail(e:any, postId: string){
		e.preventDefault();

		router.push(`${POST_DETAIL_URL}/${postId}`);
	}	

	if(data != undefined){
		const notificationMapList = data.notificationMapList;

		

		return (
			<Container >
				<Row>
					<Col>
						<h6><b className="square"></b> 系统通知</h6>
					</Col>
					<Col style={{textAlign:"end"}}>
						<Button variant="secondary" size="sm" onClick={()=>{router.push("/list-notice")}}>返回</Button>
					</Col>
				</Row>
					
				{/** 通知列表 */}
				<ul className="list-unstyled mt-4">
					{
						notificationMapList.map((notificationMap:any) =>{
							const id = notificationMap.id;
							const user = notificationMap.user;
							const postId = notificationMap.postId;

							return (
								<li key={id} className="d-flex pb-3 pt-3 mb-2">
									<img src="http://static.nowcoder.com/images/head/notify.png" className="mt-2 me-4 rounded-circle user-header" alt="系统图标"/>
									<Toast className="show d-lg-block" role="alert" aria-live="assertive" aria-atomic="true">
										<Toast.Header closeButton>
											<strong className="me-auto">{user.username}</strong>
											<small>2019-04-25 15:49:32</small>

										</Toast.Header>
										<Toast.Body>
											{
												type == "comment" ? <span>用户 <i>{user.username}</i> 评论了你的<b>帖子</b>, <a className="text-primary" onClick={(e:any)=>toConversationDetail(e, postId)}>点击查看</a> !</span>
												
												: type == "like" ? <span>用户 <i>{user.username}</i> 点赞了你的<b>帖子</b>, <a className="text-primary" onClick={(e:any)=>toConversationDetail(e, postId)}>点击查看</a> !</span>

												: type == "follow" && <span>用户 <i>{user.username}</i> 关注了您, <a className="text-primary" onClick={(e:any)=>toConversationDetail(e, postId)}>点击查看</a> !</span>
											}
											
										</Toast.Body>
									</Toast>
								</li>
							)
						})
					}
					
				</ul>
	
				<CommonPagination pagination={paginationData} onClick={paginationClickFunction}/>

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