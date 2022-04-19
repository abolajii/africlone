export default function userReducer(user, action) {
    switch (action.type) {
        case 'empty':
            return {};
        case 'add':
            const { name, token } = action
            return {...user, name: name, token: token};
        default:
            throw new Error("Unhandled action " + action.type)
    }
}