import { POST_DETAIL_URL, USER_PROFILE_URL } from "@/app/lib/constants";
import { useRouter } from "next/navigation";
import { Badge } from "react-bootstrap";

function Posts({data}:{
    data: any
}){
    const router = useRouter();

    const postsObj = data.postsObj;

    async function toPostDetail(e: any, postId: string){
        e.preventDefault();
        
        router.push(`${POST_DETAIL_URL}/${postId}`);
    }
    async function toProfile(e: any, userId: string){
        e.preventDefault();
        
        router.push(`${USER_PROFILE_URL}/${userId}`);
    }

    
    return (
        <ul className="list-unstyled">
            { postsObj.map((postObj:any) => { 
                const post = postObj.post;
                const user = postObj.user;
                const likeCount = postObj.likeCount;
                
                return (
                    <li key={post.id} className="d-flex pb-3 pt-3 mb-3 border-bottom">
                        <a onClick={(e:any)=>{toProfile(e, user.id)}}>
                            <img src={user.headerUrl} width={50} height={50} className="me-5 rounded-circle" alt="用户头像"/>
                        </a>
                        <div className="flex-grow-1">
                            <h6 className="mt-0 mb-3 d-flex">
                                <a onClick={e=>toPostDetail(e, post.id)}> {post.title} </a>
                                {post.type==1 && <Badge bg="primary" className="ms-3">置顶</Badge>} 
                                {post.status==1 && <Badge bg="danger" className="ms-1">精华</Badge>}
                            </h6>
                            <div className="text-muted font-size-12 d-flex justify-content-between">
                                <div>
                                    <u className="me-3">{user.username}</u>
                                    发布于
                                    <b className="ms-1">{post.createTime}</b>
                                </div>

                                <ul>
                                    <li className="d-inline ms-2">赞 {likeCount}</li>
                                    <li className="d-inline ms-2">|</li>
                                    <li className="d-inline ms-2">回帖 {post.commentCount}</li>
                                </ul>
                            </div>
                        </div>						
                    </li>
                )
            })}
        </ul>
    );
			
}

export { Posts }