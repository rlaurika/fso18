import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.content]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.anecdotes
  }

  return store
}

export const voting = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export default reducer