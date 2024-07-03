const page = ({ params }: any) => {
  return <div>{params.cate}</div>;
};
export const generateMetadata = ({ params }: any) => {
  return {
    title: `${params.cate} category`,
    description: `Explore the latest in Category ${params.cate}. Find your style today!`,
  };
};

export default page;
