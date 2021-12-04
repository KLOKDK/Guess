module.exports = {
    name: "join",
    description: "You should enter '!join' to join and play game",
    inVoiceChannel: true,
    joinGame: false,
    notPlaying: false,
    mustNumber: false,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            let id = `${message.member.toString()}`;
            if (scoreBoard[id] != null) return message.channel.send(`** You have already joined a game **`);

            scoreBoard[id] = 0;
            questionInfo.members++;
            message.channel.send(`** ${id} have joined a game **`);

            console.log(scoreBoard);
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}