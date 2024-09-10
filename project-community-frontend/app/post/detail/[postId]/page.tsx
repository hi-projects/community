'use client'

import { useState, useEffect, useCallback, useRef, memo, useContext } from "react";

import { CommonPagination } from "@/app/ui/common-pagination";

import { Badge, Button, Collapse, Container, Form, Image, Modal, Pagination, Row } from "react-bootstrap";

import { PaginationData } from "@/app/lib/types";
import { ENTITY_TYPE_COMMENT, ENTITY_TYPE_POST, ENTITY_TYPE_REPLY, HOME_URL, HTTP_REPSONSE_STATUS_FORBIDDEN, ROLE_ADMIN } from "@/app/lib/constants";
import { addCommentEndpoint, deletePostEndpoint, likeEndpoint, postDetailEndpoint, topPostEndpoint, wonderfulPostEndpoint } from "@/app/lib/endpoints";
import { useRouter } from "next/navigation";
import { UserStateContext } from "@/app/ui/layout-root/header-and-children";
import { limitDefault } from "@/app/lib/constants";

// ==================================================
const PostPagination = memo(CommonPagination);

// ==================================================
const inputId = "input"

export default function Page({params}:{
	params:{
		postId: string,
	}
}){
	console.log(" ============================= /post/detail/[postId] ============================= ");
	
	const postId = params.postId

	const router = useRouter()

	const inputRef1 = useRef(null);
	const inputRef2 = useRef(null);

	const userState = useContext(UserStateContext);
	const loginUser = userState.user;

	const [data, setData] = useState<any>();
	const [pagination, setPagination] = useState<PaginationData>()
	const [isOpen, setIsOpen] = useState<boolean[]>([]);
	const [placeholder, setPlaceholder] = useState<string>();
	const [entityId, setEntityId] = useState<number>();
	const [targetId, setTargetId] = useState<number>();
	const [showModal, setShowModal] = useState<boolean>(false);
	const [modalMsg, setModalMsg] = useState<string>();

	// 获取初始页面数据
	useEffect(()=>{
		postDetailEndpoint({
			pathParams: [postId],
			requestParams: [0, limitDefault]
		})
		.then(data=>{
			console.log("data: ", data)
			setData(data);
			setPagination({current: 1, count: data.postMap.post.commentCount, limit: limitDefault});
			setIsOpen(Array(Math.min(data.postMap.post.commentCount, limitDefault)).fill(false))
		});
	}, [])

	useEffect(()=>{
		if(inputRef1.current != null){
			inputRef1.current.focus();
		}
	}, [inputRef1.current])

	// 用于评论分页按钮
	const handleClick = useCallback(async (pagination: PaginationData)=>{
		const data = await postDetailEndpoint({
			pathParams: [postId],
			requestParams: [(pagination.current - 1) * pagination.limit, pagination.limit]
		});
		setData(data);
		setPagination({
			current: pagination.current,
			count: data.postMap.post.commentCount,
			limit: limitDefault
		});
		setIsOpen(Array(Math.min(data.postMap.post.commentCount - (pagination.current - 1) * pagination.limit , pagination.limit)).fill(false))
	}, []) 

	// 回复评论、回复回复
	const handleClick2 = useCallback(async(e:any, index: number, placeholder0: string, entityId: number, targetId: number)=>{
		e.preventDefault();
		
		const newIsOpen = Array(Math.min(data.postMap.post.commentCount - (pagination!.current - 1) * pagination!.limit , pagination!.limit)).fill(false);
		if(placeholder == placeholder0){		// 回复同一人, 隐藏输入框
			newIsOpen[index] = !isOpen[index];
		}
		else{	// 回复不同人, 不隐藏输入框, 改变提示人
			newIsOpen[index] = true;
		}
		setIsOpen(newIsOpen);
		setPlaceholder(placeholder0);
		setEntityId(entityId);
		setTargetId(targetId);

	}, [isOpen])

	// 点赞功能
	async function like(event, entityType:number, entityId:number,){
		event.preventDefault();
		if(loginUser == undefined){	// 用户尚未登录
			setShowModal(true);
			setModalMsg("您尚未登录!");
		}
		else{
			const formData = {
				postId: postId,
				entityId: entityId,
				entityType: entityType,
			}
			const res = await likeEndpoint(formData);
	
			if(res.code == "200"){	
				if(entityType == ENTITY_TYPE_POST){	// 对帖子执行操作
					data.postMap.likeCount = res.likeCount
					data.postMap.likeStatus = res.likeStatus
				}
				else if(entityType == ENTITY_TYPE_COMMENT){
					data.commentsLikeMap[entityId] = {
						likeCount: res.likeCount,
						likeStatus: res.likeStatus,
					}
				}
				else{
					data.repliesLikeMap[entityId] = {
						likeCount: res.likeCount,
						likeStatus: res.likeStatus,
					}
				}
				const newData = {...data}
				console.log("newData: ", newData)
				setData(newData);
			}
			
		}
		
	}

	// 添加评论
	const addComment = useCallback(async(event:any, entityType: number, entityId: number, targetId: number, )=>{
		event.preventDefault();
		console.log("当前登录用户为 : ", loginUser)
		if(loginUser == undefined){	// 用户尚未登录
			setShowModal(true);
			setModalMsg("您尚未登录!");
		}
		else{
			const formData = {
				postId: postId,
				entityType: entityType,
				entityId: entityId,
				targetId: targetId,
				content: event.target[inputId].value,
			}
	
			const response = await addCommentEndpoint(formData);
	
			if(response.status == HTTP_REPSONSE_STATUS_FORBIDDEN){	// 权限不足
				setShowModal(true);
				setModalMsg("权限不足!");
			}
			else{
				const res = await response.json();
				console.log("res: ", res);
				if(res.code == "200"){
					setShowModal(true);
					setModalMsg(res.msg);
					inputRef2.current.value = "";
					const res2 = await postDetailEndpoint({
						pathParams: [postId],
						requestParams: [0, pagination.limit]
					});
					setData(res2);
					setPagination({current: 1, count: res2.postMap.post.commentCount, limit: limitDefault});
					setIsOpen(Array(Math.min(res2.postMap.post.commentCount, limitDefault)).fill(false))
				}
			}
		}
	}, [loginUser])

	async function toProfile(e: any, userId: string){
        e.preventDefault();
        
        router.push(`/profile/${userId}`);
    }


	// 置顶功能
	async function topPost(){
		const formData = new FormData();
		formData.append("postId", postId)
		const data = await topPostEndpoint({formData: formData})
		if(data != undefined){
			setModalMsg(data.msg)
			setShowModal(true)
		} 
	}
	// 加精功能
	async function wonderfulPost(){
		const formData = new FormData();
		formData.append("postId", postId)
		const data = await wonderfulPostEndpoint({formData: formData})
		if(data != undefined){
			setModalMsg(data.msg)
			setShowModal(true)
		} 
	}
	// 删除帖子功能
	async function deletePost(){
		const formData = new FormData();
		formData.append("postId", postId)
		const data = await deletePostEndpoint({formData: formData})
		if(data != undefined){
			router.push(HOME_URL)
		} 
	}


	// 初始页面加载完成, 重新渲染
	if(data != undefined && pagination != undefined){


		const postMap = data.postMap;				   
		const commentsMapList = data.commentsMapList;	
		const commentsLikeMap = data.commentsLikeMap;	
		const repliesMap = data.repliesMap;			   
		const repliesLikeMap = data.repliesLikeMap;	   

		console.log("hhhhhhhhhhh :", data)

		return (
		<>
			<Container>
				{/** 标题 */}
				
				<div className="d-flex align-items-center mb-4">  
        			<img src="http://static.nowcoder.com/images/img/icons/ico-discuss.png" alt="Icon" />  
        			<span style={{marginLeft: "10px"}}>{postMap.post.title}</span>
					{
						loginUser != undefined && loginUser.type == ROLE_ADMIN &&
						<div style={{marginLeft: "auto"}}>  
    				    	{postMap.post.type != 1 && <Button variant="danger" size="sm" className="ms-1" onClick={topPost}>置顶</Button>} 
    				    	{postMap.post.status != 1 && <Button variant="danger" size="sm" className="ms-1" onClick={wonderfulPost}>加精</Button>}
							<Button variant="danger" size="sm" className="ms-1" onClick={deletePost}>删除</Button>  
    					</div>  
					}
    				
				</div>
		
				<div className="d-flex pb-3 border-bottom">
					{/** 发帖用户头像 */}
					<a onClick={(e:any)=>{toProfile(e, postMap.user.id)}}>
						<Image src={postMap.user.headerUrl} className="align-self-start me-4 mt-3" alt="用户头像" width={50} height={50} roundedCircle/>
					</a>
					
					<div className="mt-2 flex-grow-1">
						<div className="mt-0 text-warning">{postMap.user.username}</div>
						<div className="d-flex text-muted mt-3 justify-content-between">
							发布于 {postMap.post.createTime}
							<ul className="d-inline">
								<li className="d-inline ms-2"><a className="text-primary" onClick={e=>like(e, ENTITY_TYPE_POST, postMap.post.id)}><b>{postMap.likeStatus == 0 ? "赞" : "已赞"}</b><i className="ms-1">{`(${postMap.likeCount})`}</i></a></li>
							</ul>
						</div>
					</div>

				</div>	
		
				{/** 正文 */}
				<div className="mt-4 mb-3 content">
					{postMap.post.content}
				</div>
			</Container>
		
			<Container className="mt-3">
				{/** 回帖数量 */}
				<div className="d-flex justify-content-between">
					<h6><b className="square"></b><i>{postMap.post.commentCount}</i>条回帖</h6> 
					<a className="btn btn-primary btn-sm" onClick={()=>{inputRef2.current.focus();}}>&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</a>
				</div>
				{/** 回帖列表 */}
				
				<ul className="list-unstyled mt-4">
					{ commentsMapList.length > 0 && commentsMapList.map((commentMap:any, index:number)=>{
						const commentLikeMap = commentsLikeMap[commentMap.comment.id] ?? {};	    // 该评论及相关信息
						const replyMapList = repliesMap[commentMap.comment.id] ?? [];			    // 该评论的回复及相关信息
						console.log("replyMapList: ", replyMapList)
						const layer = (pagination.current- 1) * pagination.limit + index;

						return (
							<li key={commentMap.comment.id} className="pb-3 pt-3 mb-3 border-bottom">
								<div className="d-flex">
									<a onClick={(e:any)=>{toProfile(e, commentMap.user.id)}}>
										<img src={commentMap.user.headerUrl} className="align-self-start mr-4 rounded-circle user-header" alt="用户头像" />
									</a>
									<div className="ms-4 flex-grow-1">
										<div className="mt-0 d-flex justify-content-between">
											<span className="font-size-17 text-success">{commentMap.user.username}</span>	    {/** 评论用户名称 */}
											<Badge>{layer}#</Badge>		    {/** 评论楼层 */}
										</div>
										<div className="mt-3">
											{commentMap.comment.content}	{/** 评论内容 */}
										</div>
										<div className="mt-4 text-muted font-size-12 d-flex justify-content-between">
											<span>
												发布于
												<b>{commentMap.comment.createTime}</b>	{/** 评论时间 */}
											</span>
											<ul className="d-inline">
												<li className="d-inline ms-2"><a href="#" onClick={(e)=> like(e, ENTITY_TYPE_COMMENT, commentMap.comment.id)} className="text-primary"><b>{commentLikeMap.likeStatus == 0 ? "赞" : "已赞"}</b><i className="ms-1">{`(${commentLikeMap.likeCount})`}</i></a></li>
												<li className="d-inline ms-2">|</li>
												<li className="d-inline ms-2"><a href="#" className="text-primary" onClick={(e)=>{handleClick2(e, index, commentMap.user.username, commentMap.comment.id, commentMap.comment.userId)}}>回复({commentMap.replyCount})</a></li>
											</ul>
										</div>
										{/** 回复列表 */}
										{replyMapList.length > 0 && 
										<ul className="list-unstyled mt-4 bg-gray p-3 font-size-12 text-muted">
											{
											replyMapList.map((replyMap:any)=>{ 
												console.log("replyMap: ", replyMap)
												const replyLikeMap = repliesLikeMap[replyMap.reply.id]; 

												return (
													<li key={replyMap.reply.id} className="pb-3 pt-3 mb-3 border-bottom">
														<div>
															<span><b className="text-info"><b onClick={(e:any)=>{toProfile(e, replyMap.user.id)}}>{replyMap.user.username}</b> {(replyMap.reply.targetId != commentMap.user.id) && `回复 ${replyMap.target.username}`} </b>:&nbsp;&nbsp;</span>
															<span>{replyMap.reply.content /** 回复内容 */}</span>
														</div>
														<div className="mt-3">
															<span>{replyMap.reply.createTime /** 回复时间 */}</span>
															<ul className="d-inline">
																<li className="d-inline ms-1"><a className="text-primary" onClick={e=>like(e, ENTITY_TYPE_REPLY, replyMap.reply.id)}><b>{replyLikeMap.likeStatus == 0 ? "赞" : "已赞"}</b><i className="ms-1">{replyLikeMap.likeCount}</i></a></li>
																<li className="d-inline ms-1">|</li>
																<li className="d-inline ms-1"><a className={`text-primary ${loginUser != undefined && replyMap.user.id == loginUser.id && "disabled"}`} onClick={(e)=>{handleClick2(e, index, replyMap.user.username, commentMap.comment.id, replyMap.user.id)}}>回复</a></li>
															</ul>
														</div>
													</li>
												)})}
										</ul>
										}
									</div>
								</div>
									
								<Collapse in={isOpen[index]}>
									<Form onSubmit={(e)=>{addComment(e, ENTITY_TYPE_REPLY , entityId!, targetId!)}}>
										<p className="mt-3">
											<Form.Control ref={inputRef1} id={inputId} as="textarea" placeholder={`回复${placeholder}: `}/>
										</p>
										<p className="text-right">
											<Button size="sm" variant="primary" type="submit">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</Button>
										</p>
									</Form>
								</Collapse>
									
							</li>
						)})}
				</ul>
			</Container>

			<PostPagination pagination={pagination} onClick={handleClick}/>

			<Container>
				<Form onSubmit={(e)=>{addComment(e, ENTITY_TYPE_COMMENT, postMap.post.id, postMap.user.id)}}>
					<p className="mt-3">
						<Form.Control ref={inputRef2} id={inputId} as="textarea" placeholder="在这里畅所欲言你的看法吧!"/>
					</p>
					<p className="text-right">
						<Button size="sm" variant="primary" type="submit">&nbsp;&nbsp;回&nbsp;&nbsp;帖&nbsp;&nbsp;</Button>
					</p>
				</Form>
			</Container>

			<Modal show={showModal} onHide={()=>setShowModal(false)}>
				<Modal.Body>
					{modalMsg}
				</Modal.Body>
			</Modal>
		</>
	)
	}
	else{
		return null;
	}
}




