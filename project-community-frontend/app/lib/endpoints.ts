import { useRouter } from "next/navigation";
import { CONTENT_TYPE_JSON, } from "./constants";
import { EndpointParams } from "./types";
import { getCookie } from "./utils-common";

const domain = "http://127.0.0.1:8080"

function processResponse(response: Response){
	const router = useRouter();
	let data = undefined;
	if(response.status == 200){
		data = data["data"];
	}
	if(response.status == 403){
		console.log("权限不足!")
	}
	return data;
}

// 根据 "ticket" cookie 获取登录用户信息
export async function preFetchUserEndpoint(){
	let data = undefined;

	const endpoint = `${domain}/user/prefetch`;

	const options = {
		method: 'GET',	
		credentials: 'include',
		mode: 'cors'
	} as RequestInit

	const response = await fetch(endpoint, options);

	data = await response.json();
	
	console.log("获取登录用户信息时, 返回的信息为: ", data.msg)

	return data.user;
}

export async function indexEndpoint({requestParams: [offset, limit, orderMode]}: EndpointParams){
    const endpoint = `${domain}/index?offset=${offset}&limit=${limit}&orderMode=${orderMode}`;

    const options = {
		method: 'GET',	
		headers: {
		  'Content-Type': CONTENT_TYPE_JSON,
		},
		credentials: 'include',
		mode: 'cors'
	} as RequestInit

    const response = await fetch(endpoint, options);
    const data = await response.json();

    return data;
}

export async function publishEndpoint({formData}: EndpointParams){
	const endpoint = 'http://127.0.0.1:8080/post/add';

	const options = {
		// The method is POST because we are sending data.
		method: 'POST',
		// Tell the server we're sending JSON.
		headers: {
		  'Content-Type': 'application/json',
		},
		// Body of the request is the JSON data we created above.
		body: formData,
		credentials: 'include',
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);

	return await response.json();
}

export async function registerEndpoint({formData}: EndpointParams){
	const endpoint = 'http://127.0.0.1:8080/register';

	const options = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: formData,
		mode: 'cors'
	} as RequestInit

	const response = await fetch(endpoint, options);
	const data = await response.json(); 
	return data;
}

export async function postDetailEndpoint({
	pathParams: [postId],
	requestParams: [offset, limit]
}: EndpointParams){
	const endpoint = `${domain}/post/detail/${postId}?offset=${offset}&limit=${limit}`;

	const options = {
		method: 'GET',
		credentials: 'include',
		mode: 'cors'
	} as RequestInit

	const response = await fetch(endpoint, options);
	const data = response.json()

	return data;
}

export async function addCommentEndpoint(formData){
	const endpoint = `http://127.0.0.1:8080/comment/add`

	const options = {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
		mode: 'cors',
		credentials: 'include',
	} as RequestInit

	const response = await fetch(endpoint, options); 



	return response;
}

export async function likeEndpoint(formData: any){
    const endpoint = "http://127.0.0.1:8080/like"
	const options = {
		method: 'POST',	
		headers: {
		  'Content-Type': CONTENT_TYPE_JSON,
		},
		body: JSON.stringify(formData),
		credentials: 'include',
		mode: 'cors'
	} as RequestInit

	const response = await fetch(endpoint, options); 
	const data = await response.json();

	return data;
}

export async function kaptchaEndpoint(){
	const endpoint = "http://127.0.0.1:8080/kaptcha";

	const options = {
		method: 'GET',	
		credentials: 'include',
		mode: 'cors'
	} as RequestInit

	const response = await fetch(endpoint, options); 
	const blob = await response.blob();

	return blob;
}

export async function loginEndpoint(formData: any){
	const endpoint = 'http://127.0.0.1:8080/login';

	const options = {
		method: 'POST',	
		body: formData,
		credentials: 'include',
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	const data = await response.json();

	return data;
}

export async function logoutEndpoint(){
	const endpoint = 'http://127.0.0.1:8080/logout';
        const options = {
			// The method is POST because we are sending data.
			method: 'GET',
			// Body of the request is the JSON data we created above.
			credentials: 'include',
			mode: 'cors'
		} as RequestInit
		
		const response = await fetch(endpoint, options);
		const data = await response.json();

		return data;
}

export async function profileEndpoint(userId:number){
	const endpoint = `http://127.0.0.1:8080/user/profile/${userId}`;
    const options = {
		method: 'GET',
		credentials: 'include',
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	const data = await response.json();

	return data;
}

export async function followEndpoint(followerType: number, followerId: number, followeeType: number, followeeId: number,){
	const endpoint = 'http://127.0.0.1:8080/follow';

	const fromData = {
		followerType: followerType, 
		followerId: followerId, 
		followeeType: followeeType, 
		followeeId: followeeId,
	}

    const options = {
		method: 'POST',
		credentials: 'include',
		body:JSON.stringify(fromData),
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	const data = await response.json();

	return data;
}

export async function conversationsEndpoint(offset: number, limit: number){
	const endpoint = `http://127.0.0.1:8080/message/conversation/list?offset=${offset}&limit=${limit}`;

	const options = {
		method: 'GET',	
		headers: {
		  'Content-Type': 'application/json',
		},
		credentials: 'include',
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	const result = await response.json();

	return result;
}

export async function noticeListEndpoint(){
	const endpoint = 'http://127.0.0.1:8080/message/notification/list';

	const options = {
		method: 'GET',
		credentials: 'include',
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	const data = await response.json();

	return data;

}



export async function notificationDetailEndpoint({pathParams}: EndpointParams){
	const topic = pathParams[0];
	const offset = pathParams[1];
	const limit = pathParams[2];

	const endpoint = `http://127.0.0.1:8080/message/notification/detail/${topic}?offset=${offset}&limit=${limit}`;

	const options = {
		method: 'GET',
		credentials: 'include',
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	if(response.status == 200){
		const data = await response.json();
		return data["data"];
	}
	else{
		console.log("权限不足!")
		return undefined;
	}
	

}

export async function searchEndpoint({requestParams}: EndpointParams){
	const keyword = requestParams[0];
	const cuurent = requestParams[1];
	const limit = requestParams[2];

	const endpoint = `http://127.0.0.1:8080/search?keyword=${keyword}&current=${cuurent}&limit=${limit}`;

	const options = {
		method: 'GET',
		credentials: 'include',
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	if(response.status == 200){
		const data = await response.json();
		return data["data"];
	}
	else{
		console.log("权限不足!")
		return undefined;
	}
}

export async function topPostEndpoint({formData: formData}: EndpointParams){
	const endpoint = `http://127.0.0.1:8080/post/top`;

	const options = {
		method: 'POST',
		credentials: 'include',
		body: formData,
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	if(response.status == 200){
		return response.json();
	}
	else{
		console.log("权限不足!")
		return undefined;
	}
}

export async function wonderfulPostEndpoint({formData: formData}: EndpointParams){
	const endpoint = `http://127.0.0.1:8080/post/wonderful`;

	const options = {
		method: 'POST',
		credentials: 'include',
		body: formData,
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	if(response.status == 200){
		return response.json();
	}
	else{
		console.log("权限不足!")
		return undefined;
	}
}

export async function deletePostEndpoint({formData: formData}: EndpointParams){
	const endpoint = `http://127.0.0.1:8080/post/delete`;

	const options = {
		method: 'POST',
		credentials: 'include',
		body: formData,
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	if(response.status == 200){
		return response.json();
	}
	else{
		console.log("权限不足!")
		return undefined;
	}
}

export async function UVEndpoint({formData: formData}: EndpointParams){
	const endpoint = `http://127.0.0.1:8080/data/uv`;

	const options = {
		method: 'POST',
		credentials: 'include',
		body: formData,
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	if(response.status == 200){
		return response.json();
	}
	else{
		console.log("权限不足!")
		return undefined;
	}
}
export async function DAUEndpoint({formData: formData}: EndpointParams){
	const endpoint = `http://127.0.0.1:8080/data/dau`;

	const options = {
		method: 'POST',
		credentials: 'include',
		body: formData,
		mode: 'cors'
	} as RequestInit
	
	const response = await fetch(endpoint, options);
	if(response.status == 200){
		return response.json();
	}
	else{
		console.log("权限不足!")
		return undefined;
	}
}