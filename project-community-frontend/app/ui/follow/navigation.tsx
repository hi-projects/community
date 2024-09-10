import { Nav } from "react-bootstrap";

function FollowNavigation(){
    return (
        <div className="position-relative">
			<Nav variant="tabs" className="mb-3">
				<Nav.Item>
					<Nav.Link className="position-relative" href="followee.html"><i className="text-info">Nowcoder</i> 关注的人</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link className="position-relative active" href="follower.html">关注 <i className="text-info">Nowcoder</i> 的人</Nav.Link>
				</Nav.Item>
			</Nav>
			<a href="profile.html" className="text-muted position-absolute rt-0">返回个人主页&gt;</a>
		</div>
    )
}

export { FollowNavigation }