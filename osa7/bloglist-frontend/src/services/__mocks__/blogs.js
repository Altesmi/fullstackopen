let token = null
const blogs =
    [{ title: "Eka blogi", 
    author: "Opa", 
    url: "eioo.com", likes: 30, 
    id: "5bf1ff61369599322943ee10",
    user: {
        _id: "5bf1ff5d369599322943ee0f", 
        username: "uusis", 
        name: "Uusi kayttaja" 
    } 
    },
    { title: "Toka blogi frontendistaa", 
    author: "opa", 
    url: "http://eioo22.com", 
    likes: 39, 
    id: "5bf49395795c5b2868a9ac90", 
    user: { 
        _id: "5bf1ff5d369599322943ee0f", 
        username: "uusis", 
        name: "Uusi kayttaja" 
    } 
    },
    { title: "Kolmas blogi", 
    author: "opa", 
    url: "http://kaikkitoimiilcom", 
    likes: 6, 
    id: "5bf5f3c5841d7228eecec450", 
    user: { 
        _id: "5bf3088ddd659b1cb56bc0fe", 
        username: "opa", 
        name: "Opa" 
    } 
}]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = (newToken) => {
    token = newToken
}

export default {getAll, blogs, setToken}
