function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-[90%] xl:max-w-[1064px] 2xl:max-w-[1264px] mx-auto">
      {children}
    </div>
  );
}

export default Container;
