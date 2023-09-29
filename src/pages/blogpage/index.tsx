import Blog from "components/Blog";
import Landing from "components/Landing";
import { Post } from "definitions";
import { useEffect, useState } from "react";
import { BlogService } from "services/BlogService";
import ImageService, { LoremPicsum } from "services/ImageService";
import Pagination from "components/Pagination";
import { useBlogPageContext } from "./Context";
import Banner from "components/Banner";
import Skeleton from 'react-loading-skeleton'
import "./style.scss"



export const BlogPage = () => {
  const { currentPage, setCurrentPage } = useBlogPageContext()
  const [ blogs, setBlogs ] = useState<Post[]>([])
  const [ currentBlogs, setCurrentBlogs ] = useState<Post[]>()
  const [ images, setImages ] = useState<string[]>([])
  const lastPage = Math.ceil(blogs.length / 3)
  const imageService = new ImageService(new LoremPicsum());


  useEffect(() => {
    BlogService.getAllBlogs().then(res => {
      setBlogs(res.posts)
      setCurrentBlogs(res.posts.slice(0,3))
    })
  }, [])


  useEffect(() => {
    if(blogs.length > 0) {
      const fromB = (currentPage - 1)*3
      const toB = (currentPage - 1)*3 + 3
      setCurrentBlogs(blogs.slice(fromB, toB))
    }

    imageService.fetchImages(currentPage).then((images: string[]) => {
      setImages(images)
    })
  }, [currentPage, blogs])


  const changePage = (page: number) => {
    if(page === -1 ) { // go to the previous page
      if(currentPage !== 1) { // can't go before the first page
        setCurrentPage(currentPage-1)
      }
    } else if (page === 0) { // go to the next page
      if(currentPage < lastPage ) { // can't go past the last page
        setCurrentPage(currentPage+1)
      }
    } else if (page > 0 && page <= lastPage){ // go to any page in between first and last
      setCurrentPage(page)
    }
  }

  return (
    <div>
      <Landing />
          { images.length === 0 && (
            <div className="skeletons">
              <Skeleton count={5} className="skeleton"/>
              <Skeleton count={5} className="skeleton"/>
              <Skeleton count={5} className="skeleton"/>
            </div>
          )}
        <div className="blogs">
          {
            (blogs.length > 0 && images.length > 0) ?
              currentBlogs?.map((blog: Post, index: number) => {
                return <Blog blog={blog} image={images[index]} key={blog.id} />
              }
            ) : null
          }
        </div>
        <Pagination prodPerPage={3}
                    onPress={(page: number) => changePage(page)}
                    totalNumOfProd={blogs.length}
                    numOfProducts={blogs.length}
                    currentPage={currentPage}  />
        <Banner />
    </div>
  );
};

export default BlogPage
