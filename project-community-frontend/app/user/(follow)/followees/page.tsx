export default function Page(){
    return (
        <ul className="list-unstyled">
        <li className="media pb-3 pt-3 mb-3 border-bottom position-relative">
            <a href="profile.html">
                <img src="http://images.nowcoder.com/head/8t.png" className="mr-4 rounded-circle user-header" alt="用户头像" />
            </a>
            <div className="media-body">
                <h6 className="mt-0 mb-3">
                    <span className="text-success">落基山脉下的闲人</span>
                    <span className="float-right text-muted font-size-12">关注于 <i>2019-04-28 14:13:25</i></span>
                </h6>
                <div>
                    <button type="button" className="btn btn-info btn-sm float-right follow-btn">关注TA</button>
                </div>
            </div>
        </li>
     </ul>

    );
}