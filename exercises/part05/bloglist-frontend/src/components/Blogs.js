import Blog from './Blog'

const Blogs = ({ blogs, handleLike }) => (
  <table>
    <tbody>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
        />
      )}
    </tbody>
  </table>
)

export default Blogs
