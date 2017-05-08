
const initialState = [
    {
        text: 'Use Redux',
        completed: false,
        id: 0
    }
];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case 'TO_DO':
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text
                },
                ...state
            ];



        default:
            return state;
    }
}
