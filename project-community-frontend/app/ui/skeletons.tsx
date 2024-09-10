import Link from "next/link";


export function HeaderSkeleton():React.ReactNode{
    return (
        <div className="container">
            {/** 导航 */}
            <nav className="navbar navbar-expand-lg navbar-dark">
                {/** logo */}
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/** 功能 */}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {/* 
                            <li className="nav-item ml-3 btn-group-vertical">
                                <a className="nav" th:href="@{/index}">首页</a>
                            </li> 
                        */}
                        <li className="nav-item ml-3 btn-group-vertical">
                            <Link className="nav" href="/">首页</Link>
                        </li> 

                        {/* 
                            <li className="nav-item ml-3 btn-group-vertical" th:if="${loginingUser!=null}">
                                <a className="nav-link position-relative" th:href="@{/message/conversations}">消息<span className="badge badge-danger">12</span></a>
                            </li> 
                        */}
                        
                    </ul>

                    {/** 搜索 */}
                    <form className="form-inline my-2 my-lg-0" action="site/search.html">
                        <input className="form-control mr-sm-2" type="search" aria-label="Search" />
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export function ContentSkeleton(){
    return (
        <div className="main">
          <div className="container">
            content
          </div>
        </div>
      );
}