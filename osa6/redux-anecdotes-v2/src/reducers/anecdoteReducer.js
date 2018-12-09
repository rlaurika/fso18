import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.data]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.anecdotes
  }

  return store
}

export const voting = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    await anecdoteService.update(id, { ...votedAnecdote, votes: votedAnecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      id
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
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