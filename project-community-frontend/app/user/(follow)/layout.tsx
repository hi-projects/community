import { FollowNavigation } from "@/app/ui/follow/navigation";
import { Container, Nav } from "react-bootstrap";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <Container>
            <FollowNavigation/>
            
            {children}
        </Container>
    )
}