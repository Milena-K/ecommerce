import { createContext, useContext, useState } from "react";

export type BlogPageContextType = {
    currentPage: number,
    setCurrentPage: (page: number) => void
}

export const BlogPageContext = createContext<BlogPageContextType | null>(null)

export const BlogPageProvider = ({ children }:{children: React.ReactNode}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const contextValue: BlogPageContextType = {
        currentPage, setCurrentPage
    }

    return <BlogPageContext.Provider value={contextValue}>
        {children}
    </BlogPageContext.Provider>

}

export const useBlogPageContext = () => {
  const blogPageContext = useContext(BlogPageContext);

  if (!blogPageContext) {
    throw new Error(
      "useBlogPageContext has to be used within <BlogPageContext.Provider>"
    );
  }

  return blogPageContext;
};
