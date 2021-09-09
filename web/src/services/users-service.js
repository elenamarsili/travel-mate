import http from './base-api-service';

const register = (name, email, password) => http.post('/register',  { name, email, password })
const login = (email, password) => http.post('/login', { email, password })
const logout = () => http.post('/logout')
const activate = (id) => http.get(`/users/${id}/activate`, {id})
const profile = (data) => http.get('/profile', data)
const profileUpdate = (data) => http.patch('/profile', data)
const profileDelete = (id) => http.delete('/profile', {id})
const reccommendations = (data) => http.get('/', data)
const like = (id) => http.post(`/user/${id}/like`)
const chats = () => http.get(`/chats`)
const messageCreate = (message, chatId) => http.post(`/chats/${chatId}`, message)
const messageList = (chatId) => http.get(`/chats/${chatId}`)

const getUser = (id) => http.get(`/users/${id}`)
const createUser = (user) => {
  const data = new FormData()

  data.append('name', user.name)
  data.append('email', user.email)
  data.append('password', user.password)
  data.append('avatar', user.avatar)

  return http.post('/users', data)
}

const service = {
  register,
  login,
  logout,
  activate,
  profile,
  profileUpdate,
  profileDelete,
  reccommendations,
  like,
  chats,
  messageCreate,
  messageList,
  getUser,
  createUser
};
export default service;
