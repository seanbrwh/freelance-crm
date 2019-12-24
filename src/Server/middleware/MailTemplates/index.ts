interface IAttachments {
  filename: string;
  path: string;
}

interface IMessage {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: IAttachments[];
}
export const message = (toEmail: string, link: string): IMessage => {
  return {
    from: "seanbrwh@gmail.com",
    to: toEmail,
    subject: "Please verify your email",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>"
  };
};
