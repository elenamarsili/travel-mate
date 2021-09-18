import http from './base-api-service';

const register = (data) => http.post('/register', data)
const login = (email, password) => http.post('/login', { email, password })
const logout = () => http.post('/logout')
const loginWithGoogle = () => http.get('/authenticate/google')
const activate = (id) => http.get(`/users/${id}/activate`, {id})
const profile = () => http.get('/profile')
const profileDelete = () => http.delete('/profile')

const reccommendation = (page) => http.get('/reccommendation', {params: { page }})
const like = (userId) => http.post(`/users/${userId}/like`)
const chats = (id, users, messages) => http.get(`/chats`, { id, users, messages})
const messageCreate = (chatId, message) => http.post(`/chats/${chatId}`, message)
const messageList = (id) => http.get(`/chats/${id}`)
const profileUpdate = (user) => {
  console.log(user.avatar)
  const data = new FormData()
    data.append("avatar", user.avatar)
    data.append("bio", user.bio)
    data.append("pronouns", user.pronouns)
    data.append("dateOfBirth", user.dateOfBirth)
    data.append("interests", user.interests)
    data.append("languages", user.languages)

    return http.patch('/profile', data)
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
  reccommendation,
  like,
  chats,
  messageCreate,
  messageList
};
export default service;
