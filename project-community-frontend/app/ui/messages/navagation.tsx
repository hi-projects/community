import { useRouter } from "next/navigation";
import { Nav, Badge } from "react-bootstrap";

function MessageNavagation({defaultActiveKeyactiveKey, total1, total2}:{
    defaultActiveKeyactiveKey: number,
    total1: number,
    total2: number
}){
    const router = useRouter();

    async function nav(e:any, url:string){
        e.preventDefault();
        router.push(url);
    }

    return (
        <Nav variant="tabs" className="mb-3" as="ul" defaultActiveKey={defaultActiveKeyactiveKey}>
            <Nav.Item as="li">
                <Nav.Link eventKey={1} className="position-relative" onClick={(e:any) => {nav(e, "/conversation-list")}}>朋友私信<Badge bg="danger" className="ms-1">{total1 != 0 && total1}</Badge></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey={2} className="position-relative" onClick={(e:any) => {nav(e, "/notification-list")}}>系统信息<Badge bg="danger" className="ms-1">{total2 != 0 && total2}</Badge></Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export { MessageNavagation }