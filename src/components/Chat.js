import React, { useEffect, useState } from 'react'
import socket from './Socket';


const Chat = ({ name }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat', message => {
            setMessages([...messages, message]);
        })

        return () => {socket.off()}
    }, [messages])

    const submit = (e) => {
        e.preventDefault();
        socket.emit('chat', name, message)
    }

    return(
        <div className='ChatVivo'>
            <h3>Chat en Vivo</h3>
            <div>
                {messages.map((e, i) => <div key={i}><div>{e.name}:</div><div>{e.message}</div></div>)}
            </div>
            <form onSubmit={submit}>
                <label htmlFor="">Escriba su message</label>
                <input value={message} onChange={e => setMessage(e.target.value)}></input>
                <button>Enviar</button>
            </form>
        </div>
    )
}

export default Chat