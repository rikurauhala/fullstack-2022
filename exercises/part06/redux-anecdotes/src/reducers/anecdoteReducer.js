const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: asObject(content)
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id: id }
  }
}

export const replaceAnecdotes = (anecdotes) => {
  return {
    type: 'REPLACE',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        content: anecdoteToUpdate.content,
        id: anecdoteToUpdate.id,
        votes: anecdoteToUpdate.votes + 1
      }
      const updatedState = state.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
      const sortedState = updatedState.sort((a, b) => b.votes - a.votes)
      return sortedState
    case 'REPLACE':
      return action.data
    default:
      return state
  }
}

export default reducer
