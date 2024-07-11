const fs = require('fs').promises;
const path = require('path');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    try {
        const users = await fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf-8')

        res.json(JSON.parse(users));
    } catch (e) {
        console.error(e.message)
    }
})

app.post('/users', async (req, res) => {
    try {
        if (Object.keys(req.body).length < 1 || !req.body.name || !req.body.email || !req.body.password) {
            return res.status(409).json('Write proper body')
        }
        const {name, email, password} = req.body;

        const users = await fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf-8')
        const parsedUsers = JSON.parse(users)

        const index = parsedUsers.findIndex(user => user.email === email);

        if (index !== -1) {
            return res.status(409).json('User with this email already exists')
        }

        const newUser = {
            id: parsedUsers[parsedUsers.length - 1].id + 1,
            name,
            email,
            password
        }
        parsedUsers.push(newUser);

        await fs.writeFile(path.join(__dirname, 'data', 'users.json'), JSON.stringify(parsedUsers, null, 2));

        res.status(400).json(newUser)
    } catch (e) {
        console.error(e.message)
    }
})

app.get('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (!userId) {
            return res.status(409).json('Write userId or write a number not symbols')
        }
        const users = await fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf-8')
        const parsedUsers = JSON.parse(users)

        const user = parsedUsers.find(user => user.id === userId);

        if (!user) {
            return res.status(404).json('User not found');
        }

        res.json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.put('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        if (!userId) {
            return res.status(409).json('Write userId or write a number')
        }

        if (Object.keys(req.body).length < 1) {
            return res.status(409).json('Write body')
        }

        const {name, email, password} = req.body;

        const users = await fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf-8')
        const parsedUsers = JSON.parse(users)

        const user = parsedUsers.find(user => user.id === userId);
        if (!user) {
            return res.status(404).json('User not found')
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        await fs.writeFile(path.join(__dirname, 'data', 'users.json'), JSON.stringify(parsedUsers, null, 2));

        res.status(201).json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
});

app.delete('/users/:userId', async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        if (!userId) {
            return res.status(409).json('Write userId or write a number not symbols')
        }

        const users = await fs.readFile(path.join(__dirname, 'data', 'users.json'), 'utf-8')
        const parsedUsers = JSON.parse(users)

        const index = parsedUsers.findIndex(user => user.id === userId);
        if (index === -1) {
            return res.status(404).json('User not found')
        }
        parsedUsers.splice(index, 1);

        await fs.writeFile(path.join(__dirname, 'data', 'users.json'), JSON.stringify(parsedUsers, null, 2));

        res.sendStatus(204);
    } catch (e) {
        res.status(400).json(e.message)
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})