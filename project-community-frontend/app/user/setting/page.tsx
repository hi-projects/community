'use client'
import { UpdataAvatarResponseBody } from "@/app/lib/types";
import { memo, useCallback, useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";

export default function Page(){
    console.log("Rendered </settings/page.txs> component.")

    return (
		<Container className="p-5 mt-3 mb-3">
			<UploadAvatar/>     {/** 上传头像 */}
			<UpdatePassword/>   {/** 更新密码 */}
		</Container>
    );
} 

// ===============================================================================================================================
const UploadAvatar = memo(()=>{
    console.log("Rendered <UploadAvatar/> component.")

    const handleSubmit = useCallback(async(event: any) =>{
		event.preventDefault();

		console.log(event.target["head-image"].files[0])

		const endpoint = "http://127.0.0.1:8080/rest/update-avatar";

		const formData = new FormData();
		formData.append("img", event.target["head-image"].files[0]);
		
		

        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Body of the request is the JSON data we created above.
            body: formData,
			credentials: "include",
            mode: 'cors'
        } as RequestInit
    
        const response = await fetch(endpoint, options);
        const result = await response.json() as UpdataAvatarResponseBody;
        if(result.updateAvatar == "succeed"){
			console.log("updata avatar succeed.")
            location.reload();
        }
    }, []);


    return (
        <>
            <h6 className="text-start text-info border-bottom pb-2">上传头像</h6>
			<Form className="mt-5" onSubmit={handleSubmit}>
				<Form.Group as={Row} className="mt-4">
					<Form.Label xs={2} className="text-end col-form-label" column>选择头像:</Form.Label>
					<Col>
						<div>
							<Form.Control type="file" className="custom-file-input" id="head-image" lang="es" required/>
						</div>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mt-4">
					<Col xs={2}/>
					<Col className="text-center">
						<Form.Control as={Button} type="submit" className="btn-info text-white">立即上传</Form.Control>
					</Col>
				</Form.Group>
			</Form>
        </>
    );
})
UploadAvatar.displayName = "UploadAvatar";

// ===============================================================================================================================

const UpdatePassword = memo(()=>{
    console.log("Rendered <UpdatePassword/> component.")
    return (
        <>
        <h6 className="text-left text-info border-bottom pb-2 mt-5">修改密码</h6>
				<form className="mt-5">				
					<div className="form-group row mt-4">
						<label htmlFor="old-password" className="col-sm-2 col-form-label text-end">原密码:</label>
						<div className="col-sm-10">
							<input type="password" className="form-control" id="old-password" placeholder="请输入原始密码!" required autoComplete="off"/>
							<div className="invalid-feedback">
								密码长度不能小于8位!
							</div>							
						</div>
					</div>
					<div className="form-group row mt-4">
						<label htmlFor="new-password" className="col-sm-2 col-form-label text-end">新密码:</label>
						<div className="col-sm-10">
							<input type="password" className="form-control" id="new-password" placeholder="请输入新的密码!" required autoComplete="off"/>
							<div className="invalid-feedback">
								密码长度不能小于8位!
							</div>							
						</div>
					</div>
					<div className="form-group row mt-4">
						<label htmlFor="confirm-password" className="col-sm-2 col-form-label text-end">确认密码:</label>
						<div className="col-sm-10">
							<input type="password" className="form-control" id="confirm-password" placeholder="再次输入新密码!" required autoComplete="off"/>
							<div className="invalid-feedback">
								两次输入的密码不一致!
							</div>								
						</div>
					</div>				
					<div className="form-group row mt-4">
						<div className="col-sm-2"></div>
						<div className="col-sm-10 text-center">
							<button type="submit" className="btn btn-info text-white form-control">立即保存</button>
						</div>
					</div>
				</form>				
        </>
    );
})
UpdatePassword.displayName = "UpdatePassword";