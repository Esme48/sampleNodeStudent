const { StatusCodes } = require("http-status-codes");
const { storedUsers, setLoggedOnUser } = require("../util/memoryStore");

const register = (req, res) => {
    const newUser = {...req.body};
    storedUsers.push(newUser);
    setLoggedOnUser(newUser);
    delete req.body.password;
    res.status(StatusCodes.CREATED).json(req.body);
}

const login = (req, res) => {
    const { email, password} = req.body;
    const currentUser = storedUsers.find((user) => user.email === email);

    if (!currentUser || currentUser.password !== password) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication Failed" });
    }
    setLoggedOnUser(currentUser);
    res.status(StatusCodes.OK).json({ name: currentUser.name });

}

const logoff = (req, res) => {
    setLoggedOnUser(null);
    res.sendStatus(StatusCodes.OK);
}

module.exports = { login, register, logoff };