module.exports = {
    name: "stop",
    description: "Stop bot",
    inVoiceChannel: true,
    joinGame: true,
    notPlaying: false,
    mustNumber: false,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            let queue = client.distube.getQueue(message);
            if (!queue) return;
            questionInfo.count = questionInfo.MAX_LENGTH + 1;
            message.channel.send(`** Stop after this round **`);

        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}