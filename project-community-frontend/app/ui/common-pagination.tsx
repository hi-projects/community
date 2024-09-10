import { PaginationData } from "@/app/lib/types";
import { Pagination } from "react-bootstrap";

interface ClickFunction{
    // 
    (pagination: PaginationData, ...params: any[]): any   
}

// 分页
function CommonPagination({pagination, onClick}:{
    pagination: PaginationData,
    onClick: ClickFunction,
}){
    console.log(" ========================== <CommonPagination/> ========================== ")
    console.log("paginationData: ", pagination)
    const current = pagination.current;
    const limit = pagination.limit;
    const count = pagination.count;
    
    if(count <= 0){
        return null;
    }

    const pagecount = Math.ceil(count / limit);       // 页面数量

    const from = Math.max(current - 2, 1);      // 起始
    const to = Math.min(current + 2, pagecount);

    const range = Array.from(Array(to - from + 1).keys()).map(x => x + from);
    return (
		<nav className="mt-3">
            <Pagination className="justify-content-center">

                <Pagination.Item onClick={(e)=>onClick({current: 1, count: count, limit: limit})}>首页</Pagination.Item>
                <Pagination.Item disabled={current==1} onClick={(e)=>onClick({current: current - 1, count, limit})}>上一页</Pagination.Item>

                {
                    range.map(idx => 
                        <Pagination.Item key={idx} active={idx==current} onClick={(e)=>{onClick({current: idx, count: count, limit: limit})}}>
                            {idx}
                        </Pagination.Item>
                    )
                }
                <Pagination.Item disabled={current==pagecount} onClick={(e)=>{onClick({current: current + 1, count: count, limit: limit})}}>下一页</Pagination.Item>
                <Pagination.Item onClick={(e)=>{onClick({current: pagecount, count: count, limit: limit})}}>末页</Pagination.Item>
            </Pagination>
        </nav>
    )
}

export { CommonPagination }

