import React, { useEffect, useRef, useState } from 'react'


const Chat = ({ name, socket }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState(null);

    useEffect(() => {
        setChat(socket);
        socket.on('CHAT', (message) => {
            setMessages((messages) => [...messages, message]);
        })
    }, [])

    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' })
    })

    const submit = (e) => {
        e.preventDefault();
        chat?.emit('CHAT', {name, message, date: new Date()});
        setMessage("");
    }

    return(
        <div className='ChatVivo'>
            <h3>Chat en Vivo</h3>
            <div className='miChat'>
                {messages.map((msg) => <div key={msg.name}><div>{msg.name}:{Date(msg.date)}</div><div>{msg.message}</div></div>)}
                <div ref={divRef} ></div>
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