import { FunctionComponent } from "react";

interface Props{
  children: React.ReactNode;
}

const Page: FunctionComponent<Props> = ({children}) => {
  return (
    <div>
      Header
      {children}
      Footer
    </div>
  )
}

export default Page;