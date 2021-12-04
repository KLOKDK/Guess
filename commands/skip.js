module.exports = {
    name: "skip",
    description: "Vote for skip",
    inVoiceChannel: true,
    joinGame: true,
    notPlaying: false,
    mustNumber: false,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            let queue = client.distube.getQueue(message);
            if (!queue || !queue.playing) return;
            let id = `${message.member.toString()}`;
            if (vote[id] != null) return message.channel.reply(`** You have already voted for skip **`);

            vote[id] = 0;
            message.channel.send(`** ${id} has voted for skip ${Object.keys(vote).length}/${Math.round(questionInfo.members / 2)}**`);
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}