import React, { BaseSyntheticEvent, FC, useEffect, useState } from "react"
import "./style.scss"
import { Post, User } from "definitions"
import { StyledLink } from "components/Header/Styles"
import { UserService } from "services/UserService"
import UserTag from "../../assets/dashicons_admin-users.svg"
import Tag from "../../assets/ci_tag.svg"

type Props = {
    blog: Post,
    image: string
}

const Blog: FC<Props> = ({ blog, image }) => {
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        UserService.getUserById(blog.userId).then(user => setUser(user))
    }, [])

    if(!user) return null;
    return (
        <div className="blog">
            <div className="blog__img">
                <img src={image} className="blog__img-cover" />
            </div>
            <div className="blog__content">
                <div className="blog__tags">
                    <div className="blog__tag">
                        <img src={UserTag} alt="user" />
                        <span className="blog__tag-label">
                            {user?.username}
                        </span>
                    </div>
                    {
                        blog.tags.map((tag) => {
                            return (
                                <div className="blog__tag" key={`${blog.id}${tag}`}>
                                    <img src={Tag} alt="user" />
                                    <span className="blog__tag-label">
                                        {tag}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
                <h3 className="title_md blog__title">{ blog.title }</h3>
                <p className="text-sm blog__text">{ blog.body }</p>
                <StyledLink className="read-more" to="/newBlog">Read more</StyledLink>
            </div>
        </div>
    )
}

export default Blog
