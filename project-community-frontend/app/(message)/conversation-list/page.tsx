'use client'

import { Badge, Button, Container, Form, Modal, Nav } from "react-bootstrap";
import { CommonPagination as LetterPagination } from "../../ui/common-pagination";
import { useCallback, useEffect, useState } from "react";
import { PaginationData } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import { conversationsEndpoint } from "@/app/lib/endpoints";
import { MessageNavagation } from "@/app/ui/messages/navagation";

const limitDefault = 5;
// ======================== id ========================
const formId = "form"
const usernameOfTarget = "usernameOfTarget"
const content = "content"


export default function Page(){
	console.log(" ===================================== /conversations ===================================== ")
	const router = useRouter();
	
    const [activeKey, setActiveKey] = useState(1);
    const [data, setData] = useState<any>(undefined); 
    const [paginantion, setPagination] = useState<PaginationData>();
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [tipMsg, setTipMsg] = useState();

    // 获取初始页面数据
    useEffect(()=>{
        conversationsEndpoint(0, limitDefault).then(data=>{
            console.log("Initial data: ", data)
            setData(data);
            setPagination({current: 1, count: data.conversations.length, limit: limitDefault})
        })
    }, [])

    // 发送私信
    const sendMessage = useCallback(async(event:any)=>{
        event.preventDefault();

        const endpoint = 'http://127.0.0.1:8080/message/send';

        const formObj = {
            "usernameOfTarget": event.target[usernameOfTarget].value,
            "content": event.target[content].value,
        }

        console.log(formObj);

        const formJson = JSON.stringify(formObj);

        const options = {
            method: 'POST',	
            headers: {
              'Content-Type': 'application/json',
            },
            body: formJson,
            credentials: 'include',
            mode: 'cors'
        } as RequestInit

        const response = await fetch(endpoint, options);
        const data = await response.json();

        if(data != undefined){
            setShowModal1(false);
            setShowModal2(true);
            setTipMsg(data.msg);
        }

    }, [])

	// 用于分页
	const handlePagination = useCallback(async(pagination: PaginationData)=>{
		const offset = (paginantion!.current - 1) * pagination.limit;
		const limit = paginantion!.limit;

		const data = await conversationsEndpoint(offset, limit);
		console.log()

		if(data != undefined){
			setData(data);
			setPagination(paginantion);
		}
	}, [])

	

	// 跳转至私信列表
	const handleClick = useCallback(async(letterId:string)=>{
		router.push(`/letter-list/${letterId}`);
	}, [])


	if(data != undefined && paginantion != undefined){
		const conversations = data.conversations;
		const totalCountOfUnreadMessage = data.totalCountOfUnreadMessage;
		const totalCountOfUnreadNotice = data.totalCountOfUnreadNotice; 
		console.log("Start Rendering")
		console.log("data to render: ", data)
		console.log("conversations: ", conversations)

		return (
            <Container>
                <div className="position-relative">
					<MessageNavagation defaultActiveKeyactiveKey={1} total1={totalCountOfUnreadMessage} total2={totalCountOfUnreadNotice}/>
					<Button className="position-absolute rt-0" size="sm" onClick={()=>{setShowModal1(true)}}>发私信</Button>
			    </div>

				{/** 私信列表 */}
				<ul className="list-unstyled">
				{conversations.length > 0 ? (conversations.map((conversationObj:any) => {
					const conversation = conversationObj.conversation;					// 当前会话未读的一条最新信息
					const countOfUnreadMessage = conversationObj.countOfUnreadMessage;	// 当前会话未读信息数量
					const target = conversationObj.target;								// 当前会话的对象
					const countOfMessage = conversationObj.countOfMessage;				// 当前会话的消息数量

					return (
						<li className="d-flex pb-3 pt-3 mb-3 border-bottom position-relative">
							<Badge bg="danger" style={{width:"18px"}}>{countOfUnreadMessage}</Badge>
							<a href="profile.html">
								<img src={target.headerUrl} className="me-4 rounded-circle user-header" alt="用户头像" />
							</a>
							<div className="flex-grow-1">
								<h6 className="d-flex mt-0 mb-3 justify-content-between">
									<span className="text-success">{target.username}</span>
									<span className="text-muted font-size-12">{conversation.createTime}</span>
								</h6>
								<div className="d-flex justify-content-between">
									<a onClick={()=>handleClick(conversation.conversationId) }>{conversation.content}</a>
									<ul className="d-inline font-size-12">
										<li className="d-inline ms-2"><a href="#" className="text-primary">共{countOfMessage}条会话</a></li>
									</ul>
								</div>
							</div>
						</li>
					);
				})): 
				
				<div className="ms-3 mt-4">
					暂无朋友私信
				</div>

				}
				</ul>

	
				{/** 分页 */}
				<LetterPagination pagination={paginantion!} onClick={handlePagination}/>


                {/** 弹出框 */}
			<Modal size="lg" show={showModal1} onHide={()=>{setShowModal1(false)}}>
				<Modal.Header closeButton>
					<Modal.Title>发私信</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form id={formId} onSubmit={(e)=>sendMessage(e)}>
						<Form.Group controlId={usernameOfTarget}>
							<Form.Label >发给: </Form.Label>
							<Form.Control placeholder="请输入想要发送私信的用户名"/>
						</Form.Group>
						<Form.Group controlId={content}>
							<Form.Label >内容: </Form.Label>
							<Form.Control as="textarea" rows={10}/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit" form={formId}>发送</Button>
					<Button variant="secondary" onClick={()=>setShowModal1(false)}>取消</Button>
				</Modal.Footer>
			</Modal>
	
			{/** 提示框 */}
			<Modal size="lg" show={showModal2} onHide={()=>setShowModal2(false)}>
				<Modal.Header>
					<Modal.Title>提示</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{tipMsg}
				</Modal.Body>
	
			</Modal>
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