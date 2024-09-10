'use client'

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Container, Dropdown, Form, Nav, Navbar, NavItem } from "react-bootstrap";
import { UserStateContext } from "./header-and-children";
import { logoutEndpoint } from "@/app/lib/endpoints";
import { INDEX_REGISTER_URL, SEARCH_URL, USER_PROFILE_URL } from "@/app/lib/constants";
import { USER_SETTING_URL } from "@/app/lib/constants";


export default function Header(){
    console.log(" ============================= <Header> ============================= ")

    const router = useRouter();

    const userState = useContext(UserStateContext);
    const user = userState.user;
    const setUser = userState.setUser;

    async function logout(){
        const data = await logoutEndpoint();

        if(data.code == "200"){
            setUser(undefined);
            router.push("/home");
        }
    }

    async function search(e:any){
        if(e.key == 'Enter'){
            e.preventDefault()
            e.target.placeholder = e.target.value;
            router.push(`${SEARCH_URL}/${e.target.value}`)
        }
    }


    const num = 0;

    return (
        <header className="bg-dark sticky-top" >
            <Container>
                <Navbar expand="lg" variant="dark">
                    {/* <Navbar.Brand href="#"></Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"/>
                    <Navbar.Collapse id="navbarSupportedContent">
                        <Nav as={"ul"} className="d-flex" style={{width: "100%"}}>
                            <Nav.Item as={"li"} className="ms-3">
                                <Nav.Link onClick={()=>router.push("/home")}>首页</Nav.Link>
                            </Nav.Item>
                            {
                                user != undefined && (
                                <Nav.Item as={"li"} className="ms-3">
                                    <Nav.Link className="position-relative" onClick={e=>router.push("/conversation-list")}>
                                        消息{num != 0 && <Badge bg="danger">{num}</Badge>}
                                    </Nav.Link>
                                </Nav.Item>
                                )
                            }
                            {
                                user == undefined && (
                                <>
                                    <Nav.Item as={"li"} className="ms-3">
                                        <Nav.Link onClick={e=>router.push("/login")}>登录</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as={"li"} className="ms-3">
                                        <Nav.Link onClick={e=>router.push(INDEX_REGISTER_URL)}>注册</Nav.Link>
                                    </Nav.Item>
                                </>
                                )
                            }

                            <NavItem as={"li"} className="d-flex ms-auto me-4">
                                <Form style={{marginTop: "1px"}} onKeyDown={(e:any)=>{search(e)}}>
                                    <Form.Control type="search" placeholder="搜索"/>
                                </Form>
                            
                                {
                                    user != undefined && (
                                    <Dropdown className="ms-3" id="dropdown-basic"> 
                                        <Dropdown.Toggle as={"img"} src={user.headerUrl} width={40} className="rounded-circle" alt="用户头像"/>
                                    
                                        <Dropdown.Menu>
                                            <Dropdown.Item className="text-center" onClick={e=>router.push(`${USER_PROFILE_URL}/${user.id}`)}>个人主页</Dropdown.Item>
                                            <Dropdown.Item className="text-center" onClick={e=>router.push(`${USER_SETTING_URL}`)}>账号设置</Dropdown.Item>
                                            <Dropdown.Item className="text-center" onClick={logout}>退出登录</Dropdown.Item>
                                            <Dropdown.Divider/>
                                            <Dropdown.Item as={"span"} className="text-center">{user.username} </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    )
                                }
                            </NavItem>
                            
                             
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>

            </Container>
        </header>
    )
}





// 搜索框
function Search(){
    return (
        <form className="form-inline my-2 my-lg-0" action="site/search.htms">
            <input className="form-control me-sm-2" type="search" aria-label="Search" />
            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">搜索</button>
        </form>
    )
}


