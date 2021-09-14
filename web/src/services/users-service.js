import http from './base-api-service';

const register = (data) => http.post('/register', data)
const login = (email, password) => http.post('/login', { email, password })
const logout = () => http.post('/logout')
const loginWithGoogle = () => http.get('/authenticate/google')
const activate = (id) => http.get(`/users/${id}/activate`, {id})
const profile = () => http.get('/profile')
const profileUpdate = (avatar, pronouns, dateOfBirth, interests, languages, bio) => http.patch('/profile/update', {avatar, pronouns, dateOfBirth, interests, languages, bio})
const profileDelete = () => http.delete('/profile')
const reccommendations = () => http.get('/')
const like = (liker, liked) => http.post(`/user/:id/like`, {liker, liked})
const chats = (id, users, messages) => http.get(`/chats`, { id, users, messages})
const messageCreate = (message, chatId) => http.post(`/chats/${chatId}`, message)
const messageList = (chatId) => http.get(`/chats/${chatId}`)



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
  messageList
};
export default service;
