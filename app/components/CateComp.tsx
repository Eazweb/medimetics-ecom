const CateComp = ({ cat }: any) => {
  console.log(cat.cate);
  return (
    <div>
      <h1>{cat.cate} category</h1>
      <p>Explore the latest in Category {cat.cate}. Find your style today!</p>
    </div>
  );
};

export default CateComp;
