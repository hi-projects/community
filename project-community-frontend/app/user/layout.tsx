'use client'

import { Container } from "react-bootstrap";
import { Navigation } from "../ui/layout-user/navigation";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
      <Container>
          <Navigation/>

          {children}
      </Container>
    )
    
}