const React = require('react')

class New extends React.Component {
    render(){
        return (
            <>
            <h1>Create A New Log</h1>
            <nav>
                <a href="/logs">Go Back To Logs Home Page</a>
            </nav>
            <br></br>
            <form method="POST" action="/logs">
                Title: <input type="text" name="title"></input><br/>
                Entry: <input type="textarea" name="entry"></input><br/>
                Ship is Broken: <input type="checkbox" name="shipIsBroken"></input><br/>
                <input type="submit" value="Submit Log"></input>
            </form>
            </>
        )
    }
}

module.exports = New