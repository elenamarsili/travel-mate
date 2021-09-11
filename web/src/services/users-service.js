import http from './base-api-service';

const register = (data) => http.post('/register', data)
const login = (email, password) => http.post('/login', { email, password })
const logout = () => http.post('/logout')
const loginWithGoogle = () => http.get('/authenticate/google')
const activate = (id) => http.get(`/users/${id}/activate`, {id})
const profile = () => http.get('/profile')
const profileUpdate = (data) => http.patch('/profile/update', data)
const profileDelete = (id) => http.delete('/profile', {id})
const reccommendations = (data) => http.get('/', data)
const like = (id) => http.post(`/user/${id}/like`)
const chats = () => http.get(`/chats`)
const messageCreate = (message, chatId) => http.post(`/chats/${chatId}`, message)
const messageList = (chatId) => http.get(`/chats/${chatId}`)


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
  loginWithGoogle,
  activate,
  profile,
  profileUpdate,
  profileDelete,
  reccommendations,
  like,
  chats,
  messageCreate,
  messageList,
  createUser
};
export default service;
