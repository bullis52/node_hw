const fs = require('fs');
const path = require('path');

module.exports = {
    getUsers: (req,res)=>{
        fs.readFile(path.join('database','database.json'),(err,data)=>{
            if (err){
                console.log(err);
            }else {
                const parseUser = JSON.parse(data.toString());
                res.json(parseUser);
            }
        });
    },
    getUserById:(req,res)=>{
        fs.readFile(path.join('database','database.json'),(err,data)=>{
            if (err){
                console.log(err);
            }else {
                const parseUser = JSON.parse(data.toString());
                const {user_id} = req.params;
                const user = parseUser[user_id - 1];
                res.json({user});
            }
        });
    },
    createUsers:(req,res)=>{
        fs.readFile(path.join('database','database.json'),(err,data)=>{
            if (err){
                console.log(err);
            }else {
                const usersDB = JSON.parse(data.toString());
                usersDB.push({...req.body, id: usersDB.length+1});
                res.json({...req.body,id: usersDB.length + 1});
                fs.writeFile(path.join('database','database.json'), JSON.stringify(usersDB), (err)=>{
                    if (err){
                        console.log(err);
                    }
                })
            }
        })

    },
    updateUsers:(req,res)=>{
        fs.readFile(path.join('database','database.json'),(err,data)=>{
            if (err){
                console.log(err);
            }else {
                let parseUser = JSON.parse(data.toString());
                const {user_id} = req.params;
                if (!isNaN(user_id)) {
                   parseUser = parseUser.map(user => (user.id !== +user_id) ? user : {...user, ...req.body});
                    fs.writeFile(path.join('database','database.json'), JSON.stringify(parseUser), (err)=>{
                        if (err){
                            console.log(err);
                        }
                        res.json(parseUser);
                    })
                }
            }
        });
    }
 };