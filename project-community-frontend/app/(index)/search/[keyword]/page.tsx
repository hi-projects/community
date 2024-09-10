'use client'

import { limitDefault } from "@/app/lib/constants";
import { searchEndpoint } from "@/app/lib/endpoints";
import { EndpointParams, PaginationData } from "@/app/lib/types";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function Page({params}:{
	params:{
		keyword:string
	}
}){
	const keyword = params.keyword;

	const [data, setData] = useState();
	const [paginationData, setPaginationData] = useState<PaginationData>();

	useEffect(()=>{
		const endpointParams = {
			requestParams: [keyword, 1, limitDefault]
		} as EndpointParams

		searchEndpoint(endpointParams).then(data => {
			if(data != undefined){
				setData(data);
				setPaginationData({current: 1, limit: limitDefault, count: data.length} )
			}
		})
	}, [])

	if(data != undefined){

		console.log("用于渲染搜索页面的data为: ", data)

		const postMapList = data;

		return (
			<Container>
				<h6><b className="square"></b> 相关帖子</h6>
				<ul className="list-unstyled mt-4">
					{
						postMapList.map(postMap => {
							const post = postMap.post;
							const user = postMap.user;
							const likeCount = postMap.likeCount;
							const commentCount = postMap.commentCount;

							return (
								<li className="d-flex pb-3 pt-3 mb-3 border-bottom" key={post.id}>
									<img src={user.headerUrl} className="rounded-circle" alt="用户头像" width={50} height={50}/>
									<div className="ms-4">
										<h6 className="mt-0 mb-3">
											<a href="discuss-detail.html">{post.title}</a>
										</h6>
										<div className="mb-3">
											{post.content}
										</div>
										<div className="text-muted font-size-12">
											<u className="me-3">{user.username}</u> 发布于 <b>{post.createTime}</b>
											<ul className="d-inline float-right">
												<li className="d-inline ml-2">赞 {likeCount}</li>
												<li className="d-inline ml-2">|</li>
												<li className="d-inline ml-2">回复 {commentCount}</li>
											</ul>
										</div>
									</div>
								</li>
							)
						})
					}
					
				</ul>
	
					{/* <nav className="mt-5" th:replace="index::pagination">
						<ul className="pagination justify-content-center">
							<li className="page-item"><a className="page-link" href="#">首页</a></li>
							<li className="page-item disabled"><a className="page-link" href="#">上一页</a></li>
							<li className="page-item active"><a className="page-link" href="#">1</a></li>
							<li className="page-item"><a className="page-link" href="#">2</a></li>
							<li className="page-item"><a className="page-link" href="#">3</a></li>
							<li className="page-item"><a className="page-link" href="#">4</a></li>
							<li className="page-item"><a className="page-link" href="#">5</a></li>
							<li className="page-item"><a className="page-link" href="#">下一页</a></li>
							<li className="page-item"><a className="page-link" href="#">末页</a></li>
						</ul>
					</nav> */}
			</Container>
		)
	}

	else{
		return(
			<Container>
					
			</Container>
		) 
	}
    
}