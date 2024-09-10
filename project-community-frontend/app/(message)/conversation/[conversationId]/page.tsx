'use client'

import { PaginationData } from "@/app/lib/types";
import { getCookie } from "@/app/lib/utils-common";
import { CommonPagination } from "@/app/ui/common-pagination";
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";

const limitDefault = 5;
// =======================
const formId = "form"
const toUsernameId = "toUsername"
const contentId= "content"

async function fetchData(conversationId: string, offset: number, limit: number){
    const endpoint = `http://127.0.0.1:8080/message/conversation/${conversationId}?offset=${offset}&limit=${limit}`;

    const options = {
        method: 'GET',
        credentials: 'include',
        mode: 'cors'
    } as RequestInit
    
    const response = await fetch(endpoint, options);
    const data = await response.json();

    return data; 
}

export default function Page({params}:{
    params:{
        letterId: string,
    }
}){
    console.log(" =============================== /conversation ==============================")


    const letterId = params.letterId;

    const [myUsername, setMyUsername] = useState<string>();
    const [showModal1, setShowModal1] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);
    const [tipMsg, setTipMsg] = useState();
    const [data, setData] = useState<any>();
    const [pagination, setPagination] = useState<PaginationData>();
 
    // 获取初次渲染数据
    useEffect(()=>{
        fetchData(letterId, 0, limitDefault).then(data=>{
            setData(data);
            setPagination({current: 1, count: data.messages.length, limit: limitDefault} as PaginationData)
            setMyUsername(getCookie("username"));
        })
    }, [])

    // 用于分页
    const handlePagination = useCallback(async(paginantion: PaginationData, )=>{
        const offset = (paginantion.current - 1) * paginantion.limit;
        const limit = paginantion.limit;
        const data = await fetchData(letterId, offset, limit);
        if(data.code == "200"){
            setData(data);
            setPagination(paginantion);
            setTipMsg(data.msg);
        }
    }, []);

    // 
    const sendMessage = useCallback(async(event:any)=>{
		event.preventDefault();

		const endpoint = 'http://127.0.0.1:8080/message/send';

		const formObj = {
			"usernameOfTarget": event.target[toUsernameId].value,
			"content": event.target[contentId].value,
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

		if(data.code == "200"){ // 发送成功
			setShowModal1(false);
			setShowModal2(true);
			setTipMsg(data.msg);
		}

	}, [])

    if(data != undefined){
        console.log("data: ", data);
        const messages = data.messages;
        const targetUser = data.targetUser;

        return (
            <Container>
                <Row>
                    <Col xs={8}>
                        <h6><b className="square"></b> 来自 <i className="text-success">{targetUser.username}</i> 的私信</h6>
                    </Col>
                    <Col className="text-end">
                        <Button variant="secondary" size="sm">返回</Button>
                        <Button size="sm" className="ms-2" onClick={()=>setShowModal1(true)}>给TA私信</Button>
                    </Col>
                </Row>
    
                {/** 弹出框 */}
                <Modal size="lg" show={showModal1} onHide={()=>{setShowModal1(false)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>发私信</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id={formId} onSubmit={sendMessage}>
                            <Form.Group controlId={toUsernameId}>
                                <Form.Label>发给：</Form.Label>
                                <Form.Control value={targetUser.username}/>
                            </Form.Group>
                            <Form.Group controlId={contentId}>
                                <Form.Label>内容: </Form.Label>
                                <Form.Control as={"textarea"} rows={10}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setShowModal1(false)}>取消</Button>
                        <Button type="submit" form={formId}>发送</Button>
                    </Modal.Footer>
                </Modal>
                {/** 提示框 */}
                <Modal show={showModal2} onHide={()=>{setShowModal2(false)}}>
                    <Modal.Header>
                        <Modal.Title>提示</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {tipMsg}
                    </Modal.Body>
                </Modal>
                
                {/** 私信列表 */}
                <ul className="list-unstyled mt-4">
                    {
                        messages.map((messageObj:any) => {
                            const message = messageObj.message;
                            const fromUser = messageObj.fromUser;
                            return (
                                <li className="media pb-3 pt-3 mb-2 me-5 d-flex">
                                    <a href="profile.html" className="mt-2">
                                        <img src={fromUser.headerUrl} className="mr-4 rounded-circle user-header" alt="用户头像" />
                                    </a>
                                    <div className="toast show d-lg-block ms-3 flex-grow-1 me-5" role="alert" aria-live="assertive" aria-atomic="true">
                                        <div className="toast-header">
                                            <Col xs="auto">
                                                <strong className="mr-auto">{myUsername == fromUser.username ? "我" : fromUser.username}</strong>
                                            </Col>
                                            <Col className="text-end">
                                                <small>{message.createTime}</small>
                                                <button type="button" className="ms-2 close" data-dismiss="toast" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </Col>
                                        </div>
                                        <div className="toast-body">
                                            {message.content}
                                        </div>
                                    </div>
                                </li>		
                            )
                        })
                    }
                    																																																					
                </ul>
                <CommonPagination pagination={pagination!} onClick={handlePagination}/>
            </Container>
        );
    }
    else{
        return null;
    }

} 