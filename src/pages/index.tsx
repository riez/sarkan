import { NextPage } from "next";
import useSWR from "swr";

const Homepage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage
}) => {
  const { data: dataList, error: errorList } = useSWR('/api/list');
  const { data: dataOptionSize, error: errorOptionSize } = useSWR('/api/option_size');
  const { data: dataOptionArea, error: errorOptionArea } = useSWR('/api/option_area');
  let a = true;
  
  if(errorOptionSize || errorOptionArea || errorList){
    return renderErrorPage();
  }

  if(!dataOptionSize || !dataOptionArea || !dataList){
    return renderLoadingPage();
  }

  return (
   <div>
    {JSON.stringify(dataList)}
    {JSON.stringify(dataOptionSize)}
    {JSON.stringify(dataOptionArea)}
   </div>
  )
}

export default Homepage;