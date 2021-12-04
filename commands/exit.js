module.exports = {
    name: "exit",
    description: "Exit a game",
    inVoiceChannel: true,
    joinGame: true,
    notPlaying: false,
    mustNumber: false,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            let id = `${message.member.toString()}`;

            delete scoreBoard[id];
            questionInfo.members--;
            message.channel.send(`** ${id} exits the game **`);

            console.log(scoreBoard);
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}