'use client'

import { DAUEndpoint, UVEndpoint } from "@/app/lib/endpoints";
import { useState } from "react";
import { Badge, Button, Container, Form } from "react-bootstrap";

export default function Page(){

	const [uv, setUV] = useState()
	const [dau, setDAU] = useState()

	async function getUV(e:any){
		e.preventDefault()

		const formData = new FormData()
		formData.append("start", e.target[0].value)
		formData.append("end", e.target[1].value)
		
		const data = await UVEndpoint({formData: formData})
		if(data != undefined){
			setUV(data.data)
		}
	}

	async function getDAU(e:any){
		e.preventDefault()

		const formData = new FormData()
		formData.append("start", e.target[0].value)
		formData.append("end", e.target[1].value)
		
		const data = await DAUEndpoint({formData: formData})
		if(data != undefined){
			setDAU(data.data)
		}
	}
	

    return (
        <>
            <Container className="ps-5 pe-5 pt-3 pb-3 mt-3">
                <h6 className="mt-3"><b className="square"></b> 网站 UV</h6>
			    <Form className="d-flex mt-3 justify-content-between" onSubmit={(e:any) => getUV(e)}>
			    	<Form.Control type="date" style={{width: "40%"}} required/>
			    	<Form.Control type="date" style={{width: "40%"}} className="ms-3" required/>
			    	<Button type="submit" className="ms-3">开始统计</Button>
			    </Form>
			    <ul className="list-group mt-3 mb-3">
			    	<li className="list-group-item d-flex justify-content-between align-items-center">
			    		统计结果
			    		<Badge bg="danger" className="font-size-14">{uv}</Badge>
			    	</li>
			    </ul>
            </Container>

            <Container className="ps-5 pe-5 pt-3 pb-3">
            <h6 className="mt-3"><b className="square"></b> 活跃用户</h6>
				<Form className="d-flex mt-3 justify-content-between" onSubmit={(e:any) => getDAU(e)}>
			    	<Form.Control type="date" style={{width: "40%"}} required/>
			    	<Form.Control type="date" style={{width: "40%"}} className="ms-3" required/>
			    	<Button type="submit" className="ms-3">开始统计</Button>
			    </Form>
				<ul className="list-group mt-3 mb-3">
					<li className="list-group-item d-flex justify-content-between align-items-center">
						统计结果
						<Badge bg="danger" className="font-size-14">{dau}</Badge>
					</li>
				</ul>
            </Container>
        </>
        
    )
}