'use client'

import { PaginationData } from "@/app/lib/types";
import { useEffect, useState, useCallback } from "react";
import { Container } from "react-bootstrap";

import { CommonPagination as HomePagination } from "@/app/ui/common-pagination";
import { SelectionAndPublish } from "@/app/ui/home/selection";
import { Posts } from "@/app/ui/home/posts";
import { indexEndpoint } from "@/app/lib/endpoints";
import { limitDefault } from "@/app/lib/constants";

export default function Page(){
	console.log(" ===================================== /home ===================================== ")

	const [data, setData] = useState<any>();
	const [pagination, setPagination] = useState<PaginationData>({} as PaginationData);
	const [orderMode, setOrderMode] = useState(0);

	// 获取初始页面数据
	useEffect(()=>{
		indexEndpoint({requestParams: [0, limitDefault, orderMode]}).then(data => {
			setData(data);
			setPagination({
				current: 1,
				limit: 5,
				count: data.count,
			});
		})
	}, [orderMode])

	// 用于分页
	const handleClick = useCallback(async(pagination: PaginationData)=>{
		const data = await indexEndpoint({
			requestParams: [(pagination.current - 1) * pagination.limit, pagination.limit, orderMode]
		});
		
		if(data.code == "200"){
			setData(data);
			setPagination({
				current: pagination.current,
				limit: pagination.limit,
				count: data.count,
			});
		}
	
	}, [])

	if(data != undefined){
		console.log("data: ", data);
		return (
			<Container>
	
				<SelectionAndPublish orderMode={orderMode} setOrderMode={setOrderMode} setData={setData} setPagination={setPagination}/>
	
				<Posts data={data}/>

				<HomePagination pagination={pagination} onClick={handleClick}/> 
					 
			</Container>
		);
	}
	else{
		return (
			<Container>
			</Container>
		);
	}

	

}


