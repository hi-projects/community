'use client'

import { PublishFormData, PublishResponseBody } from "@/app/lib/types";
import { useContext, useState } from "react";
import { Button, Form, Modal, Nav } from "react-bootstrap";
import { UserStateContext } from "../layout-root/header-and-children";
import { indexEndpoint, publishEndpoint } from "@/app/lib/endpoints";
import { limitDefault } from "@/app/lib/constants";

const titleId = "title";
const contentId = "content"
const publishFormId = "publish-form"

function SelectionAndPublish({orderMode, setOrderMode, setData, setPagination}){
	console.log(" ============================= </SelectionAndPublish> ============================= ")

	const userState = useContext(UserStateContext);
	const user = userState.user;

	const [showPublishModal, setShowPublishModal] = useState(false);
	const [showTipModal, setShowTipModal] = useState(false);
	const [tip, setTip] = useState<string>(""); 
	const [activeKey, setActiveKey] = useState(1)

	async function handlePublish(event:any){
		event.preventDefault();

		const formData = {
			"title": event.target[titleId].value,
			"content": event.target[contentId].value,
		} as PublishFormData

		const data = await publishEndpoint({formData: JSON.stringify(formData)})
		
		setShowPublishModal(false);
		setShowTipModal(true);
		setTip(data.msg);
		
		const indexData = await indexEndpoint({requestParams: [0, limitDefault, orderMode]})

		setData(indexData)
		setPagination({
			current: 1,
			limit: 5,
			count: indexData.count,
		})

	}

	// 根据热度查询帖子
	async function navFunction(e:any, orderMode: number, activeKey:number){
		e.preventDefault()

		setActiveKey(activeKey)
		setOrderMode(orderMode)
	}


    return (
        <div className="position-relative">

			<Nav variant="tabs" className="mb-3" as="ul" activeKey={activeKey}>
				<Nav.Item as="li">
					<Nav.Link eventKey={1} onClick={e => navFunction(e, 0, 1)}>最新</Nav.Link>
				</Nav.Item>
				<Nav.Item as="li">
					<Nav.Link eventKey={2} onClick={e => navFunction(e, 1, 2)}>最热</Nav.Link>
				</Nav.Item>
			</Nav>
			
			{
				user != undefined && <Button size="sm" className="position-absolute rt-0" onClick={()=>setShowPublishModal(true)}>我要发布</Button>
			}

			<Modal show={showPublishModal} onHide={()=>setShowPublishModal(false)} aria-labelledby="publishModalLabel" dialogClassName="modal-lg">
        		<Modal.Header closeButton>
        		  <Modal.Title as={'h5'}>新帖发布</Modal.Title>
        		</Modal.Header>
        		<Modal.Body>
					<Form id={publishFormId} onSubmit={handlePublish}>
						<Form.Group controlId={titleId} className="form-group">
    				    	<Form.Label>标题:</Form.Label>
    				    	<Form.Control type="text" placeholder="请输入帖子标题!"/>
    				    </Form.Group>

      					<Form.Group controlId={contentId} className="form-group">
      					  <Form.Label>正文:</Form.Label>
      					  <Form.Control as="textarea" placeholder="请输入帖子内容!" rows={15}/>
      					</Form.Group>

    				</Form>
				</Modal.Body>
        		<Modal.Footer>
        		  <Button type="submit" form={publishFormId}>发布</Button>
        		  <Button variant="secondary" onClick={()=>setShowPublishModal(false)}>取消</Button>
        		</Modal.Footer>
      		</Modal>

			<Modal show={showTipModal} dialogClassName="modal-lg" onHide={()=>setShowTipModal(false)}>
				<Modal.Header>
					<Modal.Title as={'h5'}>提示</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{tip}
				</Modal.Body>

			</Modal>
		</div>
    );
}


export { SelectionAndPublish } 