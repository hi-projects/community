'use server'

import ActivationEmailTemplate from '@/app/ui/emails/activation';
import { render } from '@react-email/components';
import { createTransport } from 'nodemailer';


async function sendEmail(name, to, userId, activateCode){
    const transporter = createTransport({
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
          user: '13439022108@163.com',
          pass: 'QYXKXMTSBELPEZHG',
        },
      });
      
      const emailHtml = render(<ActivationEmailTemplate name={name} userId={userId} activateCode={activateCode}/>);
      
      const options = {
        from: '13439022108@163.com',
        to: to,
        subject: 'activate registered account',
        html: emailHtml,
      };
      
      await transporter.sendMail(options);
}

export { sendEmail }