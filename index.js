
let current_posts = []
const posts_container = () => document.getElementById("posts-container") 
const formContainer = () => document.getElementById("form-container")


const updatePost = post => {
    let postDiv = document.getElementById(`post ${post.id}`)
    let likeP = postDiv.querySelector(".likes")
    likeP.innerText = post.likes
}

function deletePost(e){
    e.preventDefault()
    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
        }
    }

    fetch(`http://localhost:3000/posts/${this.id}`, configObj)
    .then(resp => resp.json())
    .then(posts => renderPosts(posts))
}

function likePost(e){
    let formData = {
        post: {
            likes: this.likes + 1
        }
    }
    // debugger

    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
        }, 
        body: JSON.stringify(formData)
    }

    fetch(`http://localhost:3000/posts/${this.id}`, configObj)
    .then(resp => resp.json())
    .then(posts => renderPosts(posts))
}


const removeAllChildren = (parent) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}
const renderPosts = posts => {
    removeAllChildren(posts_container())
    posts.forEach(post => {
        let div = document.createElement("div")
        let title = document.createElement("h3")
        let content = document.createElement('p')
        let likes = document.createElement('p')
        let plus = document.createElement("button")
        let deleteButton = document.createElement('button')

        div.id = `post ${post.id}`
        title.innerText = post.title
        content.innerText = post.content
        likes.innerText = post.likes
        likes.className = "likes"
        plus.innerText = "♥"
        deleteButton.innerText = "delete"
        

        plus.addEventListener("click", likePost.bind(post))
        deleteButton.addEventListener("click", deletePost.bind(post))

        div.appendChild(title)
        div.appendChild(content)
        div.appendChild(likes)
        div.appendChild(plus)
        div.appendChild(deleteButton)
        posts_container().appendChild(div)

        div.style.padding = "25px"

    })
}

const fetchPosts = () => {
    fetch("http://localhost:3000/posts")
    .then(resp => resp.json())
    .then(posts => {
        current_posts = [...posts]
        renderPosts(posts)
    })
}

const addPost = post => {
    current_posts.push(post)
    renderPosts(current_posts)
}

const submitForm = e => {
    e.preventDefault();
    let formData = {
        post: {
            title: e.target.children[0].value,
            content: e.target.children[1].value,
            likes: 0
        }
    }

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
        }, 
        body: JSON.stringify(formData)
    }
    fetch("http://localhost:3000/posts", configObj)
    .then(resp => resp.json())
    .then(post => addPost(post))
}

const createForm = () => {
    let form = document.createElement("form")
    let title = document.createElement("input")
    let content =  document.createElement("input")
    let submit = document.createElement("button")



    title.id  = "title_field"
    title.name = "title"
    title.placeholder = "Enter a title here!"
    content.id = "content_field"
    content.name = "content"
    content.placeholder = "Enter some content here"

    form.style.padding = "10pxc"

    submit.innerText = "create new post"
    
    form.appendChild(title)
    form.appendChild(content)
    form.appendChild(submit)
    formContainer().appendChild(form)


    form.addEventListener("submit", submitForm)

}



const startProgram = () => {
    createForm()
    fetchPosts()
}





document.addEventListener("DOMContentLoaded", startProgram)