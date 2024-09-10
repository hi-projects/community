import {
    Body,
    Container,
    Html,
    Link,
    Preview,
    Text
}from "@react-email/components";

export default function ActivationEmailTemplate({name, userId, activateCode}:{
    name:string,
    userId:string,
    activateCode:string
}){
    console.log(name, userId, activateCode);
    
    const href = `http://localhost:8080/rest/activation/${userId}/${activateCode}`;

    return (
        <Html>
            <Body>
                <Container>
                    <Text>Hello {name}, you have registered an account, please click the following link in time to activate the registered account.</Text>
                    <Link href={href}>Activate Acount</Link>
                    <Link href="">Resend Activation Email</Link>
                    <Text></Text>
                </Container>
            </Body>
        </Html>
    )
    
}