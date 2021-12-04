module.exports = {
    name : "ping",
    description: "Test this bot",
    inVoiceChannel : false,
    joinGame: false,
    notPlaying: false,
    mustNumber: false,
    run : async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            if(!args[0])
                message.channel.send("Pong!");
            else 
                message.channel.send(`${args}`);
        } catch(e){
            message.channel.send(`Error: \`${e}\``)
        }
    }
}