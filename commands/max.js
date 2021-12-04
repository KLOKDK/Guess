module.exports = {
    name: "max",
    description: "Set maximum number of questions",
    inVoiceChannel: true,
    joinGame: true,
    notPlaying: false,
    mustNumber: true,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            let queue = client.distube.getQueue(message);
            if (!queue && args[0] < 1) return;

            if (args[0] <= queue.songs.length + questionInfo.count) {
                questionInfo.MAX_LENGTH = Number(args[0]);
                return message.channel.send(`** Number of Questions: ${args[0]} **`);
            }
            if (args[0] > queue.songs.length + questionInfo.count - 1) {
                questionInfo.MAX_LENGTH = queue.songs.length + questionInfo.count - 1;
                return message.channel.send(`** Number of Questions: ${queue.songs.length + questionInfo.count - 1} **`);
            }
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}